import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  ExternalLink,
  Flag,
  Handshake,
  Library,
  Lightbulb,
  Sparkles,
  Target,
  Users,
  Waypoints,
} from "lucide-react";

import ChallengesCarousel from "~/app/ctf/carousel";
import PathwayDiagram from "~/app/foundation/pathway-diagram";
import { Button } from "~/components/ui/button";

export const metadata: Metadata = {
  title: "CyberStudents Foundation · CyberStudents",
  description:
    "See how CyberStudents turns open cybersecurity learning, practical challenges, and community support into clearer paths toward college, certifications, competitions, and industry.",
};

const impactStats = [
  { value: "3,000+", label: "community members", icon: Users },
  { value: "85+", label: "countries represented", icon: Waypoints },
  { value: "25", label: "challenges in our first Advent", icon: Flag },
  { value: "1,850", label: "solves in Advent 2024", icon: Target },
] as const;

const learningLoop = [
  {
    step: "01",
    title: "Understand",
    description: "Clear concepts, framework context, and approachable starting points.",
    icon: Lightbulb,
  },
  {
    step: "02",
    title: "Practice",
    description: "Hands-on challenges, free hints, write-ups, and community guidance.",
    icon: Flag,
  },
  {
    step: "03",
    title: "Apply",
    description: "Skills that carry into courses, certifications, competitions, and work.",
    icon: Waypoints,
  },
] as const;

const principles = [
  {
    title: "Open by default",
    description:
      "Challenges and write-ups should keep teaching after an event ends. We archive what we build so learners, teams, and educators can return to it.",
    icon: Library,
    accent: "border-cyan-300/20 bg-cyan-300/[0.045] text-cyan-200",
  },
  {
    title: "Practice with context",
    description:
      "A flag is only the beginning. Hints, support, progressively harder problems, and real scenarios help turn a solve into durable understanding.",
    icon: BookOpenCheck,
    accent: "border-violet-300/20 bg-violet-300/[0.045] text-violet-200",
  },
  {
    title: "Learning that leads somewhere",
    description:
      "We connect practical work to NICE, MITRE ATT&CK, and AP Cybersecurity so students can see how today’s lesson relates to their next opportunity.",
    icon: Waypoints,
    accent: "border-amber-300/20 bg-amber-300/[0.045] text-amber-200",
  },
] as const;

const timeline = [
  {
    date: "December 2, 2021",
    dateTime: "2021-12-02",
    title: "CyberStudents begins with CyberStart",
    description:
      "We started as a dedicated community where learners could work through CyberStart challenges together, ask better questions, and keep moving when they got stuck.",
    details: ["Community-founded", "Challenge support"],
    upcoming: false,
  },
  {
    date: "January 13, 2024",
    dateTime: "2024-01-13",
    title: "A platform closes; the mission gets bigger",
    description:
      "The day after CyberStart closed, we began a new chapter as CyberStudents. Instead of centering one platform, we expanded toward our own daily challenges, broader resources, and a community built for the full cybersecurity journey.",
    details: ["Rebranded as CyberStudents", "Daily practice"],
    upcoming: false,
  },
  {
    date: "Summer 2024",
    dateTime: "2024-06",
    title: "Curriculum work moves behind the scenes",
    description:
      "We began shaping practical material around emerging AP cybersecurity coursework and workforce frameworks—building labs that explain not only how something works, but where the skill belongs.",
    details: ["AP-aligned concepts", "NICE + MITRE ATT&CK"],
    upcoming: false,
  },
  {
    date: "December 2024",
    dateTime: "2024-12",
    title: "Our inaugural Advent of CTF reaches the world",
    description:
      "Twenty-five daily challenges brought together 780 players from 85 countries. Across six categories, learners submitted 3,858 attempts and completed 1,850 solves—with free hints and community support throughout the month.",
    details: ["780 players", "85 countries", "1,850 solves"],
    upcoming: false,
  },
  {
    date: "December 2025",
    dateTime: "2025-12",
    title: "Advent returns, bigger and more intentional",
    description:
      "Our second annual event paired progressively harder challenges with two free hints, framework mappings, an open division, and more than $12,000 in student prizes.",
    details: ["Second annual event", "$12K+ in prizes", "Framework mapped"],
    upcoming: false,
  },
  {
    date: "Summer 2026",
    dateTime: "2026-06",
    title: "The bridge becomes a curriculum",
    description:
      "Coming soon: practical lessons and labs designed to sit alongside AP Cybersecurity and the AP Networking pilot, then guide learners toward certifications, college pathways, competitions, and industry work.",
    details: ["In development", "Labs + guided practice"],
    upcoming: true,
  },
] as const;

