"use client";

import { useState } from "react";
import { HiExternalLink } from "react-icons/hi";
import { HiCheck, HiLightBulb, HiXMark } from "react-icons/hi2";
import { categoryOf } from "~/data/categories";
import { cn } from "~/lib/utils";

// Advent of CTF 2024, Day 1, by GodderE2D. The text, hints and flag are public in the write-ups repository, so the
// flag is checked in the browser against its SHA-256 hash.
const CHALLENGE = {
  title: "Logical Exclusivity",
  description: "rotten bxgxnnxngs",
  data: "64 6e 63 74 7f 4c 7a 37 7b 3c 50 37 3c 36 3e 59 79 3e 59 36 3a 50 37 3a 37 43 3b 37 72",
  hints: [
    "Logical exclusivity = a logical operator?",
    <>
      <a href="https://gchq.github.io/CyberChef/" target="_blank" rel="noopener noreferrer" className="underline">
        CyberChef
      </a>{" "}
      is your friend. Check out some brute forcing tools!
    </>,
  ],
  hash: "4ea1362a24392abfbb17871ee026bf7363531fea356b9beea7993a05f846e9ed",
  writeUp:
    "https://github.com/cyberstudentsfoundation/Advent-of-CTF/blob/main/2024/Day%2001%20-%20Logical%20Exclusivity/README.md",
};

async function sha256(text: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function TryChallenge() {
  const cat = categoryOf("Cryptography");
  const [flag, setFlag] = useState("");
  const [state, setState] = useState<"idle" | "wrong" | "right">("idle");
  const [hints, setHints] = useState(0);

  async function check(e: React.FormEvent) {
    e.preventDefault();
    const ok = (await sha256(flag.trim())) === CHALLENGE.hash;
    setState(ok ? "right" : "wrong");
  }

  return (
    <div className="grid gap-8 rounded-2xl border border-slate-300/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
      <div>
        <h3 className="text-2xl font-bold text-slate-950">Try one out!</h3>
        <p className="mt-2 text-slate-600">
          This was the very first Advent of CTF challenge, released on December 1st, 2024. Hidden somewhere in the
          challenge text is a flag that looks like{" "}
          <code className="rounded bg-slate-200 px-1 font-mono text-sm text-slate-800">{"csd{...}"}</code>. Once
          you&rsquo;ve found it, paste it into the box to check your answer.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-semibold",
              cat.chipLight,
            )}
          >
            <cat.icon className="size-3" aria-hidden="true" />
            {cat.title}
          </span>
          <span className="text-slate-500">30 points · by GodderE2D</span>
        </div>
      </div>

      <div className="min-w-0">
        <p className="font-semibold text-slate-950">{CHALLENGE.title}</p>
        <p className="mt-1 text-slate-700">{CHALLENGE.description}</p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 px-4 py-3 font-mono text-sm leading-6 whitespace-pre-wrap text-cyan-200 select-all">
          {CHALLENGE.data}
        </pre>

        <form onSubmit={check} className="mt-4 flex gap-2">
          <label className="sr-only" htmlFor="try-flag">
            Flag
          </label>
          <input
            id="try-flag"
            value={flag}
            onChange={(e) => {
              setFlag(e.target.value);
              if (state !== "idle") setState("idle");
            }}
            placeholder="csd{...}"
            autoComplete="off"
            spellCheck={false}
            className={cn(
              "min-w-0 flex-1 rounded-lg border bg-white px-3 py-2 font-mono text-sm text-slate-900 transition-colors focus:outline-none",
              state === "wrong" ? "border-red-400 focus:border-red-500" : "border-slate-300 focus:border-cyan-700",
              state === "right" && "border-green-500",
            )}
          />
          <button
            type="submit"
            className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Check
          </button>
        </form>

        <div aria-live="polite" className="mt-3 min-h-6 text-sm">
          {state === "right" && (
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium text-green-700">
              <HiCheck className="size-4" aria-hidden="true" />
              You got it! If you&rsquo;re curious how someone else approached it, take a look at{" "}
              <a
                href={CHALLENGE.writeUp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline underline-offset-4"
              >
                zarnex&rsquo;s write-up
                <HiExternalLink className="size-4" aria-hidden="true" />
              </a>
            </p>
          )}
          {state === "wrong" && (
            <p className="flex items-center gap-2 text-red-700">
              <HiXMark className="size-4" aria-hidden="true" />
              Not quite yet. Double-check the format and give it another go.
            </p>
          )}
        </div>

        <div className="mt-2 space-y-2">
          {CHALLENGE.hints.slice(0, hints).map((h, i) => (
            <p key={i} className="flex gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
              <HiLightBulb className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                <span className="font-semibold">Hint {i + 1}:</span> {h}
              </span>
            </p>
          ))}
          {hints < CHALLENGE.hints.length && state !== "right" ? (
            <button
              type="button"
              onClick={() => setHints((n) => n + 1)}
              className="text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
            >
              Show hint {hints + 1}
            </button>
          ) : (
            <span>
              Still stuck? Check out{" "}
              <a
                href={CHALLENGE.writeUp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
              >
                zarnex&rsquo;s writeup.
              </a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
