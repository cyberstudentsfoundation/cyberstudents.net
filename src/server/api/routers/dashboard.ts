import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  challengeFetchPreviewSchema,
  challengeFetchSchema,
  editChallengeSchema,
  submitFlagSchema,
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

  getChallenges: adminProcedure.query(async ({ ctx, input }) => {
    const challenges = await ctx.db.challenge.findMany({
      include: { author: true, challengeAttempts: true, event: true, hints: true },
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
          eventName: "aoc2024",
        },
      });

      return challenge;
    }

    const challenge = await ctx.db.challenge.findUnique({ where: { id: input.id } });

    if (!challenge) {
      throw new TRPCError({ message: "Challenge not found", code: "NOT_FOUND" });
    }

    await ctx.db.challenge.update({
      where: { id: input.id },
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
      },
    });
  }),
});
