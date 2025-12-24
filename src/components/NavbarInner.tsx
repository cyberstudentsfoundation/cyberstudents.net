"use client";

import React, { useEffect, useState } from "react";
import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import wordmark from "../../public/wordmark.svg";
import NavbarStatus from "~/components/NavbarStatus";
import { FaDiscord } from "react-icons/fa";
import AccountDropdown from "~/components/AccountDropdown";
import MobileNavbar from "~/components/MobileNavbar";
import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui-old/tooltip2";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "~/components/ui/accordion";
import { XIcon } from "lucide-react";

const LINKS: { name: string; href: string; disabled?: boolean }[] = [
  { name: "Foundation", href: "/foundation", disabled: true },
  { name: "Learn", href: "/learn", disabled: true },
  { name: "Practice", href: "/gym/challenges", disabled: true },
] as const;

export default function NavbarInner({ session }: { session: Session | null }) {
  // Use Radix Accordion (shadcn wrapper) for smooth open/close animations
  const [adventOpenValue, setAdventOpenValue] = useState<string | undefined>(undefined);
  // const [alertVisible, setAlertVisible] = useState(false);

  // useEffect(() => {
  //   // localStorage alert dismissed check
  //   const dismissedAlertValue = localStorage.getItem("dismissed-alert");
  //   if (dismissedAlertValue !== "2025-12-14-security-notice") {
  //     setAlertVisible(true);
  //   }
  // }, []);

  return (
    <>
      {/* {alertVisible && (
        <div id="alert" className="w-full bg-yellow-500/30 py-4">
          <div className="mx-auto w-full max-w-(--breakpoint-2xl) pr-4 pl-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="mb-2 sm:mb-1">
                  <span className="text-sm font-semibold tracking-wide text-yellow-300/90 uppercase">
                    Security Notice
                  </span>
                  <button
                    title="Close alert"
                    className="float-right cursor-pointer sm:hidden"
                    onClick={() => {
                      localStorage.setItem("dismissed-alert", "2025-12-14-security-notice");
                      setAlertVisible(false);
                    }}
                  >
                    <XIcon className="h-5 w-5 transition-all hover:opacity-75" />
                  </button>
                </div>
                <p className="mb-2 sm:mb-0">
                  <strong>A third-party vulnerability caused temporary redirects to a spam/phishing site</strong> on Dec
                  13&ndash;14. Your data is still secure; no actions are required by you.
                </p>
                <p>
                  If you interacted with the spam/phishing site or wish to learn more, please read the announcement in
                  our{" "}
                  <a href="https://discord.gg/PQsJqzVT52" target="_blank" className="underline">
                    Discord server
                  </a>
                  .
                </p>
              </div>
              <button
                title="Close alert"
                className="hidden cursor-pointer sm:block"
                onClick={() => {
                  localStorage.setItem("dismissed-alert", "2025-12-14-security-notice");
                  setAlertVisible(false);
                }}
              >
                <XIcon className="h-5 w-5 transition-all hover:opacity-75" />
              </button>
            </div>
          </div>
        </div>
      )} */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-center border-b border-gray-800 bg-gray-900/75 px-4 py-2 backdrop-blur-lg">
        <div className="flex w-full max-w-(--breakpoint-2xl) items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image src={wordmark} alt="CyberStudents Wordmark" priority className="h-6 w-auto sm:h-6.5" />
            </Link>
            <div className="ml-4 hidden items-center xl:flex">
              {LINKS.map(({ name, href, disabled }) =>
                disabled ? (
                  <TooltipProvider key={name} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          key={name}
                          variant="link"
                          asChild
                          className={`text-base hover:no-underline ${!disabled ? "hover:text-cyan-300" : "text-gray-500!"}`}
                        >
                          {disabled ? <span>{name}</span> : <Link href={href}>{name}</Link>}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm font-semibold text-gray-200">Coming Soon</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Button
                    key={name}
                    variant="link"
                    asChild
                    className={`text-base hover:no-underline ${!disabled ? "hover:text-cyan-300" : "text-gray-500!"}`}
                  >
                    {disabled ? <span>{name}</span> : <Link href={href}>{name}</Link>}
                  </Button>
                ),
              )}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      triggerMode="click"
                      className="bg-transparent! text-base ring-offset-white hover:bg-gray-800! focus-visible:ring-0 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                      Competitions
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="flex w-[400px] flex-col gap-1 p-4 md:w-[500px] lg:w-[600px]">
                        <li className="relative">
                          <Accordion
                            type="single"
                            collapsible
                            value={adventOpenValue}
                            onValueChange={(v) => setAdventOpenValue((v ?? undefined) as string | undefined)}
                          >
                            <AccordionItem value="advent" className="border-0">
                              <AccordionTrigger className="rounded-md p-0 pr-2 hover:bg-gray-800 hover:no-underline">
                                <div className="w-full cursor-pointer px-4 py-3 text-left transition-all">
                                  <div className="mb-1 leading-none font-medium">Advent of CTF</div>
                                  <p className="line-clamp-2 text-gray-400">
                                    Solve daily beginner-friendly challenges every December
                                  </p>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pb-1">
                                <ul className="ml-3 flex flex-col">
                                  <li>
                                    <NavigationMenuLink asChild>
                                      <Link href="/advent/2025" passHref>
                                        <div className="rounded-tr-md rounded-br-md border-l-2 border-gray-600 px-4 py-2 transition-all hover:bg-gray-800">
                                          <div className="leading-none font-medium">Advent of CTF 2025</div>
                                          <p className="line-clamp-2 text-gray-400">
                                            <strong>LIVE</strong> now through December 31st - New challenges every day!
                                          </p>
                                        </div>
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                  <li>
                                    <NavigationMenuLink asChild>
                                      <Link href="/advent/2024" passHref>
                                        <div className="rounded-tr-md rounded-br-md border-l-2 border-gray-600 px-4 py-2 transition-all hover:bg-gray-800">
                                          <div className="leading-none font-medium">Advent of CTF 2024</div>
                                          <p className="line-clamp-2 text-gray-400">
                                            Our inaugural Advent of CTF event hosted in December 2024
                                          </p>
                                        </div>
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </li>

                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/ctf" passHref>
                              <div className="rounded-md px-4 py-3 transition-all hover:bg-gray-800">
                                <div className="mb-1 leading-none font-medium">CSD CTF</div>
                                <p className="line-clamp-2 text-gray-400">
                                  Our premier weekend-long CTF competition hosted every summer
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
                            <div className="rounded-md px-4 py-3 transition-all hover:bg-gray-800">
                              <div className="mb-1 leading-none font-medium">Daily CTF</div>
                              <p className="line-clamp-2 text-gray-400">
                                Practice with community challenges every day with monthly rounds
                              </p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <NavbarStatus />
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
                <FaDiscord className="mr-2 mb-px h-6 w-6" />
                <span className="hidden 2xl:block">Join our Discord community</span>
                <span className="block 2xl:hidden">Discord</span>
              </div>
            </a>
            <MobileNavbar session={session} />
          </div>
        </div>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { external?: boolean; disabled?: boolean }
>(({ title, children, href, external, disabled, ...props }, ref) => {
  return (
    <li>
      {disabled ? (
        <div className="rounded-md px-4 py-3">
          <div className="mb-1 leading-none font-medium text-gray-500">{title}</div>
          <p className="line-clamp-2 text-gray-500">{children}</p>
        </div>
      ) : external ? (
        <a ref={ref as unknown as React.Ref<HTMLAnchorElement>} href={href!} target="_blank" {...props}>
          <div className="rounded-md px-4 py-3 transition-all hover:bg-gray-800">
            <div className="mb-1 leading-none font-medium">{title}</div>
            <p className="line-clamp-2 text-gray-400">{children}</p>
          </div>
        </a>
      ) : (
        <NavigationMenuLink asChild>
          <Link ref={ref as unknown as React.Ref<HTMLAnchorElement>} href={href!} {...props} passHref>
            <div className="rounded-md px-4 py-3 transition-all hover:bg-gray-800">
              <div className="mb-1 leading-none font-medium">{title}</div>
              <p className="line-clamp-2 text-gray-400">{children}</p>
            </div>
          </Link>
        </NavigationMenuLink>
      )}
    </li>
  );
});
ListItem.displayName = "ListItem";
