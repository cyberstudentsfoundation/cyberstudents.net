import Image from "next/image";
import { Card, CardContent } from "~/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import { HiArrowUpRight } from "react-icons/hi2";
import { cn } from "~/lib/utils";

import imgLogicalExclusivity from "~/../public/curated-challenges/logical-exclusivity.png";
import imgLoneGone from "~/../public/curated-challenges/long-gone.png";
import imgRustyLock from "~/../public/curated-challenges/rusty-lock.png";
import imgDisorientedSanta from "~/../public/curated-challenges/disoriented-santa.png";
import imgTrng from "~/../public/curated-challenges/trng.png";
import imgHpjl from "~/../public/curated-challenges/hpjl.jpg";
import imgKUNALConsulting from "~/../public/curated-challenges/kunal-consulting.png";
import imgHelp from "~/../public/curated-challenges/help.png";
import imgELForms from "~/../public/curated-challenges/elforms.png";
import imgHouseOfSantaClaus from "~/../public/curated-challenges/house-of-santa-claus.png";
import imgTurningComplete from "~/../public/curated-challenges/turning-complete.png";

const adventURL = (dirName: string) =>
  `https://github.com/cyberstudentsacademy/Advent-of-CTF/blob/main/2024/${encodeURIComponent(dirName)}/README.md`;

const challenges = [
  {
    title: "House of Santa Claus",
    source: "Advent of CTF 2024 · Pwn",
    description:
      "This advanced challenge has a binary with an off-by-null vulnerability due to incorrect bounds handling in a scanf call. Combined with the lack of zeroing for new allocations, this enables a poison null byte attack to create overlapping chunks. Through manipulating heap metadata, the player can gain arbitrary read/write on 16-bit aligned addresses.",
    image: imgHouseOfSantaClaus,
    alt: "Screenshot of the solution payload",
    url: adventURL("Day 25 - House of Santa Claus"),
  },
  {
    title: "ELForms",
    source: "Advent of CTF 2024 · Web",
    description:
      "This challenge has a cross-site request forgery (CSRF) vulnerability in a web application which players had to exploit through the admin bot, while bypassing weak CSRF protections. It requires players to fully understand the application, along with various HTML and HTTP functionalities.",
    image: imgELForms,
    alt: "Screenshot of Postman",
    url: adventURL("Day 24 - ELForms"),
  },
  {
    title: "help",
    source: "Advent of CTF 2024 · Pwn",
    description:
      "This advanced heap exploitation challenge focuses on exploiting heap overflows and arbitrary read/write capabilities to gain code execution. It teaches how to manipulate heap metadata to leak memory addresses, craft fake chunks for arbitrary memory access, and ultimately hijack control flow through libc's exit handlers.",
    image: imgHelp,
    alt: "Screenshot of a GDB disassembly",
    url: adventURL("Day 23 - help"),
  },
  {
    title: "trng",
    source: "Advent of CTF 2024 · Rev",
    description:
      "This challenge requires players to reverse engineer a binary that includes a pseudo-random number generator (PRNG) function and reverse XOR shift operations.",
    image: imgTrng,
    alt: "Screenshot of a Binary Ninja decompilation",
    url: adventURL("Day 18 - trng"),
  },
  {
    title: "hpjl",
    source: "Advent of CTF 2024 · Pwn",
    description:
      "This advanced challenge introduces key concepts in binary exploitation and shellcode execution under tight constraints. It requires creatively leveraging existing register values and memory contents, redirecting execution to a syscall instruction within libc using a ret-based ROP-like strategy.",
    image: imgHpjl,
    alt: "Screenshot of a GDB disassembly",
    url: adventURL("Day 21 - hpjl"),
  },
  {
    title: "K.U.N.A.L Consulting",
    source: "Advent of CTF 2024 · Web",
    description:
      "This challenge has a NoSQL injection vulnerability that allows attackers to bypass authentication by using binary search with regex patterns.",
    image: imgKUNALConsulting,
    alt: "Screenshot of Burp Suite",
    url: adventURL("Day 22 - K.U.N.A.L Consulting"),
  },
  {
    title: "Disoriented Santa",
    source: "Advent of CTF 2024 · OSINT",
    description:
      "This challenge focuses on using open-source maps and metadata like OpenStreetMap with tools such as Overpass Turbo to locate a place in the world given a set of clues.",
    image: imgDisorientedSanta,
    alt: "Screenshot of Overpass Turbo",
    url: adventURL("Day 13 - Disoriented Santa"),
  },
  {
    title: "Turning Complete",
    source: "Daily CTF Round 6 · Crypto",
    description:
      "This challenge requires players to brute-force an Enigma ciphertext with a known crib, simplified by having no plugboard and fixed settings – only rotor order and start positions need to be tested.",
    image: imgTurningComplete,
    alt: "Graph visualization of the Enigma cipher brute force search",
    url: "https://github.com/cyberstudentsacademy/csd-ctf/blob/main/rounds/5/Turning%20Complete/challenge.md",
  },
  {
    title: "Rusty Lock",
    source: "Advent of CTF 2024 · Rev",
    description:
      "This challenge is a typical crackme challenge written in Rust that requires players to reverse engineer a password check function.",
    image: imgRustyLock,
    alt: "Screenshot of a Binary Ninja decompilation",
    url: adventURL("Day 05 - Rusty Lock"),
  },
  {
    title: "long gone",
    source: "Advent of CTF 2024 · Forensics",
    description:
      "This challenge introduces the basics of forensic investigation from a Linux disk image using Autopsy, and uses various tools to analyze file systems and recover deleted files.",
    image: imgLoneGone,
    alt: "Screenshot of Autopsy",
    url: adventURL("Day 04 - long gone"),
  },
  {
    title: "Logical Exclusivity",
    source: "Advent of CTF 2024 · Crypto",
    description:
      "This challenge introduces the concepts of Caesar ciphers and XOR operations by combining the two techniques to create a simple encoding scheme.",
    image: imgLogicalExclusivity,
    alt: "Screenshot of CyberChef",
    url: adventURL("Day 01 - Logical Exclusivity"),
  },
];

