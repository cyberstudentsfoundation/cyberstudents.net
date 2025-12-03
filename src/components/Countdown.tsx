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
  const timeZone = "America/New_York";
  const nowUtc = new Date();

  function getPartsForTZ(
    d: Date,
    tz = timeZone,
  ): { year: number; month: number; day: number; hour: number; minute: number; second: number } {
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    type Parts = {
      year: string;
      month: string;
      day: string;
      hour: string;
      minute: string;
      second: string;
    };

    const allowed: Array<keyof Parts> = ["year", "month", "day", "hour", "minute", "second"];

    const parts = dtf.formatToParts(d).reduce((acc: Partial<Parts>, p: Intl.DateTimeFormatPart) => {
      const key = p.type as keyof Parts;
      if (allowed.includes(key)) acc[key] = p.value;
      return acc;
    }, {} as Partial<Parts>);

    return {
      year: Number(parts.year ?? "0"),
      month: Number(parts.month ?? "0"),
      day: Number(parts.day ?? "0"),
      hour: Number(parts.hour ?? "0"),
      minute: Number(parts.minute ?? "0"),
      second: Number(parts.second ?? "0"),
    };
  }

  function getOffsetMinutes(d: Date, tz = timeZone): number {
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    type Parts = {
      year: string;
      month: string;
      day: string;
      hour: string;
      minute: string;
      second: string;
    };

    const allowed: Array<keyof Parts> = ["year", "month", "day", "hour", "minute", "second"];

    const parts = dtf.formatToParts(d).reduce((acc: Partial<Parts>, p: Intl.DateTimeFormatPart) => {
      const key = p.type as keyof Parts;
      if (allowed.includes(key)) acc[key] = p.value;
      return acc;
    }, {} as Partial<Parts>);

    const asUTC = Date.UTC(
      Number(parts.year ?? "0"),
      Number(parts.month ?? "1") - 1,
      Number(parts.day ?? "1"),
      Number(parts.hour ?? "0"),
      Number(parts.minute ?? "0"),
      Number(parts.second ?? "0"),
    );

    return (asUTC - d.getTime()) / 60000;
  }

  function getEpochForZoned(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute = 0,
    second = 0,
    tz = timeZone,
  ) {
    const naiveUTC = Date.UTC(year, month - 1, day, hour, minute, second);
    const offset = getOffsetMinutes(new Date(naiveUTC), tz);
    return naiveUTC - offset * 60_000;
  }

  // Compute a stable numeric target timestamp (ms since epoch). Do not mutate the `date` prop.
  const dateKey = date === "next-challenge" ? "next-challenge" : date instanceof Date ? date.getTime() : String(date);

  const targetTimestamp = (() => {
    // compute once per render call but only depend on `dateKey` via useMemo-like behavior below
    // For clarity we compute here but avoid mutating props and avoid using values that change each render
    return ((): number => {
      if (date === "next-challenge") {
        const nowForCalc = new Date();
        const nowPartsLocal = getPartsForTZ(nowForCalc, timeZone);
        const pastLastChallengeLocal = nowForCalc.getTime() >= getEpochForZoned(2025, 12, 25, 20, 0, 0, timeZone);
        if (pastLastChallengeLocal) {
          return new Date("2026-01-01T04:59:00Z").getTime();
        }
        if (nowPartsLocal.hour >= 20) {
          return getEpochForZoned(nowPartsLocal.year, nowPartsLocal.month, nowPartsLocal.day + 1, 20, 0, 0, timeZone);
        }
        return getEpochForZoned(nowPartsLocal.year, nowPartsLocal.month, nowPartsLocal.day, 20, 0, 0, timeZone);
      }

      // If `date` is a Date instance, return its epoch; otherwise treat as invalid and return 0.
      return date instanceof Date ? date.getTime() : 0;
    })();
  })();

  const daysNeedToBeShown = targetTimestamp - Date.now() >= 8.64e7;

  useEffect(() => {
    // Initialize and update every second, computing remaining time from `targetTimestamp`.
    setTimeLeft(Math.max(0, targetTimestamp - Date.now()));

    const interval = setInterval(() => {
      const remaining = Math.max(0, targetTimestamp - Date.now());
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return (
    <div
      className={`flex items-center font-mono ${variant === "small" ? "gap-2 text-xl" : "gap-1 px-2 2xl:gap-3 2xl:px-3 2xl:text-2xl"}`}
    >
      {daysNeedToBeShown ? (
        <div
          className={`rounded-lg p-2 text-center ${variant === "small" ? "w-14 bg-gray-800" : "w-12 bg-gray-800/50 backdrop-blur-sm 2xl:w-14"}`}
        >
          {`${Math.floor(timeLeft / 8.64e7)}`.padStart(2, "0")}
          <div className="font-sans text-sm text-gray-400">days</div>
        </div>
      ) : null}
      <div
        className={`rounded-lg p-2 text-center ${variant === "small" ? "w-14 bg-gray-800" : "w-12 bg-gray-800/50 backdrop-blur-sm 2xl:w-14"}`}
      >
        {`${Math.floor((timeLeft % 8.64e7) / 3.6e6)}`.padStart(2, "0")}
        <div className="font-sans text-sm text-gray-400">hours</div>
      </div>
      <div
        className={`rounded-lg p-2 text-center ${variant === "small" ? "w-14 bg-gray-800" : "w-12 bg-gray-800/50 backdrop-blur-sm 2xl:w-14"}`}
      >
        {`${Math.floor((timeLeft % 3.6e6) / 60_000)}`.padStart(2, "0")}
        <div className="font-sans text-sm text-gray-400">mins</div>
      </div>
      {!daysNeedToBeShown || variant !== "normal" ? (
        <div
          className={`rounded-lg p-2 text-center ${variant === "small" ? "w-14 bg-gray-800" : "w-12 bg-gray-800/50 backdrop-blur-sm 2xl:w-14"}`}
        >
          {`${Math.floor((timeLeft % 60_000) / 1000)}`.padStart(2, "0")}
          <div className="font-sans text-sm text-gray-400">secs</div>
        </div>
      ) : null}
    </div>
  );
}
