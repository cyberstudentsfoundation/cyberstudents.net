"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { HiPause, HiPlay } from "react-icons/hi2";
import { Observer } from "tailwindcss-intersect";
import { cn } from "~/lib/utils";
import styles from "./marquee.module.css";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), options);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView] as const;
}

/** Starts the tailwindcss-intersect observer so `intersect:` classes in server components work. Renders nothing. */
export function IntersectStart() {
  useEffect(() => {
    Observer.start();
  }, []);
  return null;
}

/**
 * A figure like "5,200+" that counts up once when it scrolls into view. The server renders the final value, so the
 * number is right without JavaScript and with reduced motion.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = /^([^\d]*)([\d,]+)(.*)$/.exec(value);
  const target = match ? Number(match[2]!.replace(/,/g, "")) : NaN;
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  // Start once, the first time the number scrolls into view.
  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  // The count runs to the end even if the number scrolls out of view again. (It used to be cancelled when `inView`
  // flipped back to false, which froze it on whatever value it had reached, such as "$1,848+".)
  useEffect(() => {
    if (!match || reduced || !started) return;
    const start = performance.now();
    const duration = 1200;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(t >= 1 ? null : Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      setShown(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, reduced]);

  const text = match && shown !== null ? `${match[1]}${shown.toLocaleString("en-US")}${match[3]}` : value;
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {text}
    </span>
  );
}

/** Horizontally scrolling row with a pause button. Becomes a plain scroll row with reduced motion. */
export function Marquee({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={cn("relative", className)}>
      <div
        className={styles.viewport}
        data-paused={paused || undefined}
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        <div className={styles.track}>
          <div className={styles.group}>{children}</div>
          <div className={cn(styles.group, styles.duplicate)} aria-hidden="true" inert>
            {children}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute right-4 -bottom-12 flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-gray-200 transition-colors hover:bg-white/15 motion-reduce:hidden sm:right-8 md:right-10 xl:right-20"
        aria-label={paused ? "Play the scrolling gallery" : "Pause the scrolling gallery"}
      >
        {paused ? <HiPlay className="size-4" /> : <HiPause className="size-4" />}
      </button>
    </div>
  );
}

/**
 * Muted looping clip that plays only while on screen. With reduced motion it shows the poster and a play button.
 */
export function AutoVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLVideoElement>({ threshold: 0.35 });
  const reduced = usePrefersReducedMotion();
  const [userPlay, setUserPlay] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const shouldPlay = inView && (!reduced || userPlay);
    if (shouldPlay) {
      if (video.preload !== "auto") video.preload = "auto";
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView, reduced, userPlay, ref]);

  return (
    <div className="relative h-full w-full">
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        className={className}
      />
      {reduced && !userPlay && (
        <button
          type="button"
          onClick={() => setUserPlay(true)}
          className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-black/60 text-white"
          aria-label={`Play clip: ${label}`}
        >
          <HiPlay className="size-6" />
        </button>
      )}
    </div>
  );
}

/**
 * Slide indicators. Inactive slides are small dots; the active one widens into a bar that fills over `duration` and
 * then calls `onDone`, which the parent uses to advance. Pausing freezes the fill where it is. With `labels`, the
 * indicators are text tabs with the bar underneath instead.
 */
