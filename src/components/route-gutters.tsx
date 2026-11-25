"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

/**
 * The Advent of CTF year pages (/advent/2024, /advent/2025 and their subpages) have their own design and use
 * narrower gutters than the rest of the site. The navbar and footer follow them there, and follow the page container
 * (Wide in src/app/_home/ui.tsx) everywhere else, so their edges line up with the content on every page.
 */
export function useAdventYearRoute() {
  return /^\/advent\/20\d\d/.test(usePathname() ?? "");
}

export function FooterFrame({ className, children }: { className?: string; children: ReactNode }) {
  const advent = useAdventYearRoute();
  return <footer className={cn(className, advent ? "px-4 sm:px-8" : "px-4 sm:px-8 md:px-10 xl:px-20")}>{children}</footer>;
}
