import cyberstartArchive from "~/../public/cyberstart-archive.png";
import cyberstartHq from "~/../public/history/cyberstart-hq.webp";
import { site } from "~/data/site";
import { A, Dateline, Facts, Figure, H2, List, P, Quote } from "../_components";
import type { Article } from "./types";

// Sources: the server's announcements of December 16, 2023 and January 12 and 13, 2024, the csd-ctf
// round tables (round 1 ran January 14 to 17), and the CyberStart help forum archive (174 challenges). The bot came
// later (its repository was created February 3, 2024), so this release has flags going to ModMail.

export const cyberstudentsLaunches: Article = {
  slug: "cyberstudents-launches",
  date: "2024-01-13",
  kind: "Press release",
  title: "CyberStudents Launches as CyberStart Closes, With New Challenges Starting Tomorrow",
  dek: "The help server that CyberStart players have shared since December 2021 is becoming a community for every student learning cybersecurity, and it's writing its own challenges now.",
  author: "CyberStudents",
  minutes: 3,
  image: {
    src: cyberstartHq,
    alt: "A player's monitor showing the Headquarters Base level map in the CyberStart game",
    position: "70% 40%",
  },
  about:
    "CyberStudents is a student-run cybersecurity community on Discord. Founded in December 2021 as a help server for the CyberStart game, it brings together high school and college students, and anyone else learning cybersecurity, to share resources, compete in capture the flag challenges, and help each other grow.",
  Body: () => (
    <>
      <P>
        <Dateline date="2024-01-13" />
        CyberStart, the online cybersecurity game that brought so many of us together, closed its doors yesterday.
        Today, the Discord server that grew up around it is starting a new chapter as CyberStudents, a community for
        students who want to learn cybersecurity, and tomorrow the first round of challenges written by our own team
        goes live.
      </P>
      <P>
        The server first opened on December 2, 2021, as a place to work through CyberStart challenges together. Since
        then, our help forum has collected discussions on 174 of the game&rsquo;s challenges, with players nudging each
        other past the tricky parts without simply handing over the answers. When we learned that CyberStart would close
        on January 12, we asked members what they wanted this server to become, and we decided to keep the community
        going and open it up to every student interested in security, whether or not they ever played the game.
      </P>
      <Figure
        src={cyberstartArchive}
        alt="A long list of threads in the CyberStart challenge help forum on our Discord server"
        caption="Our CyberStart help forum, which covers 174 of the game's challenges and stays on the server in its own archive category."
        imageClassName="aspect-[16/10] object-cover object-top"
      />

      <H2>What&rsquo;s new today</H2>
      <P>
        CyberStudents launches with a new logo, redecorated channels, and a refreshed leveling system that now climbs
        from Bronze all the way to Diamond. A few more changes arrive with today&rsquo;s update:
      </P>
      <List
        items={[
          <>
            Everyone who was here during the CyberStart era receives the <strong>CyberStart OG</strong> role, a thank
            you to the members who built this community.
          </>,
          <>
            Our CyberStart channels move into an <strong>Archived Channels</strong> category, so the help forum and
            years of conversations stay readable.
          </>,
          <>
            Two members have been handpicked as new server moderators, with staff applications to follow later.
          </>,
          <>
            An educational category with resources, certification paths, cybersecurity news, and talks is on the way in
            an upcoming update.
          </>,
        ]}
      />

      <H2>Challenges, starting tomorrow</H2>
      <P>
        The <strong>#ctf-challenges</strong> channel kicks off tomorrow, January 14, with a first round of challenges
        written by Vipin, one of our new moderators. For now, players send their answers to our ModMail bot, flags use
        the format <code className="font-mono text-base">CSD&#123;flag&#125;</code>, and flags must never be shared with
        anyone else. Members can pick up the CTF ping role to hear about every new challenge as soon as it&rsquo;s out.
      </P>
      <Quote by="From our announcement to members, December 2023">
        We will not be dying as a community, and we will simply be branching off and growing more as a community!
      </Quote>
      <Facts
        items={[
          { label: "Server founded", value: "December 2, 2021" },
          { label: "CyberStart closed", value: "January 12, 2024" },
          { label: "First challenges", value: "January 14, 2024" },
          { label: "Cost to join", value: "Free" },
        ]}
      />

      <H2>How to join</H2>
      <P>
        CyberStudents is free and open to students in high school and college, along with anyone else who wants to
        learn. <A href={site.discord}>Join us on Discord</A>, say hello, and get ready for the first challenge tomorrow.
        We can&rsquo;t wait to see you there!
      </P>
    </>
  ),
};
