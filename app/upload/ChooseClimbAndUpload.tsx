// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";

// // ─── Types ────────────────────────────────────────────────────────────────────

// type Gym = {
//   id: string;
//   name: string;
//   city: string;
//   province: string;
//   slug: string;
// };

// type Wall = {
//   id: string;
//   name: string;
// };

// type Route = {
//   id: string;
//   name: string;
//   grade: string;
// };

// type Step = "gym" | "wall" | "route";

// // ─── Step indicator ───────────────────────────────────────────────────────────

// const STEPS: { key: Step; label: string }[] = [
//   { key: "gym", label: "Gym" },
//   { key: "wall", label: "Wall" },
//   { key: "route", label: "Route" },
// ];

// function StepIndicator({ current }: { current: Step }) {
//   const currentIndex = STEPS.findIndex((s) => s.key === current);
//   return (
//     <div className="flex items-center gap-2 mb-10">
//       {STEPS.map((step, i) => {
//         const done = i < currentIndex;
//         const active = i === currentIndex;
//         return (
//           <div key={step.key} className="flex items-center gap-2">
//             <div className="flex items-center gap-1.5">
//               <div
//                 className={`
//                   w-5 h-5 rounded-full flex items-center justify-center
//                   font-mono text-[9px] tracking-widest transition-colors duration-200
//                   ${done ? "bg-clay text-chalk" : active ? "bg-granite text-chalk" : "bg-fog text-stone"}
//                 `}
//               >
//                 {done ? (
//                   <svg
//                     width="8"
//                     height="8"
//                     viewBox="0 0 10 10"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M2 5l2.5 2.5L8 3"
//                       stroke="currentColor"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 ) : (
//                   i + 1
//                 )}
//               </div>
//               <span
//                 className={`font-mono text-[9px] tracking-widest uppercase transition-colors duration-200 ${
//                   active ? "text-granite" : done ? "text-clay" : "text-fog"
//                 }`}
//               >
//                 {step.label}
//               </span>
//             </div>
//             {i < STEPS.length - 1 && (
//               <div
//                 className={`w-8 h-px transition-colors duration-300 ${done ? "bg-clay" : "bg-fog"}`}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ─── Selection card ───────────────────────────────────────────────────────────

// function SelectionCard({
//   label,
//   sublabel,
//   onClick,
// }: {
//   label: string;
//   sublabel?: string;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className="
//         w-full text-left px-5 py-4 rounded-xl
//         border border-fog bg-white/40
//         hover:border-stone hover:bg-sand/40
//         active:bg-sand
//         transition-all duration-150
//         group
//       "
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="font-mono text-sm text-granite font-medium group-hover:text-granite">
//             {label}
//           </div>
//           {sublabel && (
//             <div className="font-mono text-xs text-stone mt-0.5">
//               {sublabel}
//             </div>
//           )}
//         </div>
//         <svg
//           width="14"
//           height="14"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           className="text-fog group-hover:text-stone transition-colors shrink-0"
//         >
//           <path d="M9 18l6-6-6-6" />
//         </svg>
//       </div>
//     </button>
//   );
// }

// // ─── Skeleton loader ──────────────────────────────────────────────────────────

// function SkeletonList() {
//   return (
//     <div className="flex flex-col gap-2">
//       {[...Array(4)].map((_, i) => (
//         <div
//           key={i}
//           className="w-full h-[58px] rounded-xl bg-fog/50 animate-pulse"
//           style={{ animationDelay: `${i * 60}ms` }}
//         />
//       ))}
//     </div>
//   );
// }

// // ─── Back button ─────────────────────────────────────────────────────────────

// function BackButton({ onClick }: { onClick: () => void }) {
//   return (
//     <button
//       onClick={onClick}
//       className="flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase text-stone hover:text-granite transition-colors mb-6"
//     >
//       <svg
//         width="12"
//         height="12"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       >
//         <path d="M15 18l-6-6 6-6" />
//       </svg>
//       Back
//     </button>
//   );
// }

// // ─── Empty state ──────────────────────────────────────────────────────────────

// function EmptyState({ message }: { message: string }) {
//   return (
//     <div className="py-10 text-center">
//       <p className="font-mono text-xs text-stone">{message}</p>
//     </div>
//   );
// }

// // ─── Main component ───────────────────────────────────────────────────────────

// export default function ChooseClimbAndUpload() {
//   const router = useRouter();
//   const supabase = createClient();

//   const [step, setStep] = useState<Step>("gym");

//   const [gyms, setGyms] = useState<Gym[]>([]);
//   const [walls, setWalls] = useState<Wall[]>([]);
//   const [routes, setRoutes] = useState<Route[]>([]);

//   const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
//   const [selectedWall, setSelectedWall] = useState<Wall | null>(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch gyms on mount
//   useEffect(() => {
//     const fetchGyms = async () => {
//       setLoading(true);
//       setError(null);
//       const { data, error } = await supabase
//         .from("gyms")
//         .select("id, name, city, province, slug")
//         .order("name");
//       if (error) setError("Failed to load gyms.");
//       else setGyms(data ?? []);
//       setLoading(false);
//     };
//     fetchGyms();
//   }, [supabase]);