const frameworkLinks = [
  {
    name: "NICE Workforce Framework",
    href: "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center",
  },
  { name: "MITRE ATT&CK", href: "https://attack.mitre.org/" },
  {
    name: "AP Cybersecurity",
    href: "https://apcentral.collegeboard.org/courses/ap-career-kickstart/credentials/ap-cybersecurity",
  },
] as const;

export default function FoundationPage() {
  return (
    <main className="overflow-hidden bg-[#060910] text-gray-100">
      <section className="relative border-b border-white/8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(34,211,238,0.15),transparent_27%),radial-gradient(circle_at_88%_35%,rgba(139,92,246,0.12),transparent_30%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,auto,42px_42px,42px_42px]"
        />
        <div className="relative mx-auto grid w-full max-w-(--breakpoint-2xl) gap-14 px-4 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28 md:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20 xl:px-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1.5 font-mono text-xs tracking-[0.16em] text-cyan-200 uppercase">
              <Sparkles className="size-3.5" aria-hidden="true" />
              CyberStudents Foundation
            </div>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight text-balance text-white sm:text-6xl xl:text-7xl">
              From your first flag to{" "}
              <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                what comes next.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
              CyberStudents makes cybersecurity learning practical, open, and connected. We turn community knowledge
              into challenges, labs, and pathways that help learners move from understanding a concept to using it with
              confidence.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="bg-cyan-200 px-6 text-base font-semibold text-gray-950 hover:bg-cyan-100"
              >
                <Link href="#history">
                  See how we got here
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/15 bg-white/5 px-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank" rel="noreferrer">
                  Join the community
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-cyan-400/8 blur-3xl" />
            <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-black/25 p-5 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-7">
              <div className="mb-6 flex items-center justify-between border-b border-white/8 pb-4">
                <div>
                  <p className="font-mono text-xs tracking-[0.16em] text-cyan-300 uppercase">Our learning loop</p>
                  <p className="mt-1 text-sm text-gray-400">Every program should move learners forward.</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Waypoints className="size-5 text-cyan-200" aria-hidden="true" />
                </div>
              </div>
              <ol className="space-y-3">
                {learningLoop.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.step} className="relative">
                      {index < learningLoop.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute top-14 bottom-[-0.75rem] left-5 border-l border-dashed border-cyan-300/20"
                        />
                      )}
                      <div className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-4">
                        <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/8">
                          <Icon className="size-4 text-cyan-200" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-xs text-gray-500">{item.step}</span>
                            <h2 className="font-semibold text-white">{item.title}</h2>
                          </div>
                          <p className="mt-1 text-sm leading-6 text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="CyberStudents impact" className="border-b border-white/8 bg-white/[0.018]">
        <div className="mx-auto grid w-full max-w-(--breakpoint-2xl) grid-cols-2 px-4 sm:px-8 md:px-10 lg:grid-cols-4 xl:px-20">
          {impactStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="border-white/8 px-3 py-7 first:border-l-0 odd:border-r sm:px-6 lg:border-r lg:py-9 lg:last:border-r-0"
              >
                <Icon className="mb-3 size-4 text-cyan-300" aria-hidden="true" />
                <p className="font-mono text-2xl font-semibold text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-(--breakpoint-2xl) px-4 py-20 sm:px-8 sm:py-28 md:px-10 xl:px-20">
        <div className="max-w-3xl">
          <p className="font-mono text-sm tracking-[0.15em] text-cyan-300 uppercase">A practical philosophy</p>
          <h2 className="mt-4 font-serif text-4xl text-balance text-white sm:text-5xl">
            Learning should be useful before it is impressive.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            We build for the learner who is curious but unsure where to begin—and for the experienced student who wants
            a more meaningful next problem. The result is a simple standard for everything we publish.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <article
                key={principle.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.028] p-6 transition-colors hover:bg-white/[0.045] sm:p-7"
              >
                <div className={`flex size-12 items-center justify-center rounded-2xl border ${principle.accent}`}>
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{principle.title}</h3>
                <p className="mt-3 leading-7 text-gray-400">{principle.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
          <span className="mr-2 text-gray-500">Frameworks already used in our challenge mappings:</span>
          {frameworkLinks.map((framework) => (
            <a
              key={framework.name}
              href={framework.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-gray-300 transition-colors hover:border-cyan-300/25 hover:text-cyan-200"
            >
              {framework.name}
              <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section id="history" className="scroll-mt-20 border-y border-white/8 bg-[#080d15]">
        <div className="mx-auto grid w-full max-w-(--breakpoint-2xl) gap-12 px-4 py-20 sm:px-8 sm:py-28 md:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 xl:px-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-sm tracking-[0.15em] text-cyan-300 uppercase">Our story</p>
            <h2 className="mt-4 font-serif text-4xl text-balance text-white sm:text-5xl">
              The platform changed. The purpose didn&rsquo;t.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              CyberStudents grew from one challenge-help server into a broader education community. Each milestone made
              the same idea more concrete: good learning is easier to sustain when people can practice together.
            </p>
            <Button
              variant="outline"
              asChild
              className="mt-8 border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/advent/2024/results">
                Read the 2024 results
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <ol className="relative ml-3 border-l border-white/10">
            {timeline.map((event) => (
              <li key={event.date} className="relative pb-8 pl-8 last:pb-0 sm:pl-10">
                <span
                  aria-hidden="true"
                  className={`absolute top-2 -left-[0.42rem] size-3 rounded-full border-2 border-[#080d15] ${
                    event.upcoming ? "bg-violet-300 shadow-[0_0_0_4px_rgba(196,181,253,0.12)]" : "bg-cyan-300"
                  }`}
                />
                <article className="rounded-3xl border border-white/9 bg-white/[0.028] p-5 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <time
                      dateTime={event.dateTime}
                      className="font-mono text-xs tracking-[0.14em] text-cyan-300 uppercase"
                    >
                      {event.date}
                    </time>
                    {event.upcoming && (
                      <span className="w-fit rounded-full border border-violet-300/20 bg-violet-300/8 px-2.5 py-1 text-xs font-medium text-violet-200">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">{event.title}</h3>
                  <p className="mt-3 leading-7 text-gray-400">{event.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {event.details.map((detail) => (
                      <span
                        key={detail}
                        className="rounded-full border border-white/8 bg-black/20 px-2.5 py-1 text-xs text-gray-400"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-full max-w-(--breakpoint-2xl) px-4 py-20 sm:px-8 sm:py-28 md:px-10 xl:px-20">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-sm tracking-[0.15em] text-cyan-300 uppercase">Proof in the practice</p>
            <h2 className="mt-4 font-serif text-4xl text-balance text-white sm:text-5xl">
              Challenges designed to keep teaching.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              These are real problems from Advent of CTF and Daily CTF. Each write-up stays available so a competition
              moment can become a lesson, a club activity, or someone else&rsquo;s first breakthrough.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              asChild
              className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="https://github.com/cyberstudentsacademy/Advent-of-CTF" target="_blank" rel="noreferrer">
                Advent write-ups
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="https://github.com/cyberstudentsacademy/csd-ctf" target="_blank" rel="noreferrer">
                Daily CTF archive
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-12 px-9 sm:px-12">
          <ChallengesCarousel variant="foundation" />
        </div>
        <p className="mt-5 text-center text-sm text-gray-500">Swipe, drag, use arrow keys, or select the controls.</p>
      </section>

      <section className="border-y border-white/8 bg-[#080d15]">
        <div className="mx-auto w-full max-w-(--breakpoint-2xl) px-4 py-20 sm:px-8 sm:py-28 md:px-10 xl:px-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-sm tracking-[0.15em] text-cyan-300 uppercase">The pathway we are building</p>
            <h2 className="mt-4 font-serif text-4xl text-balance text-white sm:text-5xl">
              Bridge the space between the course and the opportunity.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              AP courses establish the academic foundation. Industry certifications validate adjacent skills.
              CyberStudents fills the middle with practical labs, CTF scenarios, and a community that lets learners move
              between networking and security instead of treating them as separate worlds.
            </p>
          </div>

          <div className="mt-12">
            <PathwayDiagram />
          </div>

          <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-6 text-gray-500">
            Current College Board naming and timing: AP Cybersecurity launches nationally in fall 2026; AP Networking
            enters its final pilot in 2026–27 before national availability in 2027–28. Certification references show
            skills alignment, not a guarantee of exam funding or certification.
          </p>
        </div>
      </section>

      <section className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(34,211,238,0.12),transparent_38%)]"
        />
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-8 sm:py-28">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/8">
            <Handshake className="size-6 text-cyan-200" aria-hidden="true" />
          </div>
          <h2 className="mt-7 font-serif text-4xl text-balance text-white sm:text-5xl">Build the next step with us.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Students, educators, challenge developers, mentors, and partners all shape this work. Bring a question, a
            lesson idea, or a skill you want to share—we&rsquo;ll help turn it into something useful.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="bg-cyan-200 px-6 text-base font-semibold text-gray-950 hover:bg-cyan-100"
            >
              <a href="mailto:admin@cyberstudents.net">
                Partner with CyberStudents
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/15 bg-white/5 px-6 text-base text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/ctf">Explore our competitions</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
