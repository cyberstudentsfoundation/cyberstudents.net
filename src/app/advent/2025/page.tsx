import { HiChevronLeft, HiOutlineAcademicCap, HiOutlineLifebuoy, HiOutlineTrophy } from "react-icons/hi2";
// import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import { api } from "~/trpc/server";
import Image from "next/image";
import icsred from "~/../public/icsred.png";
import Countdown from "~/components/Countdown";
import { Button } from "~/components/ui/button";
import { CgBrowser } from "react-icons/cg";
import { FaTableCellsRowLock, FaMagnifyingGlassChart, FaGear, FaDiscord } from "react-icons/fa6";
import { LuBinary } from "react-icons/lu";
import { BiNetworkChart } from "react-icons/bi";
import wordmark from "~/../public/wordmark.svg";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import ChallengesCarousel from "~/app/ctf/carousel";
import LiquidGlassButton from "~/components/LiquidGlassButton";
import CustomSnowfall from "./custom-snowfall";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { Table } from "~/components/ui/table";
import DailyCTFImages from "~/app/daily-ctf-images";
import { MdCalendarMonth, MdSwipe } from "react-icons/md";
import { TbChristmasTree } from "react-icons/tb";
import { Award, BadgeIcon, CircleQuestionMark, Earth, FileText, Medal, Ribbon, School, Trophy } from "lucide-react";
import { TableBody, TableRow, TableCell } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import SnowBackground from "~/app/advent/2025/snow-background";
import ctftimeLogo from "~/../public/ctftime-logo.png";
import ctfguideLogo from "~/../public/ctfguide.png";
import apisecLogo from "~/../public/apisec.png";

import austriaFlag from "~/../public/flags/austria.svg";
import indiaFlag from "~/../public/flags/india.svg";
import romaniaFlag from "~/../public/flags/romania.svg";
import swedenFlag from "~/../public/flags/sweden.svg";
import unitedStatesFlag from "~/../public/flags/united-states.svg";

import pfp_godder from "~/../public/staff-pfps/decidueye.png";
import pfp_kolmus from "~/../public/staff-pfps/kolmus.png";
import pfp_logix from "~/../public/staff-pfps/logix.png";
import pfp_mathlegend from "~/../public/staff-pfps/mathlegend.png";
import pfp_mr_mph from "~/../public/staff-pfps/mr_mph.png";
import pfp_vipin from "~/../public/staff-pfps/vipin.png";
import pfp_vy from "~/../public/staff-pfps/vy.png";
import pfp_wjaaaaaaat from "~/../public/staff-pfps/wjaaaaaaat.png";

const CHALLENGE_DEVELOPERS = [
  {
    name: "Vipin",
    pfp: pfp_vipin,
    description: (
      <>
        + <abbr title="infrastructure">infra</abbr>
      </>
    ),
  },
  {
    name: "GodderE2D",
    pfp: pfp_godder,
    description: (
      <>
        + <abbr title="infrastructure">infra</abbr> & site
      </>
    ),
  },
  // { name: "Mr_MPH", pfp: pfp_mr_mph },
  // { name: "Kolmus", pfp: pfp_kolmus },
  // { name: "MathLegend_175", pfp: pfp_mathlegend },
  // { name: "wjaaaaaaat", pfp: pfp_wjaaaaaaat },
  // { name: "vy", pfp: pfp_vy },
  { name: "Logix", pfp: pfp_logix },
];

