import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

import CustomSnowfall from "~/app/advent/2025/custom-snowfall";
import SnowBackground from "~/app/advent/2025/snow-background";
import { advent2024 } from "~/data/advent-2024";
import { advent2025, advent2025Href } from "~/data/advent-2025";
import { writeUpsFor } from "~/data/writeups";
import { AdventCalendar, CategoryLegend, type CalendarItem } from "./AdventCalendar";
import { CountUp, TabbedSlides } from "./motion";
import { PlatformDemo } from "./PlatformDemo";
import { SponsorLogos } from "./Sponsors";
import { TextLink, Wide } from "./ui";

const FIGURES = [
  { value: "50", label: "Challenges written by our team" },
  { value: "2,000+", label: "Players have joined in" },
  { value: "100+", label: "Countries represented" },
  { value: "$12,000+", label: "In prizes and vouchers" },
];

const DEMO_CAPTION =
  "A replay of Day 2 of 2025, The First Strike, where the flag hides in a packet capture full of failed FTP logins. The challenge, its flag, and the scoring formula are real, while the other players and the solve counts are made up for the demo.";

/** The night-to-snow band from the Codex homepage, used by the homepage and /advent. */
export function SnowBand({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[linear-gradient(90deg,#dadbee_0%,#f3f7fe_100%)] ${className ?? ""}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#030712_0%,#030712_58%,transparent_92%)]"
      />
      <CustomSnowfall style={{ position: "absolute", inset: 0, zIndex: 2 }} />
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <SnowBackground className="h-full w-full hue-rotate-[270deg]" viewBox="0 -300 3839.988 2160" />
      </div>
      {/* The illustration's snow is a little bluer in the middle than the flat gradient that continues below it, and
          its trees run off the bottom edge. Fading the flat gradient in over the last stretch hides both, whatever
          the width. The eased stops keep the fade from showing as a band. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-40 bg-[linear-gradient(90deg,#dadbee_0%,#f3f7fe_100%)] sm:h-56"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgb(0 0 0 / 0.08) 20%, rgb(0 0 0 / 0.3) 45%, rgb(0 0 0 / 0.7) 72%, black 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CalendarSlide({
  year,
  items,
  href,
  linkText,
  note,
}: {
  year: number;
  items: CalendarItem[];
  href: string;
  linkText: string;
  note?: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="text-xl font-bold text-slate-950">December {year}, one challenge a day</h3>
        <TextLink href={href} tone="light" className="text-sm font-medium">
          {linkText}
        </TextLink>
      </div>
      <AdventCalendar className="mt-4" year={year} items={items} />
      {note && <p className="mt-2 text-xs text-slate-500">{note}</p>}
    </div>
  );
}

function calendarSlides() {
  const slides = [
    {
      label: "2024",
      content: (
        <CalendarSlide
          year={2024}
          href="/advent/2024/challenges"
          linkText="Play the 2024 challenges"
          // note="Each day opens its official write-up on GitHub, and the pencil shows how many players wrote their own."
          items={advent2024.map((c) => ({
            day: c.day,
            title: c.title,
            category: c.category,
            points: c.points,
            author: c.author,
            href: c.writeUpHref,
            writeUps: writeUpsFor(2024, c.day, c.title).length,
          }))}
        />
      ),
    },
  ];
  if (advent2025.length > 0) {
    slides.push({
      label: "2025",
      content: (
        <CalendarSlide
          year={2025}
          href="/advent/2025/challenges"
          linkText="Play the 2025 challenges"
          // note="Each day opens in our challenge browser, and the pencil shows how many players wrote it up."
          items={advent2025.map((c) => ({
            day: c.day,
            title: c.title,
            category: c.category,
            author: c.author,
            href: advent2025Href(c),
            writeUps: c.cancelled ? 0 : writeUpsFor(2025, c.day, c.title).length,
            cancelled: c.cancelled,
          }))}
        />
      ),
    });
  }
  return slides;
}

export function Advent() {
  return (
    <section id="advent" aria-labelledby="advent-title" className="scroll-mt-28">
      <SnowBand>
        <Wide className="grid gap-12 pt-20 pb-44 sm:pb-52 xl:grid-cols-[1.25fr_0.75fr] xl:items-start xl:gap-16">
          <div className="max-w-3xl">
            <h2 id="advent-title" className="font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl">
              advent of ctf
              <span className="mt-2 block font-sans text-2xl font-light text-cyan-300 sm:ml-5 sm:inline sm:text-3xl">
                2024 - 2025
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
              Since 2024, we&rsquo;ve hosted Advent of CTF every December, a month-long capture the flag competition
              made with beginners in mind. Each challenge is a gamified cybersecurity puzzle with a hidden flag to find.
              A new one unlocks every day from December 1st to 25th, and they get a little harder as Christmas gets
              closer, so there&rsquo;s always something you can solve and something to stretch for.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/advent/2025"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-200 px-4 py-2 font-semibold text-gray-950 transition-colors hover:bg-cyan-100"
              >
                Explore 2025
                <HiArrowRight className="size-4" aria-hidden="true" />
              </Link>
              {/* <Link
                href="/advent/2024"
                className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-4 py-2 font-semibold text-white transition-colors hover:bg-white/10"
              >
                See the 2024 results
              </Link>
              <Link
                href="/advent"
                className="inline-flex items-center rounded-lg px-2 py-2 font-medium text-gray-200 underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                How it works
              </Link> */}
            </div>
          </div>
          <div className="xl:pt-3">
            <p className="text-sm font-semibold text-gray-300">Advent of CTF 2025 was made possible by our sponsors</p>
            <SponsorLogos className="mt-5 max-w-xl" />
          </div>
        </Wide>
      </SnowBand>

      <div className="bg-[linear-gradient(90deg,#dadbee_0%,#f3f7fe_100%)] text-slate-950">
        <Wide className="grid gap-12 pt-4 pb-16 sm:pb-24 xl:grid-cols-[0.75fr_1.25fr] xl:gap-14">
          <div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              {FIGURES.map((f) => (
                <div key={f.label} className="flex flex-col border-t-2 border-slate-900/80 pt-3">
                  <dt className="order-2 mt-1 text-sm text-slate-600">{f.label}</dt>
                  <dd className="order-1 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                    <CountUp value={f.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 text-lg leading-8 text-slate-700">
              Every challenge comes with two free hints, and our community is always helping each other in the Discord
              throughout the month. Players also compete for prizes for the write-ups they write and publish. Thanks to
              our sponsors, we were able to offer thousands in cash and hundreds of certifications to our players
              worldwide.
            </p>
          </div>

          <div className="min-w-0">
            <TabbedSlides label="Advent of CTF calendars" slides={calendarSlides()} />
            <CategoryLegend className="mt-4" />
          </div>
        </Wide>

        {/* Same edges as the figures and calendar above: the story on the left, the replay filling the rest. */}
        <Wide className="grid gap-8 pb-20 sm:pb-28 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:items-center xl:gap-14">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold text-slate-950 sm:text-3xl">Built by us, from the ground up</h3>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              We built the whole competition platform ourselves, and both years are still open to play. Feel free to
              jump in on any day you like across 100+ challenges. Check out how <em>The First Strike</em> (the challenge
              from Day 2 of 2025) was solved!
            </p>
            <Link
              href="/advent/2025/challenges"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white transition-colors hover:bg-slate-700"
            >
              Try it yourself
              <HiArrowRight className="size-4" aria-hidden="true" />
            </Link>
            {/* <p className="mt-8 hidden border-t border-slate-900/15 pt-4 text-sm leading-6 text-slate-500 xl:block">
              {DEMO_CAPTION}
            </p> */}
          </div>
          <div className="min-w-0">
            <PlatformDemo />
            <p className="mt-3 text-sm text-slate-500 xl:hidden">{DEMO_CAPTION}</p>
          </div>
        </Wide>
      </div>
    </section>
  );
}
