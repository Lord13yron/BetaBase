import RoutePage from "@/components/RoutePage";
import RoutePageSkeleton from "@/components/RoutePageSkeleton";
import { getRouteById, getVideosByRouteId } from "@/lib/data-services";
import { Suspense } from "react";

async function GymRoutePageContent({
  params,
}: {
  params: Promise<{ gymId: string; routeId: string }>;
}) {
  const { routeId } = await params;
  const { gymId } = await params;

  const videos = await getVideosByRouteId(Number(routeId));
  const route = await getRouteById(Number(routeId));

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
