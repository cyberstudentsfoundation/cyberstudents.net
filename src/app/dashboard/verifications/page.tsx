import { notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Verifications from "./verifications";

export default async function DashboardVerificationsPage() {
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
          <Verifications session={session} />
        </div>
      </div>
    </main>
  );
}
