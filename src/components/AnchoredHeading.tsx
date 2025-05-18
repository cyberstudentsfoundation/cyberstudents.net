import React from "react";
import { cn } from "~/lib/utils";
import { HiLink } from "react-icons/hi2";

type HeadingNames = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export default function AnchoredHeading({
  level,
  id,
  buttonClassName,
  children,
  ...props
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  id: string;
  buttonClassName?: string;
  children: React.ReactNode;
} & React.ComponentProps<HeadingNames>) {
  const Tag = `h${level}` as HeadingNames;

  return (
    <a id={id} href={`#${id}`} className="group/anchor relative cursor-pointer scroll-mt-20 no-underline">
      <div className={cn("absolute -left-12 h-full pr-12", buttonClassName)}>
        <div className="group/btn flex h-full items-center rounded-lg border border-gray-600 bg-gray-800 px-1.5 py-1 opacity-0 transition-all hover:border-gray-500 hover:bg-gray-700 group-hover/anchor:opacity-100">
          <HiLink className="h-4 w-4 stroke-1 text-gray-300 group-hover/btn:text-gray-200" />
        </div>
      </div>
      <Tag {...props}>{children}</Tag>
    </a>
  );
}
