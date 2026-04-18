// import RoutePage from "@/components/RoutePage";
// import RoutePageSkeleton from "@/components/RoutePageSkeleton";
// import { getRouteById, getVideosByRouteId } from "@/lib/data-services";
// import { notFound } from "next/navigation";
// import { Suspense } from "react";

// async function GymRoutePageContent({
//   params,
// }: {
//   params: Promise<{ gymId: string; routeId: string }>;
// }) {
//   const { routeId, gymId } = await params;

//   const numericId = Number(routeId);
//   if (!routeId || isNaN(numericId)) notFound();

//   const [videos, route] = await Promise.all([
//     getVideosByRouteId(numericId),
//     getRouteById(numericId),
//   ]);

//   if (!route) notFound();

//   return (
//     <RoutePage videos={videos} routeId={routeId} gymId={gymId} route={route} />
//   );
// }

// export default function GymRoutePage({
//   params,
// }: {
//   params: Promise<{ gymId: string; routeId: string }>;
// }) {
//   return (
//     <div className="min-h-screen bg-chalk font-mono text-granite pb-20">
//       <Suspense fallback={<RoutePageSkeleton />}>
//         <GymRoutePageContent params={params} />
//       </Suspense>
//     </div>
//   );
// }

import RoutePage from "@/components/RoutePage";
import RoutePageSkeleton from "@/components/RoutePageSkeleton";
import { getRouteById, getVideosByRouteId } from "@/lib/data-services";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function GymRoutePageContent({
  params,
}: {
  params: Promise<{ gymId: string; routeId: string }>;
}) {
  const { routeId, gymId } = await params;

  const numericRouteId = Number(routeId);
  if (!routeId || isNaN(numericRouteId)) notFound();

  const [videos, route] = await Promise.all([
    getVideosByRouteId(numericRouteId),
    getRouteById(numericRouteId),
  ]);

  if (!route) notFound();

  const numericGymId = Number(gymId.split("-").pop());
  if (route.gym_id !== numericGymId) notFound();

  return (
    <RoutePage videos={videos} routeId={routeId} gymId={gymId} route={route} />
  );
}

export default function GymRoutePage({
  params,
}: {
  params: Promise<{ gymId: string; routeId: string }>;
}) {
  return (
    <div className="min-h-screen bg-chalk font-mono text-granite pb-20">
      <Suspense fallback={<RoutePageSkeleton />}>
        <GymRoutePageContent params={params} />
      </Suspense>
    </div>
  );
}
