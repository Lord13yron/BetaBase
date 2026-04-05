import { notFound, redirect } from "next/navigation";
import { createClient } from "../supabase/server";

// lib/auth/verifySuper.ts
export async function verifySuper() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("user_profiles")
    .select("is_superuser")
    .eq("id", user.id)
    .single();
  if (error) throw new Error(`verifySuper query failed: ${error.message}`);
  if (!data?.is_superuser) notFound(); // don't 403 — reveal nothing
}
