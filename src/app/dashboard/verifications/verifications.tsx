"use client";

import type { Session } from "next-auth";
import { api } from "~/trpc/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Verifications({ session }: { session: Session | null }) {
  const getVerificationsQuery = api.dashboard.getVerifications.useQuery();

  return (
    <div className="mx-4 pt-8 lg:mr-12 xl:mr-20">
      <h1 className="mb-2 text-2xl font-bold">Identity verifications</h1>
      <p className="mb-1 text-sm font-bold text-amber-400">
        Do not open applications unless you have express permission from Vipin or GodderE2D (unless you want an IIR).
      </p>
      <p className="mb-1 text-sm text-gray-400">
        To protect players&apos; privacy, only open these applications in a private area and on a secure network.
      </p>
      <p className="mb-1 text-sm text-gray-400">
        Under no circumstances should this information be shared with anyone else.
      </p>
      <p className="mb-4 text-sm text-gray-400">All times are in your local time zone.</p>
      {getVerificationsQuery.data ? (
        <DataTable columns={columns} data={getVerificationsQuery.data} session={session} />
      ) : (
        <div className="mt-4 text-gray-400">Loading...</div>
      )}
    </div>
  );
}
