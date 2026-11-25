// The six challenge categories, with the colours and icons first used on the Advent of CTF 2025 page.
// Every page outside src/app/advent/** reads category styling from here.

import type { IconType } from "react-icons";
import { BiNetworkChart } from "react-icons/bi";
import { CgBrowser } from "react-icons/cg";
import { FaGear, FaMagnifyingGlassChart, FaTableCellsRowLock } from "react-icons/fa6";
import { LuBinary } from "react-icons/lu";

import { frameworkCategories, type FrameworkCategory } from "./frameworks";

export type CategoryKey = "web" | "rev" | "pwn" | "forensics" | "crypto" | "misc";

export type CategoryStyle = {
  key: CategoryKey;
  title: string;
  short: string;
  icon: IconType;
  /** Solid dot or bar. */
  dot: string;
  /** Left edge of a card. */
  edge: string;
  /** Colored strip drawn with a `before:` pseudo-element. */
  strip: string;
  /** Top edge of a card. */
  topEdge: string;
  /** Tile border on dark grounds. */
  border: string;
  /** Icon tile on dark grounds. */
  iconTile: string;
  /** Chip on dark grounds. */
  chipDark: string;
  /** Chip on light grounds. */
  chipLight: string;
  /** Text colour on light grounds. */
  textLight: string;
  /** Text colour on dark grounds. */
  textDark: string;
  framework: FrameworkCategory;
};

const fw = (name: string) => frameworkCategories.find((c) => c.name === name)!;

export const categories: Record<CategoryKey, CategoryStyle> = {
  web: {
    key: "web",
    title: "Web Exploitation",
    short: "Web",
    icon: CgBrowser,
    dot: "bg-blue-500",
    strip: "before:bg-blue-500",
    edge: "border-l-blue-500",
    topEdge: "border-t-blue-500",
    border: "border-blue-500/35",
    iconTile: "bg-blue-500/10 text-blue-500",
    chipDark: "border-blue-500/25 bg-blue-500/10 text-blue-400",
    chipLight: "border-blue-200 bg-blue-50 text-blue-700",
    textLight: "text-blue-700",
    textDark: "text-blue-400",
    framework: fw("Web exploitation"),
  },
  rev: {
    key: "rev",
    title: "Reverse Engineering",
    short: "Reversing",
    icon: FaGear,
    dot: "bg-pink-500",
    strip: "before:bg-pink-500",
    edge: "border-l-pink-500",
    topEdge: "border-t-pink-500",
    border: "border-pink-500/35",
    iconTile: "bg-pink-500/10 text-pink-500",
    chipDark: "border-pink-500/25 bg-pink-500/10 text-pink-400",
    chipLight: "border-pink-200 bg-pink-50 text-pink-700",
    textLight: "text-pink-700",
    textDark: "text-pink-400",
    framework: fw("Reverse engineering"),
  },
  pwn: {
    key: "pwn",
    title: "Binary Exploitation",
    short: "Pwn",
    icon: LuBinary,
    dot: "bg-red-500",
    strip: "before:bg-red-500",
    edge: "border-l-red-500",
    topEdge: "border-t-red-500",
    border: "border-red-500/35",
    iconTile: "bg-red-500/10 text-red-500",
    chipDark: "border-red-500/25 bg-red-500/10 text-red-400",
    chipLight: "border-red-200 bg-red-50 text-red-700",
    textLight: "text-red-700",
    textDark: "text-red-400",
    framework: fw("Binary exploitation"),
  },
  forensics: {
    key: "forensics",
    title: "Forensics",
    short: "Forensics",
    icon: FaMagnifyingGlassChart,
    dot: "bg-yellow-500",
    strip: "before:bg-yellow-500",
    edge: "border-l-yellow-500",
    topEdge: "border-t-yellow-500",
    border: "border-yellow-500/35",
    iconTile: "bg-yellow-500/10 text-yellow-500",
    chipDark: "border-yellow-500/25 bg-yellow-500/10 text-yellow-400",
    chipLight: "border-yellow-300 bg-yellow-50 text-yellow-800",
    textLight: "text-yellow-800",
    textDark: "text-yellow-400",
    framework: fw("Forensics"),
  },
  crypto: {
    key: "crypto",
    title: "Cryptography",
    short: "Crypto",
    icon: FaTableCellsRowLock,
    dot: "bg-lime-500",
    strip: "before:bg-lime-500",
    edge: "border-l-lime-500",
    topEdge: "border-t-lime-500",
    border: "border-lime-500/35",
    iconTile: "bg-lime-500/10 text-lime-500",
    chipDark: "border-lime-500/25 bg-lime-500/10 text-lime-400",
    chipLight: "border-lime-300 bg-lime-50 text-lime-800",
    textLight: "text-lime-800",
    textDark: "text-lime-400",
    framework: fw("Cryptography"),
  },
  misc: {
    key: "misc",
    title: "Miscellaneous",
    short: "Misc",
    icon: BiNetworkChart,
    dot: "bg-purple-500",
    strip: "before:bg-purple-500",
    edge: "border-l-purple-500",
    topEdge: "border-t-purple-500",
    border: "border-purple-500/35",
    iconTile: "bg-purple-500/10 text-purple-500",
    chipDark: "border-purple-500/25 bg-purple-500/10 text-purple-400",
    chipLight: "border-purple-200 bg-purple-50 text-purple-700",
    textLight: "text-purple-700",
    textDark: "text-purple-400",
    framework: fw("Miscellaneous"),
  },
};

export const categoryOrder: CategoryKey[] = ["web", "rev", "pwn", "forensics", "crypto", "misc"];

/**
 * Maps a category label as written in a source (the Advent README, the Daily CTF archive, the database) to one of the
 * six categories. Mixed labels such as "WebEx/OSINT" go to the first match. OSINT, password cracking, steganography
 * and programming challenges count as Miscellaneous, as they did on the Advent of CTF 2025 page.
 */
export function categoryKey(raw: string): CategoryKey {
  const s = raw.toLowerCase();
  if (s.includes("web")) return "web";
  if (s.includes("reverse")) return "rev";
  if (s.includes("pwn") || s.includes("binary")) return "pwn";
  if (s.includes("forensic")) return "forensics";
  if (s.includes("crypt")) return "crypto";
  return "misc";
}

export const categoryOf = (raw: string) => categories[categoryKey(raw)];
