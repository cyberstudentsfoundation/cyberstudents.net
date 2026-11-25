import { advent2024 } from "~/data/advent-2024";
import { categories, categoryKey, categoryOrder } from "~/data/categories";
import { AP_SKILL_CATEGORIES, mitreHref, type Alignment, type FrameworkKind } from "~/data/frameworks";
import { cn } from "~/lib/utils";
import { ApCode } from "./ApCode";
import { CodeTip, CodeTipProvider } from "./CodeTip";
import { PathwayDiagram, SkillMatrix } from "./Pathway";
import { Heading, TextLink, Wide } from "./ui";

// NICE and ATT&CK codes keep the pill colours from /advent/2025; AP® codes use the College Board's own style.
const PILL: Record<Exclude<FrameworkKind, "ap">, string> = {
  nice: "border-sky-500/25 bg-sky-500/10 text-sky-300",
  mitre: "border-orange-500/25 bg-orange-500/10 text-orange-300",
};

const KIND_ORDER: FrameworkKind[] = ["ap", "nice", "mitre"];

function Code({ a }: { a: Alignment }) {
  if (a.kind === "ap") {
    return (
      <CodeTip
        content={
          <>
            <span className="block text-xs font-semibold text-gray-500">
              AP® Cybersecurity skill {a.code} · {AP_SKILL_CATEGORIES[a.code[0]!]}
            </span>
            {a.title}
          </>
        }
      >
        <button type="button" className="cursor-help rounded-[2px] focus-visible:outline-2 focus-visible:outline-white">
          <ApCode code={a.code} />
        </button>
      </CodeTip>
    );
  }
  const pill = cn(
    "inline-flex h-5 items-center rounded-full border px-2 text-[11px] font-semibold tabular-nums",
    PILL[a.kind],
  );
  return (
    <CodeTip
      content={
        <>
          <span className="block text-xs font-semibold text-gray-500">
            {a.kind === "nice" ? "NICE work role" : "MITRE ATT&CK technique"} {a.code}
          </span>
          {a.title}
          {a.kind === "mitre" && <span className="mt-1 block text-xs text-gray-500">Opens on attack.mitre.org</span>}
        </>
      }
    >
      {a.kind === "mitre" ? (
        <a href={mitreHref(a.code)} target="_blank" rel="noopener noreferrer" className={pill}>
          {a.code}
        </a>
      ) : (
        <button type="button" className={cn(pill, "cursor-help")}>
          {a.code}
        </button>
      )}
    </CodeTip>
  );
}

const SOURCES: { kind: FrameworkKind; href: string; label: string }[] = [
  {
    kind: "nice",
    label: "NICE Workforce Framework work roles",
    href: "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center",
  },
  { kind: "mitre", label: "MITRE ATT&CK techniques", href: "https://attack.mitre.org/" },
  {
    kind: "ap",
    label: "AP® Cybersecurity skills",
    href: "https://apcentral.collegeboard.org/media/pdf/ap-cybersecurity-course-framework.pdf",
  },
];

const DELAYS = ["", "motion-safe:intersect:motion-delay-[120ms]", "motion-safe:intersect:motion-delay-[240ms]"];

export function Categories() {
  return (
    <section id="categories" aria-labelledby="categories-title" className="scroll-mt-28 bg-[#111b29] text-gray-200">
      <Wide className="py-20 sm:py-28">
        <div>
          <div className="max-w-3xl">
            <Heading id="categories-title" className="text-white">
              Challenges from six core categories
            </Heading>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              Our challenges span six of the most popular and practical categories in cybersecurity, the same ones
              you&rsquo;ll find in other CTFs and hands-on training environments. Whatever your skill level, there&rsquo;s
              something here for you to learn from, and each category is mapped to the work roles, attack techniques,
              and AP® Cybersecurity skills it helps you practice.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {SOURCES.map((s) => (
                <li key={s.kind} className="flex items-center gap-2">
                  {s.kind === "ap" ? (
                    <ApCode code="1.A" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className={cn("inline-flex h-5 items-center rounded-full border px-2 text-[11px] font-semibold", PILL[s.kind])}
                    >
                      {s.kind === "nice" ? "PR-VAM" : "T1190"}
                    </span>
                  )}
                  <TextLink href={s.href} className="text-gray-300! decoration-gray-500!">
                    {s.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CodeTipProvider>
          <ul className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categoryOrder.map((key, i) => {
              const cat = categories[key];
              const Icon = cat.icon;
              const examples = advent2024.filter((c) => categoryKey(c.category) === key).slice(-3).reverse();
              return (
                <li
                  key={key}
                  className={cn(
                    "flex flex-col rounded-xl border-2 bg-gray-950 p-6 transition-shadow hover:shadow-lg hover:shadow-black/40",
                    cat.border,
                    "intersect-once motion-safe:intersect:motion-translate-y-in-[12%] motion-safe:intersect:motion-opacity-in-0 motion-safe:intersect:motion-duration-700",
                    DELAYS[i % 3],
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-white">{cat.title}</h3>
                    <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-lg", cat.iconTile)}>
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-3 text-base leading-7 text-gray-400">{cat.framework.description}</p>

                  {examples.length > 0 && (
                    <p className="mt-4 text-sm text-gray-400">
                      <span className="font-semibold text-gray-300">From 2024: </span>
                      {examples.map((c, j) => (
                        <span key={c.day}>
                          {j > 0 && ", "}
                          <a
                            href={c.writeUpHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-200 underline decoration-gray-600 underline-offset-4 hover:decoration-gray-300"
                          >
                            {c.title}
                          </a>
                        </span>
                      ))}
                    </p>
                  )}

                  <p className="mt-5 mb-2 text-sm font-semibold text-gray-500">Skills and techniques it covers</p>
                  <div className="flex flex-wrap items-center gap-1">
                    {KIND_ORDER.flatMap((kind) =>
                      cat.framework.alignments.filter((a) => a.kind === kind).map((a) => <Code key={a.kind + a.code} a={a} />),
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </CodeTipProvider>

        <div className="mt-16 grid gap-12 rounded-2xl border border-white/10 bg-[#0c1420] p-6 grid-cols-[minmax(0,1fr)] sm:p-8 lg:p-10">
          <div className="min-w-0">
            <h3 className="text-2xl font-bold text-white">From the classroom to a certification</h3>
            <p className="mt-2 max-w-2xl text-gray-400">
              In summer 2025, we mapped every category to the College Board&rsquo;s AP® Cybersecurity framework. That
              way, teachers can pick out challenges that line up with what their class is learning, and students can see
              how the skills they practice here connect to the course and to industry certifications.
            </p>
            <div className="mt-8">
              <PathwayDiagram />
            </div>
          </div>
          <SkillMatrix />
        </div>

        <p className="mt-8 text-sm text-gray-500">
          AP® is a trademark registered by the College Board, which is not affiliated with and does not endorse
          CyberStudents. CompTIA, Security+, and Network+ are trademarks of CompTIA, Inc.
        </p>
      </Wide>
    </section>
  );
}
