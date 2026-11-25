import type { StaticImageData } from "next/image";

import imgHouseOfSantaClaus from "~/../public/curated-challenges/house-of-santa-claus.png";
import imgELForms from "~/../public/curated-challenges/elforms.png";
import imgHelp from "~/../public/curated-challenges/help.png";
import imgTrng from "~/../public/curated-challenges/trng.png";
import imgHpjl from "~/../public/curated-challenges/hpjl.jpg";
import imgKUNALConsulting from "~/../public/curated-challenges/kunal-consulting.png";
import imgDisorientedSanta from "~/../public/curated-challenges/disoriented-santa.png";
import imgTurningComplete from "~/../public/curated-challenges/turning-complete.png";
import imgRustyLock from "~/../public/curated-challenges/rusty-lock.png";
import imgLongGone from "~/../public/curated-challenges/long-gone.png";
import imgLogicalExclusivity from "~/../public/curated-challenges/logical-exclusivity.png";

export type SelectedChallenge = {
  title: string;
  /** Where it ran, for example "Advent of CTF 2024, Day 25". */
  event: string;
  category: string;
  author: string;
  points?: number;
  summary: string;
  /** Longer description, shown in the enlarged view. Written for the original carousel. */
  description: string;
  image: StaticImageData;
  alt: string;
  writeUpHref: string;
};

const advent2024 = (dir: string) =>
  `https://github.com/cyberstudentsfoundation/Advent-of-CTF/blob/main/2024/${encodeURIComponent(dir)}/README.md`;

