import { Skeleton } from "./ui/skeleton";

export default function GymSectionMainSkeleton() {
  return (
    <section className="w-full py-24 px-6 bg-sand">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-clay block mb-3">
              Supported gyms
            </span>
            <h2 className="font-serif text-4xl text-[#3A3330]">
              Your gym is here.
            </h2>
          </div>
          <button className="text-[10px] tracking-widest uppercase text-stone hover:text-granite transition-colors border-b border-[#8C7B6B]/30 pb-0.5 self-start md:self-auto">
            Add your gym →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-chalk border border-fog rounded-xl p-5 animate-pulse"
            >
              <Skeleton className="w-8 h-8 rounded-full bg-granite mb-3" />
              <Skeleton className="h-4 bg-granite rounded w-3/4 mb-2" />
              <Skeleton className="h-3 bg-granite rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
