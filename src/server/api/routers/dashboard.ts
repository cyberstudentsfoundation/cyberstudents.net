import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { challengeFetchPreviewSchema, challengeFetchSchema, submitFlagSchema } from "~/lib/schemas";
import { sendNotification } from "~/server/send-notification";

export const dashboardRouter = createTRPCRouter({
  getEvents: adminProcedure.query(async ({ ctx }) => {
    const events = await ctx.db.event.findMany();
    return events;
  }),

  getChallenges: adminProcedure.query(async ({ ctx, input }) => {
    const challenges = await ctx.db.challenge.findMany({
      include: { author: true, challengeAttempts: true, event: true, hints: true },
    });

    return challenges;
  }),
});
