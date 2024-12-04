"use client";

import { useState } from "react";
import type { Session } from "next-auth";
import { api } from "~/trpc/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Challenges({ session }: { session: Session | null }) {
  const getChallengesQuery = api.dashboard.getChallenges.useQuery();
  const getEventsQuery = api.dashboard.getEvents.useQuery();

  return (
    <div>
      {getChallengesQuery.data ? (
        <div>
          <DataTable columns={columns} data={getChallengesQuery.data} session={session} />
        </div>
      ) : (
        <div className="my-10 flex items-center justify-center text-gray-400">Loading...</div>
      )}
    </div>
  );
}
