import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

import { SnowBand } from "~/app/_home/Advent";
import { AdventCalendar, CategoryLegend } from "~/app/_home/AdventCalendar";
import { loadAdventCalendar } from "~/app/_home/AdventData";
import { ScoringChart } from "~/app/_home/ScoringChart";
import { Sponsors } from "~/app/_home/Sponsors";
import { TextLink, Wide } from "~/app/_home/ui";
import { advent2024 } from "~/data/advent-2024";
import { advent2025, advent2025Href } from "~/data/advent-2025";
import { writeUpsFor } from "~/data/writeups";
import { adventYears, type AdventYear } from "~/data/advent";
import { sponsors2025 } from "~/data/sponsors";
import { site } from "~/data/site";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Advent of CTF · CyberStudents",
  description:
    "Advent of CTF is CyberStudents' month-long beginner capture the flag competition, held every December since 2024. Every challenge is still open to play.",
};

const POSTER: Record<number, { accent: string; ring: string; figures: { value: string; label: string }[] }> = {
  2025: {
    accent: "text-cyan-300",
    ring: "border-cyan-300/30 md:rotate-[-1deg]",
    figures: [
      { value: "24", label: "Challenges" },
      { value: "4", label: "Prize Divisions" },
      { value: "$12,000+", label: "In Prizes" },
      { value: "5", label: "Sponsors" },
    ],
  },
  2024: {
    accent: "text-amber-300",
    ring: "border-amber-300/30 md:rotate-[1deg]",
    figures: [
      { value: "25", label: "Challenges" },
      { value: "780", label: "Players" },
      { value: "85", label: "Countries" },
      { value: "$280", label: "In Prizes" },
    ],
  },
};

function Poster({ y }: { y: AdventYear }) {
  const p = POSTER[y.year]!;
  return (
    <article
      className={cn(
        "flex flex-col rounded-3xl border-2 bg-gray-900/70 p-6 shadow-2xl shadow-black/40 transition-transform duration-500 hover:rotate-0 sm:p-8",
        p.ring,
      )}
    >
      <h3 className="font-mono text-3xl font-bold text-white">
        advent of ctf <span className={cn("font-sans font-light", p.accent)}>{y.year}</span>
      </h3>
      <p className="mt-1 text-gray-400">{y.dates}</p>
      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
        {p.figures.map((f) => (
          <div key={f.label} className="flex flex-col">
            <dt className="order-2 text-sm text-gray-400">{f.label}</dt>
            <dd className={cn("order-1 text-4xl font-bold", p.accent)}>{f.value}</dd>
          </div>
        ))}
      </dl>
      {y.year === 2025 && (
        <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-xl bg-gray-800 px-4 py-4">
          {sponsors2025.map((s) => (
            <li key={s.name}>
              <Image src={s.logo} alt={s.name} className={cn("w-auto", s.className)} />
            </li>
          ))}
        </ul>
      )}
      {y.topStudent && (
        <p className="mt-8 text-gray-300">
          Top of the student division: <span className="font-semibold text-white">{y.topStudent}</span>
        </p>
      )}
      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-8">
        <Link
          href={y.links.home}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-950 hover:bg-white"
        >
          Event page
          <HiArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <TextLink href={y.links.challenges}>Challenges</TextLink>
          <TextLink href={y.links.leaderboard}>Leaderboard</TextLink>
          {y.links.results && <TextLink href={y.links.results}>Results</TextLink>}
          <TextLink href={y.ctftime}>CTFtime</TextLink>
        </span>
      </div>
    </article>
  );
}

