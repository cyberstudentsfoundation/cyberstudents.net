"use client";

import { useCallback, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

const targetText = "CSD CTF";

function CyberFlickerText({ setStartupComplete }: { setStartupComplete: (complete: boolean) => void }) {
  const [visibleStates, setVisibleStates] = useState<boolean[]>(Array(targetText.length).fill(false));

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    targetText.split("").forEach((_, idx) => {
      const flickerCount = Math.floor(Math.random() * 5) + 1; // 1 to 5 flickers
      let currentFlicker = 0;

      const flicker = () => {
        if (currentFlicker >= flickerCount) {
          setVisibleStates((prev) => {
            const next = [...prev];
            next[idx] = true;
            return next;
          });

          // if (idx === targetText.length - 1) {
          //   setTimeout(() => setStartupComplete(true), 1);
          // }

          return;
        }

        if (currentFlicker === 2) setStartupComplete(true);

        setVisibleStates((prev) => {
          const next = [...prev];
          next[idx] = !next[idx];
          return next;
        });

        currentFlicker += 1;
        const timeout = setTimeout(flicker, 80 + Math.random() * 100);
        timeouts.push(timeout);
      };

      const startTimeout = setTimeout(flicker, idx * 150);
      timeouts.push(startTimeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [setStartupComplete]);

  return (
    <div className="font-mokoto flex h-12 flex-wrap justify-center text-5xl font-bold tracking-[0.15em] text-cyan-400 md:h-15 md:text-6xl">
      {targetText.split("").map((char, i) => (
        <span key={i} className={`animate-flicker inline-block min-w-[1ch] drop-shadow-md drop-shadow-cyan-300/50`}>
          {visibleStates[i] ? char : ""}
        </span>
      ))}
    </div>
  );
}

export default function HeaderText() {
  const [startupComplete, setStartupComplete] = useState(false);

  const handleStartupComplete = useCallback((complete: boolean) => {
    setStartupComplete(complete);
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      <CyberFlickerText setStartupComplete={handleStartupComplete} />

      <div className="mt-1 mb-8 h-9">
        <Transition
          show={startupComplete}
          className={`font-sans text-2xl font-light tracking-widest text-cyan-300 transition-all motion-safe:will-change-transform md:text-3xl`}
          enter="transition duration-[1.5s] transform"
          enterFrom="motion-safe:opacity-0 motion-safe:-translate-y-10 motion-safe:blur-xs"
          enterTo="motion-safe:opacity-100 motion-safe:translate-y-0 motion-safe:blur-none"
          as={"div"}
        >
          2025
        </Transition>
      </div>
    </div>
  );
}
