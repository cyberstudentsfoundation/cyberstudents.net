import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiArrowDownTray, HiArrowRight, HiEnvelope, HiPhone, HiRss } from "react-icons/hi2";

import logo from "~/../public/logo.png";
import wordmark from "~/../public/wordmark.svg";
import { Wide } from "~/app/_home/ui";
import { site, stats } from "~/data/site";
import { articleHref, articles, formatDate } from "./_articles";
import { ArticleArt, ArticleCard, KindChip } from "./_card";
import { BOILERPLATE } from "./_components";

export const metadata: Metadata = {
  title: "Newsroom · CyberStudents",
  description: "Announcements, press releases, results, and stories from CyberStudents and Advent of CTF.",
  alternates: { types: { "application/rss+xml": "/news/rss.xml" } },
};

/** The story shown large at the top of the newsroom. */
const FEATURED_SLUG = "upgrading-our-server";

const FAST_FACTS = [
  { label: "Founded", value: "December 2, 2021" },
  ...stats.rows.filter((r) => r.value && r.label !== "Founded").map((r) => ({ label: r.label, value: r.value! })),
  { label: "Advent of CTF players", value: "2,000+ across 2024 and 2025" },
];

export default function NewsPage() {
  // FEATURED_SLUG picks the lead story. Every article, the lead included, also stays in the list below in its usual
  // place.
  const featured = articles.find((a) => a.slug === FEATURED_SLUG) ?? articles[0];
  const rest = articles;
  const years = [...new Set(rest.map((a) => a.date.slice(0, 4)))];

  return (
    <main className="bg-[#fbfaf7] text-stone-900">
      {/* Masthead */}
      <section className="border-b border-stone-200 bg-white">
        <Wide className="pt-14 pb-10 sm:pt-20">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b-4 border-double border-stone-900 pb-6">
            <div>
              <h1 className="font-serif text-5xl text-stone-950 sm:text-7xl">Newsroom</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
                Announcements, press releases, and stories from CyberStudents, from our very first daily CTF to the
                latest Advent of CTF. If you&rsquo;re writing about us, the press kit is at the bottom of the page.
              </p>
            </div>
            <a
              href="/news/rss.xml"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-100"
            >
              <HiRss className="size-4 text-orange-500" aria-hidden="true" />
              RSS feed
            </a>
          </div>

          {/* Featured */}
          {featured && (
            <Link href={articleHref(featured)} className="group mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <ArticleArt
                article={featured}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[16/9] rounded-2xl shadow-lg ring-1 ring-stone-900/10"
              />
              <span className="block">
                <span className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-bold tracking-wide text-stone-950 uppercase">Featured</span>
                  <KindChip kind={featured.kind} />
                  <time dateTime={featured.date} className="text-sm text-stone-500">
                    {formatDate(featured.date)}
                  </time>
                </span>
                <span className="mt-3 block text-3xl leading-tight font-bold text-stone-950 group-hover:underline group-hover:decoration-stone-400 group-hover:underline-offset-4 sm:text-4xl">
                  {featured.title}
                </span>
                <span className="mt-4 block text-lg leading-8 text-stone-600">{featured.dek}</span>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-cyan-800">
                  Read the story
                  <HiArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </span>
            </Link>
          )}
        </Wide>
      </section>

      {/* By year */}
      <Wide className="py-14 sm:py-20">
        {years.map((year) => (
          <section key={year} aria-labelledby={`year-${year}`} className="grid gap-8 border-t border-stone-200 py-12 first:border-t-0 first:pt-0 lg:grid-cols-[8rem_minmax(0,1fr)]">
            <h2 id={`year-${year}`} className="font-serif text-4xl text-stone-300 lg:sticky lg:top-28 lg:self-start">
              {year}
            </h2>
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {rest
                .filter((a) => a.date.startsWith(year))
                .map((a) => (
                  <li key={a.slug}>
                    <ArticleCard article={a} />
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </Wide>

      {/* Press kit */}
      <section id="press" aria-labelledby="press-title" className="scroll-mt-20 bg-gray-950 text-gray-200">
        <Wide className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 id="press-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Press kit
            </h2>
            <p className="mt-5 text-sm font-bold tracking-wide text-cyan-300 uppercase">About CyberStudents</p>
            <p className="mt-2 text-lg leading-8 text-gray-300">{BOILERPLATE}</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
              {FAST_FACTS.map((f) => (
                <div key={f.label} className="border-t border-white/15 pt-2">
                  <dt className="text-sm text-gray-400">{f.label}</dt>
                  <dd className="mt-0.5 font-semibold text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
            {stats.asOf && <p className="mt-4 text-sm text-gray-500">Community figures as of {stats.asOf}.</p>}
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="font-semibold text-white">Logos</p>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                <li>
                  <a href="/logo.png" download className="group block rounded-xl bg-gray-900 p-4 ring-1 ring-white/10 hover:ring-white/30">
                    <Image src={logo} alt="CyberStudents logo" className="mx-auto h-20 w-20 rounded-2xl" />
                    <span className="mt-3 flex items-center justify-center gap-1.5 text-sm text-gray-300 group-hover:text-white">
                      <HiArrowDownTray className="size-4" aria-hidden="true" />
                      Logo, PNG
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/wordmark.svg" download className="group flex h-full flex-col justify-between rounded-xl bg-gray-900 p-4 ring-1 ring-white/10 hover:ring-white/30">
                    <Image src={wordmark} alt="CyberStudents wordmark" className="mx-auto mt-6 h-8 w-auto" />
                    <span className="mt-3 flex items-center justify-center gap-1.5 text-sm text-gray-300 group-hover:text-white">
                      <HiArrowDownTray className="size-4" aria-hidden="true" />
                      Wordmark, SVG
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="font-semibold text-white">Media contact</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 text-gray-200 hover:text-cyan-300">
                    <HiEnvelope className="size-4 text-cyan-300" aria-hidden="true" />
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={site.phone.href} className="inline-flex items-center gap-2.5 tracking-wide text-gray-200 hover:text-cyan-300">
                    <HiPhone className="size-4 text-cyan-300" aria-hidden="true" />
                    <span aria-hidden="true">{site.phone.vanity}</span>
                    <span className="sr-only">{site.phone.display}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Wide>
      </section>
    </main>
  );
}
