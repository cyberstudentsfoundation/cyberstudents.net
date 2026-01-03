import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import Challenges from "./challenges";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import Banner from "../banner";

export default async function Register() {
  const session = await getServerAuthSession();

  // Uncomment for next event
  // 11/29/25: honestly, let logged out people preview challenges & even download links
  // just no instanced challenges ofc, and no hints so we encourage them to sign up

  if (!session?.user) redirect("/advent/2025/register?showError=true");

  const { events } = await api.user.me();
  if (!events.includes("aoc2025")) redirect("/advent/2025/register?showError=true");

  const eventChallenges = await api.challenge.fetch({ event: "aoc2025", fetchExtended: !!session?.user }); // change back to  for next event

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
