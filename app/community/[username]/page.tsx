import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProfileByUsername, getVideosByUser } from "@/lib/data-services";
import PublicProfilePage from "./PublicProfilePage";

import { Skeleton } from "@/components/ui/skeleton";

function ProfileContentSkeleton() {
  return (
    <main className="min-h-screen bg-chalk">
      {/* Header */}
      <div className="bg-granite px-6 pt-12 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* ← Community link */}
          <Skeleton className="h-3 w-20 mb-6" />

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-6">
            <div className="flex gap-8">
              {/* Avatar (large = w-20 h-20) */}
              <Skeleton className="w-20 h-20 rounded-full flex-shrink-0" />

              <div className="flex-1 min-w-0 pb-1 flex flex-col gap-2 justify-end">
                {/* Username */}
                <Skeleton className="h-7 w-36" />
                {/* Height */}
                <Skeleton className="h-3 w-20" />
                {/* Home gym */}
                <Skeleton className="h-3 w-28" />
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="flex gap-8 border-t border-white/5 pt-5">
            {/* Videos pill */}
            <div className="flex flex-col items-center gap-0.5">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-2.5 w-12" />
            </div>
            <div className="w-px bg-white/5" />
            {/* Total Views pill */}
            <div className="flex flex-col items-center gap-0.5">
              <Skeleton className="h-6 w-10" />
              <Skeleton className="h-2.5 w-16" />
            </div>
            <div className="w-px bg-white/5" />
            {/* Member pill */}
            <div className="flex flex-col items-center gap-0.5">
              <Skeleton className="h-6 w-14" />
              <Skeleton className="h-2.5 w-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* "Beta Videos" heading row */}
        <div className="flex items-center gap-3 pb-3 border-b-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>

        {/* Grid matches VideoGrid's layout + pt-10 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-video w-full rounded-lg" />
          ))}
        </div>
      </div>
    </main>
  );
}

async function ProfileContent({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = await getProfileByUsername(username);
  if (!profile) notFound();

  const videos = await getVideosByUser(profile.id);
  return <PublicProfilePage profile={profile} videos={videos} />;
}

export default function CommunityUserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  return (
    <Suspense fallback={<ProfileContentSkeleton />}>
      <ProfileContent params={params} />
    </Suspense>
  );
}
