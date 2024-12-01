import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({ where: { id: ctx.session.user.id }, include: { events: true } });
    if (!user) throw new TRPCError({ message: "User not found.", code: "INTERNAL_SERVER_ERROR" });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      preferredEmail: user.preferredEmail,
      flags: user.flags,
      events: user.events.map((event) => event.name),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }),
});
