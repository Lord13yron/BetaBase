import Link from "next/link";
import { MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-chalk px-6 py-24 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sand">
        <MapPin className="h-8 w-8 text-clay" />
      </div>

      <p className="font-mono text-xs tracking-widest uppercase text-stone mb-3">
        404 — Not Found
      </p>

      <h1 className="font-serif text-4xl text-granite mb-4">Gym not found</h1>

      <p className="text-stone max-w-sm mb-8 leading-relaxed">
        This gym doesn&apos;t exist or may have been removed. Head back and
        explore the gyms we do have.
      </p>

      <Link
        href="/gyms"
        className="inline-block px-6 py-3 bg-granite text-chalk text-xs tracking-widest uppercase hover:bg-clay transition-colors rounded-sm"
      >
        Back to all gyms
      </Link>
    </div>
  );
}
