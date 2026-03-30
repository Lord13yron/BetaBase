import { Suspense } from "react";
import CommunityClient from "./CommunityClient";
import { getAllUserProfiles} from "@/lib/data-services";

export default function CommunityPage() {
  return (
    <Suspense fallback={<CommunitySkeleton />}>
      <CommunityContent />
    </Suspense>
  );
}

async function CommunityContent() {
  
  const profiles = await getAllUserProfiles();
  return <CommunityClient  profiles={profiles} />;
}

function CommunitySkeleton() {
  return (
    <div className="min-h-screen bg-chalk animate-pulse">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="h-8 w-36 bg-fog rounded mb-4" />
        <div className="h-4 w-52 bg-fog rounded mb-10" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="h-9 w-full sm:w-64 bg-fog rounded"/>
        <div className="flex gap-3 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-9 w-24 bg-fog rounded" />
          ))}
        </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-36 bg-fog rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
