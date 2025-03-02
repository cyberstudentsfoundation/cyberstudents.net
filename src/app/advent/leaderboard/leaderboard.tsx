"use client";

import { useState } from "react";
import type { Session } from "next-auth";
import { api } from "~/trpc/react";
import { DataTable } from "./data-table";
import { type LeaderboardEntry, columns } from "./columns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";

export default function Leaderboard({ session }: { session: Session | null }) {
  const [division, setDivision] = useState("open");

  const getLeaderboardQuery = api.event.getLeaderboard.useQuery(
    { event: "aoc2024", onlyShowCurrentUser: false },
    { refetchInterval: 10_000 },
  );

  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-gray-200">Leaderboard</h1>
      <p className="text-center text-gray-400">Official 2024 results</p>
      {getLeaderboardQuery.data ? (
        <div className="container mx-auto py-10">
          <Tabs value={division} onValueChange={(d) => setDivision(d)}>
            <TabsList className="bg-gray-800">
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="ms_hs_college">High School & College</TabsTrigger>
            </TabsList>
          </Tabs>
          <DataTable
            columns={columns}
            data={
              division === "ms_hs_college"
                ? getLeaderboardQuery.data!.msHsCollegeLeaderboard
                : getLeaderboardQuery.data!.leaderboard
            }
            session={session}
          />
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
