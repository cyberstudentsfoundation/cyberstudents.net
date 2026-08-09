import Image from "next/image";
import {
  ArrowDown,
  Award,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Network,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "~/lib/utils";

import logo from "~/../public/logo-rounded.png";

const tracks = [
  {
    tone: "cyan",
    course: {
      // eyebrow: "AP® course",
      title: "AP® Cybersecurity",
      description: "Threats, risk, layered defenses, detection, and security across modern systems.",
      icon: ShieldCheck,
    },
    credential: {
      eyebrow: "Aligned credential",
      title: "CompTIA Security+",
      description: "Foundational security and defensive skills",
      icon: Award,
    },
  },
  {
    tone: "violet",
    course: {
      // eyebrow: "AP® pilot pathway",
      title: "AP® Networking",
      description: "Configure, secure, and troubleshoot the infrastructure modern systems depend on.",
      icon: Network,
    },
    credential: {
      eyebrow: "Aligned credential",
      title: "CompTIA Network+",
      description: "Networking concepts, operations, and troubleshooting",
      icon: Award,
    },
  },
] as const;

const outcomes = [
  {
    title: "College",
    description: "More context for degree pathways and advanced coursework",
    icon: GraduationCap,
  },
  {
    title: "Certifications",
    description: "Practice that supports industry-recognized credentials",
    icon: Award,
  },
  {
    title: "Competitions",
    description: "Experience solving practical problems under pressure",
    icon: Trophy,
  },
  {
    title: "Industry",
    description: "Skills and projects that translate beyond the classroom",
    icon: BriefcaseBusiness,
  },
] as const;

type FlowNodeProps = {
  eyebrow?: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: "cyan" | "violet";
  className?: string;
};

function FlowNode({ eyebrow, title, description, icon: Icon, tone, className }: FlowNodeProps) {
  const isCyan = tone === "cyan";

  return (
    <article
      className={cn(
        "relative z-10 h-full rounded-3xl border p-5 sm:p-6",
        isCyan ? "border-cyan-300/20 bg-[#0a1b24]" : "border-violet-300/20 bg-[#171628]",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-2xl border",
            isCyan
              ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-200"
              : "border-violet-300/20 bg-violet-300/10 text-violet-200",
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div>
          {eyebrow && (
            <p
              className={cn(
                "font-mono text-xs tracking-[0.14em] uppercase",
                isCyan ? "text-cyan-300" : "text-violet-300",
              )}
            >
              {eyebrow}
            </p>
          )}
          <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-300">{description}</p>
        </div>
      </div>
    </article>
  );
}

function CyberStudentsNode({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative z-10 flex min-h-44 flex-col items-center justify-center rounded-[2rem] border border-white/15 bg-[#0c1522]/95 px-8 py-8 text-center shadow-2xl shadow-black/30",
        className,
      )}
    >
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 rounded-3xl bg-cyan-300/20 blur-2xl" />
        <Image
          src={logo}
          alt=""
          className="relative size-20 rounded-3xl border border-white/15 shadow-xl shadow-cyan-950/50"
        />
      </div>
      <p className="mt-4 font-semibold text-white">CyberStudents</p>
      <p className="mt-1 max-w-40 text-xs leading-5 text-gray-400">Labs, challenges, and community practice</p>
    </div>
  );
}

function DesktopConnectors() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 size-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <marker
          id="home-path-cyan-arrow"
          viewBox="0 0 8 8"
          refX="6.5"
          refY="4"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path
            d="M1.25 1.25 6.5 4 1.25 6.75"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
        <marker
          id="home-path-violet-arrow"
          viewBox="0 0 8 8"
          refX="6.5"
          refY="4"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path
            d="M1.25 1.25 6.5 4 1.25 6.75"
            fill="none"
            stroke="#c4b5fd"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
      <path
        d="M20 33.5 V66.5"
        fill="none"
        stroke="#67e8f9"
        strokeOpacity="0.72"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd="url(#home-path-cyan-arrow)"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M80 33.5 V66.5"
        fill="none"
        stroke="#c4b5fd"
        strokeOpacity="0.72"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd="url(#home-path-violet-arrow)"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M34 33.5 V42 Q34 44 36 44 H40.5"
        fill="none"
        stroke="#67e8f9"
        strokeOpacity="0.62"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd="url(#home-path-cyan-arrow)"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M66 33.5 V42 Q66 44 64 44 H59.5"
        fill="none"
        stroke="#c4b5fd"
        strokeOpacity="0.62"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd="url(#home-path-violet-arrow)"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M34 66.5 V58 Q34 56 36 56 H40.5"
        fill="none"
        stroke="#67e8f9"
        strokeOpacity="0.62"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd="url(#home-path-cyan-arrow)"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M66 66.5 V58 Q66 56 64 56 H59.5"
        fill="none"
        stroke="#c4b5fd"
        strokeOpacity="0.62"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd="url(#home-path-violet-arrow)"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function HomePathwayDiagram() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#090f19] p-5 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(103,232,249,0.1),transparent_30%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,32px_32px,32px_32px]"
      />

      <div className="relative lg:hidden">
        <CyberStudentsNode className="mx-auto mb-6 max-w-xs" />
        <div className="grid gap-5 sm:grid-cols-2">
          {tracks.map((track) => (
            <div key={track.course.title} className="flex min-w-0 flex-col">
              <FlowNode {...track.course} tone={track.tone} />
              <div
                className={cn(
                  "flex flex-col items-center gap-1 py-3",
                  track.tone === "cyan" ? "text-cyan-300" : "text-violet-300",
                )}
                aria-hidden="true"
              >
                <span className="h-5 border-l border-current opacity-40" />
                <ArrowDown className="size-5" />
              </div>
              <FlowNode {...track.credential} tone={track.tone} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative hidden grid-cols-[minmax(0,1fr)_15rem_minmax(0,1fr)] grid-rows-[auto_11rem_auto] gap-x-6 lg:grid">
        <DesktopConnectors />
        <FlowNode {...tracks[0].course} tone="cyan" className="col-start-1 row-start-1" />
        <FlowNode {...tracks[1].course} tone="violet" className="col-start-3 row-start-1" />
        <CyberStudentsNode className="col-start-2 row-start-2 self-center" />
        <FlowNode {...tracks[0].credential} tone="cyan" className="col-start-1 row-start-3" />
        <FlowNode {...tracks[1].credential} tone="violet" className="col-start-3 row-start-3" />
      </div>

      <div className="relative mx-auto h-16 max-w-4xl" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-7 border-l border-cyan-300/25" />
        <div className="absolute top-0 right-1/4 h-7 border-l border-violet-300/25" />
        <div className="absolute top-7 right-1/4 left-1/4 border-t border-white/15" />
        <div className="absolute top-7 left-1/2 h-7 border-l border-white/15" />
        <ArrowDown className="absolute bottom-0 left-1/2 size-4 -translate-x-1/2 text-cyan-300" />
      </div>

      <div className="relative">
        <div className="mb-4 flex items-center justify-center gap-3 text-center">
          <BookOpenCheck className="size-4 text-cyan-300" aria-hidden="true" />
          <p className="font-mono text-xs tracking-[0.16em] text-gray-400 uppercase">Where those skills can lead</p>
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
          CyberStudents supplements the classroom experience with practical labs and challenges. Certification
          references describe skills alignment, not guaranteed exam funding or certification.
        </p>
      </div>
    </div>
  );
}
