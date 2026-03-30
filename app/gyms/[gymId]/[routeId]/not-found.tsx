"use client";

import { useRouter } from "next/navigation";
import { Route } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/gyms");
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-chalk px-6 py-24 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sand">
        <Route className="h-8 w-8 text-clay" />
      </div>

      <p className="font-mono text-xs tracking-widest uppercase text-stone mb-3">
        404 — Not Found
      </p>

      <h1 className="font-serif text-4xl text-granite mb-4">Route not found</h1>

      <p className="text-stone max-w-sm mb-8 leading-relaxed">
        This route doesn&apos;t exist or may have been removed. Head back to the
        gym to browse available routes.
      </p>

      <button
        onClick={handleBack}
        className="px-6 py-3 bg-granite text-chalk text-xs tracking-widest uppercase hover:bg-clay transition-colors rounded-sm"
      >
        Go back
      </button>
    </div>
  );
}
