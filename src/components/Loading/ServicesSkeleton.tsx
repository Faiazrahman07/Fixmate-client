import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesSkeleton() {
  return (
    <div
      className="min-h-screen bg-gray-50 px-4 py-12"
      aria-busy="true"
      aria-label="Loading services"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <Skeleton className="h-9 w-64 max-w-full" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 rounded-xl border bg-white p-5 shadow-sm md:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-12 w-full rounded-lg" />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            >
              <Skeleton className="h-56 w-full rounded-none" />

              <div className="p-5">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="mt-4 h-6 w-3/4" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-2/3" />
                <Skeleton className="mt-4 h-4 w-28" />

                <div className="mt-5 flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>

                  <Skeleton className="h-10 w-28 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
