"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { HiPause, HiPlay } from "react-icons/hi2";
import cyberstartArchive from "~/../public/cyberstart-archive.png";

function useOnScreen(ref: RefObject<HTMLElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry?.isIntersecting ?? false));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
}

export default function CyberstartArchiveScroll() {
  const ref = useRef<HTMLDivElement>(null);

  const isVisible = useOnScreen(ref);
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const scrollDirection = useRef(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!isVisible || paused || prefersReducedMotion) return;

    const element = ref.current?.querySelector("[data-radix-scroll-area-viewport]") as HTMLDivElement | null;
    if (!element) return;

    const interval = setInterval(() => {
      element.scrollBy({ top: scrollDirection.current });

      if (element.scrollTop >= element.scrollHeight - element.offsetHeight - 1) {
        scrollDirection.current = -1;
      } else if (element.scrollTop === 0) {
        scrollDirection.current = 1;
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isVisible, paused, prefersReducedMotion]);

  return (
    <div className="mx-auto w-full max-w-5xl xl:min-w-196">
      <ScrollArea
        ref={ref}
        thumbClassName="dark:bg-zinc-800"
        className="group relative h-64 w-full overflow-hidden rounded-lg border border-white/10 sm:h-80 md:h-96"
      >
        <div>
          <Image src={cyberstartArchive} alt="CyberStart challenges archive forum channel" placeholder="blur" />
          {!prefersReducedMotion && (
            <Button
              size="icon"
              variant="ghost"
              title={`${paused ? "Resume" : "Pause"} scrolling`}
              aria-label={`${paused ? "Resume" : "Pause"} archive scrolling`}
              className="absolute right-3 bottom-3 h-8 w-8 rounded-lg bg-zinc-900/70 opacity-100 transition-opacity hover:bg-zinc-800/90! sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
              onClick={() => setPaused((prev) => !prev)}
            >
              {paused ? (
                <HiPlay className="h-5 w-5" aria-hidden="true" />
              ) : (
                <HiPause className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          )}
        </div>
      </ScrollArea>
      <p className="mt-3 text-center text-sm leading-6 text-gray-300">
        The{" "}
        <a
          href="https://discord.gg/ERwjhnAKw8"
          target="_blank"
          rel="noreferrer"
          className="not-prose rounded-sm bg-[rgba(88,101,242,0.3)] px-1 font-medium text-nowrap text-[rgb(222,224,252)] transition-colors hover:bg-[rgba(88,101,242,0.6)]"
        >
          #cyberstart-challenge-help
        </a>{" "}
        archive—the CyberStart help forum that featured 174 challenges
      </p>
    </div>
  );
}
