"use client";

import { useState } from "react";
import type { Session } from "next-auth";
import { api } from "~/trpc/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Challenges({ session }: { session: Session | null }) {
  const getChallengesQuery = api.dashboard.getChallenges.useQuery();
  const getEventsQuery = api.dashboard.getEvents.useQuery();

  async function refetchChallenges() {
    await getChallengesQuery.refetch();
  }

  return (
    <div className="mx-4 pt-8 lg:mr-12 xl:mr-20">
      <h1 className="mb-2 text-2xl font-bold">Challenges</h1>
      <p className="mb-1 text-sm text-gray-400">
        <span className="underline decoration-dotted">Dotted underlined text</span> can be hovered over (or pressed on
        mobile) to reveal more information.
      </p>
      <p className="text-sm text-gray-400">All times are in your local time zone.</p>
      <p className="text-red-400">
        MARKDOWN IS NOT SUPPORTED YET. PLEASE DON&apos;T USE MARKDOWN IN DESCRIPTIONS OR HINTS YET.
      </p>
      {getChallengesQuery.data ? (
        <DataTable columns={columns} data={getChallengesQuery.data} session={session} />
      ) : (
        <div className="my-10 flex items-center justify-center text-gray-400">Loading...</div>
      )}
    </div>
  );
}
