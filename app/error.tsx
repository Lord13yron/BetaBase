"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex flex-col items-center justify-center gap-6 pt-16 bg-granite text-fog h-screen">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block px-6 py-3 text-lg bg-accent-500 text-primary-800"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
