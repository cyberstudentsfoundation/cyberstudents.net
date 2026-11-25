import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa6";
import { HiArrowRight, HiEnvelope, HiPhone } from "react-icons/hi2";

import background from "~/../public/background.png";
import stickers from "~/../public/community/stickers.webp";
import teamAtSf from "~/../public/community/team-at-sf.webp";
import dailyCtfChallenge from "~/../public/daily-ctf-challenge.png";
import elforms from "~/../public/curated-challenges/elforms.png";
import talkVirtualMachines from "~/../public/community/talk-virtual-machines.webp";
import bedwarsBridges from "~/../public/community/bedwars-bridges.webp";

import { AuthorGroups, FounderCards, PastStaff, StaffWall } from "~/app/_home/Team";
import { Sponsors } from "~/app/_home/Sponsors";
import { ExternalIcon, Heading, TextLink, Wide } from "~/app/_home/ui";
import { history } from "~/data/history";
import { site } from "~/data/site";
import { cn } from "~/lib/utils";
import { OpenSource, StillGrowing, Vision } from "./sections";

export const metadata: Metadata = {
  title: "About · CyberStudents",
  description: "Who runs CyberStudents, what we have done since 2021, and who helped.",
};

const PANELS: {
  title: string;
  text: string;
  href: string;
  linkText: string;
  image: StaticImageData;
  alt: string;
  accent: string;
  className: string;
}[] = [
  {
    title: "Advent of CTF",
    text: "A month-long beginner CTF that we've held every December since 2024, with a new challenge each day, two free hints for every one, and prizes from our sponsors. More than 2,000 players from 129 countries have taken part so far.",
    href: "/advent",
    linkText: "About Advent of CTF",
    image: elforms,
    alt: "A request in Postman from solving the ELForms web challenge",
    accent: "bg-cyan-300 text-gray-950",
    className: "lg:col-span-2 lg:row-span-2 min-h-[24rem] lg:min-h-[32rem]",
  },
  {
    title: "Daily CTF",
    text: "Six rounds and 55 challenges in our Discord server between January and August 2024, most of them run by a bot we built ourselves.",
    href: site.repos.dailyCtfArchive,
    linkText: "Daily CTF archive",
    image: dailyCtfChallenge,
    alt: "A Daily CTF challenge post in Discord",
    accent: "bg-lime-400 text-gray-950",
    className: "min-h-[18rem]",
  },
  {
    title: "Talks and game nights",
    text: "Talks from people in security and from our own members, game nights and tournaments, and a Minecraft server for everything in between.",
    href: "/#community",
    linkText: "See some of them",
    image: bedwarsBridges,
    alt: "Players bridging between islands during our Bed Wars tournament",
    accent: "bg-purple-400 text-gray-950",
    className: "min-h-[18rem]",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-gray-950 text-gray-200">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30">
          <Image src={background} alt="" fill priority className="object-cover" />
        </div>
        <Wide className="relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="font-serif text-5xl text-white sm:text-6xl">About CyberStudents</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-200 sm:text-xl">
              CyberStudents is a Discord community for anyone learning cybersecurity. Most of our members are in high
              school or college, and they join us from more than 130 countries around the world.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-200 sm:text-xl">
              Our server is a place to learn, chat, and get help with all things cybersecurity, whether that&rsquo;s
              scholarships, competitions, courses, or certifications. Members get to hear from professionals and fellow
              students alike, and can ask questions of people who are already working in the field.
            </p>
          </div>
          <div className="relative mx-auto h-80 w-full max-w-md sm:h-96" aria-hidden="true">
            <Image
              src={teamAtSf}
              alt=""
              sizes="336px"
              priority
              className="absolute top-0 right-0 w-72 rotate-3 rounded-xl border border-white/15 shadow-2xl shadow-black/50 sm:w-84"
            />
            <Image
              src={talkVirtualMachines}
              alt=""
              sizes="300px"
              className="absolute bottom-4 left-0 w-64 -rotate-6 rounded-xl border border-white/15 shadow-2xl shadow-black/50 sm:w-72"
            />
            <Image
              src={stickers}
              alt=""
              sizes="224px"
              className="absolute right-2 bottom-0 w-48 rotate-[8deg] rounded-xl border border-white/15 shadow-2xl shadow-black/50 sm:w-56"
            />
          </div>
        </Wide>
      </section>

      {/* What we do */}
      <section id="what-we-do" aria-labelledby="what-we-do-title" className="scroll-mt-20 bg-[#111b29]">
        <Wide className="py-20 sm:py-24">
          <Heading id="what-we-do-title" className="text-white">
            What we do
          </Heading>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {PANELS.map((p) => {
              const external = /^https?:\/\//.test(p.href);
              const Comp = external ? "a" : Link;
              return (
                <Comp
                  key={p.title}
                  href={p.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={cn(
                    "group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-white/10",
                    p.className,
                  )}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/90 to-gray-950/40"
                  />
                  <div className="relative p-6 sm:p-8">
                    <h3 className="text-2xl font-bold text-white sm:text-3xl">{p.title}</h3>
                    <p className="mt-3 max-w-xl leading-7 text-gray-200">{p.text}</p>
                    <span
                      className={cn(
                        "mt-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold",
                        p.accent,
                      )}
                    >
                      {p.linkText}
                      {external ? <ExternalIcon /> : <HiArrowRight className="size-4" aria-hidden="true" />}
                    </span>
                  </div>
                </Comp>
              );
            })}
          </div>
        </Wide>
      </section>

      <Vision />

      <OpenSource />

      {/* History: alternating timeline */}
      <section id="history" aria-labelledby="history-title" className="scroll-mt-20 bg-[#050911]">
        <Wide className="py-20 sm:py-28">
          <div className="max-w-2xl">
            <Heading id="history-title" className="text-white">
              History
            </Heading>
            <p className="mt-5 text-lg leading-8 text-gray-300">
              Founded on December 2, 2021, we were originally a dedicated server offering assistance for{" "}
              <TextLink href="https://cyberstart.com/">CyberStart</TextLink> challenges. When CyberStart closed on
              January 12, 2024, we accepted this challenge and rebranded ourselves as CyberStudents.
            </p>
          </div>
          <ol className="relative mt-14 space-y-12 before:absolute before:top-2 before:bottom-2 before:left-[0.42rem] before:border-l-2 before:border-dashed before:border-white/15 lg:before:left-1/2">
            {history.map((entry, i) => {
              const right = i % 2 === 1;
              return (
                <li key={entry.dateTime} className="relative grid gap-6 pl-8 lg:grid-cols-2 lg:gap-16 lg:pl-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 left-0 size-3.5 rounded-full bg-cyan-300 ring-4 ring-[#050911] lg:left-1/2 lg:-translate-x-[0.42rem]"
                  />
                  <div className={cn(right ? "lg:col-start-2" : "lg:text-right")}>
                    <time dateTime={entry.dateTime} className="text-sm font-semibold text-cyan-300">
                      {entry.date}
                    </time>
                    <h3 className="mt-1 text-xl font-semibold text-white">{entry.title}</h3>
                    <p className="mt-2 leading-7 text-gray-400">
                      {entry.text}
                      {entry.href && entry.linkText && (
                        <>
                          {" "}
                          <TextLink href={entry.href}>{entry.linkText}</TextLink>
                        </>
                      )}
                    </p>
                  </div>
                  {entry.image && (
                    <div
                      className={cn(
                        "w-full max-w-md overflow-hidden rounded-xl border border-white/10 shadow-xl shadow-black/40",
                        right ? "lg:col-start-1 lg:row-start-1 lg:ml-auto lg:rotate-1" : "lg:-rotate-1",
                      )}
                    >
                      <Image
                        src={entry.image.src}
                        alt={entry.image.alt}
                        sizes="(min-width: 1024px) 448px, 100vw"
                        className="aspect-video w-full object-cover object-top"
                        style={entry.image.position ? { objectPosition: entry.image.position } : undefined}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          <StillGrowing className="mt-24" />
        </Wide>
      </section>

      {/* Team */}
      <section id="team" aria-labelledby="team-title" className="scroll-mt-20 bg-[#111b29]">
        <Wide className="py-20 sm:py-28">
          {/* The team photo is in this page's header, so it is not repeated here. */}
          <Heading id="team-title" className="text-white">
            Team
          </Heading>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            CyberStudents is run by its two co-founders, together with a team of volunteer staff who moderate the
            server, look after the community, and design our challenges and lessons.
          </p>
          <FounderCards className="mt-10" />
          <h3 className="mt-14 text-xl font-bold text-white">Staff</h3>
          <StaffWall className="mt-4" />
          <h3 id="credits" className="mt-14 scroll-mt-24 text-xl font-bold text-white">
            Challenge authors
          </h3>
          <AuthorGroups className="mt-5" />
          <h3 className="mt-14 text-xl font-bold text-white">Past staff</h3>
          <PastStaff className="mt-3" />
          <p className="mt-8 max-w-3xl leading-7 text-gray-400">
            Our Advent of CTF write-ups come from players, and each challenge&rsquo;s author picks the one to feature.
            You can find all of them, with their authors credited, in the{" "}
            <TextLink href={site.repos.adventWriteUps}>Advent of CTF write-ups repository</TextLink>, and many more on
            our <TextLink href="/write-ups">write-ups page</TextLink>.
          </p>
        </Wide>
      </section>

      <Sponsors />

      {/* Contact */}
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="scroll-mt-20 border-t border-white/10 bg-[#111b29]"
      >
        <Wide className="py-20 sm:py-24">
          <Heading id="contact-title" className="text-white">
            Contact
          </Heading>
          <p className="mt-4 text-lg text-gray-300">
            Whether it&rsquo;s about sponsorship, press, or something else entirely, we&rsquo;re always happy to hear
            from you.
          </p>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.08]"
              >
                <HiEnvelope className="size-8 shrink-0 text-cyan-300" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-gray-400">Email</span>
                  <span className="block text-lg font-semibold break-all text-white">{site.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.phone.href}
                className="flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.08]"
              >
                <HiPhone className="size-8 shrink-0 text-cyan-300" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-gray-400">Phone</span>
                  <span className="block text-lg font-semibold tracking-wide text-white" aria-hidden="true">
                    {site.phone.vanity}
                  </span>
                  <span className="sr-only">{site.phone.display}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full items-center gap-4 rounded-2xl bg-[#5865f2] p-6 text-white transition-colors hover:bg-[#5865f2]/85"
              >
                <FaDiscord className="size-8 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-white/80">Discord</span>
                  <span className="flex items-center gap-1 text-lg font-semibold">
                    Join the server
                    <ExternalIcon />
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </Wide>
      </section>
    </main>
  );
}
