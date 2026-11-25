import type { StaticImageData } from "next/image";

import talkVirtualMachines from "~/../public/community/talk-virtual-machines.webp";
import talkMalwareRev from "~/../public/community/talk-malware-rev.webp";

export type Talk = {
  /** ISO date, only when known. */
  date?: string;
  title: string;
  speaker: string;
  affiliation?: string;
  kind: "Webinar" | "Talk";
  image: StaticImageData;
  topics: string[];
};

// Titles are as written on the speakers' own title slides. Dates come from the recordings' file names
// (2024-03-24 for the webinar; 2025-06-07 20:39 for Dudcom's stage talk). Add more sessions as recordings come in.
export const talks: Talk[] = [
  {
    date: "2024-03-24",
    title: "Mastering Cybersecurity: An Introduction to Virtual Machines, Kali Linux, and Essential Tools",
    speaker: "Vipin",
    kind: "Webinar",
    image: talkVirtualMachines,
    topics: ["Virtual machines", "Kali Linux", "Tooling"],
  },
  {
    date: "2025-06-07",
    title: "Intro to Malware Reverse Engineering",
    speaker: "Dudcom",
    affiliation: "Squid Proxy Lovers",
    kind: "Webinar",
    image: talkMalwareRev,
    topics: ["x86 assembly", "C and pointers", "Rootkits", "IDA"],
  },
];
