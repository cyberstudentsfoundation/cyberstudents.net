import type { PrismaClient } from "@prisma/client";
import type { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { challengeFetchPreviewSchema, challengeFetchSchema, checkFlagSchema, submitFlagSchema } from "~/lib/schemas";
import { sendNotification } from "~/server/send-notification";
import { cachedForVisitors } from "~/server/visitor-cache";

function matchFlag(
  challenge: { globalFlags: string[]; globalRegexFlags: string[]; areGlobalFlagsCaseSensitive: boolean },
  rawFlag: string,
) {
  const flag = challenge.areGlobalFlagsCaseSensitive ? rawFlag.trim() : rawFlag.trim().toLowerCase();
  const globalFlags = challenge.areGlobalFlagsCaseSensitive
    ? challenge.globalFlags
    : challenge.globalFlags.map((f) => f.toLowerCase());

  return globalFlags.find((f) => f === flag) ?? challenge.globalRegexFlags.find((f) => new RegExp(f).test(flag));
}

// In-memory limit for the public flag checker: 20 checks per minute per client IP, per server instance.
const CHECK_FLAG_LIMIT = 20;
const CHECK_FLAG_WINDOW_MS = 60_000;
const checkFlagHits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const hits = (checkFlagHits.get(key) ?? []).filter((t) => now - t < CHECK_FLAG_WINDOW_MS);
  hits.push(now);
  checkFlagHits.set(key, hits);
  if (checkFlagHits.size > 10_000) checkFlagHits.clear();
  return hits.length > CHECK_FLAG_LIMIT;
}

/** Challenges of one event. Pass the signed-in player's id to include their own attempts; without it, the result is
 * the same for everyone and safe to cache. */
async function fetchEventChallenges(
  db: PrismaClient,
  sessionUserId: string | undefined,
  input: z.infer<typeof challengeFetchSchema>,
) {
  // hardcode check for now
  // if (input.event !== "aoc2024") {
  //   throw new TRPCError({ message: "Event not found.", code: "NOT_FOUND" });
  // }

  // eslint-disable-next-line prefer-const
  let user = sessionUserId
    ? await db.user.findUnique({ where: { id: sessionUserId }, include: { events: true } })
    : null;

  // Add back during next event

  // if (!user?.events.some((event) => event.name === "aoc2024")) {
  //   user = null;
  //   input.fetchExtended = false;
  // }

  const event = await db.event.findUnique({
    where: { name: input.event },
    include: {
      challenges: {
        where: { eventName: input.event },
        include: {
          author: true,
          hints: true,
          challengeAttempts: user ? { where: { userId: user.id } } : false,
          writeUps: true,
        },
        orderBy: { publishDate: "asc" },
      },
    },
  });

  if (!event) throw new TRPCError({ message: "Event not found.", code: "NOT_FOUND" });

  // fetchExtended will return user-dependent data like files, leaderboard, etc.
  if (
    !sessionUserId &&
    input.fetchExtended &&
    !(event.challengesPublicAfterEventEnd && event.eventEnd.getTime() < Date.now())
  ) {
    throw new TRPCError({
      message: "The fetchExtended option is only available to registered users of the event.",
      code: "FORBIDDEN",
    });
  }

  const allChallengeAttempts = await db.challenge.findMany({
    where: { eventName: input.event },
    select: {
      challengeAttempts: {
        select: {
          solvedAt: true,
          user: { select: { id: true, image: true, name: true, displayName: true, linkedin: true, flags: true } },
        },
      },
      id: true,
    },
  });

  const isChallengePublished = (challenge: { publishDate: Date }) => challenge.publishDate.getTime() <= Date.now();

  const eventChallenges = {
    name: event.name,
    eventEnd: event.eventEnd,
    challenges: event.challenges.map((challenge) => {
      const solves =
        allChallengeAttempts.find((c) => c.id === challenge.id)?.challengeAttempts.filter((a) => a.solvedAt).length ??
        0;

      const k = 162;
      const factor = Math.min(1, k / (solves + (k - 1)));
      const calculatedPoints = Math.max(50, Math.floor(500 * Math.pow(factor, 1.5)));

      return {
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
          input.fetchExtended && challenge.challengeAttempts?.[0]
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
        points: event.name === "aoc2024" ? challenge.points : calculatedPoints,
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
              // Only expose the chosen display name; the OAuth account name may be a real name.
              displayName: a.user.displayName ?? a.user.name,
              linkedin: a.user.linkedin,
              flags: a.user.flags.filter((f) => f === "ms_hs_college_eligible"), // only return ms_hs_college_eligible flag, if any
            },
            solvedAt: a.solvedAt!,
          })),

        // only fetch one write-up (for advent; remove in future)
        writeUps: input.fetchExtended
          ? challenge.writeUps
              .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())
              .filter((w) => w.publishDate.getTime() <= Date.now())
              .map((writeUp) => ({
                id: writeUp.id,
                createdAt: writeUp.createdAt,
                updatedAt: writeUp.updatedAt,
                publishDate: writeUp.publishDate,
                authorPreferredName: writeUp.authorPreferredName,
                authorMetadata: writeUp.authorMetadata,
                title: writeUp.title,
                content: writeUp.content,
                originalURL: writeUp.originalURL,
                contentCreatedAt: writeUp.contentCreatedAt,
                contentUpdatedAt: writeUp.contentUpdatedAt,
              }))
          : null,
      };
    }),
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
}

