"use client";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function DashboardHome() {
  const syncDivisionsMutation = api.dashboard.syncDivisions.useMutation({
    onError: (error) => {
      console.error("Error syncing divisions:", error);
      alert(`An error occurred while syncing divisions:\n\n${error}`);
    },
  });

  return (
    <div className="mt-4">
      <p className="mb-2">if you don&apos;t know what something does you probably shouldn&apos;t touch it :)</p>
      <Button
        onClick={async () => {
          const { numUpdated } = await syncDivisionsMutation.mutateAsync();

          alert(`Successfully synced ${numUpdated} player divisions based on schooling status.`);
        }}
      >
        Sync player divisions
      </Button>
    </div>
  );
}
