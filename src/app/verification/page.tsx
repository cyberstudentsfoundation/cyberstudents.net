import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import VerificationForm from "./form";

export default async function VerificationPage() {
  const session = await getServerAuthSession();

  let user = null;
  if (session?.user) {
    user = await api.user.me();
  }

  return (
    <main className="mx-4 md:mx-8 lg:mx-16">
      <div className="mt-24 flex justify-center">
        <div className="w-full max-w-screen-2xl">
          <div className="mb-8 max-w-3xl space-y-4">
            <h1 className="text-3xl font-bold">Identity verification</h1>
            <p>
              In order to win prizes for certain CyberStudents events, we will need to verify your identity. You may
              have to verify your identity again even if you have done so in the past.
            </p>
            <p>
              If you have any questions or prefer to verify your identity in a different way, please contact an
              administrator.
            </p>
            <p>
              All information and documents are stored securely and encrypted during transit and rest. They will be
              persisted for up to 30 days after the event ends, after which they will be deleted.
            </p>
            <p className="font-bold">You will only need to verify your identity if you are a potential prize winner.</p>
            <hr className="border-gray-700" />
          </div>
          <VerificationForm session={session} />
        </div>
      </div>
    </main>
  );
}
