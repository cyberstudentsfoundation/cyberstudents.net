import Image from "next/image";
import { HiExternalLink } from "react-icons/hi";
import { HiPlay } from "react-icons/hi2";

import bedwarsBracket from "~/../public/community/bedwars-bracket.webp";
import bedwarsBridges from "~/../public/community/bedwars-bridges.webp";
import bedwarsFlower from "~/../public/community/bedwars-flower.webp";
import bedwarsGameOver from "~/../public/community/bedwars-game-over.webp";
import bedwarsIslands from "~/../public/community/bedwars-islands.webp";
import bedwarsLobby from "~/../public/community/bedwars-lobby.webp";
import { A, Facts, Figure, Gallery, H2, P } from "../_components";
import { Bracket } from "../_visuals";
import type { Article } from "./types";

// Sources: the announcements of 2026-01-29 and 2026-02-07 in the community announcements channel (format,
// item rules, prizes, final matchup), a marked-up BracketHQ screenshot (every result up to the final), and
// acni's stream (https://www.youtube.com/watch?v=ab-25VNgmlE, 4:24:28 long; party chat confirms every match was a best
// of three). Stills are frames from that stream with the game HUD cropped off. The champion comes from the server:
// acni, who co-hosted, wrote on 2026-05-31 that WSAB "did not suck at bedwars" and would
// be banned from the next one, and a WSAB player wrote "WSAB swept everyone". The last game on the stream is a Green win.

export const STREAM_URL = "https://www.youtube.com/watch?v=ab-25VNgmlE";

const t = (seed: number, name: string) => ({ seed, name });

const SPL = t(1, "Squid Proxy Lovers");
const WSAB = t(2, "We Suck At Bedwars");
const UOFT = t(9, "UofT");
const TJCSC = t(4, "tjcsc");
const MISC1 = t(6, "misc 1");
const FOUR_BB = t(10, "4 Big Bytes");

export function BedwarsBracket({ className }: { className?: string }) {
  return (
    <Bracket
      className={className}
      columns={[
        {
          title: "Opening round",
          matches: [
            { rows: "1 / span 2", match: { teams: [UOFT, t(8, "Ping1")], winner: 0 } },
            { rows: "7 / span 2", match: { teams: [t(7, "misc 2"), FOUR_BB], winner: 1 } },
          ],
        },
        {
          title: "Quarterfinals",
          matches: [
            { rows: "1 / span 2", match: { teams: [SPL, UOFT], winner: 0 } },
            { rows: "3 / span 2", match: { teams: [t(5, "DanielDempseyFanClub"), TJCSC], winner: 1 } },
            { rows: "5 / span 2", match: { teams: [t(3, "THEM?!"), MISC1], winner: 1 } },
            { rows: "7 / span 2", match: { teams: [FOUR_BB, WSAB], winner: 1 } },
          ],
        },
        {
          title: "Semifinals",
          matches: [
            { rows: "2 / span 2", match: { teams: [SPL, TJCSC], winner: 0 } },
            { rows: "6 / span 2", match: { teams: [MISC1, WSAB], winner: 1 } },
          ],
        },
        {
          title: "Final",
          matches: [{ rows: "4 / span 2", match: { teams: [SPL, WSAB], winner: 1 } }],
        },
      ]}
    />
  );
}

