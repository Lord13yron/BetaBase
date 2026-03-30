"use client";

import { UserProfileWithCounts, VideoWithDetails } from "@/app/types/types";
import VideoGrid from "@/components/VideoGrid";
import CommunityAvatar from "@/app/community/CommunityAvatar";
import Link from "next/link";

import StatPill from "@/components/StatPill";
import { getInitials, getMemberDuration } from "@/lib/utils";

export default function PublicProfilePage({
  profile,
  videos,
}: {
  profile: UserProfileWithCounts;
  videos: VideoWithDetails[];
}) {
  const readyVideos = videos.filter((v) => v.upload_status === "ready");

  return (
    <main className="min-h-screen bg-chalk">
      {/* Header */}
      <div className="bg-granite px-6 pt-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/community"
            className="font-mono text-[10px] uppercase tracking-widest text-stone hover:text-chalk transition-colors mb-6 inline-block"
          >
            ← Community
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-6">
            <div className="flex gap-8">
              <CommunityAvatar
                avatarUrl={profile.avatar_url}
                initials={getInitials(profile)}
                size="large"
              />
              <div className="flex-1 min-w-0 pb-1">
                <h1 className="font-serif text-2xl text-chalk leading-none">
                  {profile.username}
                </h1>
                <p className="font-mono text-[11px] tracking-wider text-stone mt-1">
                  {profile.height ? `${profile.height} cm` : "unknown height"}
                </p>
                {profile.home_gym && (
                  <p className="font-mono text-[11px] text-clay mt-1.5">
                    {profile.home_gym}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="flex gap-8 border-t border-white/5 pt-5">
            <StatPill label="Videos" value={readyVideos.length} />
            <div className="w-px bg-white/5" />
            <StatPill
              label="Total Views"
              value={profile.total_views.toLocaleString()}
            />
            <div className="w-px bg-white/5" />
            <StatPill
              label="Member"
              value={getMemberDuration(profile.created_at)}
            />
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {readyVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-stone">
              No beta videos yet
            </p>
          </div>
        ) : (
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest pb-3 border-b-2 text-[#8C7B6B] ">
              Beta Videos
              <span className="mx-3 inline-flex items-center justify-center w-5 h-5 rounded-full bg-clay text-white text-[10px] tracking-normal">
                {videos.length}
              </span>
            </h3>
            <VideoGrid videos={readyVideos} isProfile={true} isPublic={true} />
          </div>
        )}
      </div>
    </main>
  );
}
