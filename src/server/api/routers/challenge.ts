import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { challengeFetchPreviewSchema, challengeFetchSchema, submitFlagSchema } from "~/lib/schemas";
import { sendNotification } from "~/server/send-notification";

export const challengeRouter = createTRPCRouter({
  fetch: protectedProcedure.input(challengeFetchSchema).query(async ({ ctx, input }) => {
    // fetchExtended will return user-dependent data like files, leaderboard, etc.
    if (!ctx.session?.user && input.fetchExtended) {
      throw new TRPCError({
        message: "The fetchExtended option is only available to registered users of the event.",
        code: "FORBIDDEN",
      });
    }

    // hardcode check for now
    if (input.event !== "aoc2024") {
      throw new TRPCError({ message: "Event not found.", code: "NOT_FOUND" });
    }

    let user = ctx.session?.user
      ? await ctx.db.user.findUnique({ where: { id: ctx.session.user.id }, include: { events: true } })
      : null;

    if (!user?.events.some((event) => event.name === "aoc2024")) {
      user = null;
      input.fetchExtended = false;
    }

    const event = await ctx.db.event.findUnique({
      where: { name: input.event },
      include: {
        challenges: {
          where: { eventName: input.event },
          include: {
            author: true,
            hints: true,
            challengeAttempts: user ? { where: { userId: ctx.session!.user.id } } : false,
          },
          orderBy: { publishDate: "asc" },
        },
      },
    });

    if (!event) throw new TRPCError({ message: "Event not found.", code: "NOT_FOUND" });

    const allChallengeAttempts = await ctx.db.challenge.findMany({
      where: { eventName: input.event },
      select: {
        challengeAttempts: {
          select: { solvedAt: true, user: { select: { id: true, image: true, name: true, flags: true } } },
        },
        id: true,
      },
    });

    const isChallengePublished = (challenge: { publishDate: Date }) => challenge.publishDate.getTime() <= Date.now();

    const eventChallenges = {
      name: event.name,
      challenges: event.challenges.map((challenge) => ({
        id: challenge.id,
        createdAt: challenge.createdAt,
        updatedAt: challenge.updatedAt,
        published: challenge.publishDate.getTime() <= Date.now(),
        publishDate: challenge.publishDate,
        submissionsEnabled: challenge.submissionsEnabled,

        author: {
          id: challenge.author.id,
          name: challenge.author.name,
          image: challenge.author.image,
        },

        challengeAttempt:
          input.fetchExtended && challenge.challengeAttempts[0]
            ? {
                id: challenge.challengeAttempts[0].id,
                createdAt: challenge.challengeAttempts[0].createdAt,
                solvedAt: challenge.challengeAttempts[0].solvedAt,
                attempts: challenge.challengeAttempts[0].attempts,
                pointsAdjustment: challenge.challengeAttempts[0].pointsAdjustment,
              }
            : null,

        title: isChallengePublished(challenge) ? challenge.title : null,
        category: challenge.category,
        points: challenge.points,
        hints: [] as { id: string; number: number; title: string; content: string }[], // assigned below
        description: isChallengePublished(challenge) && input.fetchExtended ? challenge.description : null,
        files: isChallengePublished(challenge) && input.fetchExtended ? challenge.files : null,

        solvedPlayers: allChallengeAttempts
          .find((c) => c.id === challenge.id)
          ?.challengeAttempts.filter((a) => a.solvedAt)
          .sort((a, b) => a.solvedAt!.getTime() - b.solvedAt!.getTime())
          .map((a) => ({
            user: {
              id: a.user.id,
              image: a.user.image,
              name: a.user.name,
              flags: a.user.flags.filter((f) => f === "ms_hs_college_eligible"), // only return ms_hs_college_eligible flag, if any
            },
            solvedAt: a.solvedAt!,
          })),
      })),
    };

    for (const challenge of eventChallenges.challenges) {
      if (!isChallengePublished(challenge)) continue;

      const releasedHints: number[] = [];

      // 1st hint: 12 hours
      if (Date.now() >= challenge.publishDate.getTime() + 4.32e7) {
        releasedHints.push(1);
      }

      // 2nd hint: 24 hours
      if (Date.now() >= challenge.publishDate.getTime() + 8.64e7) {
        releasedHints.push(2);
      }

      for (const hintNumber of releasedHints) {
        const hint = event.challenges.find((c) => c.id === challenge.id)!.hints.find((h) => h.number === hintNumber);
        if (!hint) continue;

        challenge.hints.push({
          id: hint.id,
          number: hint.number,
          title: hint.title,
          content: hint.content,
        });
      }
    }

    return eventChallenges;

    // TODO: # of solves
    // TODO: check if hints work with 12/24 hours
    // TODO: figure out a way to make challs private? or have smth to distinguish between unpublished and private
  }),

  fetchPreview: publicProcedure.input(challengeFetchPreviewSchema).query(async ({ ctx, input }) => {
    if (input.event !== "aoc2024") {
      throw new TRPCError({ message: "Event not found.", code: "NOT_FOUND" });
    }

    const event = await ctx.db.event.findUnique({
      where: { name: input.event },
      include: {
        challenges: {
          where: { eventName: input.event },
          include: { author: true },
          orderBy: { publishDate: "asc" },
        },
      },
    });

    if (!event) throw new TRPCError({ message: "Event not found.", code: "NOT_FOUND" });

    const eventChallenges = {
      name: event.name,
      challenges: event.challenges.map((challenge) => ({
        id: challenge.id,
        published: challenge.publishDate.getTime() <= Date.now(),
        publishDate: challenge.publishDate,
        title: challenge.publishDate.getTime() <= Date.now() ? challenge.title : null,
        category: challenge.category as string | null,
        points: challenge.points as number | null,
      })),
    };

    const now = new Date();

    for (let i = eventChallenges.challenges.length + 1; i <= 25; i++) {
      eventChallenges.challenges.push({
        id: `placeholder-${i}`,
        published: false,
        publishDate: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), i, 20, 0, 0, 0)),
        title: null,
        category: null,
        points: null,
      });
    }

    return eventChallenges;
  }),

  submitFlag: protectedProcedure.input(submitFlagSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({ where: { id: ctx.session.user.id }, include: { events: true } });
    const challenge = await ctx.db.challenge.findUnique({
      where: { id: input.challenge },
      include: { challengeAttempts: { where: { userId: ctx.session.user.id } } },
    });

    if (!challenge) {
      throw new TRPCError({ message: "Challenge does not exist.", code: "NOT_FOUND" });
    }

    if (!(challenge.publishDate.getTime() <= Date.now()) || !challenge.submissionsEnabled) {
      throw new TRPCError({ message: "Challenge is not published or submissions are disabled", code: "FORBIDDEN" });
    }

    if (!user?.events.some((event) => event.name === "aoc2024")) {
      throw new TRPCError({ message: "You are not registered for this challenge's event.", code: "FORBIDDEN" });
    }

    if (Date.now() > (user.events.find((event) => event.name === "aoc2024")?.eventEnd.getTime() ?? 0)) {
      throw new TRPCError({
        message:
          "This event has ended and is no longer accepting flag submissions. Thank you for playing in Advent of CTF 2024!",
        code: "FORBIDDEN",
      });
    }

    if ((challenge.challengeAttempts[0]?.lastAttemptAt?.getTime() ?? 0) + 30_000 > Date.now()) {
      throw new TRPCError({
        message: "You may only submit one flag every 30 seconds per challenge.",
        code: "TOO_MANY_REQUESTS",
      });
    }

    if (!challenge.areGlobalFlagsCaseSensitive) {
      input.flag = input.flag.toLowerCase();
      challenge.globalFlags = challenge.globalFlags.map((f) => f.toLowerCase());
    }

    const matchingFlag =
      challenge.globalFlags.find((f) => f === input.flag.trim()) ||
      challenge.globalRegexFlags.find((f) => new RegExp(f).test(input.flag.trim()));

    if (matchingFlag) {
      // For re-checking flags
      if (challenge.challengeAttempts[0]?.solvedAt) return true;

      const { attempts } = await ctx.db.challengeAttempt.upsert({
        where: { userId_challengeId: { userId: user.id, challengeId: challenge.id } },
        update: { solvedAt: new Date(), attempts: { increment: 1 }, lastAttemptAt: new Date() },
        create: {
          challengeId: challenge.id,
          userId: user.id,
          solvedAt: new Date(),
          attempts: 1,
          lastAttemptAt: new Date(),
        },
      });

      sendNotification(
        `**${user.name}** solved **${challenge.title}** with the flag \`${matchingFlag}\` after ${attempts} attempt(s).`,
      );

      return true; // TODO: actual exponential rate limiting; return a date for the client to use
    } else {
      // For re-checking flags
      if (challenge.challengeAttempts[0]?.solvedAt) return false;

      const { attempts } = await ctx.db.challengeAttempt.upsert({
        where: { userId_challengeId: { userId: user.id, challengeId: challenge.id } },
        update: { attempts: { increment: 1 }, lastAttemptAt: new Date() },
        create: { challengeId: challenge.id, userId: user.id, attempts: 1, lastAttemptAt: new Date() },
      });

      sendNotification(
        `**${user.name}** attempted **${challenge.title}** with the incorrect flag \`${input.flag}\` (${attempts} attempt(s) so far).`,
      );

      return false;
    }
  }),
});
