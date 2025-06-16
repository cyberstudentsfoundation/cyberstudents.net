import { ReactNode } from "react";

export default function Alert({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 w-full rounded-lg bg-yellow-500/30 px-6 py-px">
      <span>{children}</span>
    </div>
  );
}
