// Community write-ups and videos of our challenges, found and opened one by one on 2026-11-23.
//
// Left out on purpose: anything published while that year's event was still open (each event closed Jan 1,
// 04:59 UTC), because featuring it would reward breaking the event rules. That drops Amr Eid's and
// @wireshark.pcap's Medium posts, the s1d15, CeeTaaFhal and themichaelyang repos and the MetaCTF compendium for 2025,
// and raul-dunca's repo, Nathan's Day 1, 4, 7 and 20 posts and CTF Journey for 2024. Code-only repos are left out too.
// Handles are as shown on each page. Award winners come from the official announcement.

import type { StaticImageData } from "next/image";

import shotKannrisha from "~/../public/writeups/kannrisha-final-rce.webp";
import shotAcni from "~/../public/writeups/acni-final-rce.webp";
import shotJ0xn from "~/../public/writeups/j0xn-final-rce.webp";
import shotCustomPackaging from "~/../public/writeups/nullsiryn-custom-packaging.webp";
import shotJinglesValidator from "~/../public/writeups/nullsiryn-jingles-validator.webp";
import shotMilrn from "~/../public/writeups/milrn-frostbyte.webp";
import shotJiegec from "~/../public/writeups/jiegec-2025.webp";
import shotSowat from "~/../public/writeups/sowatkheang-2025.webp";
import shotRusty from "~/../public/writeups/rusty-2024.webp";
import shotElijah from "~/../public/writeups/elijah-jingle-bell-rop.webp";
import shotNathan from "~/../public/writeups/nathan-vuln-research.webp";

export type WriteUpKind = "blog" | "github" | "video" | "pdf";

export type Award =
  | "Best Well-Written Solution"
  | "Best Technical Solution"
  | "Best Unintended Solution"
  | "Honorable Mention";

export type WriteUp = {
  year: 2024 | 2025;
  /** Advent days the piece covers. One day for single-challenge posts. */
  days: number[];
  /** Challenge title when the piece covers one challenge. */
  challenge?: string;
  title: string;
  author: string;
  url: string;
  kind: WriteUpKind;
  /** ISO date when the page shows one. */
  date?: string;
  award?: Award;
  youtubeId?: string;
  /** Short note in our words, for pieces that cover several challenges. */
  covers?: string;
  /** Screenshot of the page, taken 2026-11-23 (public/writeups). Videos use their YouTube thumbnail instead. */
  shot?: StaticImageData;
  /** CSS object-position for the screenshot, when the interesting part is not top-left. */
  shotPosition?: string;
};

const nullSiryn = (day: number, challenge: string, slug: string, title: string): WriteUp => ({
  year: 2025,
  days: [day],
  challenge,
  title,
  author: "Null Siryn",
  url: `https://ctfs.hashnode.dev/${slug}`,
  kind: "blog",
  date: "2026-01-01",
});

const almondForce = (day: number, challenge: string, id: string): WriteUp => ({
  year: 2025,
  days: [day],
  challenge,
  title: `advent of ctf 2025 (Day ${day}): ${challenge}`,
  author: "Almond Force",
  url: `https://www.youtube.com/watch?v=${id}`,
  kind: "video",
  date: "2026-01-01",
  youtubeId: id,
});

const nathan = (day: number, challenge: string, slug: string, date: string): WriteUp => ({
  year: 2024,
  days: [day],
  challenge,
  title: `Advent of CTF 2024 — Day ${day}: ${challenge}`,
  author: "Nathan",
  url: `https://medium.com/@nathanielpascuarijndorp/${slug}`,
  kind: "blog",
  date,
});

