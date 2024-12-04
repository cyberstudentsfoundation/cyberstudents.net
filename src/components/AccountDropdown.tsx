"use client";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { api } from "~/trpc/react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { HiAdjustmentsHorizontal, HiArrowRightStartOnRectangle } from "react-icons/hi2";

export default function AccountDropdown({ session }: { session: Session }) {
  const userMeQuery = api.user.me.useQuery();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="mr-1 flex h-full items-center gap-1.5 rounded px-2 text-gray-300 hover:bg-white/10 hover:underline sm:mr-3">
          <Image
            src={session.user.image?.replace(".gif", ".png") ?? "https://cdn.discordapp.com/embed/avatars/5.png"}
            width={64}
            height={64}
            alt="Profile Picture"
            className="h-5 w-5 rounded-full"
          />
          <span className="hidden max-w-24 truncate text-sm sm:block">{session.user.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => signOut()}>
          <HiArrowRightStartOnRectangle />
          <span>Sign out</span>
        </DropdownMenuItem>
        {userMeQuery.data?.flags.includes("admin") ? (
          <Link href="/dashboard">
            <DropdownMenuItem>
              <HiAdjustmentsHorizontal />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </Link>
        ) : (
          ""
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
