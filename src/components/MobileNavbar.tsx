"use client";

import { useState } from "react";
import type { Session } from "next-auth";
import Link from "next/link";
import { HiBars3, HiUserCircle } from "react-icons/hi2";
import { HiExternalLink } from "react-icons/hi";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { FaDiscord } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { ADVENT_LINKS, NAV_LINKS } from "~/components/nav-links";
import { site } from "~/data/site";

export default function MobileNavbar({ session, authEnabled = true }: { session?: Session | null; authEnabled?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Open menu"
          className={`flex lg:hidden ${menuOpen ? "bg-gray-800" : ""}`}
        >
          <HiBars3 className="h-6! w-6!" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0 bg-gray-900! px-0! text-gray-200 sm:max-w-md">
        <ScrollArea className="pr-6">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation menu</SheetTitle>
          </SheetHeader>
          <div className="my-8 pl-6">
            <div className="py-2">
              <Link href="/" className="text-xl font-medium transition-colors hover:text-cyan-300" onClick={close}>
                Home
              </Link>
            </div>
            <div className="py-2">
              <Accordion type="single" collapsible>
                <AccordionItem value="advent" className="border-gray-700">
                  <AccordionTrigger className="pt-0 pb-4 text-xl font-medium no-underline!">
                    Advent of CTF
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      {ADVENT_LINKS.map(({ name, href }) => (
                        <Link
                          key={href}
                          href={href}
                          className="text-lg transition-colors hover:text-cyan-300"
                          onClick={close}
                        >
                          {name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            {NAV_LINKS.map(({ name, href }) => (
              <div key={href} className="py-2">
                <Link href={href} className="text-xl font-medium transition-colors hover:text-cyan-300" onClick={close}>
                  {name}
                </Link>
              </div>
            ))}
            <div className="py-2 text-xl">
              <a href={site.discord} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <FaDiscord className="mr-2 h-6! w-6!" />
                <span>Discord</span>
                <HiExternalLink className="ml-1 size-4" aria-hidden="true" />
              </a>
            </div>
            {authEnabled && !session && (
              <button type="button" className="flex items-center py-2 text-xl" onClick={() => signIn("discord")}>
                <HiUserCircle className="mr-2 h-6! w-6!" />
                <span>Sign in</span>
              </button>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
