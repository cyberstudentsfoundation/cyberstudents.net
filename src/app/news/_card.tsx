import Image from "next/image";
import Link from "next/link";

import { cn } from "~/lib/utils";
import { articleHref, formatDate, type Article, type ArticleKind } from "./_articles";

export const KIND_STYLE: Record<ArticleKind, string> = {
  "Press release": "bg-cyan-100 text-cyan-900",
  Announcement: "bg-emerald-100 text-emerald-900",
  Results: "bg-amber-100 text-amber-900",
  Story: "bg-violet-100 text-violet-900",
  "Behind the scenes": "bg-lime-100 text-lime-900",
  Recap: "bg-rose-100 text-rose-900",
};

export function KindChip({ kind, className }: { kind: ArticleKind; className?: string }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold", KIND_STYLE[kind], className)}>
      {kind}
    </span>
  );
}

/** The picture at the top of a card or article: a photo, or a drawn graphic for articles without one. */
export function ArticleArt({
  article,
  sizes,
  className,
  scale = 1,
}: {
  article: Article;
  sizes: string;
  className?: string;
  /** Drawn graphics are laid out at 1/scale of the frame and shrunk to fit, so small cards show a true thumbnail. */
  scale?: number;
}) {
  return (
    <span className={cn("relative block overflow-hidden", article.image?.dark ? "bg-gray-950" : "bg-stone-100", className)}>
      {article.image ? (
        <Image
          src={article.image.src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
          style={{ objectPosition: article.image.position ?? "top center" }}
        />
      ) : (
        article.visual && (
          <span
            className="absolute top-0 left-0 block origin-top-left [&>*]:h-full"
            style={{ width: `${100 / scale}%`, height: `${100 / scale}%`, transform: `scale(${scale})` }}
          >
            {article.visual()}
          </span>
        )
      )}
    </span>
  );
}

export function ArticleCard({ article, className }: { article: Article; className?: string }) {
  return (
    <Link href={articleHref(article)} className={cn("group flex flex-col", className)}>
      <ArticleArt
        article={article}
        scale={0.55}
        sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
        className="aspect-[16/10] rounded-xl shadow-sm ring-1 ring-stone-900/10"
      />
      <span className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
        <KindChip kind={article.kind} />
        <time dateTime={article.date} className="text-sm text-stone-500">
          {formatDate(article.date)}
        </time>
      </span>
      <span className="mt-2 text-xl leading-snug font-bold text-stone-950 group-hover:underline group-hover:decoration-stone-400 group-hover:underline-offset-4">
        {article.title}
      </span>
      <span className="mt-2 line-clamp-3 leading-7 text-stone-600">{article.dek}</span>
    </Link>
  );
}
