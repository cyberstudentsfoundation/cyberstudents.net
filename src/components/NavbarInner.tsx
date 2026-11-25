"use client";

import React from "react";
import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import wordmark from "../../public/wordmark.svg";
import { FaDiscord } from "react-icons/fa";
import AccountDropdown from "~/components/AccountDropdown";
import MobileNavbar from "~/components/MobileNavbar";
import { Button } from "~/components/ui/button";
import { ADVENT_LINKS, NAV_LINKS } from "~/components/nav-links";
import { site } from "~/data/site";
import { cn } from "~/lib/utils";
import { useAdventYearRoute } from "~/components/route-gutters";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

export default function NavbarInner({ session, authEnabled }: { session: Session | null; authEnabled: boolean }) {
  // Narrow gutters on the Advent year pages (their own bar sits right below this one), Wide's gutters elsewhere.
  const adventYear = useAdventYearRoute();
  return (
    <div className="sticky top-0 z-30 flex h-14 items-center justify-center border-b border-gray-800 bg-gray-900/75 py-2 text-white backdrop-blur-lg">
      <div
        className={cn(
          "flex w-full max-w-(--breakpoint-2xl) items-center justify-between",
          adventYear ? "px-4" : "px-4 sm:px-8 md:px-10 xl:px-20",
        )}
      >
        <div className="flex items-center">
          <Link href="/">
            <Image src={wordmark} alt="CyberStudents" priority className="h-6 w-auto sm:h-6.5" />
          </Link>
          <div className="ml-4 hidden items-center lg:flex">
            <NavigationMenu navigationMenuViewportClassName="border-gray-800!">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    triggerMode="click"
                    className="bg-transparent! text-base text-white ring-offset-white hover:bg-gray-800! focus-visible:ring-0 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                  >
                    Advent of CTF
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-gray-800! bg-gray-900! text-gray-50!">
                    <ul className="flex w-[400px] flex-col gap-1 p-3">
                      {ADVENT_LINKS.map(({ name, href, description }) => (
                        <li key={href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={href}
                              className="block rounded-md px-4 py-3 transition-colors hover:bg-gray-800"
                            >
                              <div className="mb-1 leading-none font-medium">{name}</div>
                              <p className="line-clamp-2 text-sm text-gray-400">{description}</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            {NAV_LINKS.map(({ name, href }) => (
              <Button
                key={href}
                variant="link"
                asChild
                className="text-base text-white hover:text-cyan-300! hover:no-underline"
              >
                <Link href={href}>{name}</Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          {authEnabled && (
            <>
              <AccountDropdown session={session} tone="dark" />
              <div className="mr-5 hidden h-6 w-px bg-white/20 lg:block" />
            </>
          )}
          {/* The full label fits from 1280 px up (a 14 inch MacBook is about 1512 px wide); below that the links
              share the bar with it, so it shortens instead of wrapping. */}
          <a
            href={site.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg bg-[#5865f2] px-3 py-1.5 font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#4752c4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 lg:flex"
          >
            <FaDiscord className="size-5 shrink-0" aria-hidden="true" />
            <span className="hidden xl:inline">Join our Discord community</span>
            <span className="xl:hidden">Join our Discord</span>
          </a>
          <MobileNavbar session={session} authEnabled={authEnabled} />
        </div>
      </div>
    </div>
  );
}
