import Image from "next/image";
import Link from "next/link";
import { Award as AwardIcon } from "lucide-react";
import { FaGithub, FaYoutube } from "react-icons/fa6";
import { HiArrowRight, HiDocumentText, HiPlay } from "react-icons/hi2";
import { HiExternalLink } from "react-icons/hi";

import { featuredOrder, siteOf, unlinkedMentions, writeUps, type WriteUp, type WriteUpKind } from "~/data/writeups";
import { cn } from "~/lib/utils";
import { CountUp, ScrollRow } from "./motion";
import { Heading, Wide } from "./ui";

export const KIND: Record<WriteUpKind, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  blog: { label: "Blog post", icon: HiDocumentText },
  github: { label: "GitHub", icon: FaGithub },
  video: { label: "Video", icon: FaYoutube },
  pdf: { label: "PDF", icon: HiDocumentText },
};

const AWARD_STYLE: Record<string, { ring: string; chip: string }> = {
  "Best Well-Written Solution": { ring: "ring-sky-300", chip: "bg-sky-300 text-sky-950" },
  "Best Technical Solution": { ring: "ring-rose-300", chip: "bg-rose-300 text-rose-950" },
  "Best Unintended Solution": { ring: "ring-violet-300", chip: "bg-violet-300 text-violet-950" },
};

export function where(w: WriteUp) {
  if (w.covers) return `Advent of CTF ${w.year}, ${w.covers.charAt(0).toLowerCase()}${w.covers.slice(1)}`;
  const day = w.days[0];
  return `Advent of CTF ${w.year}${day ? `, Day ${day}` : ""}${w.challenge ? `: ${w.challenge}` : ""}`;
}

/**
 * Ruled notebook paper with a margin line, used behind everything about write-ups.
 *
 * The rules are 32px apart (`leading-8`), and the text on the paper is laid out on the same 32px grid: every line of
 * text is 32px tall (headings 64px), and every margin, gap, padding and fixed height is a multiple of 32px. The rule
 * sits 23px into each row, just under the baseline of 16 to 18px Figtree, so the writing rests on the lines. Anything
 * with its own background (cards, photos, sticky notes) only has to keep its height on the grid.
 */
