// actions.ts
"use server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const allowedRoles = ["climber", "gym_owner", "partner", "other"];

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;
  const message = formData.get("message") as string;

  if (
    !name?.trim() ||
    !email?.trim() ||
    !message?.trim() ||
    !allowedRoles.includes(role)
  ) {
    return { error: "Invalid fields" };
  }

  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return { error: "Input too long" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Invalid email" };
  }

  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const { error } = await supabase
    .from("contact_submissions")
    .insert({ name, email, role, message });

  if (error) {
    console.error("Contact form error:", error);
    return { error: "Failed to submit" };
  }

  return { ok: true };
}
