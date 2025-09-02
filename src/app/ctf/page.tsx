import Link from "next/link";
import Image from "next/image";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import HeaderText from "./header";
import ChallengesCarousel from "./carousel";
import LiquidGlassButton from "~/components/LiquidGlassButton";
import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { Table } from "~/components/ui/table";
import DailyCTFImages from "../daily-ctf-images";
import TimeTooltip from "./time-tooltip";
import { MdCalendarMonth, MdSwipe } from "react-icons/md";
import { TbChristmasTree } from "react-icons/tb";
import { BiNetworkChart } from "react-icons/bi";
import { CgBrowser } from "react-icons/cg";
import { FaTableCellsRowLock, FaMagnifyingGlassChart, FaGear, FaDiscord } from "react-icons/fa6";
import { LuBinary } from "react-icons/lu";
import { Award, CircleQuestionMark, Earth, FileText, Medal, Ribbon, School, Trophy } from "lucide-react";
import { TableBody, TableRow, TableCell } from "~/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import ctftimeLogo from "~/../public/ctftime-logo.png";

import icsred from "~/../public/icsred.png";
import austriaFlag from "~/../public/flags/austria.svg";
import indiaFlag from "~/../public/flags/india.svg";
import romaniaFlag from "~/../public/flags/romania.svg";
import swedenFlag from "~/../public/flags/sweden.svg";
import unitedStatesFlag from "~/../public/flags/united-states.svg";

import pfp_doctor_jang from "~/../public/staff-pfps/doctor_jang.png";
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
  { name: "Mr_MPH", pfp: pfp_mr_mph },
  { name: "Kolmus", pfp: pfp_kolmus },
  { name: "MathLegend_175", pfp: pfp_mathlegend },
  { name: "wjaaaaaaat", pfp: pfp_wjaaaaaaat },
  { name: "vy", pfp: pfp_vy },
  { name: "Logix", pfp: pfp_logix },
];

