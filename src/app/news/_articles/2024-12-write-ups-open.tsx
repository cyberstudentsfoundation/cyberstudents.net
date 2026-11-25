import { advent2024 } from "~/data/advent-2024";
import { A, ChartFrame, Facts, H2, List, P } from "../_components";
import { CalendarComplete } from "../_visuals";
import type { Article } from "./types";

// Source: the server announcement of December 25, 2024 ("Six days left for Advent of CTF: Write-up submissions now
// open"), including the judging rules, the worked example (Day 6 Epochrypt, 70 points, and Day 9 resa?, 80 points), the
// prizes, and what judges look for. Points and titles are checked against src/data/advent-2024.ts.

const titles = advent2024.map((c) => c.title);
const day6 = advent2024.find((c) => c.day === 6)!;
const day9 = advent2024.find((c) => c.day === 9)!;

function PointsExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-center sm:gap-4">
      {[day6, day9].map((c, i) => (
        <div key={c.day} className="contents">
          {i > 0 && (
            <span aria-hidden="true" className="text-2xl font-bold text-stone-400">
              +
            </span>
          )}
          <div className="rounded-xl bg-violet-50 px-4 py-3 ring-1 ring-violet-200">
            <p className="text-xs font-semibold text-violet-700">Day {c.day}</p>
            <p className="font-bold text-stone-950">{c.title}</p>
            <p className="text-sm text-stone-600">{c.points} points</p>
          </div>
        </div>
      ))}
      <span aria-hidden="true" className="text-2xl font-bold text-stone-400">
        =
      </span>
      <div className="rounded-xl bg-stone-900 px-5 py-3 text-white">
        <p className="text-3xl font-black">{day6.points + day9.points}</p>
        <p className="text-sm text-stone-300">write-up points</p>
      </div>
    </div>
  );
}

export const writeUpsOpen2024: Article = {
  slug: "advent-of-ctf-2024-write-ups-open",
  date: "2024-12-25",
  kind: "Announcement",
  title: "All 25 Challenges Are Out, and Advent of CTF 2024 Write-Up Submissions Are Open",
  dek: "Merry Christmas! There are six days left to finish the calendar, and anyone, of any age, can now send in write-ups for a shot at the Write-Up Division prizes.",
  author: "CyberStudents",
  minutes: 3,
  visual: () => <CalendarComplete titles={titles} className="h-full" />,
  Body: () => (
    <>
      <P>
        Merry Christmas! The last of our 25 challenges came out today, so the whole Advent of CTF 2024 calendar is open,
        but the competition isn&rsquo;t over yet. Everything stays open until 11:59 PM on Tuesday, December 31, so if
        you still have a few days to catch up on, now&rsquo;s your time.
      </P>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <CalendarComplete titles={titles} />
        </div>
        <figcaption className="mt-3 text-sm leading-6 text-stone-500">Every day of the 2024 calendar, now unlocked.</figcaption>
      </figure>

      <H2>Write-up submissions are open</H2>
      <P>
        Starting today, players can send us a write-up for any of the 25 challenges, one per challenge. You can win
        prizes in the Write-Up Division even if you aren&rsquo;t a high school or college student, so everyone is
        welcome to take part.
      </P>
      <P>
        Our challenge developers will read every write-up and pick a winner for each challenge, and the author of the
        winning write-up receives that challenge&rsquo;s points. These are separate from the leaderboard, and whoever
        collects the most write-up points by the end wins first place, with second place for the runner-up. If two
        authors tie, the community will vote to break it.
      </P>
      <ChartFrame
        title="How write-up points add up"
        source={`If one author's write-ups win Day ${day6.day} and Day ${day9.day}, they earn ${day6.points + day9.points} write-up points.`}
      >
        <PointsExample />
      </ChartFrame>

      <H2>What makes a winning write-up</H2>
      <P>Our judges will be looking for write-ups that:</P>
      <List
        items={[
          "Walk through the whole solving process, all the way to the flag.",
          "Use clear, descriptive language that most people can follow, without leaving out the technical details.",
          "Are cleanly formatted, with Markdown or a similar tool.",
          "Show your thinking, including the ideas you tried before finding the solution.",
          "Include images or videos where they help explain a step.",
          "Bring some creativity, which is always encouraged!",
        ]}
      />
      <P>
        A write-up that doesn&rsquo;t reach the flag can still be accepted if nobody else sends one in for that
        challenge, so don&rsquo;t be shy about sharing how far you got.
      </P>
      <Facts
        items={[
          { label: "Write-ups due", value: "11:59 PM, December 31, 2024" },
          { label: "Who can enter", value: "Every player, of any age" },
          { label: "Write-Up Division prizes", value: "$40 for first place and $15 for second" },
          { label: "Student division bonus", value: "An Antisyphon course worth $600+ for first place, from ICSRED" },
        ]}
      />

      <H2>Thank you</H2>
      <P>
        Thanks to our sponsor <A href="/news/icsred-sponsors-advent-of-ctf-2024">ICSRED</A>, the prize pool now stands
        at $280, along with the Antisyphon course for the winner of the High School and College Division. Thank you
        for playing with us this December, and happy holidays from all of us at CyberStudents!
      </P>
    </>
  ),
};
