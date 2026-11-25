import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { logDbFallback } from "~/lib/advent-fallback";
import { ArchiveUnavailable } from "../../archive-unavailable";
import Challenges from "./challenges";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import Banner from "../banner";

export default async function Register() {
  const session = await getServerAuthSession();

  // Both Advent events have ended, so challenges are open to everyone (the router allows anonymous extended
  // fetches once eventEnd has passed). To gate a live event again, redirect unregistered users here.
  // Without a reachable database, show a short notice instead of an error page.
  const eventChallenges = await api.challenge.fetch({ event: "aoc2025", fetchExtended: true }).catch((e: unknown) => {
    logDbFallback("advent/2025/challenges", e);
    return null;
  });
  if (!eventChallenges) return <ArchiveUnavailable year={2025} />;

  // let user = null;
  // if (session?.user) {
  //   user = await api.user.me();
  // }

  return (
    <main>
      <Banner className="max-w-[112rem]" />
      <div className="mx-8 flex justify-center">
        <div className="mt-4 flex w-full max-w-[112rem] flex-col justify-center">
          {/* <div className="absolute top-20 hidden md:block">
          <p className="text-base font-bold text-gray-200">CyberStudents&rsquo;</p>
          <h1 className="mb-4 font-mono text-2xl font-bold">
            advent of ctf<span className="ml-3 font-sans font-light text-cyan-300">2024</span>
          </h1>
        </div> */}
          <Challenges eventChallenges={eventChallenges} session={session} />
          <div className="mt-4 flex items-center justify-end gap-1.5 text-sm text-gray-400">
            <HiOutlineQuestionMarkCircle className="h-5 w-5 shrink-0 text-gray-400" />
            <span>
              Need help with a challenge? Is a challenge broken? Open a ticket in our{" "}
              <a
                href="https://discord.com/invite/cyberstudents-916144903686336513"
                target="_blank"
                className="underline transition-colors hover:text-gray-300"
              >
                Discord server.
              </a>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
