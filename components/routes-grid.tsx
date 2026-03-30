"use client";

import { Route } from "@/app/types/types";
import { useFadeIn } from "./hero";
import RouteCard from "./routeCard";
import Link from "next/link";

type RoutesGridProps = {
  routes: Route[];
};

export default function RoutesGrid({ routes }: RoutesGridProps) {
  const routesFade = useFadeIn();
  return (
    <section className="w-full py-24 px-6 bg-chalk">
      <div
        ref={routesFade.ref}
        className="max-w-6xl mx-auto"
        style={{
          opacity: routesFade.visible ? 1 : 0,
          transform: routesFade.visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#C17A5A] block mb-3">
              Trending this week
            </span>
            <h2 className="font-serif text-4xl text-[#3A3330] leading-tight">
              Hot routes.
              <br />
              <em className="text-[#8C7B6B]">Fresh beta.</em>
            </h2>
          </div>
          <Link href="/gyms">
            <button className="text-[10px] tracking-widest uppercase text-[#8C7B6B] hover:text-[#3A3330] transition-colors border-b border-[#D6CAB8] pb-0.5 self-start md:self-auto">
              Browse Gyms and Find your route →
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {routes.map((r, i) => (
            <RouteCard key={r.name} route={r} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
