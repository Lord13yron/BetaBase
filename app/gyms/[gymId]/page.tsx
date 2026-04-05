// import {
//   getGymById,
//   getIsGymAdmin,
//   getRoutesByGymId,
//   getWallsByGymId,
// } from "@/lib/data-services";
// import GymPage from "./GymPage";

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ gymId: string }>;
// }) {
//   const { gymId } = await params;
//   const id = gymId.split("-").slice(-1)[0];

//   const gym = await getGymById(Number(id));
//   const routes = await getRoutesByGymId(Number(id));
//   const walls = await getWallsByGymId(Number(id));
//   const isAdmin = await getIsGymAdmin(id);

//   if (!gym) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-chalk">
//         <h1 className="font-serif text-3xl text-stone">Gym not found</h1>
//       </div>
//     );
//   }
//   return <GymPage GYM={gym} ROUTES={routes} WALLS={walls} isAdmin={isAdmin} />;
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

  const [gym, routes, walls] = await Promise.all([
    getGymById(Number(id)),
    getRoutesByGymId(Number(id)),
    getWallsByGymId(Number(id)),
  ]);

  if (!gym) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-chalk">
        <h1 className="font-serif text-3xl text-stone">Gym not found</h1>
      </div>
    );
  }

  return <GymPage GYM={gym} ROUTES={routes} WALLS={walls} />;
}
