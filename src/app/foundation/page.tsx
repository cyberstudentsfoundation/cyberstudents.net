import Link from "next/link";
import type { Metadata } from "next";
import { HiArrowRight } from "react-icons/hi2";
import { TbSparkles } from "react-icons/tb";
import { MdOutlineSchool, MdOutlineHandshake, MdSecurity } from "react-icons/md";

import { Button } from "~/components/ui/button";

export const metadata: Metadata = {
  title: "CyberStudents Foundation · CyberStudents",
  description:
    "Learn about the CyberStudents Foundation—our nonprofit initiative focused on accessible cybersecurity education, competitions, and career pathways.",
};

const stats = [
  { label: "Founded", value: "Dec 2, 2021" },
  { label: "Community", value: "3,000+ members" },
  { label: "Student reach", value: "85+ countries" },
  { label: "Programs", value: "Daily practice & annual CTFs" },
];

const focusAreas = [
  {
    title: "Open learning access",
    icon: <MdOutlineSchool className="h-6 w-6 text-cyan-700" />,
    description:
      "Resources built for high schoolers, college students, and career changers to learn cybersecurity with practical labs and archived challenges.",
    items: [
      "Guides for CTFs and cyber fundamentals",
      "Daily practice challenges with hints and write-ups",
      "Roadmaps for certificates and coursework",
    ],
  },
  {
    title: "Competitions with purpose",
    icon: <TbSparkles className="h-6 w-6 text-cyan-700" />,
    description:
      "Weekend-long and month-long events (like Advent of CTF) that stay free, beginner-friendly, and reusable for classrooms and clubs.",
    items: [
      "Seasonal CTF events and leaderboards",
      "Challenge archives for teaching and self-study",
      "Mentorship for new teams entering competitions",
    ],
  },
  {
    title: "Career Kickstart & educators",
    icon: <MdOutlineHandshake className="h-6 w-6 text-cyan-700" />,
    description:
      "Supporting AP Career Kickstart pilots and educators with practical labs, lesson-aligned exercises, and pathways that bridge to industry.",
    items: [
      "Class-ready labs and collaboration ideas",
      "Comparisons for Security+ / Network+ prep",
      "Outreach to teachers and clubs for co-design",
    ],
  },
  {
    title: "Safety & trust",
    icon: <MdSecurity className="h-6 w-6 text-cyan-700" />,
    description:
      "Strong privacy, responsible AI use, and platform reliability—including SOC 2 Type II ambitions and clear moderation policies.",
    items: [
      "Student-first privacy and data minimization",
      "Guidance on digital hygiene and safer platforms",
      "Transparent policies and incident readiness",
    ],
  },
];

const roadmap = [
  {
    period: "2025",
    focus: "Build the foundation",
    items: [
      "Launch the Foundation resource library with archived Advent of CTF and Gym challenges.",
      "Publish educator-friendly starter packs for CyberPatriot, picoCTF, and beginner competitions.",
      "Shape AP Career Kickstart-aligned study plans as the national pilot rolls out.",
    ],
  },
  {
    period: "2026",
    focus: "Scale access",
    items: [
      "Expand scholarship, competition, and internship trackers for high school and college students.",
      "Release collaborative lab experiences that classrooms can run without extra infrastructure.",
      "Offer career and certificate pathways that bridge AP content to Security+ and workforce readiness.",
    ],
  },
  {
    period: "2027",
    focus: "Sustain & share",
    items: [
      "Keep every challenge, lab, and guide freely available and updated for educators worldwide.",
      "Formalize partnerships with schools, clubs, and community programs to co-host events.",
      "Report on impact, diversity, and access while strengthening privacy and security controls.",
    ],
  },
];

