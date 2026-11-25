import { advent2024 } from "~/data/advent-2024";
import { advent2025 } from "~/data/advent-2025";
import type { RouterOutputs } from "~/trpc/react";

type Preview = RouterOutputs["challenge"]["fetchPreview"];

/**
 * The Advent of CTF calendars, built from src/data when the challenge database can't be reached (for example on a
 * deployment that has no database yet). Days without public data stay "???", and every tile uses a placeholder id, so
 * the calendar renders but doesn't link to the challenge browser, which needs the database.
 */
export function previewFallback(event: "aoc2024" | "aoc2025"): Preview {
  const rows: { day: number; title: string; category: string; points?: number }[] =
    event === "aoc2024" ? advent2024 : advent2025;
  const year = event === "aoc2024" ? 2024 : 2025;
  const byDay = new Map(rows.map((r) => [r.day, r]));
  return {
    name: event,
    challenges: Array.from({ length: 25 }, (_, i) => {
      const r = byDay.get(i + 1);
      return {
        id: `placeholder-${i + 1}`,
        published: true,
        publishDate: new Date(Date.UTC(year, 11, i + 1, 1, 0, 0)),
        title: r?.title ?? null,
        category: r?.category || null,
        points: r?.points ?? null,
      };
    }),
  };
}

/** Logs why the database call failed, once per render, without crashing the page. */
export function logDbFallback(where: string, error: unknown) {
  console.error(`[${where}] database unavailable, using fallback:`, error instanceof Error ? error.message : error);
}
