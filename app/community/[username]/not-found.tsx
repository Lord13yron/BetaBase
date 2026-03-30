import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-chalk flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="font-mono text-sm text-stone">
        That climber doesn&apos;t exist.
      </p>
      <Link
        href="/community"
        className="font-mono text-[10px] uppercase tracking-widest text-clay hover:underline"
      >
        ← Back to Community
      </Link>
    </div>
  );
}
