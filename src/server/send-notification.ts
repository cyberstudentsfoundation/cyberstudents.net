import { env } from "../env.js";
import { inspect } from "node:util";

export function sendNotification(message: unknown) {
  try {
    // eslint-disable-next-line no-console
    console.log("[NOTIFICATION]", message);

    if (!env.DISCORD_WEBHOOK_URL) return;

    fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: typeof message === "string" ? message : inspect(message) }),
    });
  } catch (error) {
    console.error(error);
  }
}
