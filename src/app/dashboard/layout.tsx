import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mt-10 mb-12 flex flex-col gap-4 sm:mb-24 lg:ml-12 lg:flex-row lg:gap-12 xl:ml-20 xl:gap-20">
        <nav className="mt-8 self-center text-center lg:w-52 lg:self-start lg:text-left">
          <h1 className="text-2xl font-bold text-gray-400">Dashboard</h1>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/dashboard" className="text-gray-300 hover:text-cyan-300">
              Dashboard
            </Link>
            <Link href="/dashboard/users" className="text-gray-300 hover:text-cyan-300">
              Users
            </Link>
            <Link href="/dashboard/challenges" className="text-gray-300 hover:text-cyan-300">
              Challenges
            </Link>
            <Link href="/dashboard/write-ups" className="text-gray-300 hover:text-cyan-300">
              Write-ups
            </Link>
            <Link href="/dashboard/verifications" className="text-gray-300 hover:text-cyan-300">
              Verifications
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">it&apos;d be a miracle if i got this done before christmas</p>
        </nav>
        {children}
      </div>
    </>
  );
}
