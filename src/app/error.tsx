"use client";

import Image from "next/image";
import Link from "next/link";
import NounCat from "~/../public/noun-cat-7700924.svg";

/** Shown when a page fails to render, for example if a service it depends on is briefly down. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mb-12 sm:mb-24">
      <div className="mx-4 flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
        <div className="max-w-md text-center">
          <Image src={NounCat} alt="" width={100} height={100} className="mx-auto mb-4 size-28 opacity-50 sm:size-36" />
          <h1 className="mb-4 font-serif text-4xl font-semibold tracking-wide text-gray-100">Something went wrong</h1>
          <p className="mb-6 text-lg leading-8 text-gray-400">
            Sorry, this page couldn&rsquo;t load right now. Please try again in a moment, or let us know on Discord if it
            keeps happening.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-lg bg-white px-4 py-2 font-semibold text-gray-950 transition-colors hover:bg-gray-200"
            >
              Try again
            </button>
            <Link href="/" className="underline decoration-gray-300 underline-offset-2 hover:text-gray-300">
              Home
            </Link>
            <a
              href="https://discord.com/invite/cyberstudents-916144903686336513"
              className="underline decoration-gray-300 underline-offset-2 hover:text-gray-300"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
