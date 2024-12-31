"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import View from "./view";
import { HiArrowsUpDown } from "react-icons/hi2";
import { Button } from "~/components/ui/button";

dayjs.extend(relativeTime);

export type VerificationPreview = inferRouterOutputs<AppRouter>["dashboard"]["getVerifications"][0];

function headerWithSorting(name: string) {
  return function HeaderWithSorting({ column }: { column: Column<VerificationPreview> }) {
    return (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {name}
        <HiArrowsUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  };
}

export const columns: ColumnDef<VerificationPreview>[] = [
  {
    id: "view",
    header: () => (
      <Button variant="ghost" disabled>
        View
      </Button>
    ),
    cell: ({ row }) => {
      return <View row={row} />;
    },
  },
  {
    id: "user",
    accessorFn: (row) => row.user.name,
    header: headerWithSorting("User"),
    cell: ({ row }) => {
      const { name, image } = row.original.user;

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
    accessorKey: "createdAt",
    header: headerWithSorting("Created at"),
    cell: ({ row }) => dayjs(row.original.createdAt).format("MM/DD/YY h:mm a"),
  },
  {
    accessorKey: "id",
    header: headerWithSorting("ID"),
  },
];
