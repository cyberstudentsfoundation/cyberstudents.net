import type { Metadata } from "next";
import { HiExternalLink } from "react-icons/hi";

import { AwardCard, KIND, MediaCard, NotebookPaper } from "~/app/_home/WriteUps";
import { TextLink, Wide } from "~/app/_home/ui";
import { advent2024 } from "~/data/advent-2024";
import { advent2025 } from "~/data/advent-2025";
import { categoryOf } from "~/data/categories";
import { site } from "~/data/site";
import { featuredOrder, unlinkedMentions, writeUps, writeUpsFor, type WriteUp } from "~/data/writeups";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Write-ups · CyberStudents",
  description: "Write-ups and videos that players have published about our Advent of CTF challenges, sorted by challenge.",
};

const YEARS = [
  {
    year: 2025 as const,
    challenges: advent2025.filter((c) => !c.cancelled).map((c) => ({ day: c.day, title: c.title, category: c.category })),
  },
  { year: 2024 as const, challenges: advent2024.map((c) => ({ day: c.day, title: c.title, category: c.category })) },
];

function AuthorPill({ w }: { w: WriteUp }) {
  const Icon = KIND[w.kind].icon;
  return (
    <a
      href={w.url}
      target="_blank"
      rel="noopener noreferrer"
      title={w.title}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm transition-colors",
        w.award
          ? "border-amber-300/40 bg-amber-300/10 text-amber-100 hover:bg-amber-300/20"
          : "border-white/10 bg-white/[0.04] text-gray-200 hover:border-white/25 hover:bg-white/[0.08]",
      )}
    >
      <Icon className={cn("size-3.5 shrink-0", w.kind === "video" ? "text-red-400" : "text-gray-400")} aria-hidden="true" />
      {w.author}
      {w.covers && <span className="text-xs text-gray-500">(several days)</span>}
    </a>
  );
}

export default function WriteUpsPage() {
  const authors = new Set(writeUps.map((w) => w.author)).size;

  return (
    <main className="bg-gray-950 text-gray-200">
      <section className="relative overflow-hidden bg-[#f6f1e6] text-stone-900">
        <NotebookPaper />
        <Wide className="relative py-16 sm:py-24">
          {/* On the 32px grid of the ruled paper, like the homepage section (see NotebookPaper). */}
          <h1 className="relative top-[3px] font-serif text-5xl leading-16 sm:top-px sm:text-6xl">Write-ups</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-stone-700">
            Here&rsquo;s every write-up and video about our challenges that we know of, sorted by challenge. They&rsquo;re
            all written by players and published on their own blogs, GitHub pages, and channels, so a big thank you to
            everyone who took the time to share how they solved things. Most of them include the flag, so you might want
            to try the challenge first!
          </p>
          <p className="mt-8 max-w-3xl leading-8 text-stone-600">
            The write-ups each challenge author picked for 2024 are collected in our{" "}
            <TextLink href={site.repos.adventWriteUps} tone="light">
              Advent of CTF write-ups repository
            </TextLink>
            . If you&rsquo;ve written one that we&rsquo;re missing, send it over to{" "}
            <TextLink href={`mailto:${site.email}`} tone="light">
              {site.email}
            </TextLink>{" "}
            and we&rsquo;ll add it. We only list write-ups published after an event has closed.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 leading-8 text-stone-700">
            <span>
              <span className="text-2xl font-bold text-stone-900 tabular-nums">{writeUps.length}</span> write-ups and
              videos
            </span>
            <span>
              <span className="text-2xl font-bold text-stone-900 tabular-nums">{authors}</span> players and channels
            </span>
            <span className="flex gap-2">
              {YEARS.map((y) => (
                <a
                  key={y.year}
                  href={`#y${y.year}`}
                  className="rounded-full bg-stone-900 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-stone-700"
                >
                  {y.year}
                </a>
              ))}
            </span>
          </div>
        </Wide>
      </section>

      {YEARS.map(({ year, challenges }) => {
        const forYear = writeUps.filter((w) => w.year === year);
        const awards = forYear.filter((w) => w.award && w.award !== "Honorable Mention");
        // Same mixed order as the homepage, so one channel's videos are not all in a row.
        const rank = (w: WriteUp) => {
          const i = featuredOrder.indexOf(w.url);
          return i === -1 ? featuredOrder.length : i;
        };
        const visual = forYear.filter((w) => !w.award && (w.youtubeId || w.shot)).sort((a, b) => rank(a) - rank(b));
        const rows = challenges
          .map((c) => ({ ...c, list: writeUpsFor(year, c.day, c.title) }))
          .filter((c) => c.list.length > 0);
        return (
          <section key={year} id={`y${year}`} aria-labelledby={`y${year}-title`} className="scroll-mt-20 border-t border-white/10">
            <Wide className="py-16 sm:py-20">
              <h2 id={`y${year}-title`} className="font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl">
                advent of ctf <span className="font-sans font-light text-cyan-300">{year}</span>
              </h2>

              {awards.length > 0 && (
                <>
                  <h3 className="mt-10 text-xl font-bold text-white">Write-Up Division winners</h3>
                  <div className="mt-5 grid gap-5 md:grid-cols-3">
                    {awards.map((w) => (
                      <AwardCard key={w.url} w={w} />
                    ))}
                  </div>
                  {unlinkedMentions
                    .filter((m) => m.year === year)
                    .map((m) => (
                      <p key={m.author} className="mt-4 text-sm text-gray-400">
                        Honorable mentions also went to{" "}
                        {forYear
                          .filter((w) => w.award === "Honorable Mention")
                          .map((w) => (
                            <span key={w.url}>
                              <a href={w.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-200 underline underline-offset-4">
                                {w.author}
                              </a>{" "}
                              for {w.challenge} and{" "}
                            </span>
                          ))}
                        <span className="font-semibold text-gray-200">{m.author}</span> for {m.challenge}.
                      </p>
                    ))}
                </>
              )}

              {visual.length > 0 && (
                <>
                  <h3 className="mt-14 text-xl font-bold text-white">Videos and posts</h3>
                  <ul className="mt-5 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {visual.map((w) => (
                      <li key={w.url}>
                        <MediaCard w={w} dark />
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <h3 className="mt-14 text-xl font-bold text-white">Every write-up, by challenge</h3>
              <ol className="mt-5 grid gap-x-10 lg:grid-cols-2">
                {rows.map((c) => {
                  const cat = categoryOf(c.category);
                  return (
                    <li key={c.day} className="border-t border-white/10 py-4">
                      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="w-14 shrink-0 font-mono text-sm text-gray-500">Day {c.day}</span>
                        <span className="font-semibold text-white">{c.title}</span>
                        {c.category && (
                          <span className={cn("rounded-full border px-2 py-0.5 text-xs font-semibold", cat.chipDark)}>
                            {cat.short}
                          </span>
                        )}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5 sm:pl-16">
                        {c.list.map((w) => (
                          <AuthorPill key={w.url} w={w} />
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-6 flex items-center gap-1.5 text-sm text-gray-500">
                Each name links to that player&rsquo;s write-up on their own site, and you can hover over it to see the
                title
                <HiExternalLink className="size-4" aria-hidden="true" />
              </p>
            </Wide>
          </section>
        );
      })}
    </main>
  );
}
