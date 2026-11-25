import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HiEnvelope, HiPhone } from "react-icons/hi2";

import { site } from "~/data/site";
import { cn } from "~/lib/utils";

// Building blocks for newsroom articles. Articles are light pages (a newspaper feel, and a change of pace from the
// dark homepage), with a 44rem text column and figures that can break out wider.

export function P({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-6 text-lg leading-8 text-stone-800 first:mt-0", className)}>{children}</p>;
}

/** Press release dateline, written before the first sentence. */
export function Dateline({ date }: { date: string }) {
  return (
    <span className="font-semibold tracking-wide text-stone-950 uppercase">
      {new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.{" "}
    </span>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-14 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">{children}</h2>;
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:\/\//.test(href);
  const cls = "font-medium text-cyan-800 underline decoration-cyan-800/30 underline-offset-4 hover:decoration-cyan-800";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Figure({
  src,
  alt,
  caption,
  wide,
  className,
  imageClassName,
  dark,
}: {
  src: StaticImageData;
  alt: string;
  caption?: ReactNode;
  wide?: boolean;
  className?: string;
  imageClassName?: string;
  dark?: boolean;
}) {
  return (
    <figure className={cn("mt-10", wide && "lg:-mx-28", className)}>
      <div className={cn("overflow-hidden rounded-xl shadow-lg ring-1 ring-stone-900/10", dark ? "bg-gray-950" : "bg-white")}>
        <Image
          src={src}
          alt={alt}
          sizes={wide ? "(min-width: 1024px) 60rem, 100vw" : "(min-width: 768px) 44rem, 100vw"}
          className={cn("h-auto w-full", imageClassName)}
        />
      </div>
      {caption && <figcaption className="mt-3 text-sm leading-6 text-stone-500">{caption}</figcaption>}
    </figure>
  );
}

/** Two or three images side by side. */
export function Gallery({
  images,
  caption,
}: {
  images: { src: StaticImageData; alt: string; className?: string }[];
  caption?: ReactNode;
}) {
  return (
    <figure className="mt-10 lg:-mx-28">
      <div className={cn("grid gap-3", images.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
        {images.map((img) => (
          <div key={img.alt} className="overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-stone-900/10">
            <Image
              src={img.src}
              alt={img.alt}
              sizes="(min-width: 1024px) 30rem, 100vw"
              className={cn("aspect-[16/10] h-full w-full object-cover object-top", img.className)}
            />
          </div>
        ))}
      </div>
      {caption && <figcaption className="mt-3 text-sm leading-6 text-stone-500">{caption}</figcaption>}
    </figure>
  );
}

/** A pull quote. A large opening mark rather than a side border. */
export function Quote({ children, by }: { children: ReactNode; by: string }) {
  return (
    <figure className="my-12">
      <span aria-hidden="true" className="block font-serif text-7xl leading-none text-cyan-600">
        &ldquo;
      </span>
      <blockquote className="-mt-5 text-2xl leading-snug font-medium text-stone-950 sm:text-[1.7rem]">{children}</blockquote>
      <figcaption className="mt-4 text-sm font-semibold tracking-wide text-stone-500 uppercase">{by}</figcaption>
    </figure>
  );
}

/** A box of key facts. */
export function Facts({ title = "At a glance", items }: { title?: string; items: { label: string; value: ReactNode }[] }) {
  return (
    <aside className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-900/10 sm:p-7">
      <p className="text-sm font-bold tracking-wide text-cyan-800 uppercase">{title}</p>
      <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {items.map((f) => (
          <div key={f.label}>
            <dt className="text-sm text-stone-500">{f.label}</dt>
            <dd className="mt-0.5 font-semibold text-stone-900">{f.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

/** A plain list with cyan dots. */
export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-6 space-y-3 text-lg leading-8 text-stone-800">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-3.5 size-1.5 shrink-0 rounded-full bg-cyan-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** A frame for charts and diagrams, with a title and a source line. */
export function ChartFrame({
  title,
  source,
  children,
  wide,
}: {
  title: string;
  source?: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <figure className={cn("mt-10 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-900/10 sm:p-7", wide && "lg:-mx-28")}>
      <figcaption className="font-semibold text-stone-950">{title}</figcaption>
      <div className="mt-5">{children}</div>
      {source && <p className="mt-5 text-xs leading-5 text-stone-500">{source}</p>}
    </figure>
  );
}

/** Horizontal bars. Values are drawn relative to the largest one. */
export function Bars({
  data,
  format = (n) => n.toLocaleString("en-US"),
  color = "bg-cyan-600",
}: {
  data: { label: string; value: number; note?: string; color?: string }[];
  format?: (n: number) => string;
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <ul className="space-y-3">
      {data.map((d) => (
        <li key={`${d.label} ${d.note ?? ""}`} className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]">
          <span className="text-sm leading-5 text-stone-700">
            {d.label}
            {d.note && <span className="block text-xs text-stone-500">{d.note}</span>}
          </span>
          <span className="flex items-center gap-2.5">
            <span
              className={cn("h-6 rounded-md", d.color ?? color)}
              style={{ width: `${Math.max(2, (d.value / max) * 100)}%` }}
            />
            <span className="shrink-0 text-sm font-semibold text-stone-900 tabular-nums">{format(d.value)}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Vertical columns, for a value per round or per month. */
export function Columns({
  data,
  unit,
  color = "bg-cyan-600",
}: {
  data: { label: string; value: number; sub?: string }[];
  unit: string;
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div>
      <div className="flex h-56 items-end gap-2 border-b border-stone-300 sm:gap-4" role="list">
        {data.map((d) => (
          <div key={d.label} role="listitem" className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <span className="text-sm font-semibold text-stone-900 tabular-nums">{d.value}</span>
            <span className={cn("w-full max-w-16 rounded-t-md", color)} style={{ height: `${(d.value / max) * 82}%` }}>
              <span className="sr-only">
                {d.label}: {d.value} {unit}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2 sm:gap-4" aria-hidden="true">
        {data.map((d) => (
          <div key={d.label} className="flex-1 text-center text-xs leading-4 text-stone-600">
            <span className="block font-semibold text-stone-800">{d.label}</span>
            {d.sub}
          </div>
        ))}
      </div>
    </div>
  );
}

/** The standard "About CyberStudents" paragraph and media contact that close every press release. */
export function PressFooter({ about = BOILERPLATE }: { about?: string }) {
  return (
    <footer className="mt-14 border-t border-stone-300 pt-8">
      <p className="text-center font-mono text-stone-400" aria-hidden="true">
        ###
      </p>
      <h2 className="mt-6 text-sm font-bold tracking-wide text-stone-950 uppercase">About CyberStudents</h2>
      <p className="mt-2 leading-7 text-stone-700">{about}</p>
      <h2 className="mt-6 text-sm font-bold tracking-wide text-stone-950 uppercase">Media contact</h2>
      <ul className="mt-2 space-y-1.5 text-stone-700">
        <li>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-cyan-800">
            <HiEnvelope className="size-4 text-cyan-700" aria-hidden="true" />
            {site.email}
          </a>
        </li>
        <li>
          <a href={site.phone.href} className="inline-flex items-center gap-2 hover:text-cyan-800">
            <HiPhone className="size-4 text-cyan-700" aria-hidden="true" />
            <span aria-hidden="true">{site.phone.vanity}</span>
            <span className="sr-only">{site.phone.display}</span>
          </a>
        </li>
      </ul>
    </footer>
  );
}

export const BOILERPLATE =
  "CyberStudents is a student-run cybersecurity community on Discord, founded in December 2021, with members in high school, college, and beyond from more than 130 countries. We write and host free capture the flag competitions, including our annual Advent of CTF, run talks with people working in security, and publish every challenge and write-up so that anyone can learn from them. Learn more at cyberstudents.net.";

/** The same paragraph as it read during 2024, for press releases filed that year. */
export const BOILERPLATE_2024 =
  "CyberStudents is a student-run cybersecurity community on Discord for students in high school, college, and beyond. Founded in December 2021 as a help server for the CyberStart game, it now writes and runs its own capture the flag challenges, hosts talks and webinars, and keeps a free library of resources for anyone learning cybersecurity.";
