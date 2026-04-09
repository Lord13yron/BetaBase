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
    getGymById(Number(id)),
    getRoutesByGymId(Number(id)),
    getWallsByGymId(Number(id)),
  ]);

  return <GymPage GYM={gym} ROUTES={routes} WALLS={walls} />;
}
