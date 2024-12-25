import type { Metadata } from "next";
import Link from "next/link";
import { env } from "~/env";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { HiChevronRight, HiOutlineMegaphone } from "react-icons/hi2";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXTAUTH_URL),
  title: "Advent of CTF 2024 · CyberStudents",
  description:
    "Every day from December 1st to 25th, solve beginner-oriented gamified cybersecurity challenges. Get familiar with capture-the-flag challenges and cyber concepts from a wide range of popular categories.",
};

export default function AdventLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="mx-4 mt-10 flex justify-center sm:mt-16">
        <div className="w-full max-w-screen-2xl justify-between">
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
              href="/advent/leaderboard"
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
          <div className="mt-6">
            <Alert className="my-2 border-gray-700 bg-gray-800 bg-opacity-50 text-gray-100">
              <HiOutlineMegaphone className="h-5 w-5 stroke-2" />
              <AlertTitle>All challenges released: submit write-ups through December 31st</AlertTitle>
              <AlertDescription className="mt-2 text-gray-300">
                Players have until December 31st 11:59 pm (EST) to submit flags and write-ups with a prize pool of{" "}
                <strong>US$55</strong>.&emsp;
                <a
                  className="inline-flex items-center gap-0.5 font-semibold underline transition-all hover:text-cyan-300"
                  href="https://forms.gle/GREHeMkKq31RtKBG7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Submit write-ups</span>
                  <HiChevronRight className="mb-0.5 h-4 w-4" />
                </a>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}
