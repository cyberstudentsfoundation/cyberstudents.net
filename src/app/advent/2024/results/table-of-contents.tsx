"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "final-leaderboard-high-school-college-division", title: "Final leaderboard: High School/College Division" },
  { id: "final-leaderboard-open-write-up-division", title: "Final leaderboard: Open - Write-Up Division" },
  { id: "format", title: "Format" },
  { id: "write-ups", title: "Write-ups" },
  { id: "player-demographics", title: "Player demographics" },
  { id: "challenge-statistics", title: "Challenge statistics" },
];

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(-1);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    function handleHashChange() {
      setActiveSection(window.location.hash.replace("#", ""));

      const randomNum = Math.random();
      setIsNavigating(randomNum);

      timeouts.push(
        setTimeout(() => {
          setIsNavigating((newIsNavigating) => (newIsNavigating === randomNum ? -1 : newIsNavigating));
        }, 1000),
      );
    }

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);

      for (const timeout of timeouts) {
        clearTimeout(timeout);
      }
    };
  }, []);

  useEffect(() => {
    if (isNavigating !== -1) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [isNavigating]);

  return (
    <div className="sticky top-20 hidden h-full lg:block">
      <h1 className="mb-2 font-semibold text-gray-200">Table of contents</h1>
      <div className="border-l border-gray-600">
        <ul className="space-y-2 font-medium text-gray-400">
          {SECTIONS.map(({ id, title }) => (
            <li
              key={id}
              className={`pl-4 hover:text-gray-200 ${activeSection === id ? "-ml-px border-l-2 border-cyan-300 font-semibold text-gray-200" : ""}`}
            >
              <a href={`#${id}`} className="transition-colors" onClick={() => setIsNavigating(2)}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
