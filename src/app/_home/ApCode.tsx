import { cn } from "~/lib/utils";

// Skill-category colours as printed in the College Board's AP® Cybersecurity Course and Exam Description:
// 1 Analyze Risk (magenta), 2 Mitigate Risk (blue), 3 Detect Attacks (rust), 4 Collaborate (amber).
export const AP_CATEGORY_COLOR: Record<string, string> = {
  "1": "bg-[#b81f7f] text-white",
  "2": "bg-[#4f69ad] text-white",
  "3": "bg-[#b4461f] text-white",
  "4": "bg-[#f0b623] text-[#241a00]",
};

/** An AP® skill code as a small square-cornered block, the way the course description prints it. */
export function ApCode({ code, className }: { code: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-[2px] px-1.5 text-[11px] leading-none font-bold tracking-tight tabular-nums",
        AP_CATEGORY_COLOR[code[0]!],
        className,
      )}
    >
      {code}
    </span>
  );
}
