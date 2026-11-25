# CyberStudents website

This is the source code of [cyberstudents.net](https://cyberstudents.net), the website of CyberStudents, a Discord
community for students learning cybersecurity. It also runs Advent of CTF, our yearly December capture the flag
competition, so you'll find the challenge browser, flag checking, leaderboards, and the admin dashboard here too.

## What it's built with

- [Next.js](https://nextjs.org) 15 with the App Router, and React 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [tRPC](https://trpc.io) for the API
- [Prisma](https://www.prisma.io) with PostgreSQL
- [NextAuth.js](https://next-auth.js.org) for signing in with Discord, Google, or CTFtime
- [Yarn](https://yarnpkg.com) 4

## Running it locally

You'll need Node.js 22 and, if you want a local database, Docker.

1. Turn on Corepack so the right version of Yarn is used: `corepack enable`
2. Install the dependencies: `yarn install`
3. Copy `.env.example` to `.env`. The example values are enough to start the site.
4. Start the site: `yarn dev`, then open [localhost:3000](http://localhost:3000).

The homepage, the about page, the newsroom, and most other public pages read from `src/data`, so they work without a
database. The Advent of CTF challenge browser, the leaderboards, and signing in need one:

1. Start a PostgreSQL container with `./start-database.sh`. It reads `DATABASE_URL` from your `.env` and can generate a
   password for you.
2. Create the tables with `yarn db:push`.
3. To sign in, add a `NEXTAUTH_SECRET` (`openssl rand -base64 32` makes one) and the client ID and secret of a
   [Discord application](https://discord.com/developers/applications) whose redirect URL is
   `http://localhost:3000/api/auth/callback/discord`. Sign in stays hidden until these are set.

## Scripts

| Command          | What it does                                    |
| ---------------- | ----------------------------------------------- |
| `yarn dev`       | Starts the development server                   |
| `yarn build`     | Builds the site for production                  |
| `yarn start`     | Serves the production build                     |
| `yarn lint`      | Runs ESLint                                     |
| `yarn db:push`   | Updates the database to match the Prisma schema |
| `yarn db:studio` | Opens Prisma Studio to browse the database      |

## Where things are

- `src/app`: the pages, one folder per route
- `src/app/advent`: the Advent of CTF pages and the challenge platform
- `src/server`: the tRPC routers, sign-in, and the database client
- `src/data`: the content of the public pages, such as the team, the news, and past challenges
- `prisma/schema.prisma`: the database schema
- `public`: images and other static files

## Questions and contact

If you find a bug, please open an issue. For anything else, you can reach us at
[admin@cyberstudents.net](mailto:admin@cyberstudents.net) or in our [Discord server](https://cyberstudents.net/discord).

## License

The code is licensed under the Apache License 2.0 (see `LICENSE`). Sponsor logos, photos, screenshots, and other media
in `public` belong to their respective owners and aren't covered by that license.
