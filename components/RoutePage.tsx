import { Route, VideoWithDetails } from "@/app/types/types";
import Link from "next/link";
import VideoGrid from "./VideoGrid";
import RoutePageHeader from "./RoutePageHeader";

type RoutePageProps = {
  videos: VideoWithDetails[];
  routeId: string;
  gymId: string;
  route: Route;
};

export default function RoutePage({
  videos,
  routeId,
  gymId,
  route,
}: RoutePageProps) {
  return (
    <>
      <RoutePageHeader route={route} gym={gymId} videos={videos} />
      {/* ── Videos Section ── */}
      <section className="px-10 pt-10">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.22em] uppercase text-stone">
            Beta Videos
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-clay text-white text-[10px] tracking-normal">
              {videos.length}
            </span>
          </h2>

          <Link
            href={`/upload?routeId=${routeId}&gymId=${gymId}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-clay text-clay text-[11px] tracking-widest uppercase transition-all duration-150 hover:bg-clay hover:text-white"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload Beta
          </Link>
        </div>

        {/* Grid */}
        {videos.length > 0 ? (
          // <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          //   {videos.map((v) => (
          //     <VideoCard key={v.id} video={v} />
          //   ))}
          // </div>
          <VideoGrid videos={videos} isProfile={false} />
        ) : (
          <div className="flex flex-col items-center gap-5 py-16 text-stone text-[13px] tracking-wide">
            <p>No beta yet. Be the first to upload.</p>
            <Link
              href={`/upload?routeId=${routeId}&gymId=${gymId}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-clay text-white text-[11px] tracking-widest uppercase transition-opacity hover:opacity-85"
            >
              Upload Beta
            </Link>
          </div>
        )}
      </section>

      {/* ── Upload CTA Strip ── */}
      <section id="upload" className="mx-10 mt-12">
        <div className="flex items-center justify-between flex-wrap gap-5 px-8 py-7 bg-granite rounded-xl border border-clay/20">
          <div>
            <p className="font-serif text-xl text-chalk mb-1">
              Know the beta for this route?
            </p>
            <p className="text-[11px] tracking-widest text-stone uppercase">
              Upload your video and help other climbers send it.
            </p>
          </div>
          <Link href={`/upload?routeId=${routeId}&gymId=${gymId}`}>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-clay text-white font-mono text-[12px] tracking-widest uppercase border-none cursor-pointer transition-all duration-150 hover:opacity-85 hover:-translate-y-px">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload Beta
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
