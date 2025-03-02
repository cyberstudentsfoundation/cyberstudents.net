import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <div className="mx-4 flex h-[calc(100vh-3.5rem)] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 font-serif text-4xl font-semibold tracking-wide text-gray-100">Page not found</h1>
          <p className="mb-4 text-lg text-gray-400">Sorry, the page you were looking for doesn&apos;t seem to exist.</p>
          <div className="flex w-full items-center justify-between">
            <Link href="/" className="underline transition-colors hover:text-gray-300">
              Go home
            </Link>
            <a
              href="https://discord.com/invite/cyberstudents-916144903686336513"
              className="underline transition-colors hover:text-gray-300"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
      <div className="mx-4 text-center text-gray-400">
        <p className="mb-1 text-xl">🐙</p>
        <p>
          if you insist, you can contact{" "}
          <a
            href="https://discord.com/users/972742287291449365"
            className="not-prose text-nowrap rounded-sm bg-[rgba(88,101,242,0.3)] px-1 font-medium text-[rgb(222,224,252)] transition-colors hover:bg-[rgba(88,101,242,0.6)]"
          >
            @GodderE2D
          </a>{" "}
          and he might grant your wish. or not.
        </p>
      </div>
    </main>
  );
}
