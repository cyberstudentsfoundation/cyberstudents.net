import type { Metadata } from "next";

import { Hero } from "~/app/_home/Hero";
import { SectionNav } from "~/app/_home/SectionNav";
import { Advent } from "~/app/_home/Advent";
import { Challenges } from "~/app/_home/Challenges";
import { Categories } from "~/app/_home/Categories";
import { WriteUps } from "~/app/_home/WriteUps";
import { DailyCtf } from "~/app/_home/DailyCtf";
import { Community } from "~/app/_home/Community";
import { History } from "~/app/_home/History";
import { Team } from "~/app/_home/Team";
import { IntersectStart } from "~/app/_home/motion";

export const metadata: Metadata = {
  other: {
    "og:image": "/logo-rounded.png",
  },
};

// Reads only src/data/* and static files, so it renders with the database stopped.
export default function Page() {
  return (
    <main className="bg-gray-950 text-gray-100">
      <IntersectStart />
      <Hero />
      <SectionNav />
      <Advent />
      <Challenges />
      <Categories />
      <WriteUps />
      <DailyCtf />
      <Community />
      <History />
      <Team />
    </main>
  );
}
