import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
import wordmark from "../../public/wordmark.svg";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import AccountDropdown from "~/components/AccountDropdown";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className="sticky top-0 z-30 flex justify-between bg-black px-2 py-2">
      <Link href="/">
        <Image src={wordmark} alt="CyberStudents Wordmark" className="h-6 w-auto" />
      </Link>
      <div className="flex items-center">
        {session?.user && (
          <>
            <AccountDropdown session={session} />
            <div className="mr-3 h-full w-px bg-white/20 sm:mr-5"></div>
          </>
        )}
        <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
          <div className="mr-2 flex items-center text-sm font-semibold text-gray-300 transition-colors hover:text-gray-100">
            <FaDiscord className="mb-px mr-2 h-5 w-5" />
            <span className="hidden sm:block">Join our Discord community</span>
            <span className="block sm:hidden">Discord</span>
            <HiArrowUpRight className="mb-0.5 ml-0.5 h-3 w-3 stroke-1" />
          </div>
        </a>
      </div>
    </div>
  );
}
