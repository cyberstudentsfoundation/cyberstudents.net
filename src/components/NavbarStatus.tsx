import React from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
// import { usePathname } from "next/navigation";

export default function NavbarStatus({ className }: { className?: string }) {
  // const pathname = usePathname();

  // if (pathname.startsWith("/ctf")) return null;

  const isDelayed = false; // true or false for delayed status

  // Hours/days/weeks until December 2, 1 am UTC
  const targetDate = new Date("2025-12-02T01:00:00Z");
  const now = new Date();
  const timeDiff = targetDate.getTime() - now.getTime();

  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = hours >= 24 ? Math.floor(hours / 24) : NaN;
  const weeks = days >= 7 ? Math.floor(days / 7) : NaN;

  return (
    <Link
      href="/advent/2025"
      className={cn(
        "group ml-2 hidden items-center gap-1.5 rounded-full py-1 pr-2 pl-1.5 text-xs decoration-gray-200/75 underline-offset-2 transition-all hover:underline lg:flex",
        isDelayed ? "bg-red-500/30 hover:bg-red-500/40" : "bg-green-500/30 hover:bg-green-500/40",
        className,
      )}
    >
      <span className="relative flex size-3">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 group-hover:animate-ping ${
            isDelayed ? "bg-red-400" : "bg-green-400"
          }`}
        />
        <span className={`relative inline-flex size-3 rounded-full ${isDelayed ? "bg-red-500" : "bg-green-500"}`} />
      </span>
      <span>
        Advent of CTF &rsquo;25{" "}
        {isDelayed
          ? "is delayed"
          : timeDiff < -2606340000 // 30 days, 3 hours, 59 minutes in ms - change per event
            ? "has ended"
            : timeDiff < 0
              ? "is live"
              : timeDiff < 3.6e6
                ? "starts in <1h"
                : `starts in ${weeks || days || hours}${weeks ? "w" : days ? "d" : "h"}`}
      </span>
    </Link>
  );
}
