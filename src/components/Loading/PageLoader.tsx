import { Wrench } from "lucide-react";

import { Spinner } from "@/components/ui/spinner";

interface PageLoaderProps {
  label?: string;
}

export default function PageLoader({
  label = "Loading FixMate...",
}: PageLoaderProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-20">
      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/25">
          <Wrench size={34} />

          <span className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-white shadow-sm">
            <Spinner className="size-4 text-blue-600" />
          </span>
        </div>

        <p className="mt-7 text-base font-semibold text-gray-900">{label}</p>

        <p className="mt-1 text-sm text-gray-500">
          Getting your tools ready. Please wait a moment.
        </p>

        <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600" />
        </div>
      </div>
    </section>
  );
}
