/**
 * my todo list
 * codex do not use
 * sponsor display at the bottom work with us section (maybe)
 * and also the advent of ctf section
 * remove daily challenges & annual events; maybe replace with stats
 * arrow style consistency
 * change EXPLORE text color in navbar
 * reduce padding on live talks section (and lots of other places)
 * consider making timeline 2 rows? (with scavenger hunt-like pathway)
 * button color on 'Explore 2025' in advent section
 * update the 2024 + 2025 to smth else
 * revise all the taglines
 * revise font? is serif the right choice
 * revise combined prize pool figure (round up?) - also change to like 'Prizes given'
 * add hard/medium/easy labeling to carousel (idk maybe - is that in our philosophy)
 * shorten each carousel desc so they fit
 * update HS/college & countries figure
 * make pictures in carousel bigger if you click on it
 * the top 2 arrows in diagram have no space between box but the bottom 2 does
 * trademark notice; pilot notice adjust
 * change to AP (r) aligned cert instead of just aligned
 * revise em dash in caption below scrolling image
 *
 * "community write-ups" verb consistency
 * switch summer '24 & '25 in timeline
 */

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Binary,
  CalendarDays,
  Code2,
  ExternalLink,
  Flag,
  Gamepad2,
  Globe,
  Handshake,
  KeyRound,
  Library,
  Mic,
  Network,
  Search,
} from "lucide-react";

import ChallengesCarousel from "~/app/ctf/carousel";
import CyberstartArchiveScroll from "~/app/cyberstart-archive-scroll";
import DailyCTFImages from "~/app/daily-ctf-images";
import { HomePathwayDiagram } from "~/app/home-pathway-diagram";
import { HomeTalksGallery } from "~/app/home-talks-gallery";
import CustomSnowfall from "~/app/advent/2025/custom-snowfall";
import SnowBackground from "~/app/advent/2025/snow-background";
import LiquidGlassButton from "~/components/LiquidGlassButton";
import PhraseTransitions from "~/components/PhraseTransitions";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import background from "~/../public/background.png";
import cyberstartCover from "~/../public/cyberstart-cover.png";
import apisecLogo from "~/../public/apisec.png";
import ctfguideLogo from "~/../public/ctfguide.png";
import genxyzLogo from "~/../public/genxyz.svg";
import ottersecLogo from "~/../public/ottersec.png";
import verialabsLogo from "~/../public/verialabs.png";

const sectionLinks = [
  { label: "Advent of CTF", href: "#advent" },
  { label: "AP® pathways", href: "#ap-cybersecurity" },
  { label: "CTF Gym", href: "#ctf-gym" },
  { label: "Daily CTF", href: "#daily-ctf" },
  { label: "Live talks", href: "#talks" },
  { label: "Our history", href: "#history" },
] as const;

const ctfCategories = [
  { name: "Web", icon: Globe },
  { name: "Crypto", icon: KeyRound },
  { name: "Forensics", icon: Search },
  { name: "Reversing", icon: Code2 },
  { name: "Pwn", icon: Binary },
  { name: "OSINT + Misc", icon: Network },
] as const;

const adventSponsors = [
  {
    name: "Veria Labs",
    href: "https://verialabs.com/",
    logo: verialabsLogo,
    className: "h-8 brightness-0 sm:h-9 mb-4",
  },
  {
    name: "CTFGuide",
    href: "https://ctfguide.com/",
    logo: ctfguideLogo,
    className: "h-5 brightness-0 sm:h-6",
  },
  {
    name: "APIsec University",
    href: "https://www.apisecuniversity.com/",
    logo: apisecLogo,
    className: "h-7 sm:h-8",
  },
  {
    name: "gen.xyz",
    href: "https://gen.xyz/",
    logo: genxyzLogo,
    className: "h-10",
  },
  {
    name: "OtterSec",
    href: "https://osec.io/",
    logo: ottersecLogo,
    className: "h-7 sm:h-8",
  },
] as const;

const timeline = [
  {
    date: "Dec 2, 2021",
    dateTime: "2021-12-02",
    title: "CyberStudents begins",
    description: "Founded as a place to solve CyberStart challenges together.",
  },
  {
    date: "Jan 13, 2024",
    dateTime: "2024-01-13",
    title: "A wider mission",
    description: "After CyberStart closed, we expanded into our own Daily CTFs.",
  },
  {
    date: "Summer 2024",
    dateTime: "2024-06",
    title: "Curriculum work starts",
    description: "Began developing AP-aligned lessons, labs, and framework mappings.",
  },
  {
    date: "Dec 1, 2024",
    dateTime: "2024-12-01",
    title: "The first Advent",
    description: "Welcomed 780 players from 85 countries to 25 daily challenges.",
  },
  {
    date: "Summer 2025",
    dateTime: "2025-06",
    title: "Learning goes live",
    description: "Hosted InfoSec Growth Sessions and community webinars.",
  },
  {
    date: "Dec 1, 2025",
    dateTime: "2025-12-01",
    title: "Advent returns",
    description: "Released 25 new challenges with more than $12K in prizes.",
  },
  {
    date: "Summer 2026",
    dateTime: "2026-06",
    title: "The next chapter",
    description: "AP® Cybersecurity curriculum and practical labs arrive.",
    upcoming: true,
  },
] as const;

