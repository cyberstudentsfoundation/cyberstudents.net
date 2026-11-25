"use client";

/**
 * A scripted replay of solving a challenge on our Advent of CTF platform, in the style of product demo videos: a
 * cursor that glides between targets, a camera that zooms toward the action, typing, a click, confetti and the
 * leaderboard climb. It is drawn with the DOM rather than a video file, so it stays sharp at any size, weighs a few
 * kilobytes, matches the real interface's classes, and can pause.
 *
 * The challenge is real: Day 2 of Advent of CTF 2025, "The First Strike" by a_person. Its pcap holds thousands of
 * failed FTP logins and one that worked (USER Elf67, PASS snowball), so the flag is csd{Elf67_snowball}, as published
 * in players' write-ups after the event. Points follow the real 2025 scoring formula. The players on the leaderboard
 * and the solve counts are demo data, and the caption on the homepage says so.
 */

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { BiNetworkChart } from "react-icons/bi";
import { CgBrowser } from "react-icons/cg";
import { FaCheck, FaGear, FaMagnifyingGlassChart, FaTableCellsRowLock } from "react-icons/fa6";
import { HiArrowPath, HiChevronLeft, HiFlag, HiLink, HiLockClosed, HiMiniCalendar, HiPause, HiPlay } from "react-icons/hi2";
import { LuBinary } from "react-icons/lu";
import { FileText } from "lucide-react";

import { cn } from "~/lib/utils";
import { usePrefersReducedMotion, useInView } from "./motion";

// ---------------------------------------------------------------------------------------------------------------
// Stage geometry. Everything is laid out at 1000 x 640 and scaled to fit the container.

const W = 1000;
const H = 640;
const ROW_H = 40;
const VISIBLE_ROWS = 10;

// ---------------------------------------------------------------------------------------------------------------
// Data

const points = (solves: number) => Math.max(50, Math.floor(500 * Math.pow(Math.min(1, 162 / (solves + 161)), 1.5)));

const CHALLENGES = [
  { day: 1, title: "The Mission Begins", category: "Cryptography", color: "lime", solves: 118, solved: true },
  { day: 2, title: "The First Strike", category: "Forensics", color: "yellow", solves: 41, solved: false },
  { day: 3, title: "Syndicate Infrastructure", category: "Miscellaneous", color: "fuchsia", solves: 63, solved: true },
  { day: 4, title: "The Elf's Wager", category: "Reverse engineering", color: "pink", solves: 37, solved: false },
  { day: 5, title: "Kramazon", category: "Web exploitation", color: "blue", solves: 29, solved: false },
] as const;

const ICON: Record<string, ReactNode> = {
  Cryptography: <FaTableCellsRowLock className="h-full w-full" />,
  Forensics: <FaMagnifyingGlassChart className="h-full w-full" />,
  Miscellaneous: <BiNetworkChart className="h-full w-full" />,
  "Reverse engineering": <FaGear className="h-full w-full" />,
  "Web exploitation": <CgBrowser className="h-full w-full" />,
  "Binary exploitation": <LuBinary className="h-full w-full" />,
};

// The category tints the real list uses (`bg-{color}-950/50` strip, `bg-{color}-900/50` body), spelled out so
// Tailwind generates them.
const TINT: Record<string, { strip: string; body: string }> = {
  lime: { strip: "bg-lime-950/50", body: "bg-lime-900/50" },
  yellow: { strip: "bg-yellow-950/50", body: "bg-yellow-900/50" },
  fuchsia: { strip: "bg-fuchsia-950/50", body: "bg-fuchsia-900/50" },
  pink: { strip: "bg-pink-950/50", body: "bg-pink-900/50" },
  blue: { strip: "bg-blue-950/50", body: "bg-blue-900/50" },
};

const FLAG = "csd{Elf67_snowball}";
const GAINED = points(42);

const CMD1 = "tshark -r ftpchal.pcap -Y ftp -T fields -e ftp.request.command -e ftp.request.arg -e ftp.response.code";
const CMD2 = "!! | grep -B3 230";
// Failed attempts use only the usernames and guesses that appear in published write-ups of this challenge.
const FLOOD = [
  ["USER", "Santa"],
  ["", "331"],
  ["PASS", "password"],
  ["", "530"],
  ["USER", "Santa"],
  ["", "331"],
  ["PASS", "123456"],
  ["", "530"],
  ["USER", "Elf67"],
  ["", "331"],
  ["PASS", "password"],
  ["", "530"],
  ["USER", "Elf67"],
  ["", "331"],
  ["PASS", "123456"],
  ["", "530"],
] as const;
const FOUND = [
  ["USER", "Elf67"],
  ["", "331"],
  ["PASS", "snowball"],
  ["", "230"],
] as const;

