"use client";

import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { HiPause, HiPlay } from "react-icons/hi2";
import cyberstartArchive from "~/../public/cyberstart-archive.png";

function useOnScreen(ref: RefObject<HTMLElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(() => {
    if (typeof IntersectionObserver !== "undefined") {
      return new IntersectionObserver(([entry]) => setIntersecting(entry!.isIntersecting));
    }
  }, []);

  useEffect(() => {
    if (!observer) return;

    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, [observer, ref]);

  return isIntersecting;
}

export default function CyberstartArchiveScroll() {
  const ref = useRef<HTMLDivElement>(null);

  const isVisible = useOnScreen(ref);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const scrollDirection = useRef(1);

  useEffect(() => {
    if (isVisible) setHasBeenVisible(true);
  }, [isVisible]);

  useEffect(() => {
    if (!hasBeenVisible || paused) return;

    const element = ref.current!.querySelector("[data-radix-scroll-area-viewport]") as HTMLDivElement;

    const interval = setInterval(() => {
      element.scrollBy({ top: scrollDirection.current });

      if (element.scrollTop === element.scrollHeight - element.offsetHeight) {
        scrollDirection.current = -1;
      } else if (element.scrollTop === 0) {
        scrollDirection.current = 1;
      }
    }, 10);

    return () => clearInterval(interval);
  }, [hasBeenVisible, paused]);

  return (
    <ScrollArea
      ref={ref}
      thumbClassName="dark:bg-zinc-800"
      className="group relative mx-auto flex max-h-48 flex-col gap-8 overflow-visible rounded-lg sm:max-h-72 md:max-h-96 md:flex-row xl:min-w-196 xl:justify-between xl:gap-4"
    >
      <div className="overflow-auto">
        <div className="h-full">
          <Image src={cyberstartArchive} alt="CyberStart challenges archive forum channel" placeholder="blur" />
        </div>
        <Button
          size="icon"
          variant="ghost"
          title={`${paused ? "Resume" : "Pause"} scrolling`}
          className="absolute right-3 bottom-3 h-8 w-8 rounded-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-zinc-800/75! focus-visible:opacity-100"
          onClick={() => setPaused((prev) => !prev)}
        >
          {paused ? <HiPlay className="h-5 w-5" /> : <HiPause className="h-6 w-6" />}
        </Button>
        <p className="flex-inline absolute -bottom-12 w-full justify-center text-center text-sm text-gray-300 sm:-bottom-7">
          The{" "}
          <a
            href="https://discord.gg/ERwjhnAKw8"
            target="_blank"
            className="not-prose rounded-sm bg-[rgba(88,101,242,0.3)] px-1 font-medium text-nowrap text-[rgb(222,224,252)] transition-colors hover:bg-[rgba(88,101,242,0.6)]"
          >
            #cyberstart-challenge-help
          </a>{" "}
          archive – the CyberStart help forum that featured 174 challenges
        </p>
      </div>
    </ScrollArea>
  );
}
