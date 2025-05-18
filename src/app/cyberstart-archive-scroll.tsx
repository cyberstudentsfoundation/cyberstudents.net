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
      zincThumb
      className="group relative mx-auto flex max-h-48 flex-col gap-8 rounded-lg sm:max-h-72 md:max-h-96 md:flex-row xl:min-w-[49rem] xl:justify-between xl:gap-4"
    >
      <div className="h-full">
        <Image src={cyberstartArchive} alt="CyberStart challenges archive forum channel" placeholder="blur" />
      </div>
      <Button
        size="icon"
        variant="ghost"
        title={`${paused ? "Resume" : "Pause"} scrolling`}
        className="absolute bottom-3 right-3 h-8 w-8 rounded-lg opacity-0 transition-opacity hover:!bg-zinc-800/75 focus-visible:opacity-100 group-hover:opacity-100"
        onClick={() => setPaused((prev) => !prev)}
      >
        {paused ? <HiPlay className="h-5 w-5" /> : <HiPause className="h-6 w-6" />}
      </Button>
    </ScrollArea>
  );
}