type Player = { name: string; points: number; solved: number; you?: boolean };
// Demo players with festive handles. None of these are real accounts.
const PLAYERS: Player[] = [
  ["sleighjacker", 4215, 9],
  ["rootkit_rudolph", 3905, 9],
  ["pwnsettia", 3861, 9],
  ["candycane_c2", 3840, 8],
  ["tinsel_tamer", 3812, 8],
  ["frost_bitflip", 3790, 8],
  ["gingerbread_0day", 3775, 8],
  ["north_pole_ninja", 3752, 8],
  ["jingle_shells", 3731, 8],
  ["mistletoe_ops", 3720, 8],
  ["yule_log_parser", 3702, 8],
  ["snowcrash", 3690, 8],
  ["elfish_overflow", 3676, 8],
  ["krampus_hunter", 3660, 8],
  ["cocoa_and_crypto", 3648, 8],
  ["nutcracker_rop", 3633, 8],
  ["holly_jolly_hax", 3615, 8],
  ["reindeer_games", 3601, 8],
  ["chimney_sweep", 3590, 8],
  ["blizzard_byte", 3566, 8],
  ["wreath_writer", 3551, 7],
  ["polar_payload", 3540, 7],
  ["frosty_fuzzer", 3527, 7],
  ["elf_on_a_shell", 3512, 7],
  ["stocking_stuffer", 3498, 7],
  ["eggnog_exploit", 3480, 7],
  ["sugarplum_sqli", 3462, 7],
].map(([name, pts, solved]) => ({
  name: name as string,
  points: pts as number,
  solved: solved as number,
  you: name === "elf_on_a_shell",
}));
const YOU_FROM = PLAYERS.findIndex((p) => p.you);
const YOU_TO = 2;
const AVATAR = ["bg-rose-400", "bg-amber-400", "bg-emerald-400", "bg-sky-400", "bg-violet-400", "bg-orange-400"];

// ---------------------------------------------------------------------------------------------------------------
// State

type Scene = {
  focus: "terminal" | "browser";
  view: "challenge" | "leaderboard";
  cmd1: string;
  flood: number;
  cmd2: string;
  found: boolean;
  highlight: boolean;
  inputFocused: boolean;
  typed: string;
  pressed: boolean;
  solved: boolean;
  toast: boolean;
  confetti: number;
  youIndex: number;
  youPoints: number;
  lift: boolean;
  listOffset: number;
  rankFlash: boolean;
};

const START_OFFSET = -(YOU_FROM - 7) * ROW_H;
const INITIAL: Scene = {
  focus: "terminal",
  view: "challenge",
  cmd1: "",
  flood: 0,
  cmd2: "",
  found: false,
  highlight: false,
  inputFocused: false,
  typed: "",
  pressed: false,
  solved: false,
  toast: false,
  confetti: 0,
  youIndex: YOU_FROM,
  youPoints: PLAYERS[YOU_FROM]!.points,
  lift: false,
  listOffset: START_OFFSET,
  rankFlash: false,
};

// The end state, shown as a still frame when motion is reduced and nothing has been played.
const POSTER: Scene = {
  ...INITIAL,
  focus: "browser",
  typed: FLAG,
  solved: true,
  toast: true,
};

type Camera = { s: number; x: number; y: number };
type Cursor = { x: number; y: number; ms: number; down: boolean; visible: boolean };

// ---------------------------------------------------------------------------------------------------------------
// Pieces

