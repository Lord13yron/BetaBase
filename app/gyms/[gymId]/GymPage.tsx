// "use client";

// import { Gym, Route, Wall } from "@/app/types/types";
// import GymRouteCard from "@/components/GymRouteCard";
// import WallFilter from "@/components/WallFilter";
// import Link from "next/link";
// import { useState } from "react";

// export function IconSearch() {
//   return (
//     <svg
//       width="13"
//       height="13"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.35-4.35" />
//     </svg>
//   );
// }

// export function IconPin() {
//   return (
//     <svg
//       width="11"
//       height="11"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//     >
//       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
//       <circle cx="12" cy="10" r="3" />
//     </svg>
//   );
// }

// export function IconChevron() {
//   return (
//     <svg
//       width="10"
//       height="10"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//     >
//       <polyline points="9 18 15 12 9 6" />
//     </svg>
//   );
// }

// type GymPageProps = {
//   GYM: Gym;
//   ROUTES: Route[];
//   WALLS: Wall[];
//   isAdmin?: boolean;
// };

// export default function GymPage({ GYM, ROUTES, WALLS, isAdmin }: GymPageProps) {
//   const [search, setSearch] = useState("");
//   // const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
//   const [wallFilter, setWallFilter] = useState<number | null>(null);
//   const sortedRoutes = [...ROUTES].sort(
//     (a, b) => Number(a.grade.split("V")[1]) - Number(b.grade.split("V")[1]),
//   );

//   const filtered = sortedRoutes.filter((r) => {
//     const matchSearch =
//       r.name.toLowerCase().includes(search.toLowerCase()) ||
//       r.grade.toLowerCase().includes(search.toLowerCase());
//     // const matchType = typeFilter === "All" || r.type === typeFilter;
//     const matchWall = wallFilter === null || r.wall_id === wallFilter;
//     return matchSearch && matchWall;
//   });

//   return (
//     <div className="min-h-screen bg-chalk text-granite font-mono">
//       {/* ── Hero ── */}
//       <div className="bg-granite relative overflow-hidden">
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(ellipse 70% 100% at 0% 100%, rgba(193,122,90,0.1) 0%, transparent 60%)",
//           }}
//         />
//         <div className="relative max-w-5xl mx-auto px-8 pt-12 pb-10 flex flex-wrap justify-between items-end gap-8">
//           {/* Left */}
//           <div>
//             <div className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-stone mb-4">
//               <Link href="/gyms" className="hover:text-clay transition-colors">
//                 <span>Gyms</span>
//               </Link>
//               <IconChevron />
//               <span className="text-clay">{GYM.name}</span>
//             </div>
//             <h1 className="font-serif text-chalk text-5xl tracking-tight leading-none mb-3">
//               {GYM.name}
//             </h1>
//             <div className="flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-stone">
//               <IconPin />
//               {GYM.city}, {GYM.province}
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="flex flex-col  gap-8 ">
//             {isAdmin && (
//               <Link
//                 href={`/admin/${GYM.slug}-${GYM.id}`}
//                 // className="font-mono text-xs text-stone tracking-widest uppercase border border-fog rounded-lg px-4 py-2 hover:border-stone hover:text-granite transition-colors"
//                 className="font-mono text-xs text-stone tracking-widest uppercase border border-fog rounded-lg px-4 py-2 hover:border-clay hover:text-clay hover:bg-clay/10 transition-colors"
//               >
//                 Manage Gym →
//               </Link>
//             )}
//             <div className="flex items-stretch gap-8 flex-shrink-0">
//               <div className="flex flex-col items-end gap-1">
//                 <span className="font-serif text-chalk text-4xl leading-none">
//                   {GYM.route_count}
//                 </span>
//                 <span className="text-[9px] tracking-[0.2em] uppercase text-stone">
//                   Routes
//                 </span>
//               </div>
//               <div className="w-px bg-white/10" />
//               <div className="flex flex-col items-end gap-1">
//                 <span className="font-serif text-chalk text-4xl leading-none">
//                   {GYM.video_count}
//                 </span>
//                 <span className="text-[9px] tracking-[0.2em] uppercase text-stone">
//                   Videos
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Content ── */}
//       <div className="max-w-5xl mx-auto px-8">
//         {/* Toolbar */}
//         <div className="pt-7">
//           <div className="flex flex-wrap items-center gap-3">
//             {/* Search */}
//             <div className="relative flex-1 min-w-[180px] max-w-xs">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone pointer-events-none">
//                 <IconSearch />
//               </span>
//               <input
//                 type="text"
//                 placeholder="Search routes..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full bg-white border border-fog rounded-lg pl-8 pr-3 py-2 text-[11px] tracking-[0.06em] text-granite placeholder:text-stone outline-none focus:border-clay transition-colors font-mono"
//               />
//             </div>

