import countriesChart from "~/../public/advent-of-ctf-2024/countries-geo-chart.png";

import { cyberstudentsLaunches } from "./2024-01-cyberstudents-launches";
import { serverOverhaul } from "./2024-02-server-overhaul";
import { unlvWebinar } from "./2024-03-unlv-webinar";
import { ctfStars } from "./2024-03-ctf-stars";
import { newStaff } from "./2024-04-new-staff";
import { dailyCtfWrapsUp } from "./2024-08-daily-ctf-wraps-up";
import { advent2024Announced } from "./2024-11-advent-2024-announced";
import { icsredSponsor } from "./2024-12-icsred-sponsor";
import { writeUpsOpen2024 } from "./2024-12-write-ups-open";
import { growthSessions } from "./2025-03-growth-sessions";
import { serverUpgrade } from "./2025-04-server-upgrade";
import { malwareRevTalk } from "./2025-06-malware-rev-talk";
import { frameworkMapping } from "./2025-07-framework-mapping";
import { laborDayChess } from "./2025-09-labor-day-chess";
import { dynamicScoring } from "./2025-11-dynamic-scoring";
import { advent2025Announced } from "./2025-11-advent-2025-announced";
import { imageSecurityPrize } from "./2025-12-image-security-prize";
import { christmasPrizes2025 } from "./2025-12-christmas-prizes";
import { writeUpWinners } from "./2026-01-write-up-winners";
import { bedwarsTournament } from "./2026-02-bedwars-tournament";
import type { Article } from "./types";

export type { Article, ArticleKind } from "./types";

/** The 2024 results article already lives under /advent; the newsroom lists it and links there. */
const results2024: Article = {
  slug: "advent-of-ctf-2024-results",
  date: "2025-05-18",
  kind: "Results",
  title: "Advent of CTF 2024 Results and Statistics",
  dek: "780 players from 85 countries took on 25 challenges. Here are the winners, the winning write-ups, and a look at who played and where they came from.",
  author: "Edward Z.",
  minutes: 8,
  image: { src: countriesChart, alt: "World map shaded by the number of Advent of CTF 2024 players in each country" },
  href: "/advent/2024/results",
};

/** Newest first. */
export const articles: Article[] = [
  bedwarsTournament,
  writeUpWinners,
  christmasPrizes2025,
  imageSecurityPrize,
  advent2025Announced,
  dynamicScoring,
  laborDayChess,
  frameworkMapping,
  malwareRevTalk,
  results2024,
  serverUpgrade,
  growthSessions,
  writeUpsOpen2024,
  icsredSponsor,
  advent2024Announced,
  dailyCtfWrapsUp,
  newStaff,
  ctfStars,
  unlvWebinar,
  serverOverhaul,
  cyberstudentsLaunches,
].sort((a, b) => b.date.localeCompare(a.date));

export const articleHref = (a: Article) => a.href ?? `/news/${a.slug}`;

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
