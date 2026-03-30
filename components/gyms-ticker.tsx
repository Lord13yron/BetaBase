import { getGyms } from "@/lib/data-services";

export default async function GymsTicker() {
  const GYMS = await getGyms();

  return (
    <div className="w-full bg-[#C17A5A] py-3 overflow-hidden border-y border-[#A0522D]">
      <div className="flex animate-[slide_10s_linear_infinite] gap-8 whitespace-nowrap">
        {[...GYMS, ...GYMS, ...GYMS].map((g, i) => (
          <span
            key={i}
            className="font-mono text-[10px] tracking-widest uppercase text-white/80 flex items-center gap-8"
          >
            {g.name} <span className="text-white/30">·</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes slide { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
    </div>
  );
}
