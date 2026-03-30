import { Gym } from "@/app/types/types";
import { BetaBaseIcon } from "@/lib/utils";
import Link from "next/link";

interface GymCardProps {
  gym: Gym;
  index: number;
}

// Fallback gradients for gyms without a thumbnail
const CARD_GRADIENTS = [
  "from-[#3A3330] to-[#5C4033]",
  "from-[#4A3828] to-[#7A5540]",
  "from-[#362E2B] to-[#614535]",
  "from-[#2E2926] to-[#4D3828]",
  "from-[#3D3028] to-[#6B4A38]",
];

export function GymCard({ gym, index }: GymCardProps) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <Link
      href={`/gyms/${gym.slug}-${gym.id}`}
      className="group block rounded-xl border border-fog bg-chalk overflow-hidden no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-clay"
    >
      {/* Thumbnail */}
      <div
        className={`relative h-28 flex items-center justify-center bg-gradient-to-br ${gradient}`}
        style={
          gym.logo_url
            ? {
                backgroundImage: `url(${gym.logo_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {!gym.logo_url && <BetaBaseIcon size={36} light={true} />}

        {/* Video count badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-granite/75 backdrop-blur-sm">
          <svg
            width="9"
            height="9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C17A5A"
            strokeWidth="2.5"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span className="font-mono text-[9px] tracking-wider text-chalk">
            {gym.video_count} videos
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <p className="font-serif text-lg leading-tight text-granite mb-1">
          {gym.name}
        </p>
        <p className="font-mono text-[10px] tracking-widest uppercase text-stone mb-3">
          {gym.city}, {gym.province}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {gym.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full border border-fog text-stone"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-wide text-stone">
            {gym.route_count} routes
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-clay">
            View gym
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
