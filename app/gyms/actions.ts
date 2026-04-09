// "use server";

// import { createClient } from "@/lib/supabase/server";
// import { revalidatePath } from "next/cache";

// export async function toggleFavoriteGym(gymId: number) {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   if (!user) return { error: "Not authenticated" };

//   const { data: existing } = await supabase
//     .from("user_favorite_gyms")
//     .select("gym_id")
//     .eq("user_id", user.id)
//     .eq("gym_id", gymId)
//     .single();

//   if (existing) {
//     const { error } = await supabase
//       .from("user_favorite_gyms")
//       .delete()
//       .eq("user_id", user.id)
//       .eq("gym_id", gymId);
//     if (error) return { error: error.message };
//   } else {
//     const { error } = await supabase
//       .from("user_favorite_gyms")
//       .insert({ user_id: user.id, gym_id: gymId });
//     if (error) return { error: error.message };
//   }

//   revalidatePath("/gyms");
//   return { success: true };
// }

"use server";

import { createClient } from "@/lib/supabase/server";

export async function toggleFavoriteGym(gymId: string) {
  if (!gymId) return { error: "Invalid gymId" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  // Check if the row exists first
  const { data: existing } = await supabase
    .from("user_favorite_gyms")
    .select("gym_id")
    .eq("user_id", user.id)
    .eq("gym_id", gymId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("user_favorite_gyms")
      .delete()
      .eq("user_id", user.id)
      .eq("gym_id", gymId);
    if (error) return { error: error.message };

    return { success: true, favorited: false };
  } else {
    const { error } = await supabase
      .from("user_favorite_gyms")
      .insert({ user_id: user.id, gym_id: gymId });
    if (error) return { error: error.message };

    return { success: true, favorited: true };
  }
}
