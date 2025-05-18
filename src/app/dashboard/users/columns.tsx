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

dayjs.extend(relativeTime);

export type User = inferRouterOutputs<AppRouter>["dashboard"]["getUsers"][0];

function headerWithSorting(name: string) {
  return function HeaderWithSorting({ column }: { column: Column<User> }) {
    return (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {name}
        <HiArrowsUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  };
}

export const columns: ColumnDef<User>[] = [
  {
    id: "edit",
    header: () => (
      <Button variant="ghost" disabled>
        Edit
      </Button>
    ),
    cell: ({ row, table }) => {
      return <Edit row={row} textButton={false} />;
    },
  },
  {
    id: "status",
    header: headerWithSorting("Status"),
    cell: ({ row }) => {
      const { flags } = row.original;

      if (flags.includes("admin")) {
        return <span className="text-blue-400">Admin</span>;
      }

      if (flags.includes("suspended")) {
        return <span className="text-red-400">Suspended</span>;
      }

      return <></>;
    },
  },
  {
    id: "name",
    accessorFn: (row) => row.name,
    header: headerWithSorting("Username"),
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
          <span className="text-gray-200">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "flags",
    header: headerWithSorting("Flags"),
    cell: ({ row }) => row.original.flags.join(", "),
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
    accessorKey: "email",
    header: headerWithSorting("Email"),
  },
  {
    accessorKey: "emailVerified",
    header: headerWithSorting("Email verified at"),
    cell: ({ row }) =>
      row.original.emailVerified ? dayjs(row.original.emailVerified).format("MM/DD/YY h:mm a") : "--",
  },
  {
    accessorKey: "preferredEmail",
    header: headerWithSorting("Preferred email"),
  },
  {
    accessorKey: "accounts",
    header: headerWithSorting("Accounts"),
    cell: ({ row }) => {
      const { accounts } = row.original;

      if (!accounts) return <span>No accounts</span>;

      return (
        <span>
          <HoverCard>
            <HoverCardTrigger tabIndex={0} className="block max-w-64 truncate underline decoration-dotted">
              {accounts.map((acc) => acc.provider).join(", ")}
            </HoverCardTrigger>
            <HoverCardContent className="overflow-auto border-gray-800 bg-gray-900">
              <ul className="ml-4 max-h-96 list-disc space-y-2">
                {accounts.map((acc) => (
                  <li key={`${acc.provider}:${acc.providerAccountId}`}>
                    <pre>{JSON.stringify(acc, null, 2)}</pre>
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
    accessorKey: "sessions",
    header: headerWithSorting("Sessions"),
    cell: ({ row }) => {
      const { sessions } = row.original;

      if (!sessions.length) return <span>0 sessions</span>;

      return (
        <span>
          <HoverCard>
            <HoverCardTrigger tabIndex={0} className="block max-w-64 truncate underline decoration-dotted">
              {sessions.length} sessions
            </HoverCardTrigger>
            <HoverCardContent className="overflow-auto border-gray-800 bg-gray-900">
              <ul className="ml-4 max-h-96 list-disc space-y-2">
                {sessions.map((session) => (
                  <li key={session.sessionToken}>
                    Created at: {dayjs(session.createdAt).format("MM/DD/YY h:mm a")}
                    <br />
                    Expires at: {dayjs(session.expires).format("MM/DD/YY h:mm a")}
                    <br />
                    Session token: <code>{session.sessionToken}</code>
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
    accessorKey: "note",
    header: headerWithSorting("Note"),
    cell: ({ row }) => {
      const { note } = row.original;

      if (!note) return <span></span>;

      return (
        <span>
          <HoverCard>
            <HoverCardTrigger tabIndex={0} className="block max-w-64 truncate underline decoration-dotted">
              {note}
            </HoverCardTrigger>
            <HoverCardContent className="border-gray-800 bg-gray-900">{note}</HoverCardContent>
          </HoverCard>
        </span>
      );
    },
  },
  {
    accessorKey: "id",
    header: headerWithSorting("ID"),
  },
];
