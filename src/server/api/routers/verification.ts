import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { verificationSubmitSchema } from "~/lib/schemas";
import { env } from "~/env";
import cuid from "cuid";
import { sendNotification } from "~/server/send-notification";

export const verificationRouter = createTRPCRouter({
  fetchLastSubmissionDate: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({ where: { id: ctx.session.user.id }, include: { events: true } });
    if (!user) throw new TRPCError({ message: "User not found.", code: "INTERNAL_SERVER_ERROR" });

    const verification = await ctx.db.verification.findFirst({ where: { userId: user.id } });

    return { createdAt: verification?.createdAt ?? null };
  }),
  submit: protectedProcedure.input(verificationSubmitSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({ where: { id: ctx.session.user.id }, include: { events: true } });
    if (!user) throw new TRPCError({ message: "User not found.", code: "INTERNAL_SERVER_ERROR" });

    if (input.birthdate.getTime() > Date.now()) {
      throw new TRPCError({ message: "Birthdate is in the future", code: "BAD_REQUEST" });
    }

    // If birthdate entered is under 13 years old
    if (new Date(Date.now() - input.birthdate.getTime()).getFullYear() - 1970 < 13) {
      throw new TRPCError({ message: "Invalid birthdate", code: "FORBIDDEN" });
    }

    const id = cuid();

    let idFileName: string | null = null;

    if (input.idFile) {
      if (!input.idFileType) throw new TRPCError({ message: "Missing ID file type", code: "BAD_REQUEST" });

      const base64 = input.idFile.replace(/^data:image\/?[A-z]*;base64,/, "");
      const decoded = Buffer.from(base64, "base64");

      if (decoded.byteLength > 8e6) throw new TRPCError({ message: "ID file too large", code: "PAYLOAD_TOO_LARGE" });

      const hash = createHash("sha256");
      hash.update(decoded);
      const digest = hash.digest("hex");

      const mimeTypeExtension = { "image/jpeg": "jpg", "image/png": "png" };

      idFileName = `${id}_${digest}.${mimeTypeExtension[input.idFileType]}`;

      await writeFile(
        `${env.UPLOADS_PATH}/verifications/${id}_${digest}.${mimeTypeExtension[input.idFileType]}`,
        decoded,
      );
    }

    await ctx.db.verification.create({
      data: {
        id,
        userId: ctx.session.user.id,
        isStudent: input.isStudent,
        schoolName: input.schoolName,
        schoolYear: input.schoolYear,
        fullName: input.fullName,
        birthdate: input.birthdate,
        country: input.country,
        verificationMethod: input.verificationMethod,
        schoolEmail: input.schoolEmail,
        idFileName,
        idFileType: input.idFileType,
        comments: input.comments,
      },
    });

    const ipAddress = ctx.headers.get("x-forwarded-for") || "unknown";
    const userAgent = ctx.headers.get("user-agent") || "unknown";
    const acceptLanguage = ctx.headers.get("accept-language") || "unknown";

    sendNotification(
      [
        `**${user.name}** submitted a verification application. [\`[view application]\`](<${env.NEXTAUTH_URL}/dashboard/verifications?id=${id}>)`,
        `- IP address: \`${ipAddress}\``,
        `- User agent: \`${userAgent}\``,
        `- Accept language: \`${acceptLanguage}\``,
      ].join("\n"),
      { file: input.clientInfo, fileName: `verification-client-info-${id}.json` },
    );
  }),
});
