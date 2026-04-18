"use client";
import { VideoWithDetails } from "@/app/types/types";
import { formatDate, formatViews } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect } from "react";

export default function VideoModal({
  video,
  onClose,
}: {
  video: VideoWithDetails;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    // Backdrop — click outside to close
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-granite/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Panel — stop propagation so clicks inside don't close */}
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-granite border border-fog/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-granite/80 border border-fog/20 text-stone hover:text-chalk transition-colors"
          aria-label="Close"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Player — native fullscreen button is built into MuxPlayer */}
        <MuxPlayer
          playbackId={video.mux_playback_id}
          metadata={{ video_title: video.mux_asset_id }}
          streamType="on-demand"
          autoPlay
          className="w-full aspect-video"
          accentColor="#C17A5A"
        />

        {/* Meta strip */}
        <div className="px-5 py-4">
          <p className="text-chalk font-mono text-sm tracking-wide">
            @{video.uploaded_by}{" "}
            {video.uploaded_by_height && (
              <span className="text-[10px] text-stone">
                Height : {video.uploaded_by_height} cm
              </span>
            )}
          </p>
          <p className="text-stone font-mono text-[10px] tracking-widest mt-0.5">
            {formatViews(video.views)} views · {formatDate(video.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
}
