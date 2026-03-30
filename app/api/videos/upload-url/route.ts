// app/api/videos/upload-url/route.ts
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

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { routeId } = await req.json();

  const upload = await mux.video.uploads.create({
    cors_origin: process.env.NEXT_PUBLIC_APP_URL!,
    new_asset_settings: { playback_policy: ["public"] },
  });

  console.log("cors_origin:", process.env.NEXT_PUBLIC_APP_URL);

  // Insert a pending row so you can track it
  const { error: insertError } = await supabase.from("videos").insert({
    route_id: routeId,
    uploaded_by: profile.username || "unknown",
    user_id: user.id,
    mux_upload_id: upload.id,
    upload_status: "pending",
    views: 0,
  });
  if (insertError) console.error("Insert failed:", insertError);

  return Response.json({ uploadUrl: upload.url });
}
