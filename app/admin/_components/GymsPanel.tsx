"use client";

import { ClimbType, Gym } from "@/app/types/types";
import { useMemo, useState, useTransition } from "react";
import { createGym, deleteGym } from "../actions";
import DeleteModal from "../[gymSlug]/DeleteModal";

const CLIMB_TYPES: ClimbType[] = ["Bouldering", "Lead", "Top Rope"];

export default function GymsPanel({ gyms }: { gyms: Gym[] }) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const filtered = useMemo(
    () =>
      gyms.filter(
        (g) =>
          g.name.toLowerCase().includes(search.toLowerCase()) ||
          g.city.toLowerCase().includes(search.toLowerCase()) ||
          g.slug.includes(search.toLowerCase()),
      ),
    [gyms, search],
  );

  function handleCreate(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await createGym(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setShowModal(false);
      }
    });
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-widest uppercase text-stone">
          All Gyms
        </span>
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1.5 text-xs tracking-wider uppercase bg-clay text-chalk rounded-md hover:opacity-90 transition-opacity font-mono"
        >
          + Add Gym
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search gyms..."
        className="w-full mb-4 px-3 py-2 text-xs font-mono border border-fog rounded-md bg-chalk focus:outline-none focus:border-stone"
      />

      {error && <p className="mb-4 text-xs text-red-600 font-mono">{error}</p>}

      <div className="border border-fog rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-fog">
              {["Gym", "Location", "Types", "Routes", "Videos", ""].map(
                (h, i) => (
                  <th
                    key={i}
                    className={`px-4 py-2.5 text-left text-[10px] tracking-widest uppercase text-stone font-normal ${["Types", "Routes", "Videos"].includes(h) ? "hidden md:table-cell" : ""}`}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((gym) => (
              <tr
                key={gym.id}
                className="border-b border-fog last:border-0 hover:bg-sand/40 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="font-medium">{gym.name}</span>
                  <br />
                  <span className="text-[10px] text-stone">{gym.slug}</span>
                </td>
                <td className="px-4 py-3 text-stone">
                  {gym.city}, {gym.province}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {gym.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] border border-fog rounded-full text-stone"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  {gym.route_count}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  {gym.video_count}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() =>
                      setDeleteTarget({ id: gym.id, name: gym.name })
                    }
                    disabled={isPending}
                    className="px-2.5 py-1 text-[10px] tracking-wider uppercase border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors disabled:opacity-40"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-stone">
                  No gyms found.
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
            <h3 className="font-serif text-xl mb-5">Add Gym</h3>
            <form action={handleCreate} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-stone mb-1.5">
                  Gym Name
                </label>
                <input
                  name="name"
                  required
                  placeholder="e.g. The Hive"
                  className="w-full px-3 py-2 text-xs font-mono border border-fog rounded-md bg-white focus:outline-none focus:border-stone"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-stone mb-1.5">
                    City
                  </label>
                  <input
                    name="city"
                    required
                    placeholder="Vancouver"
                    className="w-full px-3 py-2 text-xs font-mono border border-fog rounded-md bg-white focus:outline-none focus:border-stone"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-stone mb-1.5">
                    Province / State
                  </label>
                  <input
                    name="province"
                    required
                    placeholder="BC"
                    className="w-full px-3 py-2 text-xs font-mono border border-fog rounded-md bg-white focus:outline-none focus:border-stone"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-stone mb-2">
                  Climb Types
                </label>
                <div className="space-y-1.5">
                  {CLIMB_TYPES.map((t) => (
                    <label
                      key={t}
                      className="flex items-center gap-2 text-xs cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name="tags"
                        value={t}
                        className="accent-clay"
                      />
                      {t}
                    </label>
                  ))}
                </div>
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
                  {isPending ? "Creating…" : "Create Gym"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteTarget && (
        <DeleteModal
          title="Remove Gym"
          description={`Remove "${deleteTarget.name}"? This cannot be undone.`}
          onConfirm={async () => {
            const result = await deleteGym(deleteTarget.id);
            if (result?.error) throw new Error(result.error);
          }}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
