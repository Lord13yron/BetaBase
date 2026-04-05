import {
  ContactSubmission,
  Gym,
  GymAdmin,
  Route,
  UserProfileWithCounts,
  VideoWithDetails,
  Wall,
} from "@/app/types/types";
import { createClient } from "./supabase/server";
import { unstable_cache } from "next/cache";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

// export async function getGyms() {
//   const supabase = await createClient();
//   //   const { data: gymData, error } = await supabase.from("gyms").select("*");
//   const { data: gymData, error } = await supabase
//     .from("gyms_with_counts")
//     .select("*");

//   if (error) {
//     throw new Error("Failed to fetch gyms", error);
//   }
//   return gymData as Gym[];
// }
export const getGyms = unstable_cache(
  async () => {
    // No cookies() here — this is public data, anon key is sufficient
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    );
    const { data, error } = await supabase.from("gyms_with_counts").select("*");

    if (error) throw new Error("Failed to fetch gyms");
    return data as Gym[];
  },
  ["gyms-list"], // cache key — unique tag for this query
  { revalidate: 3600, tags: ["gyms-list"] }, // false = cache until next deployment; or use a number (seconds)
);

// export async function getGymById(gymId: string) {
//   const supabase = await createClient();
//   const { data: gymData, error } = await supabase
//     .from("gyms_with_counts")
//     .select("*")
//     .eq("id", gymId)
//     .single();

//   if (error) {
//     throw new Error("Failed to fetch gym", error);
//   }
//   return gymData as Gym;
// }

export const getGymById = (gymId: number) =>
  unstable_cache(
    async () => {
      // No cookies() here — this is public data, anon key is sufficient
      const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      );
      const { data, error } = await supabase
        .from("gyms_with_counts")
        .select("*")
        .eq("id", gymId)
        .single();

      if (!data) notFound();

      if (error) {
        if (error.code === "PGRST116") return null; // no rows found
        throw new Error("Failed to fetch gym");
      }
      return data as Gym;
    },
    [`gym-${gymId}`], // cache key — unique tag for this query
    { revalidate: 3600, tags: [`gym-${gymId}`] }, // false = cache until next deployment; or use a number (seconds)
  )();

// export async function getRoutesByGymId(gymId: string) {
//   const supabase = await createClient();
//   const { data: routeData, error } = await supabase
//     .from("routes_with_details")
//     .select("*")
//     .eq("gym_id", gymId);

//   if (error) {
//     throw new Error("Failed to fetch routes", error);
//   }
//   return routeData as Route[];
// }

export const getRoutesByGymId = (gymId: number) =>
  unstable_cache(
    async () => {
      // No cookies() here — this is public data, anon key is sufficient
      const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      );
      const { data, error } = await supabase
        .from("routes_with_details")
        .select("*")
        .eq("gym_id", gymId);

      if (!data) notFound();

      if (error) throw new Error("Failed to fetch routes", error);
      return data as Route[];
    },
    [`routes-gym-${gymId}`], // cache key — unique tag for this query
    { revalidate: 3600, tags: [`routes-gym-${gymId}`] }, // false = cache until next deployment; or use a number (seconds)
  )();

// export async function getWallsByGymId(gymId: string) {
//   const supabase = await createClient();
//   const { data: wallData, error } = await supabase
//     .from("walls")
//     .select("*")
//     .eq("gym_id", gymId);

//   if (error) {
//     throw new Error("Failed to fetch walls", error);
//   }
//   return wallData as Wall[];
// }

export const getWallsByGymId = (gymId: number) =>
  unstable_cache(
    async () => {
      // No cookies() here — this is public data, anon key is sufficient
      const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      );
      const { data, error } = await supabase
        .from("walls")
        .select("*")
        .eq("gym_id", gymId);

      if (!data) notFound();

      if (error) throw new Error("Failed to fetch walls", error);
      return data as Wall[];
    },
    [`walls-gym-${gymId}`], // cache key — unique tag for this query
    { revalidate: 3600, tags: [`walls-gym-${gymId}`] }, // false = cache until next deployment; or use a number (seconds)
  )();

// export async function getVideosByRouteId(routeId: number) {
//   const supabase = await createClient();
//   const { data: videoData, error } = await supabase
//     .from("videos")
//     .select("*")
//     .eq("route_id", routeId);

//   if (error) {
//     throw new Error("Failed to fetch videos", error);
//   }
//   return videoData as Video[];
// }

export async function getVideosByRouteId(routeId: number) {
  const supabase = await createClient();
  const { data: videoData, error } = await supabase
    .from("videos_with_details")
    .select("*")
    .eq("route_id", routeId);

  if (!videoData) notFound();

  if (error) {
    throw new Error("Failed to fetch videos", error);
  }
  return videoData as VideoWithDetails[];
}

export async function getVideosByUser(username: string) {
  const supabase = await createClient();
  const { data: videoData, error } = await supabase
    .from("videos_with_details")
    .select("*")
    .eq("uploaded_by", username);

  if (error) {
    throw new Error("Failed to fetch videos", error);
  }
  return videoData as VideoWithDetails[];
}

// export async function getRouteById(routeId: number) {
//   const supabase = await createClient();
//   const { data: routeData, error } = await supabase
//     .from("routes_with_details")
//     .select("*")
//     .eq("id", routeId)
//     .single();

//   if (error) {
//     throw new Error("Failed to fetch route", error);
//   }
//   return routeData as Route;
// }

export const getRouteById = (routeId: number) =>
  unstable_cache(
    async () => {
      // No cookies() here — this is public data, anon key is sufficient
      const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      );
      const { data, error } = await supabase
        .from("routes_with_details")
        .select("*")
        .eq("id", routeId)
        .single();

      if (!data) notFound();

      if (error) throw new Error("Failed to fetch route", error);
      return data as Route;
    },
    [`route-${routeId}`], // cache key — unique tag for this query
    { revalidate: 3600, tags: [`route-${routeId}`] }, // false = cache until next deployment; or use a number (seconds)
  )();

export async function getUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (!profile) {
    throw new Error("User profile not found");
  }

  return profile;
}

export async function getAllUserProfiles() {
  const supabase = await createClient();
  const { data: profiles, error } = await supabase
    .from("profiles_with_counts")
    .select("*");

  if (error) {
    throw new Error("Failed to fetch user profiles", error);
  }
  return profiles as UserProfileWithCounts[];
}

export async function getProfileByUsername(username: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles_with_counts")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // no rows found
    throw new Error("Failed to fetch user profile");
  }
  return data as UserProfileWithCounts;
}

export async function getIsGymAdmin(gymId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  if (!user) return false;

  const { data: adminRow } = await supabase
    .from("gym_admins")
    .select("id")
    .eq("gym_id", gymId)
    .eq("user_id", user.sub)
    .single();

  return !!adminRow;
}

export async function getAllRoutes() {
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
  const { data: routes, error } = await supabase
    .from("routes_with_details")
    .select("*")
    .order("video_count", { ascending: false })
    .limit(6);

  if (error) {
    throw new Error("Failed to fetch routes", error);
  }
  return routes as Route[];
}

export async function getSuperadminGyms(): Promise<Gym[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gyms_with_counts")
    .select("*")
    .order("name");

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getSuperadminGymAdmins(): Promise<GymAdmin[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gym_admins_with_details")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
