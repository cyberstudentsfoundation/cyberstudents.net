import dailyCtfLeaderboard from "~/../public/daily-ctf-leaderboard.png";
import dailyCtfRoles from "~/../public/daily-ctf-roles.png";
import dailyCtfWriteUp from "~/../public/daily-ctf-write-up.png";
import { dailyCtfChallenges, dailyCtfRounds } from "~/data/daily-ctf";
import { site } from "~/data/site";
import { A, Bars, ChartFrame, Columns, Facts, Gallery, H2, P } from "../_components";
import type { Article } from "./types";

const SHORT = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const short = (iso: string) => SHORT.format(new Date(`${iso}T00:00:00Z`));

// Challenges that span two categories ("OSINT/Steg") are counted under the first one, with spelling variants merged.
function primary(category: string) {
  const first = category.split(/[/,]/)[0]!.trim().toLowerCase().replace(/\.$/, "");
  if (first.startsWith("crypto")) return "Cryptography";
  if (first.startsWith("osint")) return "OSINT";
  if (first.startsWith("web")) return "Web exploitation";
  if (first.startsWith("reverse")) return "Reverse engineering";
  if (first.startsWith("forensics")) return "Forensics";
  if (first.startsWith("pwd")) return "Password cracking";
  if (first.startsWith("steg")) return "Steganography";
  if (first.startsWith("pwn")) return "Binary exploitation";
  return "Miscellaneous";
}

function byCategory() {
  const counts = new Map<string, number>();
  for (const c of dailyCtfChallenges) counts.set(primary(c.category), (counts.get(primary(c.category)) ?? 0) + 1);
  return [...counts.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

const totalPoints = dailyCtfChallenges.reduce((sum, c) => sum + c.points, 0);

export const dailyCtfWrapsUp: Article = {
  slug: "daily-ctf-wraps-up",
  date: "2024-08-31",
  kind: "Recap",
  title: "Daily CTF Wraps Up After Six Rounds and 55 Challenges",
  dek: "Eight months, six rounds, and plenty of late-night flag hunting. Here's a look back at our first competition, by the numbers.",
  author: "Edward Z.",
  minutes: 4,
  image: { src: dailyCtfLeaderboard, alt: "A Daily CTF round leaderboard posted by our bot in Discord", dark: true },
  Body: () => (
    <>
      <P>
        Today marks the end of the sixth and final round of Daily CTF, the competition we started two days after
        CyberStart closed. Since January 14, our team has written and released {dailyCtfChallenges.length} challenges
        across {dailyCtfRounds.length} rounds, all inside our Discord server, and we want to say a huge thank you to
        everyone who played along!
      </P>
      <Facts
        items={[
          { label: "Ran from", value: "January 14 to August 31, 2024" },
          { label: "Rounds", value: dailyCtfRounds.length },
          { label: "Challenges", value: dailyCtfChallenges.length },
          { label: "Points up for grabs", value: totalPoints.toLocaleString("en-US") },
        ]}
      />

      <H2>Round by round</H2>
      <P>
        The rounds grew as we went. Round 1 was a quick five-challenge warm-up over four days in January, and by round 4
        we were releasing 14 challenges over the course of a month. Round 5 ran the longest, from early May until late
        July, while the final round packed 12 more challenges into the rest of the summer.
      </P>
      <ChartFrame
        title="Challenges released in each round"
        source="From the round tables in our csd-ctf repository."
      >
        <Columns
          unit="challenges"
          data={dailyCtfRounds.map((r) => ({
            label: `Round ${r.round}`,
            value: dailyCtfChallenges.filter((c) => c.round === r.round).length,
            sub: `${short(r.from)} to ${short(r.to)}`,
          }))}
        />
      </ChartFrame>

      <H2>What we wrote</H2>
      <P>
        Cryptography and OSINT made up almost half of the challenges, which makes sense for a community where so many
        of us started out decoding ciphers in CyberStart. We also mixed in web exploitation, reverse engineering,
        forensics, password cracking, and even a little binary exploitation, plus plenty of puzzles that didn&rsquo;t
        fit neatly into any one box.
      </P>
      <ChartFrame
        title="Challenges by category"
        source="Each challenge is counted once, under the first category it was listed with."
      >
        <Bars data={byCategory()} />
      </ChartFrame>
      <P>
        Vipin wrote 28 of them, more than half, and Kolmus, kshau, GodderE2D, Mr_MPH, Logix, and arx7254 wrote the
        rest. Thank you all for the hours you put into making these!
      </P>

      <H2>Run by our own bot</H2>
      <P>
        After the first round, Daily CTF moved onto <A href={site.repos.dailyCtfBot}>cyberstudents-ctf</A>, a Discord bot we
        wrote in TypeScript. It walks staff through publishing a challenge, checks flag submissions with a short
        cooldown so nobody can guess their way through, trades hints for points, keeps the round leaderboard up to date,
        and quietly deletes any message that gives a flag away in a public channel. Its source code is public on GitHub
        for anyone who&rsquo;d like to run a CTF in their own server.
      </P>
      <P>
        Starting with round 2, the top five players in every round also earned stars, five for first place down to one
        for fifth, and the stars added up across rounds into a <A href="/news/introducing-ctf-stars">CTF Star role</A>{" "}
        that players could show off around the server.
      </P>
      <Gallery
        images={[
          { src: dailyCtfLeaderboard, alt: "A round leaderboard posted by the bot" },
          { src: dailyCtfRoles, alt: "CTF Star Level 23, 18, and 12 roles in a player's profile" },
          { src: dailyCtfWriteUp, alt: "An official write-up shared after a round ended" },
        ]}
        caption="A round leaderboard, CTF Star roles earned by finishing in the top five, and an official write-up, as they appeared in our server."
      />

      <H2>Everything stays online</H2>
      <P>
        Every challenge from all six rounds is archived in our <A href={site.repos.dailyCtfArchive}>csd-ctf repository</A>,
        along with an official write-up for each one, so you can try them whenever you like. We&rsquo;re taking a short
        break to work on what comes next, and we can&rsquo;t wait to show you.
      </P>
    </>
  ),
};
