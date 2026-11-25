"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { HiExternalLink } from "react-icons/hi";
import { HiPause, HiPlay } from "react-icons/hi2";

import { FullscreenCarouselDialog } from "~/app/advent/2025/fullscreen-carousel-image";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { categoryOf } from "~/data/categories";
import { selectedChallenges } from "~/data/selected-challenges";
import { cn } from "~/lib/utils";
import { ProgressDots, useInView, usePrefersReducedMotion } from "./motion";

const navClass =
  "size-10 border-slate-300! bg-white! text-slate-700! hover:border-cyan-700! hover:bg-cyan-700! hover:text-white! disabled:border-slate-200! disabled:bg-slate-100! disabled:text-slate-400!";

export function ChallengeCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [snap, setSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(selectedChallenges.length);
  const reduced = usePrefersReducedMotion();
  const [viewRef, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setSnap(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  // The progress bar under the active dot drives autoplay: when it fills, the carousel moves on.
  const stopped = paused || hovering || reduced || active !== null || !inView;

  const dialogItems = selectedChallenges.map((c) => ({
    title: c.title,
    source: c.event,
    category: categoryOf(c.category).title,
    description: c.description,
    image: c.image,
    alt: c.alt,
    url: c.writeUpHref,
  }));

  return (
    <div ref={viewRef} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{ align: "start", loop: true }}
        aria-label="Selected challenges"
      >
        <CarouselContent>
          {selectedChallenges.map((c, index) => {
            const cat = categoryOf(c.category);
            return (
              <CarouselItem
                key={c.title}
                className="basis-full md:basis-1/2 xl:basis-1/3"
                aria-label={`${index + 1} of ${selectedChallenges.length}`}
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm transition-shadow hover:shadow-lg">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Enlarge ${c.title}`}
                    className="relative block h-48 overflow-hidden focus-visible:outline-2 focus-visible:outline-cyan-600"
                  >
                    <Image
                      src={c.image}
                      alt={c.alt}
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white shadow-lg backdrop-blur-sm transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                      <Maximize2 className="size-4" aria-hidden="true" />
                    </span>
                  </button>
                  <div className={cn("flex flex-1 flex-col border-t-4 p-5", cat.topEdge)}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                          cat.chipLight,
                        )}
                      >
                        <cat.icon className="size-3" aria-hidden="true" />
                        {cat.title}
                      </span>
                      {c.points !== undefined && (
                        <span className="text-xs font-medium text-slate-500 tabular-nums">{c.points} points</span>
                      )}
                    </div>
                    <h3 className="mt-3 text-xl font-bold">{c.title}</h3>
                    <p className="text-sm text-slate-500">
                      {c.event} · by {c.author}
                    </p>
                    <p className="mt-3 leading-6 text-slate-700">{c.summary}</p>
                    <a
                      href={c.writeUpHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-cyan-800 underline decoration-cyan-800/30 underline-offset-4 hover:decoration-cyan-800"
                    >
                      Read the write-up
                      <HiExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className={navClass} />
        <CarouselNext className={navClass} />
      </Carousel>

      <div className="mt-6 flex items-center justify-between gap-4">
        <ProgressDots
          count={snapCount}
          active={snap}
          onSelect={(i) => api?.scrollTo(i)}
          onDone={() => api?.scrollNext()}
          duration={4500}
          paused={stopped}
          label="Choose a slide"
        />
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white/70 px-3 py-1 text-sm text-slate-700 hover:bg-white motion-reduce:hidden"
        >
          {paused ? <HiPlay className="size-4" aria-hidden="true" /> : <HiPause className="size-4" aria-hidden="true" />}
          {paused ? "Play" : "Pause"}
        </button>
      </div>

      <FullscreenCarouselDialog
        challenges={dialogItems}
        activeIndex={active}
        onActiveIndexChange={setActive}
        onClose={() => setActive(null)}
      />
    </div>
  );
}
