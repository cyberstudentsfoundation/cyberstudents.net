import { type NextRequest } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { readFile } from "node:fs/promises";
import { env } from "~/env";

export async function GET(request: NextRequest) {
  const session = await getServerAuthSession();

  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  const user = await db.user.findUnique({ where: { id: session.user.id }, select: { id: true, flags: true } });
  if (!user) return new Response("User not found.", { status: 500 });

  if (!user.flags.includes("admin")) return new Response("Unauthorized", { status: 401 });

  const verificationId = request.nextUrl.searchParams.get("id");
  if (!verificationId) return new Response("Missing id", { status: 400 });

  const verification = await db.verification.findUnique({
    where: { id: verificationId },
    select: { id: true, idFileName: true, idFileType: true },
  });

  if (!verification) return new Response("No verification application found", { status: 404 });
  if (!verification.idFileName) return new Response("Verification application does not have a file", { status: 404 });
  if (!verification.idFileType) return new Response("Verification application is missing a file type", { status: 404 });

  const file = await readFile(`${env.UPLOADS_PATH}/verifications/${verification.idFileName}`);

  return new Response(file, { headers: { "Content-Type": verification.idFileType } });
}
