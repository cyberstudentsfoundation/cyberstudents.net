import { env } from "../env.js";
import { inspect } from "node:util";

export function sendNotification(message: unknown, options?: { file?: string; fileName?: string }) {
  try {
    // eslint-disable-next-line no-console
    console.log("[NOTIFICATION]", message);

    if (!env.DISCORD_WEBHOOK_URL) return;

    const content = typeof message === "string" ? message : inspect(message);
    const { file, fileName } = options ?? {};

    if (file && fileName) {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("file", new Blob([file], { type: "text/plain" }), fileName);

      fetch(env.DISCORD_WEBHOOK_URL, { method: "POST", body: formData }).catch(console.error);
      return;
    }

    fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    }).catch(console.error);
  } catch (error) {
    console.error(error);
  }
}
