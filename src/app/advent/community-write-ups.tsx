import { HiArrowUpRight } from "react-icons/hi2";
import { writeUpsFor } from "~/data/writeups";

const dayFmt = new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: "America/New_York" });

/**
 * Links to write-ups and videos players published about one challenge (src/data/writeups.ts). Styled to match the
 * challenge panel it sits in. Renders nothing when there are none.
 */
export function CommunityWriteUps({
  year,
  title,
  publishDate,
}: {
  year: 2024 | 2025;
  title: string | null | undefined;
  publishDate: Date | string;
}) {
  const list = writeUpsFor(year, Number(dayFmt.format(new Date(publishDate))), title ?? undefined);
  if (list.length === 0) return null;
  return (
    <div className="mt-8 max-w-prose">
      <h2 className="mb-2 text-sm font-semibold text-gray-400">Community write-ups</h2>
      <ul className="space-y-2">
        {list.map((w) => (
          <li key={w.url}>
            <a
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-300 underline decoration-gray-500 underline-offset-2 transition-colors hover:text-gray-200 hover:decoration-gray-400"
            >
              <span>{w.title}</span>
              <HiArrowUpRight className="h-3 w-3 shrink-0 stroke-1" />
            </a>
            <span className="block text-sm text-gray-500">
              {w.kind === "video" ? "Video" : "Write-up"} by {w.author}
              {w.award && <> · {w.award}</>}
              {w.covers && <> · covers several challenges</>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