// Ordered hardest first, as in the original carousel. Points and authors match the platform database and the 2024
// results page.
export const selectedChallenges: SelectedChallenge[] = [
  {
    title: "House of Santa Claus",
    event: "Advent of CTF 2024, Day 25",
    category: "Binary exploitation",
    author: "Kolmus",
    points: 200,
    summary: "A heap challenge where a one-byte overflow in a scanf call becomes a poison null byte attack.",
    description:
      "This advanced challenge has a binary with an off-by-null vulnerability due to incorrect bounds handling in a scanf call. Combined with the lack of zeroing for new allocations, this enables a poison null byte attack to create overlapping chunks. Through manipulating heap metadata, the player can gain arbitrary read/write on 16-bit aligned addresses.",
    image: imgHouseOfSantaClaus,
    alt: "Terminal output of the solution payload for House of Santa Claus",
    writeUpHref: advent2024("Day 25 - House of Santa Claus"),
  },
  {
    title: "ELForms",
    event: "Advent of CTF 2024, Day 24",
    category: "Web exploitation",
    author: "GodderE2D",
    points: 130,
    summary: "Cross-site request forgery through an admin bot, getting past weak CSRF protections.",
    description:
      "This challenge has a cross-site request forgery (CSRF) vulnerability in a web application which players had to exploit through the admin bot, while bypassing weak CSRF protections. It requires players to fully understand the application, along with various HTML and HTTP functionalities.",
    image: imgELForms,
    alt: "Postman request used to solve ELForms",
    writeUpHref: advent2024("Day 24 - ELForms"),
  },
  {
    title: "help",
    event: "Advent of CTF 2024, Day 23",
    category: "Binary exploitation",
    author: "Kolmus",
    points: 150,
    summary: "Heap overflows and fake chunks, ending in a hijack of libc's exit handlers.",
    description:
      "This advanced heap exploitation challenge focuses on exploiting heap overflows and arbitrary read/write capabilities to gain code execution. It teaches how to manipulate heap metadata to leak memory addresses, craft fake chunks for arbitrary memory access, and ultimately hijack control flow through libc's exit handlers.",
    image: imgHelp,
    alt: "GDB disassembly used to solve help",
    writeUpHref: advent2024("Day 23 - help"),
  },
  {
    title: "K.U.N.A.L Consulting",
    event: "Advent of CTF 2024, Day 22",
    category: "Web exploitation",
    author: "GodderE2D",
    points: 115,
    summary: "Bypassing a login with NoSQL injection by binary searching the password with regex patterns.",
    description:
      "This challenge has a NoSQL injection vulnerability that allows attackers to bypass authentication by using binary search with regex patterns.",
    image: imgKUNALConsulting,
    alt: "Burp Suite request used to solve K.U.N.A.L Consulting",
    writeUpHref: advent2024("Day 22 - K.U.N.A.L Consulting"),
  },
  {
    title: "hpjl",
    event: "Advent of CTF 2024, Day 21",
    category: "Binary exploitation",
    author: "Kolmus",
    points: 125,
    summary: "Shellcode under tight constraints, reaching a syscall in libc with a ret-based trick.",
    description:
      "This advanced challenge introduces key concepts in binary exploitation and shellcode execution under tight constraints. It requires creatively leveraging existing register values and memory contents, redirecting execution to a syscall instruction within libc using a ret-based ROP-like strategy.",
    image: imgHpjl,
    alt: "GDB disassembly used to solve hpjl",
    writeUpHref: advent2024("Day 21 - hpjl"),
  },
  {
    title: "trng",
    event: "Advent of CTF 2024, Day 18",
    category: "Reverse engineering",
    author: "Kolmus",
    points: 120,
    summary: "Reversing a binary's pseudo-random number generator and undoing its XOR-shift operations.",
    description:
      "This challenge requires players to reverse engineer a binary that includes a pseudo-random number generator (PRNG) function and reverse XOR shift operations.",
    image: imgTrng,
    alt: "Binary Ninja decompilation of trng",
    writeUpHref: advent2024("Day 18 - trng"),
  },
  {
    title: "Disoriented Santa",
    event: "Advent of CTF 2024, Day 13",
    category: "OSINT",
    author: "GodderE2D",
    points: 100,
    summary: "Finding a place from a set of clues with OpenStreetMap data and Overpass Turbo queries.",
    description:
      "This challenge focuses on using open-source maps and metadata like OpenStreetMap with tools such as Overpass Turbo to locate a place in the world given a set of clues.",
    image: imgDisorientedSanta,
    alt: "Overpass Turbo query results on a map",
    writeUpHref: advent2024("Day 13 - Disoriented Santa"),
  },
  {
    title: "Turning Complete",
    event: "Daily CTF, Round 5",
    category: "Cryptography",
    author: "Logix",
    summary: "Brute-forcing the rotor order and start positions of an Enigma machine from a known crib.",
    description:
      "This challenge requires players to brute-force an Enigma ciphertext with a known crib, simplified by having no plugboard and fixed settings. Only rotor order and start positions need to be tested.",
    image: imgTurningComplete,
    alt: "Graph of the Enigma brute-force search",
    writeUpHref:
      "https://github.com/cyberstudentsfoundation/csd-ctf/blob/main/rounds/5/Turning%20Complete/challenge.md",
  },
  {
    title: "Rusty Lock",
    event: "Advent of CTF 2024, Day 5",
    category: "Reverse engineering",
    author: "Logix",
    points: 110,
    summary: "A crackme written in Rust: reverse the password check to get in.",
    description:
      "This challenge is a typical crackme challenge written in Rust that requires players to reverse engineer a password check function.",
    image: imgRustyLock,
    alt: "Binary Ninja decompilation of Rusty Lock",
    writeUpHref: advent2024("Day 05 - Rusty Lock"),
  },
  {
    title: "long gone",
    event: "Advent of CTF 2024, Day 4",
    category: "Forensics",
    author: "Vipin",
    points: 75,
    summary: "Recovering deleted files from a Linux disk image with Autopsy.",
    description:
      "This challenge introduces the basics of forensic investigation from a Linux disk image using Autopsy, and uses various tools to analyze file systems and recover deleted files.",
    image: imgLongGone,
    alt: "Autopsy showing the contents of a Linux disk image",
    writeUpHref: advent2024("Day 04 - long gone"),
  },
  {
    title: "Logical Exclusivity",
    event: "Advent of CTF 2024, Day 1",
    category: "Cryptography",
    author: "GodderE2D",
    points: 30,
    summary: "A Caesar cipher and XOR combined into one simple encoding scheme.",
    description:
      "This challenge introduces the concepts of Caesar ciphers and XOR operations by combining the two techniques to create a simple encoding scheme.",
    image: imgLogicalExclusivity,
    alt: "CyberChef recipe used to solve Logical Exclusivity",
    writeUpHref: advent2024("Day 01 - Logical Exclusivity"),
  },
];
