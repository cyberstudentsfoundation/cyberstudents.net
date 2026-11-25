import { HiArrowDown } from "react-icons/hi2";
import { categories, categoryOrder } from "~/data/categories";
import { AP_SKILL_CATEGORIES, AP_SKILLS, frameworkCategories } from "~/data/frameworks";
import { ApCode } from "./ApCode";
import { CodeTip, CodeTipProvider } from "./CodeTip";
import { cn } from "~/lib/utils";

function Node({
  title,
  detail,
  tone,
  children,
}: {
  title: string;
  detail: string;
  tone: "ap" | "us" | "cert";
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-transform duration-300 motion-safe:hover:-translate-y-0.5",
        tone === "ap" && "border-green-500/30 bg-green-500/[0.07]",
        tone === "us" && "border-cyan-300/40 bg-cyan-300/[0.07] p-5",
        tone === "cert" && "border-white/15 bg-white/[0.04]",
      )}
    >
      <p
        className={cn(
          "font-semibold",
          tone === "ap" && "text-green-300",
          tone === "us" && "text-lg text-cyan-200",
          tone === "cert" && "text-gray-100",
        )}
      >
        {title}
      </p>
      <p className="mt-0.5 text-sm text-gray-400">{detail}</p>
      {children}
    </div>
  );
}

/** Two curves that meet (direction "in") or split ("out"), with dashes that drift along them. */
function Connector({ direction }: { direction: "in" | "out" }) {
  const paths =
    direction === "in"
      ? ["M0 25 C34 25 30 50 64 50", "M0 75 C34 75 30 50 64 50"]
      : ["M0 50 C34 50 30 25 64 25", "M0 50 C34 50 30 75 64 75"];
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 64 100"
        preserveAspectRatio="none"
        className="hidden h-full w-full self-stretch lg:block"
      >
        {paths.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeDasharray="5 6"
            vectorEffect="non-scaling-stroke"
            className="text-gray-500 motion-safe:animate-[dash-flow_1.6s_linear_infinite]"
          />
        ))}
      </svg>
      <HiArrowDown aria-hidden="true" className="mx-auto size-5 text-gray-500 lg:hidden" />
    </>
  );
}

export function PathwayDiagram() {
  return (
    <figure>
      <div className="grid items-center gap-y-3 lg:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1.2fr)_3.5rem_minmax(0,1fr)]">
        <div className="space-y-4">
          <Node title="AP® Cybersecurity" detail="College Board high school course" tone="ap" />
          <Node title="AP® Networking" detail="College Board high school course" tone="ap" />
        </div>
        <Connector direction="in" />
        <Node title="CyberStudents challenges" detail="105 written so far, each one tagged by skill" tone="us">
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {categoryOrder.map((k) => {
              const c = categories[k];
              return (
                <li
                  key={k}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium",
                    c.chipDark,
                  )}
                >
                  <c.icon className="size-3 shrink-0" aria-hidden="true" />
                  {c.short}
                </li>
              );
            })}
          </ul>
        </Node>
        <Connector direction="out" />
        <div className="space-y-4">
          <Node title="CompTIA Security+" detail="Entry-level security certification" tone="cert" />
          <Node title="CompTIA Network+" detail="Entry-level networking certification" tone="cert" />
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-gray-500">
        Students taking the new AP® courses can practice the same skills in our challenges, and those skills carry over
        to the CompTIA certifications that many students go on to earn.
      </figcaption>
    </figure>
  );
}

