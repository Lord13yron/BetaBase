import { UserProfile } from "@/app/types/types";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { getInitials } from "@/lib/utils";

type AvatarProps = {
  profile: UserProfile;
  size?: "large" | "small";
};

export default function Avatar({ profile, size = "large" }: AvatarProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {profile.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.username}
            width={80}
            height={80}
            className={`${size === "large" ? "w-20 h-20" : "w-10 h-10"} rounded-full object-cover ring-2 ring-[#C17A5A]/30`}
          />
        ) : (
          <div
            className={`${
              size === "large" ? "w-20 h-20" : "w-10 h-10"
            } rounded-full bg-[#C17A5A]/15 ring-2 ring-[#C17A5A]/30 flex items-center justify-center`}
          >
            <span className="font-serif text-2xl text-[#C17A5A] select-none">
              {getInitials(profile)}
            </span>
          </div>
        )}
      </TooltipTrigger>
      {size === "small" && (
        <TooltipContent className="bg-clay text-chalk">
          <p>View Profile</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
