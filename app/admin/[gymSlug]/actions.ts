"use server";

import { deleteMuxAsset } from "@/lib/mux/deleteAsset";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

async function deleteVideosForRoutes(
  supabase: Awaited<ReturnType<typeof verifyAdmin>>,
  routeIds: number[],
) {
  if (routeIds.length === 0) return;

  const { data: videos } = await supabase
    .from("videos")
    .select("id, mux_asset_id")
    .in("route_id", routeIds);

  if (!videos || videos.length === 0) return;

  // Delete from Mux first — treat each 404 as already gone
  await Promise.all(videos.map((v) => deleteMuxAsset(v.mux_asset_id)));

  // Then delete all video records
  await supabase
    .from("videos")
    .delete()
    .in(
      "id",
      videos.map((v) => v.id),
    );
}

export async function verifyAdmin(gymId: number) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  if (!user) throw new Error("Unauthorized");

  // Allow superusers through
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("is_superuser")
    .eq("id", user.sub)
    .single();

  if (!profile?.is_superuser) {
    const { data: adminRow } = await supabase
      .from("gym_admins")
      .select("id")
      .eq("gym_id", gymId)
      .eq("user_id", user.sub)
      .single();

    if (!adminRow) throw new Error("Unauthorized");
  }

  return supabase;
}

// --- Wall actions ---

export async function createWall(
  gymId: number,
  gymSlug: string,
  formData: { name: string; description: string },
) {
  const supabase = await verifyAdmin(gymId);
  const { error } = await supabase
    .from("walls")
    .insert({ gym_id: gymId, ...formData });
  if (error) throw new Error(error.message);
  revalidateTag(`walls-gym-${gymId}`, "default");
  revalidateTag(`gym-${gymId}`, "default"); // gym_with_counts may change
  revalidatePath(`/admin/${gymSlug}`);
  revalidatePath(`/gyms/${gymSlug}`);
  revalidatePath(`/gyms`);
}

export async function updateWall(
  gymId: number,
  gymSlug: string,
  wallId: number,
  formData: { name: string; description: string },
) {
  const supabase = await verifyAdmin(gymId);
  const { error } = await supabase
    .from("walls")
    .update(formData)
    .eq("id", wallId);
  if (error) throw new Error(error.message);
  revalidateTag(`walls-gym-${gymId}`, "default");
  revalidatePath(`/admin/${gymSlug}`);
  revalidatePath(`/gyms/${gymSlug}`);
  revalidatePath(`/gyms`);
}

export async function deleteWall(
  gymId: number,
  gymSlug: string,
  wallId: number,
) {
  const supabase = await verifyAdmin(gymId);

  // Get all route IDs on this wall before cascade deletes them
  const { data: wallRoutes } = await supabase
    .from("routes")
    .select("id")
    .eq("wall_id", wallId);

  const routeIds = wallRoutes?.map((r) => r.id) ?? [];
  await deleteVideosForRoutes(supabase, routeIds);

  const { error } = await supabase.from("walls").delete().eq("id", wallId);
  if (error) throw new Error(error.message);
  revalidateTag(`walls-gym-${gymId}`, "default");
  revalidateTag(`routes-gym-${gymId}`, "default"); // cascade deleted routes
  revalidateTag(`gym-${gymId}`, "default");
  revalidateTag("gyms-list", "default");
  revalidatePath(`/admin/${gymSlug}`);
  revalidatePath(`/gyms/${gymSlug}`);
  revalidatePath(`/gyms`);
}

export async function clearWall(
  gymId: number,
  gymSlug: string,
  wallId: number,
) {
  const supabase = await verifyAdmin(gymId);

  const { data: wallRoutes } = await supabase
    .from("routes")
    .select("id")
    .eq("wall_id", wallId);

  const routeIds = wallRoutes?.map((r) => r.id) ?? [];
  await deleteVideosForRoutes(supabase, routeIds);

  const { error } = await supabase
    .from("routes")
    .delete()
    .eq("wall_id", wallId)
    .eq("gym_id", gymId);
  if (error) throw new Error(error.message);
  revalidateTag(`routes-gym-${gymId}`, "default");
  revalidateTag(`gym-${gymId}`, "default");
  revalidateTag("gyms-list", "default");
  revalidatePath(`/admin/${gymSlug}`);
  revalidatePath(`/gyms/${gymSlug}`);
  revalidatePath(`/gyms`);
}

// --- Route actions ---

export async function createRoute(
  gymId: number,
  gymSlug: string,
  formData: {
    name: string;
    grade: string;
    color: string;
    type: string;
    wall_id: number;
  },
) {
  const supabase = await verifyAdmin(gymId);
  const { error } = await supabase
    .from("routes")
    .insert({ gym_id: gymId, ...formData });
  if (error) throw new Error(error.message);
  revalidateTag(`routes-gym-${gymId}`, "default");
  revalidateTag(`gym-${gymId}`, "default");
  revalidateTag("gyms-list", "default");
  revalidatePath(`/admin/${gymSlug}`);
  revalidatePath(`/gyms/${gymSlug}`);
  revalidatePath(`/gyms`);
}

export async function updateRoute(
  gymId: number,
  gymSlug: string,
  routeId: number,
  formData: {
    name: string;
    grade: string;
    color: string;
    type: string;
    wall_id: number;
  },
) {
  const supabase = await verifyAdmin(gymId);
  const { error } = await supabase
    .from("routes")
    .update(formData)
    .eq("id", routeId);
  if (error) throw new Error(error.message);
  revalidateTag(`routes-gym-${gymId}`, "default");
  revalidateTag(`route-${routeId}`, "default"); // individual route cache
  revalidatePath(`/admin/${gymSlug}`);
  revalidatePath(`/gyms/${gymSlug}`);
  revalidatePath(`/gyms`);
}

export async function deleteRoute(
  gymId: number,
  gymSlug: string,
  routeId: number,
) {
  const supabase = await verifyAdmin(gymId);
  await deleteVideosForRoutes(supabase, [routeId]);
  const { error } = await supabase.from("routes").delete().eq("id", routeId);
  if (error) throw new Error(error.message);
  revalidateTag(`routes-gym-${gymId}`, "default");
  revalidateTag(`route-${routeId}`, "default");
  revalidateTag(`gym-${gymId}`, "default");
  revalidateTag("gyms-list", "default");
  revalidatePath(`/admin/${gymSlug}`);
  revalidatePath(`/gyms/${gymSlug}`);
  revalidatePath(`/gyms`);
}

export async function getVideosForRoute(gymId: number, routeId: number) {
  const supabase = await verifyAdmin(gymId);
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("route_id", routeId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function deleteVideo(
  gymId: number,
  gymSlug: string,
  videoId: number,
  muxAssetId: string,
) {
  const supabase = await verifyAdmin(gymId);
  await deleteMuxAsset(muxAssetId);
  const { error } = await supabase.from("videos").delete().eq("id", videoId);
  if (error) throw new Error(error.message);
  revalidateTag(`gym-${gymId}`, "default");
  revalidatePath(`/admin/${gymSlug}`);
  revalidatePath(`/gyms/${gymSlug}`);
  revalidatePath(`/gyms`);
}
