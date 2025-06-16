import { HiOutlineAcademicCap, HiOutlineLifebuoy, HiOutlineTrophy } from "react-icons/hi2";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import { api } from "~/trpc/server";
import Image from "next/image";
import icsred from "../../../public/icsred.png";
import Countdown from "~/components/Countdown";
import { Button } from "~/components/ui/button";
import { CgBrowser } from "react-icons/cg";
import { FaTableCellsRowLock, FaMagnifyingGlassChart, FaGear } from "react-icons/fa6";
import { LuBinary } from "react-icons/lu";
import { BiNetworkChart } from "react-icons/bi";

export default async function Advent() {
  const session = await getServerAuthSession();

  let user = null;
  if (session?.user) {
    user = await api.user.me();
  }

  const eventChallenges = await api.challenge.fetchPreview({ event: "aoc2024" });

  return (
    <main className="mx-4">
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-(--breakpoint-2xl)">
          <div className="flex flex-col items-center justify-between gap-16 xl:flex-row xl:gap-8">
            <div className="max-w-prose">
              <p className="mb-1 text-2xl font-bold text-gray-200">CyberStudents&rsquo;</p>
              <h1 className="font-mono text-5xl font-bold">
                advent of ctf<span className="ml-5 font-sans font-light text-cyan-300">2024</span>
              </h1>
              <p className="mt-8 text-lg">
                Every day from December 1st to 25th, solve beginner-oriented gamified cybersecurity challenges. Get
                familiar with capture-the-flag challenges and cyber concepts from a wide range of popular categories.
              </p>
              <ul className="mb-8 mt-6 text-lg">
                <li className="mb-1.5 flex items-center gap-1.5">
                  <HiOutlineAcademicCap className="h-6 w-6 shrink-0" />
                  <span>Beginner-oriented; challenges get harder as the month progresses</span>
                </li>
                <li className="mb-1.5 flex items-center gap-1.5">
                  <HiOutlineTrophy className="h-6 w-6 shrink-0" />
                  <span>$280 prize pool ($225 for high school and college students)</span>
                </li>
                <li className="mb-1.5 flex items-center gap-1.5">
                  <HiOutlineLifebuoy className="h-6 w-6 shrink-0" />
                  <span>Hints release for each challenge after 12 and 24 hours; help allowed</span>
                </li>
              </ul>
              {/* <p className="mb-8 text-sm text-gray-400">
                *Community help is always allowed; staff can help after someone has solved the challenge.
              </p> */}
              <div className="mb-8 grid grid-cols-2 gap-y-4 md:grid-cols-3 md:gap-y-8">
                <div className="flex flex-col items-center">
                  <CgBrowser className="h-7 w-7" />
                  <span>Web exploitation</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaTableCellsRowLock className="h-7 w-7" />
                  <span>Cryptography</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaMagnifyingGlassChart className="h-7 w-7" />
                  <span>Forensics</span>
                </div>
                <div className="flex flex-col items-center">
                  <LuBinary className="h-7 w-7" />
                  <span>Binary exploitation</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaGear className="h-7 w-7" />
                  <span>Reverse engineering</span>
                </div>
                <div className="flex flex-col items-center">
                  <BiNetworkChart className="h-7 w-7" />
                  <span>OSINT</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0 xl:justify-normal xl:gap-24">
                <div className="flex flex-col items-center sm:items-start">
                  <Button size="lg" className="text-lg" asChild>
                    <Link href="/advent/2024">See results &amp; stats</Link>
                  </Button>
                  <div className="mt-2 text-sm text-gray-400">This event ended on December 31, 2024.</div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-gray-400">Sponsored by</p>
                  <Link href="/advent/2024#a-note-on-the-delay-of-prizes">
                    <Image src={icsred} alt="ICSRED Logo" className="h-32 w-32 rounded-lg opacity-70" />
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-1 grid w-full max-w-3xl grid-cols-7 text-gray-400">
                <div className="flex items-center justify-center">S</div>
                <div className="flex items-center justify-center">M</div>
                <div className="flex items-center justify-center">T</div>
                <div className="flex items-center justify-center">W</div>
                <div className="flex items-center justify-center">T</div>
                <div className="flex items-center justify-center">F</div>
                <div className="flex items-center justify-center">S</div>
              </div>
              <div className="grid w-full max-w-3xl grid-cols-7 grid-rows-4 rounded-lg outline-solid outline-1 outline-gray-500">
                {eventChallenges.challenges.map(({ id, title, category, points }, index) => (
                  <Link
                    key={index}
                    href={!id.startsWith("placeholder-") ? `/advent/challenges?challenge=${id}` : ""}
                    className="flex cursor-pointer flex-col justify-between border-b border-r border-gray-700 bg-gray-800 p-3 hover:bg-gray-700"
                  >
                    <div>
                      <div className="mb-1 hidden font-bold sm:block">
                        {index === 0 && "Dec "}
                        {index + 1}
                        {index === 24 && " 🎄"}
                      </div>
                      <div className="mb-1 block font-bold sm:hidden">{index + 1}</div>
                      <div className={`mb-0.5 hidden text-sm text-gray-300 sm:block ${!title ? "font-mono" : ""}`}>
                        {title ?? "???"}
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <div className={`mb-0.5 text-xs text-gray-400 ${!category ? "font-mono" : ""}`}>
                        {category ?? "???"}
                      </div>
                      <div className={`text-xs text-gray-400 opacity-80 ${!points ? "font-mono" : ""}`}>
                        {points ?? "???"} pts
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="col-span-3 hidden flex-col items-center justify-center sm:flex sm:items-start">
                  <div className="mb-2 flex w-full flex-col items-center">
                    {Date.now() < new Date("2025-01-01T04:59:00Z").getTime() ? (
                      <>
                        <div className="mb-2 text-lg">
                          {Date.now() < new Date("2024-12-25T20:00:00Z").getTime()
                            ? "Next challenge in:"
                            : "Event ends in:"}
                        </div>
                        <Countdown date="next-challenge" />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center text-sm text-gray-400 xl:text-start">
                Click on a day to jump to its challenge!
              </div>
            </div>
            <div className="col-span-3 flex flex-col items-center justify-center sm:hidden sm:items-start">
              <div className="mb-2 flex w-full flex-col items-center">
                {Date.now() < new Date("2025-01-01T04:59:00Z").getTime() ? (
                  <>
                    <div className="mb-2 text-lg">
                      {Date.now() < new Date("2024-12-25T20:00:00Z").getTime()
                        ? "Next challenge in:"
                        : "Event ends in:"}
                    </div>
                    <Countdown date="next-challenge" />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
