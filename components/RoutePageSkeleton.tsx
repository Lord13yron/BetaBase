import { Skeleton } from "./ui/skeleton";

export default function RoutePageSkeleton() {
  return (
    <>
      <nav className="flex items-center gap-2 px-10 py-5 border-b border-fog sm:text-[11px] text-[6px] tracking-widest uppercase text-stone">
        {/* <div className="w-10 h-3 bg-stone/50 rounded" /> */}
        <Skeleton className="w-10 h-3 bg-stone/50 rounded" />
        <span>/</span>
        <Skeleton className="w-16 h-3 bg-stone/50 rounded" />
        <span>/</span>
        <Skeleton className="w-16 h-4 bg-stone/50 rounded" />
      </nav>

      {/* ── Route Header ── */}
      <header className="flex items-start justify-between flex-wrap gap-6 px-10 py-10 bg-granite border-b-[3px] border-clay">
        {/* Left: grade + title */}
        <div className="flex items-center gap-6">
          <Skeleton className="w-16 h-16 bg-white/20 rounded" />
          <div className="flex flex-col gap-1">
            <Skeleton className="w-48 h-6 bg-white/20 rounded" />
            <Skeleton className="w-32 h-4 bg-white/20 rounded" />
          </div>
        </div>

        {/* Right: meta pills */}
        <div className="flex flex-wrap items-center gap-2 self-center">
          <Skeleton className="w-[100px] h-8 bg-white/20 rounded-full" />
          <Skeleton className="w-[100px] h-8 bg-white/20 rounded-full" />
          <Skeleton className="w-[100px] h-8 bg-white/20 rounded-full" />
        </div>
      </header>

      <div className="min-h-screen bg-chalk font-mono text-granite pb-20">
        <div className="px-10 pt-10">
          <div className="flex items-center justify-between mb-16">
            <Skeleton className="h-5 w-32 rounded bg-stone/50 animate-pulse" />
            <Skeleton className="h-8 w-32 rounded-full border border-stone/50 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div className="flex flex-col " key={i}>
                <div
                  key={i}
                  className="aspect-video rounded-t-lg bg-stone/50 animate-pulse"
                />
                <div className="w-full h-20 rounded-b-lg bg-stone/50 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
