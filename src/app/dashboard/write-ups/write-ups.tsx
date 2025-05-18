"use client";

import { useState } from "react";
import type { Session } from "next-auth";
import { api } from "~/trpc/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function WriteUps({ session }: { session: Session | null }) {
  const getWriteUpsQuery = api.dashboard.getWriteUps.useQuery();
  const getEventsQuery = api.dashboard.getEvents.useQuery();

  return (
    <div className="mx-4 pt-8 lg:mr-12 xl:mr-20">
      <h1 className="mb-2 text-2xl font-bold">Write-ups</h1>
      <p className="mb-1 text-sm text-gray-400">
        <span className="underline decoration-dotted">Dotted underlined text</span> can be hovered over (or pressed on
        mobile) to reveal more information.
      </p>
      <p className="text-sm text-gray-400">All times are in your local time zone.</p>
      {getWriteUpsQuery.data ? (
        <DataTable columns={columns} data={getWriteUpsQuery.data} session={session} />
      ) : (
        <div className="mt-4 text-gray-400">Loading...</div>
      )}
    </div>
  );
}
