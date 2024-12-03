import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { checkAccessCodeSchema, getLeaderboardSchema, registerSchema } from "~/lib/schemas";
import { sendNotification } from "~/server/send-notification";
import { env } from "~/env";

export const eventRouter = createTRPCRouter({
  adventRegister: protectedProcedure.input(registerSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { events: true, accounts: { select: { provider: true } } },
    });
    const event = await ctx.db.event.findUnique({ where: { name: "aoc2024" } });

    if (!user) throw new TRPCError({ message: "User not found.", code: "INTERNAL_SERVER_ERROR" });
    if (!event) throw new TRPCError({ message: "Event not found.", code: "INTERNAL_SERVER_ERROR" });

    if (user.accounts.some((account) => account.provider === "google")) {
      const codes = env.ACCESS_CODES?.trim().split(",") ?? [];
      if (!codes.includes(input.accessCode ?? "")) {
        throw new TRPCError({
          message: "An access code is required to register with a Google account.",
          code: "FORBIDDEN",
        });
      }
    }

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
        `- ${input.accessCode ? "Google" : "Discord"}: \`${ctx.session.user.name}\``,
        `- Account email: \`${ctx.session.user.email}\``,
        `- Preferred email: \`${input.preferredEmail}\``,
        `- Country: \`${input.country}\``,
        `- Schooling status: \`${input.schoolingStatus}\``,
        input.accessCode ? `- Access code: \`${input.accessCode}\`` : "",
      ].join("\n"),
    );

    return;
  }),

  checkAccessCode: publicProcedure.input(checkAccessCodeSchema).mutation(async ({ ctx, input }) => {
    const codes = env.ACCESS_CODES?.trim().split(",") ?? [];
    return codes.includes(input.code);
  }),

  getLeaderboard: publicProcedure.input(getLeaderboardSchema).query(async ({ ctx, input }) => {
    const user = ctx.session?.user
      ? await ctx.db.user.findUnique({ where: { id: ctx.session.user.id }, include: { events: true } })
      : undefined;

    // Checks for logged in users but no user found in db
    if (user === null) throw new TRPCError({ message: "User not found.", code: "INTERNAL_SERVER_ERROR" });

    if (input.event !== "aoc2024") {
      throw new TRPCError({ message: "Event not found.", code: "INTERNAL_SERVER_ERROR" });
    }

    const users = await ctx.db.user.findMany({
      where: {
        events: { some: { name: input.event } },
        // Only filter for users that have solved at least one challenge in the event
        challengeAttempts: { some: { challenge: { eventName: input.event }, solvedAt: { not: null } } },
      },
      include: {
        challengeAttempts: {
          where: { challenge: { eventName: input.event } },
          include: { challenge: true },
        },
      },
    });

    const challenges = await ctx.db.challenge.findMany({
      where: { eventName: input.event },
    });

    function calculatePointsAndLastSolve(user: (typeof users)[0]) {
      return {
        points: user.challengeAttempts.reduce((points, attempt) => {
          if (attempt.solvedAt) return points + attempt.challenge.points + (attempt.pointsAdjustment ?? 0);
          return points;
        }, 0),
        lastSolve: user.challengeAttempts
          .filter((a) => a.solvedAt)
          .sort((a, b) => b.solvedAt!.getTime() - a.solvedAt!.getTime())[0]?.solvedAt,
      };
    }

    const userPointsAndLastSolveMap = new Map(users.map((user) => [user.id, calculatePointsAndLastSolve(user)]));

    const sorted = users.sort((a, b) => {
      const { points: aPoints, lastSolve: aLastSolve } = userPointsAndLastSolveMap.get(a.id)!;
      const { points: bPoints, lastSolve: bLastSolve } = userPointsAndLastSolveMap.get(b.id)!;

      if (aPoints === bPoints) {
        return (aLastSolve?.getTime() ?? Infinity) - (bLastSolve?.getTime() ?? Infinity);
      }

      return bPoints - aPoints;
    });

    const leaderboard = sorted.map((user) => ({
      id: user.id,
      name: user.name,
      image: user.image,
      flags: user.flags.filter((flag) => flag === "ms_hs_college_eligible"),
      points: userPointsAndLastSolveMap.get(user.id)!.points,
      lastSolve: userPointsAndLastSolveMap.get(user.id)!.lastSolve,
      completedChallenges: user.challengeAttempts
        .filter((a) => a.solvedAt)
        .map((a) => ({ id: a.challenge.id, publishDate: a.challenge.publishDate })),
      totalPublishedChallenges: challenges.filter((c) => c.publishDate.getTime() <= Date.now()).length,
      publishedChallengesCompletion:
        user.challengeAttempts.filter((a) => a.solvedAt).length /
        challenges.filter((c) => c.publishDate.getTime() <= Date.now()).length,
      accuracy:
        user.challengeAttempts.filter((a) => a.solvedAt).length /
        user.challengeAttempts.reduce((totalAttempts, attempt) => totalAttempts + attempt.attempts, 0),
    }));

    return {
      userPoints: user ? leaderboard.find((u) => u.id === user.id)?.points : null,
      userCompletion: user ? leaderboard.find((u) => u.id === user.id)?.points : null,
      userPlace: user ? leaderboard.indexOf(leaderboard.find((u) => u.id === user.id)!) + 1 : null,
      userMsHsCollegePlace: user?.flags.includes("ms_hs_college_eligible")
        ? leaderboard
            .filter((u) => u.flags.includes("ms_hs_college_eligible"))
            .indexOf(leaderboard.find((u) => u.id === user.id)!) + 1
        : null,
      leaderboard: !input.onlyShowCurrentUser ? leaderboard : [],
      msHsCollegeLeaderboard: leaderboard.filter((u) => u.flags.includes("ms_hs_college_eligible")),
    };
  }),
});
