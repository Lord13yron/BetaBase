// import { Route, VideoWithDetails } from "@/app/types/types";
// import Link from "next/link";

// type RoutePageHeaderProps = {
//   route: Route;
//   gym: string;
//   videos: VideoWithDetails[];
// };

// const COLOR_SWATCHES: Record<string, { bg: string; label: string }> = {
//   white: { bg: "#F5EFE6", label: "White" },
//   black: { bg: "#2A2320", label: "Black" },
//   red: { bg: "#C0392B", label: "Red" },
//   blue: { bg: "#2980B9", label: "Blue" },
//   green: { bg: "#27AE60", label: "Green" },
//   yellow: { bg: "#F1C40F", label: "Yellow" },
//   orange: { bg: "#E67E22", label: "Orange" },
//   purple: { bg: "#8E44AD", label: "Purple" },
//   pink: { bg: "#E91E8C", label: "Pink" },
// };

// function HoldSwatch({ color }: { color: string }) {
//   const swatch = COLOR_SWATCHES[color.toLowerCase()] ?? {
//     bg: "#8C7B6B",
//     label: color,
//   };
//   return (
//     <span className="flex items-center gap-2 text-fog text-[11px] tracking-widest uppercase">
//       <span
//         className="w-3 h-3 rounded-full border border-white/20 shrink-0"
//         style={{ backgroundColor: swatch.bg }}
//       />
//       {swatch.label}
//     </span>
//   );
// }

// export default function RoutePageHeader({
//   route,
//   gym,
//   videos,
// }: RoutePageHeaderProps) {
//   const gymName = gym.split("-").slice(0, -1).join(" "); // remove trailing routeId from gymId param
//   return (
//     <>
//       <nav className="flex items-center gap-2 px-10 py-5 border-b border-fog sm:text-[11px] text-[6px] tracking-widest uppercase text-stone">
//         <Link href="/gyms" className="hover:text-clay transition-colors">
//           Gyms
//         </Link>
//         <span>/</span>
//         <Link
//           href={`/gyms/${gym}`}
//           className="hover:text-clay transition-colors"
//         >
//           {gymName}
//         </Link>
//         <span>/</span>
//         <span className="text-granite font-medium">{route.name}</span>
//       </nav>

//       {/* ── Route Header ── */}
//       <header className="flex items-start justify-between flex-wrap gap-6 px-10 py-10 bg-granite border-b-[3px] border-clay">
//         {/* Left: grade + title */}
//         <div className="flex items-center gap-6">
//           <span className="font-serif text-5xl text-clay leading-none min-w-[72px] text-center">
//             {route.grade}
//           </span>
//           <div className="flex flex-col gap-1">
//             <h1 className="font-serif text-3xl text-chalk leading-tight tracking-tight">
//               {route.name}
//             </h1>
//             <p className="text-[11px] tracking-[0.18em] uppercase text-stone">
//               {gymName} - {route.wall_name}
//             </p>
//           </div>
//         </div>

//         {/* Right: meta pills */}
//         <div className="flex flex-wrap items-center gap-2 self-center">
//           {/* Wall */}
//           <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.12] text-[11px] tracking-widest text-fog">
//             <svg
//               width="12"
//               height="12"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <rect x="3" y="3" width="18" height="18" rx="2" />
//               <path d="M3 9h18M9 21V9" />
//             </svg>
//             {route.wall_name}
//           </div>

//           {/* Hold color */}
//           <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.12]">
//             <HoldSwatch color={route.color} />
//           </div>

//           {/* Video count */}
//           <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.12] text-[11px] tracking-widest text-fog">
//             <svg
//               width="12"
//               height="12"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <polygon points="5 3 19 12 5 21 5 3" />
//             </svg>
//             {videos.length} {videos.length === 1 ? "video" : "videos"}
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }

import { Route, VideoWithDetails } from "@/app/types/types";
import { HOLD_COLORS } from "@/lib/utils";
import Link from "next/link";

type RoutePageHeaderProps = {
  route: Route;
  gym: string;
  videos: VideoWithDetails[];
};

function HoldSwatch({ color }: { color: string }) {
  const colorName = HOLD_COLORS.find(
    (c) => c.hex.toLowerCase() === color.toLowerCase(),
  )?.name;

  return (
    <span className="flex items-center gap-2 text-fog text-[11px] tracking-widest uppercase">
      <span
        className="w-3 h-3 rounded-full border border-white/20 shrink-0"
        style={{ backgroundColor: color }}
      />
      {colorName}
    </span>
  );
}

export default function RoutePageHeader({
  route,
  gym,
  videos,
}: RoutePageHeaderProps) {
  const gymName = gym.split("-").slice(0, -1).join(" "); // remove trailing routeId from gymId param
  return (
    <>
      <nav className="flex items-center gap-2 px-10 py-5 border-b border-fog sm:text-[11px] text-[6px] tracking-widest uppercase text-stone">
        <Link href="/gyms" className="hover:text-clay transition-colors">
          Gyms
        </Link>
        <span>/</span>
        <Link
          href={`/gyms/${gym}`}
          className="hover:text-clay transition-colors"
        >
          {gymName}
        </Link>
        <span>/</span>
        <span className="text-granite font-medium">{route.name}</span>
      </nav>

      {/* ── Route Header ── */}
      <header className="flex items-start justify-between flex-wrap gap-6 px-10 py-10 bg-granite border-b-[3px] border-clay">
        {/* Left: grade + title */}
        <div className="flex items-center gap-6">
          <span className="font-serif text-5xl text-clay leading-none min-w-[72px] text-center">
            {route.grade}
          </span>
          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-3xl text-chalk leading-tight tracking-tight">
              {route.name}
            </h1>
            <p className="text-[11px] tracking-[0.18em] uppercase text-stone">
              {gymName} - {route.wall_name}
            </p>
          </div>
        </div>

        {/* Right: meta pills */}
        <div className="flex flex-wrap items-center gap-2 self-center">
          {/* Wall */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.12] text-[11px] tracking-widest text-fog">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            {route.wall_name}
          </div>

          {/* Hold color */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.12]">
            <HoldSwatch color={route.color} />
          </div>

          {/* Video count */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.12] text-[11px] tracking-widest text-fog">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            {videos.length} {videos.length === 1 ? "video" : "videos"}
          </div>
        </div>
      </header>
    </>
  );
}
