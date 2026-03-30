// "use client";
// import { ClimbType, Gym } from "@/app/types/types";
// import { GymCard } from "@/components/gymCard";
// import { useMemo, useState } from "react";

// type GymsClientProps = {
//   gyms: Gym[];
// };

// const ALL_TAGS = ["All", "Bouldering", "Lead", "Top Rope"] as const;
// type TagFilter = (typeof ALL_TAGS)[number];

// export default function GymsClient({ gyms }: GymsClientProps) {
//   const [search, setSearch] = useState<string>("");
//   const [activeTag, setActiveTag] = useState<TagFilter>("All");

//   const filtered = useMemo<Gym[]>(() => {
//     const q = search.toLowerCase();
//     return gyms.filter((gym) => {
//       const matchesSearch =
//         gym.name.toLowerCase().includes(q) ||
//         gym.city.toLowerCase().includes(q) ||
//         gym.province.toLowerCase().includes(q);
//       const matchesTag =
//         activeTag === "All" || gym.tags.includes(activeTag as ClimbType);
//       return matchesSearch && matchesTag;
//     });
//   }, [search, activeTag, gyms]);

//   return (
//     <div className="min-h-screen bg-chalk">
//       {/* Header */}
//       <div className="px-10 pt-14">
//         <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone mb-3">
//           — Find Your Gym
//         </p>
//         <h1 className="font-serif text-5xl leading-tight text-granite max-w-xl mb-2">
//           Every gym. <span className="italic text-clay">Every route.</span>
//         </h1>
//         <p className="font-mono font-light text-sm text-stone leading-relaxed max-w-md">
//           Select a gym to browse community-uploaded beta videos for every climb.
//         </p>
//       </div>

//       {/* Controls */}
//       <div className="flex flex-wrap items-center gap-3 px-10 pt-8 pb-6">
//         {/* Search */}
//         <div className="relative flex-1 min-w-[260px] max-w-sm">
//           <svg
//             className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
//             width="13"
//             height="13"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="#8C7B6B"
//             strokeWidth="2"
//           >
//             <circle cx="11" cy="11" r="8" />
//             <path d="m21 21-4.35-4.35" />
//           </svg>
//           <input
//             type="text"
//             placeholder="Search gym or city..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-9 pr-4 h-10 border border-fog rounded-lg bg-white font-mono text-xs text-granite placeholder:text-stone focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition-all"
//           />
//         </div>

//         {/* Tag filters */}
//         <div className="flex gap-1.5">
//           {ALL_TAGS.map((tag) => (
//             <button
//               key={tag}
//               onClick={() => setActiveTag(tag)}
//               className={`font-mono text-[10px] tracking-widest uppercase px-3.5 py-2 rounded-full border transition-all duration-150 cursor-pointer ${
//                 activeTag === tag
//                   ? "border-clay bg-clay text-white"
//                   : "border-fog text-stone hover:border-stone"
//               }`}
//             >
//               {tag}
//             </button>
//           ))}
//         </div>

//         {/* Result count */}
//         <span className="font-mono text-[10px] tracking-wide text-stone ml-auto">
//           {filtered.length} gym{filtered.length !== 1 ? "s" : ""}
//         </span>
//       </div>

//       {/* Grid */}
//       <div className="px-10 pb-20">
//         {filtered.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//             {filtered.map((gym, i) => (
//               <GymCard key={gym.id} gym={gym} index={i} />
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center py-24 gap-2">
//             <p className="font-serif text-2xl text-stone">No gyms found</p>
//             <p className="font-mono text-xs text-fog">
//               Try a different search or filter.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { ClimbType, Gym } from "@/app/types/types";
import { GymCard } from "@/components/gymCard";
import { useMemo, useState } from "react";

type GymsClientProps = {
  gyms: Gym[];
};

const ALL_TAGS = ["All", "Bouldering", "Lead", "Top Rope"] as const;
type TagFilter = (typeof ALL_TAGS)[number];

export default function GymsClient({ gyms }: GymsClientProps) {
  const [search, setSearch] = useState<string>("");
  const [activeTag, setActiveTag] = useState<TagFilter>("All");

  const filtered = useMemo<Gym[]>(() => {
    const q = search.toLowerCase();
    return gyms.filter((gym) => {
      const matchesSearch =
        gym.name.toLowerCase().includes(q) ||
        gym.city.toLowerCase().includes(q) ||
        gym.province.toLowerCase().includes(q);
      const matchesTag =
        activeTag === "All" || gym.tags.includes(activeTag as ClimbType);
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag, gyms]);

  return (
    <>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 px-10 pt-8 pb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[260px] max-w-sm">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8C7B6B"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search gym or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 h-10 border border-fog rounded-lg bg-white font-mono text-xs text-granite placeholder:text-stone focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition-all"
          />
        </div>

        {/* Tag filters */}
        <div className="flex gap-1.5">
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`font-mono text-[10px] tracking-widest uppercase px-3.5 py-2 rounded-full border transition-all duration-150 cursor-pointer ${
                activeTag === tag
                  ? "border-clay bg-clay text-white"
                  : "border-fog text-stone hover:border-stone"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Result count */}
        <span className="font-mono text-[10px] tracking-wide text-stone ml-auto">
          {filtered.length} gym{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      <div className="px-10 pb-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((gym, i) => (
              <GymCard key={gym.id} gym={gym} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-24 gap-2">
            <p className="font-serif text-2xl text-stone">No gyms found</p>
            <p className="font-mono text-xs text-fog">
              Try a different search or filter.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
