import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { HiExternalLink } from "react-icons/hi";

import background from "~/../public/background.png";
import dailyCtfChallenge from "~/../public/daily-ctf-challenge.png";
import disorientedSanta from "~/../public/curated-challenges/disoriented-santa.png";
import clubAdvent from "~/../public/community/club-advent-2025.webp";
import memberNetworkGear from "~/../public/community/member-network-gear.webp";
import stageWebinar from "~/../public/community/stage-malware-webinar.png";
import stickers from "~/../public/community/stickers.webp";
import youtubeSpeedrun from "~/../public/community/youtube-speedrun.webp";

import LiquidGlassButton from "~/components/LiquidGlassButton";
import PhraseTransitions from "~/components/PhraseTransitions";
import { site } from "~/data/site";
import { cn } from "~/lib/utils";
import { CountUp } from "./motion";
import { Wide } from "./ui";

type Shot = { image: StaticImageData; alt: string; className: string; float: "a" | "b"; delay: string };

// Positions are hand-tuned so the photos overlap a little, like prints on a desk. Real photos and Discord captures: a webinar in our Conference
// Room, a Daily CTF post, a student club meeting with Advent of CTF 2025 on the screen (the screen was edited in, so the
// alt text describes the picture without claiming what the club did), stickers, a member's home network from #setups,
// and a YouTube speedrun of our 2024 challenges (the "resa?" flag on screen is left readable on purpose, as an easter
// egg). Gaming photos belong in the community section, not here.
const LEFT: Shot[] = [
  {
    image: stageWebinar,
    alt: "Our Conference Room during the Malware Analysis Webinar, with the speaker live on stage and 12 people in the audience",
    className: "top-0 left-2 z-[5] w-64 -rotate-6",
    float: "a",
    delay: "0s",
  },
  {
    image: dailyCtfChallenge,
    alt: "A Daily CTF challenge post in Discord",
    className: "top-[11.5rem] left-40 w-48 rotate-3",
    float: "b",
    delay: "1.2s",
  },
  {
    image: clubAdvent,
    alt: "Students at a club meeting in front of a classroom screen showing the Advent of CTF 2025 page",
    className: "bottom-4 left-0 w-72 -rotate-2",
    float: "a",
    delay: "2.1s",
  },
];

const RIGHT: Shot[] = [
  {
    image: stickers,
    alt: "CyberStudents stickers on a desk, next to stickers from 0xF1SH, a CTF team many of our staff have played on",
    className: "top-0 right-6 w-48 rotate-6",
    float: "b",
    delay: "0.6s",
  },
  {
    image: memberNetworkGear,
    alt: "A member's home network on the wall: a firewall, a switch, and a patch panel wired with blue Ethernet cables",
    className: "top-40 right-28 w-56 -rotate-3",
    float: "a",
    delay: "1.8s",
  },
  {
    image: youtubeSpeedrun,
    alt: "A player speedrunning Advent of CTF 2024 challenges on YouTube, with a split timer and their webcam on screen",
    className: "right-0 bottom-0 w-80 rotate-[4deg]",
    float: "b",
    delay: "0.3s",
  },
];

const EXTRA: Shot = {
  image: disorientedSanta,
  alt: "An Overpass Turbo map query from solving the Disoriented Santa OSINT challenge",
  className: "",
  float: "a",
  delay: "0s",
};

const STATS = [
  { value: "5,200+", label: "Members" },
  { value: "2,200+", label: "High School and College Students" },
  { value: "130+", label: "Countries" },
  { value: "105", label: "Challenges Written" },
];

function Print({ shot }: { shot: Shot }) {
  return (
    <div
      className={cn(
        "absolute transition-transform duration-500 hover:z-10 hover:scale-105 hover:rotate-0",
        shot.className,
      )}
    >
      <div
        className={cn(shot.float === "a" ? "motion-safe:animate-float1" : "motion-safe:animate-float2")}
        style={{ animationDelay: shot.delay, animationDuration: "6s" }}
      >
        <Image
          src={shot.image}
          alt={shot.alt}
          sizes="256px"
          className="w-full rounded-xl border border-white/15 shadow-2xl shadow-black/60"
        />
      </div>
    </div>
  );
}

export function Hero() {
  const strip = [LEFT[0]!, RIGHT[0]!, LEFT[2]!, RIGHT[1]!, EXTRA, LEFT[1]!, RIGHT[2]!];

  return (
    <section className="relative overflow-hidden bg-gray-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 max-h-[42rem] opacity-30">
        <Image src={background} alt="" fill priority className="object-cover" />
      </div>

      <Wide className="relative grid items-center gap-10 py-14 sm:py-20 xl:min-h-[38rem] xl:grid-cols-[1fr_minmax(0,40rem)_1fr]">
        {/* The side columns are narrower than the prints below 1536 px, so they shrink toward the outer edge there. */}
        <div className="relative hidden h-[30rem] origin-left min-[1400px]:scale-[0.86] xl:block xl:scale-[0.72] 2xl:scale-100">
          {LEFT.map((shot) => (
            <Print key={shot.alt} shot={shot} />
          ))}
        </div>

        <div className="text-center">
          <h1 className="group h-[5rem] font-serif text-4xl text-white sm:h-[7.5rem] sm:text-6xl">
            Learn and grow <br />
            <PhraseTransitions />
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200 sm:text-xl">
            Talk, connect, and grow with others interested in learning and advancing in cybersecurity. Whether
            you&rsquo;re in high school, college, or beyond, you&rsquo;ll fit right into our community with thousands of
            other like-minded students and professionals.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LiquidGlassButton
              href={site.discord}
              target="_blank"
              className="flex items-center gap-1.5 text-lg"
              linkClassName="px-7"
            >
              Join us on Discord
              <HiExternalLink className="size-4" aria-hidden="true" />
            </LiquidGlassButton>
            {/* <Link
              href="#challenges"
              className="font-medium text-gray-200 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              See what we&rsquo;ve built
            </Link> */}
          </div>

          <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <dt className="order-2 mt-1 text-sm leading-5 text-gray-300">{s.label}</dt>
                <dd className="order-1 text-3xl font-bold text-white sm:text-4xl">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden h-[30rem] origin-right min-[1400px]:scale-[0.86] xl:block xl:scale-[0.72] 2xl:scale-100">
          {RIGHT.map((shot) => (
            <Print key={shot.alt} shot={shot} />
          ))}
        </div>
      </Wide>

      {/* Below xl the photos become a scrolling strip under the text. */}
      <div className="relative -mt-4 pb-14 xl:hidden">
        <ul className="flex snap-x [scrollbar-width:none] gap-5 overflow-x-auto px-6 pt-4 pb-6">
          {strip.map((shot, i) => (
            <li
              key={shot.alt}
              className={cn("w-56 shrink-0 snap-center sm:w-64", i % 2 === 0 ? "-rotate-2" : "rotate-2")}
            >
              <Image
                src={shot.image}
                alt={shot.alt}
                sizes="256px"
                className="w-full rounded-xl border border-white/15 shadow-xl shadow-black/50"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
