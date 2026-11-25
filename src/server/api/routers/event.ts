import type { PrismaClient } from "@prisma/client";
import type { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { checkAccessCodeSchema, getLeaderboardSchema, registerSchema } from "~/lib/schemas";
import { sendNotification } from "~/server/send-notification";
import { env } from "~/env";
import { cachedForVisitors } from "~/server/visitor-cache";

export const eventRouter = createTRPCRouter({
  adventRegister: protectedProcedure.input(registerSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { events: true, accounts: { select: { provider: true } } },
    });
    const event = await ctx.db.event.findUnique({ where: { name: "aoc2025" } });

    if (!user) throw new TRPCError({ message: "User not found.", code: "INTERNAL_SERVER_ERROR" });
    if (!event) throw new TRPCError({ message: "Event not found.", code: "INTERNAL_SERVER_ERROR" });

    // if (user.accounts.some((account) => account.provider === "google")) {
    //   const codes = env.ACCESS_CODES?.trim().split(",") ?? [];
    //   if (!codes.includes(input.accessCode ?? "")) {
    //     throw new TRPCError({
    //       message: "An access code is required to register with a Google account.",
    //       code: "FORBIDDEN",
    //     });
    //   }
    // }

    if (user.events.some((event) => event.name === "aoc2025")) {
      throw new TRPCError({ message: "You have already registered for this event.", code: "FORBIDDEN" });
    }

    if (Date.now() >= event.eventEnd.getTime()) {
      throw new TRPCError({ message: "Event registration period has passed.", code: "FORBIDDEN" });
    }

    let newFlags = [...user.flags];

    const isHighSchool = ["hs1", "hs2", "hs3", "hs4"].includes(input.schoolingStatus);
    const isCollege = ["college1", "college2", "college3", "college4"].includes(input.schoolingStatus);

    if (isCollege) newFlags.push("ms_hs_college_eligible");
    if (isHighSchool) newFlags.push("hs_eligible");

    newFlags = [...new Set(newFlags)];

    await ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: {
        events: { connect: { name: "aoc2025" } },
        preferredEmail: input.preferredEmail,
        flags: { set: newFlags },
        schoolingStatus: input.schoolingStatus,
        country: input.country,
        howDidYouHearAboutUs: input.howDidYouHearAboutUs,
        displayName: input.displayName,
        displayNameUpdatedAt: new Date(),
        linkedin: input.linkedin,
        allowSponsorContact: input.allowSponsorContact,
      },
    });

    sendNotification(
      [
        `User \`${user.id}\` registered for event \`aoc2025\`.`,
        `- ${user.accounts.map((account) => account.provider[0]?.toUpperCase() + account.provider.slice(1)).join(", ")}: \`${ctx.session.user.name}\``,
        `- Account email: \`${ctx.session.user.email}\``,
        `- Preferred email: \`${input.preferredEmail}\``,
        `- Country: \`${input.country}\``,
        `- Schooling status: \`${input.schoolingStatus}\``,
        `- How did you hear about us: \`${input.howDidYouHearAboutUs}\``,
        input.displayName ? `- Display name: \`${input.displayName}\`` : "",
        input.linkedin ? `- LinkedIn: <https://linkedin.com/in/${input.linkedin}>` : "",
        `- Allow sponsor contact: ${input.allowSponsorContact}`,
        input.accessCode ? `- Access code: \`${input.accessCode}\`` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

    return;
  }),

  adventUpdateRegistration: protectedProcedure.input(registerSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { events: true },
    });

    if (!user) throw new TRPCError({ message: "User not found.", code: "INTERNAL_SERVER_ERROR" });

    if (!user.events.some((event) => event.name === "aoc2025")) {
      throw new TRPCError({ message: "You are not registered for this event.", code: "FORBIDDEN" });
    }

    if (
      user.displayName &&
      input.displayName !== user.displayName &&
      Date.now() - (user.displayNameUpdatedAt?.getTime() ?? 0) < 60 * 60 * 1000
    ) {
      throw new TRPCError({
        message: "You can only change your display name once per hour.",
        code: "TOO_MANY_REQUESTS",
      });
    }

    // Do not allow flags to be changed:
    // let newFlags = [...user.flags];

    // if (["none", "college5"].includes(input.schoolingStatus)) {
    //   newFlags = newFlags.filter((flag) => flag !== "ms_hs_college_eligible");
    // }
    // else {
    //   newFlags.push("ms_hs_college_eligible");
    //   newFlags = [...new Set(newFlags)];
    // }

    await ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: {
        preferredEmail: input.preferredEmail,
        schoolingStatus: input.schoolingStatus,
        country: input.country,
        // flags: { set: newFlags },
        howDidYouHearAboutUs: input.howDidYouHearAboutUs,
        displayName: input.displayName,
        displayNameUpdatedAt: input.displayName !== user.displayName ? new Date() : user.displayNameUpdatedAt,
        linkedin: input.linkedin,
        allowSponsorContact: input.allowSponsorContact,
      },
    });

    // send notification on changed fields (only included modified ones)
    sendNotification(
      [
        `User \`${user.id}\` updated their registration for event \`aoc2025\`.`,
        input.preferredEmail !== user.preferredEmail
          ? `- Preferred email: \`${input.preferredEmail}\` (was: \`${user.preferredEmail}\`)`
          : "",
        input.country !== user.country ? `- Country: \`${input.country}\` (was: \`${user.country}\`)` : "",
        input.schoolingStatus !== user.schoolingStatus
          ? `- Schooling status: \`${input.schoolingStatus}\` (was: \`${user.schoolingStatus}\`)`
          : "",
        input.howDidYouHearAboutUs !== user.howDidYouHearAboutUs
          ? `- How did you hear about us: \`${input.howDidYouHearAboutUs}\` (was: \`${user.howDidYouHearAboutUs}\`)`
          : "",
        input.displayName !== user.displayName
          ? `- Display name: \`${input.displayName}\` (was:
  \`${user.displayName}\`)`
          : "",
        input.linkedin !== user.linkedin
          ? `- LinkedIn: <https://linkedin.com/in/${input.linkedin}> (was: <https://linkedin.com/in/${user.linkedin}>)`
          : "",
        input.allowSponsorContact !== user.allowSponsorContact
          ? `- Allow sponsor contact: ${input.allowSponsorContact} (was: ${user.allowSponsorContact})`
          : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

    return;
  }),

  checkAccessCode: publicProcedure.input(checkAccessCodeSchema).mutation(async ({ input }) => {
    const codes = env.ACCESS_CODES?.trim().split(",") ?? [];
    return codes.includes(input.code);
  }),

  getLeaderboard: publicProcedure.input(getLeaderboardSchema).query(async ({ ctx, input }) => {
    const authUserId = ctx.session?.user?.id ?? null;
    if (authUserId) return fetchLeaderboard(ctx.db, authUserId, input);
    // Signed-out visitors all see the same leaderboard, so they share a cached copy.
    return cachedForVisitors("event.getLeaderboard", input.event, input, () => fetchLeaderboard(ctx.db, null, input));
  }),
});

