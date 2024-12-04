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
    <main className="mx-4 flex justify-center">
      <div className="container mt-8 flex flex-col justify-center lg:max-w-screen-lg xl:max-w-screen-xl">
        <h1 className="text-2xl font-bold">Challenges</h1>
        <Challenges session={session} />
      </div>
    </main>
  );
}
