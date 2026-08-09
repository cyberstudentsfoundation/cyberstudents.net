import { Gamepad2, MessagesSquare, Mic2, Presentation, Sparkles, UsersRound } from "lucide-react";

import styles from "~/app/home-talks-gallery.module.css";
import { cn } from "~/lib/utils";

const galleryItems = [
  { label: "InfoSec Growth Session", icon: Presentation, tint: "text-cyan-200" },
  { label: "Community webinar", icon: Mic2, tint: "text-violet-200" },
  { label: "Peer workshop", icon: UsersRound, tint: "text-cyan-200" },
  { label: "Live Q&A", icon: MessagesSquare, tint: "text-violet-200" },
  { label: "Game night", icon: Gamepad2, tint: "text-cyan-200" },
  { label: "Seasonal event", icon: Sparkles, tint: "text-violet-200" },
] as const;

function GalleryGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-label={duplicate ? undefined : "Talk and community event image gallery"}
      aria-hidden={duplicate || undefined}
      className={cn(styles.group, duplicate && styles.duplicate)}
    >
      {galleryItems.map((item) => {
        const Icon = item.icon;

        return (
          <li
            key={item.label}
            role="img"
            aria-label={duplicate ? undefined : `${item.label} screenshot placeholder`}
            data-screenshot-slot={duplicate ? undefined : item.label}
            className="relative aspect-video w-80 shrink-0 overflow-hidden rounded-2xl border border-white/12 bg-[#0a111c] shadow-xl shadow-black/20 sm:w-[27rem] lg:w-[30rem]"
          >
            <div className="flex h-10 items-center gap-1.5 border-b border-white/8 bg-white/[0.025] px-4">
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
              <span className="ml-3 h-4 w-28 rounded-full bg-white/[0.055]" />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-10 bottom-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:28px_28px]"
            />
            <div className="relative flex h-[calc(100%-2.5rem)] flex-col items-center justify-center px-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045]">
                <Icon className={cn("size-5", item.tint)} aria-hidden="true" />
              </div>
              <p className="mt-4 font-medium text-gray-200">{item.label}</p>
              <p className="mt-1 font-mono text-[0.68rem] tracking-[0.14em] text-gray-500 uppercase">Add event image</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function HomeTalksGallery() {
  return (
    <div className={styles.viewport}>
      <div className={styles.track}>
        <GalleryGroup />
        <GalleryGroup duplicate />
      </div>
    </div>
  );
}
