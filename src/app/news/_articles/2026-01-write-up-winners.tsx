import Image from "next/image";
import { HiExternalLink } from "react-icons/hi";

import { writeUps, unlinkedMentions, siteOf, type WriteUp } from "~/data/writeups";
import { A, H2, P } from "../_components";
import type { Article } from "./types";

const winners = writeUps.filter((w) => w.year === 2025 && w.award && w.award !== "Honorable Mention");
const mention = writeUps.find((w) => w.year === 2025 && w.award === "Honorable Mention");
const acni = winners.find((w) => w.author === "acni");

function Winner({ w }: { w: WriteUp }) {
  return (
    <a
      href={w.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-8 block overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-stone-900/10 transition-shadow hover:shadow-xl lg:-mx-28"
    >
      <span className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <span className="relative block aspect-[16/10] bg-stone-900 sm:aspect-auto">
          {w.shot && (
            <Image
              src={w.shot}
              alt=""
              fill
              sizes="(min-width: 640px) 30rem, 100vw"
              className="object-cover"
              style={{ objectPosition: w.shotPosition ?? "top left" }}
            />
          )}
        </span>
        <span className="block p-6 sm:p-8">
          <span className="text-sm font-bold tracking-wide text-cyan-800 uppercase">{w.award}</span>
          <span className="mt-2 block text-3xl font-bold text-stone-950">{w.author}</span>
          <span className="mt-1 block text-stone-600">&ldquo;{w.title}&rdquo;</span>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-800 group-hover:underline">
            Read it on {siteOf(w.url)}
            <HiExternalLink className="size-4" aria-hidden="true" />
          </span>
        </span>
      </span>
    </a>
  );
}

export const writeUpWinners: Article = {
  slug: "advent-of-ctf-2025-write-up-winners",
  date: "2026-01-20",
  kind: "Results",
  title: "Meet the Winners of the Advent of CTF 2025 Write-Up Division",
  dek: "All three of this year's write-up awards went to the very last challenge of the month, The Final RCE.",
  author: "Edward Z.",
  minutes: 3,
  image: acni?.shot ? { src: acni.shot, alt: "acni's write-up of The Final RCE, with a Christmas tree drawn in ASCII art", position: "72% 20%", dark: true } : undefined,
  Body: () => (
    <>
      <P>
        Advent of CTF 2025 was the first time we gave write-ups a prize division of their own, and we loved reading
        every single one that came in. Each winner receives $75 along with CASA and ACP certification vouchers from
        APIsec University.
      </P>
      <P>
        As it turns out, all three winners wrote about the same challenge: The Final RCE, the binary exploitation
        challenge that closed out the month on Christmas Day. Here they are!
      </P>

      {winners.map((w) => (
        <Winner key={w.url} w={w} />
      ))}

      <H2>Honorable mentions</H2>
      <P>
        We also want to recognize{" "}
        {mention && (
          <>
            <A href={mention.url}>{mention.author}</A> for their write-up of {mention.challenge}
          </>
        )}
        {unlinkedMentions
          .filter((m) => m.year === 2025)
          .map((m) => (
            <span key={m.author}>
              {" "}
              and {m.author} for {m.challenge}
            </span>
          ))}
        . Both were a joy to read.
      </P>

      <H2>Thank you</H2>
      <P>
        To everyone who took the time to write up how they solved our challenges, thank you! Your write-ups help the next
        group of beginners learn, and they&rsquo;re a big part of why we run Advent of CTF at all. You can find these
        and many more on our <A href="/write-ups">write-ups page</A>.
      </P>
    </>
  ),
};
