import Image, { type StaticImageData } from "next/image";
import { flair, talkMedia } from "~/data/community";
import { talks, type Talk } from "~/data/talks";
import { cn } from "~/lib/utils";
import { AutoVideo, Marquee } from "./motion";
import { Heading, TextLink, Wide } from "./ui";

const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

function MediaCard({ item }: { item: (typeof talkMedia)[number] }) {
  return (
    <figure className="w-72 shrink-0 sm:w-[26rem]">
      <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-xl shadow-black/30">
        {item.kind === "image" ? (
          <Image
            src={item.image}
            alt={item.alt}
            sizes="(min-width: 640px) 416px, 288px"
            className="h-full w-full object-cover object-left-top"
          />
        ) : (
          <AutoVideo src={item.src} poster={item.poster.src} label={item.alt} className="h-full w-full object-cover" />
        )}
      </div>
      <figcaption className="mt-3 px-1 text-sm text-gray-400">{item.caption}</figcaption>
    </figure>
  );
}

/** A talk as an admission ticket: a torn-off date stub, then the talk itself. */
function TalkTicket({ talk }: { talk: Talk }) {
  const date = talk.date ? new Date(talk.date) : null;
  return (
    <li className="group relative flex overflow-hidden rounded-2xl bg-[#f4efe4] text-slate-900 shadow-xl shadow-black/30 transition-transform duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:-rotate-[0.4deg]">
      <div className="relative flex w-24 shrink-0 flex-col items-center justify-center border-r-2 border-dashed border-slate-400/70 px-3 py-5 text-center sm:w-28">
        {date ? (
          <>
            <span className="text-sm font-semibold text-slate-500">{monthFmt.format(date)}</span>
            <span className="text-4xl leading-none font-bold tabular-nums">{date.getUTCDate()}</span>
            <span className="mt-1 text-sm text-slate-500 tabular-nums">{date.getUTCFullYear()}</span>
          </>
        ) : (
          <span className="text-sm font-semibold text-slate-500">{talk.kind}</span>
        )}
        {/* Punched notches where the stub tears off. */}
        <span aria-hidden="true" className="absolute -top-3 -right-3 size-6 rounded-full bg-[#111b29]" />
        <span aria-hidden="true" className="absolute -right-3 -bottom-3 size-6 rounded-full bg-[#111b29]" />
      </div>
      <div className="min-w-0 flex-1 p-5">
        <p className="text-sm text-slate-500">
          {talk.kind} by <span className="font-semibold text-slate-800">{talk.speaker}</span>
          {talk.affiliation && <>, {talk.affiliation}</>}
        </p>
        <p className="mt-1 text-lg leading-snug font-bold">{talk.title}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {talk.topics.map((t) => (
            <li key={t} className="rounded-full bg-slate-900/[0.07] px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {t}
            </li>
          ))}
        </ul>
      </div>
      {/* The whole title slide, like a photo clipped to the ticket, so none of its text is cut off. */}
      <div className="hidden shrink-0 items-center py-4 pr-5 sm:flex">
        <div className="w-48 rotate-[1.5deg] overflow-hidden rounded-lg shadow-md ring-1 ring-slate-900/15 transition-transform duration-500 motion-safe:group-hover:rotate-0 xl:w-52">
          <Image src={talk.image} alt="" sizes="208px" className="h-auto w-full" />
        </div>
      </div>
    </li>
  );
}

function Flair({ image, className, float }: { image: StaticImageData; className: string; float: "a" | "b" }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute hidden xl:block", className)}>
      <div
        className={float === "a" ? "motion-safe:animate-float1" : "motion-safe:animate-float2"}
        style={{ animationDuration: "7s" }}
      >
        <Image
          src={image}
          alt=""
          sizes="200px"
          className="rounded-xl border border-white/15 shadow-2xl shadow-black/50"
        />
      </div>
    </div>
  );
}

export function Community() {
  return (
    <section
      id="community"
      aria-labelledby="community-title"
      className="relative scroll-mt-28 overflow-hidden bg-[#111b29] text-gray-200"
    >
      {/* Game nights, small and tucked into the corners. */}
      <Flair image={flair.treehouse.image} float="a" className="top-14 left-8 w-48 -rotate-6 2xl:left-24" />
      <Flair image={flair.bedwars.image} float="b" className="top-48 left-28 w-44 rotate-3 2xl:left-44" />
      <Flair image={flair.fortnite.image} float="b" className="top-14 right-10 w-36 rotate-[7deg] 2xl:right-28" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-52 right-24 hidden w-48 -rotate-3 overflow-hidden rounded-xl border border-white/15 shadow-2xl shadow-black/50 xl:block 2xl:right-44"
      >
        <AutoVideo
          src={flair.dragon.src}
          poster={flair.dragon.poster.src}
          label={flair.dragon.alt}
          className="block w-full"
        />
      </div>

      <Wide className="relative pt-20 sm:pt-28">
        <div className="mx-auto max-w-2xl text-center">
          <Heading id="community-title" className="text-white">
            Talks and game nights
          </Heading>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our members get to hear from people working in security, and from each other, in talks hosted right on our
            Discord server. One of our favorites started with the basics of x86 registers and ended with reversing a
            rootkit sample live in IDA.
          </p>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Of course, it isn&rsquo;t all lectures and leaderboards! We also had our own Minecraft server, members get
            together for cyber trivia or game nights like our Labor Day chess tournament, and ten teams took part in{" "}
            <TextLink href="/news/bed-wars-tournament-2026">our first Minecraft Bed Wars tournament</TextLink> this
            February.
          </p>
        </div>
      </Wide>

      <Marquee label="Slides and demos from member talks" className="mt-14 pb-16 sm:mt-16">
        {talkMedia.map((item) => (
          <MediaCard key={item.caption} item={item} />
        ))}
      </Marquee>

      {talks.length > 0 && (
        <Wide className="pb-20 sm:pb-28">
          <h3 className="text-xl font-bold text-white">Talks</h3>
          <ul className="mt-5 grid gap-5 lg:grid-cols-2">
            {talks.map((t) => (
              <TalkTicket key={t.title} talk={t} />
            ))}
          </ul>
        </Wide>
      )}
    </section>
  );
}
