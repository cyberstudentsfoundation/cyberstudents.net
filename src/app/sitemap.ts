import type { MetadataRoute } from "next";
import { articleHref, articles } from "~/app/news/_articles";
import { site } from "~/data/site";

/** Public pages for search engines. Sign-in, registration, dashboards, and verification are left out on purpose. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.9 },
    { path: "/advent", priority: 0.9 },
    { path: "/advent/2025", priority: 0.8 },
    { path: "/advent/2024", priority: 0.7 },
    { path: "/advent/2024/results", priority: 0.7 },
    { path: "/challenges", priority: 0.8 },
    { path: "/write-ups", priority: 0.7 },
    { path: "/news", priority: 0.8 },
    { path: "/server-rules", priority: 0.3 },
    { path: "/terms", priority: 0.2 },
    { path: "/privacy", priority: 0.2 },
    { path: "/age-requirements", priority: 0.2 },
  ];
  const news = articles
    .filter((a) => !a.href)
    .map((a) => ({
      url: `${site.url}${articleHref(a)}`,
      lastModified: new Date(`${a.date}T12:00:00Z`),
      priority: 0.6,
    }));
  return [...pages.map((p) => ({ url: `${site.url}${p.path}`, priority: p.priority })), ...news];
}
