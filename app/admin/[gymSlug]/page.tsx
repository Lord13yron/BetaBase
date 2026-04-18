import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import WallsPanel from "./WallsPanel";
import { Route, Wall } from "@/app/types/types";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { gradeToNumber } from "@/lib/utils";
import { verifyAdmin } from "./actions";

function AdminDashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-white border border-fog rounded-lg px-6 py-5"
          >
            <Skeleton className="h-7 w-12 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Walls + Routes panel */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

async function AdminDashboardContent({
  params,
}: {
  params: Promise<{ gymSlug: string }>;
}) {
  const { gymSlug } = await params;
  const id = gymSlug.split("-").pop();
  const numericId = Number(id);
  if (!id || isNaN(numericId)) notFound();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const isAdmin = await verifyAdmin(Number(id)); // your existing utility
  if (!isAdmin) notFound();

  const { data: gym, error: gymError } = await supabase
    .from("gyms")
    .select("id, name, city, province")
    .eq("id", id)
    .single();

  if (gymError) {
    throw new Error(`Error fetching gym: ${gymError.message}`);
  }

  if (!gym) redirect("/");

  // Fetch walls + routes for this gym
  const { data: walls, error: wallsError } = await supabase
    .from("walls")
    .select("id, name")
    .eq("gym_id", gym.id)
    .order("name");

  if (wallsError) {
    throw new Error(`Error fetching walls: ${wallsError.message}`);
  }

  const { data, error: routesError } = await supabase
    .from("routes_with_details")
    .select("id, name, grade, color, wall_id, video_count")
    .eq("gym_id", gym.id)
    .order("grade");

  if (routesError) {
    throw new Error(`Error fetching routes: ${routesError.message}`);
  }

  const routes = (data ?? []).sort(
    (a, b) => gradeToNumber(a.grade) - gradeToNumber(b.grade),
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl text-granite">{gym.name}</h1>
          <p className="font-mono text-sm text-stone mt-1">
            {gym.city}, {gym.province}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Walls", value: walls?.length ?? 0 },
          { label: "Routes", value: routes?.length ?? 0 },
          {
            label: "Beta Videos",
            value:
              routes?.reduce((sum, r) => sum + (r.video_count ?? 0), 0) ?? 0,
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white border border-fog rounded-lg px-6 py-5"
          >
            <div className="font-mono text-2xl text-granite">{value}</div>
            <div className="font-mono text-xs text-stone tracking-widest uppercase mt-1">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Walls + Routes panel */}
      <WallsPanel
        walls={walls as Wall[]}
        routes={routes as Route[]}
        gymId={gym.id}
        gymSlug={gymSlug}
      />
    </div>
  );
}

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ gymSlug: string }>;
}) {
  return (
    <Suspense fallback={<AdminDashboardSkeleton />}>
      <AdminDashboardContent params={params} />
    </Suspense>
  );
}