function Arrow({ down }: { down: boolean }) {
  return (
    <svg
      width="26"
      height="30"
      viewBox="0 0 26 30"
      className={cn("drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)] transition-transform duration-150", down && "scale-[0.82]")}
      style={{ transformOrigin: "3px 3px" }}
    >
      <path d="M3 2 L3 24 L8.6 18.6 L12.4 27.4 L16.2 25.8 L12.5 17.2 L20.4 17.2 Z" fill="#0b0f19" stroke="white" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function Confetti({ burst, x, y }: { burst: number; x: number; y: number }) {
  const [pieces, setPieces] = useState<{ id: number; style: CSSProperties; className: string }[]>([]);
  useEffect(() => {
    if (!burst) return setPieces([]);
    const colors = ["bg-cyan-300", "bg-yellow-300", "bg-pink-400", "bg-lime-300", "bg-violet-400", "bg-white"];
    setPieces(
      Array.from({ length: 70 }, (_, i) => {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1;
        const speed = 140 + Math.random() * 260;
        return {
          id: burst * 1000 + i,
          className: cn(colors[i % colors.length], i % 3 === 0 ? "h-1.5 w-3 rounded-[1px]" : "size-2 rounded-full"),
          style: {
            "--dx": `${Math.cos(angle) * speed}px`,
            "--dy": `${Math.sin(angle) * speed}px`,
            "--r": `${(Math.random() - 0.5) * 900}deg`,
            animationDelay: `${Math.random() * 90}ms`,
            animationDuration: `${1300 + Math.random() * 700}ms`,
          } as CSSProperties,
        };
      }),
    );
  }, [burst]);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute z-40" style={{ left: x, top: y }}>
      {pieces.map((p) => (
        <span
          key={p.id}
          className={cn("absolute block animate-[confetti_1.6s_cubic-bezier(0.15,0.75,0.35,1)_both]", p.className)}
          style={p.style}
        />
      ))}
    </div>
  );
}

function Terminal({ scene }: { scene: Scene }) {
  const shown = scene.focus === "terminal";
  return (
    <div
      data-demo="terminal"
      className={cn(
        "absolute top-[96px] left-[150px] z-30 flex h-[380px] w-[660px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b1020]/95 font-mono text-[12.5px] leading-[19px] text-gray-300 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]",
        shown ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-10 scale-95 opacity-0",
      )}
    >
      <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-white/5 bg-white/[0.03] px-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-gray-500">bash: ~/advent/day2</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-4 py-3">
        <p className="break-all">
          <span className="text-cyan-300">$</span> {scene.cmd1}
          {!scene.flood && scene.focus === "terminal" && <Caret />}
        </p>
        {FLOOD.slice(0, scene.flood).map(([a, b], i) => (
          <TermLine key={i} a={a} b={b} />
        ))}
        {scene.flood >= FLOOD.length && <p className="text-gray-500">^C</p>}
        {scene.flood >= FLOOD.length && (
          <p className="break-all">
            <span className="text-cyan-300">$</span> {scene.cmd2}
            {!scene.found && <Caret />}
          </p>
        )}
        {scene.found && (
          <>
            <p className="break-all text-gray-500">{CMD1} | grep -B3 230</p>
            {FOUND.map(([a, b], i) => (
              <TermLine key={i} a={a} b={b} hit={scene.highlight && (b === "Elf67" || b === "snowball" || b === "230")} />
            ))}
            <p>
              <span className="text-cyan-300">$</span> <Caret />
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Caret() {
  return <span className="ml-0.5 inline-block h-[15px] w-[7px] translate-y-[3px] animate-pulse bg-gray-300" />;
}

function TermLine({ a, b, hit }: { a: string; b: string; hit?: boolean }) {
  const code = /^\d+$/.test(b);
  return (
    <p className="flex">
      <span className="w-14 shrink-0 text-violet-300">{a}</span>
      <span
        className={cn(
          "rounded-sm px-0.5 transition-colors duration-500",
          code ? (b === "530" ? "text-rose-400" : b === "230" ? "text-lime-300" : "text-gray-500") : "text-gray-200",
          hit && "bg-yellow-300/25 text-yellow-100",
        )}
      >
        {b}
      </span>
    </p>
  );
}

function ChallengeView({ scene }: { scene: Scene }) {
  const day2Solves = scene.solved ? 42 : 41;
  return (
    <div className="flex h-full flex-col px-5 pt-3 pb-5 text-gray-200">
      <div className="mb-3 flex items-center justify-between text-[13px]">
        <span className="flex items-center gap-1 text-gray-300">
          <HiChevronLeft className="size-3.5" />
          Back to calendar
        </span>
        <span>
          <span className="tabular-nums">{(scene.solved ? 3512 + GAINED : 3512).toLocaleString("en-US")} points</span>{" "}
          <span className="text-gray-400">(Open: #{YOU_FROM + 1})</span>
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex w-[268px] shrink-0 flex-col overflow-hidden">
          <div className="flex items-center bg-gray-900">
            <div className="flex flex-1 items-center gap-6 bg-zinc-900/50 px-2.5 py-2.5 font-mono text-[11px] font-medium tracking-widest uppercase">
              <FileText className="size-3.5" />
              Mission Briefing
            </div>
          </div>
          {CHALLENGES.map((c, i) => {
            const solved = c.solved || (c.day === 2 && scene.solved);
            const solves = c.day === 2 ? day2Solves : c.solves;
            return (
              <div key={c.day} className={cn("flex items-stretch bg-gray-900", c.day === 2 && "ring-1 ring-inset ring-white/20")}>
                <div className={cn("flex w-7 shrink-0 items-center justify-center", TINT[c.color]!.strip)}>
                  {solved && <FaCheck className="size-3.5 text-gray-200" />}
                </div>
                <div className={cn("flex-1 px-3.5 py-2.5", TINT[c.color]!.body, c.day === 2 && "brightness-125")}>
                  <p className="float-right text-[11px] text-gray-400">#{i + 1}</p>
                  <p className="flex items-center gap-1 text-[11px] text-gray-300">
                    <HiMiniCalendar className="size-3" />
                    December {c.day}
                  </p>
                  <p className="flex items-center gap-1 text-[11px] text-gray-300">
                    <span className="size-3">{ICON[c.category]}</span>
                    {c.category}
                  </p>
                  <p className="mb-1.5 text-[13px] font-bold">{c.title}</p>
                  <p className="flex justify-between text-[10.5px]">
                    <span className="font-medium tabular-nums">{points(solves)} points</span>
                    <span className="text-gray-300 tabular-nums">{solves} solves</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative min-w-0 flex-1 rounded-lg rounded-tl-none bg-gray-800 p-6">
          <div className="pointer-events-none absolute top-4 left-4 size-24 text-gray-400 opacity-10">{ICON.Forensics}</div>
          <div className="flex justify-between gap-6">
            <div>
              <h3 className="mb-3 flex items-center gap-2.5 text-xl font-bold">
                The First Strike
                <span
                  className={cn(
                    "rounded-md bg-green-400 px-2 py-0.5 text-[11px] font-semibold text-gray-900 transition-all duration-500",
                    scene.solved ? "scale-100 opacity-100" : "scale-50 opacity-0",
                  )}
                >
                  Solved
                </span>
              </h3>
              <div className="grid w-fit grid-flow-col grid-rows-2 items-center gap-x-10 gap-y-0.5 text-[12.5px]">
                <p className="font-bold tracking-wide text-gray-400">Category</p>
                <p>Forensics</p>
                <p className="font-bold tracking-wide text-gray-400">Points</p>
                <p className="tabular-nums">{points(day2Solves)}</p>
                <p className="font-bold tracking-wide text-gray-400">Author</p>
                <p className="flex items-center gap-1.5">
                  <span className="flex size-5 items-center justify-center rounded-full bg-gray-900 text-[10px]">a</span>
                  a_person
                </p>
              </div>
            </div>
            <div className="w-40 shrink-0">
              <p className="mb-1 text-[13px] font-bold text-gray-400">Solves ({day2Solves})</p>
              <div className="overflow-hidden rounded-md text-[10.5px]">
                {(scene.solved ? ["elf_on_a_shell", "pwnsettia", "snowcrash"] : ["pwnsettia", "snowcrash", "tinsel_tamer"]).map(
                  (n, i) => (
                    <p key={n} className={cn("flex gap-2 px-2 py-0.5", i % 2 ? "bg-gray-700" : "bg-gray-600")}>
                      <span className="text-gray-400">{scene.solved ? day2Solves - i : 41 - i}</span>
                      <span className="truncate text-gray-200">{n}</span>
                    </p>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 flex gap-6">
            <div className="basis-2/3">
              <p className="mb-1 text-[13px] font-bold text-gray-400">Description</p>
              <p className="font-mono text-[11.5px] leading-[18px] text-gray-300">
                A North Pole FTP server logged a long run of failed sign-ins, until one of them finally got through.
                Find the account that was compromised and the password used, and submit them as
                csd&#123;username_password&#125;.
              </p>
              <p className="mt-3 mb-1.5 text-[13px] font-bold text-gray-400">Attachments</p>
              <span className="flex w-52 items-center gap-1.5 rounded-md bg-gray-300 px-2.5 py-1 text-[11.5px] font-medium text-gray-800">
                <HiLink className="size-3.5" />
                ftpchal.pcap
              </span>
            </div>
            <div className="basis-1/3">
              <p className="mb-1 text-[13px] font-bold text-gray-400">Hint</p>
              <p className="text-[10.5px] leading-[15px] text-gray-400">
                There are no penalties for viewing hints. Hints are released 12 hours and 24 hours after the challenge
                releases.
              </p>
              <div className="mt-1.5 inline-flex rounded-md bg-gray-900 p-0.5 text-[11px]">
                <span className="rounded px-2.5 py-0.5 text-gray-300">1</span>
                <span className="rounded px-2.5 py-0.5 text-gray-300">2</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-6 bottom-6">
            <p className="mb-1.5 flex items-center gap-1.5 text-[14px] font-bold text-gray-400">
              <HiFlag className="size-4" />
              {scene.solved ? "Re-check flag" : "Submit flag"}
            </p>
            <div className="flex gap-2.5 rounded-md bg-gray-700 px-2.5 py-2">
              <div
                data-demo="input"
                className={cn(
                  "flex h-8 flex-1 items-center rounded-md px-2.5 font-mono text-[12.5px] transition-shadow",
                  scene.inputFocused && "ring-2 ring-gray-400/70",
                )}
              >
                {scene.typed ? (
                  <span className="text-gray-100">{scene.typed}</span>
                ) : (
                  <span className="text-gray-500">csd&#123;FLAG&#125;</span>
                )}
                {scene.inputFocused && !scene.solved && <span className="ml-px h-4 w-px animate-pulse bg-gray-200" />}
              </div>
              <span
                data-demo="submit"
                className={cn(
                  "flex h-8 min-w-20 items-center justify-center rounded-md bg-gray-200 px-3 text-[12.5px] font-medium text-gray-800 transition-transform duration-100",
                  scene.pressed && "scale-95 bg-gray-200/80",
                )}
              >
                {scene.solved ? "Check" : "Submit"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeaderboardView({ scene }: { scene: Scene }) {
  const order = PLAYERS.map((p, i) => ({ ...p, i })).filter((p) => !p.you);
  order.splice(scene.youIndex, 0, { ...PLAYERS[YOU_FROM]!, i: YOU_FROM });
  return (
    <div className="flex h-full flex-col px-8 pt-5 pb-6 text-gray-200">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-bold">Leaderboard</h3>
          <p className="text-[12.5px] text-gray-400">Advent of CTF 2025 · 24 challenges · dynamic scoring</p>
        </div>
        <div className="flex rounded-md bg-gray-900 p-0.5 text-[12px]">
          {["Open", "College", "High School", "Write-Up"].map((d, i) => (
            <span key={d} className={cn("rounded px-3 py-1", i === 0 ? "bg-gray-700 text-white" : "text-gray-400")}>
              {d}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-gray-800">
        <div className="flex h-9 items-center border-b border-gray-800 bg-gray-900 px-4 text-[12px] font-medium text-gray-400">
          <span className="w-12">#</span>
          <span className="flex-1">Name</span>
          <span className="w-24 text-right">Points</span>
          <span className="w-32 text-right">Completion</span>
        </div>
        <div data-demo="rows" className="relative overflow-hidden" style={{ height: VISIBLE_ROWS * ROW_H }}>
          <div
            className="absolute inset-x-0 top-0 transition-transform duration-[1300ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ transform: `translateY(${scene.listOffset}px)` }}
          >
            {order.map((p, index) => {
              const rank = index + 1;
              return (
                <div
                  key={p.name}
                  className={cn(
                    "absolute inset-x-0 flex items-center px-4 text-[13px] transition-[transform,box-shadow,background-color] ease-[cubic-bezier(0.65,0,0.35,1)]",
                    p.you
                      ? cn(
                          "z-10 bg-cyan-950 duration-[1300ms]",
                          scene.lift && "shadow-[0_12px_30px_-6px_rgba(34,211,238,0.45)] ring-1 ring-cyan-300/60",
                        )
                      : cn("duration-[1300ms]", index % 2 ? "bg-gray-900/40" : "bg-gray-950"),
                  )}
                  style={{ height: ROW_H, transform: `translateY(${index * ROW_H}px)${p.you && scene.lift ? " scale(1.03)" : ""}` }}
                >
                  <span
                    className={cn(
                      "w-12 font-medium tabular-nums transition-colors duration-500",
                      p.you && scene.rankFlash ? "text-cyan-300" : "text-gray-400",
                    )}
                  >
                    {rank}
                  </span>
                  <span className="flex flex-1 items-center gap-2.5">
                    <span
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full text-[11px] font-bold text-gray-950",
                        p.you ? "bg-cyan-300" : AVATAR[p.i % AVATAR.length],
                      )}
                    >
                      {p.name[0]!.toUpperCase()}
                    </span>
                    <span className={p.you ? "font-semibold text-white" : "text-gray-200"}>{p.name}</span>
                    {p.you && <span className="rounded bg-cyan-300 px-1.5 text-[10px] font-bold text-cyan-950">YOU</span>}
                  </span>
                  <span className="w-24 text-right font-medium tabular-nums">
                    {(p.you ? scene.youPoints : p.points).toLocaleString("en-US")}
                  </span>
                  <span className="w-32 text-right text-gray-400 tabular-nums">
                    {p.you && scene.youPoints > PLAYERS[YOU_FROM]!.points ? p.solved + 1 : p.solved}/9
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// The player

export function PlatformDemo({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [boxRef, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scene, setScene] = useState<Scene>(INITIAL);
  const [camera, setCamera] = useState<Camera>({ s: 1, x: W / 2, y: H / 2 });
  const [cursor, setCursor] = useState<Cursor>({ x: 640, y: 560, ms: 0, down: false, visible: false });
  const [ripple, setRipple] = useState<{ x: number; y: number; n: number } | null>(null);
  const [confettiAt, setConfettiAt] = useState({ x: 0, y: 0 });
  const [fade, setFade] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [played, setPlayed] = useState(false);
  const [run, setRun] = useState(0);
  const pausedRef = useRef(false);
  pausedRef.current = userPaused || !inView;

  // Fit the 1000 x 640 stage to the container.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry!.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, [boxRef]);

  const autoplay = !reduced || played;

  /** Position of an element inside the stage, ignoring the camera and the stage's own scaling. */
  const locate = useCallback((selector: string) => {
    const root = stageRef.current;
    const el = root?.querySelector<HTMLElement>(`[data-demo="${selector}"]`);
    if (!root || !el) return { x: W / 2, y: H / 2, w: 0, h: 0 };
    let x = 0;
    let y = 0;
    let n: HTMLElement | null = el;
    while (n && n !== root) {
      x += n.offsetLeft;
      y += n.offsetTop;
      n = n.offsetParent as HTMLElement | null;
    }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  }, []);

  useEffect(() => {
    if (!autoplay || !inView) return;
    const ac = new AbortController();
    const signal = ac.signal;
    const aborted = () => new DOMException("aborted", "AbortError");

    // Waits that stop counting while the replay is paused or scrolled out of view.
    const wait = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        let remaining = ms;
        let last = performance.now();
        let timer = 0;
        const tick = () => {
          if (signal.aborted) return reject(aborted());
          const now = performance.now();
          if (!pausedRef.current) remaining -= now - last;
          last = now;
          if (remaining <= 0) resolve();
          else timer = window.setTimeout(tick, Math.min(remaining, 40));
        };
        timer = window.setTimeout(tick, Math.min(ms, 40));
        signal.addEventListener("abort", () => {
          window.clearTimeout(timer);
          reject(aborted());
        });
      });

    const set = (patch: Partial<Scene>) => setScene((s) => ({ ...s, ...patch }));
    let here = { x: 640, y: 560 };
    const move = async (x: number, y: number, extra = 0) => {
      const dist = Math.hypot(x - here.x, y - here.y);
      const ms = Math.round(Math.min(1100, 380 + dist * 0.75));
      here = { x, y };
      setCursor((c) => ({ ...c, x, y, ms, visible: true }));
      await wait(ms + extra);
    };
    const moveTo = async (selector: string, fx = 0.5, fy = 0.5, extra = 0) => {
      const r = locate(selector);
      await move(r.x + r.w * fx, r.y + r.h * fy, extra);
    };
    const click = async () => {
      setCursor((c) => ({ ...c, down: true }));
      setRipple((r) => ({ x: here.x, y: here.y, n: (r?.n ?? 0) + 1 }));
      await wait(140);
      setCursor((c) => ({ ...c, down: false }));
    };
    const type = async (key: "cmd1" | "cmd2" | "typed", text: string, perChar: number) => {
      for (let i = 1; i <= text.length; i++) {
        set({ [key]: text.slice(0, i) } as Partial<Scene>);
        await wait(perChar + (text[i - 1] === " " ? perChar : 0));
      }
    };
    const zoom = (s: number, x: number, y: number) => setCamera({ s, x, y });

    (async () => {
      try {
        // Reset.
        setScene(INITIAL);
        setCamera({ s: 1, x: W / 2, y: H / 2 });
        setCursor({ x: 640, y: 560, ms: 0, down: false, visible: false });
        here = { x: 640, y: 560 };
        setFade(false);
        await wait(500);

        // 1. In the terminal: dump every FTP command, see the wall of failures, then filter for the one success.
        await move(560, 470, 150);
        zoom(1.18, 480, 330);
        await type("cmd1", CMD1, 14);
        await wait(220);
        for (let i = 1; i <= FLOOD.length; i++) {
          set({ flood: i });
          await wait(55);
        }
        await wait(500);
        await type("cmd2", CMD2, 55);
        await wait(300);
        set({ found: true });
        await wait(400);
        zoom(1.7, 330, 420);
        set({ highlight: true });
        await wait(1700);

        // 2. Over to the browser, where Day 2 is already open.
        zoom(1, W / 2, H / 2);
        await move(110, 520, 80);
        await click();
        set({ focus: "browser" });
        await wait(700);

        // 3. Type the flag and submit it.
        const input = locate("input");
        const button = locate("submit");
        zoom(1.5, (input.x + button.x + button.w) / 2, input.y - 50);
        await moveTo("input", 0.35, 0.5, 60);
        await click();
        set({ inputFocused: true });
        await wait(250);
        await type("typed", FLAG, 62);
        await wait(350);
        await moveTo("submit", 0.55, 0.6, 80);
        set({ pressed: true });
        await click();
        set({ pressed: false });
        await wait(380);

        // 4. Correct! Confetti, the toast, and the "Solved" badge.
        const submit = locate("submit");
        setConfettiAt({ x: submit.x + submit.w / 2, y: submit.y + submit.h / 2 });
        set({ solved: true, toast: true, inputFocused: false, confetti: Date.now() });
        await wait(500);
        zoom(1, W / 2, H / 2);
        await wait(2300);

        // 5. Off to the leaderboard.
        set({ toast: false });
        await moveTo("nav-leaderboard", 0.5, 0.6, 60);
        await click();
        set({ view: "leaderboard", confetti: 0 });
        await wait(500);
        const rows = locate("rows");
        const youY = rows.y + (YOU_FROM * ROW_H + START_OFFSET) + ROW_H / 2;
        zoom(1.25, rows.x + rows.w / 2 - 30, youY);
        await move(rows.x + rows.w - 150, youY + 26, 300);

        // 6. The new points land, the row lifts, and it climbs to third place while the list scrolls up.
        set({ lift: true });
        const from = PLAYERS[YOU_FROM]!.points;
        for (let i = 1; i <= 12; i++) {
          set({ youPoints: Math.round(from + (GAINED * i) / 12) });
          await wait(38);
        }
        await wait(350);
        zoom(1, W / 2, H / 2);
        set({ youIndex: YOU_TO, listOffset: 0 });
        await move(rows.x + rows.w - 150, rows.y + YOU_TO * ROW_H + ROW_H / 2 + 26, 0);
        await wait(700);
        set({ lift: false, rankFlash: true });
        setConfettiAt({ x: rows.x + 90, y: rows.y + YOU_TO * ROW_H + ROW_H / 2 });
        set({ confetti: Date.now() });
        zoom(1.25, rows.x + rows.w / 2 - 30, rows.y + ROW_H * 2);
        await wait(2800);

        // 7. Fade and start over.
        setFade(true);
        await wait(600);
        setRun((r) => r + 1);
      } catch (e) {
        if (!(e instanceof DOMException && e.name === "AbortError")) throw e;
      }
    })();

    return () => ac.abort();
  }, [autoplay, inView, run, locate]);

  // Clamp the camera so the stage edges never show.
  const tx = Math.min(0, Math.max(W - W * camera.s, W / 2 - camera.x * camera.s));
  const ty = Math.min(0, Math.max(H - H * camera.s, H / 2 - camera.y * camera.s));
  const shown = autoplay ? scene : POSTER;
  const url = shown.view === "leaderboard" ? "cyberstudents.net/advent/2025/leaderboard" : "cyberstudents.net/advent/2025/challenges?challenge=day-2";

  return (
    <figure className={className}>
      <div
        ref={boxRef}
        className="relative w-full overflow-hidden rounded-2xl bg-[#0b1120] shadow-[0_30px_80px_-30px_rgba(15,23,42,0.6)] ring-1 ring-slate-900/10 sm:rounded-3xl"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <div
          ref={stageRef}
          aria-hidden="true"
          className="absolute top-0 left-0 origin-top-left select-none"
          style={{ width: W, height: H, transform: `scale(${scale})` }}
        >
          {/* Camera */}
          <div
            className="absolute inset-0 origin-top-left transition-transform duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
            style={{ transform: `translate(${tx}px, ${ty}px) scale(${camera.s})` }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_10%_0%,#155e75_0%,#0b1120_55%),radial-gradient(80%_80%_at_100%_100%,#3b0764_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Browser window */}
            <div
              className={cn(
                "absolute top-[22px] left-[22px] flex h-[596px] w-[956px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#030712] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] transition-[filter] duration-700",
                shown.focus === "terminal" && "brightness-[0.55]",
              )}
            >
              <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-white/5 bg-[#0b0f1a] px-3.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="mx-auto flex w-[420px] items-center justify-center gap-1.5 rounded-md bg-white/[0.06] py-1 text-[11.5px] text-gray-400">
                  <HiLockClosed className="size-3" />
                  {url}
                </span>
              </div>
              <div className="flex h-10 shrink-0 items-center gap-1 border-b border-[#0a0e1a] bg-[#0a0e1a] px-5 text-[13px]">
                <span className="mr-5 font-mono font-bold tracking-[0.18em] text-cyan-200 [text-shadow:0_0_10px_rgba(103,232,249,0.7)]">
                  CYBERSTUDENTS
                </span>
                <span className="px-2.5 text-gray-200">Home</span>
                <span className={cn("px-2.5", shown.view === "challenge" ? "text-cyan-300" : "text-gray-200")}>Challenges</span>
                <span data-demo="nav-leaderboard" className={cn("px-2.5", shown.view === "leaderboard" ? "text-cyan-300" : "text-gray-200")}>
                  Leaderboard
                </span>
                <span className="px-2.5 text-gray-200">Rules</span>
                <span className="ml-auto text-[12px] text-gray-500">Advent of CTF 2025</span>
              </div>
              <div className="relative min-h-0 flex-1">
                <div className={cn("absolute inset-0 transition-opacity duration-500", shown.view === "challenge" ? "opacity-100" : "opacity-0")}>
                  <ChallengeView scene={shown} />
                </div>
                <div className={cn("absolute inset-0 transition-opacity duration-500", shown.view === "leaderboard" ? "opacity-100" : "opacity-0")}>
                  <LeaderboardView scene={shown} />
                </div>
                {/* Toast, as Sonner draws it at the top center */}
                <div
                  className={cn(
                    "absolute top-3 left-1/2 z-30 flex w-[340px] -translate-x-1/2 items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[13px] font-medium text-gray-900 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.3,1.2)]",
                    shown.toast ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0",
                  )}
                >
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
                    <FaCheck className="size-2" />
                  </span>
                  Congratulations! You gained {GAINED} points.
                </div>
              </div>
            </div>

            <Terminal scene={shown} />

            {autoplay && <Confetti burst={scene.confetti} x={confettiAt.x} y={confettiAt.y} />}

            {/* Click ripple */}
            {ripple && autoplay && (
              <span
                key={ripple.n}
                className="pointer-events-none absolute z-50 size-10 animate-[demo-ripple_550ms_ease-out_forwards] rounded-full border-2 border-cyan-200"
                style={{ left: ripple.x, top: ripple.y }}
              />
            )}

            {/* Cursor: X and Y animate with different curves, so it travels along a gentle arc. */}
            <div
              className={cn("pointer-events-none absolute top-0 left-0 z-50 transition-opacity duration-300", cursor.visible && autoplay ? "opacity-100" : "opacity-0")}
              style={{
                transform: `translateX(${cursor.x}px)`,
                transition: `transform ${cursor.ms}ms cubic-bezier(0.45, 0, 0.25, 1), opacity 300ms`,
              }}
            >
              <div
                style={{
                  transform: `translateY(${cursor.y}px)`,
                  transition: `transform ${cursor.ms}ms cubic-bezier(0.3, 0.15, 0.2, 1)`,
                }}
              >
                <div className="-translate-x-[3px] -translate-y-[2px]">
                  <Arrow down={cursor.down} />
                </div>
              </div>
            </div>
          </div>

          <div className={cn("absolute inset-0 bg-[#0b1120] transition-opacity duration-500", fade ? "opacity-100" : "opacity-0", "pointer-events-none")} />
        </div>

        {/* Controls */}
        <div className="absolute right-2 bottom-2 z-10 flex gap-1.5 sm:right-3 sm:bottom-3 sm:gap-2">
          {autoplay ? (
            <>
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? "Play the replay" : "Pause the replay"}
                className="flex size-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70 sm:size-9"
              >
                {userPaused ? <HiPlay className="size-4" aria-hidden="true" /> : <HiPause className="size-4" aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserPaused(false);
                  setRun((r) => r + 1);
                }}
                aria-label="Restart the replay"
                className="flex size-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70 sm:size-9"
              >
                <HiArrowPath className="size-4" aria-hidden="true" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setPlayed(true)}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg"
            >
              <HiPlay className="size-4" aria-hidden="true" />
              Play the replay
            </button>
          )}
        </div>
      </div>
      <figcaption className="sr-only">
        A replay of solving Day 2 of Advent of CTF 2025, The First Strike. In a terminal, tshark lists thousands of failed
        FTP logins from the challenge&rsquo;s packet capture, and filtering for the one successful login reveals the
        username Elf67 and the password snowball. In the challenge page, the flag csd&#123;Elf67_snowball&#125; is
        submitted, confetti bursts, and a message says {GAINED} points were gained. On the leaderboard, the player climbs
        from 24th to 3rd place.
      </figcaption>
    </figure>
  );
}
