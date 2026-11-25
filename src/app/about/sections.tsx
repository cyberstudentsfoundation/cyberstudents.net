import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { GoLaw, GoRepo } from "react-icons/go";
import { HiArrowRight, HiOutlineArchiveBox, HiOutlineGlobeAmericas, HiOutlineRocketLaunch } from "react-icons/hi2";

import countriesChart from "~/../public/advent-of-ctf-2024/countries-geo-chart.png";
import { ExternalIcon, Heading, TextLink, Wide } from "~/app/_home/ui";
import { site } from "~/data/site";
import { cn } from "~/lib/utils";
import { MemberGrowth } from "~/components/MemberGrowth";
import { CopyCommand } from "./CopyCommand";

/**
 * "Our vision", carried over from the Advent of CTF 2025 page, with the first paragraph updated so it no longer
 * promises things that are not built yet. Only the short titles are new.
 */
const PILLARS = [
  {
    icon: HiOutlineArchiveBox,
    title: "Free to practice, for good",
    text: (
      <>
        Advent of CTF challenges, along with all of our other challenges, stay available for free in our{" "}
        <Link
          href="/challenges"
          className="font-semibold text-white underline decoration-cyan-300/50 underline-offset-4 hover:decoration-cyan-300"
        >
          challenge archive
        </Link>{" "}
        for players, teams, and educators to practice and learn from. Each category is aligned with educational
        frameworks, so the challenges can be used alongside coursework.
      </>
    ),
  },
  {
    icon: HiOutlineRocketLaunch,
    title: "From learning to doing",
    text: (
      <>
        Our goal is to streamline the process of learning cybersecurity skills (and related concepts) for students, and
        then applying them in real-world scenarios, such as preparing for practical certifications, competitions, and
        working in the industry.
      </>
    ),
  },
  {
    icon: HiOutlineGlobeAmericas,
    title: "For students everywhere",
    text: (
      <>
        We are committed to providing our resources to help students of all backgrounds worldwide understand and
        practice cybersecurity skills, especially through interdisciplinary and diverse approaches.
      </>
    ),
  },
];

export function Vision() {
  return (
    <section id="vision" aria-labelledby="vision-title" className="relative scroll-mt-20 overflow-hidden bg-[#050911]">
      {/* The 2024 player map, very faint, behind the section: the "worldwide" part of the vision, in real data. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[60%] opacity-[0.16] mix-blend-screen grayscale lg:block"
        style={{ maskImage: "radial-gradient(ellipse 60% 55% at 60% 45%, black 35%, transparent 75%)" }}
      >
        <Image src={countriesChart} alt="" fill sizes="60vw" className="object-contain object-right" />
      </div>
      <Wide className="relative py-20 sm:py-28">
        <div className="max-w-3xl">
          <Heading id="vision-title" className="text-white">
            Our vision
          </Heading>
          <p className="mt-6 text-2xl leading-snug font-medium text-gray-100 sm:text-3xl">
            We want learning cybersecurity to lead somewhere real, whether that&rsquo;s a certification, a competition,
            or a first job in the field.
          </p>
        </div>
        <ol className="mt-14 grid gap-5 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <li
              key={p.title}
              className={cn(
                "relative rounded-2xl border border-white/10 bg-[#0c1420]/90 p-6 backdrop-blur-sm sm:p-7",
                i === 1 && "lg:translate-y-6",
                i === 2 && "lg:translate-y-12",
              )}
            >
              <span
                aria-hidden="true"
                className="absolute top-5 right-6 font-mono text-5xl font-bold text-white/[0.06]"
              >
                0{i + 1}
              </span>
              <span className="flex size-12 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                <p.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-white">{p.title}</h3>
              <p className="mt-3 leading-7 text-gray-300">{p.text}</p>
            </li>
          ))}
        </ol>
      </Wide>
    </section>
  );
}

const LANG = {
  TypeScript: "bg-[#3178c6]",
  C: "bg-[#555555]",
} as const;

const REPOS: {
  name: string;
  text: string;
  language: keyof typeof LANG;
  license: string;
  facts: string[];
  href: string;
  featured?: boolean;
}[] = [
  {
    name: "cyberstudents.net",
    text: "The website you're reading and the Advent of CTF platform behind it, from the challenge browser to the leaderboards and the admin dashboard.",
    language: "TypeScript",
    license: "Apache-2.0",
    facts: ["20,000+ lines", "Next.js and tRPC"],
    href: site.repos.website,
    featured: true,
  },
  {
    name: "Advent-of-CTF",
    text: "Every 2024 challenge with its description, hints, and files, plus the write-up its author picked.",
    language: "C",
    license: "CC-BY-4.0",
    facts: ["25 challenges"],
    href: site.repos.adventWriteUps,
  },
  {
    name: "csd-ctf",
    text: "All six rounds of Daily CTF, with every challenge and an official write-up for each one.",
    language: "C",
    license: "CC-BY-4.0",
    facts: ["55 challenges"],
    href: site.repos.dailyCtfArchive,
  },
  {
    name: "cyberstudents-ctf",
    text: "The Discord bot that ran Daily CTF, with a wizard for publishing challenges, player profiles, and leaderboards.",
    language: "TypeScript",
    license: "Apache-2.0",
    facts: ["Discord.js"],
    href: site.repos.dailyCtfBot,
  },
];

const FEATURES = [
  "Sign in with Discord or Google",
  "Challenges and hints released on a timer",
  "Dynamic scoring",
  "Leaderboards for every division",
  "Student verification for prizes",
  "Write-ups and a public flag checker",
];

// Counted from the repositories on 2026-11-23: TypeScript lines under src/ in cyberstudents.net, tRPC procedures under
// src/server, and challenge folders in Advent-of-CTF (2024) and csd-ctf (six rounds).
const CODE_FIGURES = [
  { value: "20,000+", label: "Lines of TypeScript in this site" },
  { value: "25", label: "API routes behind the platform" },
  { value: "80", label: "Challenges you can download" },
];

const STACK = ["Next.js", "React", "tRPC", "Prisma", "PostgreSQL", "NextAuth", "Tailwind CSS"];

function RepoCard({ repo }: { repo: (typeof REPOS)[number] }) {
  return (
    <a
      href={repo.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex h-full min-w-0 flex-col rounded-xl border border-white/10 bg-[#0d1117] p-5 transition-all hover:border-white/25 motion-safe:hover:-translate-y-0.5",
        repo.featured && "border-cyan-300/30 hover:border-cyan-300/60",
      )}
    >
      {/* On phones the owner goes on its own line, so the repo name is never cut off and the card never grows wider
          than the screen. From sm up it reads owner/repo on one line, like GitHub. */}
      <span className="flex min-w-0 items-start gap-2 sm:items-center">
        <GoRepo className="mt-1 size-4 shrink-0 text-gray-400 sm:mt-0" aria-hidden="true" />
        <span className="min-w-0 font-semibold break-words text-[#4493f8] group-hover:underline sm:truncate">
          <span className="block text-sm font-normal sm:inline sm:text-base">cyberstudentsfoundation/</span>
          {repo.name}
        </span>
        <span className="ml-auto shrink-0 rounded-full border border-white/15 px-2 text-xs font-medium text-gray-400">
          Public
        </span>
      </span>
      <span className="mt-3 block flex-1 text-sm leading-6 text-gray-300">{repo.text}</span>
      <span className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className={cn("size-3 rounded-full", LANG[repo.language])} />
          {repo.language}
        </span>
        <span className="flex items-center gap-1">
          <GoLaw className="size-3.5" aria-hidden="true" />
          {repo.license}
        </span>
        {repo.facts.map((f) => (
          <span key={f}>{f}</span>
        ))}
        <ExternalIcon className="ml-auto text-gray-500 group-hover:text-gray-300" />
      </span>
    </a>
  );
}

