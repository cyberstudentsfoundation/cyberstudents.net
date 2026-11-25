// Advent of CTF 2024, copied from the table in the public write-ups repository:
// https://github.com/cyberstudentsfoundation/Advent-of-CTF/blob/main/README.md (read 2026-11-23).
// "Vip3r" in that table is Vipin's old handle and is shown as Vipin here.

export type Advent2024Challenge = {
  day: number;
  title: string;
  category: string;
  points: number;
  author: string;
  writeUpAuthor: string;
  writeUpHref: string;
};

const href = (day: number, dir: string) =>
  `https://github.com/cyberstudentsfoundation/Advent-of-CTF/blob/main/2024/${encodeURIComponent(
    `Day ${String(day).padStart(2, "0")} - ${dir}`,
  )}/README.md`;

const row = (
  day: number,
  title: string,
  category: string,
  points: number,
  author: string,
  writeUpAuthor: string,
  dir = title,
): Advent2024Challenge => ({ day, title, category, points, author, writeUpAuthor, writeUpHref: href(day, dir) });

export const advent2024: Advent2024Challenge[] = [
  row(1, "Logical Exclusivity", "Cryptography", 30, "GodderE2D", "zarnex"),
  row(2, "screaming", "Reverse engineering", 40, "Vipin", "zarnex"),
  row(3, "ElfTV", "Reverse engineering", 55, "Vipin", "zarnex"),
  row(4, "long gone", "Forensics", 75, "Vipin", "dharneesh5555"),
  row(5, "Rusty Lock", "Reverse engineering", 110, "Logix", "raul_26"),
  row(6, "Epochrypt", "Cryptography", 70, "Vipin", "zarnex"),
  row(7, "Apple Fanatic", "Web exploitation", 60, "GodderE2D", "dharneesh5555"),
  row(8, "vuln research", "OSINT", 45, "Vipin", "dharneesh5555"),
  row(9, "resa?", "Cryptography", 80, "Vipin", "zarnex", "resa"),
  row(10, "flag from wish", "Binary exploitation", 90, "Kolmus", "zarnex"),
  row(11, "Festive Encoding", "Cryptography", 55, "GodderE2D", "dharneesh5555"),
  row(12, "Letter To Santa", "Forensics", 85, "Logix", "zarnex"),
  row(13, "Disoriented Santa", "OSINT", 100, "GodderE2D", "dharneesh5555"),
  row(14, "angry elf", "Reverse engineering", 50, "Vipin", ".jstr_"),
  row(15, "JETS", "Web exploitation", 70, "GodderE2D", ".jstr_"),
  row(16, "Jingle Bell ROP", "Binary exploitation", 105, "Vipin", "elijah5399"),
  row(17, "Santa's Plane", "OSINT", 80, "Logix", ".jstr_"),
  row(18, "trng", "Reverse engineering", 100, "Kolmus", "raul_26"),
  row(19, "interns", "Cryptography", 150, "Vipin", "zarnex"),
  row(20, "Lost Santa", "OSINT", 80, "Logix", "raul_26"),
  row(21, "hpjl", "Binary exploitation", 125, "Kolmus", "Kolmus"),
  row(22, "K.U.N.A.L Consulting", "Web exploitation", 130, "GodderE2D", "GodderE2D"),
  row(23, "help", "Binary exploitation", 150, "GodderE2D", "Kolmus"),
  row(24, "ELForms", "Web exploitation", 130, "GodderE2D", "GodderE2D"),
  row(25, "House of Santa Claus", "Binary exploitation", 200, "Kolmus", "Kolmus"),
];
