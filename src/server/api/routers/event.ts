import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { registerSchema } from "~/lib/schemas";
import { sendNotification } from "~/server/send-notification";

export const eventRouter = createTRPCRouter({
  adventRegister: protectedProcedure.input(registerSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({ where: { id: ctx.session.user.id }, include: { events: true } });
    const event = await ctx.db.event.findUnique({ where: { name: "aoc2024" } });

    if (!user) throw new TRPCError({ message: "User not found.", code: "INTERNAL_SERVER_ERROR" });
    if (!event) throw new TRPCError({ message: "Event not found.", code: "INTERNAL_SERVER_ERROR" });

    if (user.events.some((event) => event.name === "aoc2024")) {
      throw new TRPCError({ message: "You have already registered for this event.", code: "FORBIDDEN" });
    }

    if (Date.now() >= event.eventEnd.getTime()) {
      throw new TRPCError({ message: "Event registration period has passed.", code: "FORBIDDEN" });
    }

    let newFlags = [...user.flags];

    if (input.schoolingStatus === "none") {
      newFlags = newFlags.filter((flag) => flag !== "ms_hs_college_eligible");
    } else {
      newFlags.push("ms_hs_college_eligible");
      newFlags = [...new Set(newFlags)];
    }

    await ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: {
        events: { connect: { name: "aoc2024" } },
        preferredEmail: input.preferredEmail,
        flags: { set: newFlags },
      },
    });

    sendNotification(
      [
        `User \`${user.id}\` registered for event \`aoc2024\`.`,
        `- Discord: \`${ctx.session.user.name}\``,
        `- Account email: \`${ctx.session.user.email}\``,
        `- Preferred email: \`${input.preferredEmail}\``,
        `- Country: \`${input.country}\``,
        `- Schooling status: \`${input.schoolingStatus}\``,
      ].join("\n"),
    );

    return;
  }),
});