export function ProgressDots({
  count,
  active,
  onSelect,
  onDone,
  duration,
  paused,
  labels,
  tone = "light",
  label,
  className,
}: {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  onDone: () => void;
  duration: number;
  paused: boolean;
  labels?: string[];
  tone?: "light" | "dark";
  label: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const light = tone === "light";
  const track = light ? "bg-slate-300" : "bg-white/20";
  const fill = light ? "bg-cyan-700" : "bg-cyan-300";

  // The fill is driven by requestAnimationFrame rather than a CSS animation so that it always restarts from zero when
  // the active slide changes, pauses exactly where it is, and never fires its end early.
  const fillRef = useRef<HTMLSpanElement>(null);
  const pausedRef = useRef(paused);
  const doneRef = useRef(onDone);
  pausedRef.current = paused;
  doneRef.current = onDone;

  useEffect(() => {
    const el = fillRef.current;
    if (reduced) {
      if (el) el.style.transform = "scaleX(1)";
      return;
    }
    let elapsed = 0;
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      if (!pausedRef.current) elapsed += dt;
      const p = Math.min(1, elapsed / duration);
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;
      if (p >= 1) {
        doneRef.current();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced, duration]);

  const bar = (i: number) =>
    i === active ? (
      <span
        ref={fillRef}
        aria-hidden="true"
        className={cn("absolute inset-0 origin-left rounded-full", fill)}
        style={{ transform: "scaleX(0)" }}
      />
    ) : null;

  if (labels) {
    return (
      <div role="tablist" aria-label={label} className={cn("flex items-center gap-2", className)}>
        {labels.map((text, i) => (
          <button
            key={text}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => onSelect(i)}
            className={cn(
              "group relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
              i === active
                ? light
                  ? "bg-slate-900 text-white"
                  : "bg-white text-gray-950"
                : light
                  ? "text-slate-600 hover:bg-slate-900/5"
                  : "text-gray-300 hover:bg-white/10",
            )}
          >
            {text}
            <span
              aria-hidden="true"
              className={cn(
                "absolute right-3 -bottom-2 left-3 h-0.5 overflow-hidden rounded-full transition-opacity duration-300",
                i === active ? cn("opacity-100", track) : "opacity-0",
              )}
            >
              {bar(i)}
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div role="group" aria-label={label} className={cn("flex items-center gap-1.5", className)}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1} of ${count}`}
          aria-current={i === active ? "true" : undefined}
          className="flex h-6 items-center"
        >
          <span
            className={cn(
              "relative block h-2 overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-out",
              track,
              i === active ? "w-10" : "w-2 hover:bg-slate-400",
            )}
          >
            {bar(i)}
          </span>
        </button>
      ))}
    </div>
  );
}

/**
 * Cross-fading slides with labelled tabs that advance on their own (used for the Advent calendars). Slides are
 * stacked in one grid cell so the height never jumps. Pauses while hovered, focused or off screen.
 */
export function TabbedSlides({
  slides,
  // 5 s per slide (was 6.5 s, and 10 s before that).
  duration = 5000,
  label,
  tone = "light",
}: {
  slides: { label: string; content: ReactNode }[];
  duration?: number;
  label: string;
  tone?: "light" | "dark";
}) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const paused = hover || !inView;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={() => setHover(false)}
    >
      {slides.length > 1 && (
        <ProgressDots
          count={slides.length}
          active={active}
          onSelect={setActive}
          onDone={() => setActive((a) => (a + 1) % slides.length)}
          duration={duration}
          paused={paused}
          labels={slides.map((s) => s.label)}
          tone={tone}
          label={label}
        />
      )}
      {/* The outgoing slide fades out quickly and the incoming one fades in a beat later, with no sideways movement.
          Overlapping them while both moved made two calendars (whose first days fall in different columns) visible
          at once, which read as the layout jumping. Children can animate in on `[data-active]`. */}
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)] overflow-x-clip">
        {slides.map((s, i) => (
          <div
            key={s.label}
            role="tabpanel"
            aria-hidden={i !== active}
            inert={i !== active}
            data-active={i === active || undefined}
            className={cn(
              "min-w-0 [grid-area:1/1] transition-opacity ease-out",
              i === active ? "opacity-100 delay-100 duration-300" : "pointer-events-none opacity-0 duration-150",
            )}
          >
            {s.content}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Horizontal row that scrolls with arrow buttons, swipe or trackpad. No visible scrollbar; edges fade. */
export function ScrollRow({
  children,
  label,
  className,
  listClassName,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  listClassName?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(update, []);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const btn =
    "absolute top-[30%] z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-stone-300 bg-white/90 text-stone-700 shadow-md transition-opacity hover:bg-white disabled:pointer-events-none disabled:opacity-0 sm:flex";

  return (
    <div className={cn("relative", className)}>
      <ul
        ref={ref}
        aria-label={label}
        onScroll={update}
        className={cn(
          "-mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden",
          listClassName,
        )}
      >
        {children}
      </ul>
      <button type="button" aria-label="Scroll back" disabled={edges.start} onClick={() => scroll(-1)} className={cn(btn, "-left-5")}>
        <span aria-hidden="true">&larr;</span>
      </button>
      <button type="button" aria-label="Scroll forward" disabled={edges.end} onClick={() => scroll(1)} className={cn(btn, "-right-5")}>
        <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
}
