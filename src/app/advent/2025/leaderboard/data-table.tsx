"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel, // ⬅️ add this
  useReactTable,
  PaginationState, // ⬅️ and this
} from "@tanstack/react-table";
import type { Session } from "next-auth";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import type { LeaderboardEntry } from "./columns";
import { cn } from "~/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  session,
}: DataTableProps<TData, TValue> & { session: Session | null }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // new:
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50, // tweak this (25 / 50 / 100) as you like
  });

  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // ⬅️ important

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination, // ⬅️ new

    state: {
      sorting,
      columnFilters,
      pagination, // ⬅️ new
    },

    getRowId: (row) => (row as LeaderboardEntry).id, // ensure stable IDs for rows
  });

  // derived values that we can safely put in the dependency array
  const pageIndex = table.getState().pagination.pageIndex;
  const paginatedRowCount = table.getRowModel().rows.length;

  useEffect(() => {
    if (!pendingScrollId) return;

    const el = document.getElementById(pendingScrollId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setPendingScrollId(null);
    }
  }, [pendingScrollId, pageIndex, paginatedRowCount]); // ← only simple values here

  function handleJumpToMe() {
    if (!session?.user) return;

    // Sorted + filtered rows *before* pagination
    const allRows = table.getPrePaginationRowModel().rows;

    // We set getRowId to LeaderboardEntry.id, so row.id === user.id
    const targetIndex = allRows.findIndex((row) => row.id === session.user.id);
    if (targetIndex === -1) {
      // user isn't in the current filtered set (e.g., filter text applied)
      return;
    }

    const pageSize = table.getState().pagination.pageSize;
    const targetPageIndex = Math.floor(targetIndex / pageSize);

    // Set the target page, and record which row we want to scroll to
    table.setPageIndex(targetPageIndex);
    setPendingScrollId(session.user.id);
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Filter by name"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn("name")?.setFilterValue(event.target.value);
              // optional: reset to first page on filter change
              table.setPageIndex(0);
            }}
            className="max-w-sm border-gray-800 bg-gray-950"
          />
        </div>
        {session?.user && (
          <Button className="" variant="outline" type="button" onClick={() => handleJumpToMe()}>
            Jump to me
          </Button>
        )}
      </div>

      <PaginationControls table={table} className="my-4" />

      <div className="rounded-md border border-gray-800">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-gray-400">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  id={row.id}
                  className="scroll-mt-28"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`text-base text-gray-200 ${row.id === session?.user.id ? "bg-cyan-400/30" : ""}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControls table={table} className="mt-4 mb-2" />
    </div>
  );

  // return (
  //   <div>
  //     <div className="flex items-center justify-between py-4">
  //       <div className="flex items-center gap-4">
  //         <Input
  //           placeholder="Filter by name"
  //           value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
  //           onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
  //           className="max-w-sm border-gray-800 bg-gray-950"
  //         />
  //       </div>
  //       {session?.user && (
  //         <Link href={`/advent/2025/leaderboard#${session.user.name}`}>
  //           <Button className="" variant="ghost" tabIndex={-1}>
  //             Jump to me
  //           </Button>
  //         </Link>
  //       )}
  //     </div>
  //     <div className="rounded-md border border-gray-800">
  //       <Table>
  //         <TableHeader>
  //           {table.getHeaderGroups().map((headerGroup) => (
  //             <TableRow key={headerGroup.id}>
  //               {headerGroup.headers.map((header) => {
  //                 return (
  //                   <TableHead key={header.id} className="text-gray-400">
  //                     {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
  //                   </TableHead>
  //                 );
  //               })}
  //             </TableRow>
  //           ))}
  //         </TableHeader>
  //         <TableBody>
  //           {table.getRowModel().rows?.length ? (
  //             table.getRowModel().rows.map((row) => (
  //               <TableRow
  //                 key={row.id}
  //                 data-state={row.getIsSelected() && "selected"}
  //                 id={row.getValue("name")}
  //                 className="scroll-mt-28"
  //               >
  //                 {row.getVisibleCells().map((cell) => (
  //                   <TableCell
  //                     key={cell.id}
  //                     className={`text-base text-gray-200 ${row.getValue("name") === session?.user.name ? "bg-cyan-400/30" : ""}`}
  //                   >
  //                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //                   </TableCell>
  //                 ))}
  //               </TableRow>
  //             ))
  //           ) : (
  //             <TableRow>
  //               <TableCell colSpan={columns.length} className="h-24 text-center">
  //                 No results.
  //               </TableCell>
  //             </TableRow>
  //           )}
  //         </TableBody>
  //       </Table>
  //     </div>
  //   </div>
  // );
}

function PaginationControls<TData>({
  table,
  className,
}: {
  table: ReturnType<typeof useReactTable<TData>>;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-end text-sm text-gray-400 sm:justify-between", className)}>
      <div className="hidden sm:block">
        Showing <span className="font-semibold">{table.getRowModel().rows.length}</span> of{" "}
        <span className="font-semibold">{table.getFilteredRowModel().rows.length}</span> entries
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ChevronLeft />
          <span className="hidden md:inline">Previous</span>
        </Button>
        <span>
          Page <span className="font-semibold">{table.getState().pagination.pageIndex + 1}</span> of{" "}
          <span className="font-semibold">{table.getPageCount() || 1}</span>
        </span>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <span className="hidden md:inline">Next</span>
          <ChevronRight />
        </Button>

        {/* optional page size selector */}
        <select
          className="ml-2 rounded border border-gray-700 bg-gray-900 px-2 py-1 text-xs"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[1, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
