"use client";

import type { Session } from "next-auth";
import { api } from "~/trpc/react";
import { DataTable } from "./data-table";
import { type LeaderboardEntry, columns } from "./columns";

export default function Leaderboard({ session }: { session: Session | null }) {
  const getLeaderboardQuery = api.event.getLeaderboard.useQuery(
    { event: "aoc2024", onlyShowCurrentUser: false },
    { refetchInterval: 10_000 },
  );

  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold tracking-wide text-gray-200">Leaderboard</h1>
      {getLeaderboardQuery.data ? (
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={getLeaderboardQuery.data!.leaderboard} session={session} />
          <p className="mt-2 text-sm text-gray-400">
            Only players with at least one challenge solved appear on the leaderboard.
          </p>
        </div>
      ) : (
        <div className="my-10 flex items-center justify-center text-gray-400">Loading...</div>
      )}
    </div>
  );
}
