import { notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Challenges from "./challenges";

export default async function ChallengesPage() {
  const session = await getServerAuthSession();

  let user = null;
  if (session?.user) {
    user = await api.user.me();
  }

  if (!user?.flags.includes("admin")) notFound();

  return (
    <main className="flex justify-center overflow-auto">
      <div className="flex w-full max-w-screen-2xl flex-col justify-center">
        <div>
          <Challenges session={session} />
        </div>
      </div>
    </main>
  );
}
