"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Observer } from "tailwindcss-intersect";

import dailyCTFChallenge from "~/../public/daily-ctf-challenge.png";
import dailyCTFLeaderboard from "~/../public/daily-ctf-leaderboard.png";
import dailyCTFRoles from "~/../public/daily-ctf-roles.png";
import dailyCTFWriteUp from "~/../public/daily-ctf-write-up.png";

export default function DailyCTFImages() {
  useEffect(() => {
    Observer.start();
  }, []);

  return (
    <div className="relative flex w-full flex-col gap-4 lg:w-fit lg:flex-row lg:items-end">
      <div className="intersect-once motion-safe:intersect:animate-float1 absolute top-54 right-0 w-36 shadow-xl motion-safe:will-change-transform sm:w-44 lg:top-32 lg:right-104">
        <div className="intersect-once intersect:motion-translate-y-in-50 intersect:motion-opacity-in-[0%] intersect:motion-blur-in-xs intersect:motion-duration-[1.5s]">
          <Image src={dailyCTFRoles} alt="Example of CTF Star roles" className="rounded-lg" />
        </div>
      </div>
      <div className="w-full max-w-80">
        <Image src={dailyCTFLeaderboard} alt="Example of a daily CTF leaderboard" className="rounded-lg" />
      </div>
      <div className="w-full max-w-80 pb-6 lg:w-96 lg:max-w-none lg:pb-0 xl:w-md xl:pr-20">
        <Image src={dailyCTFChallenge} alt="Example of a daily CTF challenge" className="rounded-lg" />
      </div>
      <div className="intersect-once motion-safe:intersect:animate-float2 absolute right-0 bottom-0 w-3/4 max-w-72 shadow-xl motion-safe:will-change-transform lg:-top-5 lg:right-4 lg:bottom-auto lg:w-80 lg:max-w-none">
        <div className="intersect-once intersect:-motion-translate-y-in-50 intersect:motion-opacity-in-[0%] intersect:motion-blur-in-xs intersect:motion-duration-[1.5s] intersect:motion-delay-[0.5s]">
          <Image src={dailyCTFWriteUp} alt="Example of a CTF write-up" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}