//   // Fetch walls when gym is selected
//   useEffect(() => {
//     if (!selectedGym) return;
//     const fetchWalls = async () => {
//       setLoading(true);
//       setError(null);
//       const { data, error } = await supabase
//         .from("walls")
//         .select("id, name")
//         .eq("gym_id", selectedGym.id)
//         .order("name");
//       if (error) setError("Failed to load walls.");
//       else setWalls(data ?? []);
//       setLoading(false);
//     };
//     fetchWalls();
//   }, [selectedGym, supabase]);

//   // Fetch routes when wall is selected
//   useEffect(() => {
//     if (!selectedWall) return;
//     const fetchRoutes = async () => {
//       setLoading(true);
//       setError(null);
//       const { data, error } = await supabase
//         .from("routes")
//         .select("id, name, grade")
//         .eq("wall_id", selectedWall.id)
//         .order("grade");
//       if (error) setError("Failed to load routes.");
//       else setRoutes(data ?? []);
//       setLoading(false);
//     };
//     fetchRoutes();
//   }, [selectedWall, supabase]);

//   const handleSelectGym = (gym: Gym) => {
//     setSelectedGym(gym);
//     setSelectedWall(null);
//     setWalls([]);
//     setRoutes([]);
//     setStep("wall");
//   };

//   const handleSelectWall = (wall: Wall) => {
//     setSelectedWall(wall);
//     setRoutes([]);
//     setStep("route");
//   };

//   const handleSelectRoute = (route: Route) => {
//     // Hand off to the upload flow by setting URL params — UploadPage re-renders
//     router.push(
//       `/upload?gymId=${selectedGym!.slug}-${selectedGym!.id}&routeId=${route.id}`,
//     );
//   };

//   const handleBack = () => {
//     if (step === "wall") {
//       setSelectedGym(null);
//       setStep("gym");
//     } else if (step === "route") {
//       setSelectedWall(null);
//       setStep("wall");
//     }
//   };

//   // ─── Step headings ───────────────────────────────────────────────────────

//   const headings: Record<Step, { title: string; subtitle: string }> = {
//     gym: {
//       title: "Choose a Gym",
//       subtitle: "Select the gym where the climb is",
//     },
//     wall: {
//       title: selectedGym?.name ?? "Choose a Wall",
//       subtitle: "Select the wall the route is on",
//     },
//     route: {
//       title: selectedWall?.name ?? "Choose a Route",
//       subtitle: "Select the route you have beta for",
//     },
//   };

//   const { title, subtitle } = headings[step];

//   // ─── List content ────────────────────────────────────────────────────────

//   const renderList = () => {
//     if (loading) return <SkeletonList />;
//     if (error)
//       return <p className="font-mono text-xs text-red-400 py-4">{error}</p>;

//     if (step === "gym") {
//       if (!gyms.length)
//         return <EmptyState message="No gyms found. Check back soon." />;
//       return (
//         <div className="flex flex-col gap-2">
//           {gyms.map((gym) => (
//             <SelectionCard
//               key={gym.id}
//               label={gym.name}
//               sublabel={`${gym.city}, ${gym.province}`}
//               onClick={() => handleSelectGym(gym)}
//             />
//           ))}
//         </div>
//       );
//     }

//     if (step === "wall") {
//       if (!walls.length)
//         return <EmptyState message="No walls found for this gym." />;
//       return (
//         <div className="flex flex-col gap-2">
//           {walls.map((wall) => (
//             <SelectionCard
//               key={wall.id}
//               label={wall.name}
//               onClick={() => handleSelectWall(wall)}
//             />
//           ))}
//         </div>
//       );
//     }

//     if (step === "route") {
//       if (!routes.length)
//         return <EmptyState message="No routes found for this wall." />;
//       return (
//         <div className="flex flex-col gap-2">
//           {routes.map((route) => (
//             <SelectionCard
//               key={route.id}
//               label={route.name}
//               sublabel={route.grade}
//               onClick={() => handleSelectRoute(route)}
//             />
//           ))}
//         </div>
//       );
//     }
//   };

//   // ─── Render ──────────────────────────────────────────────────────────────

//   return (
//     <div className="min-h-screen bg-chalk flex flex-col items-center justify-center px-4 py-8">
//       <div className="w-full max-w-lg">
//         {/* Header */}
//         <div className="mb-10">
//           <h1 className="font-serif text-4xl text-granite">{title}</h1>
//           <p className="font-mono text-xs tracking-widest uppercase text-stone mt-2">
//             {subtitle}
//           </p>
//         </div>

//         {/* Step indicator */}
//         <StepIndicator current={step} />

//         {/* Back button */}
//         {step !== "gym" && <BackButton onClick={handleBack} />}

//         {/* List */}
//         {renderList()}

