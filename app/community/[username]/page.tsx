import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProfileByUsername, getVideosByUser } from "@/lib/data-services";
import { Spinner } from "@/components/ui/spinner";
import PublicProfilePage from "./PublicProfilePage";

async function ProfileContent({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = await getProfileByUsername(username);
  if (!profile) notFound();

  const videos = await getVideosByUser(username);
  return <PublicProfilePage profile={profile} videos={videos} />;
}

export default function CommunityUserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-chalk">
          <Spinner className="size-20 mx-auto mt-32" />
        </div>
      }
    >
      <ProfileContent params={params} />
    </Suspense>
  );
}
