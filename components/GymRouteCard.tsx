import { Gym, Route } from "@/app/types/types";
import Link from "next/link";

const HOLD_COLOR_HEX: Record<string, string> = {
  yellow: "#E8B84B",
  blue: "#4B8FE8",
  red: "#E84B4B",
  green: "#4BE87A",
  black: "#1A1A1A",
  orange: "#E87A4B",
  purple: "#8B4BE8",
  pink: "#E84BA8",
  white: "#EFEFEF",
};

function IconPlay() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

type GymRouteCardProps = {
  route: Route;
  gym: Gym;
};

export default function GymRouteCard({ route, gym }: GymRouteCardProps) {
  const dotColor = HOLD_COLOR_HEX[route.color] ?? "#8C7B6B";

  return (
    <Link href={`/gyms/${gym.slug}-${gym.id}/${route.id}`}>
      <div className="bg-white border border-fog rounded-xl cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:border-clay hover:shadow-lg">
        <div className="p-[18px]">
          {/* Grade + hold color dot */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-clay text-[15px] font-medium tracking-tight font-mono">
              {route.grade}
            </span>
            <span
              className="w-2.5 h-2.5 rounded-full border border-black/10 flex-shrink-0"
              style={{ backgroundColor: dotColor }}
              title={route.color}
            />
          </div>

          {/* Name */}
          <div className="font-serif text-granite text-[16px] leading-snug mb-1.5">
            {route.name}
          </div>

          {/* Wall tag */}
          <div className="mb-3.5">
            <span className="text-[8px] tracking-[0.2em] uppercase text-stone bg-chalk rounded px-1.5 py-0.5">
              {route.wall_name}
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-chalk">
            <div className="flex items-center gap-1 text-clay bg-clay/10 text-[9px] tracking-[0.1em] px-2 py-1 rounded-full">
              <IconPlay />
              {route.video_count} video{route.video_count !== 1 ? "s" : ""}
            </div>
            <span className="text-[9px] tracking-[0.08em] text-stone">
              {route.created_at.split("T")[0]}{" "}
              {/* Display only the date part */}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