/** One event's leaderboard. Pass the signed-in user's id to fill in their own place; without it, the result is the
 * same for everyone and safe to cache. */
async function fetchLeaderboard(
  db: PrismaClient,
  authUserId: string | null,
  input: z.infer<typeof getLeaderboardSchema>,
) {
  const inDev = false; // env.NODE_ENV === "development";

  if (inDev) console.time("Leaderboard: Total time");

  const user = authUserId
    ? await db.user.findUnique({
        where: { id: authUserId },
        include: { events: true },
      })
    : undefined;

  // Checks for logged in users but no user found in db
  if (user === null) {
    throw new TRPCError({
      message: "User not found.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  // --- 1) Get all users eligible for this event & with at least one solve ---

  if (inDev) console.time("Leaderboard: Fetch users");

  let users = await db.user.findMany({
    where: {
      // this has been moved to server-side and not db for performance (hopefully)
      // NOT: { flags: { has: "suspended" } },
      events: { some: { name: input.event } },
      // challengeAttempts: {
      //   some: {
      //     challenge: { eventName: input.event },
      //     solvedAt: { not: null },
      //   },
      // },
    },
    select: {
      id: true,
      name: true,
      displayName: true,
      linkedin: true,
      image: true,
      flags: true,
    },
  });

  if (inDev) console.timeEnd("Leaderboard: Fetch users");

  if (users.length === 0) {
    return {
      userPoints: null,
      userCompletion: null,
      userPlace: null,
      userMsHsCollegePlace: null,
      userHsPlace: null,
      leaderboard: [],
      msHsCollegeLeaderboard: [],
      hsLeaderboard: [],
    };
  }

  users = users.filter((u) => !u.flags.includes("suspended") && !u.flags.includes("admin"));
  const userIds = users.map((u) => u.id);

  // --- 2) Get all attempts for these users for this event ---

  if (inDev) console.time("Leaderboard: Fetch challenge attempts");

  const challengeAttempts = await db.challengeAttempt.findMany({
    where: {
      userId: { in: userIds },
      challenge: { eventName: input.event },
    },
    select: {
      id: true,
      userId: true,
      solvedAt: true,
      attempts: true,
      pointsAdjustment: true,
      challengeId: true,
      challenge: {
        select: {
          id: true,
          publishDate: true,
          points: true,
        },
      },
    },
  });

  if (inDev) console.timeEnd("Leaderboard: Fetch challenge attempts");

  // Group attempts by user for quick lookup
  const attemptsByUser = new Map<string, typeof challengeAttempts>();

  for (const attempt of challengeAttempts) {
    let arr = attemptsByUser.get(attempt.userId);
    if (!arr) {
      arr = [];
      attemptsByUser.set(attempt.userId, arr);
    }
    arr.push(attempt);
  }

  // --- 3) Precompute solver counts per challenge (for dynamic scoring) ---

  if (inDev) console.time("Leaderboard: Fetch solver counts (groupBy)");

  const solverCounts = await db.challengeAttempt.groupBy({
    by: ["challengeId"],
    where: {
      solvedAt: { not: null },
      challenge: { eventName: input.event },
    },
    _count: { _all: true },
  });

  if (inDev) console.timeEnd("Leaderboard: Fetch solver counts (groupBy)");

  const dynamicPointsByChallengeId = new Map<string, number>();

  if (input.event !== "aoc2024") {
    for (const row of solverCounts) {
      const solves = row._count._all;
      const k = 162;
      const factor = Math.min(1, k / (solves + (k - 1)));
      const value = Math.max(50, Math.floor(500 * Math.pow(factor, 1.5)));

      dynamicPointsByChallengeId.set(row.challengeId, value);
    }
  }

  // const solveCountMap = new Map<string, number>(solverCounts.map((row) => [row.challengeId, row._count._all]));

  // --- 4) Get all challenges for this event ---

  if (inDev) console.time("Leaderboard: Fetch challenges --> sorted");

  const challenges = await db.challenge.findMany({
    where: { eventName: input.event },
    select: {
      id: true,
      publishDate: true,
    },
  });

  const now = Date.now();
  const totalPublishedChallenges = challenges.filter((c) => c.publishDate.getTime() <= now).length;

  // --- 5) Helper: compute points + lastSolve for a single user ---

  const calculatePointsAndLastSolve = (userAttempts: typeof challengeAttempts) => {
    let points = 0;
    let lastSolve: Date | null = null;

    for (const attempt of userAttempts) {
      if (!attempt.solvedAt) continue;

      if (!lastSolve || attempt.solvedAt > lastSolve) {
        lastSolve = attempt.solvedAt;
      }

      let basePoints = 0;

      if (input.event === "aoc2024") {
        basePoints = attempt.challenge.points ?? 0;
      } else {
        basePoints = dynamicPointsByChallengeId.get(attempt.challengeId) ?? 0;
      }

      points += basePoints + (attempt.pointsAdjustment ?? 0);
    }

    return { points, lastSolve };
  };

  // --- 6) Build per-user leaderboard objects (unsorted) ---

  const baseLeaderboard = users.map((u) => {
    const userAttempts = attemptsByUser.get(u.id) ?? [];
    const { points, lastSolve } = calculatePointsAndLastSolve(userAttempts);

    const solvedAttempts = userAttempts.filter((a) => a.solvedAt);
    const totalAttempts = userAttempts.reduce((acc, a) => acc + (a.attempts ?? 0), 0);

    const completedChallenges = solvedAttempts.map((a) => ({
      id: a.challenge.id,
      publishDate: a.challenge.publishDate,
    }));

    const publishedChallengesCompletion =
      totalPublishedChallenges === 0 ? 0 : solvedAttempts.length / totalPublishedChallenges;

    const accuracy = totalAttempts === 0 ? 0 : solvedAttempts.length / totalAttempts;

    return {
      id: u.id,
      // Only expose the chosen display name; the OAuth account name may be a real name.
      displayName: u.displayName ?? u.name,
      linkedin: u.linkedin,
      image: u.image,
      flags: u.flags.filter((flag) => ["ms_hs_college_eligible", "hs_eligible"].includes(flag)),
      // metrics
      points,
      lastSolve,
      completedChallenges,
      totalPublishedChallenges,
      publishedChallengesCompletion,
      accuracy,
    };
  });

  // --- 7) Sort by points desc, then lastSolve asc (same logic as before) ---

  const sorted = baseLeaderboard.sort((a, b) => {
    if (a.points === b.points) {
      const aTime = a.lastSolve?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const bTime = b.lastSolve?.getTime() ?? Number.MAX_SAFE_INTEGER;
      return aTime - bTime;
    }
    return b.points - a.points;
  });

  const leaderboard = sorted;

  // Current user entry (if logged in & in leaderboard)
  const currentUserEntry = user && authUserId ? (leaderboard.find((u) => u.id === authUserId) ?? null) : null;

  // --- 8) Places & filtered leaderboards ---

  const userPoints = currentUserEntry?.points ?? null;
  const userCompletion = currentUserEntry?.publishedChallengesCompletion ?? null;

  const userPlace =
    user && authUserId
      ? (() => {
          const idx = leaderboard.findIndex((u) => u.id === authUserId);
          return idx === -1 ? null : idx + 1;
        })()
      : null;

  const msHsCollegeLeaderboard = leaderboard.filter((u) => u.flags.includes("ms_hs_college_eligible"));
  const hsLeaderboard = leaderboard.filter((u) => u.flags.includes("hs_eligible"));

  const userMsHsCollegePlace =
    user && user.flags.includes("ms_hs_college_eligible")
      ? (() => {
          const idx = msHsCollegeLeaderboard.findIndex((u) => u.id === authUserId);
          return idx === -1 ? null : idx + 1;
        })()
      : null;

  const userHsPlace =
    user && user.flags.includes("hs_eligible")
      ? (() => {
          const idx = hsLeaderboard.findIndex((u) => u.id === authUserId);
          return idx === -1 ? null : idx + 1;
        })()
      : null;

  if (inDev) console.timeEnd("Leaderboard: Fetch challenges --> sorted");
  if (inDev) console.timeEnd("Leaderboard: Total time");

  return {
    userPoints,
    userCompletion,
    userPlace,
    userMsHsCollegePlace,
    userHsPlace,
    leaderboard: !input.onlyShowCurrentUser ? leaderboard : [],
    // msHsCollegeLeaderboard,
    // hsLeaderboard,
  };
}