export const RULE = 32;
export function NotebookPaper({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 23px, rgba(87, 83, 78, 0.16) 23px, rgba(87, 83, 78, 0.16) 24px, transparent 24px, transparent ${RULE}px)`,
        }}
      />
      <div className="absolute inset-y-0 left-10 hidden w-px bg-rose-400/45 sm:block xl:left-14" />
    </div>
  );
}

/** One of the three 2025 Write-Up Division winners, over a screenshot of the write-up itself. */
export function AwardCard({ w }: { w: WriteUp }) {
  const style = AWARD_STYLE[w.award!]!;
  const Kind = KIND[w.kind].icon;
  return (
    <a
      href={w.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl bg-stone-950 shadow-lg ring-2 transition-all duration-500 hover:shadow-2xl motion-safe:hover:-translate-y-1",
        style.ring,
      )}
    >
      {w.shot && (
        <Image
          src={w.shot}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover opacity-80 transition-transform duration-700 motion-safe:group-hover:scale-[1.04]"
          style={{ objectPosition: w.shotPosition ?? "top left" }}
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/85 to-stone-950/5"
      />
      <span
        className={cn(
          "absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold",
          style.chip,
        )}
      >
        <AwardIcon className="size-4" aria-hidden="true" />
        {w.award}
      </span>
      <span className="relative p-6 text-white">
        <span className="block text-3xl font-bold">{w.author}</span>
        <span className="mt-1 block text-stone-300">on {w.challenge}</span>
        <span className="mt-4 flex items-center justify-between gap-3 text-sm text-stone-400">
          <span className="flex items-center gap-1.5 group-hover:text-white">
            <Kind className="size-4" aria-hidden="true" />
            {siteOf(w.url)}
            <HiExternalLink className="size-4" aria-hidden="true" />
          </span>
          <span>$75 + CASA and ACP</span>
        </span>
      </span>
    </a>
  );
}

/** A video or post with its thumbnail or a screenshot of the page. */
export function MediaCard({
  w,
  className,
  dark,
  polaroid,
  tilt,
}: {
  w: WriteUp;
  className?: string;
  dark?: boolean;
  /** A white photo-print frame with the caption on it, slightly tilted, for the notebook page. */
  polaroid?: boolean;
  tilt?: string;
}) {
  const kind = KIND[w.kind];
  const src = w.youtubeId ? `https://i.ytimg.com/vi/${w.youtubeId}/hqdefault.jpg` : w.shot;
  return (
    <a
      href={w.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block",
        polaroid &&
          "bg-white p-2.5 pb-3 shadow-[0_8px_20px_-10px_rgba(40,30,10,0.45)] ring-1 ring-stone-900/5 transition-transform duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0",
        polaroid && tilt,
        className,
      )}
    >
      <span
        className={cn(
          "relative block aspect-[16/10] overflow-hidden bg-stone-900",
          polaroid ? "rounded-[2px]" : "rounded-xl shadow-md ring-1 ring-black/10",
        )}
      >
        {src && (
          <Image
            src={src}
            alt=""
            fill
            sizes="320px"
            className={cn(
              "object-cover transition-transform duration-500 motion-safe:group-hover:scale-105",
              !w.youtubeId && "object-top",
            )}
            style={!w.youtubeId && w.shotPosition ? { objectPosition: w.shotPosition } : undefined}
          />
        )}
        <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold text-stone-800 shadow">
          <kind.icon className={cn("size-3.5", w.kind === "video" && "text-red-600")} aria-hidden="true" />
          {kind.label}
        </span>
        {w.kind === "video" && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-black/70 text-white transition-transform duration-300 group-hover:scale-110">
              <HiPlay className="ml-0.5 size-6" aria-hidden="true" />
            </span>
          </span>
        )}
      </span>
      <span
        className={cn(
          "mt-3 line-clamp-2 block font-semibold group-hover:underline group-hover:underline-offset-4",
          dark ? "text-white group-hover:decoration-gray-500" : "text-stone-900 group-hover:decoration-stone-400",
        )}
      >
        {w.title}
      </span>
      <span className={cn("mt-0.5 block text-sm", dark ? "text-gray-300" : "text-stone-600")}>
        {w.author} · {w.kind === "video" ? "YouTube" : siteOf(w.url)}
      </span>
      <span className={cn("block text-sm", dark ? "text-gray-500" : "text-stone-500")}>{where(w)}</span>
    </a>
  );
}

