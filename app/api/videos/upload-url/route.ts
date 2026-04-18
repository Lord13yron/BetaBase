import { createClient } from "@/lib/supabase/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  // Parse and validate the request body before touching the DB or Mux
  let routeId: number;
  try {
    const body = await req.json();
    const parsed = Number(body?.routeId);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      return Response.json({ error: "Invalid routeId" }, { status: 400 });
    }
    routeId = parsed;
  } catch {
    return Response.json({ error: "Malformed request body" }, { status: 400 });
  }

  // Verify the route actually exists — prevents orphaned video rows
  const { data: route, error: routeError } = await supabase
    .from("routes")
    .select("id")
    .eq("id", routeId)
    .single();

  if (routeError || !route) {
    return Response.json({ error: "Route not found" }, { status: 404 });
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  // Profile can be null if the trigger hasn't fired yet or the row is missing
  if (!profile) {
    return Response.json({ error: "User profile not found" }, { status: 404 });
  }

  // 1. Insert the DB row first — Mux call comes after so there's nothing to
  //    reactively cancel if the insert fails
  const { data: videoRow, error: insertError } = await supabase
    .from("videos")
    .insert({
      route_id: routeId,
      uploaded_by: profile.username,
      user_id: user.id,
      mux_upload_id: null,
      upload_status: "pending",
      views: 0,
    })
    .select("id")
    .single();

  if (insertError || !videoRow) {
    console.error("Insert failed:", insertError);
    return Response.json({ error: "Failed to record upload" }, { status: 500 });
  }

  // 2. Create the Mux upload — if this fails, clean up the DB row reliably
  let upload: Awaited<ReturnType<typeof mux.video.uploads.create>>;
  try {
    upload = await mux.video.uploads.create({
      cors_origin: process.env.NEXT_PUBLIC_APP_URL!,
      new_asset_settings: { playback_policy: ["public"] },
    });
  } catch (err) {
    console.error("Mux upload creation failed:", err);
    await supabase.from("videos").delete().eq("id", videoRow.id);
    return Response.json(
      { error: "Failed to initiate upload" },
      { status: 500 },
    );
  }

  // 3. Stamp the Mux upload ID onto the row now that we have it
  const { error: updateError } = await supabase
    .from("videos")
    .update({ mux_upload_id: upload.id })
    .eq("id", videoRow.id);

  if (updateError) {
    console.error("Failed to update mux_upload_id:", updateError);
    await mux.video.uploads.cancel(upload.id).catch(console.error);
    await supabase.from("videos").delete().eq("id", videoRow.id);
    return Response.json(
      { error: "Failed to finalize upload record" },
      { status: 500 },
    );
  }

  return Response.json({ uploadUrl: upload.url });
}
