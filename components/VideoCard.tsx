"use client";

import { VideoWithDetails } from "@/app/types/types";
import { createClient } from "@/lib/supabase/client";
import {
  convertCmToFtIn,
  formatDate,
  formatDuration,
  formatViews,
} from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";

export default function VideoCard({
  video: initialVideo,
  onSelect,
  isProfile,
  isPublic,
  priority,
}: {
  video: VideoWithDetails;
  onSelect: (v: VideoWithDetails) => void;
  isProfile: boolean;
  isPublic?: boolean;
  priority?: boolean;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [video, setVideo] = useState(initialVideo);
  const [pollCount, setPollCount] = useState(0);
  const router = useRouter();

  const isProcessing =
    video.upload_status === "pending" || video.upload_status === "processing";

  useEffect(() => {
    if (!isProcessing) return;
    if (pollCount >= 20) return;

    const timer = setTimeout(async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("videos_with_details")
        .select("*")
        .eq("id", video.id)
        .single();

      if (data) setVideo(data);
      setPollCount((c) => c + 1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [video, isProcessing, pollCount]);

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation(); // prevent triggering onSelect
    // if (!confirm("Delete this video? This cannot be undone.")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/videos/${video.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    } catch (err) {
      console.error(err);
      alert("Failed to delete video. Please try again.");
    } finally {
      setIsDeleting(false);
      router.refresh();
    }
  }

  return (
    <>
      <div
        onClick={() => !isProcessing && onSelect(video)}
        className={`group text-left rounded-xl overflow-hidden border border-fog bg-white transition-all duration-200 ${
          isProcessing
            ? "cursor-default"
            : "cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-granite/10"
        }`}
      >
        {/* Thumbnail — 16:9 */}
        <div className="relative w-full aspect-video bg-granite/10">
          {isProcessing ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-clay border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-[9px] text-stone uppercase tracking-widest">
                Processing…
              </span>
            </div>
          ) : (
            <>
              <Image
                src={`https://image.mux.com/${video.mux_playback_id}/thumbnail.jpg?time=3`}
                alt={video.mux_asset_id}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={priority}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-granite/0 group-hover:bg-granite/40 transition-colors duration-200">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center w-12 h-12 rounded-full bg-clay/90">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="none"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-chalk text-[10px] tracking-wider px-2 py-0.5 rounded">
                {formatDuration(video.duration_seconds)}
              </span>
            </>
          )}
        </div>

        {/* Meta */}
        <div className="px-3.5  py-2">
          <div className="flex flex-col flex-wrap text-[10px] text-stone tracking-wide">
            {isProfile && (
              <span className="text-lg font-bold text-center">
                {video.route_name}
              </span>
            )}
            {!isProfile && (
              <Link
                onClick={(e) => e.stopPropagation()}
                href={`/community/${video.uploaded_by}`}
              >
                <span className="text-clay">@{video.uploaded_by}</span>
              </Link>
            )}
            {video.uploaded_by_height && !isProfile && (
              <span className="text-clay">
                {/* Climber Height: {video.uploaded_by_height} cm */}
                Climber Height: {convertCmToFtIn(video.uploaded_by_height)}
              </span>
            )}

            {isProfile && <span>Gym: {video.gym_name}</span>}
            {isProfile && <span>Wall: {video.wall_name}</span>}
            <span>{formatDate(video.created_at)}</span>
            <div className="flex items-center justify-between">
              <span className="text-end">{formatViews(video.views)} views</span>
              {isProfile && !isPublic && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      onClick={(e) => e.stopPropagation()} // prevent triggering onSelect
                      disabled={isDeleting}
                      className="z-10 p-1.5 rounded-lg bg-granite/70 backdrop-blur-sm 
                     
                     hover:bg-red-500/80 disabled:opacity-50"
                    >
                      <Trash2 size={14} className="text-chalk" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Confirm Delete</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this video -{" "}
                        {video.route_name}? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-end">
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={handleDelete} type="button">
                          Delete
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
