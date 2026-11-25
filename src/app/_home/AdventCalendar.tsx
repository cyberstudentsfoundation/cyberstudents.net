import Link from "next/link";
import { HiPencilSquare } from "react-icons/hi2";
import { categoryOf, categoryOrder, categories } from "~/data/categories";
import { cn } from "~/lib/utils";

export type CalendarItem = {
  day: number;
  title: string;
  category: string;
  points?: number;
  author?: string;
  href: string;
  /** Community write-ups and videos we link to for this day. */
  writeUps?: number;
  /** The day's challenge was pulled and never played, so the tile says so and links nowhere. */
  cancelled?: boolean;
};

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

/** Runs only when the calendar sits in an active slide of `TabbedSlides`, so it replays on every switch. */
const TILE_IN = "motion-safe:[[data-active]_&]:animate-[tile-in_420ms_cubic-bezier(0.2,0.7,0.2,1)_both]";

/**
 * A December calendar of one Advent of CTF year, in the style of the calendar on the Advent of CTF 2025 page. On
 * large screens it is a real week grid; below that the days simply wrap.
 */
export function AdventCalendar({
  year,
  items,
  className,
  tone = "light",
}: {
  year: number;
  items: CalendarItem[];
  className?: string;
  tone?: "light" | "dark";
}) {
  const leading = new Date(Date.UTC(year, 11, 1)).getUTCDay();
  const light = tone === "light";

  return (
    <div className={className}>
      <div className={cn("hidden grid-cols-7 gap-1.5 pb-2 text-center font-mono text-xs lg:grid", light ? "text-slate-500" : "text-gray-500")}>
        {WEEKDAYS.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <ol className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        {Array.from({ length: leading }, (_, i) => (
          <li key={`pad-${i}`} aria-hidden="true" className="hidden lg:block" />
        ))}
        {items.map((item, index) => {
          // Inside an auto-advancing slide (`[data-active]`), the tiles fade in one after another.
          const tile = {
            className: TILE_IN,
            style: { animationDelay: `${120 + index * 14}ms` },
          };
          if (item.cancelled) {
            return (
              <li key={item.day} {...tile}>
                <div
                  title="This day's challenge was cancelled"
                  className={cn(
                    "flex h-full min-h-24 flex-col rounded-md border p-2 text-xs",
                    light ? "border-slate-200 bg-white/40 text-slate-500" : "border-gray-800 bg-gray-900/40 text-gray-500",
                  )}
                >
                  <span className="font-mono font-semibold">Dec {item.day}</span>
                  <span className="mt-1 text-sm font-semibold">Cancelled</span>
                </div>
              </li>
            );
          }
          const known = item.category !== "";
          const cat = categoryOf(item.category);
          const Icon = cat.icon;
          const external = /^https?:\/\//.test(item.href);
          const body = (
            <>
              <span className="flex items-center justify-between gap-1">
                <span className={cn("font-mono text-xs font-semibold", light ? "text-slate-500" : "text-gray-400")}>
                  Dec {item.day}
                </span>
                <span className="flex items-center gap-1.5">
                  {!!item.writeUps && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 text-[11px] font-semibold",
                        light ? "text-cyan-800" : "text-cyan-300",
                      )}
                      title={`${item.writeUps} write-up${item.writeUps > 1 ? "s" : ""} or video${item.writeUps > 1 ? "s" : ""} by players`}
                    >
                      <HiPencilSquare className="size-3" aria-hidden="true" />
                      {item.writeUps}
                    </span>
                  )}
                  {known && <Icon aria-hidden="true" className={cn("size-3.5", light ? cat.textLight : "opacity-80")} />}
                </span>
              </span>
              <span
                className={cn(
                  "mt-1 line-clamp-2 text-sm leading-snug font-semibold",
                  light ? "text-slate-900" : "text-gray-100",
                )}
              >
                {item.title}
              </span>
              <span className={cn("mt-auto pt-1 text-xs", light ? "text-slate-500" : "text-gray-400")}>
                {item.points !== undefined && <span className="tabular-nums">{item.points} pts</span>}
              </span>
            </>
          );
          // A colored strip across the top of each day, like the header of a tear-off calendar page.
          const cls = cn(
            "relative flex h-full min-h-24 flex-col overflow-hidden rounded-md border p-2 pt-2.5 transition-all motion-safe:hover:-translate-y-0.5",
            "before:absolute before:inset-x-0 before:top-0 before:h-1 before:content-['']",
            known ? cat.strip : light ? "before:bg-slate-300" : "before:bg-gray-600",
            light
              ? "border-slate-200 bg-white/80 shadow-sm hover:bg-white hover:shadow-md"
              : "border-gray-700 bg-gray-900/70 hover:bg-gray-800",
            item.day === 25 && (light ? "ring-2 ring-cyan-600/40" : "ring-2 ring-cyan-300/40"),
          );
          return (
            <li key={item.day} {...tile}>
              {external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                  title={`${item.title}: ${cat.title}. Opens the write-up on GitHub.`}
                >
                  {body}
                </a>
              ) : (
                <Link href={item.href} className={cls} title={`${item.title}: ${cat.title}`}>
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function CategoryLegend({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-1.5 text-xs", tone === "light" ? "text-slate-600" : "text-gray-400", className)}>
      {categoryOrder.map((key) => (
        <li key={key} className="flex items-center gap-1.5">
          <span aria-hidden="true" className={cn("size-2.5 rounded-sm", categories[key].dot)} />
          {categories[key].title}
        </li>
      ))}
    </ul>
  );
}
