// "use client";

// import { useState } from "react";
// import Modal from "./Modal";
// import { createRoute, updateRoute } from "./actions";
// import { HOLD_COLORS } from "@/lib/utils";

// const BOULDER_GRADES = [
//   "VB",
//   "V0",
//   "V1",
//   "V2",
//   "V3",
//   "V4",
//   "V5",
//   "V6",
//   "V7",
//   "V8",
//   "V9",
//   "V10",
//   "V11",
//   "V12",
//   "V13",
//   "V14",
//   "V15",
//   "V16",
//   "V17",
// ];
// const ROPE_GRADES = [
//   "5.5",
//   "5.6",
//   "5.7",
//   "5.8",
//   "5.9",
//   "5.10a",
//   "5.10b",
//   "5.10c",
//   "5.10d",
//   "5.11a",
//   "5.11b",
//   "5.11c",
//   "5.11d",
//   "5.12a",
//   "5.12b",
//   "5.12c",
//   "5.12d",
//   "5.13a",
//   "5.13b",
//   "5.13c",
//   "5.13d",
//   "5.14a",
//   "5.14b",
//   "5.14c",
//   "5.14d",
//   "5.15a",
//   "5.15b",
//   "5.15c",
//   "5.15d",
// ];

// type ClimbType = "Bouldering" | "Lead" | "Top Rope";

// interface Route {
//   id: number;
//   name: string;
//   grade: string;
//   color: string;
//   type?: string;
//   wall_id: number;
// }

// interface Wall {
//   id: number;
//   name: string;
// }

// interface Props {
//   gymId: number;
//   gymSlug: string;
//   walls: Wall[];
//   defaultWallId?: number;
//   route?: Route;
//   onClose: () => void;
// }

// export default function RouteModal({
//   gymId,
//   gymSlug,
//   walls,
//   defaultWallId,
//   route,
//   onClose,
// }: Props) {
//   const [name, setName] = useState(route?.name ?? "");
//   const [climbType, setClimbType] = useState<ClimbType>(
//     (route?.type as ClimbType) ?? "Bouldering",
//   );
//   const [grade, setGrade] = useState(route?.grade ?? "");
//   const [color, setColor] = useState(route?.color ?? "#FFFFFF");
//   const [wallId, setWallId] = useState<number>(
//     route?.wall_id ?? defaultWallId ?? walls[0]?.id,
//   );
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const isEditing = !!route;
//   const gradeOptions =
//     climbType === "Bouldering" ? BOULDER_GRADES : ROPE_GRADES;

//   // Reset grade when climb type changes
//   const handleTypeChange = (type: ClimbType) => {
//     setClimbType(type);
//     setGrade("");
//   };

//   const handleSubmit = async () => {
//     if (!name.trim()) {
//       setError("Name is required.");
//       return;
//     }
//     if (!grade) {
//       setError("Grade is required.");
//       return;
//     }
//     if (!wallId) {
//       setError("Wall is required.");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       const formData = {
//         name: name.trim(),
//         grade,
//         color,
//         type: climbType,
//         wall_id: wallId,
//       };
//       if (isEditing) {
//         await updateRoute(gymId, gymSlug, route.id, formData);
//       } else {
//         await createRoute(gymId, gymSlug, formData);
//       }
//       onClose();
//     } catch (e: unknown) {
//       setError(
//         e instanceof Error ? e.message : "An unexpected error occurred.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal title={isEditing ? "Edit Route" : "Add Route"} onClose={onClose}>
//       <div className="space-y-4">
//         {/* Name */}
//         <div>
//           <label className="font-mono text-xs text-stone tracking-widest uppercase block mb-1.5">
//             Route Name
//           </label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="e.g. Crimpy Crisp"
//             className="w-full bg-white border border-fog rounded-lg px-4 py-2.5 font-mono text-sm text-granite placeholder:text-stone/40 focus:outline-none focus:border-clay transition-colors"
//           />
//         </div>