export const writeUps: WriteUp[] = [
  // Advent of CTF 2025 Write-Up Division
  {
    year: 2025,
    days: [25],
    challenge: "The Final RCE",
    title: "Advent of CTF 2025 - The Final RCE Writeup",
    author: "kannrisha",
    url: "https://drive.google.com/file/d/1lgZH5ciIt4LKitWGjA_MhbotpDbBPSXM/view",
    shot: shotKannrisha,
    kind: "pdf",
    date: "2026-01-06",
    award: "Best Well-Written Solution",
  },
  {
    year: 2025,
    days: [25],
    challenge: "The Final RCE",
    title: "Largebin heap attack in GNU Obstack: adventofCTF 2025",
    author: "acni",
    url: "https://www.acn1.xyz/blog/finalrce",
    shot: shotAcni,
    shotPosition: "72% 20%",
    kind: "blog",
    date: "2025-12-31",
    award: "Best Technical Solution",
  },
  {
    year: 2025,
    days: [25],
    challenge: "The Final RCE",
    title: "The Final RCE",
    author: "j0xn_d03",
    url: "https://github.com/Shyamak-Seth/advent-of-ctf-25-writeups/blob/main/the-final-rce/WRITEUP.md",
    shot: shotJ0xn,
    kind: "github",
    award: "Best Unintended Solution",
  },
  {
    ...nullSiryn(
      20,
      "Custom Packaging",
      "custom-packaging-ctf-writeup-decrypting-the-custom-kcf-container",
      "Custom Packaging CTF Writeup: Decrypting the Custom KCF Container",
    ),
    award: "Honorable Mention",
    shot: shotCustomPackaging,
  },

  // Advent of CTF 2025, videos
  almondForce(1, "The Mission Begins", "QEKHup6Ec8k"),
  almondForce(2, "The First Strike", "amtWgzWuEJI"),
  almondForce(3, "Syndicate Infrastructure", "2nu-9pC4HJI"),
  almondForce(4, "The Elf's Wager", "IYjI4r-nUyc"),
  almondForce(5, "Kramazon", "rRyTy80k30w"),
  almondForce(9, "Time To Escalate", "85ycnQPEzTY"),

  // Advent of CTF 2025, Null Siryn's series on Hashnode
  nullSiryn(1, "The Mission Begins", "the-mission-begins-cryptography-ctf-writeup", "The Mission Begins: Cryptography CTF Writeup"),
  nullSiryn(2, "The First Strike", "the-first-strike-ftp-forensics-ctf-writeup", "The First Strike: FTP Forensics CTF Writeup"),
  nullSiryn(
    3,
    "Syndicate Infrastructure",
    "syndicate-infrastructure-dns-enumeration-ctf-writeup",
    "Syndicate Infrastructure: DNS Enumeration CTF Writeup",
  ),
  nullSiryn(4, "The Elf's Wager", "the-elfs-wager-reverse-engineering-ctf-writeup", "The Elf's Wager: Reverse Engineering CTF Writeup"),
  nullSiryn(5, "Kramazon", "kramazon-ctf-writeup-cookie-forgery-and-idor-exploit", "Kramazon CTF Writeup: Cookie Forgery & IDOR Exploit"),
  nullSiryn(6, "KDNU-3B", "kdnu-3b-binary-exploitation-ctf-writeup", "KDNU-3B: Binary Exploitation CTF Writeup"),
  nullSiryn(
    7,
    "Failed Exfil",
    "failed-exfil-ctf-writeup-exploiting-format-strings-to-leak-stack-data",
    "Failed Exfil CTF Writeup: Exploiting Format Strings to Leak Stack Data",
  ),
  nullSiryn(
    8,
    "Log Folly",
    "log-folly-crypto-ctf-writeup-cracking-rotation-based-discrete-logs",
    "Log Folly Crypto CTF Writeup: Cracking Rotation Based Discrete Logs",
  ),
  nullSiryn(
    9,
    "Time To Escalate",
    "time-to-escalate-ctf-writeup-side-channel-timing-attack-exploit-in-python",
    "Time To Escalate CTF Writeup: Side-Channel Timing Attack Exploit in Python",
  ),
  {
    ...nullSiryn(
      10,
      "Jingle's Validator",
      "jingles-validator-ctf-writeup-vm-custom-isa-reverse-engineering",
      "Jingle's Validator CTF Writeup: VM Custom ISA Reverse Engineering",
    ),
    shot: shotJinglesValidator,
  },
  nullSiryn(
    11,
    "Syndiware",
    "syndiware-ctf-writeup-python-ransomware-and-memory-forensics",
    "Syndiware CTF Writeup: Python Ransomware & Memory Forensics",
  ),
  nullSiryn(
    12,
    "Re-Key-very",
    "re-key-very-ctf-writeup-exploiting-predictable-nonces-in-ecdsa",
    "Re-Key-Very CTF Writeup: Exploiting Predictable Nonces in ECDSA",
  ),
  nullSiryn(
    13,
    "Holiday Routing",
    "holiday-routing-ctf-writeup-master-cisco-network-hardening",
    "Holiday Routing CTF Writeup: Master Cisco Network Hardening",
  ),
  nullSiryn(
    14,
    "Multifactorial",
    "multifactorial-ctf-writeup-bypassing-mfa-via-webauthn-exploit",
    "Multifactorial CTF Writeup: Bypassing MFA via WebAuthn Exploit",
  ),
  nullSiryn(
    15,
    "Image Security",
    "image-security-ctf-writeup-windows-11-hardening-and-forensics",
    "Image Security CTF Writeup: Windows 11 Hardening & Forensics",
  ),
  nullSiryn(
    16,
    "FrostByte",
    "frostbyte-ctf-writeup-exploiting-procselfmem-and-got-overwrite",
    "FrostByte CTF Writeup: Exploiting /proc/self/mem & GOT Overwrite",
  ),
  nullSiryn(19, "Trust Issues", "trust-issues-ctf-writeup-aws-iam-privilege-escalation", "Trust Issues CTF Writeup: AWS IAM Privilege Escalation"),

  // Advent of CTF 2025, other players
  {
    year: 2025,
    days: [16],
    challenge: "FrostByte",
    title: "FrostByte",
    author: "milrn",
    url: "https://blog.milrn.dev/posts/frostbyte/",
    shot: shotMilrn,
    kind: "blog",
    date: "2026-02-16",
  },
  {
    year: 2025,
    days: Array.from({ length: 20 }, (_, i) => i + 1),
    title: "Advent of CTF 2025",
    author: "jiegec",
    url: "https://jia.je/ctf-writeups/2025-12-02-advent-of-ctf-2025/index.html",
    shot: shotJiegec,
    kind: "blog",
    date: "2026-01-01",
    covers: "Most of Days 1 to 20, one page each",
  },
  {
    year: 2025,
    days: [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 19],
    title: "advent_of_ctf_2025_writeup",
    author: "SowatKheang",
    url: "https://github.com/SowatKheang/advent_of_ctf_2025_writeup",
    shot: shotSowat,
    kind: "github",
    date: "2026-01-02",
    covers: "Eleven challenges, with solve scripts",
  },

  // Advent of CTF 2024
  {
    year: 2024,
    days: [],
    title: "Speed Hacking!! (PT. 1 Web Exploitation and Cryptography) -- Advent of CTF 2024",
    author: "Null Pointer Cyber Security",
    url: "https://www.youtube.com/watch?v=NObn_UDq8dY",
    kind: "video",
    date: "2025-01-05",
    youtubeId: "NObn_UDq8dY",
    covers: "Six web and crypto challenges",
  },
  {
    year: 2024,
    days: [],
    title: "Speed Hacking!! (PT. 2 Binary Exploitation and Reversing) -- Advent of CTF 2024",
    author: "Null Pointer Cyber Security",
    url: "https://www.youtube.com/watch?v=GCaMdB3n5BI",
    kind: "video",
    date: "2025-01-06",
    youtubeId: "GCaMdB3n5BI",
    covers: "Four pwn and reversing challenges",
  },
  {
    year: 2024,
    days: [1, 2, 3, 6, 7, 8, 9, 10, 11, 13, 14, 15, 17, 20, 22],
    title: "Advent of CTF 2024 Writeups",
    author: "Rusty",
    url: "https://rustybladez.medium.com/advent-of-ctf-2024-writeups-fa7fecbba37c",
    shot: shotRusty,
    kind: "blog",
    date: "2025-01-01",
    covers: "Fifteen challenges in one long post",
  },
  {
    year: 2024,
    days: [16],
    challenge: "Jingle Bell ROP",
    title: "Jingle Bell ROP (pwn)",
    author: "Elijah",
    url: "https://elijahchia.gitbook.io/ctf-blog/advent-of-ctf-2024/jingle-bell-rop-pwn",
    shot: shotElijah,
    kind: "blog",
  },
  {
    year: 2024,
    days: [23],
    challenge: "help",
    title: "help (pwn)",
    author: "Elijah",
    url: "https://elijahchia.gitbook.io/ctf-blog/advent-of-ctf-2024/help-pwn",
    kind: "blog",
  },
  { ...nathan(8, "vuln research", "advent-of-ctf-2024-day-8-vuln-research-4bb26b647eb3", "2025-01-03"), shot: shotNathan },
  nathan(10, "flag from wish", "advent-of-ctf-2024-day-10-flag-from-wish-41c1c2495954", "2025-01-03"),
  nathan(12, "Letter To Santa", "advent-of-ctf-2024-day-12-letter-to-santa-f9fa421537f7", "2025-01-04"),
  nathan(14, "angry elf", "advent-of-ctf-2024-day-14-angry-elf-82f2ecf88696", "2025-01-05"),
];