export default function ChallengesCarousel({ variant = "default" }: { variant?: "default" | "foundation" }) {
  const isFoundation = variant === "foundation";

  return (
    <Carousel className="w-full" opts={{ align: "start" }} aria-label="Past challenge highlights">
      <CarouselContent>
        {challenges.map((challenge, index) => (
          <CarouselItem
            key={challenge.title}
            className="w-full basis-full md:basis-1/2 xl:basis-1/3"
            aria-label={`${index + 1} of ${challenges.length}`}
          >
            <div className="h-full w-full p-1">
              <Card
                className={cn(
                  "group h-full w-full overflow-hidden py-0",
                  isFoundation &&
                    "gap-0 border-white/10 bg-[#0a101a] text-gray-50 shadow-xl shadow-black/15 transition-colors hover:border-cyan-300/20",
                )}
              >
                <CardContent className="flex h-full flex-col px-0">
                  <div className={cn("h-52 overflow-hidden", isFoundation && "h-44 sm:h-48")}>
                    <Image
                      src={challenge.image}
                      alt={challenge.alt}
                      className={cn(
                        "h-full w-full object-cover object-top",
                        isFoundation && "transition-transform duration-500 motion-safe:group-hover:scale-[1.02]",
                      )}
                    />
                  </div>
                  <div className={cn("px-4 py-3", isFoundation && "flex flex-1 flex-col p-5")}>
                    <div className="group">
                      <a
                        href={challenge.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-sm focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a101a] focus-visible:outline-none"
                      >
                        <div className="float-right h-fit">
                          <HiArrowUpRight
                            className={cn(
                              "mt-1 h-4 w-4 stroke-1 text-gray-400 transition-colors group-hover:text-gray-200",
                              isFoundation && "text-gray-500 group-hover:text-cyan-200",
                            )}
                          />
                        </div>
                        <div className="w-fit">
                          <p
                            className={cn(
                              "font-mono text-xs text-gray-400 uppercase",
                              isFoundation && "tracking-wide text-cyan-300/75",
                            )}
                          >
                            {challenge.source}
                          </p>
                          <h3 className="mb-2 text-lg font-semibold decoration-gray-400 underline-offset-3 transition-all group-hover:text-gray-200 group-hover:underline">
                            {challenge.title}
                          </h3>
                        </div>
                      </a>
                    </div>
                    <p className={cn("text-sm text-gray-300", isFoundation && "line-clamp-4 leading-6 text-gray-400")}>
                      {challenge.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={cn(
          isFoundation &&
            "size-10 border-white/15 bg-[#0a101a] text-gray-200 hover:bg-cyan-200 hover:text-gray-950 disabled:border-white/5 disabled:bg-white/[0.025]",
        )}
      />
      <CarouselNext
        className={cn(
          isFoundation &&
            "size-10 border-white/15 bg-[#0a101a] text-gray-200 hover:bg-cyan-200 hover:text-gray-950 disabled:border-white/5 disabled:bg-white/[0.025]",
        )}
      />
    </Carousel>
  );
}
