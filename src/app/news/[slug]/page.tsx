import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";

import { Wide } from "~/app/_home/ui";
import { articles, formatDate } from "../_articles";
import { ArticleArt, ArticleCard, KindChip } from "../_card";
import { PressFooter } from "../_components";

export function generateStaticParams() {
  return articles.filter((a) => !a.href).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug && !a.href);
  if (!article) return {};
  return {
    title: `${article.title} · CyberStudents`,
    description: article.dek,
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      publishedTime: article.date,
      ...(article.image ? { images: [{ url: article.image.src.src }] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug && !a.href);
  if (!article?.Body) notFound();
  const { Body } = article;
  const press = article.kind === "Press release";
  const index = articles.indexOf(article);
  // The stories either side of this one in time, then the latest, without repeats.
  const more = [index + 1, index - 1, index + 2, index - 2, 0, 1, 2]
    .map((i) => articles[i])
    .filter((a, i, all): a is NonNullable<typeof a> => !!a && a !== article && all.indexOf(a) === i)
    .slice(0, 3);

  return (
    <main className="bg-[#fbfaf7] text-stone-900">
      <article>
        <header className="border-b border-stone-200 bg-white">
          <Wide className="pt-10 pb-12 sm:pt-14 sm:pb-16">
            <div className="mx-auto max-w-3xl">
              <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-stone-900">
                <HiArrowLeft className="size-4" aria-hidden="true" />
                Newsroom
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <KindChip kind={article.kind} />
                <time dateTime={article.date} className="text-sm text-stone-500">
                  {formatDate(article.date)}
                </time>
              </div>
              <h1 className="mt-4 text-4xl leading-[1.1] font-bold tracking-tight text-stone-950 sm:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 text-xl leading-8 text-stone-600">{article.dek}</p>
              <p className="mt-6 text-sm text-stone-500">
                {press ? "From" : "By"} <span className="font-semibold text-stone-800">{article.author}</span>
                <span aria-hidden="true"> · </span>
                {article.minutes} min read
              </p>
            </div>
          </Wide>
        </header>

        <Wide className="pb-16">
          {/* Photos lead the article. Drawn graphics already appear in the body, so they are not repeated here. */}
          {article.image && (
            <>
              <ArticleArt
                article={article}
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="mx-auto -mt-px aspect-[16/8] max-w-5xl rounded-b-2xl shadow-lg ring-1 ring-stone-900/10 sm:aspect-[16/7]"
              />
              <p className="sr-only">{article.image.alt}</p>
            </>
          )}
          <div className="mx-auto mt-12 max-w-[44rem]">
            <Body />
            {press && <PressFooter about={article.about} />}
          </div>
        </Wide>
      </article>

      <section aria-labelledby="more-title" className="border-t border-stone-200 bg-white">
        <Wide className="py-14 sm:py-16">
          <h2 id="more-title" className="text-2xl font-bold text-stone-950">
            More from the newsroom
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </Wide>
      </section>
    </main>
  );
}
