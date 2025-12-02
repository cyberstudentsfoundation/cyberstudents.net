import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import LiquidGlassButton from "~/components/LiquidGlassButton";
import { Tooltip, TooltipTrigger, TooltipContent } from "~/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Advent of CTF 2025 · CyberStudents",
  description:
    "We’re back with our second annual Advent of CTF! Every day from December 1st to 25th, solve beginner-oriented gamified cybersecurity challenges for free. Get familiar with capture the flag competitions and cyber concepts from a wide range of popular categories.",
};

export default function AdventLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="sticky top-14 z-20 flex h-12 -translate-y-px items-center justify-center border-t border-b border-[#0a0e1a] bg-[#0a0e1a]/50 px-4 py-2 backdrop-blur-lg">
        <div className="flex w-full max-w-(--breakpoint-2xl) items-center justify-center sm:justify-between">
          <div className="flex items-center">
            <div className="hidden items-center xl:flex">
              <Button variant="link" asChild className="text-base hover:text-cyan-300 hover:no-underline">
                <Link href="/advent/2025">
                  <span className="font-mono text-2xl tracking-normal font-stretch-ultra-expanded">
                    advent<span className="tracking-[-0.3em]">&nbsp;</span>of
                    <span className="tracking-[-0.3em]">&nbsp;</span>ctf
                  </span>
                  <span className="text-xl font-light">2025</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex w-full items-center justify-between sm:w-auto sm:justify-start">
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-1.5 text-base hover:text-cyan-300 hover:no-underline sm:px-3"
            >
              <Link href="/advent/2025">Home</Link>
            </Button>
            {/* <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="link"
                  asChild
                  className="px-1.5 text-base text-gray-400! hover:no-underline sm:px-3"
                >
                  <span>Challenges</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-sm font-medium">Available Soon</p>
              </TooltipContent>
            </Tooltip> */}
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-1.5 text-base hover:text-cyan-300 hover:no-underline sm:px-3"
            >
              <Link href="/advent/2025/challenges">Challenges</Link>
            </Button>
            {/* <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="link"
                  asChild
                  className="px-1.5 text-base text-gray-400! hover:no-underline sm:px-3"
                >
                  <span>Leaderboard</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-sm font-medium">Available Soon</p>
              </TooltipContent>
            </Tooltip> */}
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-1.5 text-base hover:text-cyan-300 hover:no-underline sm:px-3"
            >
              <Link href="/advent/2025/leaderboard">Leaderboard</Link>
            </Button>
            {/* <Button size="sm" variant="default" asChild className="ml-2 text-base">
                <Link href="/ctf/register">Register</Link>
              </Button> */}
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-1.5 text-base hover:text-cyan-300 hover:no-underline sm:hidden sm:px-3"
            >
              <Link href="/advent/2025/register">Register</Link>
            </Button>
            <LiquidGlassButton
              href="/advent/2025/register"
              className="text-base"
              linkClassName="px-3 sm:px-4 ml-2 py-1 rounded-xl hidden sm:flex"
            >
              Register
            </LiquidGlassButton>
          </div>
          {/* <div className="flex items-center">
          <AccountDropdown session={session} />
          <div className="mr-5 hidden h-6 w-px bg-white/20 xl:block" />
          <a
            href="https://discord.com/invite/cyberstudents-916144903686336513"
            target="_blank"
            className="hidden xl:block"
          >
            <div className="mr-2 flex items-center font-semibold text-gray-300 transition-colors hover:text-white">
              <FaDiscord className="mr-2 mb-px h-6 w-6" />
              <span className="hidden sm:block">Join our Discord community</span>
              <span className="block sm:hidden">Discord</span>
              <HiArrowUpRight className="mb-0.5 ml-1 h-3 w-3 stroke-1" />
            </div>
          </a>
          {/* <MobileNavbar session={session} /> */}
        </div>
      </nav>
      {children}
      <div className="h-12 sm:h-24" />
    </>
  );
}
