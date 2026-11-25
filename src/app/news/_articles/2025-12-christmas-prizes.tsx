import christmasPrizes from "~/../public/history/advent-2025-christmas-prizes.webp";
import { A, Facts, H2, P } from "../_components";
import { BeforeAfter } from "../_visuals";
import type { Article } from "./types";

// From the Advent of CTF 2025 announcement of 2025-12-25, 5:42 AM, and the prize graphic posted with it. The graphic is
// shown as posted that day. A later edit to the post (December 31) is not part of this story.

export const christmasPrizes2025: Article = {
  slug: "advent-of-ctf-2025-christmas-prizes",
  date: "2025-12-25",
  kind: "Announcement",
  title: "A Christmas Surprise: $1,000 More in Cash Prizes for Advent of CTF 2025",
  dek: "High school and college students now each get a division with cash prizes of their own, and every write-up award triples to $75.",
  author: "Edward Z.",
  minutes: 2,
  image: {
    src: christmasPrizes,
    alt: "The updated prize table: College and High School divisions with $225, $125, and $75 plus certifications, and three $75 write-up awards",
    dark: true,
  },
  Body: () => (
    <>
      <P>
        Merry Christmas and happy holidays, everyone! As a special surprise, we&rsquo;re increasing the cash prize pool
        for Advent of CTF 2025 by $1,000, and high school and college students will now each have cash prizes of their
        own.
      </P>

      <H2>Two student divisions, both with cash</H2>
      <P>
        Until today, college and high school students shared one Student Division with cash prizes, while the High
        School Division came with certifications and other non-cash prizes. From now on, there&rsquo;s a separate College
        Division and High School Division, and each one has everything the Student Division had: $225 for first place,
        $125 for second, and $75 for third, along with APIsec University certification vouchers and CTFGuide Pro. That
        doubles the cash going to our student winners.
      </P>

      <H2>Bigger write-up awards</H2>
      <P>
        Each of the three write-up awards, for the best well-written, technical, and unintended solutions, goes up from
        $25 to $75, still with CASA and ACP vouchers from APIsec University. Write-up submissions open very soon.
      </P>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <BeforeAfter before="$25" after="$75" beforeLabel="Each write-up award until today" afterLabel="Each write-up award now" />
        </div>
      </figure>
      <Facts
        items={[
          { label: "Added to the cash pool", value: "$1,000" },
          { label: "College Division", value: "$225, $125, and $75, plus certifications" },
          { label: "High School Division", value: "$225, $125, and $75, plus certifications" },
          { label: "Write-up awards", value: "$75 each, plus CASA and ACP" },
        ]}
      />
      <P>
        And don&rsquo;t forget that we still have several APIsec certification vouchers to give away through our raffle,
        so keep an eye on the announcements between now and the New Year. If you haven&rsquo;t played yet, every
        challenge stays open until December 31 at <A href="/advent/2025">cyberstudents.net/advent/2025</A>.
      </P>
    </>
  ),
};
