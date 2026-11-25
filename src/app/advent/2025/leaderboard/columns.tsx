"use client";

import { ColumnDef } from "@tanstack/react-table";
import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { HiArrowsUpDown } from "react-icons/hi2";
import { Button } from "~/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { FaLinkedin } from "react-icons/fa6";

dayjs.extend(relativeTime);

export type LeaderboardEntry = inferRouterOutputs<AppRouter>["event"]["getLeaderboard"]["leaderboard"][0];

export const columns: ColumnDef<LeaderboardEntry>[] = [
  {
    accessorFn: (_row, index) => index + 1,
    header: "#",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { id, displayName, linkedin, image } = row.original;

      if (!linkedin?.startsWith("/") && !linkedin?.endsWith("/") && linkedin?.includes("/")) {
        console.warn(`Invalid LinkedIn username for user ${displayName} (${id}): ${linkedin}`);
      }

      const cleanedLinkedin = linkedin?.replaceAll("/", "").trim() ?? null;

      return (
        <div className="flex items-center gap-2 py-1">
          <Image
            src={image?.replace(".gif", ".png") ?? "https://cdn.discordapp.com/embed/avatars/5.png"}
            width={64}
            height={64}
            alt={`Profile Picture for ${displayName}`}
            className="h-6 w-6 rounded-full"
          />
          <span className="max-w-52 truncate text-gray-200">{displayName}</span>
          {cleanedLinkedin && (
            <a
              href={`https://linkedin.com/in/${cleanedLinkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0b65c3] transition-all hover:opacity-80"
              title="LinkedIn profiles are self-provided and not verified by CyberStudents."
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "points",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Points
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastSolve",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Last submission
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { lastSolve } = row.original;

      if (!lastSolve) return "--";

      return (
        <span>
          <span>{dayjs(lastSolve.getTime()).format("M/DD h:mm a")}</span>
          {/* Add back for next event */}
          {/* <span className="text-gray-400">({dayjs().to(lastSolve.getTime())})</span> */}
        </span>
      );
    },
  },
  {
    accessorKey: "publishedChallengesCompletion",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Completion
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { completedChallenges, totalPublishedChallenges, publishedChallengesCompletion } = row.original;

      const challengesByDay: ((typeof completedChallenges)[0] | null)[] = [];

      for (let i = 0; i < 25; i++) {
        const challenge = completedChallenges.find(
          (c) =>
            parseInt(c.publishDate.toLocaleString("en-US", { timeZone: "America/New_York", day: "numeric" })) === i + 1,
        );

        if (challenge) {
          challengesByDay.push(challenge);
        } else {
          challengesByDay.push(null);
        }
      }

      return (
        <span>
          <HoverCard>
            <HoverCardTrigger tabIndex={0}>
              <span>
                <span className="border-b-2 border-dotted border-gray-300">
                  {completedChallenges.length} / {totalPublishedChallenges}
                </span>{" "}
                <span className="text-gray-400">({(publishedChallengesCompletion * 100).toFixed(2)}%)</span>
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="border-gray-800 bg-gray-900">
              <div className="grid grid-cols-7 grid-rows-4 place-items-center gap-1">
                {challengesByDay.map((day, index) => (
                  <div key={index} className={`w-[2ch] text-center ${day ? "text-green-400" : "text-gray-500"}`}>
                    {index + 1}
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
        </span>
      );
    },
  },
  {
    accessorKey: "accuracy",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Accuracy
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { accuracy } = row.original;

      if (isNaN(accuracy)) return "--";

      return <span>{(accuracy * 100).toFixed(2)}%</span>;
    },
  },
  {
    accessorKey: "divisions",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Divisions
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { flags } = row.original;

      return (
        <span>
          {flags.includes("ms_hs_college_eligible")
            ? flags.includes("hs_eligible")
              ? "High School, Student, Open"
              : "Student, Open"
            : "Open"}
        </span>
      );
    },
  },
];
