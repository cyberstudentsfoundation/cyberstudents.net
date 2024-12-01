import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa6";
import { Button } from "~/components/ui/button";
import logo from "../../public/logo.gif";

import pfp_alcyone from "../../public/staff-pfps/alcyone.png";
import pfp_alex from "../../public/staff-pfps/alex.png";
import pfp_ambush from "../../public/staff-pfps/ambush.png";
import pfp_godder from "../../public/staff-pfps/godder.png";
import pfp_goose from "../../public/staff-pfps/goose.png";
import pfp_ibm from "../../public/staff-pfps/ibm.png";
import pfp_kolmus from "../../public/staff-pfps/kolmus.png";
import pfp_kshau from "../../public/staff-pfps/kshau.png";
import pfp_kushi from "../../public/staff-pfps/kushi.png";
import pfp_lacklust3r from "../../public/staff-pfps/lacklust3r.png";
import pfp_logix from "../../public/staff-pfps/logix.png";
import pfp_lordskeletonman from "../../public/staff-pfps/lordskeletonman.png";
import pfp_nodachi from "../../public/staff-pfps/nodachi.png";
import pfp_null from "../../public/staff-pfps/null.png";
import pfp_vipin from "../../public/staff-pfps/vipin.png";

const STAFF: { name: string; position: string; pfp: StaticImageData; link?: string }[] = [
  { name: "Vipin", position: "Owner", pfp: pfp_vipin, link: "https://www.vipin.xyz/" },
  { name: "GodderE2D", position: "Head Administrator", pfp: pfp_godder, link: "https://godder.xyz/" },
  { name: "Alcyone", position: "Administrator", pfp: pfp_alcyone },
  { name: "Logix", position: "Administrator", pfp: pfp_logix },
  { name: "Kolmus", position: "Challenge Developer", pfp: pfp_kolmus },
  { name: "Shau", position: "Challenge Developer", pfp: pfp_kshau },
  { name: "Alex Volkov", position: "Server Moderator", pfp: pfp_alex },
  { name: "AmbushDeKewl", position: "Server Moderator", pfp: pfp_ambush },
  { name: "Lord SkeletonMan", position: "Server Moderator", pfp: pfp_lordskeletonman },
  { name: "Kushi", position: "Community Manager", pfp: pfp_kushi },
] as const;

export default function Footer() {
  return (
    <footer className="mx-4 mt-24 flex justify-center py-12">
      <div className="flex w-full max-w-screen-2xl flex-col justify-between gap-10 sm:flex-row sm:gap-5">
        <div className="w-full max-w-prose text-sm text-gray-200">
          <Image src={logo} alt="CyberStudents Logo" className="mb-4 h-20 w-20 rounded-2xl" />
          <p className="mb-3">
            We create opportunities for cybersecurity students via learning resources, certification pathways, CTFs, and
            more. Play in our beginner-focused daily cyber CTF challenges and events throughout the year. Join thousands
            of other students in our community today.
          </p>
          <p className="mb-1">Contact:</p>
          <ul className="mb-4 ml-4 list-disc">
            <li>vipin [at] vipin [dot] xyz</li>
            <li>goddere2d [at] bsr [dot] gg</li>
          </ul>
          <div className="w-fit">
            <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
              <Button
                tabIndex={-1}
                className="flex items-center bg-[#5865f2] font-bold text-gray-200 hover:bg-[#5865f2]/70"
              >
                <FaDiscord className="mr-2 h-6 w-6" />
                <span>Discord</span>
              </Button>
            </a>
          </div>
        </div>
        <div className="w-full max-w-2xl">
          <h2 className="mb-4 font-bold">Thank you to our wonderful staff 🩵</h2>
          <ul className="grid grid-flow-col grid-rows-5 gap-3">
            {STAFF.map(({ name, pfp, position, link }) => (
              <li key={name}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex w-fit items-center gap-2 ${link ? "hover:underline" : ""}`}
                >
                  <Image
                    src={pfp}
                    alt={`Profile Picture for ${name}`}
                    placeholder="blur"
                    className="h-6 w-6 rounded-full"
                  />
                  <div>
                    <div>
                      <strong className="font-semibold text-gray-200">{name}</strong>
                    </div>
                    <div className="text-xs text-gray-300">{position}</div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
