import { H2, P } from "../_components";
import { ChessClock } from "../_visuals";
import type { Article } from "./types";

// From cosmi's announcement of 2025-08-31 and the posts of 2025-09-01:
// blitz on Chess.com with five-minute games, a bracket built from members who reacted or posted their username in the
// conference chat, and the Game Night Winner role, held until someone else wins any game night. NoahB won.

export const laborDayChess: Article = {
  slug: "labor-day-chess-tournament",
  date: "2025-09-01",
  kind: "Story",
  title: "NoahB Wins Our Labor Day Blitz Chess Tournament",
  dek: "Members spent Labor Day evening playing five-minute games on Chess.com, and the winner became our very first Game Night Winner.",
  author: "Edward Z.",
  minutes: 2,
  visual: () => <ChessClock role="Game Night Winner" className="h-full" />,
  Body: () => (
    <>
      <P>
        Tonight, members swapped CTF challenges for chess boards in our Labor Day Blitz Chess Tournament! Blitz is just
        normal chess with a much shorter clock, and every game tonight gave each player five minutes in total, so moves
        came fast and the bracket moved even faster.
      </P>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <ChessClock role="Game Night Winner" />
        </div>
        <figcaption className="mt-3 text-sm leading-6 text-stone-500">
          Five minutes on each clock, and a new role for whoever came out on top.
        </figcaption>
      </figure>
      <P>
        Players joined us in the Conference Room, dropped their Chess.com usernames in the chat to be added to the
        bracket, and played their way through it one match at a time.
      </P>

      <H2>A brand new role</H2>
      <P>
        This tournament came with a prize of its own, too. The winner takes home the new Game Night Winner role, and they
        get to keep it until someone else wins one of our game nights, whatever we happen to be playing.
      </P>
      <P>
        Congratulations to NoahB, our very first official Game Night Winner! Thank you to cosmi for organizing tonight,
        and to everyone who came out to play. If you have an idea for a game night, let one of our community managers
        know, and we&rsquo;ll see you at the next one for a chance to take the throne.
      </P>
    </>
  ),
};
