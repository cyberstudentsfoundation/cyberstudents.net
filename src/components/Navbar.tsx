import React from "react";
import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
import wordmark from "../../public/wordmark.svg";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import AccountDropdown from "~/components/AccountDropdown";
import MobileNavbar from "~/components/MobileNavbar";
import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

import { cn } from "~/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

const components: { title: string; href: string; description: string; external?: boolean; disabled?: boolean }[] = [
  {
    title: "CyberStudents CTF – Coming Soon",
    href: "/ctf",
    description: "Our premier weekend-long CTF competition hosted every summer",
    disabled: true,
  },
  {
    title: "Advent of CTF",
    href: "/advent",
    description: "Solve beginner-friendly daily challenges every day in December",
  },
  {
    title: "Daily CTF",
    href: "https://discord.com/invite/cyberstudents-916144903686336513",
    description: "Practice with community challenges every day with monthly rounds",
    external: true,
  },
];

const LINKS: { name: string; href: string; disabled?: boolean }[] = [
  { name: "Foundation", href: "/foundation", disabled: true },
  { name: "Learn", href: "/learn", disabled: true },
  // { name: "Census", href: "/census" },
  // { name: "Competitions", href: "/advent" },
  // { name: "Advent of CTF", href: "/advent" },
  { name: "Practice", href: "/gym/challenges", disabled: true },
  // { name: "CTF Archive", href: "https://github.com/cyberstudentsacademy/csd-ctf" },
] as const;

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
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
                    className="bg-transparent! text-base ring-offset-white hover:bg-gray-800! focus-visible:outline-hidden focus-visible:ring-0 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                  >
                    Competitions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex w-[400px] flex-col gap-1 p-4 md:w-[500px] lg:w-[600px]">
                      {components.map(({ title, href, description, external, disabled }) => (
                        <ListItem key={title} title={title} href={href} external={external} disabled={disabled}>
                          {description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { external?: boolean; disabled?: boolean }
>(({ className, title, children, href, external, disabled, ...props }, ref) => {
  return (
    <li>
      {disabled ? (
        <div className="rounded-md px-4 py-3">
          <div className="mb-1 font-medium leading-none text-gray-500">{title}</div>
          <p className="line-clamp-2 text-gray-500">{children}</p>
        </div>
      ) : external ? (
        <a ref={ref} href={href!} target="_blank" {...props}>
          <div className="rounded-md px-4 py-3 transition-all hover:bg-gray-800">
            <div className="mb-1 font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-gray-400">{children}</p>
          </div>
        </a>
      ) : (
        <Link ref={ref} href={href!} {...props} passHref legacyBehavior>
          <NavigationMenuLink>
            <div className="rounded-md px-4 py-3 transition-all hover:bg-gray-800">
              <div className="mb-1 font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-gray-400">{children}</p>
            </div>
          </NavigationMenuLink>
        </Link>
      )}
    </li>
  );
});
ListItem.displayName = "ListItem";
