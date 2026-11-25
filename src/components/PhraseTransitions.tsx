"use client";

import { useEffect, useState } from "react";
import { HiArrowPath } from "react-icons/hi2";

const phraseList = ["students", "teachers", "professionals", "together"];
const LAST = phraseList.length - 1;

/**
 * "with students" → "with teachers" → "with professionals" → "together".
 *
 * Each phrase is a fresh element (keyed by index) whose CSS animation starts from opacity 0 with
 * `animation-fill-mode: both`, so the new word is never painted at full opacity before its entrance runs. The
 * previous version toggled Headless UI transitions on always-mounted spans, which let the incoming word flash for a
 * frame. The restart button is positioned outside the text flow so it does not push the centred line off centre.
 */
export default function PhraseTransitions() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= LAST) return;
    // 1.6 s per phrase (was 2.5 s). The entrance animation takes 0.7 s of that.
    const id = window.setTimeout(() => setCurrent((c) => c + 1), 1600);
    return () => window.clearTimeout(id);
  }, [current]);

  const done = current === LAST;

  return (
    <span className="relative inline-block whitespace-nowrap">
      {!done && <span>with&nbsp;</span>}
      <span
        key={current}
        className="inline-block text-cyan-300 motion-safe:animate-[phrase-in_700ms_cubic-bezier(0.2,0.7,0.2,1)_both]"
      >
        {phraseList[current]}
      </span>
      <button
        type="button"
        title="Restart animation"
        aria-label="Restart animation"
        disabled={!done}
        onClick={() => setCurrent(0)}
        className="absolute top-1/2 left-full ml-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full font-sans text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-white/10 focus-visible:opacity-100 disabled:pointer-events-none disabled:opacity-0!"
      >
        <HiArrowPath className="size-4" aria-hidden="true" />
      </button>
    </span>
  );
}
