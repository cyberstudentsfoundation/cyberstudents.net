import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { HiExternalLink } from "react-icons/hi";
import { FaDiscord } from "react-icons/fa6";
import { Button } from "~/components/ui/button";
import logo from "../../public/logo.gif";

import pfp_alex from "../../public/staff-pfps/alex.png";
import pfp_amir from "../../public/staff-pfps/amir.png";
import pfp_a_person from "../../public/staff-pfps/a_person.png";
// import pfp_ambush from "../../public/staff-pfps/ambush.png";
import pfp_cosmi from "../../public/staff-pfps/cosmi.png";
// import pfp_doctor_jang from "../../public/staff-pfps/doctor_jang.png";
import pfp_godder from "../../public/staff-pfps/decidueye.png";
import pfp_kolmus from "../../public/staff-pfps/kolmus.png";
// import pfp_kshau from "../../public/staff-pfps/kshau.png";
// import pfp_kushi from "../../public/staff-pfps/kushi.png";
// import pfp_logix from "../../public/staff-pfps/logix.png";
import pfp_lordskeletonman from "../../public/staff-pfps/lordskeletonman.png";
import pfp_mathlegend from "../../public/staff-pfps/mathlegend.png";
import pfp_vipin from "../../public/staff-pfps/vipin_atl.png";

const STAFF: { name: string; position: string; pfp: StaticImageData; link?: string }[] = [
  { name: "Vipin", position: "CyberStudents Foundation Co-Chair", pfp: pfp_vipin, link: "https://www.vipin.xyz/" },
  { name: "GodderE2D", position: "CyberStudents Foundation Co-Chair", pfp: pfp_godder, link: "https://godder.xyz/" },
  { name: "Kolmus", position: "Challenge Developer", pfp: pfp_kolmus },
  { name: "a_person", position: "Curriculum Designer", pfp: pfp_a_person },
  { name: "Cosmi", position: "Curriculum Designer", pfp: pfp_cosmi },
  // { name: "Doctor Jang", position: "Challenge Developer", pfp: pfp_doctor_jang },
  { name: "Amir", position: "Community Manager", pfp: pfp_amir },
  { name: "MathLegend_175", position: "Community Manager", pfp: pfp_mathlegend },
  { name: "Alex Volkov", position: "Server Moderator", pfp: pfp_alex },
  // { name: "AmbushDeKewl", position: "Server Moderator", pfp: pfp_ambush },
  { name: "Lord SkeletonMan", position: "Server Moderator", pfp: pfp_lordskeletonman },
  // { name: "Kushi", position: "Community Manager", pfp: pfp_kushi },
] as const;

const LINKS: { name: string; href: string; external: boolean }[] = [
  { name: "CSD CTF", href: "/ctf", external: false },
  { name: "Advent of CTF", href: "/advent/2025", external: false },
  { name: "CTF Archive", href: "https://github.com/cyberstudentsacademy/csd-ctf", external: true },
  { name: "GitHub", href: "https://github.com/cyberstudentsacademy", external: true },
  { name: "CTFtime", href: "https://ctftime.org/team/365239", external: true },
  { name: "Server Rules", href: "/server-rules", external: false },
  { name: "Terms of Service", href: "/terms", external: false },
  { name: "Privacy Policy", href: "/privacy", external: false },
  { name: "Age Requirements", href: "/age-requirements", external: false },
] as const;

export default function Footer() {
  return (
    <div className="bg-gray-800">
      <footer className="flex justify-center bg-gray-900/10 px-4 py-12 pt-8 pb-8 inset-shadow-sm inset-shadow-gray-900 sm:px-8 sm:pt-24 sm:pb-24">
        <div className="flex w-full max-w-(--breakpoint-2xl) flex-col justify-between gap-10 lg:flex-row lg:gap-16">
          <div className="w-full max-w-prose text-sm text-gray-200">
            <Image src={logo} alt="CyberStudents Logo" className="mb-4 h-20 w-20 rounded-2xl" />
            <p className="mb-3">
              We create opportunities for cybersecurity students via learning resources, certification pathways, CTFs,
              and more. Play in our beginner-focused daily cyber CTF challenges and events throughout the year. Join
              thousands of other students in our community today.
            </p>
            <p className="mb-3">
              Email{" "}
              <a
                href="mailto:admin@cyberstudents.net"
                className="font-semibold underline transition-colors hover:text-cyan-300"
              >
                admin@cyberstudents.net
              </a>{" "}
              for sponsorship inquiries, press, and other business-related questions.
            </p>
            {/* should've used https://getfullyear.com/ */}
            <p className="mb-2">
              &copy; 2021&ndash;{new Date().getFullYear()} CyberStudents. CyberStudents is not endorsed nor affiliated
              with Discord Inc., CyberStart Ltd., or Helical Levity Ltd.
            </p>
            <p className="mb-3.5 text-gray-400">Site design by GodderE2D</p>
            <div className="w-fit">
              <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
                <Button
                  tabIndex={-1}
                  className="flex items-center bg-[#5865f2]! font-bold text-gray-200! hover:bg-[#5865f2]/70!"
                >
                  <FaDiscord className="h-6! w-6!" />
                  <span>Discord</span>
                </Button>
              </a>
            </div>
          </div>
          <div className="flex w-full max-w-fit flex-col gap-10 sm:flex-row lg:gap-16">
            <div className="w-full max-w-fit">
              <h2 className="mb-4 font-semibold">Links</h2>
              <ul className="space-y-1.5">
                {LINKS.map(({ name, href, external }) => (
                  <li key={name}>
                    <Link
                      href={href}
                      target={external ? "_blank" : undefined}
                      className="flex items-center gap-1 transition-colors hover:text-cyan-300"
                    >
                      {name}
                      {external && <HiExternalLink className="h-4 w-4" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full max-w-fit">
              <h2 className="mb-4 font-semibold">Thank you to our wonderful staff 🩵</h2>
              <ul className="grid grid-flow-col grid-rows-5 gap-3 lg:grid-rows-9 xl:grid-rows-5">
                {STAFF.map(({ name, pfp, position, link }) => (
                  <li key={name}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-fit items-center gap-2"
                    >
                      <Image
                        src={pfp}
                        alt={`Profile Picture for ${name}`}
                        placeholder="blur"
                        className="h-6 w-6 rounded-full"
                      />
                      <div>
                        <div>
                          <strong className={`font-semibold text-gray-200 ${link ? "group-hover:underline" : ""}`}>
                            {name}
                          </strong>
                        </div>
                        <div className="text-xs text-gray-300">{position}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
