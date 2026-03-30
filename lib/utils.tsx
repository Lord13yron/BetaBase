import { UserProfile, UserProfileWithCounts } from "@/app/types/types";
import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function BetaBaseIcon({
  size = 32,
  light = false,
}: {
  size?: number;
  light?: boolean;
}) {
  const peak = light ? "#F5EFE6" : "#3A3330";
  const accent = "#C17A5A";
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <ellipse
        cx="28"
        cy="44"
        rx="18"
        ry="5"
        stroke={accent}
        strokeWidth="1.8"
      />
      <line x1="10" y1="28" x2="10" y2="44" stroke={accent} strokeWidth="1.8" />
      <line x1="46" y1="28" x2="46" y2="44" stroke={accent} strokeWidth="1.8" />
      <path
        d="M10 36 Q28 41 46 36"
        stroke={accent}
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.45"
      />
      <ellipse cx="28" cy="28" rx="18" ry="5" stroke={peak} strokeWidth="1.8" />
      <path
        d="M20 28 L28 12 L36 28"
        stroke={peak}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="12" r="2.2" fill={accent} />
      <circle cx="17" cy="22" r="1.4" fill={accent} opacity="0.65" />
      <circle cx="39" cy="20" r="1.4" fill={accent} opacity="0.65" />
    </svg>
  );
}

export function formatViews(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function getMemberDuration(iso: string): string {
  const months = Math.floor(
    (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24 * 30),
  );
  if (months < 1) return "Joined this month";
  if (months < 12) return `${months}mo member`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem > 0 ? `${years}y ${rem}mo member` : `${years}y member`;
}

export function getInitials(
  profile: UserProfileWithCounts | UserProfile,
): string {
  if (profile.username) {
    return profile.username.toUpperCase().slice(0, 2);
  }
  return profile.email.slice(0, 2).toUpperCase();
}
