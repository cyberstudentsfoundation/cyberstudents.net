import advent2025Announcement from "~/../public/history/advent-2025-announcement.png";
import { SponsorLogos } from "~/app/_home/Sponsors";
import { A, Dateline, Facts, H2, P, Quote } from "../_components";
import { CertVouchers } from "../_visuals";
import type { Article } from "./types";

// As announced on Discord on 2025-11-30 at 8:02 PM: prize pool worth $12,000+, thanks
// to Veria Labs, APIsec University, and CTFGuide; three divisions (Open, Student for college and high school, and High
// School with certifications and CTFGuide Pro); three Write-Up awards of $25 + CTFGuide Pro (3 months) + CASA, ACP; a
// raffle of 16 ACP and 1 CASA vouchers for anyone with a solve; December gaming events with certification prizes.
// OtterSec joined in December and gen.xyz later, and the Christmas update split the Student Division (see
// 2025-12-christmas-prizes.tsx), so neither appears here. The storyline is from the platform's Mission Briefing.

const LAUNCH_SPONSORS = ["Veria Labs", "CTFGuide", "APIsec University"];

const PRIZES: { division: string; who: string; rows: [string, string][] }[] = [
  {
    division: "Student Division",
    who: "College and high school students",
    rows: [
      ["1st", "$225 + ASCP, CASA, ACP + CTFGuide Pro (1 year)"],
      ["2nd", "$125 + ASCP, CASA, ACP + CTFGuide Pro (3 months)"],
      ["3rd", "$75 + ASCP, CASA, ACP + CTFGuide Pro (1 month)"],
    ],
  },
  {
    division: "High School Division",
    who: "High school students only",
    rows: [
      ["1st", "ASCP, CASA, ACP + CTFGuide Pro (1 year)"],
      ["2nd", "ASCP, CASA, ACP + CTFGuide Pro (3 months)"],
      ["3rd", "CASA, ACP + CTFGuide Pro (1 month)"],
    ],
  },
  {
    division: "Write-Up Division",
    who: "Everyone",
    rows: [
      ["Best well-written", "$25 + CASA, ACP + CTFGuide Pro (3 months)"],
      ["Best technical", "$25 + CASA, ACP + CTFGuide Pro (3 months)"],
      ["Best unintended", "$25 + CASA, ACP + CTFGuide Pro (3 months)"],
    ],
  },
];

export const advent2025Announced: Article = {
  slug: "advent-of-ctf-2025-announced",
  date: "2025-11-30",
  kind: "Press release",
  title: "Advent of CTF Returns December 1 With Over $12,000 in Prizes",
  dek: "Our second annual Advent of CTF brings 25 new challenges, a storyline to follow, and prizes from Veria Labs, APIsec University, and CTFGuide.",
  author: "CyberStudents",
  minutes: 4,
  image: { src: advent2025Announcement, alt: "The announcement graphic for Advent of CTF 2025", dark: true },
  Body: () => (
    <>
      <P>
        <Dateline date="2025-11-30" />
        CyberStudents today announced Advent of CTF 2025, the second edition of its free, month-long capture the flag
        competition for beginners. Beginning tomorrow, December 1, at 8 PM EST, a new challenge will unlock every day
        until Christmas, and the competition will stay open through December 31 so that everyone has time to catch up.
      </P>
      <P>
        This year&rsquo;s event comes with a prize pool worth over $12,000, in cash, certification vouchers, and
        CTFGuide Pro subscriptions, thanks to our sponsors Veria Labs, APIsec University, and CTFGuide. Last year&rsquo;s
        Advent of CTF drew 780 players from 85 countries, and we can&rsquo;t wait to welcome even more players this
        December.
      </P>
      <figure className="mt-10 rounded-2xl bg-gray-900 px-6 py-8 shadow-lg sm:px-10 lg:-mx-28">
        <figcaption className="text-sm font-semibold text-gray-300">Advent of CTF 2025 is made possible by</figcaption>
        <SponsorLogos className="mt-6" only={LAUNCH_SPONSORS} />
      </figure>

      <H2>Three divisions, plus write-up awards</H2>
      <P>
        Anyone can compete in the Open Division. College and high school students can compete for cash in the Student
        Division, and high school students also have a division of their own, with certification vouchers and CTFGuide
        Pro for the top three. The Write-Up Division rewards players of any age for clear, thoughtful write-ups, with
        awards for the best well-written, technical, and unintended solutions.
      </P>
      <P>
        On top of that, every player who solves at least one challenge is entered into a raffle for 16 ACP vouchers and
        one CASA voucher from APIsec University, and we&rsquo;ll be running community gaming events all through December
        with more certifications to win.
      </P>
      <div className="mt-10 grid gap-4 lg:-mx-28 lg:grid-cols-3">
        {PRIZES.map((d) => (
          <section key={d.division} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-900/10">
            <h3 className="font-bold text-stone-950">{d.division}</h3>
            <p className="text-sm text-stone-500">{d.who}</p>
            <dl className="mt-4 space-y-2.5">
              {d.rows.map(([place, prize]) => (
                <div key={place} className="border-t border-stone-200 pt-2.5">
                  <dt className="text-xs font-bold tracking-wide text-cyan-800 uppercase">{place}</dt>
                  <dd className="mt-0.5 text-sm leading-6 text-stone-800">{prize}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <CertVouchers />
        </div>
        <figcaption className="mt-3 text-sm leading-6 text-stone-500">
          The three APIsec University certifications in this year&rsquo;s prizes, which winners receive as exam
          vouchers.
        </figcaption>
      </figure>

      <H2>A story to follow</H2>
      <P>
        This year&rsquo;s challenges tell a story. Ever since last year&rsquo;s K.U.N.A.L. was taken down, the North Pole
        Logistics Directorate has grown careless with its security, and a new threat group calling itself the KRAMPUS
        SYNDICATE has noticed. Each day&rsquo;s challenge uncovers a little more of what the Syndicate is planning, and
        it&rsquo;s up to players to stop them before December 24.
      </P>
      <P>
        Challenges are now scored dynamically, starting at 500 points and becoming worth less as more players solve them
        (we wrote about <A href="/news/how-dynamic-scoring-works">how dynamic scoring works</A> earlier this month), and
        every challenge still comes with two free hints, released 12 and 24 hours after it opens. Once someone has
        solved a challenge and claimed first blood, our staff and the rest of the community are free to help anyone
        who&rsquo;s stuck on it.
      </P>
      <Quote by="Edward Z., co-founder of CyberStudents">
        Last year blew us away, so we went bigger on everything this time: more prizes, a real storyline, and write-up
        awards of their own. If you&rsquo;ve never tried a CTF before, this is a great place to start.
      </Quote>
      <Facts
        items={[
          { label: "Dates", value: "December 1 to 31, 2025" },
          { label: "Challenges", value: "25, one a day at 8 PM EST" },
          { label: "Prizes", value: "Worth over $12,000, in cash and vouchers" },
          { label: "Divisions", value: "Open, Student, High School, and Write-Up" },
          { label: "Sponsors", value: "Veria Labs, APIsec University, and CTFGuide" },
          { label: "Written by", value: "Vipin, GodderE2D, a_person, flocto, wjaaaaaaat, and vy" },
        ]}
      />

      <H2>How to play</H2>
      <P>
        Registration is free at <A href="/advent/2025">cyberstudents.net/advent/2025</A>, and you can sign in with
        Discord or Google. Students who want to compete for prizes in the Student or High School division will be asked
        to verify that they&rsquo;re a student before prizes are awarded. See you on December 1!
      </P>
    </>
  ),
};
