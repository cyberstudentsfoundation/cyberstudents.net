import type { StaticImageData } from "next/image";

import ottersecLogo from "~/../public/ottersec.png";
import verialabsLogo from "~/../public/verialabs.png";
import ctfguideLogo from "~/../public/ctfguide.png";
import apisecLogo from "~/../public/apisec.png";
import genxyzLogo from "~/../public/genxyz.svg";

export type Sponsor = { name: string; href: string; logo: StaticImageData; className: string };

/** Advent of CTF 2025 sponsors, OtterSec first. `className` sizes each logo to a similar optical weight. */
export const sponsors2025: Sponsor[] = [
  { name: "OtterSec", href: "https://osec.io/", logo: ottersecLogo, className: "h-8 brightness-50 invert" },
  { name: "Veria Labs", href: "https://verialabs.com/", logo: verialabsLogo, className: "h-9" },
  { name: "CTFGuide", href: "https://ctfguide.com/", logo: ctfguideLogo, className: "h-5" },
  { name: "APIsec University", href: "https://www.apisecuniversity.com/", logo: apisecLogo, className: "h-8" },
  { name: "gen.xyz", href: "https://gen.xyz/", logo: genxyzLogo, className: "h-7" },
];
