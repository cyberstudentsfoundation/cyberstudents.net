"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Edit from "./edit";
import { HiArrowsUpDown } from "react-icons/hi2";
import { Button } from "~/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";

dayjs.extend(relativeTime);

export type Challenge = inferRouterOutputs<AppRouter>["dashboard"]["getChallenges"][0];

function headerWithSorting(name: string) {
  return function HeaderWithSorting({ column }: { column: Column<Challenge> }) {
    return (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {name}
        <HiArrowsUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  };
}

export const columns: ColumnDef<Challenge>[] = [
  {
    id: "edit",
    header: () => (
      <Button variant="ghost" disabled>
        Edit
      </Button>
    ),
    cell: ({ row }) => {
      return <Edit row={row} textButton={false} />;
    },
  },
  {
    id: "status",
    header: headerWithSorting("Status"),
    cell: ({ row }) => {
      const { publishDate, submissionsEnabled } = row.original;

      if (!submissionsEnabled) return <span className="text-red-400">Submissions disabled</span>;

      if (publishDate.getTime() <= Date.now()) return <span className="text-green-400">Published</span>;

      if (publishDate.getTime() > Date.now())
        return <span className="text-yellow-400">Scheduled for {dayjs(publishDate).format("M/DD h:mm a")}</span>;

      return <span className="text-orange-400">Unpublished</span>;
    },
  },
  {
    id: "warnings",
    header: headerWithSorting("Warnings"),
    cell: ({ row }) => {
      const { globalFlags, globalRegexFlags, hints, category, points } = row.original;

      if (!globalFlags.length && !globalRegexFlags.length) return <span className="text-red-400">No flags</span>;

      if (hints.length < 2) return <span className="text-yellow-400">Insufficient hints</span>;

      if (
        ![
          "Web exploitation",
          "Cryptography",
          "Forensics",
          "Binary exploitation",
          "Reverse engineering",
          "OSINT",
          "Miscellaneous",
        ].includes(category)
      )
        return <span className="text-pink-400">Invalid category</span>;

      if (!points) return <span className="text-purple-400">0 points</span>;
    },
  },
  {
    id: "authorName",
    accessorFn: (row) => row.author.name,
    header: headerWithSorting("Author"),
    cell: ({ row }) => {
      const { name, image } = row.original.author;

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
    accessorKey: "title",
    header: headerWithSorting("Challenge title"),
  },
  {
    accessorKey: "category",
    header: headerWithSorting("Category"),
  },
  {
    accessorKey: "publishDate",
    header: headerWithSorting("Scheduled publish at"),
    cell: ({ row }) => dayjs(row.original.publishDate).format("MM/DD/YY h:mm a"),
  },
  {
    accessorKey: "points",
    header: headerWithSorting("Points"),
  },
  {
    accessorKey: "description",
    header: headerWithSorting("Description"),
    cell: ({ row }) => {
      const { description } = row.original;

      return (
        <span>
          <HoverCard>
            <HoverCardTrigger tabIndex={0} className="block max-w-64 truncate underline decoration-dotted">
              {description}
            </HoverCardTrigger>
            <HoverCardContent className="max-h-96 overflow-auto border-gray-800 bg-gray-900 break-words">
              {description}
            </HoverCardContent>
          </HoverCard>
        </span>
      );
    },
  },
  {
    accessorKey: "files",
    header: headerWithSorting("Files"),
    cell: ({ row }) => {
      const { files } = row.original;

      if (files.length === 0) return "0 files";

      return (
        <span>
          <HoverCard>
            <HoverCardTrigger tabIndex={0} className="underline decoration-dotted">
              {files.length} files
            </HoverCardTrigger>
            <HoverCardContent className="border-gray-800 bg-gray-900 break-words">
              <ul className="ml-4 list-disc space-y-2">
                {files.map((file, index) => (
                  <li key={index}>
                    <a href={file} download target="_blank" rel="noopener noreferrer" className="underline">
                      {file}
                    </a>
                  </li>
                ))}
              </ul>
            </HoverCardContent>
          </HoverCard>
        </span>
      );
    },
  },
  {
    accessorKey: "hints",
    header: headerWithSorting("Hints"),
    cell: ({ row }) => {
      const { hints } = row.original;

      if (hints.length === 0) return "0 hints";

      return (
        <span>
          <HoverCard>
            <HoverCardTrigger tabIndex={0} className="underline decoration-dotted">
              {hints.length} hints
            </HoverCardTrigger>
            <HoverCardContent className="flex max-h-96 flex-col gap-2 overflow-auto border-gray-800 bg-gray-900">
              {hints.map((hint) => (
                <div key={hint.id}>
                  <h3 className="mb-0.5 font-bold text-gray-400">{hint.title}</h3>
                  <p className="break-words">{hint.content}</p>
                </div>
              ))}
            </HoverCardContent>
          </HoverCard>
        </span>
      );
    },
  },
  {
    accessorKey: "globalFlags",
    header: headerWithSorting("Global flags"),
    cell: ({ row }) => {
      const { globalFlags } = row.original;

      if (globalFlags.length === 0) return "0 global flags";

      return (
        <span className="text-cyan-300">
          <HoverCard>
            <HoverCardTrigger tabIndex={0} className="max-w-64 truncate underline decoration-dotted">
              {globalFlags.length === 1 ? <code>{globalFlags}</code> : `${globalFlags.length} global flags`}
            </HoverCardTrigger>
            <HoverCardContent className="border-gray-800 bg-gray-900 break-words">
              <ul className="ml-4 list-disc space-y-2">
                {globalFlags.map((flag, index) => (
                  <li key={index}>
                    <code className="break-words">{flag}</code>
                  </li>
                ))}
              </ul>
            </HoverCardContent>
          </HoverCard>
        </span>
      );
    },
  },
  {
    accessorKey: "areGlobalFlagsCaseSensitive",
    header: headerWithSorting("Global flags case-sensitive?"),
    cell: ({ row }) => {
      const { areGlobalFlagsCaseSensitive } = row.original;

      return <span>{areGlobalFlagsCaseSensitive ? "Case-sensitive" : "Not case-sensitive"}</span>;
    },
  },
  {
    accessorKey: "globalRegexFlags",
    header: headerWithSorting("Global regex flags"),
    cell: ({ row }) => {
      const { globalRegexFlags } = row.original;

      if (globalRegexFlags.length === 0) return "0 regex global flags";

      return (
        <span className="text-orange-300">
          <HoverCard>
            <HoverCardTrigger tabIndex={0} className="max-w-64 truncate underline decoration-dotted">
              {globalRegexFlags.length === 1 ? (
                <code>{globalRegexFlags}</code>
              ) : (
                `${globalRegexFlags.length} global regex flags`
              )}
            </HoverCardTrigger>
            <HoverCardContent className="border-gray-800 bg-gray-900 break-words">
              <ul className="ml-4 list-disc space-y-2">
                {globalRegexFlags.map((flag, index) => (
                  <li key={index}>
                    <code>{flag}</code>
                  </li>
                ))}
              </ul>
            </HoverCardContent>
          </HoverCard>
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: headerWithSorting("Created at"),
    cell: ({ row }) => dayjs(row.original.createdAt).format("MM/DD/YY h:mm a"),
  },
  {
    accessorKey: "updatedAt",
    header: headerWithSorting("Updated at"),
    cell: ({ row }) => dayjs(row.original.updatedAt).format("MM/DD/YY h:mm a"),
  },
  {
    accessorKey: "submissionsEnabled",
    header: headerWithSorting("Submissions enabled?"),
    cell: ({ row }) => (row.original.submissionsEnabled ? "Yes" : "No"),
  },
  {
    accessorKey: "eventName",
    header: headerWithSorting("Event"),
  },
  {
    accessorKey: "id",
    header: headerWithSorting("ID"),
  },
];
