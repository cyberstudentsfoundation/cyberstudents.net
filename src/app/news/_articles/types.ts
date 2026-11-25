import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

export type ArticleKind = "Press release" | "Announcement" | "Results" | "Story" | "Behind the scenes" | "Recap";

/**
 * A newsroom article. Each one is written as of its `date`, in the tense of that day, from our announcements, the
 * repositories, and our records. The filing date may be set to the day the news happened, but nothing in the text may
 * be untrue.
 */
export type Article = {
  slug: string;
  /** ISO date the article is filed under. */
  date: string;
  kind: ArticleKind;
  title: string;
  dek: string;
  /** "CyberStudents" for press releases, otherwise the writer's public name. */
  author: string;
  minutes: number;
  /** A photograph or screenshot for the card and the top of the article. */
  image?: { src: StaticImageData; alt: string; position?: string; dark?: boolean };
  /** A drawn graphic instead of a photograph (diagrams, charts). */
  visual?: () => ReactNode;
  /** An existing page elsewhere on the site, instead of a body here. */
  href?: string;
  Body?: () => ReactNode;
  /** Press releases end with the boilerplate and media contact. */
  about?: string;
};
