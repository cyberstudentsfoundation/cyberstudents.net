import Image from "next/image";

import icsred from "~/../public/icsred.png";
import { A, Bars, BOILERPLATE_2024, ChartFrame, Dateline, Facts, H2, P } from "../_components";
import { BeforeAfter } from "../_visuals";
import type { Article } from "./types";

// Source: the Advent of CTF 2024 announcement, edited December 2, 2024 ("Thanks to our generous new sponsor ICSRED,
// our prize pool has been increased from $80 to $280") with the full prize table. Matches the 2024 results article
// ($225 for students, $55 for write-ups).

const PRIZES = [
  { label: "1st place", note: "High School and College", value: 100 },
  { label: "2nd place", note: "High School and College", value: 60 },
  { label: "3rd place", note: "High School and College", value: 30 },
  { label: "4th place", note: "High School and College", value: 20 },
  { label: "5th place", note: "High School and College", value: 15 },
  { label: "1st place", note: "Open Write-Up", value: 40, color: "bg-amber-500" },
  { label: "2nd place", note: "Open Write-Up", value: 15, color: "bg-amber-500" },
];

export const icsredSponsor: Article = {
  slug: "icsred-sponsors-advent-of-ctf-2024",
  date: "2024-12-02",
  kind: "Press release",
  title: "ICSRED Sponsors Advent of CTF 2024, Raising the Prize Pool From $80 to $280",
  dek: "Two days into the competition, a new sponsor more than triples what's up for grabs for high school and college students and for the best write-ups.",
  author: "CyberStudents",
  minutes: 2,
  visual: () => (
    <BeforeAfter before="$80" after="$280" beforeLabel="Prize pool on December 1" afterLabel="With ICSRED's support" className="h-full" />
  ),
  about: `${BOILERPLATE_2024} Learn more at cyberstudents.net.`,
  Body: () => (
    <>
      <P>
        <Dateline date="2024-12-02" />
        CyberStudents is thrilled to welcome ICSRED as a sponsor of Advent of CTF 2024. Thanks to ICSRED&rsquo;s
        support, the competition&rsquo;s prize pool grows from $80 to $280, starting today, with more prizes for both the
        High School and College Division and the Open Write-Up Division.
      </P>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <BeforeAfter before="$80" after="$280" beforeLabel="Prize pool on December 1" afterLabel="With ICSRED's support" />
        </div>
      </figure>

      <H2>The new prizes</H2>
      <P>
        The top five high school and college students on the leaderboard now win between $15 and $100, and the two best
        write-up authors, who can be any age, win $40 and $15. Everyone who registers can still play for free, and the
        competition stays open until December 31.
      </P>
      <ChartFrame title="Advent of CTF 2024 prizes, in US dollars" source="$225 for the High School and College Division and $55 for the Open Write-Up Division.">
        <Bars format={(n) => `$${n}`} data={PRIZES} />
      </ChartFrame>
      <figure className="mt-10 flex items-center gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-900/10">
        <Image src={icsred} alt="ICSRED" className="size-16 shrink-0 rounded-lg" sizes="64px" />
        <figcaption className="leading-7 text-stone-700">
          Thank you to ICSRED for supporting student cybersecurity, and for helping us reward the players who put so
          much into this month.
        </figcaption>
      </figure>
      <Facts
        items={[
          { label: "Sponsor", value: "ICSRED" },
          { label: "Prize pool", value: "$280, up from $80" },
          { label: "Student prizes", value: "$225 for the top five" },
          { label: "Write-up prizes", value: "$55 for the top two" },
        ]}
      />

      <H2>It&rsquo;s not too late to start</H2>
      <P>
        Two challenges are already out, and a new one unlocks every day at 3 PM EST until Christmas. Register and play at <A href="/advent/2024">cyberstudents.net/advent</A>, and good luck!
      </P>
    </>
  ),
};
