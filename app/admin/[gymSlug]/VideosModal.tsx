"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { getVideosForRoute, deleteVideo } from "./actions";
import Image from "next/image";
import { Video } from "@/app/types/types";

interface Route {
  id: number;
  name: string;
  grade: string;
}

interface Props {
  gymId: number;
  gymSlug: string;
  route: Route;
  onClose: () => void;
}

export default function VideosModal({ gymId, gymSlug, route, onClose }: Props) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Video | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    getVideosForRoute(gymId, route.id)
      .then(setVideos)
      .catch((e: Error) => setFetchError(e.message))
      .finally(() => setLoading(false));
  }, [gymId, route.id]);

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteVideo(
        gymId,
        gymSlug,
        pendingDelete.id,
        pendingDelete.mux_asset_id,
      );
      setVideos((prev) => prev.filter((v) => v.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (e: unknown) {
      setDeleteError(
        e instanceof Error ? e.message : "An unexpected error occurred.",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal title={`Videos — ${route.grade} ${route.name}`} onClose={onClose}>
      <div className="space-y-3">
        {loading && (
          <p className="font-mono text-xs text-stone/60 text-center py-6">
            Loading...
          </p>
        )}
        {fetchError && (
          <p className="font-mono text-xs text-red-400">{fetchError}</p>
        )}
        {!loading && !fetchError && videos.length === 0 && (
          <p className="font-mono text-xs text-stone/50 text-center py-6">
            No videos for this route.
          </p>
        )}
        {videos.map((video, i) => (
          <div
            key={video.id}
            className="flex items-center justify-between px-4 py-3 border border-fog rounded-lg"
          >
            <div className="flex items-center gap-3">
              {/* Mux thumbnail */}
              <Image
                src={`https://image.mux.com/${video.mux_playback_id}/thumbnail.jpg?width=80&height=60&fit_mode=crop`}
                alt={`Video ${i + 1}`}
                width={80}
                height={80}
                className="w-16 h-12 object-cover rounded border border-fog flex-shrink-0 bg-chalk"
              />
              <div>
                <p className="font-mono text-xs text-granite">Video {i + 1}</p>
                <p className="font-mono text-xs text-stone/50">
                  Uploaded by: {video.uploaded_by}
                </p>
                <p className="font-mono text-xs text-stone/50">
                  {new Date(video.created_at).toLocaleDateString()} ·{" "}
                  {video.upload_status}
                </p>
              </div>
            </div>

            {pendingDelete?.id === video.id ? (
              <div className="flex items-center gap-2">
                {deleteError && (
                  <span className="font-mono text-xs text-red-400">
                    {deleteError}
                  </span>
                )}
                <button
                  onClick={() => {
                    setPendingDelete(null);
                    setDeleteError(null);
                  }}
                  className="font-mono text-xs text-stone tracking-wide px-3 py-1 border border-fog rounded hover:border-stone transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                  className="font-mono text-xs text-white bg-red-500 hover:bg-red-600 transition-colors px-3 py-1 rounded disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Confirm"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setPendingDelete(video)}
                className="font-mono text-xs text-stone/50 hover:text-red-400 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
}
