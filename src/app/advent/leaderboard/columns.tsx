"use client";

import { ColumnDef } from "@tanstack/react-table";
import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { HiArrowsUpDown } from "react-icons/hi2";
import { Button } from "~/components/ui/button";

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
      const { name, image } = row.original;

      return (
        <div className="flex items-center gap-2 py-1">
          <Image
            src={image?.replace(".gif", ".png") ?? "https://cdn.discordapp.com/embed/avatars/5.png"}
            width={64}
            height={64}
            alt={`Profile Picture for ${name}`}
            className="h-6 w-6 rounded-full"
          />
          <span className="max-w-52 truncate text-gray-200">{name}</span>
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
          <span>{dayjs(lastSolve.getTime()).format("M/DD h:mm a")}</span>{" "}
          <span className="text-gray-400">({dayjs().to(lastSolve.getTime())})</span>
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

      return (
        <span>
          <span>
            {completedChallenges} / {totalPublishedChallenges}
          </span>{" "}
          <span className="text-gray-400">({(publishedChallengesCompletion * 100).toFixed(2)}%)</span>
        </span>
      );
    },
  },
  {
    accessorKey: "accuracy",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Accuracy (not considered)
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

      return <span>{flags.includes("ms_hs_college_eligible") ? "MS/HS/College, Open" : "Open"}</span>;
    },
  },
];
