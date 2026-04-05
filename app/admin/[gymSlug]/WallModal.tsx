"use client";

import { useState } from "react";
import Modal from "./Modal";
import { createWall, updateWall } from "./actions";

interface Wall {
  id: number;
  name: string;
  description: string;
}

interface Props {
  gymId: number;
  gymSlug: string;
  wall?: Wall; // if provided, we're editing
  onClose: () => void;
}

export default function WallModal({ gymId, gymSlug, wall, onClose }: Props) {
  const [name, setName] = useState(wall?.name ?? "");
  const [description, setDescription] = useState(wall?.description ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!wall;

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (isEditing) {
        await updateWall(gymId, gymSlug, wall.id, {
          name: name.trim(),
          description: description.trim(),
        });
      } else {
        await createWall(gymId, gymSlug, {
          name: name.trim(),
          description: description.trim(),
        });
      }
      onClose();
    } catch (e: unknown) {
      setError(
        e instanceof Error ? e.message : "An unexpected error occurred.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={isEditing ? "Edit Wall" : "Add Wall"} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="font-mono text-xs text-stone tracking-widest uppercase block mb-1.5">
            Wall Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Cave Wall"
            className="w-full bg-white border border-fog rounded-lg px-4 py-2.5 font-mono text-sm text-granite placeholder:text-stone/40 focus:outline-none focus:border-clay transition-colors"
          />
        </div>
        <div>
          <label className="font-mono text-xs text-stone tracking-widest uppercase block mb-1.5">
            Description{" "}
            <span className="normal-case tracking-normal text-stone/50">
              (optional)
            </span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Steep overhang section near the entrance"
            rows={3}
            className="w-full bg-white border border-fog rounded-lg px-4 py-2.5 font-mono text-sm text-granite placeholder:text-stone/40 focus:outline-none focus:border-clay transition-colors resize-none"
          />
        </div>
        {error && <p className="font-mono text-xs text-red-400">{error}</p>}
        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            className="flex-1 font-mono text-xs text-stone tracking-widest uppercase border border-fog rounded-lg py-2.5 hover:border-stone transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-clay text-white font-mono text-xs tracking-widest uppercase rounded-lg py-2.5 hover:bg-clay/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : isEditing ? "Save Changes" : "Add Wall"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