export function OpenSource() {
  return (
    <section
      id="open-source"
      aria-labelledby="open-source-title"
      className="relative scroll-mt-20 overflow-hidden bg-[#111b29]"
    >
      {/* The GitHub mark, big and faint, drifting in the corner. */}
      <FaGithub
        aria-hidden="true"
        className="motion-safe:animate-float1 pointer-events-none absolute -top-16 -right-20 size-[26rem] -rotate-12 text-white/[0.035] sm:-right-10"
      />
      <Wide className="relative py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <Heading id="open-source-title" className="text-white">
              We{" "}
              <span role="img" aria-label="love">
                🩵
              </span>{" "}
              open source
            </Heading>
            <div className="mt-6 space-y-4 text-lg leading-8 text-gray-300">
              <p>
                Just about everything we make is public on GitHub. You can read the code behind the platform
                you&rsquo;re using right now, look through how every one of our challenges was built, or run our Discord
                bot on your own server. Our challenges and write-ups are shared under Creative Commons, so teachers and
                clubs are welcome to use them, too.
              </p>
              <p>
                Edward Z. (GodderE2D) built this website and the competition platform behind Advent of CTF, while both
                of our co-founders look after the servers that host our challenges. You can read about how that setup
                has grown in our <TextLink href="/news">newsroom</TextLink>.
              </p>
            </div>
            <div className="mt-8">
              <CopyCommand command={`git clone ${site.repos.website}.git`} />
            </div>
          </div>

          <div className="min-w-0">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="flex items-center gap-2 font-semibold text-white">
                <FaGithub className="size-5" aria-hidden="true" />
                What the platform does
              </p>
              <ul className="mt-4 grid gap-x-6 gap-y-2 text-sm text-gray-300 sm:grid-cols-2">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-300" />
                    {f}
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-5">
                {STACK.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-gray-300"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {CODE_FIGURES.map((f) => (
                <div key={f.label} className="flex flex-col border-t border-white/15 pt-3">
                  <dt className="order-2 mt-1 text-sm leading-5 text-gray-400">{f.label}</dt>
                  <dd className="order-1 text-3xl font-bold text-white tabular-nums sm:text-4xl">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {REPOS.map((r) => (
            <li key={r.name} className="min-w-0">
              <RepoCard repo={r} />
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white transition-colors hover:bg-white/10"
          >
            <FaGithub className="size-5" aria-hidden="true" />
            Visit us on GitHub
            <HiArrowRight className="size-4" aria-hidden="true" />
          </a>
        </p>
      </Wide>
    </section>
  );
}

/** Where the timeline leaves off: the server's growth over the last few months, from Discord Server Insights. */
export function StillGrowing({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid gap-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16",
        className,
      )}
    >
      <div>
        <h3 className="text-2xl font-bold text-white sm:text-3xl">Still growing</h3>
        <p className="mt-5 text-lg leading-8 text-gray-300">
          Our Discord server keeps growing, with about 100 new members joining us every month. We&rsquo;d love for you
          to be one of the next ones!
        </p>
        {/* <p className="mt-4 text-sm leading-6 text-gray-500">From Discord Server Insights, summer and fall 2026.</p> */}
      </div>
      <MemberGrowth />
    </div>
  );
}
