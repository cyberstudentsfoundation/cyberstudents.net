import type { StaticImageData } from "next/image";

import talkVirtualMachines from "~/../public/community/talk-virtual-machines.webp";
import talkMalwareRev from "~/../public/community/talk-malware-rev.webp";
import talkKickoff from "~/../public/community/talk-kickoff.webp";
import talkAssembly from "~/../public/community/talk-rootkit-assembly.webp";
import talkInstructions from "~/../public/community/talk-rootkit-instructions.webp";
import talkDemo from "~/../public/community/talk-rootkit-demo.webp";
import talkStdlib from "~/../public/community/talk-rootkit-stdlib.webp";
import talkWhatIs from "~/../public/community/talk-rootkit-what-is.webp";
import talkIdaPoster from "~/../public/community/talk-rootkit-ida-poster.webp";
import minecraftTreehouse from "~/../public/community/minecraft-treehouse.webp";
import minecraftBase from "~/../public/community/minecraft-base.webp";
import bedwarsGreenBridges from "~/../public/community/bedwars-green-bridges.webp";
import enderDragonPoster from "~/../public/community/ender-dragon-poster.webp";
import fortniteVictory from "~/../public/community/fortnite-victory.webp";

export type CommunityMedia =
  | { kind: "image"; image: StaticImageData; alt: string; caption: string }
  | { kind: "video"; src: string; poster: StaticImageData; alt: string; caption: string };

// Talks only. Stills and the clip are cropped from our own recordings, including the 2025-06-07 stage talk; chat
// columns and member lists are cropped out.
export const talkMedia: CommunityMedia[] = [
  {
    kind: "image",
    image: talkMalwareRev,
    alt: "Title slide reading Cyberstudents Intro to Malware Rev, by Dudcom at SPL",
    caption: "Intro to Malware Reverse Engineering, by Dudcom",
  },
  {
    kind: "image",
    image: talkWhatIs,
    alt: "Slide titled What is a rootkit, listing kernel-level hooking techniques",
    caption: "What a rootkit is and how it hides",
  },
  {
    kind: "image",
    image: talkAssembly,
    alt: "Slide titled Assembly, showing x86-64 registers next to a register diagram",
    caption: "x86-64 registers, from the basics up",
  },
  {
    kind: "video",
    src: "/community/talk-rootkit-ida.mp4",
    poster: talkIdaPoster,
    alt: "Reverse engineering a rootkit sample live in IDA during the talk",
    caption: "Reversing a rootkit sample live in IDA",
  },
  {
    kind: "image",
    image: talkVirtualMachines,
    alt: "Title slide reading Mastering Cybersecurity: An Introduction to Virtual Machines, Kali Linux, and Essential Tools, hosted by Vipin B",
    caption: "Webinar on virtual machines and Kali Linux, by Vipin",
  },
  {
    kind: "image",
    image: talkDemo,
    alt: "A terminal running a C function pointer demo over a slide about C pointers",
    caption: "A live C demo on function pointers",
  },
  {
    kind: "image",
    image: talkInstructions,
    alt: "Slide listing common x86 instructions for data movement, arithmetic, logic and control flow",
    caption: "Common x86 instructions",
  },
  {
    kind: "image",
    image: talkStdlib,
    alt: "Slide titled Standard Funcs, listing C standard library functions",
    caption: "The C standard library, for reversers",
  },
  {
    kind: "image",
    image: talkKickoff,
    alt: "Title slide reading CyberStudents CTF 2025, Meeting 1: Challenge Development Kickoff, with attendees below",
    caption: "Challenge development kickoff",
  },
];

/** Game night screenshots, shown small in the corners of the talks section. Never the subject of a section. */
export const flair = {
  treehouse: { image: minecraftTreehouse, alt: "A treehouse on the CyberStudents Minecraft server" },
  base: { image: minecraftBase, alt: "Inside a shared base on the CyberStudents Minecraft server" },
  bedwars: { image: bedwarsGreenBridges, alt: "Green and red bridges between islands during our Bed Wars tournament" },
  fortnite: { image: fortniteVictory, alt: "A Fortnite Victory Royale from a squad game with GodderE2D and Vipin" },
  dragon: {
    src: "/community/ender-dragon.mp4",
    poster: enderDragonPoster,
    alt: "The Ender Dragon dissolving into light after members beat it together",
  },
};
