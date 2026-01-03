import React from "react";
import { getServerAuthSession } from "~/server/auth";
// import { api } from "~/trpc/server";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi2";
import Leaderboard from "./leaderboard";
import Banner from "../banner";

export default async function LeaderboardPage() {
  const session = await getServerAuthSession();

  // let user = null;
  // if (session?.user) {
  //   user = await api.user.me();
  // }

  return (
    <main>
      <Banner className="max-w-(--breakpoint-2xl)" />
      <div className="mx-4 flex justify-center sm:mx-8 md:mx-12 lg:mx-16">
        {/* switch back to sm:mt-16 if announcement banner is removed */}
        <div className="mt-8 flex w-full max-w-[88rem] flex-col justify-center sm:mt-8">
          {/* <div className="absolute top-20 hidden md:block">
          <p className="text-base font-bold text-gray-200">CyberStudents&rsquo;</p>
          <h1 className="mb-4 font-mono text-2xl font-bold">
            advent of ctf<span className="ml-3 font-sans font-light text-cyan-300">2024</span>
          </h1>
        </div> */}
          {/* <Link href="/advent/2024" className="mb-4 flex w-fit items-center gap-1 text-gray-300 hover:text-cyan-300">
          <HiChevronLeft className="mb-0.5 h-4 w-4" />
          <span>Back to calendar</span>
        </Link> */}
          <Leaderboard session={session} />
        </div>
      </div>
    </main>
  );
}