//             {/* Divider */}
//             <div className="w-px h-5 bg-fog" />

//             {/* Type filters */}
//             <div className="flex gap-1.5 flex-wrap">
//               {/* {TYPE_FILTERS.map((t) => (
//                 <button
//                   key={t}
//                   onClick={() => setTypeFilter(t)}
//                   className={`text-[9px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer font-mono
//                     ${
//                       typeFilter === t
//                         ? "bg-granite border-granite text-chalk"
//                         : "bg-transparent border-fog text-stone hover:border-stone hover:text-granite"
//                     }`}
//                 >
//                   {t}
//                 </button>
//               ))} */}
//               <WallFilter
//                 walls={WALLS} // pass from Supabase fetch
//                 selected={wallFilter}
//                 onChange={setWallFilter}
//               />
//             </div>

//             {/* Results count */}
//             <span className="ml-auto text-[9px] tracking-[0.18em] uppercase text-stone whitespace-nowrap">
//               {filtered.length} route{filtered.length !== 1 ? "s" : ""}
//             </span>
//           </div>
//         </div>

//         {/* Grid */}
//         <div className="py-7">
//           {filtered.length > 0 ? (
//             <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3">
//               {filtered.map((route) => (
//                 <GymRouteCard key={route.id} route={route} gym={GYM} />
//               ))}
//             </div>
//           ) : (
//             <div className="flex flex-col items-center gap-3 py-20 text-stone">
//               <span className="font-serif text-granite text-2xl">
//                 No routes found
//               </span>
//               <span className="text-[11px] tracking-[0.1em]">
//                 Try adjusting your filters
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Gym, Route, Wall } from "@/app/types/types";
import GymRouteCard from "@/components/GymRouteCard";
import WallFilter from "@/components/WallFilter";
import { createClient } from "@/lib/supabase/client";
import { gradeToNumber } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export function IconSearch() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export function IconPin() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function IconChevron() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

type GymPageProps = {
  GYM: Gym;
  ROUTES: Route[];
  WALLS: Wall[];
};

