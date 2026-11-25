import Image, { type StaticImageData } from "next/image";

import pfpAlex from "~/../public/staff-pfps/alex.png";
import pfpAmbush from "~/../public/staff-pfps/ambush.png";
import pfpKshau from "~/../public/staff-pfps/kshau.png";
import pfpKushi from "~/../public/staff-pfps/kushi.png";
import pfpLogix from "~/../public/staff-pfps/logix.png";
import pfpSkeleton from "~/../public/staff-pfps/lordskeletonman.png";
import { BOILERPLATE_2024, Dateline, Facts, H2, P } from "../_components";
import type { Article } from "./types";

// Sources: the staff application announcements of April 13 and 19, 2024 (role descriptions and spots) and the results
// of April 25, 2024 (names as written there; "Shau" is kshau and "AmbushDeKewl" is Ambush on the team list). Mister Lyne
// has no picture on file, so the card shows an initial.

type NewStaff = { name: string; pfp?: StaticImageData };

const ROLES: { role: string; text: string; tint: string; people: NewStaff[] }[] = [
  {
    role: "CTF Challenge Developers",
    text: "Write and manage challenges for our CTF, help players with challenges and submissions, run the logistics of each round, and contribute to technical projects like our website and bots.",
    tint: "from-cyan-500/25",
    people: [
      { name: "kshau", pfp: pfpKshau },
      { name: "Logix", pfp: pfpLogix },
    ],
  },
  {
    role: "Server Moderators",
    text: "Keep the server welcoming by de-escalating situations and applying the rules fairly, answer questions about the server, and handle reports and ban appeals.",
    tint: "from-violet-500/25",
    people: [
      { name: "Alex Volkov", pfp: pfpAlex },
      { name: "Lord SkeletonMan", pfp: pfpSkeleton },
      { name: "AmbushDeKewl", pfp: pfpAmbush },
    ],
  },
  {
    role: "Community Managers",
    text: "Organize events like game nights, movie nights, and webinars, and share our news on Discord and other platforms.",
    tint: "from-amber-500/25",
    people: [{ name: "Mister Lyne" }, { name: "Kushi", pfp: pfpKushi }],
  },
];

function StaffBoard({ className }: { className?: string }) {
  return (
    <div className={`bg-[#0b1120] p-5 text-white sm:p-7 ${className ?? ""}`}>
      <div className="grid w-full gap-3 sm:grid-cols-3">
        {ROLES.map((r) => (
          <div key={r.role} className={`rounded-xl bg-gradient-to-b ${r.tint} to-white/[0.03] p-4 ring-1 ring-white/10`}>
            <p className="text-sm font-bold">{r.role}</p>
            <ul className="mt-3 space-y-2.5">
              {r.people.map((p) => (
                <li key={p.name} className="flex items-center gap-2.5">
                  {p.pfp ? (
                    <Image src={p.pfp} alt="" className="size-9 shrink-0 rounded-full ring-2 ring-white/15" sizes="36px" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold ring-2 ring-white/15"
                    >
                      {p.name[0]}
                    </span>
                  )}
                  <span className="truncate text-sm font-medium text-gray-100">{p.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export const newStaff: Article = {
  slug: "new-staff-april-2024",
  date: "2024-04-25",
  kind: "Press release",
  title: "CyberStudents Welcomes Seven New Staff Members After Open Applications",
  dek: "Two challenge developers, three moderators, and two community managers join the team as the server keeps growing.",
  author: "CyberStudents",
  minutes: 3,
  visual: () => <StaffBoard className="flex h-full items-center" />,
  about: BOILERPLATE_2024,
  Body: () => (
    <>
      <P>
        <Dateline date="2024-04-25" />
        CyberStudents today welcomed seven new members to its staff team, chosen from the applications it opened to the
        community on April 13. The new team members fill three roles, writing challenges for our CTF, moderating the
        server, and running community events, as the server keeps growing.
      </P>
      <figure className="mt-10 lg:-mx-28">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-900/10">
          <StaffBoard />
        </div>
        <figcaption className="mt-3 text-sm leading-6 text-stone-500">Our new staff, by role.</figcaption>
      </figure>

      <H2>Three roles, one application</H2>
      <P>
        Applications were open for a week, until April 20, and every role asked applicants to already be active in the
        server. Vipin and GodderE2D read through every application before making their choices.
      </P>
      {ROLES.map((r) => (
        <div key={r.role} className="mt-8">
          <h3 className="text-xl font-bold text-stone-950">{r.role}</h3>
          <p className="mt-2 text-lg leading-8 text-stone-800">{r.text}</p>
          <p className="mt-2 text-stone-600">
            Joining the team: <span className="font-semibold text-stone-900">{r.people.map((p) => p.name).join(", ")}</span>
          </p>
        </div>
      ))}
      <Facts
        items={[
          { label: "Applications opened", value: "April 13, 2024" },
          { label: "Applications closed", value: "April 20, 2024" },
          { label: "New staff", value: "Seven, across three roles" },
          { label: "Requirement", value: "Activity in the server before applying" },
        ]}
      />

      <H2>Welcome to the team</H2>
      <P>
        Congratulations to everyone who was accepted, and thank you to every member who took the time to apply. We
        can&rsquo;t wait to see what this team builds together!
      </P>
    </>
  ),
};
