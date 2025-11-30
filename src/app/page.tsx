import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import DailyCTFImages from "./daily-ctf-images";
import CyberstartArchiveScroll from "./cyberstart-archive-scroll";
import PhraseTransitions from "~/components/PhraseTransitions";
import { Button } from "~/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "~/components/ui-old/tooltip2";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import { MdCalendarMonth, MdCelebration, MdCollectionsBookmark, MdGroups } from "react-icons/md";
import { TbChristmasTree } from "react-icons/tb";
import { BiNetworkChart } from "react-icons/bi";
import { CgBrowser } from "react-icons/cg";
import { FaTableCellsRowLock, FaMagnifyingGlassChart, FaGear } from "react-icons/fa6";
import { LuBinary } from "react-icons/lu";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import LiquidGlassButton from "~/components/LiquidGlassButton";

import background from "~/../public/background.png";
import icsred from "~/../public/icsred.png";
import cyberstartCover from "~/../public/cyberstart-cover.png";

import austriaFlag from "~/../public/flags/austria.svg";
import indiaFlag from "~/../public/flags/india.svg";
import romaniaFlag from "~/../public/flags/romania.svg";
import swedenFlag from "~/../public/flags/sweden.svg";
import unitedStatesFlag from "~/../public/flags/united-states.svg";
import CustomSnowfall from "~/app/advent/2025/custom-snowfall";
import SnowBackground from "~/app/advent/2025/snow-background";
import Countdown from "~/components/Countdown";

export const metadata: Metadata = {
  other: {
    "og:image": "/logo-rounded.png",
  },
};