export default async function Advent2025() {
  // const session = await getServerAuthSession();

  // let user = null;
  // if (session?.user) {
  //   user = await api.user.me();
  // }

  const dailyCtfCategories = [
    { name: "Web exploitation", icon: <CgBrowser className="h-6 w-6" /> },
    { name: "Cryptography", icon: <FaTableCellsRowLock className="h-6 w-6" /> },
    { name: "Forensics", icon: <FaMagnifyingGlassChart className="h-6 w-6" /> },
    { name: "Binary exploitation", icon: <LuBinary className="h-6 w-6" /> },
    { name: "Reverse engineering", icon: <FaGear className="h-6 w-6" /> },
    { name: "OSINT", icon: <BiNetworkChart className="h-6 w-6" /> },
  ];

  const ctfCategories = [
    {
      name: "Web exploitation",
      icon: CgBrowser,
      description:
        "Find and exploit vulnerabilities in web applications, such as SQL injection, cross-site scripting (XSS), and more.",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      borderColor: "border-blue-500/35!",
      alignments: [
        { name: "PR-VAM", description: "Vulnerability Assessment (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "PR-CDA", description: "Cybersecurity Defense Analysis (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "SP-DEV", description: "Software Development (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "SP-TST", description: "Test and Evaluation (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        // { name: "SP-SYS", description: "Systems Development (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        {
          name: "T1190",
          description: "Exploit Public-Facing Application (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1505.003",
          description: "Server Software Component: Web Shell (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1071.001",
          description: "Application Layer Protocol: Web Protocols (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        // {
        //   name: "T1105",
        //   description: "Ingress Tool Transfer (MITRE ATT&CK)",
        //   color: "bg-orange-500/10! text-orange-500!",
        // },
        {
          name: "AP-1.A",
          description: "Identify vulnerabilities, threats, and attack methods (AP® Cybersecurity)",
          color: "bg-green-500/10! text-green-500!",
        },
        {
          name: "AP-1.B",
          description: "Determine how adversaries exploit vulnerabilities (AP® Cybersecurity)",
          color: "bg-green-500/10! text-green-500!",
        },
        {
          name: "AP-1.C",
          description: "Evaluate the likelihood and impact of risks (AP® Cybersecurity)",
          color: "bg-green-500/10! text-green-500!",
        },
      ],
    },
    {
      name: "Reverse engineering",
      icon: FaGear,
      description:
        "Analyze and reverse engineer binaries and other source code to understand their functionality, find vulnerabilities, and exploit them.",
      color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
      borderColor: "border-pink-500/35!",
      alignments: [
        { name: "AN-EXP", description: "Exploitation Analysis (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "SP-DEV", description: "Software Development (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "SP-TST", description: "Test and Evaluation (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "SP-TRD", description: "Technology R&D (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        {
          name: "T1059",
          description: "Command and Scripting Interpreter (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1106",
          description: "Native API (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1027",
          description: "Obfuscated Files or Information (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1204",
          description: "User Execution (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "AP-1.B",
          description: "Determine how adversaries exploit vulnerabilities to compromise assets (AP® Cybersecurity)",
          color: "bg-green-500/10! text-green-500!",
        },
        {
          name: "AP-3.B",
          description: "Determine strategies and methods to detect attacks (AP® Cybersecurity)",
          color: "bg-green-500/10! text-green-500!",
        },
      ],
    },
    {
      name: "Binary exploitation",
      icon: LuBinary,
      description:
        "Identify and exploit vulnerabilities in compiled binaries, such as buffer overflows, format string vulnerabilities, and more.",
      color: "bg-red-500/10 text-red-500 border-red-500/20",
      borderColor: "border-red-500/35!",
      alignments: [
        { name: "AN-EXP", description: "Exploitation Analysis (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "PR-VAM", description: "Vulnerability Assessment (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "SP-ARC", description: "Systems Architecture (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "SP-TST", description: "Test and Evaluation (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "SP-SYS", description: "Systems Development (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        {
          name: "T1548",
          description: "Abuse Elevation Control Mechanism (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1055",
          description: "Process Injection (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1068",
          description: "Exploitation for Privilege Escalation (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1203",
          description: "Exploitation for Client Execution (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "AP-1.B",
          description: "Determine how adversaries exploit vulnerabilities (AP® Cybersecurity)",
          color: "bg-green-500/10! text-green-500!",
        },
        {
          name: "AP-2.B",
          description: "Determine layered security controls that mitigate vulnerabilities (AP® Cybersecurity)",
          color: "bg-green-500/10! text-green-500!",
        },
      ],
    },
    {
      name: "Forensics",
      icon: FaMagnifyingGlassChart,
      description:
        "Analyze digital evidence, such as memory dumps, disk images, and network traffic, to uncover hidden information and artifacts.",
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      borderColor: "border-yellow-500/35!",
      alignments: [
        { name: "IN-FOR", description: "Digital Forensics (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "IN-INV", description: "Cyber Investigation (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "PR-CDA", description: "Cybersecurity Defense Analysis (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        {
          name: "T1005",
          description: "Data from Local System (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1036",
          description: "Masquerading (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1082",
          description: "System Information Discovery (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1049",
          description: "System Network Connections Discovery (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "AP-3.A",
          description: "Identify methods for monitoring systems and detecting attacks (AP® Cybersecurity)",
          color: "bg-green-500/10! text-green-500!",
        },
        {
          name: "AP-3.D",
          description: "Detect and classify cyberattacks by analyzing digital evidence (AP® Cybersecurity)",
          color: "bg-green-500/10! text-green-500!",
        },
      ],
    },
    {
      name: "Cryptography",
      icon: FaTableCellsRowLock,
      description:
        "Solve challenges related to cryptographic algorithms and implementations, including encryption, decryption, and key management.",
      color: "bg-lime-500/10 text-lime-500 border-lime-500/20",
      borderColor: "border-lime-500/35!",
      alignments: [
        { name: "SP-DEV", description: "Software Development (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "SP-ARC", description: "Systems Architecture (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "SP-TRD", description: "Technology R&D (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "SP-RSK", description: "Risk Management (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        {
          name: "T1573.001",
          description: "Symmetric Cryptography (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1573.002",
          description: "Asymmetric Cryptography (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1486",
          description: "Data Encrypted for Impact (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1027",
          description: "Obfuscated Files or Information (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "AP-2.A",
          description: "Identify security controls and explain how they mitigate risks (AP® Cybersecurity)",
          color: "bg-green-500/10! text-green-500!",
        },
        {
          name: "AP-2.C",
          description: "Evaluate the impact of protective risk-management strategies (AP® Cybersecurity)",
          color: "bg-green-500/10! text-green-500!",
        },
      ],
    },
    {
      name: "Miscellaneous",
      icon: BiNetworkChart,
      description:
        "A diverse category that includes more creative challenges, such as open-source intelligence (OSINT), jails, defensive OS , and more.",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      borderColor: "border-purple-500/35!",
      alignments: [
        { name: "AN-TWA", description: "Threat Analysis (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "AN-ASA", description: "All-Source Analysis (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        { name: "PR-CDA", description: "Cybersecurity Defense Analysis (NICE)", color: "bg-sky-500/10! text-sky-500!" },
        {
          name: "T1595",
          description: "Active Scanning (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1596",
          description: "Search Open Websites/Domains (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1598",
          description: "Phishing for Information (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "T1087",
          description: "Account Discovery (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
        },
        {
          name: "AP-4.A",
          description: "Develop clear, shared team objectives for a cybersecurity task (AP® Cybersecurity)",
          color: "bg-green-500/10! text-green-500!",
        },
        {
          name: "AP-1.A",
          description: "Identify vulnerabilities, threats, and attack methods (AP® Cybersecurity)",
          color: "bg-green-500/10! text-green-500!",
        },
      ],
    },
  ];

  const eventChallenges = await api.challenge.fetchPreview({ event: "aoc2025" });

  return (
    <main className="">
      <div className="relative w-full overflow-hidden">
        <CustomSnowfall />
        <div className="absolute inset-0 z-0">
          <SnowBackground className="h-full w-full opacity-30 hue-rotate-[270deg]" />
        </div>
        <div className="flex justify-center bg-gray-950 px-8 pt-10 pb-4">
          <div className="relative z-10 w-full max-w-(--breakpoint-2xl)">
            <div className="flex flex-col items-center justify-between sm:gap-16 xl:flex-row xl:gap-8">
              <div className="max-w-prose">
                <div className="mb-1">
                  <Image src={wordmark} alt="CyberStudents Wordmark" priority className="-ml-2.5 h-6 w-auto sm:h-6.5" />
                </div>
                <h1 className="font-mono text-5xl font-bold">
                  advent of ctf<span className="ml-5 font-sans font-light text-cyan-300">2025</span>
                </h1>
                <p className="mt-8 text-lg">
                  We&rsquo;re back with our second annual Advent of CTF! Every day from December 1st to 25th, solve
                  beginner-oriented gamified cybersecurity challenges for free. Get familiar with capture the flag
                  competitions and cyber concepts from a wide range of popular categories.
                </p>
                <ul className="mt-8 mb-8 text-lg">
                  <li className="mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-sky-300/20 bg-sky-300/10 text-sky-300 shadow backdrop-blur-sm sm:h-14 sm:w-14">
                        <HiOutlineAcademicCap className="h-6 w-6 sm:h-8 sm:w-8" />
                      </div>
                      <div>
                        <p className="leading-6 font-semibold">Beginner & student-oriented</p>
                        <p className="text-base text-gray-300 sm:text-lg">
                          Challenges get harder as the month progresses
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-yellow-300/20 bg-yellow-300/10 text-yellow-300 shadow backdrop-blur-sm sm:h-14 sm:w-14">
                        <HiOutlineTrophy className="h-6 w-6 sm:h-8 sm:w-8" />
                      </div>
                      <div>
                        <p className="leading-6 font-semibold">Over $200 USD in prizes for students</p>
                        <p className="text-base text-gray-300 sm:text-lg">And an open division for anyone to play in</p>
                      </div>
                    </div>
                  </li>
                  <li className="mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-yellow-300/20 bg-red-300/10 text-red-300 shadow backdrop-blur-sm sm:h-14 sm:w-14">
                        <HiOutlineLifebuoy className="h-6 w-6 sm:h-8 sm:w-8" />
                      </div>
                      <div>
                        <p className="leading-6 font-semibold">Two hints release for each challenge</p>
                        <p className="text-base text-gray-300 sm:text-lg">
                          Community & staff help is available for everyone after first blood
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
                {/* <p className="mb-8 text-sm text-gray-400">
                *Community help is always allowed; staff can help after someone has solved the challenge.
              </p> */}
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <div className="flex w-full flex-col items-center sm:items-start">
                    <LiquidGlassButton href="/advent/2025/register" className="flex items-center gap-1 text-lg">
                      Register
                      <HiArrowRight className="ml-0.5 h-3 w-3 stroke-1" />
                    </LiquidGlassButton>
                    <div className="mt-2 w-fit text-sm text-gray-300">Registration is open through Dec 31st.</div>
                  </div>
                  <div className="shrink-0">
                    <p className="mb-1 text-gray-200">Sponsored by:</p>
                    <div className="flex items-center gap-8">
                      <a href="https://ctfguide.com/" target="_blank" rel="noopener noreferrer">
                        <Image
                          src={ctfguideLogo}
                          alt="CTFGuide"
                          className="h-8 w-auto opacity-70 transition-all hover:opacity-100"
                        />
                      </a>
                      <a href="https://www.apisecuniversity.com/" target="_blank" rel="noopener noreferrer">
                        <Image
                          src={apisecLogo}
                          alt="APIsec"
                          className="h-11 w-auto opacity-100 transition-all hover:opacity-80"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-16 sm:mt-0">
                <div className="mb-1 grid w-full max-w-3xl grid-cols-7 text-gray-400">
                  <div className="flex items-center justify-center">S</div>
                  <div className="flex items-center justify-center">M</div>
                  <div className="flex items-center justify-center">T</div>
                  <div className="flex items-center justify-center">W</div>
                  <div className="flex items-center justify-center">T</div>
                  <div className="flex items-center justify-center">F</div>
                  <div className="flex items-center justify-center">S</div>
                </div>
                <div className="grid w-full max-w-3xl grid-cols-7 grid-rows-4 overflow-hidden rounded-lg bg-gray-900/50 outline-1 outline-gray-500 backdrop-blur-lg outline-solid">
                  <Link href="/advent/2024" className="group border-r border-b border-gray-700 bg-gray-900/50">
                    <div className="relative xl:-mt-0.5">
                      <div className="triangle rounded-tl-lg bg-gray-800/80 inset-shadow-xs transition-all group-hover:bg-gray-700/80 sm:w-16">
                        <div className="xl:mt-0.5 xl:ml-0.5">
                          <HiChevronLeft className="h-6 w-6 rotate-45 stroke-1 text-gray-500 transition-all group-hover:text-gray-400" />
                        </div>
                      </div>
                      <div className="absolute bottom-1 left-0.5 px-1 sm:bottom-3 sm:-left-2">
                        <div className="h-4 -rotate-45 text-center text-sm font-medium text-gray-400 transition-all group-hover:text-gray-300">
                          <span className="inline underline sm:hidden">2024</span>
                          <span className="hidden sm:inline">Return to 2024</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  {eventChallenges.challenges.map(({ id, title, category, points }, index) => (
                    <Link
                      key={index}
                      href={!id.startsWith("placeholder-") ? `/advent/2025/challenges?challenge=${id}` : ""}
                      className="flex cursor-pointer flex-col justify-between border-r border-b border-gray-700 bg-gray-900/50 p-4 hover:bg-gray-800/50 sm:h-36 sm:w-full sm:p-3"
                    >
                      <div>
                        <div className="mb-1 hidden font-bold sm:block">
                          {index === 0 && "Dec "}
                          {index + 1}
                          {index === 24 && " 🎄"}
                        </div>
                        <div className="mb-1 block font-bold sm:hidden">{index + 1}</div>
                        <div
                          className={`mb-0.5 hidden text-sm text-gray-300 sm:block ${!title ? "font-mono" : ""} truncate`}
                        >
                          {title ?? "???"}
                        </div>
                      </div>
                      <div className="hidden sm:block">
                        <div className={`mb-0.5 text-xs text-gray-400 ${!category ? "font-mono" : ""}`}>
                          {category ?? "???"}
                        </div>
                        <div className={`text-xs text-gray-400 opacity-80 ${!points ? "hidden font-mono" : ""}`}>
                          {points ?? "???"} pts
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 hidden flex-col items-center justify-center sm:flex sm:items-start">
                    <div className="mb-2 flex w-full flex-col items-center">
                      {Date.now() < new Date("2026-01-01T04:59:00Z").getTime() ? (
                        <>
                          <div className="mb-2 text-lg">
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
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center text-sm text-gray-300 xl:text-start">
                  Click on a day to jump to its challenge!
                </div>
              </div>
              <div className="mt-4 flex flex-col items-center justify-center sm:hidden">
                <div className="mb-2 flex w-full flex-col items-center">
                  {Date.now() < new Date("2026-01-01T04:59:00Z").getTime() ? (
                    <>
                      <div className="mb-2 text-lg">
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
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center bg-gray-900">
        <div className="max-w-(--breakpoint-2xl) overflow-hidden px-4 pt-16 sm:px-8 md:px-10 xl:px-20">
          <div className="mb-32 flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-start lg:gap-16">
            <div className="flex w-full flex-col items-start lg:max-w-sm lg:self-stretch xl:max-w-md">
              <h2 className="mb-1 font-mono font-medium tracking-wider text-cyan-300 uppercase">Over $200 in prizes</h2>
              <h1 className="mb-4 text-3xl font-bold">Compete in three divisions</h1>
              <p className="mb-4 text-lg">
                Advent of CTF will feature a competitive High School and College Division with prizes exclusive for
                students, along with an Open Division and Write-up Division for everyone.
              </p>
              <p className="mb-2 text-lg">
                We will also award a variety of non-competitive badges and awards, such as for first bloods and creative
                solves.
              </p>
              <p className="text-sm text-gray-400">Prizes are subject to change.</p>
              {/* <div className="mt-8 flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-700 px-2 py-4 text-gray-400">
                Interested in&nbsp;
                <a
                  href="mailto:admin@cyberstudents.net"
                  className="underline decoration-gray-500 underline-offset-3 transition-all hover:text-gray-300 hover:decoration-gray-400"
                >
                  sponsoring CyberStudents?
                </a>
              </div> */}
            </div>
            <div className="h-full w-full">
              <div className="flex h-full w-full grid-cols-2 flex-col gap-4 sm:grid">
                <Card className="col-span-1 row-span-2 grid grid-cols-2 flex-col justify-between border border-gray-700! bg-gray-800/50! py-0 transition-shadow hover:shadow-lg sm:flex sm:h-full">
                  <div className="sm:p-auto pt-6 pl-6 sm:pr-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border-sky-300/20 bg-sky-300/10 text-sky-300 sm:mb-2 sm:hidden">
                      <School className="h-6 w-6" />
                    </div>
                    <CardTitle className="flex justify-between gap-3 text-lg sm:mb-0 sm:text-xl">
                      <div>
                        <span>High School and College Division</span>
                        <CardDescription className="mt-1 text-sm font-normal sm:text-base">
                          Individual; $200+ USD
                        </CardDescription>
                      </div>
                      <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg border-sky-300/20 bg-sky-300/10 text-sky-300 sm:flex">
                        <School className="h-6 w-6" />
                      </div>
                    </CardTitle>
                  </div>
                  <CardContent className="px-0">
                    <Table className="table-fixed overflow-hidden rounded-r-xl text-gray-200 sm:rounded-r-none sm:rounded-b-xl">
                      <TableBody className="rounded-md text-base">
                        <TableRow className="bg-yellow-300/25 hover:bg-yellow-300/35!">
                          <TableCell className="w-full py-3!">
                            <div className="flex items-center gap-3">
                              <Trophy className="h-6 w-6 text-yellow-300" />
                              <span>
                                1st <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 py-3! text-right">TBD</TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-300/25 hover:bg-gray-300/35!">
                          <TableCell className="w-full py-3!">
                            <div className="flex items-center gap-3">
                              <Medal className="h-6 w-6 text-gray-300" />
                              <span>
                                2nd <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 py-3! text-right">TBD</TableCell>
                        </TableRow>
                        <TableRow className="bg-yellow-800/25 hover:bg-yellow-800/35!">
                          <TableCell className="w-full py-3!">
                            <div className="flex items-center gap-3">
                              <Award className="h-6 w-6 text-yellow-800" />
                              <span>
                                3rd <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 py-3! text-right">TBD</TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-800/50 hover:bg-gray-800!">
                          <TableCell className="w-full py-3!">
                            <div className="flex items-center gap-3">
                              <Ribbon className="h-6 w-6 text-gray-400" />
                              <span>
                                4th <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 py-3! text-right">TBD</TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-800/50 hover:bg-gray-800!">
                          <TableCell className="w-full py-3!">
                            <div className="flex items-center gap-3">
                              <BadgeIcon className="h-6 w-6 text-gray-400" />
                              <span>
                                5th <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 py-3! text-right">TBD</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card className="col-span-1 grid grid-cols-2 flex-col justify-between border border-gray-700! bg-gray-800/50! py-0 transition-shadow hover:shadow-lg sm:flex sm:h-full">
                  <div className="sm:p-auto pt-6 pb-6 pl-6 sm:pr-6 sm:pb-0">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border-indigo-300/20 bg-indigo-300/10 text-indigo-300 sm:mb-2 sm:hidden">
                      <Earth className="h-6 w-6" />
                    </div>
                    <CardTitle className="flex justify-between gap-3 text-lg sm:mb-0 sm:text-xl">
                      <div>
                        <span>Open Division</span>
                        <CardDescription className="mt-1 text-sm font-normal sm:text-base">Individual</CardDescription>
                      </div>
                      <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg border-indigo-300/20 bg-indigo-300/10 text-indigo-300 sm:flex">
                        <Earth className="h-6 w-6" />
                      </div>
                    </CardTitle>
                  </div>
                </Card>
                {/* Add back grid-cols-2 and remove pr-6 if rankings are present */}
                <Card className="col-span-1 grid grid-cols-1 flex-col justify-between border border-gray-700! bg-gray-800/50! py-0 transition-shadow hover:shadow-lg sm:flex sm:h-full">
                  <div className="right-0 w-full py-6 pr-6 pl-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border-purple-300/20 bg-purple-300/10 text-purple-300">
                      <FileText className="h-6 w-6" />
                    </div>
                    <CardTitle className="flex w-full justify-between gap-3 text-lg sm:mb-0 sm:text-xl">
                      <div className="w-full">
                        <span>Write-Up Division</span>
                        <CardDescription className="mt-1 w-full text-sm font-normal sm:text-base">
                          <div>
                            Submit write-ups for challenges after the event; best submissions are recognized and shown
                            here.
                          </div>
                        </CardDescription>
                      </div>
                    </CardTitle>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className="mb-32 flex flex-col items-center gap-8">
            <div className="w-full max-w-(--breakpoint-lg) lg:text-center">
              <h1 className="mb-4 text-3xl font-bold">
                <span>Challenges from six core categories</span>
                {/* <br />
                <span className="text-cyan-300">Progressively harder.</span> */}
              </h1>
              <p className="text-lg">
                Advent of CTF features a wide range of challenges of varying difficulties across six of the most
                popular, practical, and relevant categories within cybersecurity. These categories reflect those present
                in other CTFs and practical training environments. Regardless of your skill level, we promise that there
                will be something for you to learn and enjoy this holiday season.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {ctfCategories.map((category) => (
                <Card
                  key={category.name}
                  className={`h-full transition-shadow hover:shadow-lg ${category.borderColor} border-2`}
                >
                  <CardHeader>
                    <div
                      className={`mb-4 hidden h-12 w-12 items-center justify-center rounded-lg lg:flex ${category.color}`}
                    >
                      {category.icon && <category.icon className="h-6 w-6" />}
                    </div>
                    <CardTitle className="mb-1 flex items-center justify-between text-xl lg:mb-0">
                      <span>{category.name}</span>
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg lg:hidden ${category.color}`}
                      >
                        {category.icon && <category.icon className="h-6 w-6" />}
                      </div>
                    </CardTitle>
                    <CardContent className="px-0">
                      <CardDescription className="mb-4 text-base">{category.description}</CardDescription>
                      <h2 className="mb-1 flex items-center text-sm font-semibold text-gray-500">
                        <span>Framework alignments</span>
                        <Dialog>
                          <DialogTrigger asChild>
                            <button title="About curriculum framework alignments" className="ml-1">
                              <CircleQuestionMark className="h-4 w-4 cursor-pointer text-gray-400" />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="mb-2 text-left">
                                About curriculum framework alignments
                              </DialogTitle>
                              <DialogDescription className="text-left text-base">
                                <span>
                                  These alignments are based on the{" "}
                                  <a
                                    href="https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-gray-300 underline"
                                  >
                                    NICE Workforce Framework for Cybersecurity
                                  </a>
                                  ,{" "}
                                  <a
                                    href="https://attack.mitre.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-gray-300 underline"
                                  >
                                    MITRE ATT&CK
                                  </a>
                                  , and{" "}
                                  <a
                                    href="https://apcentral.collegeboard.org/media/pdf/ap-cybersecurity-course-framework.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-gray-300 underline"
                                  >
                                    AP® Cybersecurity
                                  </a>
                                  . CyberStudents Learn will use these alignments in the future to develop supplementary
                                  learning materials and resources for each topic.
                                </span>
                                <span className="mt-4 block">
                                  Hover over each alignment on desktop for more information.
                                </span>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </h2>
                      <div className="flex w-full flex-wrap gap-1">
                        <TooltipProvider delayDuration={100}>
                          {category.alignments.map((alignment) => (
                            <Tooltip key={alignment.name}>
                              <TooltipTrigger asChild>
                                <button className="cursor-help">
                                  <Badge className={`text-xs ${alignment.color} cursor-help`}>
                                    <span>{alignment.name}</span>
                                  </Badge>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>{alignment.description}</TooltipContent>
                            </Tooltip>
                          ))}
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
          <div className="mx-auto mb-16 w-full max-w-3xl md:text-center">
            <h1 className="mb-2 text-3xl font-bold">Our past competitions</h1>
            <p className="text-lg">
              We&rsquo;ve hosted many competitions directed to students and beginners over the last three years. Explore
              our past competitions and challenges to learn more and practice your skills.
            </p>
          </div>
          <div className="mb-32 grid grid-flow-row grid-cols-1 gap-x-9 gap-y-16 sm:grid-cols-2 xl:grid-cols-3 xl:gap-y-24">
            <div className="col-span-1 flex flex-col items-center gap-8 sm:col-span-2 xl:col-span-3 xl:flex-row xl:justify-between">
              <div className="max-w-196 xl:max-w-md">
                <div className="mb-3 w-fit rounded-full border border-white/20 bg-white/10 p-4 shadow-xs shadow-white/25 backdrop-blur-xs">
                  <TbChristmasTree className="h-8 w-8 text-gray-100" />
                </div>
                <h2 className="mb-2 text-2xl font-bold">Advent of CTF 2024</h2>
                <p className="mb-4 text-lg">
                  Last December, we hosted the same month-long beginner-friendly CTF competition with challenges
                  released daily and US$280 up for grabs. We&rsquo;re excited to bring new challenges and prizes for you
                  this year!
                </p>
                <Button className="bg-gray-100 text-base hover:bg-gray-300" asChild>
                  <Link href="/advent/2024/results">
                    Advent of CTF 2024
                    <HiArrowRight className="mb-0.5 h-3 w-3 stroke-1" />
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
                      <TableRow className="bg-gray-600/25 hover:bg-gray-600/35!">
                        <TableCell className="w-14">4th</TableCell>
                        <TableCell className="flex items-center gap-1.5">
                          <span>silence_</span>
                          <Image src={indiaFlag} alt="Flag for India" title="India" className="h-5 w-5" />
                        </TableCell>
                      </TableRow>
                      <TableRow className="bg-gray-600/25 hover:bg-gray-600/35!">
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
                  <div className="flex max-w-80 items-center justify-center gap-4">
                    <p className="text-center font-medium text-gray-400">
                      Advent of CTF 2024
                      <br />
                      prizes sponsored by
                    </p>
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
                  Play in our beginner-friendly daily capture the flag challenges throughout the year. Learn new skills,
                  discuss with others, and compete for prizes.
                </p>
                <div className="-ml-4 flex">
                  {dailyCtfCategories.map(({ name, icon }) => (
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
                    <HiArrowUpRight className="mb-0.5 h-3 w-3 stroke-1" />
                  </a>
                </Button>
              </div>
              <DailyCTFImages />
            </div>
          </div>
          <div className="mb-32 flex flex-col items-center gap-10 overflow-x-hidden">
            <div className="mx-auto flex w-full max-w-4xl flex-col sm:text-center">
              <h1 className="mb-4 text-3xl font-bold">Discover past CTF challenges</h1>
              <p className="mb-4 text-lg">
                Get a taste of some of the challenges you&rsquo;ll come across in Advent of CTF this year from our past
                competitions.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
                <Button className="bg-gray-100 hover:bg-gray-300" asChild>
                  <a href="https://github.com/cyberstudentsacademy/Advent-of-CTF" target="_blank">
                    Advent of CTF Write-Ups
                    <HiArrowUpRight className="mb-0.5 stroke-1" />
                  </a>
                </Button>
                <Button className="bg-gray-100 hover:bg-gray-300" asChild>
                  <a href="https://github.com/cyberstudentsacademy/csd-ctf" target="_blank">
                    Daily CTFs Write-Ups
                    <HiArrowUpRight className="mb-0.5 stroke-1" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="h-full w-full overflow-x-hidden px-9 sm:px-12">
              <ChallengesCarousel />
              <div className="mt-2 flex items-center justify-center gap-2 xl:hidden">
                <MdSwipe className="mb-0.5 h-5 w-5 text-gray-500" />
                <span className="text-sm font-semibold text-gray-500">Swipe to see more challenges</span>
              </div>
            </div>
          </div>
          <div className="mb-16 flex flex-col items-center justify-between gap-16 lg:flex-row lg:items-start lg:gap-32">
            <div className="flex w-full flex-col items-start lg:self-stretch">
              <h2 className="mb-1 font-mono font-medium tracking-wider text-cyan-300 uppercase">Introduction</h2>
              <h1 className="mb-4 text-3xl font-bold">What&rsquo;s capture the flag?</h1>
              <p className="mb-4 text-base sm:text-lg">
                In cybersecurity, a Jeopardy-style capture the flag (CTF) competition is a type of challenge where
                players solve various computer security-related tasks to earn points. These tasks can range from
                exploiting vulnerabilities in software to reverse engineering code, and they often simulate real-world
                scenarios that professionals encounter.
              </p>
              <p className="mb-4 text-base sm:text-lg">
                Advent of CTF is no different than other CTFs you might&rsquo;ve played before in terms of our
                challenges. However, we&rsquo;ve specifically designed this CTF to become progressively more difficult
                and incorporated hints and resources to allow everyone to learn and grow their skills throughout the
                month.
                {/* Despite this competition being
                generally more difficult than our other ones, we still aim to make every challenge accessible to all
                participants by providing hints, resources, and a supportive community plus staff team. */}
              </p>
              <p className="mb-2 text-base sm:text-lg">
                If you need help with any challenge, feel free to ask for assistance from our community on Discord or
                reach out directly to our staff team by opening a ticket. We&rsquo;re here to support you and we hope
                you find Advent of CTF both fun and educational!
              </p>
              {/* <p className="mb-2 text-base sm:text-lg">
                Players can open tickets in our Discord server at any time before, during, and after the competition to
                ask for sanity checks, advice, resources, and infrastructure support.
              </p> */}
              <p className="text-sm font-medium text-gray-400 sm:text-base">
                Remember, CTFs are <em>always</em> more fun when played with friends!
              </p>
            </div>
            <div className="flex w-full flex-col items-start lg:self-stretch">
              <h2 className="mb-1 font-mono font-medium tracking-wider text-cyan-300 uppercase">
                CyberStudents Foundation
              </h2>
              <h1 className="mb-4 text-3xl font-bold">Our vision</h1>
              <p className="mb-4 text-base sm:text-lg">
                Advent of CTF challenges, along with all of our other challenges, will be archived and available for
                free forever in our Gym for aspiring players, teams, and educators to practice and learn from. These
                challenges are designed to be aligned with educational curriculums and frameworks, and will be
                integrated into our platform as practical, supplemental, and engaging materials alongside various styles
                of labs.
              </p>
              <p className="mb-4 text-base sm:text-lg">
                Our goal is to streamline the process of learning cybersecurity skills (and related concepts) for
                students, then applying it in real-world scenarios, such as preparing for practical certifications,
                competitions, and working in the industry.
              </p>
              <p className="text-base sm:text-lg">
                Furthermore, we are committed to providing our resources to help students of all backgrounds worldwide
                to understand and practice cybersecurity skills, especially through interdisciplinary and diverse
                approaches.
              </p>
              <p className="text-sm text-gray-400"></p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-3xl text-center">
            <h1 className="mb-2 text-xl font-bold">Thank you to our challenge developers 🩵</h1>
          </div>
          {/* <div className="mt-8 mb-16 grid w-full grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"> */}
          <div className="mt-8 mb-4 grid grid-cols-3 gap-4">
            {CHALLENGE_DEVELOPERS.map((dev) => (
              <div key={dev.name} className="flex flex-col items-center">
                <Image
                  src={dev.pfp}
                  alt={`Profile picture of ${dev.name}`}
                  className="mb-2 h-16 w-16 rounded-full object-cover"
                />
                <span className="text-base font-medium text-gray-200">{dev.name}</span>
                <span className="text-sm text-gray-400">{dev.description}</span>
              </div>
            ))}
          </div>
          <div className="mb-16 flex items-center justify-center text-gray-300">and more&hellip;</div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="bg-gray-100 text-base hover:bg-gray-300" asChild>
              <Link href="/advent/2025/register">
                Register
                <HiArrowRight className="mb-0.5 stroke-1" />
              </Link>
            </Button>
            <div className="h-px self-stretch bg-gray-700 sm:mx-2 sm:h-auto sm:w-px" />
            <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
              <Button
                tabIndex={-1}
                className="flex w-full items-center bg-[#5865f2]! text-base text-gray-200! hover:bg-[#5865f2]/70!"
              >
                <FaDiscord className="h-6! w-6!" />
                <span>Discord</span>
              </Button>
            </a>
            {/* TODO: change to actual event link */}
            <a href="https://ctftime.org/ctf/1218" target="_blank">
              <Button
                tabIndex={-1}
                className="flex w-full items-center bg-[#e3000b]! text-base text-gray-200! hover:bg-[#e3000b]/70!"
              >
                <Image src={ctftimeLogo} alt="CTFtime Logo" className="h-5 w-5" />
                <span>CTFtime</span>
              </Button>
            </a>
          </div>
          <div className="mt-8 flex justify-center">
            <a
              href="https://www.vecteezy.com/free-vector/background"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:underline"
            >
              Background Vectors by Vecteezy
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
