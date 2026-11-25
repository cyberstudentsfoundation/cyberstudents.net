import Link from "next/link";
import { HiExternalLink } from "react-icons/hi";
import { site } from "~/data/site";

/** Shown instead of the challenge browser when the challenge database can't be reached. */
export function ArchiveUnavailable({ year }: { year: 2024 | 2025 }) {
  return (
    <div className="mx-auto my-16 max-w-xl rounded-2xl border border-white/10 bg-gray-900/60 p-8 text-center">
      <h1 className="text-2xl font-bold text-white">The {year} challenges are taking a short break</h1>
      <p className="mt-4 leading-7 text-gray-300">
        Our challenge archive is temporarily unavailable while we move it to a new home. In the meantime, you can read
        every write-up, or try the challenges we&rsquo;ve published on the site.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <Link href="/write-ups" className="font-semibold text-cyan-300 underline underline-offset-4">
          Read the write-ups
        </Link>
        <Link href="/challenges" className="font-semibold text-cyan-300 underline underline-offset-4">
          Browse challenges
        </Link>
        <a
          href={site.repos.adventWriteUps}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-cyan-300 underline underline-offset-4"
        >
          Write-ups on GitHub
          <HiExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
