"use client";
import { BetaBaseIcon } from "@/lib/utils";
import { useFadeIn } from "./hero";
import { Gym } from "@/app/types/types";
import Link from "next/link";

type GymSectionMainContentProps = {
  GYMS: Gym[];
};

export default function GymSectionMainContent({
  GYMS,
}: GymSectionMainContentProps) {
  const gymsFade = useFadeIn();
  return (
    <section className="w-full py-24 px-6 bg-sand">
      <div
        ref={gymsFade.ref}
        className="max-w-6xl mx-auto"
        style={{
          opacity: gymsFade.visible ? 1 : 0,
          transform: gymsFade.visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-clay block mb-3">
              Supported gyms
            </span>
            <h2 className="font-serif text-4xl text-[#3A3330]">
              Your gym is here.
            </h2>
          </div>
          <Link href="/gyms">
            <button className="text-[10px] tracking-widest uppercase text-stone hover:text-granite transition-colors border-b border-[#8C7B6B]/30 pb-0.5 self-start md:self-auto">
              Find your gym →
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GYMS.map((gym) => (
            <Link href={`/gyms/${gym.slug}-${gym.id}`} key={gym.name}>
              <div className="bg-chalk border border-fog rounded-xl p-5 hover:border-clay/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-granite flex items-center justify-center mb-3">
                  <BetaBaseIcon size={18} light />
                </div>
                <div className="font-serif text-granite text-sm leading-tight">
                  {gym.name}
                </div>
                <div className="font-serif text-stone/70 text-sm leading-tight">
                  {gym.city}, {gym.province}
                </div>
                <div className="font-mono text-[9px] tracking-widest uppercase text-clay mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View routes →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
