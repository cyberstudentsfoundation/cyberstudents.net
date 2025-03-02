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
    ];
  },
  async rewrites() {
    return [
      // https://posthog.com/docs/advanced/proxy/nextjs
      // Change URLs to eu if using the EU PostHog cloud
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
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
    ],
  },
};

export default config;
