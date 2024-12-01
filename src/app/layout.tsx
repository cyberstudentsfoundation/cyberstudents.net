import "~/styles/globals.css";

import type { Metadata } from "next";
import { Nunito_Sans, DM_Mono } from "next/font/google";
// import { GeistMono } from "geist/font/mono";
import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
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

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-dm-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${dmMono.variable}`}>
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
  );
}
