import Image from "next/image";
import CyberstartArchiveScroll from "~/app/cyberstart-archive-scroll";
import { homeHistory as history, type HistoryEntry } from "~/data/history";
import { cn } from "~/lib/utils";
import { Heading, TextLink, Wide } from "./ui";

import cyberstartCover from "~/../public/cyberstart-cover.png";

// Second row runs right to left so the timeline reads as one path with a turn at the right edge.
const ROW2_COL = ["lg:col-start-4", "lg:col-start-3", "lg:col-start-2", "lg:col-start-1"];
const ROW1_COL = ["lg:col-start-1", "lg:col-start-2", "lg:col-start-3", "lg:col-start-4"];

function Entry({ entry, className }: { entry: HistoryEntry; className?: string }) {
  return (
    <li className={cn("relative flex min-w-0 flex-col pl-8 lg:pl-0", className)}>
      <span
        aria-hidden="true"
        className="absolute top-1 left-0 size-3.5 rounded-full bg-cyan-300 ring-4 ring-[#050911] lg:top-0"
      />
      <time dateTime={entry.dateTime} className="text-sm font-semibold text-cyan-300 lg:mt-7">
        {entry.date}
      </time>
      <h4 className="mt-1 text-lg font-semibold text-white">{entry.title}</h4>
      <p className="mt-1 text-sm leading-6 text-gray-400">
        {entry.text}
        {entry.href && entry.linkText && (
          <>
            {" "}
            <TextLink href={entry.href}>{entry.linkText}</TextLink>
          </>
        )}
      </p>
      {entry.image && (
        <div className="mt-4 max-w-sm overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-transform duration-500 motion-safe:hover:-rotate-1">
          <Image
            src={entry.image.src}
            alt={entry.image.alt}
            sizes="(min-width: 1024px) 25vw, 384px"
            className="aspect-video w-full object-cover object-left-top"
            style={entry.image.position ? { objectPosition: entry.image.position } : undefined}
          />
        </div>
      )}
    </li>
  );
}

export function Timeline() {
  const row1 = history.slice(0, 4);
  const row2 = history.slice(4, 8);
  return (
    <div className="relative">
      {/* Small screens: one vertical dashed line. */}
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[0.42rem] border-l-2 border-dashed border-white/15 lg:hidden"
      />
      <div className="relative">
        {/* Large screens: a line along the first row and a turn down to the second row at the right edge. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="absolute top-[0.4rem] right-6 left-0 border-t-2 border-dashed border-white/15" />
          <div className="absolute top-[0.4rem] -right-6 h-[calc(100%+4rem)] w-12 rounded-r-[2rem] border-2 border-l-0 border-dashed border-white/15" />
        </div>
        <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
          {row1.map((entry, i) => (
            <Entry key={entry.dateTime} entry={entry} className={ROW1_COL[i]} />
          ))}
        </ol>
      </div>
      <div className="relative mt-10 lg:mt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[0.4rem] right-6 left-0 hidden border-t-2 border-dashed border-white/15 lg:block"
        />
        <ol start={5} className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
          {row2.map((entry, i) => (
            <Entry key={entry.dateTime} entry={entry} className={cn("lg:row-start-1", ROW2_COL[i])} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export function History() {
  return (
    <section id="history" aria-labelledby="history-title" className="scroll-mt-28 bg-[#050911] text-gray-200">
      <Wide className="py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            <Image
              src={cyberstartCover}
              alt="CyberStart"
              className="mb-6 w-52 -rotate-2 rounded-xl border border-white/10 opacity-90 shadow-xl shadow-black/40"
            />
            <Heading id="history-title" className="text-white">
              From CyberStart to CyberStudents
            </Heading>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Founded on December 2, 2021, we were originally a dedicated server offering assistance for{" "}
              <TextLink href="https://cyberstart.com/">CyberStart</TextLink> challenges. When CyberStart closed on
              January 12, 2024, we accepted this challenge and rebranded ourselves as CyberStudents.
            </p>
            <p className="mt-4 text-lg leading-7 text-gray-300">
              That old help forum is still preserved in our server to this day, and it shaped a lot of how we run things
              now. We try to keep useful material around, explain the tricky parts properly, and always have another
              problem ready for you to try next.
            </p>
          </div>
          <div className="min-w-0">
            <CyberstartArchiveScroll />
          </div>
        </div>

        <div className="mt-24 border-t border-white/10 pt-14">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">A few milestones along the way</h3>
          <div className="mt-12 lg:pr-6">
            <Timeline />
          </div>
        </div>
      </Wide>
    </section>
  );
}
