"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Edit from "./edit";
import { HiArrowsUpDown, HiPencilSquare } from "react-icons/hi2";
import { Button } from "~/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { z } from "zod";

dayjs.extend(relativeTime);

export type WriteUp = inferRouterOutputs<AppRouter>["dashboard"]["getWriteUps"][0];

function headerWithSorting(name: string) {
  return function HeaderWithSorting({ column }: { column: Column<WriteUp> }) {
    return (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {name}
        <HiArrowsUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  };
}

export const columns: ColumnDef<WriteUp>[] = [
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
      const { publishDate } = row.original;

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
      const { challengeId } = row.original;

      if (!challengeId) return <span className="text-orange-400">No linked challenge</span>;
    },
  },
  {
    accessorKey: "title",
    header: headerWithSorting("Title"),
  },
  {
    accessorKey: "publishDate",
    header: headerWithSorting("Scheduled publish at"),
    cell: ({ row }) => dayjs(row.original.publishDate).format("MM/DD/YY h:mm a"),
  },
  {
    accessorKey: "authorPreferredName",
    header: headerWithSorting("Author preferred name"),
  },
  {
    accessorKey: "authorMetadata",
    header: headerWithSorting("Author metadata"),
    cell: ({ row }) => {
      const { authorMetadata } = row.original;

      const schema = z.object({
        github: z.string().optional(),
        linkedin: z.string().optional(),
      });

      const parsed = schema.safeParse(authorMetadata);

      if (!parsed.success) {
        return <span className="text-red-400">Invalid metadata</span>;
      }

      const { github, linkedin } = parsed.data;

      if (!github && !linkedin) {
        return <span>No metadata</span>;
      }

      return (
        <span>
          <HoverCard>
            <HoverCardTrigger tabIndex={0} className="block max-w-64 truncate underline decoration-dotted">
              {[github && "GitHub", linkedin && "LinkedIn"].filter(Boolean).join(", ")}
            </HoverCardTrigger>
            <HoverCardContent className="border-gray-800 bg-gray-900">
              <ul className="ml-4 list-disc space-y-2">
                {github && (
                  <li>
                    <a href={github} target="_blank" rel="noopener noreferrer">
                      {github}
                    </a>
                  </li>
                )}
                {linkedin && (
                  <li>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer">
                      {linkedin}
                    </a>
                  </li>
                )}
              </ul>
            </HoverCardContent>
          </HoverCard>
        </span>
      );
    },
  },
  {
    accessorKey: "content",
    header: headerWithSorting("Content"),
    cell: ({ row }) => {
      const { content } = row.original;

      return (
        <span>
          <HoverCard>
            <HoverCardTrigger tabIndex={0} className="block max-w-64 truncate underline decoration-dotted">
              {content}
            </HoverCardTrigger>
            <HoverCardContent className="max-h-96 overflow-auto break-words border-gray-800 bg-gray-900">
              {content}
            </HoverCardContent>
          </HoverCard>
        </span>
      );
    },
  },
  {
    accessorKey: "originalURL",
    header: headerWithSorting("Original URL"),
    cell: ({ row }) => {
      const { originalURL } = row.original;

      if (!originalURL) return <span>No original URL</span>;

      return (
        <a href={originalURL} target="_blank" rel="noopener noreferrer" className="block max-w-64 truncate underline">
          {originalURL}
        </a>
      );
    },
  },
  {
    accessorKey: "contentCreatedAt",
    header: headerWithSorting("Content created at"),
    cell: ({ row }) => dayjs(row.original.contentCreatedAt).format("MM/DD/YY h:mm a"),
  },
  {
    accessorKey: "contentUpdatedAt",
    header: headerWithSorting("Content updated at"),
    cell: ({ row }) => dayjs(row.original.contentUpdatedAt).format("MM/DD/YY h:mm a"),
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
    id: "linkedChallengeEvent",
    accessorFn: (row) => row.challenge?.eventName ?? "\u200bNo linked challenge",
    header: headerWithSorting("Event"),
  },
  {
    id: "linkedChallenge",
    accessorFn: (row) => row.challenge?.title ?? "\u200bNo linked challenge",
    header: headerWithSorting("Linked challenge"),
  },
  {
    id: "linkedChallengeAuthorName",
    accessorFn: (row) => row.challenge?.author.name ?? "\u200bNo linked challenge",
    header: headerWithSorting("Challenge author"),
    cell: ({ row }) => {
      if (!row.original.challenge) return "No linked challenge";

      const { name, image } = row.original.challenge.author;

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
    accessorKey: "id",
    header: headerWithSorting("ID"),
  },
];