export default async function Home() {
  // const session = await getServerAuthSession();

  const ctfCategories = [
    { name: "Web exploitation", icon: <CgBrowser className="h-6 w-6" /> },
    { name: "Cryptography", icon: <FaTableCellsRowLock className="h-6 w-6" /> },
    { name: "Forensics", icon: <FaMagnifyingGlassChart className="h-6 w-6" /> },
    { name: "Binary exploitation", icon: <LuBinary className="h-6 w-6" /> },
    { name: "Reverse engineering", icon: <FaGear className="h-6 w-6" /> },
    { name: "OSINT", icon: <BiNetworkChart className="h-6 w-6" /> },
  ];

  return (
    <div className="-z-20">
      <div className="relative z-0 inline-block w-full bg-gray-950">
        <div className="pointer-events-none absolute -z-10 h-full max-h-146 w-full opacity-30 sm:max-h-138 md:max-h-120">
          <Image src={background} alt="" className="object-cover" fill={true} priority={true} />
        </div>
        <main className="mx-4 sm:mx-8 md:mx-10">
          {/* update this below as well! */}
          <div className="mt-24 flex justify-center sm:mt-36">
            <div className="w-full max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-xl)">
              <div className="mb-18.5 flex items-center justify-center">
                {/* this used to be mb-36 */}
                <div className="w-full max-w-(--breakpoint-lg)">
                  <h1 className="group h-20 font-serif text-4xl transition-all sm:h-[6.0625rem] sm:text-5xl lg:h-[3.0625rem]">
                    Learn and grow <br className="lg:hidden" />
                    <PhraseTransitions />
                  </h1>
                  <p className="my-8 text-lg sm:mt-8 sm:mb-16">
                    Talk, connect, and grow with others interested in learning and advancing in cybersecurity. Whether
                    you&rsquo;re in high school, college, or beyond, you&rsquo;ll fit right into our community with
                    thousands of other like-minded students and professionals.
                  </p>
                  <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
                    <LiquidGlassButton
                      href="https://discord.com/invite/cyberstudents-916144903686336513"
                      target="_blank"
                      className="flex items-center gap-1 text-lg"
                    >
                      Join us on Discord
                      <HiArrowUpRight className="ml-1 block h-3 w-3 stroke-1 sm:hidden md:block" />
                    </LiquidGlassButton>
                    <div className="flex gap-8">
                      <div>
                        <h2 className="text-2xl font-bold sm:text-3xl">3,000+</h2>
                        <p className="text-gray-300">members</p>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold sm:text-3xl">800+</h2>
                        <p className="text-gray-300">in HS/college</p>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold sm:text-3xl">85+</h2>
                        <p className="text-gray-300">countries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="col-span-1 mb-24 flex w-full flex-col items-center gap-8 sm:col-span-2 xl:col-span-3">
          {/* <div className="absolute right-0 left-0 w-full"> */}
          <div className="relative w-full">
            <CustomSnowfall />
            <div className="absolute inset-0 z-0 w-full">
              <SnowBackground
                className="h-full w-full overflow-x-hidden opacity-30 hue-rotate-[270deg]"
                viewBox="0 -300 3839.988 2160"
              />
            </div>
            <div className="flex w-full justify-center overflow-x-hidden bg-gray-900 px-4 py-8 sm:px-8 md:px-10 lg:bg-gray-950">
              <div className="relative z-10 flex w-full justify-center">
                <div className="flex w-full max-w-[60rem] flex-col items-center justify-between gap-4 sm:flex-row">
                  <div className="flex flex-col items-center sm:items-start">
                    <div className="mb-6 flex flex-col items-center justify-between sm:gap-16 xl:flex-row xl:gap-8">
                      <div className="max-w-prose text-center sm:text-left">
                        <h1 className="font-mono text-4xl font-bold">
                          advent of ctf
                          <br className="sm:hidden" />
                          <span className="ml-5 font-sans font-light text-cyan-300">2025</span>
                        </h1>
                        <p className="mt-4 text-lg">
                          We&rsquo;re back with our second annual Advent of CTF! Every day from December 1st to 25th,
                          solve beginner-oriented gamified cybersecurity challenges for free. Get familiar with capture
                          the flag competitions and cyber concepts from a wide range of popular categories.
                        </p>
                      </div>
                    </div>
                    <LiquidGlassButton href="/advent/2025" className="flex items-center gap-1 text-lg">
                      Play
                      <HiArrowRight className="ml-0.5 h-3 w-3 stroke-1" />
                    </LiquidGlassButton>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-lg">
                      {Date.now() < new Date("2025-12-02T01:00:00Z").getTime()
                        ? "First challenge in:"
                        : Date.now() < new Date("2025-12-26T01:00:00Z").getTime()
                          ? "Next challenge in:"
                          : "Event ends in:"}
                    </div>
                    <Countdown
                      date={
                        Date.now() < new Date("2025-12-02T01:00:00Z").getTime()
                          ? new Date("2025-12-02T01:00:00Z")
                          : "next-challenge"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="mx-4 sm:mx-8 md:mx-10">
          {/* update this below as well! */}
          <div className="mb-24 flex justify-center sm:mb-36">
            <div className="w-full max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-xl)">
              <div className="grid grid-flow-row grid-cols-1 gap-x-9 gap-y-16 sm:grid-cols-2 xl:grid-cols-3 xl:gap-y-24">
                <div className="col-span-1 flex flex-col items-center gap-8 sm:col-span-2 xl:col-span-3">
                  <div className="relative w-screen overflow-x-clip md:w-auto">
                    <div className="relative mx-4 max-w-196 sm:mx-8 md:mx-10 xl:max-w-5xl">
                      <div className="motion-safe:animate-blob absolute top-0 left-52 h-54 w-54 overflow-y-visible rounded-full bg-purple-300 opacity-20 blur-xl filter sm:left-80" />
                      <div className="motion-safe:animate-blob absolute top-0 right-52 h-54 w-54 overflow-y-visible rounded-full bg-cyan-300 opacity-20 blur-xl filter [animation-delay:2s]! sm:right-80" />
                      <div className="relative flex max-w-196 flex-col items-center text-center xl:max-w-5xl">
                        <div className="flex items-center justify-center gap-6">
                          <h2 className="font-mokoto mb-4 flex text-4xl font-bold tracking-widest">
                            <span className="absolute mx-auto box-content flex w-fit border bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent blur-xl select-none">
                              CSD<span className="tracking-[-0.1em]">&nbsp;</span>CTF
                            </span>
                            <span className="relative top-0 flex h-auto w-fit items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent select-auto">
                              CSD<span className="tracking-[-0.1em]">&nbsp;</span>CTF
                            </span>
                            <span className="ml-4 pb-1.5 font-sans text-3xl font-light tracking-normal text-cyan-300">
                              2025
                            </span>
                          </h2>
                        </div>
                        <p className="mb-4 text-lg">
                          Our premier annual summer CTF competition brings together students and other cybersecurity
                          learners for a weekend of practical and engaging cyber challenges online. Test your skills in
                          a variety of categories and compete for prizes.
                        </p>
                        <LiquidGlassButton href="/ctf" className="flex items-center gap-1 text-lg">
                          Compete
                          <HiArrowRight className="ml-0.5 h-3 w-3 stroke-1" />
                        </LiquidGlassButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center gap-8 sm:col-span-2 xl:col-span-3 xl:flex-row xl:justify-between">
                  <div className="max-w-196 xl:max-w-md">
                    <div className="mb-3 w-fit rounded-full border border-white/20 bg-white/10 p-4 shadow-xs shadow-white/25 backdrop-blur-xs">
                      <TbChristmasTree className="h-8 w-8 text-gray-100" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">Advent of CTF 2024</h2>
                    <p className="mb-4 text-lg">
                      Last December, we hosted a month-long beginner-friendly CTF competition with challenges released
                      daily and US$280 up for grabs. We plan to host this event and another weekend-long CTF this year.
                    </p>
                    <Button className="bg-gray-100 text-base hover:bg-gray-300" asChild>
                      <Link href="/advent/2024/results">
                        Advent of CTF 2024
                        <HiArrowRight className="mb-0.5 ml-1 h-3 w-3 stroke-1" />
                      </Link>
                    </Button>
                  </div>
                  <div className="flex flex-col gap-8 md:flex-row xl:min-w-196 xl:justify-between xl:gap-4">
                    <div>
                      <h3 className="mb-1 font-bold text-gray-400">
                        <span className="text-cyan-300/75">2024</span> High School & College Division
                      </h3>
                      <Table className="table-fixed overflow-hidden rounded-lg text-gray-200 md:w-80">
                        <TableBody className="rounded-md">
                          <TableRow className="bg-yellow-300/25 hover:bg-yellow-300/35!">
                            <TableCell className="w-14">1st</TableCell>
                            <TableCell className="flex items-center gap-1.5">
                              <span>zarnex__</span>
                              <Image
                                src={unitedStatesFlag}
                                alt="Flag for United States"
                                title="United States"
                                className="h-5 w-5"
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-300/25 hover:bg-gray-300/35!">
                            <TableCell className="w-14">2nd</TableCell>
                            <TableCell className="flex items-center gap-1.5">
                              <span>minipif</span>
                              <Image src={romaniaFlag} alt="Flag for Romania" title="Romania" className="h-5 w-5" />
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-yellow-800/25 hover:bg-yellow-800/35!">
                            <TableCell className="w-14">3rd</TableCell>
                            <TableCell className="flex items-center gap-1.5">
                              <span>pligonstein</span>
                              <Image src={romaniaFlag} alt="Flag for Romania" title="Romania" className="h-5 w-5" />
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-700/25 hover:bg-gray-700/35!">
                            <TableCell className="w-14">4th</TableCell>
                            <TableCell className="flex items-center gap-1.5">
                              <span>silence_</span>
                              <Image src={indiaFlag} alt="Flag for India" title="India" className="h-5 w-5" />
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-700/25 hover:bg-gray-700/35!">
                            <TableCell className="w-14">5th</TableCell>
                            <TableCell className="flex items-center gap-1.5">
                              <span>trixai</span>
                              <Image src={swedenFlag} alt="Flag for Sweden" title="Sweden" className="h-5 w-5" />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex flex-col justify-between gap-8 md:gap-0 xl:pr-20">
                      <div>
                        <h3 className="mb-1 font-bold text-gray-400">
                          <span className="text-cyan-300/75">2024</span> Open - Write-Up Division
                        </h3>
                        <Table className="table-fixed overflow-hidden rounded-lg text-gray-200 md:w-80">
                          <TableBody className="rounded-md">
                            <TableRow className="bg-yellow-300/25 hover:bg-yellow-300/35!">
                              <TableCell className="w-14">1st</TableCell>
                              <TableCell className="flex items-center gap-1.5">
                                <span>zarnex__</span>
                                <Image
                                  src={unitedStatesFlag}
                                  alt="Flag for United States"
                                  title="United States"
                                  className="h-5 w-5"
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow className="bg-gray-300/25 hover:bg-gray-300/35!">
                              <TableCell className="w-14">2nd</TableCell>
                              <TableCell className="flex items-center gap-1.5">
                                <span>
                                  raul_26 <span className="text-gray-400">(Fl4gged)</span>
                                </span>
                                <Image src={austriaFlag} alt="Flag for Austria" title="Austria" className="h-5 w-5" />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      <div className="flex w-full items-center justify-center gap-4">
                        <p className="font-medium text-gray-400">Prizes sponsored by</p>
                        <Link href="/advent/2024/results#a-note-on-the-delay-of-prizes">
                          <Image src={icsred} alt="ICSRED Logo" className="h-32 w-32 rounded-lg opacity-70" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center gap-8 sm:col-span-2 xl:col-span-3 xl:flex-row xl:justify-between">
                  <div className="max-w-196 xl:max-w-md">
                    <div className="mb-3 w-fit rounded-full border border-white/20 bg-white/10 p-4 shadow-xs shadow-white/25 backdrop-blur-xs">
                      <MdCalendarMonth className="h-8 w-8 text-gray-100" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">Daily CTFs</h2>
                    <p className="mb-4 text-lg">
                      Play in our beginner-friendly daily capture the flag challenges throughout the year. Learn new
                      skills, discuss with others, and compete for prizes.
                    </p>
                    <div className="-ml-4 flex">
                      {ctfCategories.map(({ name, icon }) => (
                        <TooltipProvider key={name} delayDuration={100} skipDelayDuration={1000}>
                          <Tooltip>
                            <TooltipTrigger tabIndex={0} className={`cursor-help pr-4 pl-4 text-gray-400`}>
                              {icon}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                    <Button className="mt-6 bg-gray-100 text-base hover:bg-gray-300" asChild>
                      <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
                        Play in our Discord
                        <HiArrowUpRight className="mb-0.5 ml-1 h-3 w-3 stroke-1" />
                      </a>
                    </Button>
                  </div>
                  <DailyCTFImages />
                </div>
                <div>
                  <div>
                    <div className="mb-3 w-fit rounded-full border border-white/20 bg-white/10 p-4 shadow-xs shadow-white/25 backdrop-blur-xs">
                      <MdCollectionsBookmark className="h-8 w-8 text-gray-100" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">Get resources & help</h2>
                    <p className="text-lg">
                      Learn, discuss, and get help on cybersecurity, scholarships, competitions, courses,
                      certifications, and more. Need help on a CTF challenge? We&rsquo;ve got you covered.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <div className="mb-3 w-fit rounded-full border border-white/20 bg-white/10 p-4 shadow-xs shadow-white/25 backdrop-blur-xs">
                      <MdGroups className="h-8 w-8 text-gray-100" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">Live talks from professionals & peers</h2>
                    <p className="text-lg">
                      Network and hear from professionals and other students about various topics in cybersecurity or
                      professional development. Ask questions and get advice from those in the field.
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1 sm:flex sm:justify-center xl:col-span-1 xl:col-start-auto xl:justify-self-auto">
                  <div className="w-full max-w-[30.875rem]">
                    <div className="mb-3 w-fit rounded-full border border-white/20 bg-white/10 p-4 shadow-xs shadow-white/25 backdrop-blur-xs">
                      <MdCelebration className="h-8 w-8 text-gray-100" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">Fun events & games</h2>
                    <p className="text-lg">
                      Participate in fun events and games throughout the year organized by our community managers for a
                      chance to win prizes and relax.
                    </p>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col gap-8 sm:col-span-2 xl:col-span-3 xl:flex-row-reverse xl:justify-between">
                  <div className="flex max-w-2xl flex-col items-start self-center text-start text-lg text-gray-100 sm:items-center sm:text-center xl:items-start xl:text-start xl:text-base xl:text-gray-200">
                    <Image src={cyberstartCover} alt="CyberStart cover" className="mb-5 w-64 rounded-lg opacity-70" />
                    <p className="mb-4">
                      Founded on December 2, 2021, we were originally a dedicated server offering assistance for{" "}
                      <a
                        href="https://cyberstart.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white underline"
                      >
                        CyberStart
                      </a>{" "}
                      challenges. When CyberStart closed on January 12, 2024, we accepted this challenge and rebranded
                      ourselves as CyberStudents.
                    </p>
                    <p>
                      Our mission is to help aspiring individuals with the technical skills and knowledge necessary to
                      thrive in the cybersecurity industry. We strive to create accessible and comprehensive learning
                      materials for those eager to dive into cybersecurity.
                    </p>
                  </div>
                  <CyberstartArchiveScroll />
                </div>
                <div className="col-span-1 flex flex-col gap-6 sm:col-span-2 xl:col-span-3">
                  <h2 className="text-center text-2xl font-semibold">
                    Jump into the world of cybersecurity and discover beyond what you&rsquo;re learning at school or
                    seeing in the news.
                  </h2>
                  <Button size="lg" asChild className="self-center bg-gray-100 text-base font-medium hover:bg-gray-300">
                    <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
                      Join us on Discord
                      <HiArrowUpRight className="ml-1 h-3 w-3 stroke-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