/**
 * The mixed row of videos and posts on the homepage, in this order so one channel's videos are spread out rather than
 * shown back to back. Every video is in it. Keys are URLs.
 */
export const featuredOrder = [
  "https://www.youtube.com/watch?v=QEKHup6Ec8k",
  "https://rustybladez.medium.com/advent-of-ctf-2024-writeups-fa7fecbba37c",
  "https://www.youtube.com/watch?v=NObn_UDq8dY",
  "https://blog.milrn.dev/posts/frostbyte/",
  "https://www.youtube.com/watch?v=2nu-9pC4HJI",
  "https://medium.com/@nathanielpascuarijndorp/advent-of-ctf-2024-day-8-vuln-research-4bb26b647eb3",
  "https://www.youtube.com/watch?v=IYjI4r-nUyc",
  "https://jia.je/ctf-writeups/2025-12-02-advent-of-ctf-2025/index.html",
  "https://www.youtube.com/watch?v=GCaMdB3n5BI",
  "https://elijahchia.gitbook.io/ctf-blog/advent-of-ctf-2024/jingle-bell-rop-pwn",
  "https://www.youtube.com/watch?v=amtWgzWuEJI",
  "https://ctfs.hashnode.dev/jingles-validator-ctf-writeup-vm-custom-isa-reverse-engineering",
  "https://www.youtube.com/watch?v=rRyTy80k30w",
  "https://github.com/SowatKheang/advent_of_ctf_2025_writeup",
  "https://www.youtube.com/watch?v=85ycnQPEzTY",
];

/** Honorable mention without a public link. */
export const unlinkedMentions = [{ year: 2025 as const, challenge: "FrostByte", author: "yugi200", award: "Honorable Mention" as const }];

export const siteOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/** Write-ups for one Advent challenge, by year and day or title. Single-challenge pieces first. */
export function writeUpsFor(year: number, day: number | undefined, title: string | undefined) {
  const t = title?.toLowerCase();
  return writeUps
    .filter(
      (w) =>
        w.year === year &&
        ((day !== undefined && w.days.includes(day)) || (t !== undefined && w.challenge?.toLowerCase() === t)),
    )
    .sort((a, b) => Number(!!a.covers) - Number(!!b.covers) || Number(!a.award) - Number(!b.award));
}
