import Image from "next/image";

export default function CommunityAvatar({
  avatarUrl,
  initials,
  size = "small",
}: {
  avatarUrl: string | null;
  initials: string;
  size?: "small" | "large";
}) {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={initials}
        width={size === "large" ? 80 : 48}
        height={size === "large" ? 80 : 48}
        className={`${size === "large" ? "w-20 h-20" : "w-12 h-12"} rounded-full object-cover`}
      />
    );
  }
  return (
    <div
      className={`${size === "large" ? "w-20 h-20" : "w-12 h-12"} rounded-full bg-clay/15 ring-2 ring-clay/30 flex items-center justify-center font-mono text-sm font-medium text-chalk flex-shrink-0`}
    >
      <span className="font-serif text-2xl text-[#C17A5A] select-none">
        {initials}
      </span>
    </div>
  );
}
