"use client";

import { useState } from "react";
import { HiCheck, HiOutlineClipboard } from "react-icons/hi2";

/** A one-line terminal command with a copy button. */
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be blocked; the command is still selectable.
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 py-2.5 pr-2.5 pl-4 font-mono text-sm shadow-inner shadow-black/40">
      <span aria-hidden="true" className="text-cyan-300 select-none">
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-gray-200 [scrollbar-width:none]">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy command"}
        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
      >
        {copied ? <HiCheck className="size-4 text-lime-300" aria-hidden="true" /> : <HiOutlineClipboard className="size-4" aria-hidden="true" />}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
