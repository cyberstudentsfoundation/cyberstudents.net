"use client";

import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { api } from "~/trpc/react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { HiAdjustmentsHorizontal, HiArrowRightStartOnRectangle, HiOutlineIdentification } from "react-icons/hi2";

export default function AccountDropdown({ session }: { session?: Session | null }) {
  const userMeQuery = session?.user ? api.user.me.useQuery() : null;

  if (typeof window !== "undefined" && session?.user && !posthog._isIdentified()) {
    posthog.identify(session.user.id, {
      email: session.user.email,
      name: session.user.name,
    });
  }

  return session?.user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="mr-1 flex h-full items-center gap-1.5 px-3 py-2 text-base text-gray-300 sm:mr-3"
        >
          <Image
            src={session.user.image?.replace(".gif", ".png") ?? "https://cdn.discordapp.com/embed/avatars/5.png"}
            width={64}
            height={64}
            alt="Profile Picture"
            className="h-6 w-6 min-w-6 shrink-0 rounded-full"
          />
          <span className="hidden max-w-24 truncate sm:block">{session.user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="px-3 py-2 text-base" asChild>
          <Link href="/verification">
            <HiOutlineIdentification className="!h-5 !w-5" />
            <span>Verification</span>
          </Link>
        </DropdownMenuItem>
        {userMeQuery?.data?.flags.includes("admin") && (
          <DropdownMenuItem className="px-3 py-2 text-base" asChild>
            <Link href="/dashboard">
              <HiAdjustmentsHorizontal className="!h-5 !w-5" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="px-3 py-2 text-base" onClick={() => signOut()}>
          <HiArrowRightStartOnRectangle className="!h-5 !w-5" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button variant="ghost" className="mr-3 hidden text-base text-gray-300 sm:flex" onClick={() => signIn("discord")}>
      Sign in
    </Button>
  );
}
