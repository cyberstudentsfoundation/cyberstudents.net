import { A, Facts, H2, P } from "../_components";
import { PerfectScore } from "../_visuals";
import type { Article } from "./types";

// From the Advent of CTF 2025 announcements of 2025-12-15 (Day 15 release and the Prize Notice), 2025-12-16 (ACP voucher
// added), and 2025-12-18 (winner). "Windows 11 hardening" comes from the title of a
// community write-up of the challenge (src/data/writeups.ts). The challenge author is a_person. Nothing is quoted.

export const imageSecurityPrize: Article = {
  slug: "image-security-perfect-score",
  date: "2025-12-18",
  kind: "Announcement",
  title: "PandaGFX Earns the First Perfect Score on Image Security",
  dek: "Day 15 asked players to secure a Windows 11 image under a scoring engine, and the first perfect score came with two APIsec University certification vouchers.",
  author: "CyberStudents",
  minutes: 2,
  visual: () => <PerfectScore challenge="Image Security" day={15} player="PandaGFX" className="h-full" />,
  Body: () => (
    <>
      <P>
        We have a winner for the Image Security challenge prize! Congratulations to PandaGFX, who reached a perfect
        100-point score and met every one of the prize requirements.
      </P>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <PerfectScore challenge="Image Security" day={15} player="PandaGFX" />
        </div>
      </figure>

      <H2>A different kind of challenge</H2>
      <P>
        Image Security went live on December 15, halfway through Advent of CTF 2025, and it was a real step up in
        difficulty and nuance. Instead of hunting for a single flag, players worked through a Windows 11 image, finding
        and fixing security problems while a scoring engine tracked their progress out of 100 points. It&rsquo;s the
        kind of hands-on system hardening that defenders do every day, and a_person, who wrote it, took questions about
        it through our tickets channel.
      </P>

      <H2>The first certification prize of the month</H2>
      <P>
        This challenge also came with the first chance this December to win a free certification. The first player to
        reach a perfect score would receive a Certified API Security Analyst (CASA) voucher from APIsec University, and
        on December 16 we added an APIsec Certified Practitioner (ACP) voucher on top.
      </P>
      <P>
        Winning took more than the score. Players had to submit a write-up explaining how they found and fixed each
        vulnerability, along with their scoring report and the image itself, and anyone who reverse engineered the
        scoring engine instead of doing the work was ineligible. PandaGFX&rsquo;s submission checked every box, so both
        vouchers are theirs.
      </P>
      <Facts
        items={[
          { label: "Challenge", value: "Image Security, Day 15" },
          { label: "Category", value: "Forensics and system hardening" },
          { label: "Winner", value: "PandaGFX, with a perfect 100 points" },
          { label: "Prize", value: "CASA and ACP vouchers from APIsec University" },
        ]}
      />

      <H2>Still worth a try</H2>
      <P>
        The prize has been claimed, but the challenge is still open for the main competition, and with only 11 solves so
        far, it&rsquo;s worth a huge number of points under our{" "}
        <A href="/news/how-dynamic-scoring-works">dynamic scoring</A>. If you haven&rsquo;t tried it yet, now&rsquo;s a
        great time to dive in!
      </P>
    </>
  ),
};
