"use client";

import type { KeyboardEvent } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "~/components/ui/dialog";

export type FullscreenCarouselChallenge = {
  title: string;
  source: string;
  category: string;
  description: string;
  image: StaticImageData;
  alt: string;
  url: string;
};

export function FullscreenCarouselDialog({
  challenges,
  activeIndex,
  onActiveIndexChange,
  onClose,
}: {
  challenges: readonly FullscreenCarouselChallenge[];
  activeIndex: number | null;
  onActiveIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const challenge = challenges[activeIndex ?? 0];
  if (!challenge) return null;

  const goToPreviousChallenge = () => {
    const currentIndex = activeIndex ?? 0;
    onActiveIndexChange((currentIndex - 1 + challenges.length) % challenges.length);
  };

  const goToNextChallenge = () => {
    const currentIndex = activeIndex ?? 0;
    onActiveIndexChange((currentIndex + 1) % challenges.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPreviousChallenge();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNextChallenge();
    }
  };

  return (
    <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        onKeyDown={handleKeyDown}
        className="h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)]! max-w-none! gap-0 overflow-hidden rounded-2xl border-white/15 bg-[#020408]/98 p-0 text-white shadow-2xl sm:h-[calc(100dvh-2rem)] sm:w-[calc(100vw-2rem)]! sm:max-w-none!"
      >
        <div className="relative h-full w-full">
          <Image
            key={challenge.title}
            src={challenge.image}
            alt={challenge.alt}
            fill
            sizes="100vw"
            className="object-contain px-3 pt-14 pb-72 sm:px-16 sm:pt-8 sm:pb-64 lg:px-24 lg:pb-60"
          />

          <div className="absolute top-4 left-4 z-10 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 font-mono text-xs text-gray-300 shadow-lg backdrop-blur-sm sm:top-5 sm:left-5">
            {(activeIndex ?? 0) + 1} / {challenges.length}
          </div>

          <button
            type="button"
            onClick={goToPreviousChallenge}
            aria-label={`View previous challenge before ${challenge.title}`}
            className="absolute top-[38%] left-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none sm:left-5 sm:size-12"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goToNextChallenge}
            aria-label={`View next challenge after ${challenge.title}`}
            className="absolute top-[38%] right-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none sm:right-5 sm:size-12"
          >
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>

          <div className="absolute inset-x-0 bottom-0 max-h-[58dvh] overflow-y-auto bg-gradient-to-t from-[#020408] via-[#020408]/96 to-transparent px-5 pt-20 pb-5 sm:px-8 sm:pt-24 sm:pb-8 lg:px-12">
            <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-12">
              <div className="min-w-0">
                <DialogTitle className="text-2xl leading-tight font-semibold text-white sm:text-3xl">
                  {challenge.title}
                </DialogTitle>
                <DialogDescription className="mt-3 max-w-4xl text-left text-sm leading-6 text-gray-300 sm:text-base sm:leading-7">
                  {challenge.description}
                </DialogDescription>
              </div>

              <div className="flex min-w-0 flex-col gap-5">
                <dl className="grid grid-cols-[max-content_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2.5 text-sm">
                  <dt className="text-xs font-bold tracking-[0.12em] text-cyan-300 uppercase">Challenge from</dt>
                  <dd className="min-w-0 text-gray-200">{challenge.source}</dd>
                  <dt className="text-xs font-bold tracking-[0.12em] text-cyan-300 uppercase">Category</dt>
                  <dd className="min-w-0 text-gray-200">{challenge.category}</dd>
                </dl>

                <a
                  href={challenge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 self-start rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-200/45 hover:bg-cyan-200/15 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020408] focus-visible:outline-none lg:self-start"
                >
                  View write-up
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <DialogClose className="absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none">
          <X className="size-5" aria-hidden="true" />
          <span className="sr-only">Close full-screen challenge</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
