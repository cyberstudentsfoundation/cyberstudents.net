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
    <div className="relative flex w-full flex-col gap-4 md:w-fit md:flex-row lg:items-end">
      <div className="intersect-once intersect:motion-safe:animate-float1 absolute left-44 top-[13.5rem] w-44 shadow-xl motion-safe:will-change-transform md:left-auto md:right-[26rem] md:top-32">
        <div className="intersect-once intersect:motion-translate-y-in-[50%] intersect:motion-opacity-in-[0%] intersect:motion-blur-in-[4px] intersect:motion-duration-[1.5s]">
          <Image src={dailyCTFRoles} alt="Example of CTF Star roles" className="rounded-lg" />
        </div>
      </div>
      <div className="w-80">
        <Image src={dailyCTFLeaderboard} alt="Example of a daily CTF leaderboard" className="rounded-lg" />
      </div>
      <div className="w-80 pb-6 md:w-96 md:pb-0 lg:w-[28rem] lg:pr-20">
        <Image src={dailyCTFChallenge} alt="Example of a daily CTF challenge" className="rounded-lg" />
      </div>
      <div className="intersect-once intersect:motion-safe:animate-float2 absolute bottom-0 left-16 w-72 shadow-xl motion-safe:will-change-transform md:-top-5 md:left-auto md:right-4 md:w-80">
        <div className="intersect-once intersect:motion-translate-y-in-[-50%] intersect:motion-opacity-in-[0%] intersect:motion-blur-in-[4px] intersect:motion-duration-[1.5s] intersect:motion-delay-[0.5s]">
          <Image src={dailyCTFWriteUp} alt="Example of a CTF write-up" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}
