import Image from "next/image";
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowUpDown,
  Award,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Network,
  ShieldCheck,
  Trophy,
} from "lucide-react";

import logo from "~/../public/logo-rounded.png";

const outcomes = [
  {
    title: "College",
    description: "Credit, placement, and stronger degree pathways",
    icon: GraduationCap,
  },
  {
    title: "Certifications",
    description: "A clearer route into industry-recognized credentials",
    icon: Award,
  },
  {
    title: "Competitions",
    description: "Practical confidence in CTFs and team environments",
    icon: Trophy,
  },
  {
    title: "Industry",
    description: "A portfolio of skills grounded in real scenarios",
    icon: BriefcaseBusiness,
  },
] as const;

export default function PathwayDiagram() {
  return (
    <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#090f19] p-5 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(103,232,249,0.12),transparent_36%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,32px_32px,32px_32px]"
      />

      <div className="relative grid gap-5 md:grid-cols-[minmax(0,1fr)_9rem_minmax(0,1fr)] md:items-center">
        <article className="rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.045] p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-cyan-300 uppercase">AP course</p>
              <h3 className="mt-1 text-xl font-semibold text-white">AP Cybersecurity</h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Risk, threats, layered defenses, detection, and security across networks, devices, applications, and
                data.
              </p>
            </div>
          </div>

          <div className="my-4 flex items-center gap-3 text-xs font-medium tracking-wide text-gray-500 uppercase">
            <span className="h-px flex-1 bg-white/10" />
            <ArrowUpDown className="size-4 text-cyan-300" aria-hidden="true" />
            <span>skills reinforce each other</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-mono text-xs tracking-[0.14em] text-gray-400 uppercase">Industry alignment</p>
            <div className="mt-2 flex items-center gap-3">
              <Award className="size-5 text-cyan-300" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">CompTIA Security+</p>
                <p className="text-sm text-gray-400">Security operations and foundational defensive skills</p>
              </div>
            </div>
          </div>
        </article>

        <div className="order-first flex flex-col items-center text-center md:order-none">
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 rounded-3xl bg-cyan-300/20 blur-2xl" />
            <Image
              src={logo}
              alt=""
              className="relative size-20 rounded-3xl border border-white/15 shadow-xl shadow-cyan-950/50 md:size-24"
            />
          </div>
          <p className="mt-4 font-mono text-xs tracking-[0.16em] text-cyan-300 uppercase">The bridge</p>
          <p className="mt-1 font-semibold text-white">CyberStudents</p>
          <p className="mt-1 max-w-36 text-xs leading-5 text-gray-400">Labs, CTFs, guidance, and open practice</p>
          <ArrowLeftRight className="mt-4 hidden size-6 text-cyan-300 md:block" aria-hidden="true" />
          <ArrowUpDown className="mt-4 size-6 text-cyan-300 md:hidden" aria-hidden="true" />
        </div>

        <article className="rounded-3xl border border-violet-300/15 bg-violet-300/[0.045] p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-300/10 text-violet-200">
              <Network className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-violet-300 uppercase">AP pilot pathway</p>
              <h3 className="mt-1 text-xl font-semibold text-white">AP Networking</h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Configure, secure, troubleshoot, and reason about the network infrastructure modern systems depend on.
              </p>
            </div>
          </div>

          <div className="my-4 flex items-center gap-3 text-xs font-medium tracking-wide text-gray-500 uppercase">
            <span className="h-px flex-1 bg-white/10" />
            <ArrowUpDown className="size-4 text-violet-300" aria-hidden="true" />
            <span>skills reinforce each other</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-mono text-xs tracking-[0.14em] text-gray-400 uppercase">Industry alignment</p>
            <div className="mt-2 flex items-center gap-3">
              <Award className="size-5 text-violet-300" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">CompTIA Network+</p>
                <p className="text-sm text-gray-400">Networking concepts, operations, and troubleshooting</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="relative mx-auto h-18 max-w-4xl" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-8 border-l border-cyan-300/25" />
        <div className="absolute top-0 right-1/4 h-8 border-l border-violet-300/25" />
        <div className="absolute top-8 right-1/4 left-1/4 border-t border-white/15" />
        <div className="absolute top-8 left-1/2 h-8 border-l border-white/15" />
        <ArrowDown className="absolute bottom-0 left-1/2 size-4 -translate-x-1/2 text-cyan-300" />
      </div>

      <div className="relative">
        <div className="mb-4 flex items-center justify-center gap-3 text-center">
          <BookOpenCheck className="size-4 text-cyan-300" aria-hidden="true" />
          <p className="font-mono text-xs tracking-[0.16em] text-gray-400 uppercase">Portable outcomes</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome) => {
            const Icon = outcome.icon;

            return (
              <div key={outcome.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <Icon className="size-5 text-cyan-300" aria-hidden="true" />
                <p className="mt-3 font-semibold text-white">{outcome.title}</p>
                <p className="mt-1 text-sm leading-5 text-gray-400">{outcome.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative mt-6 flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-sm text-gray-400">
        <Building2 className="mt-0.5 size-4 shrink-0 text-gray-500" aria-hidden="true" />
        <p>
          CyberStudents supplements the classroom experience; it does not replace College Board coursework or CompTIA
          certification preparation. The goal is to make the handoff between them more practical and less intimidating.
        </p>
      </div>
    </div>
  );
}