export function WriteUps() {
  const awards = writeUps.filter((w) => w.award && w.award !== "Honorable Mention");
  const mention = writeUps.find((w) => w.award === "Honorable Mention");
  const byUrl = new Map(writeUps.map((w) => [w.url, w]));
  const featured = featuredOrder.map((u) => byUrl.get(u)).filter((w): w is WriteUp => !!w);
  const videos = writeUps.filter((w) => w.kind === "video").length;
  const authors = new Set(writeUps.map((w) => w.author)).size;

  // Everything below keeps to the 32px grid of the ruled paper (see NotebookPaper): text is leading-8 or leading-16,
  // and every margin, gap and padding is a multiple of 32px (or two 16px halves that add up to one).
  return (
    <section
      id="write-ups"
      aria-labelledby="write-ups-title"
      className="relative scroll-mt-28 overflow-hidden bg-[#f6f1e6] text-stone-900"
    >
      <NotebookPaper />
      <Wide className="relative py-24 sm:py-32">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Heading id="write-ups-title" className="relative top-[11px] leading-16 sm:top-[10px]">
              Players{" "}
              <span className="bg-[linear-gradient(transparent_55%,rgba(250,204,21,0.55)_55%,rgba(250,204,21,0.55)_92%,transparent_92%)] px-1">
                write it up
              </span>
            </Heading>
            <p className="max-w-2xl text-lg leading-8 text-stone-700">
              Once each Advent of CTF wraps up, players share how they solved our challenges. The top write-ups win
              prizes of their own, and plenty more end up on players&rsquo; own blogs, GitHub pages, and YouTube
              channels.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-x-4">
            {[
              { value: String(writeUps.length), label: "Write-ups and videos" },
              { value: String(authors), label: "Players and channels" },
              { value: String(videos), label: "Video walkthroughs" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col">
                <dt className="order-2 text-sm leading-8 text-stone-600">{f.label}</dt>
                <dd className="relative top-[10px] order-1 text-4xl leading-16 font-bold tabular-nums">
                  <CountUp value={f.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <h3 className="mt-16 text-2xl leading-8 font-bold">The 2025 Write-Up Division</h3>
        <p className="max-w-3xl leading-8 text-stone-600">
          In 2025, write-ups had a prize division of their own. Each category&rsquo;s winner took home $75 along with
          CASA and ACP certification vouchers from APIsec University, and as it happens, all three of them wrote about
          the very last challenge of the year, The Final RCE.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
          {awards.map((w) => (
            <AwardCard key={w.url} w={w} />
          ))}
        </div>
        {mention && <StickyNote w={mention} />}

        <div className="mt-16 flex flex-wrap items-end justify-between gap-x-4 gap-y-8">
          <div>
            <h3 className="text-2xl leading-8 font-bold">Watch and read along</h3>
            <p className="max-w-2xl leading-8 text-stone-600">
              Walkthrough videos and blog posts from players all over the world, covering everything from the Day 1
              warm-ups to heap exploitation.
            </p>
          </div>
          <Link
            href="/write-ups"
            className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-1 leading-6 font-semibold text-white transition-colors hover:bg-stone-700"
          >
            Browse every write-up
            <HiArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ScrollRow label="Write-up videos and posts" className="mt-8" listClassName="py-4">
          {featured.map((w, i) => (
            <li key={w.url} className="w-64 shrink-0 snap-start sm:w-72">
              <MediaCard w={w} polaroid tilt={TILTS[i % TILTS.length]} />
            </li>
          ))}
        </ScrollRow>
      </Wide>
    </section>
  );
}

const TILTS = ["-rotate-1", "rotate-[0.6deg]", "-rotate-[0.4deg]", "rotate-1"];

/** The honorable mentions, on a sticky note pressed onto the page. */
function StickyNote({ w }: { w: WriteUp }) {
  return (
    <div className="relative mt-8 max-w-3xl -rotate-[0.6deg]">
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-2 bg-white/60 shadow-sm ring-1 ring-black/5"
      />
      <div className="flex flex-col gap-8 bg-[#fdf0a6] p-4 shadow-[0_10px_24px_-12px_rgba(60,40,0,0.45)] sm:flex-row sm:items-start sm:gap-4">
        {w.shot && (
          <a
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-32 shrink-0 overflow-hidden ring-1 ring-black/10 sm:h-24 sm:w-48"
          >
            <Image
              src={w.shot}
              alt=""
              fill
              sizes="(min-width: 640px) 192px, 100vw"
              className="object-cover object-top"
            />
          </a>
        )}
        <p className="leading-8 text-stone-800">
          <span className="font-semibold text-stone-900">Honorable mentions</span> went to{" "}
          <a
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4"
          >
            {w.author}
          </a>{" "}
          for their write-up of {w.challenge}
          {unlinkedMentions.map((m) => (
            <span key={m.author}>
              {" "}
              and to <span className="font-semibold">{m.author}</span> for {m.challenge}
            </span>
          ))}
          .
        </p>
      </div>
    </div>
  );
}
