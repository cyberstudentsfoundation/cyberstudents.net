import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  deleteChallengeSchema,
  deleteUserSchema,
  deleteWriteUpSchema,
  editChallengeSchema,
  editUserSchema,
  editWriteUpSchema,
  getVerificationSchema,
} from "~/lib/schemas";
import { sendNotification } from "~/server/send-notification";

export const dashboardRouter = createTRPCRouter({
  getEvents: adminProcedure.query(async ({ ctx }) => {
    const events = await ctx.db.event.findMany();
    return events;
  }),

  getAuthors: adminProcedure.query(async ({ ctx }) => {
    const authors = await ctx.db.user.findMany({
      where: { flags: { hasSome: ["author", "admin"] } },
      select: { id: true, name: true, image: true },
    });

    return authors;
  }),

  getChallenges: adminProcedure.query(async ({ ctx }) => {
    const challenges = await ctx.db.challenge.findMany({
      include: {
        author: true,
        challengeAttempts: true,
        event: true,
        hints: true,
        // writeUps: { include: { author: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    return challenges;
  }),

  editChallenge: adminProcedure.input(editChallengeSchema).mutation(async ({ ctx, input }) => {
    if (!input.id) {
      const challenge = await ctx.db.challenge.create({
        data: {
          authorId: input.authorId,
          title: input.title,
          category: input.category,
          points: input.points,
          description: input.description,
          hints: {
            createMany: {
              data: input.hints.map((hint) => ({
                number: hint.number,
                title: hint.title,
                content: hint.content,
                points: hint.points,
              })),
            },
          },
          files: { set: input.files },
          globalFlags: { set: input.globalFlags },
          areGlobalFlagsCaseSensitive: input.areGlobalFlagsCaseSensitive,
          globalRegexFlags: { set: input.globalRegexFlags },
          publishDate: input.publishDate,
          submissionsEnabled: input.submissionsEnabled,
          updatedAt: new Date(),
          published: false,
          eventName: "aoc2025",
        },
      });

      return challenge;
    }

    const challenge = await ctx.db.challenge.findUnique({ where: { id: input.id } });

    if (!challenge) {
      throw new TRPCError({ message: "Challenge not found", code: "NOT_FOUND" });
    }

    const { hints } = await ctx.db.challenge.update({
      where: { id: input.id },
      data: {
        authorId: input.authorId,
        title: input.title,
        category: input.category,
        points: input.points,
        description: input.description,
        files: { set: input.files },
        globalFlags: { set: input.globalFlags },
        areGlobalFlagsCaseSensitive: input.areGlobalFlagsCaseSensitive,
        globalRegexFlags: { set: input.globalRegexFlags },
        publishDate: input.publishDate,
        submissionsEnabled: input.submissionsEnabled,
      },
      include: { hints: true },
    });

    for (const hint of input.hints) {
      await ctx.db.challengeHint.upsert({
        where: { id: hints.find((h) => h.number === hint.number)?.id, challengeId: input.id, number: hint.number },
        update: { title: hint.title, content: hint.content, points: hint.points },
        create: {
          challengeId: input.id,
          number: hint.number,
          title: hint.title,
          content: hint.content,
          points: hint.points,
        },
      });
    }
  }),

  deleteChallenge: adminProcedure.input(deleteChallengeSchema).mutation(async ({ ctx, input }) => {
    const challenge = await ctx.db.challenge.findUnique({ where: { id: input.id } });

    if (!challenge) {
      throw new TRPCError({ message: "Challenge not found", code: "NOT_FOUND" });
    }

    await ctx.db.challenge.delete({ where: { id: input.id } });
  }),

  getWriteUps: adminProcedure.query(async ({ ctx }) => {
    const writeUps = await ctx.db.writeUp.findMany({
      include: { challenge: { include: { author: true } } },
      orderBy: { challenge: { publishDate: "desc" } },
    });

    return writeUps;
  }),

  // export const editWriteUpSchema = z.object({
  //   id: z.string().optional(), // if optional, it's a new write-up
  //   authorId: z.string(),
  //   challengeId: z.string(),
  //   publishDate: z.date(),
  //   authorPreferredName: z.string().optional(),
  //   authorMetadata: z.object({ github: z.string().optional(), linkedin: z.string().optional() }),
  //   title: z.string(),
  //   content: z.string(),
  //   originalURL: z.string().optional(),
  // });

  editWriteUp: adminProcedure.input(editWriteUpSchema).mutation(async ({ ctx, input }) => {
    const data = {
      challengeId: input.challengeId,
      publishDate: input.publishDate,
      authorPreferredName: input.authorPreferredName,
      authorMetadata: input.authorMetadata,
      title: input.title,
      content: input.content,
      originalURL: input.originalURL,
      contentCreatedAt: input.contentCreatedAt,
      contentUpdatedAt: input.contentUpdatedAt,
    };

    // Prevent custom ids from being used
    if (input.id) {
      const writeUp = await ctx.db.writeUp.findUnique({ where: { id: input.id } });

      if (!writeUp) {
        throw new TRPCError({ message: "Write-up not found", code: "NOT_FOUND" });
      }

      await ctx.db.writeUp.update({ where: { id: input.id }, data });
    } else {
      await ctx.db.writeUp.create({ data });
    }
  }),

  deleteWriteUp: adminProcedure.input(deleteWriteUpSchema).mutation(async ({ ctx, input }) => {
    const writeUp = await ctx.db.writeUp.findUnique({ where: { id: input.id } });

    if (!writeUp) {
      throw new TRPCError({ message: "Write-up not found", code: "NOT_FOUND" });
    }

    await ctx.db.writeUp.delete({ where: { id: input.id } });
  }),

  getVerifications: adminProcedure.query(async ({ ctx }) => {
    const verifications = await ctx.db.verification.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, user: true, userId: true, createdAt: true },
    });

    return verifications;
  }),

  getVerification: adminProcedure.input(getVerificationSchema).query(async ({ ctx, input }) => {
    const verification = await ctx.db.verification.findUnique({
      where: { id: input.id },
      include: {
        user: {
          include: { accounts: true },
        },
      },
    });

    return verification;
  }),

  getUsers: adminProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      include: {
        accounts: true,
        events: true,
        sessions: true,
      },
    });

    return users;
  }),

  editUser: adminProcedure.input(editUserSchema).mutation(async ({ ctx, input }) => {
    const data = {
      name: input.name,
      email: input.email,
      emailVerified: input.emailVerified,
      image: input.image,
      preferredEmail: input.preferredEmail,
      flags: { set: input.flags },
      note: input.note,
      events: { set: input.events.map((eventName) => ({ name: eventName })) },
      accounts: {
        set: input.accounts.map((account) => ({
          provider_providerAccountId: {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        })),
      },
      sessions: { set: input.sessions.map((token) => ({ sessionToken: token })) },
      displayName: input.displayName,
      schoolingStatus: input.schoolingStatus,
      linkedin: input.linkedin,
      howDidYouHearAboutUs: input.howDidYouHearAboutUs,
      allowSponsorContact: input.allowSponsorContact,
    };

    // Prevent custom ids from being used
    if (input.id) {
      const user = await ctx.db.user.findUnique({ where: { id: input.id } });

      if (!user) {
        throw new TRPCError({ message: "User not found", code: "NOT_FOUND" });
      }

      await ctx.db.user.update({ where: { id: input.id }, data });

      sendNotification(`User **${user.name}** (\`${user.email}\`; \`${user.id}\`) updated by admin through dashboard.`);
    } else {
      const user = await ctx.db.user.create({
        data: {
          ...data,
          events: {
            connect: input.events.map((eventName) => ({ name: eventName })),
          },
          accounts: {},
          sessions: {},
        },
      });

      sendNotification(`User **${user.name}** (\`${user.email}\`; \`${user.id}\`) created by admin through dashboard.`);
    }
  }),

  deleteUser: adminProcedure.input(deleteUserSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({ where: { id: input.id } });

    if (!user) {
      throw new TRPCError({ message: "User not found", code: "NOT_FOUND" });
    }

    await ctx.db.user.delete({ where: { id: input.id } });
  }),

  syncDivisions: adminProcedure.mutation(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      where: { events: { some: { name: "aoc2025" } }, schoolingStatus: { not: null } },
    });

    const updates: Array<{ where: { id: string }; data: { flags: { set: string[] } } }> = [];

    for (const user of users) {
      // "other" | "none" | "hs1" | "hs2" | "hs3" | "hs4" | "college1" | "college2" | "college3" | "college4" | "college5"
      const isHighSchool = ["hs1", "hs2", "hs3", "hs4"].includes(user.schoolingStatus as string);
      const isCollege = ["college1", "college2", "college3", "college4"].includes(user.schoolingStatus as string);

      const newFlags = user.flags.filter((flag) => flag !== "ms_hs_college_eligible" && flag !== "hs_eligible");

      if (isCollege) newFlags.push("ms_hs_college_eligible");
      if (isHighSchool) newFlags.push("hs_eligible");

      updates.push({ where: { id: user.id }, data: { flags: { set: newFlags } } });
    }

    if (updates.length > 0) {
      await ctx.db.$transaction(updates.map((u) => ctx.db.user.update(u)));
    }

    return { numUpdated: updates.length };
  }),
});
