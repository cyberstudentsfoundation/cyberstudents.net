"use client";

import { useState } from "react";
import type { Session } from "next-auth";
import Link from "next/link";
import { HiArrowUpRight, HiBars3, HiUserCircle, HiXMark } from "react-icons/hi2";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { FaDiscord } from "react-icons/fa6";
import { signIn } from "next-auth/react";

const LINKS: { name: string; href: string }[] = [
  { name: "Advent of CTF", href: "/advent" },
  // { name: "CTF Gym", href: "/gym/challenges" },
  { name: "CTF Archive", href: "https://github.com/cyberstudentsacademy/csd-ctf" },
] as const;

export default function MobileNavbar({ session }: { session?: Session | null }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className={`flex xl:hidden ${menuOpen ? "bg-gray-800" : ""}`}>
          <div className={`swap swap-rotate ${menuOpen ? "swap-active" : ""}`}>
            <HiXMark className="swap-on !h-6 !w-6" />
            <HiBars3 className="swap-off !h-6 !w-6" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-72">
        {LINKS.map(({ name, href }) => (
          <DropdownMenuItem key={name} className="px-4 py-3 text-base" asChild>
            <Link href={href}>
              <span>{name}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className="px-4 py-3 text-base" asChild>
          <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
            <FaDiscord className="!h-6 !w-6" />
            <span>Join our Discord community</span>
          </a>
        </DropdownMenuItem>
        {!session && (
          <DropdownMenuItem
            className="flex px-4 py-3 text-base sm:hidden"
            role="button"
            onClick={() => signIn("discord")}
          >
            <HiUserCircle className="!h-6 !w-6" />
            <span>Sign in</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