export default function FoundationPage() {
  return (
    <div className="bg-slate-50 text-gray-900">
      <main className="mx-4 mb-16 flex justify-center pt-10 sm:mx-8 sm:mb-24 sm:pt-16 md:mx-10">
        <div className="flex w-full max-w-(--breakpoint-2xl) flex-col gap-16 sm:gap-20 lg:gap-24">
          <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-12 shadow-md sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute top-6 -left-12 h-48 w-48 rounded-full bg-cyan-100 blur-3xl" />
              <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-sky-100 blur-3xl" />
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-800 uppercase">
                  CyberStudents Foundation
                </div>
                <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
                  Expanding cybersecurity education, access, and opportunity.
                </h1>
                <p className="text-lg leading-relaxed text-gray-700">
                  We are the nonprofit initiative of CyberStudents, built to keep cybersecurity learning open, hands-on,
                  and welcoming. From daily challenges to national competitions, we make sure students and educators
                  have practical resources, guidance, and community support.
                </p>
                <p className="text-base leading-relaxed text-gray-700">
                  Founded on December 2, 2021 and reimagined after the CyberStart sunset in 2024, the Foundation backs
                  learners at every stage—whether you are exploring your first CTF, prepping for AP Career Kickstart, or
                  mapping out a pathway to workforce credentials.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="text-base">
                    <a href="mailto:admin@cyberstudents.net">
                      Contact the foundation
                      <HiArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="text-base">
                    <a
                      href="https://discord.com/invite/cyberstudents-916144903686336513"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Join the community
                    </a>
                  </Button>
                  <Button asChild variant="ghost" className="text-base text-cyan-800 hover:text-cyan-900">
                    <Link href="#roadmap">See our roadmap</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-[0_6px_24px_rgba(15,23,42,0.05)]"
                    >
                      <div className="text-xs tracking-wide text-gray-500 uppercase">{stat.label}</div>
                      <div className="mt-1 text-lg font-semibold text-gray-900">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:gap-5">
                <div className="relative col-span-2 h-52 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-100 via-white to-cyan-200 shadow-lg sm:h-64">
                  {/* Replace with a hero-style illustration of students collaborating virtually */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#e0f2fe_0,_transparent_40%)]" />
                  <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/60 bg-white/80 p-4 text-sm text-gray-700 shadow-md backdrop-blur">
                    <p className="font-semibold text-gray-900">Learning is collaborative</p>
                    <p className="mt-1 text-gray-700">
                      Community-led mentoring, daily practice, and evergreen archives make cybersecurity approachable.
                    </p>
                  </div>
                </div>
                <div className="relative h-48 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-100 to-cyan-100 shadow-lg">
                  {/* Replace with a photo of a student-focused workshop or classroom lab */}
                  <div className="absolute inset-0 flex items-end p-4">
                    <div className="rounded-lg bg-white/85 p-3 text-gray-800 shadow-sm backdrop-blur">
                      <p className="text-sm font-semibold">Practice-first</p>
                      <p className="text-sm text-gray-700">Hands-on labs, hints, and write-ups stay free forever.</p>
                    </div>
                  </div>
                </div>
                <div className="relative h-48 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 via-white to-sky-100 shadow-lg">
                  {/* Replace with a photo of students presenting or celebrating after a competition */}
                  <div className="absolute inset-0 flex items-end p-4">
                    <div className="rounded-lg bg-white/85 p-3 text-gray-800 shadow-sm backdrop-blur">
                      <p className="text-sm font-semibold">Competitions with purpose</p>
                      <p className="text-sm text-gray-700">Seasonal CTFs that remain accessible to new players.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-12">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold tracking-wide text-cyan-800 uppercase">What we focus on</p>
              <h2 className="font-serif text-3xl sm:text-4xl">Programs built for students, educators, and teams.</h2>
              <p className="max-w-4xl text-lg text-gray-700">
                Everything we publish is designed to be used in classrooms, clubs, and self-study. We archive our CTF
                challenges, create tailored guides for CyberPatriot, picoCTF, and other competitions, and connect each
                path to career-ready credentials.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {focusAreas.map((area) => (
                <div
                  key={area.title}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 shadow-[0_8px_28px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100">{area.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900">{area.title}</h3>
                  </div>
                  <p className="text-gray-700">{area.description}</p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-700">
                    {area.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-600" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
              <p className="text-sm font-semibold tracking-wide text-cyan-800 uppercase">How we operate</p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Inclusive, open, and accountable.</h2>
              <p className="mt-4 text-lg text-gray-700">
                The Foundation is student-led with advisors from our community. We emphasize inclusion for
                underrepresented learners, clearer policies for AI and privacy, and transparent reporting on impact.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-[0_6px_24px_rgba(15,23,42,0.05)]">
                  <h3 className="text-lg font-semibold text-gray-900">Access everywhere</h3>
                  <p className="mt-2 text-gray-700">
                    Labs that work in low-resource classrooms, step-by-step write-ups, and translations to help students
                    learn beyond their school&rsquo;s offerings.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-[0_6px_24px_rgba(15,23,42,0.05)]">
                  <h3 className="text-lg font-semibold text-gray-900">Safety-first</h3>
                  <p className="mt-2 text-gray-700">
                    Strong privacy practices, SOC 2 Type II ambitions, and guidance on digital hygiene to keep students,
                    mentors, and partners secure.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-[0_6px_24px_rgba(15,23,42,0.05)]">
                  <h3 className="text-lg font-semibold text-gray-900">Educator partnership</h3>
                  <p className="mt-2 text-gray-700">
                    Co-designing labs with teachers, offering AP-aligned materials, and creating collaborative packet
                    tracer-style experiences without heavy setup.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-[0_6px_24px_rgba(15,23,42,0.05)]">
                  <h3 className="text-lg font-semibold text-gray-900">Transparency</h3>
                  <p className="mt-2 text-gray-700">
                    We share updates openly: new labs, challenge archives, scholarship lists, and policy changes so
                    students can make informed choices.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* Replace with a collage highlighting competitions, labs, and educator workshops */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-slate-50 to-white" />
              <div className="relative p-6 sm:p-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-md backdrop-blur">
                    <p className="text-sm font-semibold text-gray-900">Community labs</p>
                    <p className="text-sm text-gray-700">Reusable CTF challenges and labs for clubs and classrooms.</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-md backdrop-blur">
                    <p className="text-sm font-semibold text-gray-900">Educator pilots</p>
                    <p className="text-sm text-gray-700">
                      Practical exercises that pair with AP Career Kickstart topics.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-md backdrop-blur">
                    <p className="text-sm font-semibold text-gray-900">Competitions</p>
                    <p className="text-sm text-gray-700">Advent of CTF, CSD CTF, and daily practice that stay free.</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-md backdrop-blur">
                    <p className="text-sm font-semibold text-gray-900">Scholarships & careers</p>
                    <p className="text-sm text-gray-700">
                      Up-to-date listings for scholarships, internships, and prep.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="roadmap"
            className="rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-12"
          >
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold tracking-wide text-cyan-800 uppercase">2025–2027 roadmap</p>
              <h2 className="font-serif text-3xl sm:text-4xl">Clear plans to grow with students and educators.</h2>
              <p className="max-w-4xl text-lg text-gray-700">
                We prioritize sustainable access: keeping every challenge archived, supporting AP Career Kickstart as it
                expands nationwide, and helping learners move from foundational skills to industry-recognized
                certificates.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              {roadmap.map((entry) => (
                <div
                  key={entry.period}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-[0_8px_28px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold tracking-wide text-cyan-800 uppercase">{entry.period}</span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                      {entry.focus}
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {entry.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-600" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-12">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold tracking-wide text-cyan-800 uppercase">Get involved</p>
              <h2 className="font-serif text-3xl sm:text-4xl">Help us expand cybersecurity education.</h2>
              <p className="max-w-3xl text-lg text-gray-700">
                Whether you are a student, educator, sponsor, or mentor, the Foundation thrives on collaboration. Share
                opportunities, co-design labs, or host a workshop with us—every contribution keeps our resources free
                and practical.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="text-base">
                <a href="mailto:admin@cyberstudents.net">
                  Partner with us
                  <HiArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="text-base">
                <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank" rel="noreferrer">
                  Volunteer or mentor
                </a>
              </Button>
              <Button asChild variant="ghost" className="text-base text-cyan-800 hover:text-cyan-900">
                <Link href="/ctf">Explore our competitions</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
