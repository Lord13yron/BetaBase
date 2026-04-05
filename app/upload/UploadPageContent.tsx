"use client";

import ChooseClimbAndUpload from "@/app/upload/ChooseClimbAndUpload";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useCallback, useEffect } from "react";
import { Route } from "../types/types";

export default function UploadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeId = searchParams.get("routeId");
  const gymId = searchParams.get("gymId");

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "processing" | "error"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [routeDetails, setRouteDetails] = useState<Route | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!routeId) return;

    const fetchRouteDetails = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("routes_with_details")
          .select("*")
          .eq("id", Number(routeId))
          .single();
        if (error) throw error;
        if (data) {
          setRouteDetails(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRouteDetails();
  }, [routeId]);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("video/")) {
      alert("Please select a video file.");
      return;
    }
    setFile(f);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const handleUpload = async () => {
    if (!file || !routeId) return;

    setStatus("uploading");
    setProgress(0);

    try {
      const res = await fetch("/api/videos/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ routeId }),
      });

      if (!res.ok) throw new Error("Failed to get upload URL");
      const { uploadUrl } = await res.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        });
        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve();
          else reject(new Error("Upload failed"));
        });
        xhr.addEventListener("error", () => reject(new Error("Upload failed")));
        xhr.open("PUT", uploadUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });

      setStatus("processing");

      setTimeout(() => {
        setStatus("idle");
        setFile(null);
        router.push(`/gyms/${gymId}/${routeId}`);
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (!routeId) {
    return <ChooseClimbAndUpload />;
  }

  return (
    <div className="min-h-screen bg-chalk flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-serif text-4xl text-granite">Upload Beta</h1>
          <p className="font-mono text-xs tracking-widest uppercase text-stone mt-2">
            Share your beta with the community
          </p>
        </div>

        {/* Route breadcrumb */}
        {routeDetails && (
          <div className="mb-8 px-4 py-3 rounded-lg bg-sand/60 border border-fog flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-stone">
              {routeDetails.gym_name}
            </span>
            <span className="text-fog font-mono text-xs">›</span>
            <span className="font-mono text-xs text-stone">
              {routeDetails.wall_name}
            </span>
            <span className="text-fog font-mono text-xs">›</span>
            <span className="font-mono text-xs text-granite font-medium">
              {routeDetails.name}
            </span>
          </div>
        )}

        {/* Drop zone */}
        {status === "idle" && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => inputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-xl p-16 text-center cursor-pointer
              transition-colors duration-200
              ${
                dragOver
                  ? "border-clay bg-sand"
                  : file
                    ? "border-clay bg-sand/40"
                    : "border-fog hover:border-stone bg-white/40"
              }
            `}
          >
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFile(e.target.files[0])
              }
            />

            {file ? (
              <div>
                <div className="font-mono text-sm text-granite font-medium truncate">
                  {file.name}
                </div>
                <div className="font-mono text-xs text-stone mt-1">
                  {(file.size / (1024 * 1024)).toFixed(1)} MB
                </div>
              </div>
            ) : (
              <div>
                <div className="font-mono text-sm text-stone">
                  Drop video here or{" "}
                  <span className="text-clay underline">browse</span>
                </div>
                <div className="font-mono text-xs text-fog mt-2 tracking-wide">
                  MP4, MOV, or any video format
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upload progress */}
        {status === "uploading" && (
          <div className="bg-white/40 rounded-xl p-10 text-center border border-fog">
            <div className="font-mono text-xs tracking-widest uppercase text-stone mb-4">
              Uploading
            </div>
            <div className="w-full bg-fog rounded-full h-1 mb-3">
              <div
                className="bg-clay h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="font-mono text-xs text-stone">{progress}%</div>
          </div>
        )}

        {/* Processing state */}
        {status === "processing" && (
          <div className="bg-white/40 rounded-xl p-10 text-center border border-fog">
            <div className="font-mono text-xs tracking-widest uppercase text-stone mb-2">
              Processing
            </div>
            <p className="font-mono text-xs text-stone/70">
              Your video is being transcoded. Redirecting you back…
            </p>
          </div>
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="bg-white/40 rounded-xl p-10 text-center border border-fog">
            <div className="font-mono text-xs tracking-widest uppercase text-red-400 mb-2">
              Upload failed
            </div>
            <button
              onClick={() => setStatus("idle")}
              className="font-mono text-xs text-clay underline mt-2"
            >
              Try again
            </button>
          </div>
        )}

        {/* Upload button */}
        {status === "idle" && file && (
          <button
            onClick={handleUpload}
            className="
              mt-6 w-full py-4 rounded-xl
              bg-granite text-chalk font-mono text-xs tracking-widest uppercase
              hover:bg-clay transition-colors duration-200
            "
          >
            Upload Video
          </button>
        )}

        {/* Cancel */}
        {status === "idle" && (
          <button
            onClick={() => router.back()}
            className="mt-4 w-full py-3 font-mono text-xs tracking-widest uppercase text-stone hover:text-granite transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
