export type AdventYear = {
  year: 2024 | 2025;
  event: "aoc2024" | "aoc2025";
  dates: string;
  challenges: number;
  players?: string;
  countries?: string;
  prizes: string;
  sponsors?: string;
  topStudent?: string;
  ctftime: string;
  links: { home: string; challenges: string; leaderboard: string; results?: string };
};

// Values left undefined are not confirmed yet. Undefined cells render blank,
// and a row that is blank for every year is not rendered.
export const adventYears: AdventYear[] = [
  {
    year: 2025,
    event: "aoc2025",
    dates: "Dec 1 to 31, 2025",
    // 25 were planned; day 22 was cancelled (see src/data/advent-2025.ts).
    challenges: 24,
    // More than 1,500 players, and more countries than 2024's 85.
    players: "1,500+",
    countries: "85+",
    prizes: "Over $12,000 in cash and certification vouchers",
    sponsors: "OtterSec, Veria Labs, CTFGuide, APIsec University, gen.xyz",
    ctftime: "https://ctftime.org/event/3022",
    links: { home: "/advent/2025", challenges: "/advent/2025/challenges", leaderboard: "/advent/2025/leaderboard" },
  },
  {
    year: 2024,
    event: "aoc2024",
    dates: "Dec 1 to 31, 2024",
    challenges: 25,
    players: "780",
    countries: "85",
    prizes: "$280",
    topStudent: "zarnex__ (United States)",
    ctftime: "https://ctftime.org/event/2600",
    links: {
      home: "/advent/2024",
      challenges: "/advent/2024/challenges",
      leaderboard: "/advent/2024/leaderboard",
      results: "/advent/2024/results",
    },
  },
];
