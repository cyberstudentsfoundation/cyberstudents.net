import type { Metadata } from "next";

import { HomePage } from "~/app/home-page";

export const metadata: Metadata = {
  other: {
    "og:image": "/logo-rounded.png",
  },
};

export default function Page() {
  return <HomePage />;
}
