"use client";

import { useState } from "react";
import type { Session } from "next-auth";
import { api } from "~/trpc/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Skeleton } from "~/components/ui/skeleton";

export default function Leaderboard({ session }: { session: Session | null }) {
  const [division, setDivision] = useState("open");

  const getLeaderboardQuery = api.event.getLeaderboard.useQuery(
    { event: "aoc2025", onlyShowCurrentUser: false },
    {
      // refetchInterval: 30000, // 30s instead of 10s
      // refetchOnWindowFocus: true,
      // staleTime: 15000, // don't immediately re-refetch on every little thing
    },
  );

  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-gray-200">Leaderboard</h1>
      {/* <p className="text-center text-gray-400">Official 2024 results</p> */}
      {getLeaderboardQuery.data ? (
        <div className="mx-auto py-10">
          <Tabs value={division} onValueChange={(d) => setDivision(d)}>
            <TabsList className="bg-gray-800">
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="ms_hs_college">Student</TabsTrigger>
              <TabsTrigger value="hs">High School</TabsTrigger>
            </TabsList>
          </Tabs>
          <DataTable
            columns={columns}
            data={
              // division === "ms_hs_college"
              //   ? getLeaderboardQuery.data!.msHsCollegeLeaderboard
              //   : getLeaderboardQuery.data!.leaderboard
              {
                open: getLeaderboardQuery.data!.leaderboard,
                ms_hs_college: getLeaderboardQuery.data!.leaderboard.filter((u) =>
                  u.flags.includes("ms_hs_college_eligible"),
                ),
                hs: getLeaderboardQuery.data!.leaderboard.filter((u) => u.flags.includes("hs_eligible")),
              }[division] ?? [] // if this somehow fails, uh that shouldn't happen
            }
            session={session}
          />
          <p className="mt-2 text-sm text-gray-400">
            Only players with at least one challenge solved appear on the leaderboard.
            <br />
            Accuracy is not considered for rankings.
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center text-gray-400">
          <div className="mx-auto w-full py-10">
            <Skeleton className="mb-4 h-10 w-[15.159rem]" />
            <div className="mb-8 flex items-center justify-between">
              <Skeleton className="h-10 w-[11.063rem]" />
              <Skeleton className="h-10 w-[6.842rem]" />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="hidden h-5 w-42 sm:block" />
              <Skeleton className="h-9 w-100" />
            </div>
            <Skeleton className="h-[104.656rem] w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
