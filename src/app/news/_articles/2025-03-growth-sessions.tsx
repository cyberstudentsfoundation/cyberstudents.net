import { Facts, H2, P } from "../_components";
import { GoalCard } from "../_visuals";
import type { Article } from "./types";

// From the community announcement of 2025-03-22 and the reminder of 2025-03-28. Times are Eastern, as Discord showed
// them. The two questions are the announcement's own.

export const growthSessions: Article = {
  slug: "introducing-infosec-growth-sessions",
  date: "2025-03-22",
  kind: "Announcement",
  title: "Introducing InfoSec Growth Sessions",
  dek: "Starting next Friday, members can meet up every week to share what they've learned, set goals for the week ahead, and get help staying on track.",
  author: "CyberStudents",
  minutes: 2,
  visual: () => <GoalCard className="h-full" />,
  Body: () => (
    <>
      <P>
        Our community managers are excited to announce our newest initiative, InfoSec Growth Sessions! These weekly
        meetups are a chance to connect with like-minded students, figure out your goals, and pick up advice from other
        students and from people already working in the industry.
      </P>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <GoalCard />
        </div>
        <figcaption className="mt-3 text-sm leading-6 text-stone-500">
          The two questions to think about before every session.
        </figcaption>
      </figure>

      <H2>How they work</H2>
      <P>
        Before each session, we&rsquo;d love for you to think about two questions. What progress have you made in your
        cybersecurity journey this past week, and what are your top learning goals for the week ahead? If you like, post
        your answers in our cyber chat before we start, so everyone can cheer each other on.
      </P>
      <P>
        During the session, we talk through what everyone is working on and help with anything that&rsquo;s getting in
        the way, whether that&rsquo;s managing your time, setting goals you can actually reach, or just staying on track.
      </P>
      <Facts
        items={[
          { label: "When", value: "Fridays, 8:30 to 9:45 PM Eastern" },
          { label: "First session", value: "Friday, March 28, 2025" },
          { label: "Where", value: "Our Discord server" },
          { label: "Hosts", value: "Our community managers" },
        ]}
      />
      <P>
        We hope to see as many of you there as possible! If you have any questions, send a message to anyone on our
        community manager team.
      </P>
    </>
  ),
};
