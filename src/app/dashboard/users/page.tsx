import { notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Users from "./users";

export default async function UsersPage() {
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
          <Users session={session} />
        </div>
      </div>
    </main>
  );
}
