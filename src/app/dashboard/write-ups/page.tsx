import { notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import WriteUps from "./write-ups";

export default async function WriteUpsPage() {
  const session = await getServerAuthSession();

  let user = null;
  if (session?.user) {
    user = await api.user.me();
  }

  if (!user?.flags.includes("admin")) notFound();

  return (
    <main className="flex justify-center overflow-auto">
      <div className="flex w-full max-w-(--breakpoint-2xl) flex-col justify-center">
        <div>
          <WriteUps session={session} />
        </div>
      </div>
    </main>
  );
}
