import Link from "next/link";

export const metadata = {
  title: "About — BetaBase",
  description:
    "BetaBase is a community-built video platform for climbers. Watch beta for any route at any gym, or upload your own.",
};

const steps = [
  {
    number: "01",
    heading: "Find your gym",
    body: "Browse the gym directory and select your wall. Routes are organized by wall, grade, and color.",
  },
  {
    number: "02",
    heading: "Watch the beta",
    body: "Every route has a video feed uploaded by climbers just like you — real moves, real sequence, no filler.",
  },
  {
    number: "03",
    heading: "Upload your own",
    body: "Figured out the crux? Film it and post it. Your beta helps the next climber make the send.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-chalk text-granite font-mono">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-granite px-6 py-24 md:px-20 md:py-36">
        {/* subtle radial wash */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(193,122,90,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl">
          <p className="mb-6 text-[10px] uppercase tracking-[0.22em] text-stone">
            About BetaBase
          </p>

          <h1 className="font-serif text-4xl leading-[1.1] text-chalk md:text-6xl">
            Beta belongs to{" "}
            <span className="italic text-clay">the community.</span>
          </h1>

          <p className="mt-8 max-w-xl text-sm font-light leading-relaxed text-stone">
            BetaBase is a video platform built by climbers, for climbers. No
            coaching packages. No gym-branded content. Just real beta from the
            people who figured it out — shared freely so the next person can
            send.
          </p>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────── */}
      <section className="border-b border-fog px-6 py-20 md:px-20">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-24">
          <div>
            <p className="mb-4 text-[9px] uppercase tracking-[0.25em] text-stone">
              Why we built this
            </p>
            <h2 className="font-serif text-3xl leading-tight text-granite md:text-4xl">
              Good beta is hard to find.
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-sm font-light leading-relaxed text-stone">
            <p>
              You&apos;ve been there — standing under a project for the third
              session, knowing someone has cracked the sequence but the
              knowledge never left the gym floor.
            </p>
            <p>
              Instagram doesn&apos;t organize by route. YouTube doesn&apos;t
              know your gym exists. Group chats disappear. BetaBase fixes that:
              one place, every route, searchable beta that stays put.
            </p>
            <p>
              We built it because we wanted it. The platform is community-first
              by design — not a monetization layer on top of climbing.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="bg-sand px-6 py-20 md:px-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-12 text-[9px] uppercase tracking-[0.25em] text-stone">
            How it works
          </p>

          <div className="grid gap-px border border-fog bg-fog md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="bg-sand p-8 md:p-10">
                <span className="mb-6 block font-mono text-[11px] tracking-[0.2em] text-clay">
                  {step.number}
                </span>
                <h3 className="font-serif text-xl text-granite">
                  {step.heading}
                </h3>
                <p className="mt-3 text-[13px] font-light leading-relaxed text-stone">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values strip ─────────────────────────────────── */}
      <section className="border-y border-fog px-6 py-16 md:px-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {[
            {
              label: "Open by default",
              body: "Browse any gym and watch any video without an account. Sign up only when you're ready to contribute.",
            },
            {
              label: "Community-sourced",
              body: "Every video comes from a climber who wanted to help. Real people, real beta.",
            },
            {
              label: "Route-level precision",
              body: "Beta is filed to the specific route, not dumped in a wall-wide feed. Find what you need fast.",
            },
          ].map((v) => (
            <div key={v.label}>
              <div className="mb-3 h-px w-8 bg-clay" />
              <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-granite">
                {v.label}
              </p>
              <p className="text-[13px] font-light leading-relaxed text-stone">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="bg-granite px-6 py-24 md:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl leading-tight text-chalk md:text-5xl">
            Watch. Learn. <span className="italic text-clay">Send.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-stone">
            Browse beta for free — no account required. Upload your own clips
            once you&apos;re in.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/gyms"
              className="inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-[11px] uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
            >
              Browse gyms
            </Link>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-2 rounded-full border border-stone px-6 py-3 text-[11px] uppercase tracking-[0.1em] text-chalk transition-colors hover:border-chalk"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
