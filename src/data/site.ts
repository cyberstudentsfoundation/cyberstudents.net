export const site = {
  name: "CyberStudents",
  /** The public address, used for absolute URLs (social cards, sitemap, RSS). */
  url: "https://cyberstudents.net",
  founded: "2021-12-02",
  email: "admin@cyberstudents.net",
  // 802-9237 spells 80-CYBER on a phone keypad (C=2, Y=9, B=2, E=3, R=7).
  phone: { display: "+1 (678) 802-9237", vanity: "+1 (678) 80-CYBER", href: "tel:+16788029237" },
  discord: "https://discord.com/invite/cyberstudents-916144903686336513",
  github: "https://github.com/cyberstudentsfoundation",
  ctftime: "https://ctftime.org/team/365239",
  repos: {
    adventWriteUps: "https://github.com/cyberstudentsfoundation/Advent-of-CTF",
    dailyCtfArchive: "https://github.com/cyberstudentsfoundation/csd-ctf",
    dailyCtfBot: "https://github.com/cyberstudentsfoundation/cyberstudents-ctf",
    website: "https://github.com/cyberstudentsfoundation/csd-web",
  },
};

/** Facts shown on the homepage. A row whose value is undefined is not rendered. */
export const stats: {
  asOf?: string;
  rows: { label: string; value?: string }[];
} = {
  asOf: "November 2026",
  rows: [
    { label: "Founded", value: "December 2, 2021" },
    { label: "Discord members", value: "5,200+" },
    { label: "In high school or college", value: "2,200+" },
    { label: "Countries", value: "130+" },
    { label: "Challenges written", value: "105" },
  ],
};
