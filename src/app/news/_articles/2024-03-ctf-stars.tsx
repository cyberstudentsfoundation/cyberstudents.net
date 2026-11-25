import dailyCtfLeaderboard from "~/../public/daily-ctf-leaderboard.png";
import { Facts, Figure, H2, P } from "../_components";
import { StarPodium } from "../_visuals";
import type { Article } from "./types";

// Source: the server announcements of March 30, 2024 ("New CTF Star Roles!" and the round 2 star awards). Round 3's
// end date matches the csd-ctf round table (April 1, 2024).

const ROUND_2 = [
  { handle: "scram", stars: 5 },
  { handle: "kolmus", stars: 4 },
  { handle: "failurecore", stars: 3 },
  { handle: "Seth", stars: 2 },
  { handle: "sour", stars: 1 },
];

export const ctfStars: Article = {
  slug: "introducing-ctf-stars",
  date: "2024-03-30",
  kind: "Announcement",
  title: "Introducing CTF Stars, a Lasting Reward for Our Top Daily CTF Players",
  dek: "Points reset every round, but stars don't. Finish in a round's top five and your stars add up to a role that grows with you.",
  author: "CyberStudents",
  minutes: 2,
  visual: () => <StarPodium title="Daily CTF round 2, top five" places={ROUND_2} className="h-full" />,
  Body: () => (
    <>
      <P>
        Every round of our CTF lasts about a month, and when it ends, everyone&rsquo;s points go back to zero so the
        next round is a fresh race. That keeps things fair for new players, but it also meant that a great finish
        didn&rsquo;t leave anything behind. Starting today, it does: the top five players of each round now earn
        stars, and those stars stay with you for good.
      </P>

      <H2>How stars work</H2>
      <P>
        First place in a round earns five stars, second place earns four, and so on down to one star for fifth. If
        players tie, they each earn the stars for that place. Your stars add up across rounds into a CTF Star role,
        from Level 1 for your first star all the way up to Level 24 and beyond, and each level comes with its own role icon
        next to your name.
      </P>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <StarPodium title="Daily CTF round 2, top five" places={ROUND_2} />
        </div>
        <figcaption className="mt-3 text-sm leading-6 text-stone-500">
          The first stars go to the top five of round 2, which ended on February 26.
        </figcaption>
      </figure>

      <H2>The first stars</H2>
      <P>
        Congratulations to scram, who takes home five stars for winning round 2, and to kolmus, failurecore, Seth, and
        sour, who round out the top five! Your new roles are on their way.
      </P>
      <Figure
        src={dailyCtfLeaderboard}
        alt="A Daily CTF round leaderboard posted by our bot in Discord"
        caption="Every round's points add up on the leaderboard in #ctf-leaderboard, and the top five at the end earn stars."
        className="mx-auto max-w-md"
      />
      <Facts
        items={[
          { label: "Stars per round", value: "5, 4, 3, 2, and 1 for the top five" },
          { label: "Ties", value: "Everyone tied earns that place's stars" },
          { label: "Role levels", value: "Level 1 up to Level 24 and beyond" },
          { label: "Round 3 ends", value: "April 1, 2024" },
        ]}
      />

      <H2>Still time for round 3</H2>
      <P>
        Round 3 ends on April 1, so there are still a couple of days to climb the leaderboard and earn your first
        stars. Head to <strong>#ctf-challenges</strong> to catch up, and pick up the CTF ping role so you hear about
        every new challenge.
      </P>
    </>
  ),
};
