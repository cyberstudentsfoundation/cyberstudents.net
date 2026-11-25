import type { Metadata } from "next";
import Image from "next/image";

import background from "~/../public/background.png";
import { loadAdventCalendar } from "~/app/_home/AdventData";
import { TextLink, Wide } from "~/app/_home/ui";
import { advent2024 } from "~/data/advent-2024";
import { advent2025, advent2025Href } from "~/data/advent-2025";
import { writeUpsFor } from "~/data/writeups";
import { dailyCtfChallenges } from "~/data/daily-ctf";
import { site } from "~/data/site";
import { ChallengeBrowser, type ArchiveItem } from "./browser";

export const metadata: Metadata = {
  title: "Challenge archive · CyberStudents",
  description:
    "Every capture the flag challenge CyberStudents has written: 50 from Advent of CTF and 55 from Daily CTF, with write-ups.",
};

/** 1 to 5, by where a challenge's fixed points sit between the lowest and highest in its event. */
function withDifficulty(items: ArchiveItem[]): ArchiveItem[] {
  const pts = items.map((i) => i.points).filter((p): p is number => p !== undefined);
  const lo = Math.min(...pts);
  const hi = Math.max(...pts);
  return items.map((i) =>
    i.points === undefined || hi === lo ? i : { ...i, difficulty: 1 + Math.round((4 * (i.points - lo)) / (hi - lo)) },
  );
}

export default async function ChallengesPage() {
  const calendar2025 = await loadAdventCalendar("aoc2025", 2025);

  const groups: { id: string; title: string; note: string; items: ArchiveItem[] }[] = [];

  // 2025 from the database when it is up (real ids and points), otherwise the public list in src/data.
  const items2025: ArchiveItem[] = calendar2025?.length
    ? calendar2025
        .filter((c) => !c.cancelled)
        .map((c) => ({
          key: `2025-${c.day}`,
          title: c.title,
          category: c.category,
          source: "Advent 2025",
          place: `Day ${c.day}`,
          author: c.author,
          points: c.points,
          href: c.href,
          communityWriteUps: writeUpsFor(2025, c.day, c.title).length,
        }))
    : advent2025
        .filter((c) => !c.cancelled)
        .map((c) => ({
          key: `2025-${c.day}`,
          title: c.title,
          category: c.category,
          source: "Advent 2025",
          place: `Day ${c.day}`,
          author: c.author,
          href: advent2025Href(c),
          communityWriteUps: writeUpsFor(2025, c.day, c.title).length,
        }));
  groups.push({
    id: "advent-2025",
    title: "Advent of CTF 2025",
    note: "These open in our challenge browser, where you can check your flag",
    items: items2025,
  });

  groups.push({
    id: "advent-2024",
    title: "Advent of CTF 2024",
    note: "These open their official write-ups on GitHub",
    items: withDifficulty(
      advent2024.map((c) => ({
        key: `2024-${c.day}`,
        title: c.title,
        category: c.category,
        source: "Advent 2024",
        place: `Day ${c.day}`,
        author: c.author,
        points: c.points,
        href: c.writeUpHref,
        writeUp: { author: c.writeUpAuthor, href: c.writeUpHref },
        communityWriteUps: writeUpsFor(2024, c.day, c.title).length,
      })),
    ),
  });

  groups.push({
    id: "daily-ctf",
    title: "Daily CTF",
    note: "Six rounds from January to August 2024, each opening on GitHub",
    items: withDifficulty(
      dailyCtfChallenges.map((c) => ({
        key: `d-${c.round}-${c.n}`,
        title: c.name,
        category: c.category,
        source: "Daily CTF",
        place: `Round ${c.round}`,
        author: c.author,
        points: c.points,
        href: c.href,
        writeUp: { author: "official", href: c.href },
      })),
    ),
  });

  return (
    <main className="bg-gray-950 text-gray-200">
      <section className="relative overflow-hidden border-b border-white/10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-25">
          <Image src={background} alt="" fill priority className="object-cover" />
        </div>
        <Wide className="relative py-14 sm:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Challenge archive</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-200">
            Here&rsquo;s every challenge we&rsquo;ve written so far, with 50 from Advent of CTF and 55 from our Daily
            CTF. The Advent of CTF challenges open right here on our site, where you can download their files, read the
            hints and write-ups, and check your flag without needing an account. Daily CTF challenges and their official
            write-ups live on <TextLink href={site.repos.dailyCtfArchive}>GitHub</TextLink>.
          </p>
          <p className="mt-3 max-w-3xl text-gray-400">
            Players have published plenty of their own write-ups and videos, too, and you can find all of them on our{" "}
            <TextLink href="/write-ups">write-ups page</TextLink>.
          </p>
        </Wide>
      </section>
      <Wide className="py-12 sm:py-16">
        <ChallengeBrowser groups={groups} />
      </Wide>
    </main>
  );
}
