import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Advent of CTF 2024 · CyberStudents",
  description:
    "Every day from December 1st to 25th, solve beginner-oriented gamified cybersecurity challenges. Get familiar with capture-the-flag challenges and cyber concepts from a wide range of popular categories.",
};

export default function AdventLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="mx-4 mt-10 flex justify-center sm:mt-16">
        <div className="flex w-full max-w-screen-2xl justify-between">
          <div className="w-full max-w-max">
            {/* <p className="text-base font-bold text-gray-200">CyberStudents&rsquo;</p>
            <h1 className="mb-4 font-mono text-2xl font-bold">
              advent of ctf<span className="ml-3 font-sans font-light text-cyan-300">2024</span>
            </h1> */}
          </div>
          <div className="flex w-full items-center justify-center gap-4 text-center text-gray-200 sm:justify-end sm:gap-8">
            <Link
              href="/advent"
              className="text-sm font-medium underline transition-colors hover:text-cyan-300 sm:text-lg sm:no-underline"
            >
              Home
            </Link>
            <Link
              href="/advent/challenges"
              className="text-sm font-medium underline transition-colors hover:text-cyan-300 sm:text-lg sm:no-underline"
            >
              Challenges
            </Link>
            <Link
              href="/advent/challenges"
              className="text-sm font-medium underline transition-colors hover:text-cyan-300 sm:text-lg sm:no-underline"
            >
              Leaderboard
            </Link>
            <Link
              href="/advent/register"
              className="text-sm font-medium underline transition-colors hover:text-cyan-300 sm:text-lg sm:no-underline"
            >
              Register &amp; Info
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}
