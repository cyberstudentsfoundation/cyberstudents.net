import Link from "next/link";
// import { usePathname } from "next/navigation";

export default function NavbarStatus() {
  // const pathname = usePathname();

  // if (pathname.startsWith("/ctf")) return null;

  // Hours/days/weeks until August 8, 9 pm UTC
  const targetDate = new Date("2025-08-08T21:00:00Z");
  const now = new Date();
  const timeDiff = targetDate.getTime() - now.getTime();

  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = hours >= 24 ? Math.floor(hours / 24) : NaN;
  const weeks = days >= 7 ? Math.floor(days / 7) : NaN;

  return (
    <Link
      href="/ctf"
      className="group ml-2 hidden items-center gap-1.5 rounded-full bg-green-500/30 py-1 pr-2 pl-1.5 text-xs decoration-gray-200/75 underline-offset-2 transition-all hover:bg-green-500/40 hover:underline lg:flex"
    >
      <span className="relative flex size-3">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 group-hover:animate-ping" />
        <span className="relative inline-flex size-3 rounded-full bg-green-500" />
      </span>
      <span>
        CSD CTF &rsquo;25{" "}
        {timeDiff < -1.728e8
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
