"use client";

// app/community/CommunityClient.tsx

import { useState, useMemo } from "react";
import { UserProfileWithCounts } from "../types/types";
import ProfileCard from "./ProfileCard";
import GymFilter from "./GymFilter";

type SortKey = "views" | "videos" | "username";

export default function CommunityClient({
  profiles,
}: {
  profiles: UserProfileWithCounts[];
}) {
  const [sort, setSort] = useState<SortKey>("views");

  const [search, setSearch] = useState("");

  const processed = useMemo(() => {
    const result = search
      ? profiles.filter(
          (p) =>
            p.username.toLowerCase().includes(search.toLowerCase()) ||
            p.home_gym?.toLowerCase().includes(search.toLowerCase()),
        )
      : [...profiles];

    result.sort((a, b) => {
      if (sort === "views") return b.total_views - a.total_views;
      if (sort === "videos") return b.upload_count - a.upload_count;
      if (sort === "username") return a.username.localeCompare(b.username);
      return 0;
    });

    return result;
  }, [profiles, search, sort]);

  const SORT_OPTIONS: { key: SortKey; label: string }[] = [
    { key: "views", label: "Most views" },
    { key: "videos", label: "Most videos" },
    { key: "username", label: "Username" },
  ];

  return (
    <div className="min-h-screen bg-chalk">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-serif text-4xl text-granite mb-2">Climbers</h1>
          <p className="font-mono text-sm text-stone">
            {profiles.length} climbers sharing beta
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Gym filter */}

          <GymFilter search={search} setSearch={setSearch} />

          {/* Sort */}
          <div className="flex gap-1 flex-shrink-0">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSort(opt.key)}
                className={`font-mono text-xs px-3 py-2 rounded-lg transition-all duration-150 ${
                  sort === opt.key
                    ? "bg-clay text-white"
                    : "text-stone hover:text-granite"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {processed.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-mono text-sm text-stone">
              No climbers at this gym yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {processed.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
