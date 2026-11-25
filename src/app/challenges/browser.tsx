"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HiExternalLink } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { categories, categoryKey, categoryOrder, type CategoryKey } from "~/data/categories";
import { cn } from "~/lib/utils";

export type ArchiveItem = {
  key: string;
  title: string;
  category: string;
  source: string;
  /** "Day 4" or "Round 2". */
  place: string;
  author?: string;
  points?: number;
  /** 1 to 5, from the challenge's points within its event. Left out when points were dynamic. */
  difficulty?: number;
  href: string;
  writeUp?: { author: string; href: string };
  /** Number of community write-ups we know of, linked from the homepage. */
  communityWriteUps?: number;
};

function Meter({ level, dot }: { level: number; dot: string }) {
  return (
    <span className="flex items-center gap-0.5" title={`Difficulty ${level} of 5, from its points`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={cn("h-1.5 w-3 rounded-full", i < level ? dot : "bg-white/10")} />
      ))}
      <span className="sr-only">Difficulty {level} of 5</span>
    </span>
  );
}

function Card({ item }: { item: ArchiveItem }) {
  const known = item.category !== "";
  const cat = categories[categoryKey(item.category)];
  const Icon = cat.icon;
  const external = /^https?:\/\//.test(item.href);
  const cls =
    "group relative flex h-full flex-col overflow-hidden rounded-xl bg-gray-900/80 p-4 ring-1 ring-white/10 transition-all duration-300 hover:bg-gray-900 hover:ring-white/25 motion-safe:hover:-translate-y-0.5";
  const body = (
    <>
      <Icon
        aria-hidden="true"
        className={cn(
          !known && "hidden",
          "pointer-events-none absolute -right-5 -bottom-6 size-28 rotate-12 opacity-[0.08] transition-all duration-500 group-hover:rotate-0 group-hover:opacity-[0.16]",
          cat.textDark,
        )}
      />
      <span className="relative flex items-center gap-2 text-xs">
        {known && (
          <>
            <span className={cn("size-2 rounded-full", cat.dot)} aria-hidden="true" />
            <span className={cn("font-semibold", cat.textDark)}>{cat.short}</span>
          </>
        )}
        <span className="text-gray-500">
          {item.source} · {item.place}
        </span>
      </span>
      <span className="relative mt-2 text-lg leading-snug font-semibold text-white">
        {item.title}
        {external && <HiExternalLink className="ml-1 inline size-4 align-[-0.1em] text-gray-500" aria-hidden="true" />}
      </span>
      {item.author && <span className="relative mt-0.5 text-sm text-gray-400">by {item.author}</span>}
      <span className="relative mt-auto flex items-end justify-between gap-3 pt-4 text-xs text-gray-400">
        <span className="flex min-w-0 flex-col gap-1">
          {item.writeUp && (
            <span className="truncate">
              {item.writeUp.author === "official" ? "Official write-up" : `Write-up by ${item.writeUp.author}`}
            </span>
          )}
          {!!item.communityWriteUps && (
            <span className="truncate text-cyan-300">
              {item.communityWriteUps} more by players
            </span>
          )}
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1.5">
          {item.difficulty !== undefined && <Meter level={item.difficulty} dot={cat.dot} />}
          {item.points !== undefined && <span className="tabular-nums">{item.points} pts</span>}
        </span>
      </span>
    </>
  );
  return external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <Link href={item.href} className={cls}>
      {body}
    </Link>
  );
}

export function ChallengeBrowser({ groups }: { groups: { id: string; title: string; note: string; items: ArchiveItem[] }[] }) {
  const [active, setActive] = useState<CategoryKey | null>(null);
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c = Object.fromEntries(categoryOrder.map((k) => [k, 0])) as Record<CategoryKey, number>;
    for (const g of groups) for (const i of g.items) if (i.category) c[categoryKey(i.category)]++;
    return c;
  }, [groups]);

  const q = query.trim().toLowerCase();
  const filtered = groups.map((g) => ({
    ...g,
    items: g.items.filter(
      (i) =>
        (!active || (i.category !== "" && categoryKey(i.category) === active)) &&
        (!q || i.title.toLowerCase().includes(q) || (i.author ?? "").toLowerCase().includes(q)),
    ),
  }));
  const total = filtered.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-12">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <label className="relative block">
          <span className="sr-only">Search by title or author</span>
          <HiMagnifyingGlass className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title or author"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 py-2 pr-3 pl-9 text-sm text-white placeholder:text-gray-500 focus:border-cyan-300 focus:outline-none"
          />
        </label>
        <p className="mt-6 mb-2 text-sm font-semibold text-gray-300">Category</p>
        <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          <li>
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-pressed={active === null}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                active === null ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-gray-200",
              )}
            >
              All categories
            </button>
          </li>
          {categoryOrder.map((k) => (
            <li key={k}>
              <button
                type="button"
                onClick={() => setActive(active === k ? null : k)}
                aria-pressed={active === k}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                  active === k ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-gray-200",
                )}
              >
                <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-sm", categories[k].dot)} />
                <span className="flex-1">{categories[k].title}</span>
                <span className="text-xs text-gray-500 tabular-nums">{counts[k]}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-gray-500" aria-live="polite">
          Showing {total} {total === 1 ? "challenge" : "challenges"}
        </p>
      </aside>

      <div className="min-w-0 space-y-14">
        {filtered.map((g) =>
          g.items.length === 0 ? null : (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-24">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h2 id={`${g.id}-title`} className="text-2xl font-bold text-white">
                  {g.title}
                </h2>
                <p className="text-sm text-gray-400">{g.note}</p>
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {g.items.map((item) => (
                  <li key={item.key}>
                    <Card item={item} />
                  </li>
                ))}
              </ul>
            </section>
          ),
        )}
        {total === 0 && (
          <p className="text-gray-400">Nothing matches that search yet. Try another name, or pick a different category.</p>
        )}
      </div>
    </div>
  );
}