function ScreenshotPlaceholder({
  label,
  title,
  dark = false,
  className,
}: {
  label: string;
  title: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${title} screenshot placeholder`}
      data-screenshot-slot={label}
      className={cn(
        "relative flex aspect-video min-h-56 flex-col overflow-hidden rounded-2xl border border-dashed",
        dark ? "border-white/15 bg-white/[0.025]" : "border-slate-300 bg-white",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-10 shrink-0 items-center gap-1.5 border-b px-4",
          dark ? "border-white/10" : "border-slate-200",
        )}
      >
        <span className={cn("size-2 rounded-full", dark ? "bg-white/15" : "bg-slate-300")} />
        <span className={cn("size-2 rounded-full", dark ? "bg-white/15" : "bg-slate-300")} />
        <span className={cn("size-2 rounded-full", dark ? "bg-white/15" : "bg-slate-300")} />
        <span className={cn("ml-3 h-4 w-24 rounded-full", dark ? "bg-white/[0.06]" : "bg-slate-100")} />
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-10 top-16 bg-[linear-gradient(90deg,currentColor_1px,transparent_1px),linear-gradient(currentColor_1px,transparent_1px)] bg-[size:28px_28px]",
          dark ? "text-white/[0.025]" : "text-slate-950/[0.025]",
        )}
      />
      <div className="relative flex flex-1 flex-col items-center justify-center p-8 text-center">
        <p className={cn("font-mono text-xs tracking-[0.14em] uppercase", dark ? "text-cyan-300/70" : "text-cyan-700")}>
          {label}
        </p>
        <p className={cn("mt-2 font-medium", dark ? "text-gray-300" : "text-slate-600")}>{title}</p>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <main className="bg-[#050911] text-gray-100">
      <section className="relative bg-gray-950">
        <div className="pointer-events-none absolute inset-0 max-h-[38rem] w-full opacity-30">
          <Image src={background} alt="" className="object-cover" fill priority />
        </div>
        <div className="relative mx-auto flex min-h-[31rem] w-full max-w-(--breakpoint-2xl) items-center justify-center px-4 py-20 sm:min-h-[31rem] sm:px-8 sm:py-28 md:px-10 xl:px-20">
          <div className="mx-auto w-full max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-xl)">
            <div className="mx-auto w-full max-w-(--breakpoint-lg)">
              <h1 className="group h-20 font-serif text-4xl transition-all sm:h-[6.0625rem] sm:text-5xl lg:h-[3.0625rem]">
                Learn and grow <br className="lg:hidden" />
                <PhraseTransitions />
              </h1>
              <p className="mt-8 text-lg leading-8 text-gray-200 sm:text-xl">
                Talk, connect, and grow with others interested in learning and advancing in cybersecurity. Whether
                you&rsquo;re in high school, college, or beyond, you&rsquo;ll fit right into a global community of
                students and professionals.
              </p>
              <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                <LiquidGlassButton
                  href="https://discord.com/invite/cyberstudents-916144903686336513"
                  target="_blank"
                  className="flex items-center gap-1 text-lg"
                >
                  Join us on Discord
                  <ExternalLink className="ml-1 size-3.5" aria-hidden="true" />
                </LiquidGlassButton>
                <dl className="grid grid-cols-3 gap-6 sm:gap-10">
                  <div className="flex flex-col">
                    <dt className="order-2 mt-0.5 text-sm text-gray-300">members</dt>
                    <dd className="order-1 text-2xl font-semibold text-white sm:text-3xl">5,000+</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="order-2 mt-0.5 text-sm text-gray-300">in HS/college</dt>
                    <dd className="order-1 text-2xl font-semibold text-white sm:text-3xl">2,200+</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="order-2 mt-0.5 text-sm text-gray-300">countries</dt>
                    <dd className="order-1 text-2xl font-semibold text-white sm:text-3xl">130+</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav
        aria-label="Homepage sections"
        className="sticky top-14 z-20 border-y border-gray-800 bg-gray-900/75 backdrop-blur-lg"
      >
        <div className="mx-auto w-full max-w-(--breakpoint-2xl) overflow-x-auto px-4 sm:px-8 md:px-10 xl:px-20">
          <div className="flex min-w-max items-center">
            <span className="mr-2 hidden border-r border-gray-700 pr-5 font-mono text-xs font-semibold tracking-[0.14em] text-gray-200 uppercase sm:block">
              Explore
            </span>
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b-2 border-transparent px-3 py-3.5 text-sm font-medium text-gray-300 transition-colors hover:border-cyan-300 hover:text-white focus-visible:border-cyan-300 focus-visible:text-white focus-visible:outline-none sm:px-4"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="advent" className="scroll-mt-28">
        <div className="relative overflow-hidden bg-[linear-gradient(90deg,#dadbee_0%,#f3f7fe_100%)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#030712_0%,#030712_58%,transparent_92%)]"
          />
          <CustomSnowfall style={{ position: "absolute", inset: 0, zIndex: 2 }} />
          <div className="pointer-events-none absolute inset-0 z-[1]">
            <SnowBackground className="h-full w-full hue-rotate-[270deg]" viewBox="0 -300 3839.988 2160" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-(--breakpoint-2xl) px-4 pt-20 pb-44 sm:px-8 sm:pt-20 sm:pb-48 md:px-10 xl:px-20">
            <div className="max-w-3xl">
              <p className="font-mono text-sm tracking-[0.14em] text-cyan-300 uppercase">
                Capture the flag competition
              </p>
              <h2 className="mt-4 font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl">
                advent of ctf
                <span className="mt-2 block font-sans text-2xl font-light text-cyan-300 sm:ml-5 sm:inline sm:text-3xl">
                  2024 &ndash; 2025
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
                Since 2024, we&rsquo;ve hosted a month-long CTF (gamified cybersecurity puzzles) competition focused on
                beginners every December, with increasingly difficult challenges as the month goes on. All 25 challenges
                each year include space to learn, ask questions, and community write-ups.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-cyan-200! text-gray-950! hover:bg-cyan-100!">
                  <Link href="/advent/2025">
                    Explore 2025
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20! bg-white/5! text-white! hover:bg-white/10!"
                >
                  <Link href="/advent/2024/results">See 2024 results</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[linear-gradient(90deg,#dadbee_0%,#f3f7fe_100%)] text-slate-950">
          <div className="mx-auto w-full max-w-(--breakpoint-2xl) px-4 py-16 sm:px-8 sm:py-24 md:px-10 xl:px-20">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16">
              <div>
                <p className="font-mono text-sm tracking-[0.14em] text-cyan-700 uppercase">Across both events</p>
                <h3 className="mt-4 font-serif text-4xl leading-tight text-slate-950 sm:text-5xl">
                  A competition built to keep teaching.
                </h3>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Challenges progress across the month, with hints, community support, and public write-ups helping each
                  solve become something learners can use again.
                </p>

                <dl className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                  <div className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="text-slate-600">Daily challenges</dt>
                    <dd className="font-mono text-2xl font-semibold text-slate-950">50</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="text-slate-600">Combined prize pool</dt>
                    <dd className="font-mono text-2xl font-semibold text-cyan-700">$12,300+</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="text-slate-600">Annual events</dt>
                    <dd className="font-mono text-2xl font-semibold text-slate-950">2</dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <p className="text-sm font-semibold text-slate-500 uppercase">Challenge categories</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ctfCategories.map((category) => {
                      const Icon = category.icon;

                      return (
                        <span
                          key={category.name}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                        >
                          <Icon className="size-4 text-cyan-700" aria-hidden="true" />
                          {category.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-6">
                {/* Replace this frame with the custom CTF interface screenshot when it is ready. */}
                <ScreenshotPlaceholder label="Platform screenshot" title="Custom-built Advent of CTF interface" />

                {/* <div className="rounded-2xl border border-slate-200/80 bg-white/65 px-5 py-4 shadow-sm backdrop-blur-sm sm:px-6"> */}
                <div className="px-5 py-4 sm:px-6">
                  <div className="mb-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
                    {adventSponsors.map((sponsor) => (
                      <a
                        key={sponsor.name}
                        href={sponsor.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={sponsor.name}
                        className="flex min-h-10 items-center opacity-75 grayscale transition-all hover:opacity-100 hover:grayscale-0 focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-4 focus-visible:outline-none"
                      >
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className={cn("w-auto max-w-32 object-contain", sponsor.className)}
                        />
                      </a>
                    ))}
                  </div>
                  <p className="text-center text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase">
                    Advent of CTF sponsors
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-20 border-t border-slate-200 pt-14">
              <div className="max-w-2xl">
                <p className="font-mono text-sm tracking-[0.14em] text-cyan-700 uppercase">
                  Selected challenges from our archive
                </p>
                <h3 className="mt-3 font-serif text-3xl text-slate-950 sm:text-4xl">
                  See what players worked through.
                </h3>
                <p className="mt-4 leading-7 text-slate-600">
                  Browse a few challenge write-ups from Advent and Daily CTF. The full archive remains available after
                  the competition ends.
                </p>
              </div>
              <div className="mt-10 px-9 sm:px-12">
                <ChallengesCarousel variant="home" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ap-cybersecurity" className="scroll-mt-28 border-y border-white/8 bg-[#111b29]">
        <div className="mx-auto w-full max-w-(--breakpoint-2xl) px-4 py-20 sm:px-8 sm:py-28 md:px-10 xl:px-20">
          <div className="max-w-4xl">
            <p className="font-mono text-sm tracking-[0.14em] text-cyan-300 uppercase">
              AP&reg; Cybersecurity and beyond
            </p>
            <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">The course is a starting point.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              We&rsquo;re developing practical lessons and labs that sit alongside AP&reg; Cybersecurity and AP&reg;
              Networking, reinforce the skills behind Security+ and Network+, and give students more places to use what
              they learn.
            </p>
          </div>

          <div className="mt-12">
            <HomePathwayDiagram />
          </div>

          <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-6 text-gray-500">
            Current College Board timing: AP&reg; Cybersecurity launches nationally in fall 2026; AP&reg; Networking
            enters its final pilot in 2026–27 before national availability in 2027–28.
          </p>
        </div>
      </section>

      <section id="ctf-gym" className="scroll-mt-28 bg-[linear-gradient(90deg,#dadbee_0%,#f3f7fe_100%)] text-slate-950">
        <div className="mx-auto grid w-full max-w-(--breakpoint-2xl) gap-12 px-4 py-20 sm:px-8 sm:py-28 md:px-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-20 xl:px-20">
          <div>
            <p className="font-mono text-sm tracking-[0.14em] text-cyan-700 uppercase">CTF Gym</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-slate-950 sm:text-5xl">
              Practice <span className="text-cyan-700">279 challenges</span> in one place.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              The Gym brings our challenge history together so a problem does not disappear when a round or event ends.
              Work at your own pace, revisit unfamiliar topics, and use the archive as a club activity or a personal
              practice plan.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
              <p className="text-sm font-semibold text-slate-500 uppercase">Inside the Gym</p>
            </div>
            <div className="divide-y divide-slate-200">
              <div className="flex gap-4 px-5 py-5 sm:px-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <CalendarDays className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-950">Advent of CTF 2024 + 2025</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Every daily challenge from both December events.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 px-5 py-5 sm:px-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <Flag className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-950">Daily CTF rounds</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Community challenges built for regular practice throughout the year.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 px-5 py-5 sm:px-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <Library className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-950">CyberStart archive</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Preserved challenges from the community where CyberStudents began.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="daily-ctf" className="scroll-mt-28 overflow-x-clip border-y border-white/8 bg-[#050911]">
        <div className="mx-auto grid w-full max-w-(--breakpoint-2xl) gap-14 px-4 py-20 sm:px-8 sm:py-28 md:px-10 xl:grid-cols-[0.7fr_1.3fr] xl:items-center xl:gap-16 xl:px-20">
          <div className="max-w-xl">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/8">
              <CalendarDays className="size-5 text-cyan-200" aria-hidden="true" />
            </div>
            <p className="mt-6 font-mono text-sm tracking-[0.14em] text-cyan-300 uppercase">Daily CTF</p>
            <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">Keep a challenge in your routine.</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Work through beginner-friendly challenges throughout the year, compare approaches with other learners, and
              follow each round from first solve to community write-up.
            </p>
            <Button asChild className="mt-8 bg-gray-100! text-gray-950! hover:bg-white!">
              <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank" rel="noreferrer">
                Play in our Discord
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
          <div className="min-w-0 pb-8">
            <DailyCTFImages />
          </div>
        </div>
      </section>

      <section id="talks" className="scroll-mt-28 overflow-hidden border-b border-white/8 bg-[#111b29]">
        <div className="mx-auto w-full max-w-(--breakpoint-2xl) px-4 pt-16 sm:px-8 sm:pt-20 md:px-10 xl:px-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-300/8">
              <Mic className="size-5 text-violet-200" aria-hidden="true" />
            </div>
            <p className="mt-6 font-mono text-sm tracking-[0.14em] text-cyan-300 uppercase">Live and community-led</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">
              Talks from professionals and peers.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              InfoSec Growth Sessions, webinars, and informal community talks give members a place to hear how others
              learn, work, and find their way through cybersecurity—and to ask questions live.
            </p>
            <p className="mt-5 max-w-2xl leading-7 text-gray-400">
              We also make room for games and lighter community events. Not every useful connection starts with a
              lecture or a leaderboard.
            </p>
            <div className="mt-7 flex items-center justify-center gap-3 text-sm text-gray-400">
              <Gamepad2 className="size-4 text-cyan-300" aria-hidden="true" />
              Community games, seasonal events, and prize nights
            </div>
          </div>
        </div>

        {/* Replace these labeled slots with session and community-event images. */}
        <div className="mt-10 pb-16 sm:mt-12 sm:pb-20">
          <HomeTalksGallery />
        </div>
      </section>

      <section id="history" className="scroll-mt-28 bg-[#050911]">
        <div className="mx-auto w-full max-w-(--breakpoint-2xl) px-4 py-20 sm:px-8 sm:py-28 md:px-10 xl:px-20">
          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-20">
            <div>
              <Image
                src={cyberstartCover}
                alt="CyberStart"
                className="mb-6 w-52 rounded-xl border border-white/10 opacity-80"
              />
              <p className="font-mono text-sm tracking-[0.14em] text-cyan-300 uppercase">Where we started</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">
                From CyberStart to CyberStudents.
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                CyberStudents began on December 2, 2021 as a community for learners working through CyberStart
                challenges. When CyberStart closed, the platform changed—but the habit of learning together stayed.
              </p>
              <p className="mt-5 leading-7 text-gray-400">
                That history still shapes the work today: preserve useful material, explain the hard parts, and give
                people another problem to try.
              </p>
            </div>
            <div className="min-w-0 pb-10">
              <CyberstartArchiveScroll />
            </div>
          </div>

          <div className="mt-24 border-t border-white/10 pt-14">
            <div className="max-w-2xl">
              <p className="font-mono text-sm tracking-[0.14em] text-cyan-300 uppercase">Our history</p>
              <h3 className="mt-3 font-serif text-3xl text-white sm:text-4xl">A few milestones along the way.</h3>
            </div>

            <ol className="relative mt-12 grid gap-8 pl-8 before:absolute before:top-2 before:bottom-2 before:left-[0.31rem] before:border-l before:border-white/15 lg:grid-cols-7 lg:gap-5 lg:pl-0 lg:before:top-[0.35rem] lg:before:right-0 lg:before:bottom-auto lg:before:left-0 lg:before:border-t lg:before:border-l-0">
              {timeline.map((event) => (
                <li key={event.date} className="relative flex min-w-0 flex-col">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-0 -left-[1.93rem] size-3 rounded-full border-2 border-[#050911] lg:left-0",
                      "upcoming" in event && event.upcoming
                        ? "bg-violet-300 shadow-[0_0_0_4px_rgba(196,181,253,0.1)]"
                        : "bg-cyan-300",
                    )}
                  />
                  <time
                    dateTime={event.dateTime}
                    className="block font-mono text-xs tracking-[0.1em] text-cyan-300 uppercase lg:mt-7"
                  >
                    {event.date}
                  </time>
                  <h4 className="mt-2 font-semibold text-white">{event.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{event.description}</p>
                  <div className="mt-auto pt-4">
                    <div
                      role="img"
                      aria-label={`${event.title} milestone image placeholder`}
                      data-milestone-image-slot={event.dateTime}
                      className="flex aspect-video w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.035] px-3 text-center font-mono text-[0.65rem] tracking-[0.12em] text-gray-500 uppercase lg:aspect-[4/3]"
                    >
                      Add milestone image
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/8 bg-[#111b29]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(34,211,238,0.12),transparent_38%)]"
        />
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-8 sm:py-28">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/8">
            <Handshake className="size-6 text-cyan-200" aria-hidden="true" />
          </div>
          <h2 className="mt-7 font-serif text-4xl text-white sm:text-5xl">Build the next step with us.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Students, educators, challenge developers, mentors, and partners all shape this work. Bring a question, a
            lesson idea, or a skill you want to share—we&rsquo;ll help turn it into something useful.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-cyan-200! px-6 text-gray-950! hover:bg-cyan-100!">
              <a href="mailto:admin@cyberstudents.net">
                Work with CyberStudents
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/15! bg-white/5! px-6 text-white! hover:bg-white/10!"
            >
              <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank" rel="noreferrer">
                Join the community
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
