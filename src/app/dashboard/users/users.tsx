"use client";

import type { Session } from "next-auth";
import { api } from "~/trpc/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function WriteUps({ session }: { session: Session | null }) {
  const getUsersQuery = api.dashboard.getUsers.useQuery();

  return (
    <div className="mx-4 pt-8 lg:mr-12 xl:mr-20">
      <h1 className="mb-2 text-2xl font-bold">Users</h1>
      <p className="mb-1 text-sm text-gray-400">
        <span className="underline decoration-dotted">Dotted underlined text</span> can be hovered over (or pressed on
        mobile) to reveal more information.
      </p>
      <p className="text-sm text-gray-400">All times are in your local time zone.</p>
      <p className="mb-1 text-sm text-amber-400">This page contains account tokens and other sensitive information.</p>
      {getUsersQuery.data ? (
        <DataTable columns={columns} data={getUsersQuery.data} session={session} />
      ) : (
        <div className="mt-4 text-gray-400">Loading...</div>
      )}
    </div>
  );
}
