// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";
// import { Gym, Route, Step, Wall } from "../types/types";
// import StepIndicator from "./StepIndicator";
// import SelectionCard from "./SelectionCard";
// import SkeletonList from "./SkeletonList";
// import BackButton from "./BackButton";
// import EmptyState from "./EmptyState";

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
//         .select("*")
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
//         .select("*")
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
//         .select("*")
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
import { gradeToNumber } from "@/lib/utils";

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

  const [gymSearch, setGymSearch] = useState("");
  const filteredGyms = gyms.filter((gym) =>
    gym.name.toLowerCase().includes(gymSearch.toLowerCase()),
  );

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
        .eq("wall_id", selectedWall.id);
      if (error) setError("Failed to load routes.");
      else
        // setRoutes(
        //   (data ?? []).sort((a, b) => {
        //     const aNum = parseInt(a.grade.replace(/^[vV]/, ""), 10);
        //     const bNum = parseInt(b.grade.replace(/^[vV]/, ""), 10);
        //     return aNum - bNum;
        //   }),
        // );
        setRoutes(
          (data ?? []).sort(
            (a, b) => gradeToNumber(a.grade) - gradeToNumber(b.grade),
          ),
        );
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

  // const handleBack = () => {
  //   if (step === "wall") {
  //     setSelectedGym(null);
  //     setStep("gym");
  //   } else if (step === "route") {
  //     setSelectedWall(null);
  //     setStep("wall");
  //   }
  // };
  const handleBack = () => {
    if (step === "wall") {
      setSelectedGym(null);
      setGymSearch(""); // reset search
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

    // if (step === "gym") {
    //   if (!gyms.length)
    //     return <EmptyState message="No gyms found. Check back soon." />;
    //   return (
    //     <div className="flex flex-col gap-2">
    //       {gyms.map((gym) => (
    //         <SelectionCard
    //           key={gym.id}
    //           label={gym.name}
    //           sublabel={`${gym.city}, ${gym.province}`}
    //           onClick={() => handleSelectGym(gym)}
    //         />
    //       ))}
    //     </div>
    //   );
    // }
    if (step === "gym") {
      if (!gyms.length)
        return <EmptyState message="No gyms found. Check back soon." />;
      return (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={gymSearch}
            onChange={(e) => setGymSearch(e.target.value)}
            placeholder="Search gyms..."
            className="w-full px-4 py-2 font-mono text-sm border border-stone/30 rounded-md bg-white text-granite placeholder:text-stone/50 focus:outline-none focus:ring-1 focus:ring-granite"
          />
          {filteredGyms.length === 0 ? (
            <EmptyState message="No gyms match your search." />
          ) : (
            <div className="flex flex-col gap-2">
              {filteredGyms.map((gym) => (
                <SelectionCard
                  key={gym.id}
                  label={gym.name}
                  sublabel={`${gym.city}, ${gym.province}`}
                  onClick={() => handleSelectGym(gym)}
                />
              ))}
            </div>
          )}
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