//         {/* Cancel */}
//         <button
//           onClick={() => router.back()}
//           className="mt-8 w-full py-3 font-mono text-xs tracking-widest uppercase text-stone hover:text-granite transition-colors"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Gym, Route, Step, Wall } from "../types/types";
import StepIndicator from "./StepIndicator";
import SelectionCard from "./SelectionCard";
import SkeletonList from "./SkeletonList";
import BackButton from "./BackButton";
import EmptyState from "./EmptyState";

// ─── Main component ───────────────────────────────────────────────────────────

export default function ChooseClimbAndUpload() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<Step>("gym");

  const [gyms, setGyms] = useState<Gym[]>([]);
  const [walls, setWalls] = useState<Wall[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [selectedWall, setSelectedWall] = useState<Wall | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch gyms on mount
  useEffect(() => {
    const fetchGyms = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("gyms")
        .select("*")
        .order("name");
      if (error) setError("Failed to load gyms.");
      else setGyms(data ?? []);
      setLoading(false);
    };
    fetchGyms();
  }, [supabase]);

  // Fetch walls when gym is selected
  useEffect(() => {
    if (!selectedGym) return;
    const fetchWalls = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("walls")
        .select("*")
        .eq("gym_id", selectedGym.id)
        .order("name");
      if (error) setError("Failed to load walls.");
      else setWalls(data ?? []);
      setLoading(false);
    };
    fetchWalls();
  }, [selectedGym, supabase]);

  // Fetch routes when wall is selected
  useEffect(() => {
    if (!selectedWall) return;
    const fetchRoutes = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("routes")
        .select("*")
        .eq("wall_id", selectedWall.id)
        .order("grade");
      if (error) setError("Failed to load routes.");
      else setRoutes(data ?? []);
      setLoading(false);
    };
    fetchRoutes();
  }, [selectedWall, supabase]);

  const handleSelectGym = (gym: Gym) => {
    setSelectedGym(gym);
    setSelectedWall(null);
    setWalls([]);
    setRoutes([]);
    setStep("wall");
  };

  const handleSelectWall = (wall: Wall) => {
    setSelectedWall(wall);
    setRoutes([]);
    setStep("route");
  };

  const handleSelectRoute = (route: Route) => {
    // Hand off to the upload flow by setting URL params — UploadPage re-renders
    router.push(
      `/upload?gymId=${selectedGym!.slug}-${selectedGym!.id}&routeId=${route.id}`,
    );
  };

  const handleBack = () => {
    if (step === "wall") {
      setSelectedGym(null);
      setStep("gym");
    } else if (step === "route") {
      setSelectedWall(null);
      setStep("wall");
    }
  };

  // ─── Step headings ───────────────────────────────────────────────────────

  const headings: Record<Step, { title: string; subtitle: string }> = {
    gym: {
      title: "Choose a Gym",
      subtitle: "Select the gym where the climb is",
    },
    wall: {
      title: selectedGym?.name ?? "Choose a Wall",
      subtitle: "Select the wall the route is on",
    },
    route: {
      title: selectedWall?.name ?? "Choose a Route",
      subtitle: "Select the route you have beta for",
    },
  };

  const { title, subtitle } = headings[step];

  // ─── List content ────────────────────────────────────────────────────────

  const renderList = () => {
    if (loading) return <SkeletonList />;
    if (error)
      return <p className="font-mono text-xs text-red-400 py-4">{error}</p>;

    if (step === "gym") {
      if (!gyms.length)
        return <EmptyState message="No gyms found. Check back soon." />;
      return (
        <div className="flex flex-col gap-2">
          {gyms.map((gym) => (
            <SelectionCard
              key={gym.id}
              label={gym.name}
              sublabel={`${gym.city}, ${gym.province}`}
              onClick={() => handleSelectGym(gym)}
            />
          ))}
        </div>
      );
    }

    if (step === "wall") {
      if (!walls.length)
        return <EmptyState message="No walls found for this gym." />;
      return (
        <div className="flex flex-col gap-2">
          {walls.map((wall) => (
            <SelectionCard
              key={wall.id}
              label={wall.name}
              onClick={() => handleSelectWall(wall)}
            />
          ))}
        </div>
      );
    }

    if (step === "route") {
      if (!routes.length)
        return <EmptyState message="No routes found for this wall." />;
      return (
        <div className="flex flex-col gap-2">
          {routes.map((route) => (
            <SelectionCard
              key={route.id}
              label={route.name}
              sublabel={route.grade}
              onClick={() => handleSelectRoute(route)}
            />
          ))}
        </div>
      );
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-chalk flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-serif text-4xl text-granite">{title}</h1>
          <p className="font-mono text-xs tracking-widest uppercase text-stone mt-2">
            {subtitle}
          </p>
        </div>

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* Back button */}
        {step !== "gym" && <BackButton onClick={handleBack} />}

        {/* List */}
        {renderList()}

        {/* Cancel */}
        <button
          onClick={() => router.back()}
          className="mt-8 w-full py-3 font-mono text-xs tracking-widest uppercase text-stone hover:text-granite transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
