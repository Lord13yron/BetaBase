import { getUserProfile, getVideosByUser } from "@/lib/data-services";
import { Suspense } from "react";
import UserProfilePage from "./UserProfilePage";
import { Spinner } from "@/components/ui/spinner";

async function ProfileContent() {
  const profile = await getUserProfile();
  const videos = await getVideosByUser(profile.username);
  return <UserProfilePage profile={profile} videos={videos} />;
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-chalk">
          <div className="pt-32 bg-chalk" />
          <Spinner className="size-20 mx-auto" />
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}

// import { getUserProfile, getVideosByUser } from "@/lib/data-services";

// import UserProfilePage from "./UserProfilePage";

// async function ProfileContent() {
//   const profile = await getUserProfile();
//   const videos = await getVideosByUser(profile.username);
//   return <UserProfilePage profile={profile} videos={videos} />;
// }

// export default function ProfilePage() {
//   return <ProfileContent />;
// }
