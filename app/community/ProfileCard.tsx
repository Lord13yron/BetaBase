import Link from "next/link";
import { UserProfileWithCounts } from "../types/types";
import CommunityAvatar from "./CommunityAvatar";
import { getInitials } from "@/lib/utils";

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// function getInitials(profile: UserProfileWithCounts): string {
//   if (profile.full_name) {
//     return profile.full_name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   }
//   return profile.username.slice(0, 2).toUpperCase();
// }

export default function ProfileCard({
  profile,
}: {
  profile: UserProfileWithCounts;
}) {
  return (
    <Link
      href={`/community/${profile.username}`}
      className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white border border-fog hover:border-clay/50 hover:shadow-sm transition-all duration-150 group text-center"
    >
      <CommunityAvatar
        avatarUrl={profile.avatar_url}
        initials={getInitials(profile)}
      />
      <div className="w-full min-w-0">
        <div className="font-mono text-sm text-granite font-medium group-hover:text-clay transition-colors truncate">
          {profile.username}
        </div>
        <div className="font-mono text-xs text-stone truncate mt-0.5">
          {profile.home_gym ? profile.home_gym : "Unknown gym"}
        </div>
      </div>
      <div className="flex gap-4 mt-1">
        <div className="text-center">
          <div className="font-mono text-sm font-medium text-granite">
            {profile.upload_count}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-stone">
            videos
          </div>
        </div>
        <div className="w-px bg-fog" />
        <div className="text-center">
          <div className="font-mono text-sm font-medium text-granite">
            {formatViews(profile.total_views)}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-stone">
            views
          </div>
        </div>
      </div>
    </Link>
  );
}
