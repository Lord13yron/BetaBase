import {
  ContactSubmission,
  Gym,
  GymAdmin,
  Route,
  UserProfile,
  UserProfileWithCounts,
  VideoWithDetails,
  Wall,
} from "@/app/types/types";
import { createClient } from "./supabase/server";
import { unstable_cache } from "next/cache";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { notFound, redirect } from "next/navigation";

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

export const getGymById = (gymId: number): Promise<Gym | null> =>
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

      if (error) {
        if (error.code === "PGRST116") return null; // no rows found — caller handles notFound()
        throw new Error(`Failed to fetch gym: ${error.message}`);
      }

      return (data as Gym) ?? null;
    },
    [`gym-${gymId}`],
    { revalidate: 3600, tags: [`gym-${gymId}`] },
  )();

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

      if (error) throw new Error(`Failed to fetch routes: ${error.message}`);

      return (data as Route[]) ?? [];
    },
    [`routes-gym-${gymId}`],
    { revalidate: 3600, tags: [`routes-gym-${gymId}`] },
  )();

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

      if (error) throw new Error(`Failed to fetch walls: ${error.message}`);

      return (data as Wall[]) ?? [];
    },
    [`walls-gym-${gymId}`],
    { revalidate: 3600, tags: [`walls-gym-${gymId}`] },
  )();

export async function getVideosByRouteId(routeId: number) {
  const supabase = await createClient();
  const { data: videoData, error } = await supabase
    .from("videos_with_details")
    .select("*")
    .eq("route_id", routeId);

  if (error) {
    throw new Error(`Failed to fetch videos: ${error.message}`);
  }
  return videoData as VideoWithDetails[];
}

export async function getVideosByUser(userId: string) {
  const supabase = await createClient();
  const { data: videoData, error } = await supabase
    .from("videos_with_details")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error("Failed to fetch videos", error);
  }
  return videoData as VideoWithDetails[];
}

export const getRouteById = (routeId: number): Promise<Route | null> =>
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

      // if (!data) notFound();

      // if (error) throw new Error("Failed to fetch route", error);
      if (error) {
        if (error.code === "PGRST116") return null; // no rows found — caller handles notFound()
        throw new Error(`Failed to fetch route: ${error.message}`);
      }

      return (data as Route) ?? null;
    },
    [`route-${routeId}`],
    { revalidate: 3600, tags: [`route-${routeId}`] },
  )();

export async function getUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    if (error.code === "PGRST116") notFound();
    throw new Error(`Failed to fetch user profile: ${error.message}`);
  }

  if (!profile) notFound();

  return profile as UserProfile;
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
