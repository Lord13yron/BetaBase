import type { Metadata } from "next";
import {
  getGymById,
  getRoutesByGymId,
  getWallsByGymId,
} from "@/lib/data-services";
import GymPage from "./GymPage";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gymId: string }>;
}): Promise<Metadata> {
  const { gymId } = await params;
  const id = gymId.split("-").pop();
  const numericId = Number(id);
  if (!id || isNaN(numericId)) return {};

  const gym = await getGymById(numericId);
  if (!gym) return {};

  return {
    title: gym.name,
    description: `Watch community-uploaded climbing beta videos for every route at ${gym.name} in ${gym.city}, ${gym.province}. Browse by wall, grade, and color.`,
    openGraph: {
      title: `${gym.name} | BetaBase`,
      description: `Watch community-uploaded climbing beta videos for every route at ${gym.name} in ${gym.city}, ${gym.province}.`,
      url: `/gyms/${gymId}`,
    },
  };
}

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
