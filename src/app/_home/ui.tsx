import Link from "next/link";
import type { ReactNode } from "react";
import { HiExternalLink } from "react-icons/hi";
import { cn } from "~/lib/utils";

/** Wide container used by the homepage, /about, /advent and /challenges. Same gutters as the Advent pages. */
export function Wide({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-(--breakpoint-2xl) px-4 sm:px-8 md:px-10 xl:px-20", className)}>
      {children}
    </div>
  );
}

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function ExternalIcon({ className }: { className?: string }) {
  return <HiExternalLink aria-hidden="true" className={cn("inline-block size-4 shrink-0 align-[-0.15em]", className)} />;
}

const linkTone = {
  dark: "text-cyan-300 decoration-cyan-300/40 hover:decoration-cyan-300",
  light: "text-cyan-800 decoration-cyan-800/30 hover:decoration-cyan-800",
};

/** Internal link, or external link with an icon that opens in a new tab. */
export function TextLink({
  href,
  children,
  className,
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: keyof typeof linkTone;
}) {
  const cls = cn("underline underline-offset-4 transition-colors", linkTone[tone], className);
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <ExternalIcon className="ml-0.5" />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

const buttonTone = {
  light: "bg-gray-100 text-gray-950 hover:bg-white",
  cyan: "bg-cyan-200 text-gray-950 hover:bg-cyan-100",
  ink: "bg-slate-950 text-white hover:bg-slate-800",
  ghost: "border border-white/20 bg-white/5 text-white hover:bg-white/10",
  ghostLight: "border border-slate-300 bg-white/60 text-slate-900 hover:bg-white",
  discord: "bg-[#5865f2] text-white hover:bg-[#5865f2]/80",
};

export function PrimaryButton({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: keyof typeof buttonTone;
  className?: string;
}) {
  const cls = cn(
    "inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400",
    buttonTone[tone],
    className,
  );
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
      <ExternalIcon />
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Section heading used across the new pages: Figtree bold, sentence case, no eyebrow. */
export function Heading({
  id,
  children,
  className,
  as: As = "h2",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <As id={id} className={cn("text-3xl font-bold tracking-tight sm:text-4xl", className)}>
      {children}
    </As>
  );
}
