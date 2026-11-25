"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

/**
 * Tooltip for framework codes. Light card on the dark page so it is easy to spot, opens on hover and on keyboard
 * focus, and also on tap (Radix opens on focus, which a tap gives a button).
 */
export function CodeTip({ children, content }: { children: ReactNode; content: ReactNode }) {
  return (
    <TooltipPrimitive.Root delayDuration={80}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="top"
          sideOffset={6}
          collisionPadding={12}
          className="z-50 max-w-xs rounded-lg bg-white px-3 py-2 text-left text-sm leading-snug text-gray-800 shadow-xl shadow-black/40 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-[state=instant-open]:animate-in data-[state=instant-open]:fade-in-0"
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-white" width={10} height={5} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

export function CodeTipProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={80} disableHoverableContent>
      {children}
    </TooltipPrimitive.Provider>
  );
}
