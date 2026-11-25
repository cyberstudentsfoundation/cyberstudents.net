import { api } from "~/trpc/server";
import type { CalendarItem } from "./AdventCalendar";

const dayFmt = new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: "America/New_York" });

/**
 * Published challenges of one Advent event as calendar items, read from the database. Returns null when the database
 * is unreachable, so callers can leave the calendar out instead of failing the page.
 */
export async function loadAdventCalendar(event: "aoc2024" | "aoc2025", year: number): Promise<CalendarItem[] | null> {
  try {
    const data = await api.challenge.fetch({ event, fetchExtended: false });
    return data.challenges
      .filter((c) => c.published && c.title)
      .map((c) => {
        const day = Number(dayFmt.format(new Date(c.publishDate)));
        // A pulled challenge keeps its day in the calendar, titled CANCELLED by the admins (2025 day 22).
        if (c.title!.trim().toUpperCase() === "CANCELLED") {
          return { day, title: "Cancelled", category: "", href: `/advent/${year}/challenges`, cancelled: true };
        }
        return {
          day,
          title: c.title!.trim(),
          category: c.category ?? "Miscellaneous",
          points: c.points ?? undefined,
          author: c.author?.name ?? undefined,
          href: `/advent/${year}/challenges?challenge=${c.id}`,
        };
      })
      .sort((a, b) => a.day - b.day);
  } catch {
    return null;
  }
}
