// import { NextRequest, NextResponse } from "next/server";

// import Mux from "@mux/mux-node";
// import { createClient } from "@/lib/supabase/server";

// function isMuxError(err: unknown): err is Error & { status: number } {
//   return err instanceof Error && "status" in err;
// }

// const mux = new Mux({
//   tokenId: process.env.MUX_TOKEN_ID!,
//   tokenSecret: process.env.MUX_TOKEN_SECRET!,
// });

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ videoId: string }> },
// ) {
//   const { videoId } = await params;
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   // Fetch the video — verify ownership before doing anything destructive
//   const { data: video, error: fetchError } = await supabase
//     .from("videos")
//     .select("mux_asset_id, user_id")
//     .eq("id", videoId)
//     .single();

//   if (fetchError || !video) {
//     return NextResponse.json({ error: "Video not found" }, { status: 404 });
//   }

//   if (video.user_id !== user.id) {
//     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//   }

//   // Delete from Mux first
//   try {
//     await mux.video.assets.delete(video.mux_asset_id);
//   } catch (err: unknown) {
//     if (!isMuxError(err) || err.status !== 404) {
//       return NextResponse.json(
//         { error: "Failed to delete from Mux" },
//         { status: 500 },
//       );
//     }
//   }

//   // Then delete from Supabase
//   const { error: deleteError } = await supabase
//     .from("videos")
//     .delete()
//     .eq("id", videoId);

//   if (deleteError) {
//     return NextResponse.json(
//       { error: "Failed to delete video record" },
//       { status: 500 },
//     );
//   }

//   return NextResponse.json({ success: true });
// }

// app/api/videos/[videoId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { deleteMuxAsset } from "@/lib/mux/deleteAsset";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ videoId: string }> },
) {
  const { videoId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: video, error: fetchError } = await supabase
    .from("videos")
    .select("mux_asset_id, user_id")
    .eq("id", videoId)
    .single();

  if (fetchError || !video)
    return NextResponse.json({ error: "Video not found" }, { status: 404 });

  if (video.user_id !== user.id)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await deleteMuxAsset(video.mux_asset_id);

  const { error: deleteError } = await supabase
    .from("videos")
    .delete()
    .eq("id", videoId);
  if (deleteError)
    return NextResponse.json(
      { error: "Failed to delete video record" },
      { status: 500 },
    );

  return NextResponse.json({ success: true });
}