export default function GymPage({ GYM, ROUTES, WALLS }: GymPageProps) {
  const [search, setSearch] = useState("");
  // const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [wallFilter, setWallFilter] = useState<number | null>(null);

  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   const supabase = createClient();
  //   supabase.auth.getUser().then(({ data: { user } }) => {
  //     if (!user) return;
  //     supabase
  //       .from("gym_admins")
  //       .select("id")
  //       .eq("gym_id", GYM.id)
  //       .eq("user_id", user.id)
  //       .single()
  //       .then(({ data }) => setIsAdmin(!!data));
  //   });
  // }, [GYM.id]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;

      Promise.all([
        supabase
          .from("gym_admins")
          .select("id")
          .eq("gym_id", GYM.id)
          .eq("user_id", user.id)
          .single(),
        supabase
          .from("user_profiles")
          .select("is_superuser")
          .eq("id", user.id)
          .single(),
      ]).then(([{ data: adminData }, { data: profileData }]) => {
        setIsAdmin(!!adminData || !!profileData?.is_superuser);
      });
    });
  }, [GYM.id]);

  // const sortedRoutes = [...ROUTES].sort(
  //   (a, b) => Number(a.grade.split("V")[1]) - Number(b.grade.split("V")[1]),
  // );
  const sortedRoutes = [...ROUTES].sort(
    (a, b) => gradeToNumber(a.grade) - gradeToNumber(b.grade),
  );

  const filtered = sortedRoutes.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.grade.toLowerCase().includes(search.toLowerCase());
    // const matchType = typeFilter === "All" || r.type === typeFilter;
    const matchWall = wallFilter === null || r.wall_id === wallFilter;
    return matchSearch && matchWall;
  });

  return (
    <div className="min-h-screen bg-chalk text-granite font-mono">
      {/* ── Hero ── */}
      <div className="bg-granite relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 0% 100%, rgba(193,122,90,0.1) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-8 pt-12 pb-10 flex flex-wrap justify-between items-end gap-8">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-stone mb-4">
              <Link href="/gyms" className="hover:text-clay transition-colors">
                <span>Gyms</span>
              </Link>
              <IconChevron />
              <span className="text-clay">{GYM.name}</span>
            </div>
            <h1 className="font-serif text-chalk text-5xl tracking-tight leading-none mb-3">
              {GYM.name}
            </h1>
            <div className="flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-stone">
              <IconPin />
              {GYM.city}, {GYM.province}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col  gap-8 ">
            {isAdmin && (
              <Link
                href={`/admin/${GYM.slug}-${GYM.id}`}
                // className="font-mono text-xs text-stone tracking-widest uppercase border border-fog rounded-lg px-4 py-2 hover:border-stone hover:text-granite transition-colors"
                className="font-mono text-xs text-stone tracking-widest uppercase border border-fog rounded-lg px-4 py-2 hover:border-clay hover:text-clay hover:bg-clay/10 transition-colors"
              >
                Manage Gym →
              </Link>
            )}
            <div className="flex items-stretch gap-8 flex-shrink-0">
              <div className="flex flex-col items-end gap-1">
                <span className="font-serif text-chalk text-4xl leading-none">
                  {GYM.route_count}
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-stone">
                  Routes
                </span>
              </div>
              <div className="w-px bg-white/10" />
              <div className="flex flex-col items-end gap-1">
                <span className="font-serif text-chalk text-4xl leading-none">
                  {GYM.video_count}
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-stone">
                  Videos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-8">
        {/* Toolbar */}
        <div className="pt-7">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone pointer-events-none">
                <IconSearch />
              </span>
              <input
                type="text"
                placeholder="Search routes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-fog rounded-lg pl-8 pr-3 py-2 text-[11px] tracking-[0.06em] text-granite placeholder:text-stone outline-none focus:border-clay transition-colors font-mono"
              />
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-fog" />

            {/* Type filters */}
            <div className="flex gap-1.5 flex-wrap">
              {/* {TYPE_FILTERS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`text-[9px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer font-mono
                    ${
                      typeFilter === t
                        ? "bg-granite border-granite text-chalk"
                        : "bg-transparent border-fog text-stone hover:border-stone hover:text-granite"
                    }`}
                >
                  {t}
                </button>
              ))} */}
              <WallFilter
                walls={WALLS} // pass from Supabase fetch
                selected={wallFilter}
                onChange={setWallFilter}
              />
            </div>

            {/* Results count */}
            <span className="ml-auto text-[9px] tracking-[0.18em] uppercase text-stone whitespace-nowrap">
              {filtered.length} route{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="py-7">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3">
              {filtered.map((route) => (
                <GymRouteCard key={route.id} route={route} gym={GYM} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-20 text-stone">
              <span className="font-serif text-granite text-2xl">
                No routes found
              </span>
              <span className="text-[11px] tracking-[0.1em]">
                Try adjusting your filters
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
