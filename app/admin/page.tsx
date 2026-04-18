import { verifySuper } from "@/lib/auth/verifySuper";
import {
  getContactSubmissions,
  getSuperadminGymAdmins,
  getSuperadminGyms,
} from "@/lib/data-services";
import { connection } from "next/server";
import { Suspense } from "react";
import SuperadminTabs from "./_components/SuperadminTabs";
import AdminsPanel from "./_components/AdminsPanel";
import MessagesPanel from "./_components/MessagesPanel";
import GymsPanel from "./_components/GymsPanel";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SuperadminPage() {
  return (
    <Suspense fallback={<SuperadminPageSkeleton />}>
      <AdminPageContent />
    </Suspense>
  );
}

async function AdminPageContent() {
  await verifySuper();
  await connection();

  const [gyms, admins, submissions] = await Promise.all([
    getSuperadminGyms(),
    getSuperadminGymAdmins(),
    getContactSubmissions(),
  ]);

  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <div className="min-h-screen bg-chalk">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl">
              Beta<span className="text-clay">Base</span>
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-stone mt-1 font-mono">
              Superadmin
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-sand rounded-lg p-4">
            <p className="text-[10px] tracking-widest uppercase text-stone mb-1 font-mono">
              Gyms
            </p>
            <p className="text-2xl font-medium font-mono">{gyms.length}</p>
          </div>
          <div className="bg-sand rounded-lg p-4">
            <p className="text-[10px] tracking-widest uppercase text-stone mb-1 font-mono">
              Gym Admins
            </p>
            <p className="text-2xl font-medium font-mono">{admins.length}</p>
          </div>
          <div className="bg-sand rounded-lg p-4">
            <p className="text-[10px] tracking-widest uppercase text-stone mb-1 font-mono">
              Unread Messages
            </p>
            <p
              className={`text-2xl font-medium font-mono ${
                unreadCount > 0 ? "text-clay" : ""
              }`}
            >
              {unreadCount}
            </p>
          </div>
        </div>

        {/* Tabbed panels */}
        <SuperadminTabs
          gymsPanel={<GymsPanel gyms={gyms} />}
          adminsPanel={<AdminsPanel admins={admins} gyms={gyms} />}
          messagesPanel={<MessagesPanel submissions={submissions} />}
        />
      </div>
    </div>
  );
}

function SuperadminPageSkeleton() {
  return (
    <div className="min-h-screen bg-chalk animate-pulse">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl bg-sand rounded w-32 h-8 mb-1" />
            <p className="text-[10px] tracking-widest uppercase text-stone font-mono bg-sand rounded w-20 h-4" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-sand rounded-lg p-4 h-20" />
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-fog mb-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="px-4 py-2 text-[11px] tracking-widest uppercase font-mono border-b-2 border-transparent text-stone bg-sand rounded w-24 h-6 mr-2"
            />
          ))}
        </div>

        {/* Panels */}
        <div className="bg-sand rounded-lg p-6 h-64" />
      </div>
    </div>
  );
}
