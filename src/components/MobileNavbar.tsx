"use client";

import { useState } from "react";
import type { Session } from "next-auth";
import Link from "next/link";
import {
  HiArrowUpRight,
  HiBars3,
  HiUserCircle,
  HiXMark,
  HiMiniArrowPath,
  HiPencilSquare,
  HiPlus,
} from "react-icons/hi2";
import { Button } from "~/components/ui/button";
import dayjs from "dayjs";
import { api } from "~/trpc/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Prose } from "~/lib/renderMarkdoc";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "~/components/ui/command";
import { cn } from "~/lib/utils";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { FaDiscord } from "react-icons/fa6";
import { signIn } from "next-auth/react";

const LINKS: { name: string; href: string; disabled?: boolean }[] = [
  { name: "Home", href: "/" },
  { name: "Foundation – Coming Soon", href: "/foundation", disabled: true },
  { name: "Practice – Coming Soon", href: "/practice", disabled: true },
  { name: "Learn – Coming Soon", href: "/learn", disabled: true },
  // { name: "Census", href: "/census", disabled: true },
  // { name: "Competitions", href: "/advent" },
  // { name: "Advent of CTF", href: "/advent" },
  // { name: "CTF Archive", href: "https://github.com/cyberstudentsacademy/csd-ctf" },
] as const;

export default function MobileNavbar({ session }: { session?: Session | null }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className={`flex xl:hidden ${menuOpen ? "bg-gray-800" : ""}`}>
          <HiBars3 className="!h-6 !w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0 !bg-gray-900 !px-0 text-gray-200 sm:max-w-screen-md">
        <ScrollArea className="pr-6">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation menu</SheetTitle>
          </SheetHeader>
          <div className="my-8 pl-6">
            {LINKS.map(({ name, href, disabled }) => (
              <div key={name} className="py-2">
                {disabled ? (
                  <span className="text-xl font-medium text-gray-500">{name}</span>
                ) : (
                  <Link
                    href={href}
                    className="text-xl font-medium transition-colors hover:text-cyan-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    {name}
                  </Link>
                )}
              </div>
            ))}
            <div className="py-2">
              <Accordion type="single" collapsible>
                <AccordionItem value="competitions" className="border-gray-700">
                  <AccordionTrigger className="pb-4 pt-0 text-xl font-medium !no-underline">
                    Competitions
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <span className="text-lg text-gray-500">CyberStudents CTF – Coming Soon</span>
                      <Link
                        href="/advent"
                        className="text-lg transition-colors hover:text-cyan-300"
                        onClick={() => setMenuOpen(false)}
                      >
                        Advent of CTF
                      </Link>
                      <Link
                        href="https://discord.com/invite/cyberstudents-916144903686336513"
                        className="text-lg transition-colors hover:text-cyan-300"
                        onClick={() => setMenuOpen(false)}
                      >
                        Daily CTF
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="py-2 text-xl">
              <a
                href="https://discord.com/invite/cyberstudents-916144903686336513"
                target="_blank"
                className="flex items-center"
              >
                <FaDiscord className="mr-2 !h-6 !w-6" />
                <span>Discord</span>
                <HiArrowUpRight className="ml-1 !h-3.5 !w-3.5 stroke-1" />
              </a>
            </div>
            {!session && (
              <div className="flex items-center py-2 text-xl" role="button" onClick={() => signIn("discord")}>
                <HiUserCircle className="mr-2 !h-6 !w-6" />
                <span>Sign in</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
    // <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
    //   <DropdownMenuTrigger asChild>
    //     <Button size="icon" variant="ghost" className={`flex xl:hidden ${menuOpen ? "bg-gray-800" : ""}`}>
    //       <div className={`swap swap-rotate ${menuOpen ? "swap-active" : ""}`}>
    //         <HiXMark className="swap-on !h-6 !w-6" />
    //         <HiBars3 className="swap-off !h-6 !w-6" />
    //       </div>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end" className="min-w-72">
    //     {LINKS.map(({ name, href }) => (
    //       <DropdownMenuItem key={name} className="px-4 py-3 text-base" asChild>
    //         <Link href={href}>
    //           <span>{name}</span>
    //         </Link>
    //       </DropdownMenuItem>
    //     ))}
    //     <DropdownMenuItem className="px-4 py-3 text-base" asChild>
    //       <a href="https://discord.com/invite/cyberstudents-916144903686336513" target="_blank">
    //         <FaDiscord className="!h-6 !w-6" />
    //         <span>Join our Discord community</span>
    //       </a>
    //     </DropdownMenuItem>
    //     {!session && (
    //       <DropdownMenuItem
    //         className="flex px-4 py-3 text-base sm:hidden"
    //         role="button"
    //         onClick={() => signIn("discord")}
    //       >
    //         <HiUserCircle className="!h-6 !w-6" />
    //         <span>Sign in</span>
    //       </DropdownMenuItem>
    //     )}
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}