export default async function AdventOverview() {
  const calendar2025 = await loadAdventCalendar("aoc2025", 2025);
  // The database has the real 2025 ids; without it, fall back to the public list in src/data.
  const items2025 = (
    calendar2025?.length
      ? calendar2025
      : advent2025.map((c) => ({
          day: c.day,
          title: c.title,
          category: c.category,
          author: c.author,
          href: advent2025Href(c),
          cancelled: c.cancelled,
        }))
  ).map((c) => ({ ...c, writeUps: c.cancelled ? 0 : writeUpsFor(2025, c.day, c.title).length }));
  const calendar2024 = advent2024.map((c) => ({
    day: c.day,
    title: c.title,
    category: c.category,
    points: c.points,
    author: c.author,
    href: c.writeUpHref,
    writeUps: writeUpsFor(2024, c.day, c.title).length,
  }));

  return (
    <main className="bg-gray-950 text-gray-200">
      <SnowBand>
        <Wide className="pt-16 pb-48 sm:pt-20 sm:pb-56">
          <h1 className="font-mono text-5xl font-bold tracking-tight text-white sm:text-6xl">advent of ctf</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
            Since 2024, we&rsquo;ve hosted a month-long capture the flag competition every December. A CTF is a set of
            security puzzles where each one hides a piece of text called a flag, and finding that flag shows
            you&rsquo;ve solved the puzzle. Ours is made for beginners, with a new challenge released each day from
            December 1st to 25th that gets a little harder as the month goes on.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-200">
            Both years are still open to play, so you can read every challenge, download its files, see who solved
            it, and read the write-ups without making an account. You can even check your flags to find out whether you
            got them right.
          </p>
        </Wide>
      </SnowBand>

      <section
        id="how-it-works"
        aria-labelledby="how-title"
        className="scroll-mt-20 bg-[linear-gradient(90deg,#dadbee_0%,#f3f7fe_100%)] text-slate-900"
      >
        <Wide className="grid gap-12 pt-4 pb-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="how-title" className="text-3xl font-bold text-slate-950 sm:text-4xl">
              How it works
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Flags are always in the format{" "}
                <code className="rounded bg-slate-900 px-1.5 py-0.5 font-mono text-base text-cyan-200">
                  {"csd{example_flag}"}
                </code>
                , and the challenges cover six categories: web exploitation, cryptography, forensics, binary exploitation,
                reverse engineering, and OSINT and miscellaneous challenges.
              </p>
              <p>
                Each challenge comes with two free hints, released 12 and 24 hours after it opens, and using them never
                costs you any points. The event also stays open until December 31st, which gives everyone time to catch
                up on anything they missed earlier in the month.
              </p>
              <p>
                In 2024, every challenge had a fixed point value. For 2025, we switched to dynamic scoring, where a
                challenge starts at 500 points and becomes worth a little less each time another player solves it, down
                to a minimum of 50.
              </p>
              <p>
                Once each event ends, players send in their write-ups, and the author of each challenge picks one to
                publish. You can read all of them in the{" "}
                <TextLink href={site.repos.adventWriteUps} tone="light">
                  Advent of CTF write-ups repository
                </TextLink>
                .
              </p>
            </div>
          </div>
          <div className="lg:pt-16">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <ScoringChart />
            </div>
          </div>
        </Wide>
      </section>

      <section id="by-year" aria-labelledby="by-year-title" className="scroll-mt-20 bg-[#050911]">
        <Wide className="py-20 sm:py-28">
          <h2 id="by-year-title" className="text-3xl font-bold text-white sm:text-4xl">
            Two Decembers
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
            {adventYears.map((y) => (
              <Poster key={y.year} y={y} />
            ))}
          </div>
        </Wide>
      </section>

      <Sponsors />

      <section
        id="calendars"
        aria-labelledby="calendars-title"
        className="scroll-mt-20 bg-[linear-gradient(90deg,#dadbee_0%,#f3f7fe_100%)] text-slate-900"
      >
        <Wide className="py-20 sm:py-24">
          <h2 id="calendars-title" className="text-3xl font-bold text-slate-950 sm:text-4xl">
            Every challenge, day by day
          </h2>
          <CategoryLegend className="mt-4" />

          {items2025.length > 0 && (
            <div id="challenges-2025" className="mt-12 scroll-mt-24">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="text-xl font-bold text-slate-950">December 2025</h3>
                <TextLink href="/advent/2025/challenges" tone="light" className="text-sm font-medium">
                  Open the 2025 challenges
                </TextLink>
              </div>
              <AdventCalendar
                className="mt-4"
                year={2025}
                items={items2025}
              />
            </div>
          )}

          <div id="challenges-2024" className="mt-12 scroll-mt-24">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="text-xl font-bold text-slate-950">December 2024</h3>
              <TextLink href="/advent/2024/challenges" tone="light" className="text-sm font-medium">
                Open the 2024 challenges
              </TextLink>
            </div>
            <AdventCalendar className="mt-4" year={2024} items={calendar2024} />
            <p className="mt-3 text-sm text-slate-500">
              Each day in 2024 opens its official write-up on GitHub. Players&rsquo; own write-ups are on our{" "}
              <TextLink href="/write-ups" tone="light">
                write-ups page
              </TextLink>
              .
            </p>
          </div>

        </Wide>
      </section>
    </main>
  );
}
