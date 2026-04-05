import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

function AdminLayoutSkeleton() {
  return (
    <div className="space-y-8 animate-pulse bg-granite border-b border-granite/20">
      <div className="flex items-start justify-between">
        <div className="flex m-4 gap-4">
          <Skeleton className="h-8 w-48 bg-fog rounded" />
          <Skeleton className="h-8 w-32 bg-fog rounded" />
        </div>
        <Skeleton className="h-6 w-32 bg-fog rounded m-4" />
      </div>
    </div>
  );
}

async function AdminLayoutContent({
  params,
}: {
  params: Promise<{ gymSlug: string }>;
}) {
  const { gymSlug } = await params;
  const id = gymSlug.split("-").slice(-1)[0];

  const supabase = await createClient();

  const { data: gym, error: gymError } = await supabase
    .from("gyms")
    .select("id, name, city, province, slug")
    .eq("id", id)
    .single();

  if (gymError) {
    throw new Error(`Error fetching gym: ${gymError.message}`);
  }

  if (!gym) redirect("/");

  return (
    <>
      {/* Admin nav */}

      <header className="bg-granite border-b border-granite/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-serif text-chalk text-xl">
              Beta<span className="text-clay">Base</span>
            </span>
            <span className="text-stone text-xs font-mono tracking-widest uppercase">
              /
            </span>
            <span className="text-chalk font-mono text-sm">{gym.name}</span>
            <span className="bg-clay/20 text-clay font-mono text-xs tracking-widest uppercase px-2 py-0.5 rounded">
              Admin
            </span>
          </div>
          <Link
            href={`/gyms/${gym.slug}-${gym.id}`}
            className="font-mono text-xs text-stone tracking-widest uppercase hover:text-chalk transition-colors"
          >
            View Public Page →
          </Link>
        </div>
      </header>
    </>
  );
}
export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ gymSlug: string }>;
}) {
  return (
    <div className="min-h-screen bg-chalk">
      <Suspense fallback={<AdminLayoutSkeleton />}>
        <AdminLayoutContent params={params} />
      </Suspense>
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
