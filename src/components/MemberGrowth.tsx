"use client";

import { useCallback, useId, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { membership, membershipStart } from "~/data/growth";
import { cn } from "~/lib/utils";

const DAY = 86_400_000;
const start = new Date(`${membershipStart}T12:00:00Z`).getTime();
const dateOf = (i: number) => new Date(start + i * DAY);
const longDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const monthName = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

// One series, so no legend: the heading names it. Cyan-400 matches the site accent and clears 3:1 against the
// section surfaces (#050911 and #111b29). Gridlines stay one step off the surface.
const LINE = "#22d3ee";
const Y_TICKS = [0, 100, 200, 300, 400];
const Y_MAX = 400;

/**
 * Net members gained on our Discord server since the first day of the Server Insights export, drawn as a line with a
 * crosshair and tooltip. The totals themselves are left off the chart (see src/data/growth.ts for why).
 */
export function MemberGrowth({ className }: { className?: string }) {
  const base = membership[0]!;
  const gained = useMemo(() => membership.map((v) => v - base), [base]);
  const last = gained.length - 1;
  const total = gained[last]!;
  const [active, setActive] = useState<number | null>(null);
  const plot = useRef<HTMLDivElement>(null);
  const tableId = useId();

  const x = (i: number) => (i / last) * 100;
  const y = (v: number) => 100 - (Math.max(0, v) / Y_MAX) * 100;
  const line = gained.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(3)},${y(v).toFixed(3)}`).join("");
  const area = `${line}L100,100L0,100Z`;

  // Month starts inside the range, for the x axis.
  const months = useMemo(() => {
    const out: { i: number; label: string }[] = [];
    for (let i = 1; i <= last; i++)
      if (dateOf(i).getUTCDate() === 1) out.push({ i, label: monthName.format(dateOf(i)) });
    return out;
  }, [last]);

  // Weekly rows for the table view.
  const weeks = useMemo(
    () => gained.map((v, i) => ({ i, v })).filter(({ i }) => i % 7 === 0 || i === last),
    [gained, last],
  );

  const pick = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const r = plot.current?.getBoundingClientRect();
      if (!r) return;
      const t = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      setActive(Math.round(t * last));
    },
    [last],
  );

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 7 : 1;
    if (e.key === "ArrowRight") setActive((a) => Math.min(last, (a ?? last) + step));
    else if (e.key === "ArrowLeft") setActive((a) => Math.max(0, (a ?? last) - step));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(last);
    else return;
    e.preventDefault();
  };

  const shown = active ?? last;
  const tipLeft = x(shown);

  return (
    <figure className={cn("min-w-0", className)}>
      <figcaption className="pl-[3.25rem] text-sm text-gray-400">New members on our Discord server</figcaption>

      <div className="mt-6 grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3">
        {/* Y axis labels. */}
        <div className="relative h-56 sm:h-64" aria-hidden="true">
          {Y_TICKS.map((t) => (
            <span
              key={t}
              className="absolute right-0 -translate-y-1/2 text-xs text-gray-500 tabular-nums"
              style={{ top: `${y(t)}%` }}
            >
              {t}
            </span>
          ))}
        </div>

        <div
          ref={plot}
          role="img"
          aria-label={`Line chart. Our Discord server gained ${total} members between ${longDate.format(dateOf(0))} and ${longDate.format(dateOf(last))}, rising steadily over the whole period.`}
          aria-describedby={tableId}
          tabIndex={0}
          onPointerMove={pick}
          onPointerDown={pick}
          onPointerLeave={() => setActive(null)}
          onFocus={() => setActive((a) => a ?? last)}
          onBlur={() => setActive(null)}
          onKeyDown={onKey}
          className="relative h-56 touch-pan-y rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050911] sm:h-64"
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            {Y_TICKS.map((t) => (
              <line
                key={t}
                x1="0"
                x2="100"
                y1={y(t)}
                y2={y(t)}
                stroke={t === 0 ? "rgb(255 255 255 / 0.25)" : "rgb(255 255 255 / 0.08)"}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path d={area} fill={LINE} fillOpacity="0.1" />
            <path
              d={line}
              fill="none"
              stroke={LINE}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Crosshair, end dot, and tooltip are HTML so they keep their shape at any width. */}
          {active !== null && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 bottom-0 w-px bg-white/40"
              style={{ left: `${tipLeft}%` }}
            />
          )}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[#050911]"
            style={{ left: `${tipLeft}%`, top: `${y(gained[shown]!)}%`, backgroundColor: LINE }}
          />
          {active !== null && (
            <div
              aria-live="polite"
              className={cn(
                "pointer-events-none absolute top-1 z-10 w-max rounded-lg bg-white px-3 py-2 text-sm text-gray-900 shadow-xl shadow-black/40",
                tipLeft > 55 ? "-translate-x-[calc(100%+0.75rem)]" : "translate-x-3",
              )}
              style={{ left: `${tipLeft}%` }}
            >
              <span className="block text-xs text-gray-500">{longDate.format(dateOf(shown))}</span>
              <span className="font-semibold tabular-nums">{gained[shown]} new members so far</span>
            </div>
          )}
        </div>

        {/* X axis labels. */}
        <div />
        <div className="relative mt-2 h-5" aria-hidden="true">
          {months.map((m) => (
            <span key={m.i} className="absolute -translate-x-1/2 text-xs text-gray-500" style={{ left: `${x(m.i)}%` }}>
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* sr-only goes on a wrapper: a table ignores the 1px width and would widen the page on small phones. */}
      <div className="sr-only">
        <table id={tableId}>
          <caption>Members gained since {longDate.format(dateOf(0))}, by week</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Members gained</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map(({ i, v }) => (
              <tr key={i}>
                <td>{longDate.format(dateOf(i))}</td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
