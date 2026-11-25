import frameworkLogos from "~/../public/history/framework-logos.webp";
import { SkillMatrix } from "~/app/_home/Pathway";
import { AP_SKILLS, frameworkCategories } from "~/data/frameworks";
import { A, H2, List, P } from "../_components";
import type { Article } from "./types";

const count = (kind: "ap" | "nice" | "mitre") =>
  new Set(frameworkCategories.flatMap((c) => c.alignments.filter((a) => a.kind === kind).map((a) => a.code))).size;

export const frameworkMapping: Article = {
  slug: "challenges-mapped-to-ap-cybersecurity",
  date: "2025-07-15",
  kind: "Story",
  title: "Our Challenges Now Map to AP® Cybersecurity, NICE, and MITRE ATT&CK",
  dek: "We tagged every challenge category with the skills it practices, so teachers can find the right challenge for a lesson and students can see where their practice leads.",
  author: "Edward Z.",
  minutes: 4,
  image: { src: frameworkLogos, alt: "The NICE Framework, MITRE ATT&CK, and AP logos" },
  Body: () => (
    <>
      <P>
        A good CTF challenge always teaches you something, but it isn&rsquo;t always obvious what that something is.
        This summer, we set out to change that by mapping each of our six challenge categories to three frameworks that
        teachers, employers, and the security industry already use.
      </P>
      <List
        items={[
          <>
            <strong>AP® Cybersecurity</strong>, the College Board&rsquo;s new high school course, whose course and exam
            description lays out the skills students are expected to build, from analyzing risk to detecting attacks.
          </>,
          <>
            <strong>The NICE Workforce Framework</strong>, which describes the work roles people actually hold in
            cybersecurity jobs.
          </>,
          <>
            <strong>MITRE ATT&amp;CK</strong>, the industry&rsquo;s catalog of the techniques real attackers use.
          </>,
        ]}
      />

      <H2>Why AP® Cybersecurity</H2>
      <P>
        So many of our members are in high school, and a new AP® course means more classrooms will be teaching
        cybersecurity than ever before. We wanted teachers to be able to pick a challenge that lines up with what their
        class is learning, and students to be able to see how a puzzle they solved for fun connects to the skills on
        the course. Our categories practice {count("ap")} of the course&rsquo;s skills, such as &ldquo;
        {AP_SKILLS["1.B"]}&rdquo;
      </P>
      <figure className="mt-10 rounded-2xl bg-[#0c1420] p-5 text-gray-200 shadow-lg sm:p-8 lg:-mx-28">
        <SkillMatrix stacked />
      </figure>

      <H2>NICE and MITRE ATT&amp;CK, too</H2>
      <P>
        Every category is also tagged with the NICE work roles and ATT&amp;CK techniques it touches, {count("nice")}{" "}
        work roles and {count("mitre")} techniques in all. A web exploitation challenge, for example, practices the same
        initial access technique (T1190, exploiting a public-facing application) that defenders watch for every day.
      </P>

      <H2>Where you&rsquo;ll see it</H2>
      <P>
        These tags will appear across our site starting with Advent of CTF 2025 this December, where you can hover over
        any code to read exactly what it means. Every challenge we&rsquo;ve written stays free in our{" "}
        <A href="/challenges">challenge archive</A>, so teachers and clubs are welcome to use them however they like.
      </P>
      <p className="mt-8 text-sm leading-6 text-stone-500">
        AP® is a trademark registered by the College Board, which is not affiliated with and does not endorse
        CyberStudents.
      </p>
    </>
  ),
};