/** Which AP® Cybersecurity skills each category practices, as a dot grid grouped by skill category. */
export function SkillMatrix({ stacked }: { stacked?: boolean }) {
  const codes = [
    ...new Set(frameworkCategories.flatMap((c) => c.alignments.filter((a) => a.kind === "ap").map((a) => a.code))),
  ].sort();
  const groups = Object.entries(AP_SKILL_CATEGORIES)
    .map(([n, name]) => ({ n, name, codes: codes.filter((c) => c.startsWith(n)) }))
    .filter((g) => g.codes.length > 0);
  const has = (key: (typeof categoryOrder)[number], code: string) =>
    categories[key].framework.alignments.some((a) => a.kind === "ap" && a.code === code);
  const count = (kind: "nice" | "mitre") =>
    new Set(frameworkCategories.flatMap((c) => c.alignments.filter((a) => a.kind === kind).map((a) => a.code))).size;

  const figures = [
    { value: codes.length, label: "AP® Cybersecurity skills practiced" },
    { value: count("nice"), label: "NICE Framework work roles" },
    { value: count("mitre"), label: "MITRE ATT&CK techniques" },
  ];

  return (
    <CodeTipProvider>
      {/* The divider and the figure run the full width of the panel: the left column explains, the right holds the
          table, so the skill wording and its dots stay close together instead of stretching across the page. */}
      <figure
        className={cn(
          "grid min-w-0 gap-10",
          stacked ? "gap-6" : "border-t border-white/10 pt-10 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] xl:gap-14",
        )}
      >
        <figcaption className="min-w-0">
          <p className="text-xl font-bold text-white">AP® Cybersecurity skills, by category</p>
          <p className="mt-2 text-sm leading-6 text-gray-400">
            Each row is a skill from the College Board&rsquo;s AP® Cybersecurity Course and Exam Description, and each
            dot is a challenge category that practices it.
          </p>
          <dl className={cn("mt-6 grid grid-cols-3 gap-4", !stacked && "xl:grid-cols-1 xl:gap-5")}>
            {figures.map((f) => (
              <div key={f.label} className="flex flex-col border-t border-white/15 pt-2">
                <dt className="order-2 text-xs leading-5 text-gray-400 sm:text-sm">{f.label}</dt>
                <dd className="order-1 text-3xl font-bold text-white tabular-nums">{f.value}</dd>
              </div>
            ))}
          </dl>
        </figcaption>

        {/* relative: the sr-only labels inside are absolutely positioned and would otherwise escape the scroller. */}
        <div className="relative min-w-0 overflow-x-auto">
          <table className="w-full min-w-[32rem] border-separate border-spacing-y-1 text-sm">
            <thead>
              <tr>
                <th scope="col" className="text-left font-normal text-gray-500">
                  <span className="sr-only">Skill</span>
                </th>
                {categoryOrder.map((k) => {
                  const c = categories[k];
                  return (
                    <th key={k} scope="col" className="w-16 pb-1 align-bottom font-normal">
                      <span className="flex flex-col items-center gap-1">
                        <span className="flex h-8 items-center justify-center">
                          <c.icon className={cn("size-6", c.textDark)} aria-hidden="true" />
                        </span>
                        <span className="text-[11px] font-semibold text-gray-400">
                          {c.short}
                          <span className="sr-only"> ({c.title})</span>
                        </span>
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            {groups.map((g) => (
              <tbody key={g.n}>
                <tr>
                  <th colSpan={7} scope="rowgroup" className="pt-3 pb-1 text-left text-xs font-semibold text-gray-400">
                    Skill Category {g.n}: {g.name}
                  </th>
                </tr>
                {g.codes.map((code) => (
                  <tr key={code} className="group">
                    <th
                      scope="row"
                      className="rounded-l-md py-1.5 pr-4 pl-1 text-left font-normal group-hover:bg-white/[0.04]"
                    >
                      <span className="flex items-start gap-2.5">
                        <ApCode code={code} className="mt-px shrink-0" />
                        <span className="text-gray-300">{AP_SKILLS[code as keyof typeof AP_SKILLS]}</span>
                      </span>
                    </th>
                    {categoryOrder.map((k, i) => (
                      <td
                        key={k}
                        className={cn(
                          "text-center group-hover:bg-white/[0.04]",
                          i === categoryOrder.length - 1 && "rounded-r-md",
                        )}
                      >
                        {has(k, code) ? (
                          <CodeTip
                            content={
                              <>
                                <span className="font-semibold">{categories[k].title}</span> challenges practice AP®
                                skill <span className="font-semibold">{code}</span>.
                              </>
                            }
                          >
                            <button
                              type="button"
                              className="mx-auto flex size-7 cursor-help items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-cyan-300"
                            >
                              <span
                                className={cn(
                                  "block size-3 rounded-full transition-transform duration-200 group-hover:scale-125",
                                  categories[k].dot,
                                )}
                              />
                              <span className="sr-only">
                                {categories[k].title} practices {code}
                              </span>
                            </button>
                          </CodeTip>
                        ) : (
                          <span aria-hidden="true" className="mx-auto block size-1.5 rounded-full bg-white/10" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </figure>
    </CodeTipProvider>
  );
}
