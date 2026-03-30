import { Skeleton } from "./ui/skeleton";

export default function RoutesGridSkeleton() {
  return (
    <section className="w-full py-24 px-6 bg-chalk">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Skeleton className="w-32 h-2.5 rounded bg-[#C17A5A]/30 mb-3" />
            <Skeleton className="w-48 h-8 rounded bg-[#3A3330]/20 mb-2" />
            <Skeleton className="w-36 h-6 rounded bg-[#8C7B6B]/20" />
          </div>
          <Skeleton className="w-56 h-3 rounded bg-[#8C7B6B]/20 self-start md:self-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#D6CAB8] bg-white shadow-sm p-4 animate-pulse"
            >
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="w-12 h-6 rounded-full bg-[#C17A5A]/20" />
                <Skeleton className="w-12 h-3 rounded bg-[#C17A5A]/20" />
              </div>
              <Skeleton className="w-3/4 h-5 rounded bg-[#3A3330]/15 mb-2" />
              <Skeleton className="w-1/2 h-3 rounded bg-[#8C7B6B]/20 mb-4" />
              <Skeleton className="w-24 h-3 rounded bg-[#8C7B6B]/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
