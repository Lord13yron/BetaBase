"use server";

import { createClient } from "@/lib/supabase/server";
import { verifySuper } from "@/lib/auth/verifySuper";

import { revalidateTag } from "next/cache";
import { ClimbType } from "../types/types";
import { revalidatePath } from "next/cache";

// ─── Gyms ────────────────────────────────────────────────────────────────────

export async function createGym(formData: FormData) {
  await verifySuper();
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-");
  const city = formData.get("city") as string;
  const province = formData.get("province") as string;
  const tags = formData.getAll("tags") as ClimbType[];

  if (!name || !city || !province || tags.length === 0) {
    return { error: "All fields are required." };
  }

  const { error } = await supabase.from("gyms").insert({
    name,
    slug,
    city,
    province,
    tags,
    logo_url: null,
  });

  if (error) return { error: error.message };

  revalidateTag("gyms-list", "default");
  revalidatePath("/gyms");
  return { success: true };
}

export async function deleteGym(gymId: number) {
  await verifySuper();
  const supabase = await createClient();

  const { error } = await supabase.from("gyms").delete().eq("id", gymId);
  if (error) return { error: error.message };

  revalidateTag("gyms-list", "default");
  revalidateTag(`gym-${gymId}`, "default");
  revalidatePath("/gyms");
  return { success: true };
}

// ─── Gym Admins ───────────────────────────────────────────────────────────────

export async function assignGymAdmin(formData: FormData) {
  await verifySuper();
  const supabase = await createClient();

  const username = formData.get("username") as string;
  const gymId = Number(formData.get("gym_id"));

  if (!username || !gymId) return { error: "Username and gym are required." };

  // Resolve username → user_id
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (profileError || !profile) return { error: "User not found." };

  const { error } = await supabase.from("gym_admins").insert({
    user_id: profile.id,
    gym_id: gymId,
  });

  if (error) {
    if (error.code === "23505")
      return { error: "User is already an admin for this gym." };
    return { error: error.message };
  }

  revalidateTag(`gym-${gymId}`, "default");
  return { success: true };
}

export async function revokeGymAdmin(userId: string, gymId: number) {
  await verifySuper();
  const supabase = await createClient();

  const { error } = await supabase
    .from("gym_admins")
    .delete()
    .eq("user_id", userId)
    .eq("gym_id", gymId);

  if (error) return { error: error.message };

  revalidateTag(`gym-${gymId}`, "default");
  return { success: true };
}

// ─── Contact Submissions ──────────────────────────────────────────────────────

export async function markSubmissionRead(id: number) {
  await verifySuper();
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_submissions")
    .update({ read: true })
    .eq("id", id);

  if (error) return { error: error.message };
  return { success: true };
}

export async function deleteSubmission(id: number) {
  await verifySuper();
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };
  return { success: true };
}