export const bedwarsTournament: Article = {
  slug: "bed-wars-tournament-2026",
  date: "2026-02-08",
  kind: "Recap",
  title: "Ten Teams Battle It Out in Our First Bed Wars Tournament",
  dek: "CTF teams and friends from across our community spent Saturday night on Hypixel, and despite their name, We Suck At Bedwars beat Squid Proxy Lovers in the final.",
  author: "Edward Z.",
  minutes: 4,
  image: {
    src: bedwarsBridges,
    alt: "Yellow and blue players bridging between floating islands in a Bed Wars match",
  },
  Body: () => (
    <>
      <P>
        Last night, we hosted our very first Hypixel Bed Wars tournament! So many of us got into cybersecurity through
        Minecraft in one way or another, so we wanted to find out which team had the strongest Minecraft PvPers. Ten
        teams of four signed up, from CTF teams like Squid Proxy Lovers, tjcsc, and UofT to teams with names like THEM?!
        and We Suck At Bedwars, and the games kept going for more than four hours.
      </P>

      <H2>How it worked</H2>
      <P>
        The tournament was open to CTF and non-CTF teams and to schools, and each CTF team could enter up to two Bed Wars
        teams so that more of their members could play. Every match was four against four on a map the organizers picked
        at random, every match was a best of three, and teams played in a single-elimination bracket, so one lost match
        meant you were out.
      </P>
      <P>
        To keep things fair, we borrowed our item rules from Ranked Bed Wars. Some of the strongest items only unlocked
        partway through a game, and a couple were banned altogether.
      </P>
      <Facts
        title="Item rules"
        items={[
          { label: "Allowed after Diamond II", value: "Invisibility, jump boost, and speed potions, obsidian, and bows" },
          { label: "Allowed after your bed breaks", value: "Ender pearls and knockback sticks" },
          { label: "Never allowed", value: "Rotational items and fireballing resources" },
          { label: "Breaking a rule", value: "Disqualifies the whole team" },
        ]}
      />

      <H2>The bracket</H2>
      <P>
        Squid Proxy Lovers, the top seed, made it past UofT and then tjcsc. On the other side, We Suck At Bedwars beat 4
        Big Bytes and misc 1, which set up a final between the top two seeds. In the end, We Suck At Bedwars proved their
        name completely wrong and won the final, and with it the whole tournament. Congratulations!
      </P>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <BedwarsBracket />
        </div>
        <figcaption className="mt-3 text-sm leading-6 text-stone-500">
          Every result from the night, with seeds. Each match was a best of three.
        </figcaption>
      </figure>
      <Figure
        src={bedwarsBracket}
        alt="The tournament bracket on BracketHQ, with each round's winners written in by hand in red"
        caption="The bracket as we used it on the night, with the winners written in by hand as each match finished."
        dark
      />

      <H2>Prizes</H2>
      <P>
        As champions, We Suck At Bedwars take home four $30 Chipotle gift cards, one for each player, along with a domain
        from gen.xyz, one of our Advent of CTF sponsors.
      </P>

      <H2>Watch it back</H2>
      <P>
        acni streamed the whole tournament live on YouTube, so if you missed it, or you just want to relive that final,
        you can watch every game from the first lobby to the very last bed.
      </P>
      <a
        href={STREAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 block overflow-hidden rounded-2xl bg-gray-950 shadow-lg ring-1 ring-stone-900/10 lg:-mx-28"
      >
        <div className="relative aspect-video">
          <Image
            src={bedwarsLobby}
            alt="The Bed Wars lobby on Hypixel, with the giant Bed Wars sign above the entrance"
            fill
            sizes="(min-width: 1024px) 60rem, 100vw"
            className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-20 place-items-center rounded-full bg-red-600 text-white shadow-2xl shadow-black/60 transition-transform duration-300 group-hover:scale-110">
              <HiPlay className="ml-1 size-10" aria-hidden="true" />
            </span>
          </span>
        </div>
        <span className="flex items-center gap-2 px-5 py-4 font-semibold text-white">
          Cyberstudents&rsquo; Bedwars Tournament, streamed by acni (4 hours, 24 minutes)
          <HiExternalLink className="size-4 shrink-0" aria-hidden="true" />
        </span>
      </a>
      <Gallery
        images={[
          { src: bedwarsFlower, alt: "Green and red bridges stretching over a giant pink flower island" },
          { src: bedwarsIslands, alt: "An aerial view of three floating island bases connected by bridges" },
          { src: bedwarsGameOver, alt: "The Game Over screen at the end of a match, with players gathered on a sand island" },
        ]}
        caption="A few moments from the stream."
      />
      <Facts
        items={[
          { label: "Date", value: "Saturday, February 7, 2026" },
          { label: "Teams", value: "10 teams of four" },
          { label: "Format", value: "Single elimination, best of three" },
          { label: "Server", value: "Hypixel" },
          { label: "Champions", value: "We Suck At Bedwars" },
          { label: "Runners-up", value: "Squid Proxy Lovers" },
          { label: "Hosts", value: "Vipin and acni" },
        ]}
      />
      <P>
        Thank you so much to every team who played and to everyone who tuned in to watch, and a huge thank you to Vipin
        and acni for organizing and streaming the whole night! If you have an idea for our next community event, let our{" "}
        <A href="/about#team">community managers</A> know on Discord.
      </P>
    </>
  ),
};