//         {/* Wall */}
//         <div>
//           <label className="font-mono text-xs text-stone tracking-widest uppercase block mb-1.5">
//             Wall
//           </label>
//           <select
//             value={wallId}
//             onChange={(e) => setWallId(Number(e.target.value))}
//             className="w-full bg-white border border-fog rounded-lg px-4 py-2.5 font-mono text-sm text-granite focus:outline-none focus:border-clay transition-colors"
//           >
//             {walls.map((w) => (
//               <option key={w.id} value={w.id}>
//                 {w.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Climb type */}
//         <div>
//           <label className="font-mono text-xs text-stone tracking-widest uppercase block mb-1.5">
//             Type
//           </label>
//           <div className="flex gap-2">
//             {(["Bouldering", "Lead", "Top Rope"] as ClimbType[]).map((t) => (
//               <button
//                 key={t}
//                 onClick={() => handleTypeChange(t)}
//                 className={`flex-1 font-mono text-xs tracking-wide py-2 rounded-lg border transition-colors ${
//                   climbType === t
//                     ? "bg-granite text-chalk border-granite"
//                     : "bg-white text-stone border-fog hover:border-stone"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Grade */}
//         <div>
//           <label className="font-mono text-xs text-stone tracking-widest uppercase block mb-1.5">
//             Grade
//           </label>
//           <select
//             value={grade}
//             onChange={(e) => setGrade(e.target.value)}
//             className="w-full bg-white border border-fog rounded-lg px-4 py-2.5 font-mono text-sm text-granite focus:outline-none focus:border-clay transition-colors"
//           >
//             <option value="">Select grade...</option>
//             {gradeOptions.map((g) => (
//               <option key={g} value={g}>
//                 {g}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Hold color */}
//         <div>
//           <label className="font-mono text-xs text-stone tracking-widest uppercase block mb-1.5">
//             Hold Color
//           </label>
//           <div className="flex gap-2 flex-wrap">
//             {HOLD_COLORS.map((c) => (
//               <button
//                 key={c.hex}
//                 title={c.name}
//                 onClick={() => setColor(c.hex)}
//                 className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
//                   color === c.hex
//                     ? "border-clay scale-110"
//                     : "border-transparent"
//                 }`}
//                 style={{
//                   backgroundColor: c.hex,
//                   boxShadow:
//                     c.hex === "#FFFFFF" ? "inset 0 0 0 1px #D6CAB8" : undefined,
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {error && <p className="font-mono text-xs text-red-400">{error}</p>}

//         <div className="flex gap-3 pt-1">
//           <button
//             onClick={onClose}
//             className="flex-1 font-mono text-xs text-stone tracking-widest uppercase border border-fog rounded-lg py-2.5 hover:border-stone transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="flex-1 bg-clay text-white font-mono text-xs tracking-widest uppercase rounded-lg py-2.5 hover:bg-clay/90 transition-colors disabled:opacity-50"
//           >
//             {loading ? "Saving..." : isEditing ? "Save Changes" : "Add Route"}
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

"use client";

import { useState } from "react";
import Modal from "./Modal";
import { createRoute, updateRoute } from "./actions";
import { HOLD_COLORS } from "@/lib/utils";

const BOULDER_GRADES = [
  "VB",
  "V0",
  "V1",
  "V2",
  "V3",
  "V4",
  "V5",
  "V6",
  "V7",
  "V8",
  "V9",
  "V10",
  "V11",
  "V12",
  "V13",
  "V14",
  "V15",
  "V16",
  "V17",
];
const ROPE_GRADES = [
  "5.5",
  "5.6",
  "5.7",
  "5.8",
  "5.9",
  "5.10-",
  "5.10+",
  "5.10a",
  "5.10b",
  "5.10c",
  "5.10d",
  "5.11-",
  "5.11+",
  "5.11a",
  "5.11b",
  "5.11c",
  "5.11d",
  "5.12-",
  "5.12+",
  "5.12a",
  "5.12b",
  "5.12c",
  "5.12d",
  "5.13-",
  "5.13+",
  "5.13a",
  "5.13b",
  "5.13c",
  "5.13d",
  "5.14-",
  "5.14+",
  "5.14a",
  "5.14b",
  "5.14c",
  "5.14d",
  "5.15-",
  "5.15+",
  "5.15a",
  "5.15b",
  "5.15c",
  "5.15d",
];

type ClimbType = "Bouldering" | "Lead" | "Top Rope";

interface Route {
  id: number;
  name: string;
  grade: string;
  color: string;
  type?: string;
  wall_id: number;
}

interface Wall {
  id: number;
  name: string;
}

interface Props {
  gymId: number;
  gymSlug: string;
  walls: Wall[];
  defaultWallId?: number;
  route?: Route;
  onClose: () => void;
}

