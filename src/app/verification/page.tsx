import { getServerAuthSession } from "~/server/auth";
import VerificationForm from "./form";

export default async function VerificationPage() {
  const session = await getServerAuthSession();

  return (
    <main className="mx-4 mb-12 sm:mb-24 md:mx-8 lg:mx-16">
      <div className="mt-24 flex justify-center">
        <div className="w-full max-w-(--breakpoint-2xl)">
          <div className="mb-8 max-w-3xl space-y-4">
            <h1 className="text-3xl font-bold">Identity verification</h1>
            <p>
              In order to win prizes for certain CyberStudents events, we will need to verify your identity. You may
              have to verify your identity again even if you have done so in the past.
            </p>
            <p>
              If you have any questions or wish to verify your identity in a different way, please contact an
              administrator.
            </p>
            <p>
              All information and documents are stored securely and encrypted during transit and rest. They will be
              persisted for up to 30 days after the event ends, after which they will be deleted.
            </p>
            <p className="">You will only need to verify your identity if you are a potential prize winner.</p>
            <p>
              <strong>For Advent of CTF 2025</strong>: You do not need to re-verify your identity if you have already
              done so for a previous CyberStudents event. Vipin and GodderE2D are the only administrators who can access
              and review identity verifications for this event.
            </p>
            <p className="font-bold text-yellow-500">
              You only need to verify your identity if you have been contacted by an administrator requesting you to do
              so.
            </p>
            <hr className="border-gray-700" />
          </div>
          <VerificationForm session={session} />
        </div>
      </div>
    </main>
  );
}
