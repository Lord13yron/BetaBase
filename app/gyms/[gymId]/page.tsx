import {
  getGymById,
  getRoutesByGymId,
  getWallsByGymId,
} from "@/lib/data-services";
import GymPage from "./GymPage";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ gymId: string }>;
}) {
  const { gymId } = await params;
  // const id = gymId.split("-").slice(-1)[0];
  const id = gymId.split("-").pop();
  const numericId = Number(id);
  if (!id || isNaN(numericId)) notFound();

  const [gym, routes, walls] = await Promise.all([
    getGymById(numericId),
    getRoutesByGymId(numericId),
    getWallsByGymId(numericId),
  ]);

  if (!gym) notFound();

  return <GymPage gym={gym} routes={routes} walls={walls} />;
}
