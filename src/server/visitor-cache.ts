import "server-only";

import { unstable_cache } from "next/cache";
import { gunzipSync, gzipSync } from "node:zlib";
import superjson from "superjson";

/**
 * Advent events that have ended, so their challenges, solves, and leaderboards no longer change. Add an event here
 * once it is over.
 */
const FINISHED_EVENTS = new Set(["aoc2024", "aoc2025"]);

/** How long signed-out visitors see the same copy of a finished event's data. */
const FINISHED_EVENT_SECONDS = 6 * 60 * 60;

/** A running event changes by the minute, so its signed-out copy refreshes quickly. */
const LIVE_EVENT_SECONDS = 60;

/** Admin edits clear every cached copy (see `adminProcedure`). */
export const VISITOR_CACHE_TAG = "visitor-data";

/**
 * Vercel keeps the data cache across deployments, so each deployment gets its own entries. Otherwise a change to what a
 * loader returns would only show up once the old copy expired, up to six hours later.
 */
const DEPLOYMENT = process.env.VERCEL_DEPLOYMENT_ID ?? process.env.VERCEL_GIT_COMMIT_SHA ?? "local";

/**
 * Serves what a signed-out visitor sees from Vercel's data cache instead of the database. Visitors and search crawlers
 * then rarely wake the database, which matters on Neon's free plan, where every hour it is awake counts against a
 * monthly allowance. Pass only loaders that ignore the session, because the result is shared by everyone.
 *
 * The value is stored as gzipped superjson: superjson so dates come back as `Date` objects, and gzip because the data
 * cache skips items over 2 MB (the 2025 challenge list with every solver is about 3 MB as text).
 */
export async function cachedForVisitors<T>(
  query: string,
  event: string,
  input: unknown,
  load: () => Promise<T>,
): Promise<T> {
  const read = unstable_cache(
    async () => gzipSync(superjson.stringify(await load())).toString("base64"),
    ["visitor", DEPLOYMENT, query, event, JSON.stringify(input)],
    {
      revalidate: FINISHED_EVENTS.has(event) ? FINISHED_EVENT_SECONDS : LIVE_EVENT_SECONDS,
      tags: [VISITOR_CACHE_TAG],
    },
  );
  return superjson.parse<T>(gunzipSync(Buffer.from(await read(), "base64")).toString("utf8"));
}
