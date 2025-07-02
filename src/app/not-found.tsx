import Image from "next/image";
import Link from "next/link";
import NounCat from "~/../public/noun-cat-7700924.svg";
import NounCatBow from "~/../public/noun-cat-7700924-bow.svg";
import { getServerAuthSession } from "~/server/auth";
import { Separator } from "~/components/ui/separator";
import SignInOutButton from "./sign-in-out-button";

export default async function NotFound() {
  const session = await getServerAuthSession();

  return (
    <main className="mb-12 sm:mb-24">
      <div className="mx-4 flex h-[calc(100vh-3.5rem)] items-center justify-center">
        <div className="text-center">
          <div className="group motion-duration-2000 motion-safe:motion-preset-wobble-sm mb-4 flex w-full justify-center opacity-50 transition-all hover:opacity-100">
            <Image
              src={NounCat}
              alt="Cat"
              width={100}
              height={100}
              className="block h-24 w-24 group-hover:hidden sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-56 2xl:h-64 2xl:w-64"
            />
            <Image
              src={NounCatBow}
              alt="Cat with bow"
              width={100}
              height={100}
              className="hidden h-24 w-24 group-hover:block sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-56 2xl:h-64 2xl:w-64"
            />
          </div>
          <h1 className="mb-4 font-serif text-4xl font-semibold tracking-wide text-gray-100">Page not found</h1>
          <p className="mb-2 text-lg text-gray-400">Sorry, the page you were looking for could not be found.</p>
          {session?.user && (
            <div className="mb-4 flex items-center justify-center gap-2 text-lg text-gray-400">
              <p>You are signed in as</p>
              <Image
                src={session.user.image?.replace(".gif", ".png") ?? "https://cdn.discordapp.com/embed/avatars/5.png"}
                width={128}
                height={128}
                alt="Profile Picture"
                className="h-6 w-6 rounded-full"
              />
              <strong className="max-w-24 truncate text-gray-300">{session.user.name}</strong>
            </div>
          )}
          <div className="flex w-full items-center justify-center">
            <Link
              href="/"
              className="underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-300 hover:decoration-gray-400"
            >
              Home
            </Link>
            <Separator orientation="vertical" className="mx-4 h-6 w-px bg-gray-600 dark:bg-gray-600" />
            <a
              href="https://discord.com/invite/cyberstudents-916144903686336513"
              className="underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-300 hover:decoration-gray-400"
            >
              Discord
            </a>
            <Separator orientation="vertical" className="mx-4 h-6 w-px bg-gray-600 dark:bg-gray-600" />
            <SignInOutButton session={session} />
          </div>
        </div>
      </div>
      <div className="mx-4 text-center text-gray-400">
        <p className="mb-1 text-xl">🐙</p>
        <p>
          If you believe something is wrong, please contact{" "}
          <a
            href="https://discord.com/users/972742287291449365"
            className="not-prose rounded-sm bg-[rgba(88,101,242,0.3)] px-1 font-medium text-nowrap text-[rgb(222,224,252)] transition-colors hover:bg-[rgba(88,101,242,0.6)]"
          >
            @GodderE2D
          </a>{" "}
          on Discord or email{" "}
          <a
            href="mailto:admin@cyberstudents.net"
            className="font-bold text-gray-300 underline transition-colors hover:text-gray-200"
          >
            admin@cyberstudents.net
          </a>
          .
        </p>
      </div>
    </main>
  );
}
