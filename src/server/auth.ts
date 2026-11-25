import { getServerSession, type DefaultSession, type NextAuthOptions } from "next-auth";
import { unstable_rethrow } from "next/navigation";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "~/server/db";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import { env } from "../env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: { id: string } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      issuer: "https://discord.com",
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    {
      id: "ctftime",
      name: "CTFtime",
      type: "oauth",
      authorization: {
        url: "https://oauth.ctftime.org/authorize",
        params: { scope: "profile:read team:read" },
      },
      token: "https://oauth.ctftime.org/token",
      userinfo: "https://oauth.ctftime.org/user",
      clientId: env.CTFTIME_CLIENT_ID,
      clientSecret: env.CTFTIME_CLIENT_SECRET,
      profile(profile) {
        throw new Error("CTFtime OAuth is not implemented yet");

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
/**
 * Whether sign-in can work on this deployment. A deployment without the auth secret, the Discord OAuth app, or a
 * database (such as a fresh Vercel project) hides the Sign in buttons instead of sending visitors to an error.
 */
export const authEnabled = Boolean(
  process.env.NEXTAUTH_SECRET && process.env.DISCORD_CLIENT_ID && process.env.DATABASE_URL,
);

export const getServerAuthSession = async () => {
  // Nothing to look up without the secret, the OAuth app, or a database, and NextAuth would log NO_SECRET on every page.
  if (!authEnabled) return null;
  // If the session can't be read (the database is unreachable, or a deployment has no NEXTAUTH_SECRET yet), treat
  // the visitor as signed out instead of failing the whole page. This fails closed: protected routes see no session.
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    // Let Next.js's own control-flow errors (dynamic rendering, redirects) through untouched.
    unstable_rethrow(error);
    console.error(
      "[auth] session lookup failed, treating as signed out:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
};
