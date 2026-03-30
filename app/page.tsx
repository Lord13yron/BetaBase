import EmailSection from "@/components/email-section";
import GymSectionMain from "@/components/gym-section-main";
import GymsTicker from "@/components/gyms-ticker";
import GymSectionMainSkeleton from "@/components/GymSectionMainSkeleton";
import { Hero } from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import RoutesGrid from "@/components/routes-grid";
import RoutesGridSkeleton from "@/components/RoutesGridSkeleton";
import { getAllRoutes } from "@/lib/data-services";
import { Suspense } from "react";

async function RoutesGridFetcher() {
  const routes = await getAllRoutes();
  return <RoutesGrid routes={routes} />;
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Hero />
      <Suspense
        fallback={
          <div className="w-full bg-clay py-2 overflow-hidden text-fog text-center">
            Loading gyms...
          </div>
        }
      >
        <GymsTicker />
      </Suspense>
      <Suspense fallback={<RoutesGridSkeleton />}>
        <RoutesGridFetcher />
      </Suspense>
      <HowItWorks />
      <Suspense fallback={<GymSectionMainSkeleton />}>
        <GymSectionMain />
      </Suspense>
      <EmailSection />
    </main>
  );
}
