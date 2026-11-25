/* eslint-disable */
// @ts-nocheck

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.com/invite/cyberstudents-916144903686336513",
        permanent: true,
      },

      // Retired pages (2026 overhaul)
      { source: "/foundation", destination: "/about", permanent: false },
      { source: "/ctf", destination: "/advent", permanent: false },
      { source: "/ctf/:path*", destination: "/advent", permanent: false },

      // 2. ONLY redirect specific subroutes to /advent/2024/*
      {
        source: "/advent/:path(challenges|leaderboard|register|results)",
        destination: "/advent/2024/:path",
        permanent: true,
      },
      {
        // Also catch deeper nested versions like /advent/challenges/123
        source: "/advent/:path(challenges|leaderboard|register|results)/:subpath*",
        destination: "/advent/2024/:path/:subpath*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // https://posthog.com/docs/advanced/proxy/nextjs
      // Change URLs to eu if using the EU PostHog cloud
      {
        source: "/anti-cheat/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/anti-cheat/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/anti-cheat/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
      },
      {
        // YouTube thumbnails for community write-up videos (src/data/writeups.ts)
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**",
      },
    ],
  },
};

export default config;
