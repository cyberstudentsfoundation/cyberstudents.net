"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

const LINKS = [
  { label: "Advent of CTF", id: "advent" },
  { label: "Challenges", id: "challenges" },
  { label: "Categories", id: "categories" },
  { label: "Write-ups", id: "write-ups" },
  { label: "Daily CTF", id: "daily-ctf" },
  { label: "Talks and Games", id: "community" },
  { label: "History", id: "history" },
  { label: "Team", id: "team" },
];

/**
 * Sticky jump bar under the main navbar. The cyan bar slides to whichever section is under the reading line
 * (a third of the way down the screen), and fades out above the first section.
 */
export function SectionNav() {
  const [active, setActive] = useState<string | null>(null);
  const [bar, setBar] = useState({ left: 0, width: 0 });
  const listRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Work out the active section on scroll, at most once per frame.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let current: string | null = null;
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Move the bar under the active link, and keep that link visible when the bar scrolls sideways on phones.
  useLayoutEffect(() => {
    const link = active ? linkRefs.current[active] : null;
    if (!link) return;
    setBar({ left: link.offsetLeft, width: link.offsetWidth });
    const list = listRef.current;
    if (list && list.scrollWidth > list.clientWidth) {
      const target = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
      list.scrollTo({ left: target, behavior: "smooth" });
    }
  }, [active]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Homepage sections"
      className="sticky top-14 z-20 border-y border-gray-800 bg-gray-900/80 backdrop-blur-lg"
    >
      <div
        ref={listRef}
        className="mx-auto w-full max-w-(--breakpoint-2xl) overflow-x-auto px-4 [scrollbar-width:none] sm:px-8 md:px-10 xl:px-20 [&::-webkit-scrollbar]:hidden"
      >
        <ul className="relative flex min-w-max items-center">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                ref={(el) => {
                  linkRefs.current[link.id] = el;
                }}
                href={`#${link.id}`}
                onClick={(e) => go(e, link.id)}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "block px-3 py-3 text-sm font-medium transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none sm:px-4",
                  active === link.id ? "text-white" : "text-gray-400",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute bottom-0 left-0 h-0.5 rounded-full bg-cyan-300 transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              active ? "opacity-100" : "opacity-0",
            )}
            style={{ width: bar.width, transform: `translateX(${bar.left}px)` }}
          />
        </ul>
      </div>
    </nav>
  );
}
