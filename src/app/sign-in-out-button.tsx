"use client";

import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default function SignInOutButton({ session }: { session?: Session | null }) {
  return (
    <button
      className="underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-300 hover:decoration-gray-400"
      onClick={() => (session?.user ? signOut() : signIn("discord"))}
    >
      {session?.user ? "Sign out" : "Sign in"}
    </button>
  );
}
