import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { events: true, accounts: true },
    });
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
      accounts: user.accounts.map((account) => ({
        type: account.type,
        userId: account.userId,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        expires_at: account.expires_at,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
      })),
      displayName: user.displayName,
      displayNameUpdatedAt: user.displayNameUpdatedAt,
      schoolingStatus: user.schoolingStatus,
      country: user.country,
      howDidYouHearAboutUs: user.howDidYouHearAboutUs,
      linkedin: user.linkedin,
      allowSponsorContact: user.allowSponsorContact,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }),
});
