import "~/styles/globals.css";

import type { Metadata } from "next";
import { Figtree, DM_Serif_Text, DM_Mono } from "next/font/google";
// import { GeistMono } from "geist/font/mono";
// import { ViewTransitions } from "next-view-transitions";
import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "~/components/ui/sonner";
import { site } from "~/data/site";

// Absolute URLs for social cards and the sitemap. On Vercel, NEXTAUTH_URL is replaced by VERCEL_URL, which has no
// scheme and would make `new URL` throw, so the public site address is used instead.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "CyberStudents",
  description:
    "CyberStudents is a student-run cybersecurity community on Discord. We write and host capture the flag competitions, including Advent of CTF, and publish every challenge and write-up.",
  icons: [
    { rel: "icon", type: "image/png", url: "/favicon-96x96.png", sizes: "96x96" },
    { rel: "icon", type: "image/svg+xml", url: "/favicon.svg" },
    { rel: "shortcut icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  manifest: "/site.webmanifest",
};

// const nunitoSans = Libre_Franklin({
//   subsets: ["latin"],
//   // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   display: "swap",
//   variable: "--font-nunito-sans",
// });

const figtree = Figtree({
  subsets: ["latin"],
  // weight: ["100", "300", "400", "700", "900"],
  display: "swap",
  variable: "--font-figtree",
});

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-dm-serif-text",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-dm-mono",
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <ViewTransitions>
    <html
      lang="en"
      className={`${figtree.className} ${figtree.variable} ${dmSerifText.variable} ${dmMono.variable} scroll-smooth`}
    >
      <body>
        <TRPCReactProvider>
          <NextTopLoader color="#138080" showSpinner={false} />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
    // </ViewTransitions>
  );
}
