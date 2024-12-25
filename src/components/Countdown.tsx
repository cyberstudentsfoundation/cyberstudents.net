"use client";

import { useEffect, useState } from "react";

export default function Countdown({
  date,
  variant = "normal",
}: {
  date: Date | "next-challenge";
  variant?: "small" | "normal";
}) {
  const [timeLeft, setTimeLeft] = useState(0);
  const now = new Date();
  const pastLastChallenge = now.getTime() >= new Date("2024-12-25T20:00:00Z").getTime();

  if (date === "next-challenge") {
    if (pastLastChallenge) {
      date = new Date("2025-01-01T04:59:00Z");
    } else if (now.getUTCHours() >= 20) {
      // Today or tomorrow's date at 8 pm UTC (3 pm EST)
      date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 20, 0, 0, 0));
    } else {
      date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 20, 0, 0, 0));
    }
  }

  useEffect(() => {
    const now = new Date();
    setTimeLeft(date.getTime() - now.getTime());

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className={`flex items-center font-mono ${variant === "small" ? "gap-2 text-xl" : "gap-3 text-2xl"}`}>
      {pastLastChallenge ? (
        <div className="w-16 rounded-lg bg-gray-800 p-3 text-center">
          {Math.floor(timeLeft / 8.64e7)}
          <div className="font-sans text-sm text-gray-400">days</div>
        </div>
      ) : null}
      <div className="w-16 rounded-lg bg-gray-800 p-3 text-center">
        {`${Math.floor((timeLeft % 8.64e7) / 3.6e6)}`.padStart(2, "0")}
        <div className="font-sans text-sm text-gray-400">hours</div>
      </div>
      <div className="w-16 rounded-lg bg-gray-800 p-3 text-center">
        {`${Math.floor((timeLeft % 3.6e6) / 60_000)}`.padStart(2, "0")}
        <div className="font-sans text-sm text-gray-400">mins</div>
      </div>
      {!pastLastChallenge ? (
        <div className="w-16 rounded-lg bg-gray-800 p-3 text-center">
          {`${Math.floor((timeLeft % 60_000) / 1000)}`.padStart(2, "0")}
          <div className="font-sans text-sm text-gray-400">secs</div>
        </div>
      ) : null}
    </div>
  );
}