export default function CTF() {
  const aoc2024CtfCategories = [
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
        { name: "SP-SYS", description: "Systems Development (NICE)", color: "bg-sky-500/10! text-sky-500!" },
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
        {
          name: "T1105",
          description: "Ingress Tool Transfer (MITRE ATT&CK)",
          color: "bg-orange-500/10! text-orange-500!",
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
      ],
    },
    {
      name: "Miscellaneous",
      icon: BiNetworkChart,
      description:
        "A diverse category that includes more creative and experimental challenges, such as open-source intelligence (OSINT), jails, and more.",
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
      ],
    },
  ];

  return (
    <main className="mb-12 sm:mb-24">
      <div className="relative w-full overflow-hidden bg-gray-950 px-4 py-16 text-white sm:px-8 md:px-10">
        <div className="animate-travel-x absolute top-1/4 left-[-20%] h-80 w-80 rounded-full bg-cyan-300 opacity-15 blur-3xl [animation-duration:22s]" />
        <div className="animate-travel-x absolute top-1/3 left-[-25%] h-96 w-96 rounded-full bg-purple-400 opacity-15 blur-3xl [animation-delay:2s] [animation-duration:28s]" />
        <div className="animate-travel-x absolute top-1/2 left-[-30%] h-72 w-72 rounded-full bg-pink-400 opacity-15 blur-3xl [animation-delay:5s] [animation-duration:24s]" />
        <div className="animate-travel-x absolute top-[70%] left-[-22%] h-60 w-60 rounded-full bg-indigo-400 opacity-15 blur-3xl [animation-delay:3s] [animation-duration:26s]" />
        <div className="animate-travel-x absolute top-[10%] left-[-35%] h-64 w-64 rounded-full bg-cyan-300 opacity-15 blur-3xl [animation-delay:7s] [animation-duration:30s]" />
        <div className="animate-travel-x absolute top-[85%] left-[-40%] h-72 w-72 rounded-full bg-teal-300 opacity-15 blur-3xl [animation-delay:1s] [animation-duration:32s]" />
        <div className="animate-travel-x absolute top-[5%] left-[-50%] h-96 w-96 rounded-full bg-blue-400 opacity-15 blur-3xl [animation-delay:4s] [animation-duration:34s]" />
        <div className="animate-travel-x absolute top-[60%] left-[-60%] h-56 w-56 rounded-full bg-sky-300 opacity-15 blur-3xl [animation-delay:6s] [animation-duration:27s]" />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center">
          <TimeTooltip />

          <HeaderText />

          <p className="mb-6 max-w-3xl text-lg">
            Join us for CSD CTF 2025 – a thrilling 48-hour capture the flag competition designed for students and
            beyond. Evolve your skills in cybersecurity, solve practical and fun challenges across various categories,
            climb the leaderboard across two divisions, and compete for prizes.
          </p>

          <LiquidGlassButton href="/ctf/register" className="flex items-center gap-1 text-lg">
            Register
            <HiArrowRight className="ml-0.5 h-3 w-3 stroke-1" />
          </LiquidGlassButton>

          {/* <p className="mt-2 text-sm text-gray-400">Full rules to be determined</p> */}

          <div className="mt-8 flex max-w-(--breakpoint-lg) flex-col items-center justify-center gap-4 md:flex-row md:justify-between md:gap-0">
            <div className="flex w-full items-center gap-3 text-left md:w-49 md:flex-col md:items-center md:gap-2 md:text-center">
              <h2 className="w-[5.7425rem] text-right text-2xl font-bold md:text-center md:text-3xl">45+</h2>
              <p className="max-w-60 text-gray-300">challenges in 48 hours across four waves</p>
            </div>
            <div className="flex w-full items-center gap-3 text-left md:w-49 md:flex-col md:items-center md:gap-2 md:text-center">
              <h2 className="w-[5.7425rem] text-right text-2xl font-bold md:text-center md:text-3xl">6</h2>
              <p className="max-w-60 text-gray-300">practical and diverse categories</p>
            </div>
            <div className="flex w-full items-center gap-3 text-left md:w-49 md:flex-col md:items-center md:gap-2 md:text-center">
              <h2 className="w-[5.7425rem] text-right text-2xl font-bold md:text-center md:text-3xl">$200+</h2>
              <p className="max-w-60 text-gray-300">prize pool, with prizes reserved for students</p>
            </div>
            <div className="flex w-full items-center gap-3 text-left md:w-49 md:flex-col md:items-center md:gap-2 md:text-center">
              <h2 className="w-[5.7425rem] text-right text-2xl font-bold md:text-center md:text-3xl">800+</h2>
              <p className="max-w-60 text-gray-300">
                players from <strong>85+</strong> countries in past competitions
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="max-w-(--breakpoint-2xl) overflow-hidden px-4 pt-16 sm:px-8 md:px-10 xl:px-20">
          <div className="mb-32 flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-start lg:gap-16">
            <div className="flex w-full flex-col items-start lg:max-w-sm lg:self-stretch xl:max-w-md">
              <h2 className="mb-1 font-mono font-medium tracking-wider text-cyan-300 uppercase">Over $200 in prizes</h2>
              <h1 className="mb-4 text-3xl font-bold">Three divisions for prizes</h1>
              <p className="mb-4 text-lg">
                For the first time, CSD CTF will feature a high school and college division alongside an open division,
                allowing participants to compete for prizes based on their experience level.
              </p>
              <p className="mb-4 text-lg">
                We will also award a variety of non-competitive badges, such as for first bloods.
              </p>
              <p className="text-sm text-gray-400">Prizes are subject to change until the competition begins.</p>
              <div className="mt-8 flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-700 px-2 py-4 text-gray-400">
                Interested in&nbsp;
                <a
                  href="mailto:admin@cyberstudents.net"
                  className="underline decoration-gray-500 underline-offset-3 transition-all hover:text-gray-300 hover:decoration-gray-400"
                >
                  sponsoring CyberStudents?
                </a>
              </div>
            </div>
            <div className="h-full w-full">
              <div className="flex h-full w-full grid-cols-2 flex-col gap-4 sm:grid">
                <Card className="col-span-1 grid grid-cols-2 flex-col justify-between border border-gray-700! bg-gray-800/50! py-0 transition-shadow hover:shadow-lg sm:flex sm:h-full">
                  <div className="sm:p-auto pt-6 pl-6 sm:pr-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border-sky-300/20 bg-sky-300/10 text-sky-300 sm:mb-2 sm:hidden">
                      <School className="h-6 w-6" />
                    </div>
                    <CardTitle className="flex justify-between gap-3 text-lg sm:mb-0 sm:text-xl">
                      <div>
                        <span>High School and College Division</span>
                        <CardDescription className="mt-1 text-sm font-normal sm:text-base">
                          Worldwide, ≤5 players per team
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
                          <TableCell className="w-full">
                            <div className="flex items-center gap-3">
                              <Trophy className="h-6 w-6 text-yellow-300" />
                              <span>
                                1st <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 text-right">TBD</TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-300/25 hover:bg-gray-300/35!">
                          <TableCell className="w-full">
                            <div className="flex items-center gap-3">
                              <Medal className="h-6 w-6 text-gray-300" />
                              <span>
                                2nd <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 text-right">TBD</TableCell>
                        </TableRow>
                        <TableRow className="bg-yellow-800/25 hover:bg-yellow-800/35!">
                          <TableCell className="w-full">
                            <div className="flex items-center gap-3">
                              <Award className="h-6 w-6 text-yellow-800" />
                              <span>
                                3rd <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 text-right">TBD</TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-800/50 hover:bg-gray-800!">
                          <TableCell className="w-full">
                            <div className="flex items-center gap-3">
                              <Ribbon className="h-6 w-6 text-gray-400" />
                              <span>
                                4th <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 text-right">TBD</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card className="col-span-1 grid grid-cols-2 flex-col justify-between border border-gray-700! bg-gray-800/50! py-0 transition-shadow hover:shadow-lg sm:flex sm:h-full">
                  <div className="sm:p-auto pt-6 pl-6 sm:pr-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border-indigo-300/20 bg-indigo-300/10 text-indigo-300 sm:mb-2 sm:hidden">
                      <Earth className="h-6 w-6" />
                    </div>
                    <CardTitle className="flex justify-between gap-3 text-lg sm:mb-0 sm:text-xl">
                      <div>
                        <span>Open Division</span>
                        <CardDescription className="mt-1 text-sm font-normal sm:text-base">
                          Worldwide, ≤5 players per team
                        </CardDescription>
                      </div>
                      <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg border-indigo-300/20 bg-indigo-300/10 text-indigo-300 sm:flex">
                        <Earth className="h-6 w-6" />
                      </div>
                    </CardTitle>
                  </div>
                  <CardContent className="px-0">
                    <Table className="table-fixed overflow-hidden rounded-r-xl text-gray-200 sm:rounded-r-none sm:rounded-b-xl">
                      <TableBody className="rounded-md text-base">
                        <TableRow className="bg-yellow-300/25 hover:bg-yellow-300/35!">
                          <TableCell className="w-full">
                            <div className="flex items-center gap-3">
                              <Trophy className="h-6 w-6 text-yellow-300" />
                              <span>
                                1st <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 text-right">TBD</TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-300/25 hover:bg-gray-300/35!">
                          <TableCell className="w-full">
                            <div className="flex items-center gap-3">
                              <Medal className="h-6 w-6 text-gray-300" />
                              <span>
                                2nd <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 text-right">TBD</TableCell>
                        </TableRow>
                        <TableRow className="bg-yellow-800/25 hover:bg-yellow-800/35!">
                          <TableCell className="w-full">
                            <div className="flex items-center gap-3">
                              <Award className="h-6 w-6 text-yellow-800" />
                              <span>
                                3rd <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 text-right">TBD</TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-800/50 hover:bg-gray-800!">
                          <TableCell className="w-full">
                            <div className="flex items-center gap-3">
                              <Ribbon className="h-6 w-6 text-gray-400" />
                              <span>
                                4th <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 text-right">TBD</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card className="col-span-2 grid grid-cols-2 border border-gray-700! bg-gray-800/50! py-0 transition-shadow hover:shadow-lg sm:h-full">
                  <div className="right-0 w-full py-6 pl-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border-purple-300/20 bg-purple-300/10 text-purple-300">
                      <FileText className="h-6 w-6" />
                    </div>
                    <CardTitle className="flex justify-between gap-3 text-lg sm:mb-0 sm:text-xl">
                      <div>
                        <span>Write-Up Division</span>
                        <CardDescription className="mt-1 text-sm font-normal sm:text-base">
                          <div>Worldwide, Open</div>
                        </CardDescription>
                      </div>
                    </CardTitle>
                  </div>
                  <CardContent className="px-0">
                    <Table
                      className="col-span-1 h-full table-fixed overflow-hidden rounded-r-xl text-gray-200"
                      outerDivClassName="h-full"
                    >
                      <TableBody className="rounded-md text-base">
                        <TableRow className="bg-yellow-300/25 hover:bg-yellow-300/35!">
                          <TableCell className="w-full">
                            <div className="flex items-center gap-3">
                              <Trophy className="h-6 w-6 text-yellow-300" />
                              <span>
                                1st <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 text-right">TBD</TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-300/25 hover:bg-gray-300/35!">
                          <TableCell className="w-full">
                            <div className="flex items-center gap-3">
                              <Medal className="h-6 w-6 text-gray-300" />
                              <span>
                                2nd <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 text-right">TBD</TableCell>
                        </TableRow>
                        <TableRow className="bg-yellow-800/25 hover:bg-yellow-800/35!">
                          <TableCell className="w-full">
                            <div className="flex items-center gap-3">
                              <Award className="h-6 w-6 text-yellow-800" />
                              <span>
                                3rd <span className="hidden sm:inline">Place</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-18 text-right">TBD</TableCell>
                        </TableRow>
                        {/* <TableRow className="bg-gray-800/50 hover:bg-gray-800!">
                            <TableCell className="w-full">
                              <div className="flex items-center gap-3">
                                <Ribbon className="h-6 w-6 text-gray-400" />
                                <span>
                                  4th <span className="hidden sm:inline">Place</span>
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="w-18 text-right">TBD</TableCell>
                          </TableRow> */}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="mb-32 flex flex-col items-center gap-8">
            <div className="w-full max-w-(--breakpoint-lg) lg:text-center">
              <h1 className="mb-4 text-3xl font-bold">
                <span>Six core categories.</span>
                <br />
                <span className="text-cyan-300">Progressively harder.</span>
              </h1>
              <p className="text-lg">
                CSD CTF features a wide range of challenges of varying difficulties across six of the most popular,
                practical, and relevant categories within cybersecurity. These categories reflect those present in other
                CTFs and practical training environments.
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
                                  </a>{" "}
                                  and{" "}
                                  <a
                                    href="https://attack.mitre.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-gray-300 underline"
                                  >
                                    MITRE ATT&CK
                                  </a>
                                  . CyberStudents Learn will use these alignments, along with additional frameworks like{" "}
                                  <a
                                    href="https://apcentral.collegeboard.org/media/pdf/career-kickstart-instructional-overview.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-gray-300 underline"
                                  >
                                    AP®
                                  </a>
                                  , in the future to develop supplementary learning materials and resources for each
                                  topic.
                                </span>
                                <span className="mt-4 block">Hover over each alignment for more information.</span>
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
              CSD CTF is our new premier annual capture the flag competition. Explore our past competitions and
              challenges to learn more and practice your skills.
            </p>
          </div>
          <div className="mb-32 grid grid-flow-row grid-cols-1 gap-x-9 gap-y-16 sm:grid-cols-2 xl:grid-cols-3 xl:gap-y-24">
            <div className="col-span-1 flex flex-col items-center gap-8 sm:col-span-2 xl:col-span-3 xl:flex-row xl:justify-between">
              <div className="max-w-196 xl:max-w-md">
                <div className="mb-3 w-fit rounded-full border border-white/20 bg-white/10 p-4 shadow-xs shadow-white/25 backdrop-blur-xs">
                  <TbChristmasTree className="h-8 w-8 text-gray-100" />
                </div>
                <h2 className="mb-2 text-2xl font-bold">Advent of CTF</h2>
                <p className="mb-4 text-lg">
                  Last December, we hosted a month-long beginner-friendly CTF competition with challenges released daily
                  and US$280 up for grabs. We plan to host this event again this year.
                </p>
                <Button className="bg-gray-100 text-base hover:bg-gray-300" asChild>
                  <Link href="/advent/2024">
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
                    <Link href="/advent/2024#a-note-on-the-delay-of-prizes">
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
                  {aoc2024CtfCategories.map(({ name, icon }) => (
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
                Get a taste of some of the challenges you&rsquo;ll come across in CSD CTF from our past competitions.
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
                CSD CTF is no different than other CTFs you might&rsquo;ve played before. Despite this competition being
                generally more difficult than our other ones, we still aim to make every challenge accessible to all
                participants by providing hints, resources, and a supportive community plus staff team.
              </p>
              <p className="text-base sm:text-lg">
                Players can open tickets in our Discord server at any time before, during, and after the competition to
                ask for sanity checks, advice, resources, and infrastructure support.
              </p>
            </div>
            <div className="flex w-full flex-col items-start lg:self-stretch">
              <h2 className="mb-1 font-mono font-medium tracking-wider text-cyan-300 uppercase">
                CyberStudents Foundation
              </h2>
              <h1 className="mb-4 text-3xl font-bold">Our vision</h1>
              <p className="mb-4 text-base sm:text-lg">
                CSD CTF 2025 challenges, along with all of our other eligible challenges, will be archived and available
                for free forever in our Gym for aspiring individuals, teams, organizations, and educators to practice
                and learn from. These challenges are designed to be aligned with educational and vocational curriculums
                and frameworks, and will be integrated into our future learning platform as practical, supplemental, and
                engaging materials alongside various styles of labs.
              </p>
              <p className="mb-4 text-base sm:text-lg">
                Our goal is to streamline the process of learning cybersecurity skills (and related or prerequisite
                concepts), then applying it in real-world scenarios, such as preparing for practical certifications,
                competitions, and working in the industry.
              </p>
              <p className="text-base sm:text-lg">
                Furthermore, we are committed to providing our resources to help students of all backgrounds to
                understand and practice cybersecurity skills, especially through interdisciplinary and diverse
                approaches.
              </p>
              <p className="text-sm text-gray-400"></p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-3xl text-center">
            <h1 className="mb-2 text-xl font-bold">Thank you to our challenge developers 🩵</h1>
          </div>
          <div className="mt-8 mb-16 grid w-full grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9">
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
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="bg-gray-100 text-base hover:bg-gray-300" asChild>
              <Link href="/ctf/register">
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
            <a href="https://ctftime.org/event/2832" target="_blank">
              <Button
                tabIndex={-1}
                className="flex w-full items-center bg-[#e3000b]! text-base text-gray-200! hover:bg-[#e3000b]/70!"
              >
                <Image src={ctftimeLogo} alt="CTFtime Logo" className="h-5 w-5" />
                <span>CTFtime</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
