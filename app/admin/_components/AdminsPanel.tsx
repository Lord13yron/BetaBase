"use client";

import { Gym, GymAdmin } from "@/app/types/types";
import { useMemo, useState, useTransition } from "react";
import { assignGymAdmin, revokeGymAdmin } from "../actions";
import DeleteModal from "../[gymSlug]/DeleteModal";

export default function AdminsPanel({
  admins,
  gyms,
}: {
  admins: GymAdmin[];
  gyms: Gym[];
}) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<{
    userId: string;
    gymId: number;
    username: string;
  } | null>(null);

  const filtered = useMemo(
  () =>
    admins.filter(
      (a) =>
        a.username.toLowerCase().includes(search.toLowerCase()) ||
        a.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        a.gym_name.toLowerCase().includes(search.toLowerCase()),
    ),
  [admins, search],
);

  function handleAssign(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await assignGymAdmin(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setShowModal(false);
      }
    });
  }

  function getInitials(admin: GymAdmin) {
    const name = admin.full_name || admin.username;
    return name
      .split(" ")
      .map((n) => n[0] ?? "")
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-widest uppercase text-stone">
          Gym Admins
        </span>
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1.5 text-xs tracking-wider uppercase bg-clay text-chalk rounded-md hover:opacity-90 transition-opacity font-mono"
        >
          + Assign Admin
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by username or gym..."
        className="w-full mb-4 px-3 py-2 text-xs font-mono border border-fog rounded-md bg-chalk focus:outline-none focus:border-stone"
      />

      {error && <p className="mb-4 text-xs text-red-600 font-mono">{error}</p>}

      <div className="border border-fog rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-fog">
              {["User", "Username", "Gym", "Assigned", ""].map((h) => (
                <th
                  key={h}
                  className={`px-4 py-2.5 text-left text-[10px] tracking-widest uppercase text-stone font-normal ${["User", "Assigned"].includes(h) ? "hidden md:table-cell" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((admin) => (
              <tr
                key={`${admin.user_id}-${admin.gym_id}`}
                className="border-b border-fog last:border-0 hover:bg-sand/40 transition-colors"
              >
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex items-center gap-2 ">
                    <div className="w-7 h-7 rounded-full bg-clay/15 items-center justify-center text-[10px] font-medium text-clay flex-shrink-0 flex">
                      {getInitials(admin)}
                    </div>
                    <span>{admin.full_name || admin.username}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-clay">@{admin.username}</td>
                <td className="px-4 py-3">{admin.gym_name}</td>
                <td className="px-4 py-3 text-[10px] text-stone hidden md:table-cell">
                  {new Date(admin.created_at).toLocaleDateString("en-CA")}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() =>
                      setDeleteTarget({
                        userId: admin.user_id,
                        gymId: admin.gym_id,
                        username: admin.username,
                      })
                    }
                    disabled={isPending}
                    className="px-2.5 py-1 text-[10px] tracking-wider uppercase border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors disabled:opacity-40"
                  >
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-stone">
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-granite/50 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-chalk border border-fog rounded-xl p-6 w-full max-w-md">
            <h3 className="font-serif text-xl mb-5">Assign Gym Admin</h3>
            <form action={handleAssign} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-stone mb-1.5">
                  Username
                </label>
                <input
                  name="username"
                  required
                  placeholder="exact username"
                  className="w-full px-3 py-2 text-xs font-mono border border-fog rounded-md bg-white focus:outline-none focus:border-stone"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-stone mb-1.5">
                  Gym
                </label>
                <select
                  name="gym_id"
                  required
                  className="w-full px-3 py-2 text-xs font-mono border border-fog rounded-md bg-white focus:outline-none focus:border-stone"
                >
                  <option value="">Select gym…</option>
                  {gyms.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} — {g.city}
                    </option>
                  ))}
                </select>
              </div>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError(null);
                  }}
                  className="px-3 py-1.5 text-xs font-mono border border-fog rounded-md hover:bg-sand transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-3 py-1.5 text-xs font-mono bg-clay text-chalk rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isPending ? "Assigning…" : "Assign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteTarget && (
        <DeleteModal
          title="Revoke Admin"
          description={`Revoke admin access for @${deleteTarget.username}?`}
          onConfirm={async () => {
            const result = await revokeGymAdmin(
              deleteTarget.userId,
              deleteTarget.gymId,
            );
            if (result?.error) throw new Error(result.error);
          }}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
