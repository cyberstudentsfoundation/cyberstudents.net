import { notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  let user = null;
  if (session?.user) {
    user = await api.user.me();
  }

  if (!user?.flags.includes("admin")) notFound();

  return <main className="mx-4 my-6">it&apos;d be a miracle if i got dashboard done before christmas</main>;
}
