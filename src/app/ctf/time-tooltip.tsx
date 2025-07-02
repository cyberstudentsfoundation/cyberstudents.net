"use client";

import { useEffect, useState } from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "~/components/ui/tooltip";
import { HiCalendar } from "react-icons/hi2";
import dayjs from "dayjs";
import { Separator } from "~/components/ui/separator";

export default function TimeTooltip() {
  const [localTime, setLocalTime] = useState("Fri, August 8 (5:00 pm) – Sat, August 10 (5:00 pm) EDT");
  const [timezoneOffsetHrs, setTimezoneOffsetHrs] = useState(-4); // change between EST/EDT
  const [localDays, setLocalDays] = useState("August 8 – 10");

  useEffect(() => {
    setTimezoneOffsetHrs(new Date().getTimezoneOffset() / -60);

    const startTime = dayjs("2025-08-08T17:00:00-04:00");
    const endTime = dayjs("2025-08-09T17:00:00-04:00");

    const formattedStart = startTime.format("ddd, MMMM D (h:mm a)");
    const formattedEnd = endTime.format("ddd, MMMM D (h:mm a)");
    setLocalTime(`${formattedStart} – ${formattedEnd}`);

    if (startTime.month() === endTime.month()) {
      setLocalDays(`${startTime.format("MMMM D")} – ${endTime.format("D")}`);
    } else {
      setLocalDays(`${startTime.format("MMMM D")} – ${endTime.format("MMMM D")}`);
    }
  }, []);

  return (
    <div className="mb-8">
      <div className="grid items-start justify-center gap-8">
        <div className="group relative">
          <div className="animate-tilt absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 opacity-50 blur transition duration-500 group-hover:opacity-100 group-hover:duration-200" />
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative flex items-center rounded-full bg-gray-950 px-4 py-2 leading-none ring ring-cyan-900">
                  <span className="flex items-center space-x-2">
                    <HiCalendar className="h-4 w-4 -translate-y-px text-cyan-300" />
                    <span className="text-sm text-gray-100">{localDays}</span>
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="flex gap-2 px-4 py-2 text-base">
                <span>{localTime}</span>
                <Separator orientation="vertical" className="mx-0.5 my-0.5 h-auto bg-gray-400!" />
                <span className="font-mono font-medium text-gray-600">
                  UTC{timezoneOffsetHrs >= 0 ? "+" : ""}
                  {timezoneOffsetHrs}
                </span>
                <span className="mb-0.75 self-end font-mono text-xs font-medium text-gray-600 uppercase">Local</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
