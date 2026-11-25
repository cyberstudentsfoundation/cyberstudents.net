import type { StaticImageData } from "next/image";

import pfp_vipin from "~/../public/staff-pfps/vipin_atl.png";
import pfp_godder from "~/../public/staff-pfps/decidueye.png";
import pfp_kolmus from "~/../public/staff-pfps/kolmus.png";
import pfp_a_person from "~/../public/staff-pfps/a_person.png";
import pfp_cosmi from "~/../public/staff-pfps/cosmi.png";
import pfp_amir from "~/../public/staff-pfps/amir.png";
import pfp_mathlegend from "~/../public/staff-pfps/mathlegend.png";
import pfp_alex from "~/../public/staff-pfps/alex.png";
import pfp_lordskeletonman from "~/../public/staff-pfps/lordskeletonman.png";
import pfp_flocto from "~/../public/staff-pfps/flocto.png";
import pfp_vy from "~/../public/staff-pfps/vy.png";
import pfp_wjaaaaaaat from "~/../public/staff-pfps/wjaaaaaaat.png";
import pfp_logix from "~/../public/staff-pfps/logix.png";
import pfp_kshau from "~/../public/staff-pfps/kshau.png";
import pfp_mr_mph from "~/../public/staff-pfps/mr_mph.png";
import pfp_jang from "~/../public/staff-pfps/doctor_jang.png";
import pfp_ambush from "~/../public/staff-pfps/ambush.png";
import pfp_null from "~/../public/staff-pfps/null.png";
import pfp_nodachi from "~/../public/staff-pfps/nodachi.png";
import pfp_kushi from "~/../public/staff-pfps/kushi.png";
import pfp_lacklust3r from "~/../public/staff-pfps/lacklust3r.png";
import pfp_goose from "~/../public/staff-pfps/goose.png";
import pfp_ibm from "~/../public/staff-pfps/ibm.png";

export type Person = { name?: string; handle: string; role: string; href?: string; pfp: StaticImageData };

export const founders: Person[] = [
  { name: "Edward Z.", handle: "GodderE2D", role: "Co-founder", href: "https://godder.xyz/", pfp: pfp_godder },
  { name: "Vipin B.", handle: "Vipin", role: "Co-founder", href: "https://www.vipin.xyz/", pfp: pfp_vipin },
];

export const staff: Person[] = [
  { handle: "Kolmus", role: "Head Challenge and Curriculum Designer", pfp: pfp_kolmus },
  { handle: "a_person", role: "Curriculum Designer", pfp: pfp_a_person },
  { handle: "Cosmi", role: "Curriculum Designer", pfp: pfp_cosmi },
  { handle: "Amir", role: "Community Manager", pfp: pfp_amir },
  { handle: "MathLegend_175", role: "Community Manager", pfp: pfp_mathlegend },
  { handle: "Alex Volkov", role: "Server Moderator", pfp: pfp_alex },
  { handle: "Lord SkeletonMan", role: "Server Moderator", pfp: pfp_lordskeletonman },
];

/** Profile pictures by handle, for challenge authors and past staff. Anyone without one is shown by initial. */
export const authorAvatars: Record<string, StaticImageData> = {
  Vipin: pfp_vipin,
  GodderE2D: pfp_godder,
  Kolmus: pfp_kolmus,
  a_person: pfp_a_person,
  flocto: pfp_flocto,
  vy: pfp_vy,
  wjaaaaaaat: pfp_wjaaaaaaat,
  Logix: pfp_logix,
  kshau: pfp_kshau,
  Mr_MPH: pfp_mr_mph,
  Jang: pfp_jang,
  Ambush: pfp_ambush,
  null: pfp_null,
  Nodachi: pfp_nodachi,
  Kushi: pfp_kushi,
  Lacklust3r: pfp_lacklust3r,
  goosewithbongos: pfp_goose,
  ibm03: pfp_ibm,
};

// Vipin wrote under the handle "Vip3r" during Advent of CTF 2024. It is the same person, shown as Vipin everywhere.
export const challengeAuthors: { year: number; event: string; handles: string[] }[] = [
  {
    year: 2025,
    event: "Advent of CTF 2025",
    handles: ["Vipin", "GodderE2D", "a_person", "flocto", "wjaaaaaaat", "vy"],
  },
  { year: 2024, event: "Advent of CTF 2024", handles: ["Vipin", "Kolmus", "GodderE2D", "Logix"] },
  {
    year: 2024,
    event: "Daily CTF",
    handles: ["Vipin", "GodderE2D", "Kolmus", "kshau", "Mr_MPH", "Logix", "arx7254"],
  },
];

/**
 * Staff who have stepped down, from our staff records (2026-11-23). Handles only. "Original server staff"
 * served before the server was reorganized in April 2024. Amir is listed once, under current staff.
 */
export const pastStaff: { role: string; handles: string[] }[] = [
  { role: "Server Owner", handles: ["Plasma"] },
  { role: "Challenge and Curriculum Designer", handles: ["Jang"] },
  { role: "Challenge Developer", handles: ["kshau"] },
  { role: "Community Managers", handles: ["Nodachi", "Kushi"] },
  { role: "Server Moderators", handles: ["Ambush", "null", "Lacklust3r"] },
  {
    role: "Original Server Staff",
    handles: [
      "slippin_j1mmy",
      "goosewithbongos",
      "ibm03",
      "arcanestellaris",
      "victor914",
      "flocto",
      "arx7254",
      "TrustedHacker",
      "shackledmars",
      "reversepolarity",
    ],
  },
];
