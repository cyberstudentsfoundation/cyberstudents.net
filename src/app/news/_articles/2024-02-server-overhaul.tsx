import { site } from "~/data/site";
import { A, BOILERPLATE_2024, Dateline, Facts, H2, List, P } from "../_components";
import { ChannelMap } from "../_visuals";
import type { Article } from "./types";

// Sources: the server update announcements v1.1 (January 19, 2024), v1.2 "The Educational Update" (January 23),
// v1.3 (January 31), and the user-experience update of February 17, 2024 (from the announcements channel).
// The CyberStart write-ups repository is github.com/alphyos/CyberStart-2024, credited to alphyos and kolmus.

export const serverOverhaul: Article = {
  slug: "server-overhaul-2024",
  date: "2024-02-17",
  kind: "Press release",
  title: "CyberStudents Opens Free Resource Libraries, Resume Reviews, and a Guided Welcome for New Members",
  dek: "A month of updates has turned our old CyberStart help server into a place to learn, ask questions, and plan a career in cybersecurity.",
  author: "CyberStudents",
  minutes: 3,
  visual: () => <ChannelMap className="h-full" />,
  about: BOILERPLATE_2024,
  Body: () => (
    <>
      <P>
        <Dateline date="2024-02-17" />
        One month after CyberStart closed and our server became CyberStudents, we&rsquo;re wrapping up a top-to-bottom
        rebuild of the server. Over four updates since mid-January, we&rsquo;ve added libraries of
        free learning resources, places to ask questions and follow security news, a professional corner for resumes
        and networking, and a guided welcome that helps every new member find their way around.
      </P>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <ChannelMap />
        </div>
        <figcaption className="mt-3 text-sm leading-6 text-stone-500">
          A sketch of the channel list after the updates, grouped by topic, with every channel named as it appears in
          the server.
        </figcaption>
      </figure>

      <H2>A library anyone can add to</H2>
      <P>
        The new Educational category gives each kind of resource its own forum, so a great book recommendation
        doesn&rsquo;t get buried under a week of chat. Members are strongly encouraged to post the resources they find
        useful, so the library grows with the community.
      </P>
      <List
        items={[
          <>
            <strong>Books, courses and learning, and certifications</strong> collect free resources for studying, shared
            by members.
          </>,
          <>
            <strong>Scholarships</strong> and <strong>cyber competitions</strong> list opportunities with deadlines, so
            members can find them while there&rsquo;s still time to apply.
          </>,
          <>
            <strong>#cyber-news</strong> keeps up with the latest attacks and vulnerabilities, and{" "}
            <strong>#cyber-questions</strong> is the place to ask anything about security or IT.
          </>,
          <>
            Members who hold a certification, like GIAC GFACT, CompTIA CASP+, or CISSP, can now redeem a role for it,
            and anyone can add a role showing how much work experience they have.
          </>,
        ]}
      />
      <P>
        For members who miss CyberStart, alphyos and kolmus have published{" "}
        <A href="https://github.com/alphyos/CyberStart-2024">write-ups for every CyberStart challenge</A> on GitHub, a
        complete record of the game that brought so many of us here.
      </P>

      <H2>Resumes, networking, and talks</H2>
      <P>
        Our new Professional category is for the next step after learning. In <strong>#linkedin-sharing</strong>,
        members can connect with each other, and in <strong>#resume-reviews</strong> they can get feedback on a resume
        from fellow members. The Conference Room, a voice channel for talks, webinars, and live events, is ready for our first
        cybersecurity talks, and members can pick up the IT Conference and Talks ping so they never miss one.
      </P>

      <H2>A guided welcome</H2>
      <P>
        Everyone who joins now sees a welcome screen and a few quick questions that set up their roles, and the new
        Server Guide tab at the top of the channel list holds our briefing, an introduction to the community, and an
        explanation of every role. Members can also opt in or out of channels to make the server their own, including
        new channels for programming, video games, and music. Messages in languages other than English are welcome too,
        as long as they follow the same rules as everything else.
      </P>
      <Facts
        items={[
          { label: "Updates since January 13", value: "Five, from v1.0 to today" },
          { label: "Resource forums", value: "Books, scholarships, competitions, courses, certifications" },
          { label: "Community tournaments", value: "Starting February 24, 2024" },
          { label: "Cost to join", value: "Free" },
        ]}
      />

      <H2>What&rsquo;s next</H2>
      <P>
        Community tournaments begin on February 24, and members can grab the Community Events ping to join in. If
        you&rsquo;re a student learning cybersecurity, or you know one who is, <A href={site.discord}>come say hello on
        Discord</A>!
      </P>
    </>
  ),
};
