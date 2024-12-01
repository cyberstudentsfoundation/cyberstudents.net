import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="mx-4 my-6">
      <Link href="/advent" className="text-lg underline">
        2024 Advent of CTF
      </Link>
    </main>
  );
}
