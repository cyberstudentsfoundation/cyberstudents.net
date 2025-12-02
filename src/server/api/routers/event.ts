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

    if (["none", "college5"].includes(input.schoolingStatus)) {
      newFlags = newFlags.filter((flag) => flag !== "ms_hs_college_eligible");
    } else {
      newFlags.push("ms_hs_college_eligible");
      newFlags = [...new Set(newFlags)];
    }

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
        input.linkedin ? `- LinkedIn: <https://linkedin.com/in/${input.linkedin}>\`` : "",
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

    return;
  }),

  checkAccessCode: publicProcedure.input(checkAccessCodeSchema).mutation(async ({ input }) => {
    const codes = env.ACCESS_CODES?.trim().split(",") ?? [];
    return codes.includes(input.code);
  }),

  getLeaderboard: publicProcedure.input(getLeaderboardSchema).query(async ({ ctx, input }) => {
    const user = ctx.session?.user
      ? await ctx.db.user.findUnique({ where: { id: ctx.session.user.id }, include: { events: true } })
      : undefined;

    // Checks for logged in users but no user found in db
    if (user === null) throw new TRPCError({ message: "User not found.", code: "INTERNAL_SERVER_ERROR" });

    if (input.event !== "aoc2025") {
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
          include: {
            challenge: {
              include: {
                challengeAttempts: true,
              },
            },
          },
        },
      },
    });

    const challenges = await ctx.db.challenge.findMany({
      where: { eventName: input.event },
    });

    function calculatePointsAndLastSolve(user: (typeof users)[0]) {
      return {
        points: user.challengeAttempts.reduce((points, attempt) => {
          const solves = attempt.challenge.challengeAttempts.filter((a) => a.solvedAt).length;
          const k = 162;
          const factor = Math.min(1, k / (solves + (k - 1)));
          const value = Math.max(50, Math.floor(500 * Math.pow(factor, 1.5)));

          if (attempt.solvedAt) return points + value + (attempt.pointsAdjustment ?? 0);
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
        const aTime = aLastSolve?.getTime() ?? Number.MAX_SAFE_INTEGER;
        const bTime = bLastSolve?.getTime() ?? Number.MAX_SAFE_INTEGER;
        return aTime - bTime;
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
      publishedChallengesCompletion: (() => {
        const totalPublished = challenges.filter((c) => c.publishDate.getTime() <= Date.now()).length;
        if (totalPublished === 0) return 0;
        return user.challengeAttempts.filter((a) => a.solvedAt).length / totalPublished;
      })(),
      accuracy: (() => {
        const totalAttempts = user.challengeAttempts.reduce((acc, attempt) => acc + (attempt.attempts ?? 0), 0);
        if (totalAttempts === 0) return 0;
        return user.challengeAttempts.filter((a) => a.solvedAt).length / totalAttempts;
      })(),
    }));

    return {
      userPoints: user ? leaderboard.find((u) => u.id === user.id)?.points : null,
      userCompletion: user ? leaderboard.find((u) => u.id === user.id)?.publishedChallengesCompletion : null,
      userPlace: user ? leaderboard.indexOf(leaderboard.find((u) => u.id === user.id)!) + 1 : null,
      userMsHsCollegePlace: (() => {
        if (!user?.flags.includes("ms_hs_college_eligible")) return null;
        const msList = leaderboard.filter((u) => u.flags.includes("ms_hs_college_eligible"));
        const idx = msList.findIndex((u) => u.id === user.id);
        return idx === -1 ? null : idx + 1;
      })(),
      leaderboard: !input.onlyShowCurrentUser ? leaderboard : [],
      msHsCollegeLeaderboard: leaderboard.filter((u) => u.flags.includes("ms_hs_college_eligible")),
    };
  }),
});
