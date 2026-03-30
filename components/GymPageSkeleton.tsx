import { Skeleton } from "./ui/skeleton";

export default function GymPageSkeleton() {
  return (
    <div className="min-h-screen bg-chalk">
      {/* Hero */}
      <div className="bg-granite relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-8 pt-12 pb-10 flex flex-wrap justify-between items-end gap-8">
          {/* Left */}
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-12 w-48 mb-3" />
            <Skeleton className="h-4 w-28" />
          </div>
          {/* Stats */}
          <div className="flex items-stretch gap-8 flex-shrink-0">
            <div className="flex flex-col items-end gap-1">
              <Skeleton className="h-10 w-10 mb-1" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="w-px bg-white/10" />
            <div className="flex flex-col items-end gap-1">
              <Skeleton className="h-10 w-10 mb-1" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="max-w-5xl mx-auto px-8">
        {/* Toolbar */}
        <div className="pt-7">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <Skeleton className="h-8 w-56 sm:w-72" />
            <div className="w-px h-5 bg-fog" />
            <div className="flex gap-1.5 flex-wrap">
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-16  ml-auto" />
          </div>
        </div>
        {/* Route List */}
        <div className="py-7">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
