"use client";

import { useState } from "react";
import Modal from "./Modal";

interface Props {
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function DeleteModal({
  title,
  description,
  onConfirm,
  onClose,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      await onConfirm();
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
    <Modal title={title} onClose={onClose}>
      <div className="space-y-4">
        <p className="font-mono text-sm text-stone leading-relaxed">
          {description}
        </p>
        {error && <p className="font-mono text-xs text-red-400">{error}</p>}
        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            className="flex-1 font-mono text-xs text-stone tracking-widest uppercase border border-fog rounded-lg py-2.5 hover:border-stone transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 bg-red-500 text-white font-mono text-xs tracking-widest uppercase rounded-lg py-2.5 hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
