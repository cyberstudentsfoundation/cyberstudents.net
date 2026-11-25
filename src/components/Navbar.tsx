import React from "react";
import { authEnabled, getServerAuthSession } from "~/server/auth";
import NavbarInner from "~/components/NavbarInner";

// const components: { title: string; href: string; description: string; external?: boolean; disabled?: boolean }[] = [
//   {
//     title: "CyberStudents CTF",
//     href: "/ctf",
//     description: "Our premier weekend-long CTF competition hosted every summer",
//   },
//   {
//     title: "Advent of CTF",
//     href: "/advent",
//     description: "Solve beginner-friendly daily challenges every day in December",
//   },
//   {
//     title: "Daily CTF",
//     href: "https://discord.com/invite/cyberstudents-916144903686336513",
//     description: "Practice with community challenges every day with monthly rounds",
//     external: true,
//   },
// ];

export default async function Navbar() {
  // A database outage must not take down every page: fall back to the signed-out navbar.
  const session = await getServerAuthSession().catch(() => null);

  return <NavbarInner session={session} authEnabled={authEnabled} />;
}
