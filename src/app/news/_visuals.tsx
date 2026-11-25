import { FaCloudflare } from "react-icons/fa6";
import {
  HiArrowLongRight,
  HiOutlineCircleStack,
  HiOutlineCube,
  HiOutlineGlobeAlt,
  HiOutlineServerStack,
  HiOutlineUsers,
  HiCheck,
  HiStar,
  HiTrophy,
} from "react-icons/hi2";
import { SiProxmox } from "react-icons/si";

import Image from "next/image";
import badgeAcp from "~/../public/certs/apisec-acp.webp";
import badgeAscp from "~/../public/certs/apisec-ascp.webp";
import badgeCasa from "~/../public/certs/apisec-casa.webp";
import { cn } from "~/lib/utils";

// Graphics for articles that have no photograph. Each one is drawn from real data or describes something real; none
// is decorative filler.

/** The 2024 calendar once every day had unlocked, with each day's real title. */
export function CalendarComplete({ titles, className }: { titles: string[]; className?: string }) {
  const leading = new Date(Date.UTC(2024, 11, 1)).getUTCDay();
  return (
    <div className={cn("bg-[radial-gradient(110%_80%_at_100%_0%,#14532d_0%,#0b1120_55%)] p-5 sm:p-7", className)}>
      <p className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
        advent of ctf <span className="font-sans font-light text-emerald-300">2024</span>
      </p>
      <div className="mt-4 grid grid-cols-7 gap-1.5 font-mono text-[10px] sm:text-xs">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="text-center text-gray-500">
            {d}
          </span>
        ))}
        {Array.from({ length: leading }, (_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {titles.map((t, i) => (
          <span
            key={i}
            className="flex aspect-[5/4] min-w-0 flex-col justify-between rounded-md border border-emerald-300/40 bg-emerald-300/10 p-1.5 text-emerald-50"
          >
            <span className="font-semibold">Dec {i + 1}</span>
            <span className="truncate text-emerald-200/80">{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** The 2024 calendar as it looked before launch: every day locked until its release. */
export function CalendarTeaser({ className }: { className?: string }) {
  const leading = new Date(Date.UTC(2024, 11, 1)).getUTCDay();
  return (
    <div className={cn("bg-[radial-gradient(110%_80%_at_0%_0%,#164e63_0%,#0b1120_55%)] p-5 sm:p-7", className)}>
      <p className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
        advent of ctf <span className="font-sans font-light text-cyan-300">2024</span>
      </p>
      <div className="mt-4 grid grid-cols-7 gap-1.5 font-mono text-[10px] sm:text-xs">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="text-center text-gray-500">
            {d}
          </span>
        ))}
        {Array.from({ length: leading }, (_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {Array.from({ length: 25 }, (_, i) => (
          <span
            key={i}
            className={cn(
              "flex aspect-[5/4] flex-col justify-between rounded-md border p-1.5",
              i === 0 ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-100" : "border-white/10 bg-white/[0.04] text-gray-400",
            )}
          >
            <span className="font-semibold">Dec {i + 1}</span>
            <span className={i === 0 ? "text-cyan-200" : "text-gray-600"}>{i === 0 ? "Tomorrow" : "???"}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** When a challenge's hints unlock, relative to its release. */
export function HintTimeline({ release, hint1, hint2 }: { release: string; hint1: string; hint2: string }) {
  const steps = [
    { at: "Release", time: release, text: "The challenge unlocks" },
    { at: "+12 hours", time: hint1, text: "First hint, free" },
    { at: "+24 hours", time: hint2, text: "Second hint, free" },
  ];
  return (
    <ol className="relative grid gap-6 sm:grid-cols-3 sm:gap-4">
      <span aria-hidden="true" className="absolute top-3 right-[16%] left-[16%] hidden h-0.5 bg-gradient-to-r from-cyan-600 to-cyan-200 sm:block" />
      {steps.map((s, i) => (
        <li key={s.at} className="relative flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
          <span
            className={cn(
              "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-4 ring-white",
              i === 0 ? "bg-cyan-700 text-white" : "bg-cyan-100 text-cyan-900",
            )}
          >
            {i + 1}
          </span>
          <span>
            <span className="block text-sm font-bold text-stone-950">{s.at}</span>
            <span className="block text-sm text-stone-600">{s.time}</span>
            <span className="block text-sm text-stone-500">{s.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function Box({
  icon: Icon,
  title,
  text,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-3 rounded-xl border p-3.5", className)}>
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs leading-5 opacity-80">{text}</p>
      </div>
    </div>
  );
}

function Down({ label }: { label?: string }) {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-2 py-1.5 text-[11px] font-medium text-gray-500">
      <span className="h-6 w-px bg-gradient-to-b from-gray-600 to-cyan-400" />
      {label}
    </div>
  );
}

/**
 * How requests reach our server since the 2025 upgrade, described in general terms on purpose: players come in
 * through Cloudflare and a Cloudflare Tunnel, and a Proxmox host keeps the platform, the challenges and other services
 * in separate virtual machines or containers.
 */
export function ArchitectureDiagram({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <div
      role="img"
      aria-label="Players reach CyberStudents through Cloudflare and a Cloudflare Tunnel. Behind it, a Proxmox host runs the website and database, the challenge instances, and other community services in separate virtual machines and containers."
      className={cn("bg-[radial-gradient(120%_90%_at_100%_0%,#1e1b4b_0%,#0b1120_55%)] p-5 text-gray-100 sm:p-7", className)}
    >
      <div className={cn("mx-auto", compact ? "max-w-md" : "max-w-xl")}>
        <Box icon={HiOutlineUsers} title="Players" text="Anyone visiting cyberstudents.net" className="border-white/15 bg-white/[0.04]" />
        <Down />
        <Box
          icon={FaCloudflare}
          title="Cloudflare"
          text="Sits in front of everything and handles unwanted traffic"
          className="border-orange-300/30 bg-orange-300/10 text-orange-100"
        />
        <Down label={compact ? undefined : "Cloudflare Tunnel, so no ports are open to the internet"} />
        <div className="rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.06] p-3.5">
          <p className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
            <SiProxmox className="size-5" aria-hidden="true" />
            Our server, running Proxmox VE
          </p>
          <div className={cn("mt-3 grid gap-2.5", compact ? "grid-cols-1" : "sm:grid-cols-3")}>
            <Box
              icon={HiOutlineGlobeAlt}
              title="Website and platform"
              text="Next.js app and its PostgreSQL database"
              className="border-white/10 bg-gray-950/60"
            />
            <Box
              icon={HiOutlineCube}
              title="Challenge instances"
              text="Kept apart from everything else"
              className="border-white/10 bg-gray-950/60"
            />
            <Box
              icon={HiOutlineServerStack}
              title="Other services"
              text="Each in its own VM or container"
              className="border-white/10 bg-gray-950/60"
            />
          </div>
          {!compact && (
            <p className="mt-3 flex items-center gap-2 text-xs text-gray-400">
              <HiOutlineCircleStack className="size-4" aria-hidden="true" />
              Any machine can be snapshotted and rolled back if a change goes wrong
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * The server's channels after the early-2024 overhaul, as a sketch of the channel list. Every channel name and emoji is
 * from the update announcements of January 13 to February 17, 2024; the grouping follows the categories they name.
 */
const CHANNEL_GROUPS: { name: string; channels: [string, string, string?][] }[] = [
  {
    name: "Server guide",
    channels: [
      ["📒", "briefing"],
      ["📚", "about-us"],
      ["👥", "role-info"],
    ],
  },
  {
    name: "Educational",
    channels: [
      ["📖", "books", "forum"],
      ["💰", "scholarships", "forum"],
      ["🖥", "cyber-competitions", "forum"],
      ["✏", "courses-and-learning", "forum"],
      ["📜", "certifications", "forum"],
      ["📰", "cyber-news"],
      ["❔", "cyber-questions"],
    ],
  },
  {
    name: "Professional",
    channels: [
      ["👥", "linkedin-sharing"],
      ["📋", "resume-reviews"],
    ],
  },
  {
    name: "Community",
    channels: [
      ["💬", "general-chat"],
      ["👾", "cyber-chat"],
      ["🏴", "ctf-challenges"],
      ["🎊", "community-announcements"],
      ["💻", "programming"],
      ["🎮", "video-games"],
      ["🎶", "music"],
    ],
  },
];

export function ChannelMap({ className }: { className?: string }) {
  return (
    <div className={cn("bg-[#1e1f22] p-4 font-sans sm:p-6", className)}>
      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        {CHANNEL_GROUPS.map((g) => (
          <div key={g.name}>
            <p className="px-2 text-[11px] font-bold tracking-wide text-[#949ba4] uppercase">{g.name}</p>
            <ul className="mt-1.5 space-y-0.5">
              {g.channels.map(([emoji, name, kind]) => (
                <li key={name} className="flex items-center gap-2 rounded px-2 py-1 text-[15px] whitespace-nowrap text-[#b5bac1]">
                  <span aria-hidden="true" className="w-4 text-center text-[#80848e]">
                    {kind === "forum" ? "▤" : "#"}
                  </span>
                  <span>
                    <span aria-hidden="true">{emoji}</span>丨{name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-5 flex items-center gap-2 border-t border-white/10 px-2 pt-4 text-[15px] text-[#b5bac1]">
        <span aria-hidden="true">🔊</span> Conference Room
        <span className="ml-auto text-xs text-[#949ba4]">Talks, webinars, and live events</span>
      </p>
    </div>
  );
}

/** A ticket for a scheduled event, like the stubs on the homepage's talks row. */
export function EventTicket({
  kind,
  date,
  title,
  host,
  place,
  className,
}: {
  kind: string;
  date: string;
  title: string;
  host: string;
  place: string;
  className?: string;
}) {
  const d = new Date(`${date}T12:00:00Z`);
  const month = d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const weekday = d.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
  return (
    <div className={cn("flex items-center justify-center bg-[radial-gradient(100%_90%_at_0%_100%,#7c2d12_0%,#0b1120_60%)] p-6 sm:p-10", className)}>
      <div className="relative flex w-full max-w-xl overflow-hidden rounded-2xl bg-[#f4efe4] text-stone-900 shadow-2xl shadow-black/40">
        <div className="relative flex w-24 shrink-0 flex-col items-center justify-center border-r-2 border-dashed border-stone-400/70 px-3 py-6 text-center sm:w-28">
          <span className="text-xs font-bold tracking-widest text-red-700 uppercase">{month}</span>
          <span className="text-4xl leading-none font-black">{d.getUTCDate()}</span>
          <span className="mt-1 text-xs text-stone-500">{d.getUTCFullYear()}</span>
          <span aria-hidden="true" className="absolute -top-3 -right-3 size-6 rounded-full bg-[#160f17]" />
          <span aria-hidden="true" className="absolute -right-3 -bottom-3 size-6 rounded-full bg-[#0b1120]" />
        </div>
        <div className="min-w-0 p-5 sm:p-6">
          <p className="text-xs font-bold tracking-widest text-red-700 uppercase">
            {kind} · {weekday}
          </p>
          <p className="mt-1.5 text-lg leading-snug font-bold sm:text-xl">{title}</p>
          <p className="mt-2 text-sm text-stone-600">{host}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-2.5 py-1 text-xs font-semibold text-white">
            <span aria-hidden="true">🔊</span> {place}
          </p>
        </div>
      </div>
    </div>
  );
}

function Stars({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5 text-amber-400", className)} aria-label={`${n} ${n === 1 ? "star" : "stars"}`}>
      {Array.from({ length: n }, (_, i) => (
        <HiStar key={i} className="size-4" aria-hidden="true" />
      ))}
    </span>
  );
}

/** The top five of a Daily CTF round and the stars each one earned, as a podium. */
export function StarPodium({
  title,
  places,
  className,
}: {
  title: string;
  places: { handle: string; stars: number }[];
  className?: string;
}) {
  // Second, first, third on the podium, then fourth and fifth beside it.
  const order = [1, 0, 2];
  const heights = ["h-32", "h-24", "h-16"];
  return (
    <div className={cn("bg-[radial-gradient(120%_90%_at_50%_0%,#422006_0%,#0b1120_60%)] p-5 text-white sm:p-8", className)}>
      <p className="text-center text-sm font-semibold text-amber-200">{title}</p>
      <div className="mt-6 flex flex-wrap items-end justify-center gap-x-8 gap-y-6">
        <ol className="flex items-end gap-2">
          {order.map((i) => {
            const p = places[i]!;
            return (
              <li key={p.handle} className="flex w-24 flex-col items-center text-center sm:w-28">
                <span className="max-w-full truncate text-sm font-semibold">{p.handle}</span>
                <Stars n={p.stars} className="mt-1" />
                <span
                  className={cn(
                    "mt-2 flex w-full items-start justify-center rounded-t-lg pt-2 text-2xl font-black",
                    heights[i],
                    i === 0 ? "bg-amber-400 text-amber-950" : i === 1 ? "bg-slate-300 text-slate-900" : "bg-orange-700 text-orange-50",
                  )}
                >
                  {i + 1}
                </span>
              </li>
            );
          })}
        </ol>
        <ol start={4} className="space-y-2 pb-1">
          {places.slice(3).map((p, i) => (
            <li key={p.handle} className="flex items-center gap-3 rounded-lg bg-white/[0.06] px-3 py-2 text-sm">
              <span className="w-5 font-bold text-gray-400">{i + 4}</span>
              <span className="w-24 truncate font-semibold">{p.handle}</span>
              <Stars n={p.stars} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** Two amounts with an arrow between them, for a number that went up. */
export function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
  className,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-4 bg-[radial-gradient(110%_80%_at_100%_0%,#14532d_0%,#0b1120_58%)] p-6 text-white sm:gap-8 sm:p-10", className)}>
      <div className="text-center">
        <p className="text-4xl font-bold text-gray-400 line-through decoration-2 sm:text-6xl">{before}</p>
        <p className="mt-2 text-xs text-gray-400 sm:text-sm">{beforeLabel}</p>
      </div>
      <HiArrowLongRight className="size-10 shrink-0 text-emerald-300 sm:size-14" aria-hidden="true" />
      <div className="text-center">
        <p className="text-5xl font-black text-emerald-300 sm:text-7xl">{after}</p>
        <p className="mt-2 text-xs text-emerald-100 sm:text-sm">{afterLabel}</p>
      </div>
    </div>
  );
}

type Match = { teams: [{ seed: number; name: string }, { seed: number; name: string }]; winner?: 0 | 1 };

/**
 * A single-elimination bracket drawn from the real one (BracketHQ, marked up during the night). Grid rows line each
 * match up with the two it feeds from. A match without a winner shows both teams evenly.
 */
export function Bracket({
  columns,
  className,
}: {
  columns: { title: string; matches: { match: Match; rows: string }[] }[];
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto bg-[radial-gradient(120%_100%_at_0%_0%,#14532d_0%,#0b1120_55%)] p-5 text-white sm:p-8", className)}>
      <div className="grid min-w-[46rem] grid-cols-4 gap-x-6">
        {columns.map((c) => (
          <p key={c.title} className="pb-4 text-xs font-bold tracking-widest text-emerald-200/80 uppercase">
            {c.title}
          </p>
        ))}
        {columns.map((c, ci) => (
          <ol key={c.title} className="grid grid-rows-8 gap-y-2" style={{ gridTemplateRows: "repeat(8, minmax(2.6rem, 1fr))" }}>
            {c.matches.map(({ match, rows }) => (
              <li
                key={match.teams.map((t) => t.name).join(" v ")}
                className={cn(
                  "relative self-center overflow-visible rounded-lg bg-white/[0.07] ring-1 ring-white/10",
                  ci < columns.length - 1 &&
                    "after:absolute after:top-1/2 after:-right-6 after:h-0.5 after:w-6 after:bg-white/20 after:content-['']",
                )}
                style={{ gridRow: rows }}
              >
                {match.teams.map((t, ti) => {
                  const won = match.winner === ti;
                  const lost = match.winner !== undefined && !won;
                  return (
                    <div
                      key={t.name}
                      className={cn(
                        "flex items-center gap-2 px-2.5 py-1.5 text-sm",
                        ti === 0 && "border-b border-white/10",
                        won && "font-semibold text-white",
                        lost && "text-white/45",
                      )}
                    >
                      <span className="w-4 shrink-0 text-right text-xs text-white/40 tabular-nums">{t.seed}</span>
                      <span className="min-w-0 flex-1 truncate" title={t.name}>
                        {t.name}
                      </span>
                      {won && <HiCheck className="size-4 shrink-0 text-emerald-300" aria-label="won" />}
                    </div>
                  );
                })}
              </li>
            ))}
          </ol>
        ))}
      </div>
    </div>
  );
}

/** The two questions members bring to an InfoSec Growth Session, as a page from a notebook. */
export function GoalCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center bg-[radial-gradient(110%_90%_at_100%_100%,#4c1d95_0%,#0b1120_60%)] p-6 sm:p-10", className)}>
      <div className="w-full max-w-lg -rotate-1 rounded-2xl bg-[#fdfbf5] p-6 text-stone-900 shadow-2xl shadow-black/40 sm:p-8">
        <p className="text-xs font-bold tracking-widest text-violet-700 uppercase">InfoSec Growth Session · Fridays</p>
        <ol className="mt-4 space-y-4">
          <li className="flex gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-violet-600 text-sm font-bold text-white">1</span>
            <span className="text-lg leading-snug font-semibold">What progress have you made in your cybersecurity journey this past week?</span>
          </li>
          <li className="flex gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-violet-600 text-sm font-bold text-white">2</span>
            <span className="text-lg leading-snug font-semibold">What are your top learning goals for the upcoming week?</span>
          </li>
        </ol>
        <div className="mt-6 space-y-2.5" aria-hidden="true">
          {[0.92, 0.7, 0.84].map((w, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className={cn("size-4 rounded border-2", i === 0 ? "border-violet-600 bg-violet-600" : "border-stone-400")} />
              <span className="h-2 rounded-full bg-stone-200" style={{ width: `${w * 100}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** A chess clock at five minutes a side and the role the winner takes home. */
export function ChessClock({ role, className }: { role: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-6 bg-[radial-gradient(100%_90%_at_50%_0%,#713f12_0%,#0b1120_62%)] p-6 sm:p-10", className)}>
      <div className="flex gap-3 rounded-2xl bg-stone-900 p-3 shadow-2xl shadow-black/50 ring-1 ring-white/10">
        {["5:00", "5:00"].map((t, i) => (
          <span
            key={i}
            className={cn(
              "rounded-xl px-6 py-4 font-mono text-4xl font-bold tabular-nums sm:text-5xl",
              i === 0 ? "bg-stone-100 text-stone-900" : "bg-stone-800 text-stone-300",
            )}
          >
            {t}
          </span>
        ))}
      </div>
      <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-1.5 text-sm font-bold text-amber-950">
        <HiTrophy className="size-4" aria-hidden="true" />
        {role}
      </span>
    </div>
  );
}

const VOUCHERS = [
  { code: "ASCP", name: "API Security Certified Professional", badge: badgeAscp },
  { code: "CASA", name: "Certified API Security Analyst", badge: badgeCasa },
  { code: "ACP", name: "APIsec Certified Practitioner", badge: badgeAcp },
];

/**
 * The APIsec University certifications in the 2025 prizes, shown with APIsec's own badge art (from their Credly
 * badge pages) as exam vouchers, which is what winners received. No one's name goes on a credential here.
 */
export function CertVouchers({ className, only }: { className?: string; only?: string[] }) {
  const list = only ? VOUCHERS.filter((v) => only.includes(v.code)) : VOUCHERS;
  return (
    <div className={cn("bg-[radial-gradient(110%_90%_at_0%_0%,#1e3a8a_0%,#0b1120_60%)] p-5 sm:p-8", className)}>
      <ul className={cn("grid gap-4", list.length === 3 ? "sm:grid-cols-3" : "mx-auto max-w-xl sm:grid-cols-2")}>
        {list.map((v, i) => (
          <li
            key={v.code}
            className={cn(
              "relative flex flex-col items-center overflow-hidden rounded-2xl bg-white px-5 pt-6 pb-5 text-center text-slate-900 shadow-xl shadow-black/40",
              i === 1 ? "sm:-rotate-1" : i === 2 ? "sm:rotate-1" : "",
            )}
          >
            <Image src={v.badge} alt={`APIsec University ${v.code} badge`} className="h-32 w-auto sm:h-36" sizes="144px" />
            <p className="mt-3 text-sm leading-5 font-semibold text-slate-700">{v.name}</p>
            <p className="mt-4 w-full border-t-2 border-dashed border-slate-200 pt-3 text-xs font-bold tracking-widest text-blue-700 uppercase">
              Exam voucher
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A full score on a 100-point challenge, with the vouchers it won. */
export function PerfectScore({
  challenge,
  day,
  player,
  className,
}: {
  challenge: string;
  day: number;
  player: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center bg-[radial-gradient(110%_90%_at_100%_0%,#0e7490_0%,#0b1120_60%)] p-6 sm:p-10", className)}>
      <div className="w-full max-w-lg rounded-2xl bg-[#0f172a] p-6 text-white shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:p-8">
        <p className="text-xs font-bold tracking-widest text-cyan-300 uppercase">
          Day {day} · {challenge}
        </p>
        <p className="mt-3 font-mono text-6xl font-black tabular-nums sm:text-7xl">
          100<span className="text-3xl text-white/40 sm:text-4xl">/100</span>
        </p>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
          <div className="h-full w-full rounded-full bg-cyan-300" />
        </div>
        <p className="mt-4 text-sm text-white/70">
          First perfect score: <span className="font-semibold text-white">{player}</span>
        </p>
        <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
          <Image src={badgeCasa} alt="APIsec University CASA badge" className="h-16 w-auto" sizes="64px" />
          <Image src={badgeAcp} alt="APIsec University ACP badge" className="h-16 w-auto" sizes="64px" />
          <p className="text-sm leading-5 text-white/70">CASA and ACP exam vouchers from APIsec University</p>
        </div>
      </div>
    </div>
  );
}
