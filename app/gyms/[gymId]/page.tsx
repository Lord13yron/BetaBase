// import {
//   getGymById,
//   getRoutesByGymId,
//   getWallsByGymId,
// } from "@/lib/data-services";
// import GymPage from "./GymPage";
// import { Suspense } from "react";
// import GymPageSkeleton from "@/components/GymPageSkeleton";

// async function GymPageContent({
//   params,
// }: {
//   params: Promise<{ gymId: string }>;
// }) {
//   const { gymId } = await params;
//   const id = gymId.split("-").slice(-1)[0]; // Extract gymId from slug
//   const gym = await getGymById(id);
//   const routes = await getRoutesByGymId(id);
//   const walls = await getWallsByGymId(id);

//   if (!gym) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-chalk">
//         <h1 className="font-serif text-3xl text-stone">Gym not found</h1>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <GymPage GYM={gym} ROUTES={routes} WALLS={walls} />
//     </div>
//   );
// }

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ gymId: string }>;
// }) {
//   return (
//     <div>
//       <Suspense fallback={<GymPageSkeleton />}>
//         <GymPageContent params={params} />
//       </Suspense>
//     </div>
//   );
// }

import {
  getGymById,
  getRoutesByGymId,
  getWallsByGymId,
} from "@/lib/data-services";
import GymPage from "./GymPage";

export default async function Page({
  params,
}: {
  params: Promise<{ gymId: string }>;
}) {
  const { gymId } = await params;
  const id = gymId.split("-").slice(-1)[0];

  const gym = await getGymById(id);
  const routes = await getRoutesByGymId(id);
  const walls = await getWallsByGymId(id);

  if (!gym) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-chalk">
        <h1 className="font-serif text-3xl text-stone">Gym not found</h1>
      </div>
    );
  }
  return <GymPage GYM={gym} ROUTES={routes} WALLS={walls} />;
}
