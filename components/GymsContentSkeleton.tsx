import { Skeleton } from "./ui/skeleton";

export default function GymsContentSkeleton() {
  return (
    <>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 px-10 pt-8 pb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[260px] max-w-sm">
          <Skeleton className="h-10 w-full" />
        </div>
        {/* Tag filters */}
        <div className="flex gap-1.5">
          <Skeleton className="h-8 w-12 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-[72px] rounded-full" />
          <Skeleton className="h-8 w-[88px] rounded-full" />
        </div>
        {/* Count */}
        <div className="ml-auto">
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
      {/* Grid */}
      <div className="px-10 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-60 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </>
  );
}
