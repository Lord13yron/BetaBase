import GymsClient from "@/components/GymsClient";
import { getGyms } from "@/lib/data-services";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

function GymContentSkeleton() {
  return (
    <>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 px-10 pt-8 pb-6">
        {/* Search input */}
        <div className="animate-pulse flex-1 min-w-[260px] max-w-sm h-10 rounded-lg bg-fog/50" />
        {/* Tag filter pills */}
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-8 w-16 rounded-full bg-fog/50"
            />
          ))}
        </div>
        {/* Result count */}
        <div className="animate-pulse ml-auto h-3 w-14 rounded bg-fog/50" />
      </div>

      {/* Grid */}
      <div className="px-10 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-fog bg-chalk overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="h-28 bg-gradient-to-br from-[#3A3330] to-[#5C4033]" />
              {/* Card body */}
              <div className="p-4 space-y-2">
                {/* Name */}
                <div className="h-5 w-3/4 rounded bg-fog/70" />
                {/* Location */}
                <div className="h-3 w-1/2 rounded bg-fog/50" />
                {/* Tag pills */}
                <div className="flex gap-1.5 pt-1">
                  <div className="h-4 w-14 rounded-full bg-fog/40" />
                  <div className="h-4 w-14 rounded-full bg-fog/40" />
                </div>
                {/* Footer */}
                <div className="flex justify-between pt-1">
                  <div className="h-3 w-16 rounded bg-fog/50" />
                  <div className="h-3 w-14 rounded bg-fog/50" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

async function GymsContent() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [gyms, favoritesResult] = await Promise.all([
    getGyms(),
    user
      ? supabase
          .from("user_favorite_gyms")
          .select("gym_id")
          .eq("user_id", user.id)
      : Promise.resolve({ data: [] }),
  ]);

  const initialFavoriteIds = (favoritesResult.data ?? []).map(
    (r: { gym_id: number }) => r.gym_id,
  );
  return (
    <GymsClient
      gyms={gyms}
      initialFavoriteIds={initialFavoriteIds}
      isLoggedIn={!!user}
    />
  );
}

export default function GymsPage() {
  return (
    <div className="min-h-screen bg-chalk">
      {/* Header */}
      <div className="px-10 pt-14">
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone mb-3">
          — Find Your Gym
        </p>
        <h1 className="font-serif text-5xl leading-tight text-granite max-w-xl mb-2">
          Every gym. <span className="italic text-clay">Every route.</span>
        </h1>
        <p className="font-mono font-light text-sm text-stone leading-relaxed max-w-md">
          Select a gym to browse community-uploaded beta videos for every climb.
        </p>
      </div>
      <Suspense fallback={<GymContentSkeleton />}>
        <GymsContent />
      </Suspense>
    </div>
  );
}
