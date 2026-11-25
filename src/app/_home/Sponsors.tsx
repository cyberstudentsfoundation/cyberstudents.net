import Image from "next/image";
import { sponsors2025 } from "~/data/sponsors";
import { cn } from "~/lib/utils";
import { TextLink, Wide } from "./ui";

// Logo sizes match the sponsor band on /advent/2025.
const SIZES: Record<string, string> = {
  "Veria Labs": "h-10 sm:h-12",
  CTFGuide: "h-6 sm:h-7",
  "APIsec University": "h-9 sm:h-11",
  "gen.xyz": "h-7 sm:h-9",
};

/** Logos only, for dark grounds. OtterSec first. */
/** `only` limits the row to some sponsors, for pages written before the others joined. */
export function SponsorLogos({ className, only }: { className?: string; only?: string[] }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-10 gap-y-6", className)}>
      {sponsors2025.filter((s) => !only || only.includes(s.name)).map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block opacity-90 transition-all hover:opacity-100 motion-safe:hover:-translate-y-0.5"
          >
            <Image
              src={s.logo}
              alt={s.name}
              className={cn("w-auto", s.name === "OtterSec" ? "h-9 brightness-50 invert sm:h-10" : SIZES[s.name])}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Sponsors({ className }: { className?: string }) {
  const otter = sponsors2025.find((s) => s.name === "OtterSec")!;
  const rest = sponsors2025.filter((s) => s.name !== "OtterSec");

  return (
    <section aria-labelledby="sponsors-title" className={cn("bg-gray-800 text-gray-200", className)}>
      <Wide className="flex flex-col items-center py-12 sm:py-14">
        <h2 id="sponsors-title" className="text-center text-lg text-gray-400">
          Thank you to our sponsors for making Advent of CTF 2025 possible
        </h2>
        <ul className="mt-8 flex w-full flex-col items-center justify-center gap-10 sm:flex-row sm:gap-16">
          {rest.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-all hover:opacity-80 motion-safe:hover:-translate-y-0.5"
              >
                <Image src={s.logo} alt={s.name} className={cn("w-auto", SIZES[s.name])} />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex w-full max-w-4xl flex-col items-center gap-8 border-t border-gray-700 pt-10 sm:flex-row md:gap-14">
          <a href={otter.href} target="_blank" rel="noopener noreferrer" className="shrink-0 transition-all hover:opacity-80">
            <Image src={otter.logo} alt="OtterSec" className="h-10 w-auto brightness-50 invert sm:h-12" />
          </a>
          <div className="max-w-prose space-y-2 text-gray-300">
            <p>
              <TextLink href={otter.href}>OtterSec</TextLink> is a security research and blockchain auditing firm
              focused on securing a wide range of critical blockchain infrastructure and strengthening real-world
              systems, from compilers to virtual machines and wallets.
            </p>
            <p>
              OtterSec&rsquo;s team consists largely of CTF players who enjoy solving hard problems. If that sounds like
              you, <TextLink href="https://osec.io/careers">come work with them</TextLink>! No prior blockchain
              experience is necessary.
            </p>
          </div>
        </div>
      </Wide>
    </section>
  );
}
