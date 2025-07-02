"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "~/lib/utils";

export default function LiquidGlassButton({
  href,
  target,
  className,
  linkClassName,
  children,
  ...props
}: { href: string; target?: string; linkClassName?: string } & React.HTMLAttributes<HTMLButtonElement>) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Link
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={cn(
        "group relative flex w-fit rounded-2xl border border-cyan-50/20 bg-cyan-50/10 px-8 py-2 font-medium text-white shadow-[0_8px_32px_0_rgba(31,135,135,0.2)] backdrop-blur-[2px] transition-all duration-200 ease-out hover:border-cyan-50/30 hover:bg-cyan-50/15 active:scale-[0.98] active:bg-cyan-50/5",
        isPressed && "scale-[0.98] bg-cyan-50/5",
        linkClassName,
      )}
      href={href}
      target={target}
    >
      <span className={cn("relative z-10", className)} {...props}>
        {children}
      </span>

      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-50/5 to-cyan-50/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Subtle inner border */}
      <div className="absolute inset-[1px] rounded-[15px] bg-gradient-to-b from-cyan-50/10 to-transparent opacity-50" />
    </Link>
  );
}
