import posthog from "posthog-js";
import { env } from "~/env";

if (env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/anti-cheat",
    // Change this to eu if using the EU PostHog cloud
    ui_host: "https://us.posthog.com",
    person_profiles: "always",
    capture_pageview: "history_change",
  });
}
