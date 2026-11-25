import type { StaticImageData } from "next/image";

import cyberstartHq from "~/../public/history/cyberstart-hq.webp";
import dailyCtfChallenge from "~/../public/daily-ctf-challenge.png";
import dailyCtfLeaderboard from "~/../public/daily-ctf-leaderboard.png";
import advent2024Calendar from "~/../public/history/advent-2024-calendar.webp";
import advent2025Announcement from "~/../public/history/advent-2025-announcement.png";
import talkMalwareRev from "~/../public/community/talk-malware-rev.webp";
import schoolingChart from "~/../public/advent-of-ctf-2024/schooling-status-pie-chart.svg";
import frameworkLogos from "~/../public/history/framework-logos.webp";
import talkVirtualMachines from "~/../public/community/talk-virtual-machines.webp";

export type HistoryEntry = {
  date: string;
  dateTime: string;
  title: string;
  text: string;
  href?: string;
  linkText?: string;
  /** Only real images. An entry without one shows no frame at all. */
  image?: { src: StaticImageData; alt: string; position?: string };
  /** Shown in the full timeline on /about but not in the homepage's eight milestones. */
  aboutOnly?: boolean;
};

export const history: HistoryEntry[] = [
  {
    date: "Dec 2, 2021",
    dateTime: "2021-12-02",
    title: "CyberStudents begins",
    text: "Our server opens as a place to work through CyberStart challenges together.",
    image: {
      src: cyberstartHq,
      alt: "A player's monitor showing the Headquarters Base level map in the CyberStart game",
      position: "70% 40%",
    },
  },
  {
    date: "Jan 13, 2024",
    dateTime: "2024-01-13",
    title: "Our own challenges",
    text: "After CyberStart closes and under new ownership, we rename ourselves CyberStudents and start a daily CTF the very next day.",
    image: { src: dailyCtfChallenge, alt: "A Daily CTF challenge post in Discord" },
  },
  {
    date: "Feb 2024",
    dateTime: "2024-02-17",
    title: "A server built for learning",
    text: "A month of updates adds forums for free resources, resume reviews, a channel for security news, and a guided welcome for new members.",
    href: "/news/server-overhaul-2024",
    linkText: "Read more",
    aboutOnly: true,
  },
  {
    date: "Mar 2024",
    dateTime: "2024-03",
    title: "Webinars in the Conference Room",
    text: "Vipin introduces virtual machines and Kali Linux, and two days later, students from UNLV's Cyber Clinic and Layer Zero share what their groups do.",
    href: "/news/unlv-webinar",
    linkText: "Read more",
    image: {
      src: talkVirtualMachines,
      alt: "Title slide of Vipin's webinar on virtual machines, Kali Linux, and essential tools",
    },
    aboutOnly: true,
  },
  {
    date: "Apr 2024",
    dateTime: "2024-04-25",
    title: "A bigger team",
    text: "Seven members join our staff through open applications, as challenge developers, moderators, and community managers.",
    href: "/news/new-staff-april-2024",
    linkText: "Read more",
    aboutOnly: true,
  },
  {
    date: "Aug 2024",
    dateTime: "2024-08",
    title: "Six rounds of Daily CTF",
    text: "The Daily CTF wraps up its sixth and final round, with 55 challenges in total.",
    href: "https://github.com/cyberstudentsfoundation/csd-ctf",
    linkText: "Archive",
    image: { src: dailyCtfLeaderboard, alt: "A Daily CTF round leaderboard posted by our bot" },
  },
  {
    date: "Dec 2024",
    dateTime: "2024-12",
    title: "The first Advent of CTF",
    text: "780 players from 85 countries take on 25 challenges over 25 days.",
    href: "/advent/2024",
    linkText: "Advent of CTF 2024",
    image: {
      src: advent2024Calendar,
      alt: "The Advent of CTF 2024 calendar, with a door for each of the 25 challenges",
    },
  },
  {
    date: "Mar 2025",
    dateTime: "2025-03-28",
    title: "InfoSec Growth Sessions",
    text: "Members start meeting every week to share progress and set goals, and people working in security join us for live talks and webinars.",
    image: { src: talkMalwareRev, alt: "Title slide of an Intro to Malware Rev webinar in our Conference Room" },
  },
  {
    date: "May 2025",
    dateTime: "2025-05",
    title: "Results and statistics",
    text: "We publish the 2024 results, along with charts of who played and where they came from.",
    href: "/advent/2024/results",
    linkText: "Results",
    image: {
      src: schoolingChart,
      alt: "Pie chart of Advent of CTF 2024 players by school year, from the results article",
    },
  },
  {
    date: "Summer 2025",
    dateTime: "2025-07",
    title: "Framework mapping",
    text: "We map our challenge categories to NICE, MITRE ATT&CK, and the AP® Cybersecurity framework.",
    image: { src: frameworkLogos, alt: "Logos of the NICE Framework, MITRE ATT&CK and AP" },
  },
  {
    date: "Dec 2025",
    dateTime: "2025-12",
    title: "Advent of CTF returns",
    text: "Advent of CTF comes back with 24 new challenges, five sponsors, and over $12,000 in prizes.",
    href: "/advent/2025",
    linkText: "Advent of CTF 2025",
    image: { src: advent2025Announcement, alt: "The announcement graphic for Advent of CTF 2025" },
  },
];

/** The eight milestones the homepage shows, in two rows of four. */
export const homeHistory = history.filter((e) => !e.aboutOnly);
