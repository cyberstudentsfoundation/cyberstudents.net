import "~/styles/globals.css";

import type { Metadata } from "next";
import { Figtree, DM_Serif_Text, DM_Mono } from "next/font/google";
import localFont from "next/font/local";
// import { GeistMono } from "geist/font/mono";
// import { ViewTransitions } from "next-view-transitions";
import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "~/components/ui/sonner";
import { env } from "~/env";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXTAUTH_URL),
  title: "CyberStudents",
  description:
    "We create opportunities for cybersecurity students via learning resources, certification pathways, CTFs, and more. Play in our beginner-focused daily cyber CTF challenges and events throughout the year. Join thousands of other students in our community today.",
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

const mokoto = localFont({
  src: "../../public/Mokoto.ttf",
  variable: "--font-mokoto",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <ViewTransitions>
    <html
      lang="en"
      className={`${figtree.className} ${figtree.variable} ${dmSerifText.variable} ${dmMono.variable} ${mokoto.variable} scroll-smooth`}
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
