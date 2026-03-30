import { Route } from "@/app/types/types";
import Link from "next/link";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export default function RouteCard({
  route,
  delay = 0,
}: {
  route: Route;
  delay?: number;
}) {
  return (
    <Link
      href={`/gyms/${slugify(route.gym_name)}-${route.gym_id}/${route.id}`}
      className="group rounded-xl overflow-hidden border border-[#D6CAB8] bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer p-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs tracking-widest text-[#C17A5A] bg-[#C17A5A]/10 px-2 py-1 rounded-full">
          {route.grade}
        </span>
        <span className="font-mono text-[9px] tracking-widest text-[#C17A5A] uppercase group-hover:underline">
          Watch →
        </span>
      </div>
      <div className="font-serif text-[#3A3330] text-lg leading-tight mb-1">
        {route.name}
      </div>
      <div className="font-mono text-[10px] tracking-widest uppercase text-[#8C7B6B] mb-3">
        {route.gym_name}
      </div>
      <div className="flex items-center gap-1.5">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C17A5A"
          strokeWidth="2"
        >
          <path d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M3 8h12v8H3z" />
        </svg>
        <span className="font-mono text-[10px] text-[#8C7B6B] tracking-wide">
          {route.video_count} beta videos
        </span>
      </div>
    </Link>
  );
}
