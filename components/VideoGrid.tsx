"use client";

import { VideoWithDetails } from "@/app/types/types";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";

type VideoGridProps = {
  videos: VideoWithDetails[];
  isProfile: boolean;
  isPublic?: boolean;
};

export default function VideoGrid({
  videos,
  isProfile,
  isPublic,
}: VideoGridProps) {
  const [selected, setSelected] = useState<VideoWithDetails | null>(null);

  async function handleSelect(v: VideoWithDetails) {
    setSelected(v);
    const supabase = createClient();
    await supabase.rpc("increment_video_views", { video_id: v.id });
  }

  return (
    <section className="pt-10">
      {selected && (
        <VideoModal video={selected} onClose={() => setSelected(null)} />
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {videos.map((v) => (
          <VideoCard
            key={v.id}
            video={v}
            onSelect={handleSelect}
            isProfile={isProfile}
            isPublic={isPublic}
          />
        ))}
      </div>
    </section>
  );
}
