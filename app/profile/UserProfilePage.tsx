"use client";

import { useState } from "react";
import { UserProfile, VideoWithDetails } from "../types/types";
import { LogoutButton } from "@/components/logout-button";
import VideoGrid from "@/components/VideoGrid";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import EditProfileModal from "./EditProfileModal";
import { useRouter } from "next/navigation";
import StatPill from "@/components/StatPill";
import { formatDate, getMemberDuration } from "@/lib/utils";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Helper to format height:
function formatHeight(cm: number, unit: "cm" | "ft"): string {
  if (unit === "cm") return `${cm} cm`;
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
}

type UserProfilePageProps = {
  videos: VideoWithDetails[];
  profile: UserProfile;
};

export default function UserProfilePage({
  videos,
  profile,
}: UserProfilePageProps) {
  const [tab, setTab] = useState<"videos" | "info">("videos");
  const readyVideos = videos.filter((v) => v.upload_status === "ready");
  const totalViews = readyVideos.reduce((acc, v) => acc + v.views, 0);
  const [editOpen, setEditOpen] = useState(false);
  const router = useRouter();
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("ft");

  return (
    <main className="min-h-screen bg-[#F5EFE6]">
      {/* ── Header band ── */}
      <div className="bg-[#3A3330] px-6 pt-12 pb-0">
        <div className="max-w-4xl mx-auto">
          {/* Avatar + name row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-6">
            <div className="flex gap-8">
              <Avatar profile={profile} />

              <div className="flex-1 min-w-0 pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-serif text-2xl text-[#F5EFE6] leading-none">
                    {profile.full_name ? profile.full_name : profile.username}
                  </h1>
                </div>
                <p className="font-mono text-[11px] tracking-wider text-[#8C7B6B] mt-1">
                  @{profile.username}
                </p>
                {profile.home_gym && (
                  <p className="font-mono text-[11px] text-[#C17A5A] mt-1.5 flex items-center gap-1.5">
                    <svg
                      className="w-3 h-3 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    {profile.home_gym}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditOpen(true)}
                className="px-5 py-2.5 bg-clay text-white rounded-full text-[10px] tracking-[0.12em] uppercase font-mono cursor-pointer hover:bg-clay/90 transition-colors"
              >
                Edit Profile
              </button>
              {editOpen && (
                <EditProfileModal
                  profile={profile}
                  onClose={() => setEditOpen(false)}
                  onSave={() => {
                    router.refresh();
                    setEditOpen(false);
                  }}
                />
              )}
              <LogoutButton />
            </div>
          </div>

          {/* Stats strip */}
          <div className="flex gap-8 border-t border-white/5 pt-5 pb-0">
            <StatPill label="Videos" value={videos.length} />
            <div className="w-px bg-white/5" />
            <StatPill label="Total Views" value={totalViews.toLocaleString()} />
            <div className="w-px bg-white/5" />
            <StatPill
              label="Member"
              value={getMemberDuration(profile.created_at)}
            />
          </div>

          {/* Tab bar */}
          <div className="flex gap-6 mt-6 -mb-px">
            {(["videos", "info"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`font-mono text-[10px] uppercase tracking-widest pb-3 border-b-2 transition-colors duration-200 ${
                  tab === t
                    ? "border-[#C17A5A] text-[#F5EFE6]"
                    : "border-transparent text-[#8C7B6B] hover:text-[#F5EFE6]"
                }`}
              >
                {t === "videos"
                  ? `Beta Videos (${videos.length})`
                  : "Profile Info"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Videos tab */}
        {tab === "videos" && (
          <>
            {videos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#3A3330]/10 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-[#8C7B6B]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#8C7B6B]">
                  No beta videos yet
                </p>
                <Link href="/upload">
                  <button className="font-mono text-[10px] uppercase tracking-widest text-white bg-[#C17A5A] px-5 py-2.5 rounded-lg hover:bg-[#C17A5A]/90 transition-colors">
                    Upload Beta
                  </button>
                </Link>
              </div>
            ) : (
              <VideoGrid videos={videos} isProfile={true} />
            )}
          </>
        )}

        {/* Info tab */}
        {tab === "info" && (
          <div className="max-w-lg space-y-1">
            {[
              { label: "Full Name", value: profile.full_name ?? "—" },
              { label: "Username", value: `@${profile.username}` },
              { label: "Email", value: profile.email },
              { label: "Home Gym", value: profile.home_gym ?? "—" },
              { label: "Member Since", value: formatDate(profile.created_at) },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between py-3.5 border-b border-[#3A3330]/10 last:border-0"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C7B6B]">
                  {label}
                </span>
                <span className="font-mono text-sm text-[#3A3330]">
                  {value}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between py-3.5 border-b border-[#3A3330]/10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C7B6B]">
                Height
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-[#3A3330]">
                  {profile.height
                    ? formatHeight(profile.height, heightUnit)
                    : "—"}
                </span>
                {profile.height && (
                  <button
                    onClick={() =>
                      setHeightUnit((u) => (u === "cm" ? "ft" : "cm"))
                    }
                    className="font-mono text-[9px] uppercase tracking-widest text-[#C17A5A] border border-[#C17A5A]/40 rounded px-1.5 py-0.5 hover:bg-[#C17A5A]/10 transition-colors"
                  >
                    {heightUnit === "cm" ? "ft" : "cm"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
