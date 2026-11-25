// Advent of CTF 2025 challenges, from the production database restored on 2026-11-25 (the `Challenge` table, event
// aoc2025). Days come from each challenge's publish date in New York time.
//
// Day 22 was cancelled: its row is titled CANCELLED, has submissions turned off, and its description reads "This
// challenge has been cancelled due to internal issues." So 24 challenges were played.
//
// Authors: the database stores account names. qvipin is Vipin, thee2d is GodderE2D, a_person9852 is a_person, and
// flocto is flocto. Days 6, 16, and 25 (_avyra) and 8, 18, and 21 (7000x887143) have no author here, because neither
// account has a display name and nothing confirms which of the credited handles they are.
//
// Points are left out on purpose: 2025 used dynamic scoring, so a challenge's points still change as people solve it.

export type Advent2025Challenge = {
  day: number;
  title: string;
  category: string;
  author?: string;
  /** The challenge's id in the challenge browser. */
  id?: string;
  /** The day's challenge was pulled and never played. */
  cancelled?: boolean;
};

export const advent2025: Advent2025Challenge[] = [
  { day: 1, title: "The Mission Begins", category: "Cryptography", author: "Vipin", id: "cminusmjn0001k0mcrs3t9o0h" },
  { day: 2, title: "The First Strike", category: "Forensics", author: "a_person", id: "cmip8hw1c00wtk0eicwd6qrqj" },
  {
    day: 3,
    title: "Syndicate Infrastructure",
    category: "Miscellaneous",
    author: "Vipin",
    id: "cmiqof9jd0041k0jxtijki63j",
  },
  {
    day: 4,
    title: "The Elf's Wager",
    category: "Reverse engineering",
    author: "Vipin",
    id: "cmis5mnyc007hk0zuf06wr2us",
  },
  { day: 5, title: "Kramazon", category: "Web exploitation", author: "GodderE2D", id: "cmitna7sq003nk0r0cxm33tea" },
  { day: 6, title: "KDNU-3B", category: "Binary exploitation", id: "cmiv0xwkm0005k0k7xyvsdhju" },
  { day: 7, title: "Failed Exfil", category: "Binary exploitation", author: "Vipin", id: "cmiwcslma002mk0k8gutgsh25" },
  { day: 8, title: "Log Folly", category: "Cryptography", id: "cmixv9ssc006qk0mw0kypyy41" },
  { day: 9, title: "Time To Escalate", category: "Miscellaneous", author: "Vipin", id: "cmiz97cgq00abk0lv185eybb4" },
  {
    day: 10,
    title: "Jingle's Validator",
    category: "Reverse engineering",
    author: "flocto",
    id: "cmj0nkskq00gjk0m5amt2q5hd",
  },
  { day: 11, title: "Syndiware", category: "Forensics", author: "a_person", id: "cmj254nu800igk0k8gvoka84y" },
  { day: 12, title: "Re-Key-very", category: "Cryptography", author: "flocto", id: "cmj3n2szh00kyk0mre1hpysna" },
  { day: 13, title: "Holiday Routing", category: "Miscellaneous", author: "a_person", id: "cmj50pboh00ohk0m53vfqxav1" },
  {
    day: 14,
    title: "Multifactorial",
    category: "Web exploitation",
    author: "GodderE2D",
    id: "cmj6hkgmh000bk003l6p5xmrz",
  },
  { day: 15, title: "Image Security", category: "Forensics", author: "a_person", id: "cmj6k31n8001dk01624fpq9sf" },
  { day: 16, title: "FrostByte", category: "Binary exploitation", id: "cmj99r2nf0083k02uc3apn6ph" },
  {
    day: 17,
    title: "Guide My Drone Tonight",
    category: "Reverse engineering",
    author: "flocto",
    id: "cmjarc57o00bsk001ae6cmsms",
  },
  { day: 18, title: "Sealed for Delivery", category: "Cryptography", id: "cmjc61k2g00dgk0274wwi70sz" },
  { day: 19, title: "Trust Issues", category: "Miscellaneous", author: "Vipin", id: "cmjdjvvpm00fnk003iiwg9hk0" },
  { day: 20, title: "Custom Packaging", category: "Forensics", author: "Vipin", id: "cmjf00x2d00hyk02pew4v01yo" },
  { day: 21, title: "Escape Assist", category: "Cryptography", id: "cmjgfwudw00knk02pdd9fvkdf" },
  { day: 22, title: "Cancelled", category: "", cancelled: true },
  { day: 23, title: "Solwanna", category: "Miscellaneous", author: "flocto", id: "cmjjfvrso00otk0155khys7vp" },
  {
    day: 24,
    title: "Operation: Black Ice",
    category: "Reverse engineering",
    author: "Vipin",
    id: "cmjglsaht00jvk003qpohz2ig",
  },
  { day: 25, title: "The Final RCE", category: "Binary exploitation", id: "cmjm5xxhc002uk06nisuw8ek0" },
];

/** Where a 2025 challenge opens: its own page in the challenge browser when the id is known. */
export function advent2025Href(c: Pick<Advent2025Challenge, "id">) {
  return c.id ? `/advent/2025/challenges?challenge=${c.id}` : "/advent/2025/challenges";
}

/** How many 2025 challenges were actually played. */
export const advent2025Played = advent2025.filter((c) => !c.cancelled).length;