export default function RouteModal({
  gymId,
  gymSlug,
  walls,
  defaultWallId,
  route,
  onClose,
}: Props) {
  const [name, setName] = useState(route?.name ?? "");
  const [climbType, setClimbType] = useState<ClimbType>(
    (route?.type as ClimbType) ?? "Bouldering",
  );
  const [grade, setGrade] = useState(route?.grade ?? "");
  const [color, setColor] = useState(route?.color ?? "#FFFFFF");
  const [wallId, setWallId] = useState<number>(
    route?.wall_id ?? defaultWallId ?? walls[0]?.id,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!route;
  const gradeOptions =
    climbType === "Bouldering" ? BOULDER_GRADES : ROPE_GRADES;

  // Reset grade when climb type changes
  const handleTypeChange = (type: ClimbType) => {
    setClimbType(type);
    setGrade("");
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!grade) {
      setError("Grade is required.");
      return;
    }
    if (!wallId) {
      setError("Wall is required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = {
        name: name.trim(),
        grade,
        color,
        type: climbType,
        wall_id: wallId,
      };
      if (isEditing) {
        await updateRoute(gymId, gymSlug, route.id, formData);
      } else {
        await createRoute(gymId, gymSlug, formData);
      }
      onClose();
    } catch (e: unknown) {
      setError(
        e instanceof Error ? e.message : "An unexpected error occurred.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={isEditing ? "Edit Route" : "Add Route"} onClose={onClose}>
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="font-mono text-xs text-stone tracking-widest uppercase block mb-1.5">
            Route Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Crimpy Crisp"
            className="w-full bg-white border border-fog rounded-lg px-4 py-2.5 font-mono text-sm text-granite placeholder:text-stone/40 focus:outline-none focus:border-clay transition-colors"
          />
        </div>

        {/* Wall */}
        <div>
          <label className="font-mono text-xs text-stone tracking-widest uppercase block mb-1.5">
            Wall
          </label>
          <select
            value={wallId}
            onChange={(e) => setWallId(Number(e.target.value))}
            className="w-full bg-white border border-fog rounded-lg px-4 py-2.5 font-mono text-sm text-granite focus:outline-none focus:border-clay transition-colors"
          >
            {walls.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        {/* Climb type */}
        <div>
          <label className="font-mono text-xs text-stone tracking-widest uppercase block mb-1.5">
            Type
          </label>
          <div className="flex gap-2">
            {(["Bouldering", "Lead", "Top Rope"] as ClimbType[]).map((t) => (
              <button
                key={t}
                onClick={() => handleTypeChange(t)}
                className={`flex-1 font-mono text-xs tracking-wide py-2 rounded-lg border transition-colors ${
                  climbType === t
                    ? "bg-granite text-chalk border-granite"
                    : "bg-white text-stone border-fog hover:border-stone"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Grade */}
        <div>
          <label className="font-mono text-xs text-stone tracking-widest uppercase block mb-1.5">
            Grade
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full bg-white border border-fog rounded-lg px-4 py-2.5 font-mono text-sm text-granite focus:outline-none focus:border-clay transition-colors"
          >
            <option value="">Select grade...</option>
            {gradeOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Hold color */}
        <div>
          <label className="font-mono text-xs text-stone tracking-widest uppercase block mb-1.5">
            Hold Color
          </label>
          <div className="flex gap-2 flex-wrap">
            {HOLD_COLORS.map((c) => (
              <button
                key={c.hex}
                title={c.name}
                onClick={() => setColor(c.hex)}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                  color === c.hex
                    ? "border-clay scale-110"
                    : "border-transparent"
                }`}
                style={{
                  backgroundColor: c.hex,
                  boxShadow:
                    c.hex === "#FFFFFF" ? "inset 0 0 0 1px #D6CAB8" : undefined,
                }}
              />
            ))}
          </div>
        </div>

        {error && <p className="font-mono text-xs text-red-400">{error}</p>}

        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            className="flex-1 font-mono text-xs text-stone tracking-widest uppercase border border-fog rounded-lg py-2.5 hover:border-stone transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-clay text-white font-mono text-xs tracking-widest uppercase rounded-lg py-2.5 hover:bg-clay/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : isEditing ? "Save Changes" : "Add Route"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
