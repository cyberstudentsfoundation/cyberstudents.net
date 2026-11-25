import { ChallengeCarousel } from "./ChallengeCarousel";
import { TryChallenge } from "./TryChallenge";
import { Heading, TextLink, Wide } from "./ui";

/**
 * Night hills at the bottom of the snow ground, so the light Advent area meets the navy section below the way the
 * snow scene meets the sky at the top of the band. Same soft, wide curves as the Advent snow hills.
 */
export function NightHills({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 150"
      preserveAspectRatio="none"
      className={className ?? "pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full sm:h-32"}
    >
      <path
        d="M0 96 C160 52 330 44 500 72 C690 104 860 58 1050 52 C1210 47 1340 72 1440 64 L1440 150 L0 150 Z"
        fill="#1b283c"
      />
      <path
        d="M0 126 C190 92 400 98 590 114 C790 131 990 84 1190 92 C1310 97 1390 108 1440 104 L1440 150 L0 150 Z"
        fill="#111b29"
      />
    </svg>
  );
}

export function Challenges() {
  return (
    <section
      id="challenges"
      aria-labelledby="challenges-title"
      className="relative scroll-mt-28 bg-[linear-gradient(90deg,#dadbee_0%,#f3f7fe_100%)] text-slate-950"
    >
      <Wide className="relative pt-4 pb-40 sm:pt-6 sm:pb-48">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Heading id="challenges-title">Featured challenges</Heading>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Scroll through a few of our favorite challenges from past events, ranging from a first-day puzzle that
              mixes a Caesar cipher with XOR all the way up to a Christmas Day heap exploit. Plus, see how players
              tackled it in their write-ups.
            </p>
          </div>
          <TextLink href="/challenges" tone="light" className="font-semibold">
            All 105 challenges
          </TextLink>
        </div>
        <div className="mt-10 px-6 sm:px-12">
          <ChallengeCarousel />
        </div>
        <div className="mt-16">
          <TryChallenge />
        </div>
      </Wide>
      <NightHills />
    </section>
  );
}
