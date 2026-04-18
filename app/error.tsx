"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  // Log the real error for debugging — never expose it to the client
  console.error(error);

  return (
    <main className="flex flex-col items-center justify-center gap-6 pt-16 bg-granite text-fog h-screen">
      <h1 className="font-serif text-3xl">Something went wrong</h1>
      <p className="text-stone text-sm">
        We hit an unexpected error. Please try again or contact support if the
        problem persists.
      </p>
      <button
        className="px-6 py-3 bg-clay text-chalk text-sm tracking-wide rounded-sm hover:opacity-90 transition-opacity"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