/** The calendar view of one event. It never depends on who is asking. */
async function fetchEventPreview(db: PrismaClient, input: z.infer<typeof challengeFetchPreviewSchema>) {
  // if (input.event !== "aoc2024") {
  //   throw new TRPCError({ message: "Event not found.", code: "NOT_FOUND" });
  // }

  const event = await db.event.findUnique({
    where: { name: input.event },
    include: {
      challenges: {
        where: { eventName: input.event },
        include: { author: true, challengeAttempts: true },
        orderBy: { publishDate: "asc" },
      },
    },
  });

  if (!event) throw new TRPCError({ message: "Event not found.", code: "NOT_FOUND" });

  const eventChallenges = {
    name: event.name,
    challenges: event.challenges.map((challenge) => {
      const solves = challenge.challengeAttempts.filter((a) => a.solvedAt).length ?? 0;
      const k = 162;
      const factor = Math.min(1, k / (solves + (k - 1)));
      const calculatedPoints = Math.max(50, Math.floor(500 * Math.pow(factor, 1.5)));

      return {
        id: challenge.id,
        published: challenge.publishDate.getTime() <= Date.now(),
        publishDate: challenge.publishDate,
        title: challenge.publishDate.getTime() <= Date.now() ? challenge.title : null,
        category: challenge.category as string | null,
        points: (event.name === "aoc2024" ? challenge.points : calculatedPoints) as number | null,
      };
    }),
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
}

export const challengeRouter = createTRPCRouter({
  fetch: publicProcedure.input(challengeFetchSchema).query(async ({ ctx, input }) => {
    // A signed-in player asking for their own progress gets a live answer. Everyone else shares a cached copy.
    const signedInUserId = input.fetchExtended ? ctx.session?.user?.id : undefined;
    if (signedInUserId) return fetchEventChallenges(ctx.db, signedInUserId, input);
    return cachedForVisitors("challenge.fetch", input.event, input, () =>
      fetchEventChallenges(ctx.db, undefined, input),
    );
  }),

  fetchPreview: publicProcedure
    .input(challengeFetchPreviewSchema)
    .query(({ ctx, input }) =>
      cachedForVisitors("challenge.fetchPreview", input.event, input, () => fetchEventPreview(ctx.db, input)),
    ),

  // Public, read-only flag check for events that have ended. Records nothing and sends no notifications.
  checkFlag: publicProcedure.input(checkFlagSchema).mutation(async ({ ctx, input }) => {
    const ip =
      ctx.headers.get("cf-connecting-ip") ?? ctx.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      throw new TRPCError({ message: "Too many checks. Try again in a minute.", code: "TOO_MANY_REQUESTS" });
    }

    const challenge = await ctx.db.challenge.findUnique({
      where: { id: input.challenge },
      select: {
        publishDate: true,
        globalFlags: true,
        globalRegexFlags: true,
        areGlobalFlagsCaseSensitive: true,
        event: { select: { eventEnd: true, challengesPublicAfterEventEnd: true } },
      },
    });

    if (!challenge || challenge.publishDate.getTime() > Date.now()) {
      throw new TRPCError({ message: "Challenge does not exist.", code: "NOT_FOUND" });
    }

    if (challenge.event.eventEnd.getTime() > Date.now() || !challenge.event.challengesPublicAfterEventEnd) {
      throw new TRPCError({ message: "Flags can only be checked here after the event has ended.", code: "FORBIDDEN" });
    }

    return !!matchFlag(challenge, input.flag);
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

    // whoops i forgot to add this in 2025
    if (challenge.eventName === "aoc2024") {
      throw new TRPCError({
        message:
          "This event has ended and is no longer accepting flag submissions. Thank you for playing in Advent of CTF 2024!",
        code: "FORBIDDEN",
      });
    }

    if (!user?.events.some((event) => event.name === "aoc2025")) {
      throw new TRPCError({ message: "You are not registered for this challenge's event.", code: "FORBIDDEN" });
    }

    if (Date.now() > (user.events.find((event) => event.name === "aoc2025")?.eventEnd.getTime() ?? 0)) {
      throw new TRPCError({
        message:
          "This event has ended and is no longer accepting flag submissions. Thank you for playing in Advent of CTF 2025!",
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
