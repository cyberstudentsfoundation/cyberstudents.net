import { A, ChartFrame, Dateline, Facts, H2, P, Quote } from "../_components";
import { CalendarTeaser, HintTimeline } from "../_visuals";
import type { Article } from "./types";

export const advent2024Announced: Article = {
  slug: "advent-of-ctf-2024-announced",
  date: "2024-11-30",
  kind: "Press release",
  title: "CyberStudents Announces Advent of CTF 2024, a Free Beginner CTF Running All of December",
  dek: "Starting tomorrow, a new challenge unlocks every day until Christmas, with free hints, a write-up division, and cash prizes for high school and college students.",
  author: "CyberStudents",
  minutes: 3,
  visual: () => <CalendarTeaser className="h-full" />,
  about:
    "CyberStudents is a student-run cybersecurity community on Discord, founded in December 2021, for students in high school, college, and beyond. Earlier this year it ran Daily CTF, six rounds and 55 challenges written by its own team, and it publishes its challenges and write-ups on GitHub so anyone can learn from them. Learn more at cyberstudents.net.",
  Body: () => (
    <>
      <P>
        <Dateline date="2024-11-30" />
        CyberStudents is excited to announce Advent of CTF 2024, a free, month-long capture the flag competition made
        with beginners in mind. Starting tomorrow, December 1, a new cybersecurity challenge will unlock every day at 3
        PM EST until Christmas Day, and the competition stays open until December 31, so there&rsquo;s plenty of time
        to catch up on any days you miss.
      </P>
      <P>
        Each challenge hides a flag, a short piece of text in the format <code className="font-mono text-base">csd&#123;example_flag&#125;</code>,
        that players find by solving a puzzle in one of six categories: web exploitation, cryptography, forensics, binary
        exploitation, reverse engineering, and OSINT. The challenges start out approachable and get a little harder as
        Christmas gets closer, and they can be solved in any order.
      </P>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <CalendarTeaser />
        </div>
        <figcaption className="mt-3 text-sm leading-6 text-stone-500">
          The challenge calendar, where each day unlocks at 3 PM EST from December 1 to 25.
        </figcaption>
      </figure>

      <H2>Hints that don&rsquo;t cost a thing</H2>
      <P>
        Two hints come out for every challenge, the first 12 hours after it opens and the second 12 hours after that.
        Hints never cost any points, so nobody has to choose between learning something and keeping their score. Players
        are also welcome to talk through the challenges in our Discord server, where the challenge authors and the rest
        of the community will be around to help.
      </P>
      <ChartFrame title="When each challenge and its hints unlock (Eastern time)">
        <HintTimeline release="3 PM" hint1="3 AM the next morning" hint2="3 PM the next day" />
      </ChartFrame>

      <H2>Prizes and divisions</H2>
      <P>
        High school and college students compete for cash prizes in the High School and College Division, and the
        Open Write-Up Division welcomes every player, of any age, who writes up how they solved a challenge. Each
        challenge&rsquo;s author will pick a favorite write-up to feature on our website, so a clear explanation can
        win you something even if you never top the leaderboard.
      </P>
      <Quote by="Edward Z., co-founder of CyberStudents">
        We wanted to build the kind of CTF we wish we&rsquo;d had when we were starting out, one where you can show up
        on December 1 knowing very little and leave at the end of the month having learned a ton.
      </Quote>
      <Facts
        items={[
          { label: "Dates", value: "December 1 to 31, 2024" },
          { label: "Challenges", value: "25, one a day at 3 PM EST" },
          { label: "Hints", value: "Two per challenge, always free" },
          { label: "Divisions", value: "High School and College, and Open Write-Up" },
          { label: "Written by", value: "Vipin, Kolmus, GodderE2D, and Logix" },
          { label: "Cost to play", value: "Free" },
        ]}
      />

      <H2>How to play</H2>
      <P>
        Registration is free and open to everyone at <A href="/advent/2024">cyberstudents.net/advent/2024</A>. The
        first challenge goes live tomorrow at 3 PM EST, so grab a friend, join our{" "}
        <A href="https://discord.com/invite/cyberstudents-916144903686336513">Discord server</A>, and we&rsquo;ll see you
        there!
      </P>
    </>
  ),
};
