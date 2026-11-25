import Image from "next/image";
import Link from "next/link";
import { HiExternalLink } from "react-icons/hi";
import { FaDiscord } from "react-icons/fa6";
import { HiEnvelope, HiPhone } from "react-icons/hi2";
import logo from "../../public/logo.gif";
import { site } from "~/data/site";
import { founders, staff } from "~/data/team";
import { FooterFrame } from "~/components/route-gutters";

const LINKS: { name: string; href: string; external: boolean }[] = [
  { name: "Advent of CTF", href: "/advent", external: false },
  { name: "Challenges", href: "/challenges", external: false },
  { name: "Write-ups", href: "/write-ups", external: false },
  { name: "Newsroom", href: "/news", external: false },
  { name: "About Us", href: "/about", external: false },
  { name: "GitHub", href: site.github, external: true },
  { name: "CTFtime", href: site.ctftime, external: true },
  { name: "Server Rules", href: "/server-rules", external: false },
  { name: "Terms of Service", href: "/terms", external: false },
  { name: "Privacy Policy", href: "/privacy", external: false },
  { name: "Age Requirements", href: "/age-requirements", external: false },
];

const PEOPLE = [
  ...founders.map((f) => ({ name: f.name ?? f.handle, sub: `${f.handle} · ${f.role}`, pfp: f.pfp, link: f.href })),
  ...staff.map((s) => ({ name: s.handle, sub: s.role, pfp: s.pfp, link: s.href })),
];

export default function Footer() {
  return (
    <div className="bg-gray-800">
      <FooterFrame className="flex justify-center bg-gray-900/10 py-12 pt-8 pb-8 inset-shadow-sm inset-shadow-gray-900 sm:pt-24 sm:pb-24">
        <div className="flex w-full max-w-(--breakpoint-2xl) flex-col justify-between gap-10 lg:flex-row lg:gap-16">
          <div className="w-full max-w-prose text-sm text-gray-200">
            <Image src={logo} alt="CyberStudents Logo" className="mb-4 h-20 w-20 rounded-2xl" unoptimized />
            <p className="mb-3">
              CyberStudents is a student-run cybersecurity community where you can learn, compete, and hang out with
              thousands of high school and college students from more than 130 countries. We write our own capture the
              flag challenges, host Advent of CTF every December, and run talks and game nights on our Discord server.
            </p>
            <ul className="mb-4 space-y-1.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2.5 font-semibold transition-colors hover:text-cyan-300"
                >
                  <HiEnvelope className="size-4 text-cyan-300" aria-hidden="true" />
                  <span className="sr-only">Email </span>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.phone.href}
                  title={site.phone.display}
                  className="group inline-flex items-center gap-2.5 font-semibold tracking-wide transition-colors hover:text-cyan-300"
                >
                  <HiPhone className="size-4 text-cyan-300" aria-hidden="true" />
                  <span className="sr-only">Call {site.phone.display}, </span>
                  <span aria-hidden="true">{site.phone.vanity}</span>
                </a>
              </li>
            </ul>
            <p className="mb-2">
              &copy; 2021-{new Date().getFullYear()} CyberStudents. CyberStudents is not endorsed nor affiliated
              with Discord Inc., CyberStart Ltd., or Helical Levity Ltd.
            </p>
            <p className="mb-2 text-gray-400">
              AP&reg; and Advanced Placement&reg; are trademarks registered by the College Board, which is not
              affiliated with and does not endorse CyberStudents. CompTIA, Security+, and Network+ are trademarks of
              CompTIA, Inc.
            </p>
            <p className="mb-3.5 text-gray-400">
              Site design by{" "}
              <a
                href={founders.find((f) => f.handle === "GodderE2D")?.href ?? site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 transition-colors hover:text-cyan-300"
              >
                Edward Z. (GodderE2D)
              </a>
            </p>
            <a
              href={site.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#5865f2] px-4 py-2 font-bold text-gray-100 transition-colors hover:bg-[#5865f2]/70"
            >
              <FaDiscord className="size-6" aria-hidden="true" />
              <span>Discord</span>
            </a>
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
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-1 transition-colors hover:text-cyan-300"
                    >
                      {name}
                      {external && <HiExternalLink className="h-4 w-4" aria-hidden="true" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full max-w-fit">
              <h2 className="mb-4 font-semibold">Thank you to our wonderful staff 🩵</h2>
              <ul className="grid grid-flow-col grid-rows-5 gap-3 lg:grid-rows-9 xl:grid-rows-5">
                {PEOPLE.map(({ name, sub, pfp, link }) => {
                  const inner = (
                    <>
                      <Image
                        src={pfp}
                        alt=""
                        placeholder="blur"
                        className="h-6 w-6 rounded-full"
                        sizes="24px"
                      />
                      <div>
                        <div>
                          <strong className={`font-semibold text-gray-200 ${link ? "group-hover:underline" : ""}`}>
                            {name}
                          </strong>
                        </div>
                        <div className="text-xs text-gray-300">{sub}</div>
                      </div>
                    </>
                  );
                  return (
                    <li key={name}>
                      {link ? (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex w-fit items-center gap-2"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex w-fit items-center gap-2">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </FooterFrame>
    </div>
  );
}
