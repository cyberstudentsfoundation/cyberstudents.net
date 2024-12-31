"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { env } from "~/env";

if (typeof window !== "undefined" && env.NEXT_PUBLIC_POSTHOG_KEY && env.NEXT_PUBLIC_POSTHOG_HOST) {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    // Change this to eu if using the EU PostHog cloud
    ui_host: "https://us.posthog.com",
    person_profiles: "always",
  });
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  if (!env.NEXT_PUBLIC_POSTHOG_KEY || !env.NEXT_PUBLIC_POSTHOG_HOST) return null;

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
