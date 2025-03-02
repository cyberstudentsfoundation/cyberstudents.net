import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import Image from "next/image";
import DailyCTFImages from "./daily-ctf-images";
import CyberstartArchiveScroll from "./cyberstart-archive-scroll";
import PhraseTransitions from "~/components/PhraseTransitions";
import { Button } from "~/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "~/components/ui/tooltip";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import { MdCelebration, MdCollectionsBookmark, MdFlag, MdGroups } from "react-icons/md";
import { TbChristmasTree } from "react-icons/tb";
import { BiNetworkChart } from "react-icons/bi";
import { CgBrowser } from "react-icons/cg";
import { FaTableCellsRowLock, FaMagnifyingGlassChart, FaGear, FaGithub } from "react-icons/fa6";
import { LuBinary } from "react-icons/lu";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";

import background from "~/../public/background.png";
import icsred from "~/../public/icsred.png";
import cyberstartCover from "~/../public/cyberstart-cover.png";

import austriaFlag from "~/../public/flags/austria.svg";
import indiaFlag from "~/../public/flags/india.svg";
import romaniaFlag from "~/../public/flags/romania.svg";
import swedenFlag from "~/../public/flags/sweden.svg";
import unitedStatesFlag from "~/../public/flags/united-states.svg";

export default async function Home() {
  const session = await getServerAuthSession();

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
        <div className="pointer-events-none absolute -z-10 h-full max-h-[36.5rem] w-full opacity-30 sm:max-h-[34.5rem] md:max-h-[30rem]">
          <Image src={background} alt="" className="object-cover" fill={true} priority={true} />
        </div>
        <main className="mx-4 sm:mx-8 md:mx-10">
          <div className="my-24 flex justify-center sm:my-36">
            <div className="w-full max-w-screen-lg xl:max-w-screen-xl">
              <div className="mb-36 flex items-center justify-center">
                <div className="w-full max-w-screen-lg">
                  <h1 className="group font-serif text-4xl transition-all sm:text-5xl">
                    Learn and grow <br className="lg:hidden" />
                    <PhraseTransitions />
                  </h1>
                  <p className="my-8 text-lg sm:mb-16 sm:mt-8">
                    Talk, connect, and grow with others interested in learning and advancing in cybersecurity. Whether
                    you&rsquo;re in high school, college, or beyond, you&rsquo;ll fit right in to our community with
                    thousands of other like-minded students and professionals.
                  </p>
                  <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
                    <Button
                      size="lg"
                      asChild
                      className="self-start bg-gray-100 text-base font-medium hover:bg-gray-300"
                    >
                      <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
                        Join us on Discord
                        <HiArrowUpRight className="ml-1 h-3 w-3 stroke-1" />
                      </a>
                    </Button>
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
              <div className="grid grid-flow-row grid-cols-1 gap-x-9 gap-y-16 sm:grid-cols-2 xl:grid-cols-3 xl:gap-y-24">
                <div className="col-span-1 flex flex-col gap-8 sm:col-span-2 xl:col-span-3 xl:flex-row xl:justify-between">
                  <div className="max-w-md">
                    <div className="mb-3 w-fit rounded-full border border-white/20 bg-white/10 p-4 shadow-sm shadow-white/25 backdrop-blur-sm">
                      <TbChristmasTree className="h-8 w-8 text-gray-100" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">Advent of CTF</h2>
                    <p className="mb-4 text-lg">
                      Last December, we hosted a month-long CTF event with challenges released daily and US$280 up for
                      grabs. We plan to host this event and another weekend-long CTF this year.
                    </p>
                    <Button className="bg-gray-100 text-base hover:bg-gray-300" asChild>
                      <Link href="/advent/2024">
                        Advent of CTF 2024
                        <HiArrowRight className="mb-0.5 ml-1 h-3 w-3 stroke-1" />
                      </Link>
                    </Button>
                  </div>
                  <div className="flex flex-col gap-8 md:flex-row xl:min-w-[49rem] xl:justify-between xl:gap-4">
                    <div>
                      <h3 className="mb-1 font-bold text-gray-400">
                        <span className="text-cyan-300/75">2024</span> High School & College Division
                      </h3>
                      <Table className="table-fixed overflow-hidden rounded-lg text-gray-200 md:w-80">
                        <TableBody className="rounded-md">
                          <TableRow className="bg-yellow-300/25 hover:!bg-yellow-300/35">
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
                          <TableRow className="bg-gray-300/25 hover:!bg-gray-300/35">
                            <TableCell className="w-14">2nd</TableCell>
                            <TableCell className="flex items-center gap-1.5">
                              <span>minipif</span>
                              <Image src={romaniaFlag} alt="Flag for Romania" title="Romania" className="h-5 w-5" />
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-yellow-800/25 hover:!bg-yellow-800/35">
                            <TableCell className="w-14">3rd</TableCell>
                            <TableCell className="flex items-center gap-1.5">
                              <span>pligonstein</span>
                              <Image src={romaniaFlag} alt="Flag for Romania" title="Romania" className="h-5 w-5" />
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-700/25 hover:!bg-gray-700/35">
                            <TableCell className="w-14">4th</TableCell>
                            <TableCell className="flex items-center gap-1.5">
                              <span>silence_</span>
                              <Image src={indiaFlag} alt="Flag for India" title="India" className="h-5 w-5" />
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-700/25 hover:!bg-gray-700/35">
                            <TableCell className="w-14">5th</TableCell>
                            <TableCell className="flex items-center gap-1.5">
                              <span>trixai</span>
                              <Image src={swedenFlag} alt="Flag for Sweden" title="Sweden" className="h-5 w-5" />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex h-full flex-col justify-between gap-8 md:gap-0 xl:pr-20">
                      <div>
                        <h3 className="mb-1 font-bold text-gray-400">
                          <span className="text-cyan-300/75">2024</span> Open - Write-Up Division
                        </h3>
                        <Table className="table-fixed overflow-hidden rounded-lg text-gray-200 md:w-80">
                          <TableBody className="rounded-md">
                            <TableRow className="bg-yellow-300/25 hover:!bg-yellow-300/35">
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
                            <TableRow className="bg-gray-300/25 hover:!bg-gray-300/35">
                              <TableCell className="w-14">2nd</TableCell>
                              <TableCell className="flex items-center gap-1.5">
                                <span>
                                  raul_26 <span className="text-gray-400">(Fl4gged)</span>
                                </span>
                                <Image src={austriaFlag} alt="Flag for Austria" title="Austria" className="h-5 w-5" />
                                <a href="https://github.com/raul-dunca" target="_blank" rel="noopener noreferrer">
                                  <FaGithub className="h-5 w-5 transition-opacity hover:opacity-75" />
                                </a>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      <div className="flex w-full items-center justify-center gap-4">
                        <p className="font-medium text-gray-400">Prizes sponsored by</p>
                        <a href="https://www.ics.red/" target="_blank" rel="noopener noreferrer">
                          <Image src={icsred} alt="ICSRED Logo" className="h-32 w-32 rounded-lg opacity-70" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col gap-8 sm:col-span-2 xl:col-span-3 xl:flex-row xl:justify-between">
                  <div className="max-w-md">
                    <div className="mb-3 w-fit rounded-full border border-white/20 bg-white/10 p-4 shadow-sm shadow-white/25 backdrop-blur-sm">
                      <MdFlag className="h-8 w-8 text-gray-100" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">Daily CTFs</h2>
                    <p className="mb-6 text-lg">
                      Play in our beginner-friendly daily capture-the-flag challenges throughout the year. Learn new
                      skills, discuss with others, and compete for prizes.
                    </p>
                    <div className="-ml-4 flex">
                      {ctfCategories.map(({ name, icon }, index) => (
                        <TooltipProvider key={name} delayDuration={100} skipDelayDuration={1000}>
                          <Tooltip>
                            <TooltipTrigger tabIndex={0} className={`cursor-help pl-4 pr-4 text-gray-400`}>
                              {icon}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                  <DailyCTFImages />
                </div>
                <div>
                  <div>
                    <div className="mb-3 w-fit rounded-full border border-white/20 bg-white/10 p-4 shadow-sm shadow-white/25 backdrop-blur-sm">
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
                    <div className="mb-3 w-fit rounded-full border border-white/20 bg-white/10 p-4 shadow-sm shadow-white/25 backdrop-blur-sm">
                      <MdGroups className="h-8 w-8 text-gray-100" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">Live talks from professionals & peers</h2>
                    <p className="text-lg">
                      Network and hear from professionals and other students about various topics in cybersecurity or
                      professional development. Ask questions and get advice from those in the field.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <div className="mb-3 w-fit rounded-full border border-white/20 bg-white/10 p-4 shadow-sm shadow-white/25 backdrop-blur-sm">
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
                  <div className="max-w-md text-gray-300">
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
