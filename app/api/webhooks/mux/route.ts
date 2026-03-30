// app/api/webhooks/mux/route.ts
import { createClient } from "@/lib/supabase/server";
import Mux from "@mux/mux-node";
import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function POST(req: Request) {
  const body = await req.text();

  // Verify the webhook is actually from Mux
  try {
    mux.webhooks.verifySignature(
      body,
      req.headers,
      process.env.MUX_WEBHOOK_SECRET!,
    );
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);
  const supabase = await createClient();

  switch (event.type) {
    case "video.upload.asset_created": {
      await supabase
        .from("videos")
        .update({
          mux_asset_id: event.data.asset_id,
          upload_status: "processing",
        })
        .eq("mux_upload_id", event.data.id);

      break;
    }

    // case "video.asset.ready": {
    //   await supabase
    //     .from("videos")
    //     .update({
    //       mux_playback_id: event.data.playback_ids[0].id,
    //       upload_status: "ready",
    //       duration_seconds: Math.round(event.data.duration),
    //       aspect_ratio: event.data.aspect_ratio,
    //     })
    //     .eq("mux_asset_id", event.data.id);

    //   break;
    // }
    case "video.asset.ready": {
      const { data: updatedVideo } = await supabase
        .from("videos")
        .update({
          mux_playback_id: event.data.playback_ids[0].id,
          upload_status: "ready",
          duration_seconds: Math.round(event.data.duration),
          aspect_ratio: event.data.aspect_ratio,
        })
        .eq("mux_asset_id", event.data.id)
        .select("route_id")
        .single();

      if (updatedVideo) {
        const { data: route } = await supabase
          .from("routes")
          .select("gym_id")
          .eq("id", updatedVideo.route_id)
          .single();

        if (route) {
          const { data: gym } = await supabase
            .from("gyms")
            .select("slug")
            .eq("id", route.gym_id)
            .single();

          const gymSlug = gym?.slug ?? `gym-${route.gym_id}`;

          revalidateTag(`routes-gym-${route.gym_id}`, "default");
          revalidateTag(`gyms-list`, "default");
          revalidatePath("/gyms");
          revalidatePath(`/gyms/${gymSlug}-${route.gym_id}`);
        }
      }

      break;
    }

    case "video.asset.errored": {
      await supabase
        .from("videos")
        .update({ upload_status: "error" })
        .eq("mux_asset_id", event.data.id);
      break;
    }
  }

  return Response.json({ received: true });
}
// ```

// Two things you need to do to make this work:

// **1. Get your webhook secret.** In the Mux dashboard go to **Settings → Webhooks**, create a new webhook, and set the URL to `https://yourdomain.com/api/webhooks/mux`. Copy the signing secret into your env:
// ```
// MUX_WEBHOOK_SECRET=your_webhook_secret
