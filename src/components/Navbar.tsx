import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
import wordmark from "../../public/wordmark.svg";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import AccountDropdown from "~/components/AccountDropdown";
import MobileNavbar from "~/components/MobileNavbar";
import { Button } from "~/components/ui/button";

const LINKS: { name: string; href: string }[] = [
  { name: "Advent of CTF", href: "/advent" },
  // { name: "CTF Gym", href: "/gym/challenges" },
  { name: "CTF Archive", href: "https://github.com/cyberstudentsacademy/csd-ctf" },
] as const;

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className="sticky top-0 z-30 flex h-14 items-center justify-center border-b border-gray-800 bg-gray-900/75 px-4 py-2 backdrop-blur-lg">
      <div className="flex w-full max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image src={wordmark} alt="CyberStudents Wordmark" priority className="h-6 w-auto sm:h-[1.625rem]" />
          </Link>
          <div className="ml-4 hidden items-center xl:flex">
            {LINKS.map(({ name, href }) => (
              <Button key={name} variant="link" asChild className="text-base hover:text-cyan-300 hover:no-underline">
                <Link href={href}>{name}</Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <AccountDropdown session={session} />
          <div className="mr-5 hidden h-6 w-px bg-white/20 xl:block" />
          <a
            href="https://discord.com/invite/cyberstudents-916144903686336513"
            target="_blank"
            className="hidden xl:block"
          >
            <div className="mr-2 flex items-center font-semibold text-gray-300 transition-colors hover:text-white">
              <FaDiscord className="mb-px mr-2 h-6 w-6" />
              <span className="hidden sm:block">Join our Discord community</span>
              <span className="block sm:hidden">Discord</span>
              <HiArrowUpRight className="mb-0.5 ml-1 h-3 w-3 stroke-1" />
            </div>
          </a>
          <MobileNavbar session={session} />
        </div>
      </div>
    </div>
  );
}
