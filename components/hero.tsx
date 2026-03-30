"use client";
import { IconSearch } from "@/app/gyms/[gymId]/GymPage";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconChevronDown } from "./WallFilter";

function IconPlay() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

const ROUTES = [
  {
    grade: "V7",
    name: "Red V7",
    wall: "Slab",
    videos: 8,
    color: "red",
  },
  {
    grade: "5.11c",
    name: "Black 5.11c",
    wall: "Top Rope",
    videos: 3,
    color: "black",
  },
  {
    grade: "V4",
    name: "Blue V4",
    wall: "45°",
    videos: 11,
    color: "blue",
  },
  {
    grade: "V9",
    name: "Yellow V9",
    wall: "The Cave",
    videos: 5,
    color: "yellow",
  },
];

export function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export function Hero() {
  const heroFade = useFadeIn();

  return (
    <section className="w-full relative min-h-screen flex  bg-[#3A3330] overflow-hidden ">
      {/* Radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C17A5A]/10 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={heroFade.ref}
        className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16  w-full"
        style={{
          opacity: heroFade.visible ? 1 : 0,
          transform: heroFade.visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#C17A5A]/15 border border-[#C17A5A]/30 rounded-full px-3 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C17A5A] animate-pulse" />
            <span className="text-[10px] tracking-widest uppercase text-[#C17A5A]">
              Beta for every gym
            </span>
          </div>

          <h1 className="font-serif text-[#F5EFE6] text-5xl lg:text-6xl leading-[1.05] mb-6">
            Every route
            <br />
            has a secret.
            <br />
            <em className="text-[#C17A5A] not-italic">Find yours.</em>
          </h1>

          <p className="font-mono text-[#8C7B6B] text-sm leading-relaxed mb-10 max-w-md font-light">
            BetaBase is the community platform for climbing gym beta videos.
            Watch how others solve the crux, upload your own sends, and help
            every climber in your gym get better.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/gyms">
              <button className="bg-[#C17A5A] text-white text-[11px] tracking-widest uppercase px-7 py-3.5 rounded-full hover:bg-[#A0522D] transition-colors duration-300 font-medium">
                Browse Gyms
              </button>
            </Link>
            <Link href="/upload">
              <button className="border border-[#8C7B6B]/40 text-[#F5EFE6] text-[11px] tracking-widest uppercase px-7 py-3.5 rounded-full hover:border-[#F5EFE6]/40 transition-colors duration-300">
                Upload Beta ↑
              </button>
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div>
              <div className="font-serif text-[#F5EFE6] text-2xl">12k+</div>
              <div className="font-mono text-[9px] tracking-widest uppercase text-[#8C7B6B] mt-0.5">
                Beta videos
              </div>
            </div>
            <div className="w-px h-8 bg-[#8C7B6B]/30" />
            <div>
              <div className="font-serif text-[#F5EFE6] text-2xl">340+</div>
              <div className="font-mono text-[9px] tracking-widest uppercase text-[#8C7B6B] mt-0.5">
                Gyms listed
              </div>
            </div>
            <div className="w-px h-8 bg-[#8C7B6B]/30" />
            <div>
              <div className="font-serif text-[#F5EFE6] text-2xl">8k+</div>
              <div className="font-mono text-[9px] tracking-widest uppercase text-[#8C7B6B] mt-0.5">
                Climbers
              </div>
            </div>
          </div>
        </div>

        {/* Right: fake UI mockup */}
        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 bg-[#C17A5A]/5 rounded-3xl blur-2xl" />
          <div className="relative bg-[#2A2420] rounded-2xl border border-white/8 overflow-hidden shadow-2xl">
            {/* Mockup nav */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/6">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C17A5A]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#8C7B6B]/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#8C7B6B]/40" />
              <div className="flex-1 mx-4 bg-white/5 rounded-full h-5 flex items-center px-3">
                <span className="text-[9px] text-[#8C7B6B] tracking-wide">
                  betabase.app/gyms/example-gym
                </span>
              </div>
            </div>

            <div className="bg-chalk text-granite font-mono">
              {/* ── Content ── */}
              <div className="max-w-5xl mx-auto px-8">
                {/* Toolbar */}

                <div className="flex flex-wrap items-center gap-3 pt-7">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[180px] max-w-xs">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone pointer-events-none">
                      <IconSearch />
                    </span>
                    <input
                      type="text"
                      placeholder="Search routes..."
                      disabled
                      className="w-full bg-white border border-fog rounded-lg pl-8 pr-3 py-2 text-[11px] tracking-[0.06em] text-granite placeholder:text-stone outline-none focus:border-clay transition-colors font-mono"
                    />
                  </div>

                  {/* Divider */}
                  <div className="w-px h-5 bg-fog" />

                  {/* Type filters */}
                  <div className="flex gap-1.5 flex-wrap">
                    <button
                      className={`flex items-center gap-2 text-[9px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border  cursor-pointer font-mono bg-transparent border-fog text-stone hover:border-stone hover:text-granite`}
                    >
                      Wall
                      <IconChevronDown />
                    </button>
                  </div>

                  {/* Results count */}
                  <span className="ml-auto text-[9px] tracking-[0.18em] uppercase text-stone whitespace-nowrap">
                    90 routes
                  </span>
                </div>

                {/* Grid */}
                <div className="py-7">
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3">
                    {ROUTES.map((route) => (
                      <div
                        key={route.name}
                        className="bg-white border border-fog rounded-xl cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:border-clay hover:shadow-lg"
                      >
                        <div className="p-[18px]">
                          {/* Grade + hold color dot */}
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-clay text-[15px] font-medium tracking-tight font-mono">
                              {route.grade}
                            </span>
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/10 flex-shrink-0 "
                              title={route.color}
                              style={{ backgroundColor: route.color }}
                            />
                          </div>

                          {/* Name */}
                          <div className="font-serif text-granite text-[16px] leading-snug mb-1.5">
                            {route.name}
                          </div>

                          {/* Wall tag */}
                          <div className="mb-3.5">
                            <span className="text-[8px] tracking-[0.2em] uppercase text-stone bg-chalk rounded px-1.5 py-0.5">
                              {route.wall}
                            </span>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-chalk">
                            <div className="flex items-center gap-1 text-clay bg-clay/10 text-[9px] tracking-[0.1em] px-2 py-1 rounded-full">
                              <IconPlay />
                              {route.videos} video
                              {route.videos !== 1 ? "s" : ""}
                            </div>
                            <span className="text-[9px] tracking-[0.08em] text-stone">
                              2024-05-12
                              {/* Display only the date part */}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[9px] tracking-widest uppercase text-[#8C7B6B]">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#8C7B6B] to-transparent" />
      </div>
    </section>
  );
}

//  <div className="min-h-screen bg-chalk text-granite font-mono">
//               {/* ── Hero ── */}
//               <div className="bg-granite relative overflow-hidden">
//                 <div
//                   className="absolute inset-0 pointer-events-none"
//                   style={{
//                     background:
//                       "radial-gradient(ellipse 70% 100% at 0% 100%, rgba(193,122,90,0.1) 0%, transparent 60%)",
//                   }}
//                 />
//                 <div className="relative max-w-5xl mx-auto px-8 pt-12 pb-10 flex flex-wrap justify-between items-end gap-8">
//                   {/* Left */}
//                   <div>
//                     <div className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-stone mb-4">
//                       <Link
//                         href="/gyms"
//                         className="hover:text-clay transition-colors"
//                       >
//                         <span>Gyms</span>
//                       </Link>
//                       {/* <IconChevron /> */}
//                       <span className="text-clay">Gneiss - OG</span>
//                     </div>
//                     <h1 className="font-serif text-chalk text-5xl tracking-tight leading-none mb-3">
//                       Gneiss - OG
//                     </h1>
//                     <div className="flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-stone">
//                       {/* <IconPin /> */}
//                       Kelowna, BC
//                     </div>
//                   </div>

//                   {/* Stats */}
//                   <div className="flex items-stretch gap-8 flex-shrink-0">
//                     <div className="flex flex-col items-end gap-1">
//                       <span className="font-serif text-chalk text-4xl leading-none">
//                         90
//                       </span>
//                       <span className="text-[9px] tracking-[0.2em] uppercase text-stone">
//                         Routes
//                       </span>
//                     </div>
//                     <div className="w-px bg-white/10" />
//                     <div className="flex flex-col items-end gap-1">
//                       <span className="font-serif text-chalk text-4xl leading-none">
//                         64
//                       </span>
//                       <span className="text-[9px] tracking-[0.2em] uppercase text-stone">
//                         Videos
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ── Content ── */}
//               <div className="max-w-5xl mx-auto px-8">
//                 {/* Toolbar */}
//                 <div className="pt-7">
//                   <div className="flex flex-wrap items-center gap-3">
//                     {/* Search */}
//                     <div className="relative flex-1 min-w-[180px] max-w-xs">
//                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone pointer-events-none">
//                         {/* <IconSearch /> */}
//                       </span>
//                       <input
//                         type="text"
//                         placeholder="Search routes..."
//                         className="w-full bg-white border border-fog rounded-lg pl-8 pr-3 py-2 text-[11px] tracking-[0.06em] text-granite placeholder:text-stone outline-none focus:border-clay transition-colors font-mono"
//                       />
//                     </div>

//                     {/* Divider */}
//                     <div className="w-px h-5 bg-fog" />

//                     {/* Type filters */}
//                     <div className="flex gap-1.5 flex-wrap"></div>

//                     {/* Results count */}
//                     <span className="ml-auto text-[9px] tracking-[0.18em] uppercase text-stone whitespace-nowrap">
//                       90 routes
//                     </span>
//                   </div>
//                 </div>

//                 {/* Grid */}
//                 <div className="py-7">
//                   <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3">
//                     {ROUTES.map((route) => (
//                       <div
//                         key={route.name}
//                         className="bg-white border border-fog rounded-xl cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:border-clay hover:shadow-lg"
//                       >
//                         <div className="p-[18px]">
//                           {/* Grade + hold color dot */}
//                           <div className="flex items-center justify-between mb-2.5">
//                             <span className="text-clay text-[15px] font-medium tracking-tight font-mono">
//                               {route.grade}
//                             </span>
//                             <span
//                               className="w-2.5 h-2.5 rounded-full border border-black/10 flex-shrink-0"
//                               title={route.color}
//                             />
//                           </div>

//                           {/* Name */}
//                           <div className="font-serif text-granite text-[16px] leading-snug mb-1.5">
//                             {route.name}
//                           </div>

//                           {/* Wall tag */}
//                           <div className="mb-3.5">
//                             <span className="text-[8px] tracking-[0.2em] uppercase text-stone bg-chalk rounded px-1.5 py-0.5">
//                               {route.gym}
//                             </span>
//                           </div>

//                           {/* Footer */}
//                           <div className="flex items-center justify-between pt-3 border-t border-chalk">
//                             <div className="flex items-center gap-1 text-clay bg-clay/10 text-[9px] tracking-[0.1em] px-2 py-1 rounded-full">
//                               <IconPlay />
//                               {route.videos} video
//                               {route.videos !== 1 ? "s" : ""}
//                             </div>
//                             <span className="text-[9px] tracking-[0.08em] text-stone">
//                               2024-05-12
//                               {/* Display only the date part */}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
