import { ScoringChart } from "~/app/_home/ScoringChart";
import { ChartFrame, Facts, H2, P } from "../_components";
import type { Article } from "./types";

// The formula is the one in src/server/api/routers/event.ts and challenge.ts. Every solver's points for a challenge
// are recomputed from its current solve count, so earlier solvers lose points too as a challenge gets more solves.

const points = (solves: number) => Math.max(50, Math.floor(500 * Math.pow(Math.min(1, 162 / (solves + 161)), 1.5)));

export const dynamicScoring: Article = {
  slug: "how-dynamic-scoring-works",
  date: "2025-11-20",
  kind: "Behind the scenes",
  title: "How Dynamic Scoring Will Work in Advent of CTF 2025",
  dek: "This year, every challenge starts at 500 points and becomes worth less as more players solve it. Here's the formula, and why we chose it.",
  author: "Edward Z.",
  minutes: 4,
  visual: () => (
    <div className="flex h-full items-center bg-white p-4 sm:p-6">
      <ScoringChart className="w-full [&_figcaption]:hidden" />
    </div>
  ),
  Body: () => (
    <>
      <P>
        In Advent of CTF 2024, every challenge had a fixed point value that its author picked based on how hard they
        expected it to be. That worked well enough, but guessing difficulty ahead of time is tricky, and a challenge that
        turns out easier than expected ends up worth far too much. For our second year, we&rsquo;re letting the players
        decide instead.
      </P>

      <H2>The formula</H2>
      <P>
        Every challenge starts at 500 points. Each time someone solves it, its value goes down a little, and that new
        value applies to everyone who has solved it, not just the next person. A challenge that only a handful of
        players crack keeps nearly all of its points, while one that hundreds of players solve settles toward the
        50-point minimum.
      </P>
      <pre className="mt-6 overflow-x-auto rounded-xl bg-gray-950 px-5 py-4 font-mono text-sm leading-6 text-cyan-200 shadow-inner">
        points = max(50, floor(500 &times; min(1, 162 &divide; (solves + 161))<sup>1.5</sup>))
      </pre>
      <ChartFrame title="What a challenge is worth as it gets more solves" source="Calculated from the formula above.">
        <ScoringChart />
      </ChartFrame>
      <P>
        The numbers are tuned so that the curve stays gentle at first and then levels off. The very first solver gets the
        full 500, a challenge with 162 solves is worth {points(162)}, and it takes roughly 590 solves to reach the floor.
        That way, the hardest challenges of the month really do stand out on the leaderboard.
      </P>
      <Facts
        title="Points at a glance"
        items={[
          { label: "1 solve", value: `${points(1)} points` },
          { label: "50 solves", value: `${points(50)} points` },
          { label: "162 solves", value: `${points(162)} points` },
          { label: "400 solves", value: `${points(400)} points` },
        ]}
      />

      <H2>Hints still come free</H2>
      <P>
        Just like last year, every challenge gets two hints, released 12 and 24 hours after it opens. Hints never cost
        points, so there&rsquo;s no reason not to take a peek when you&rsquo;re stuck.
      </P>

      <H2>Built into our own platform</H2>
      <P>
        Dynamic scoring is the latest addition to the competition platform we built ourselves. It already handles
        signing in with Discord or Google, releasing challenges and hints on a timer, separate leaderboards for each
        division, and verifying students for prizes, and this year it recalculates every player&rsquo;s score live as
        solves come in. We can&rsquo;t wait to see how the leaderboard shakes out!
      </P>
    </>
  ),
};
