import ContactForm from "./ContactForm";

// app/contact/page.tsx
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-chalk font-mono text-granite">
      {/* Hero */}
      <section className="bg-granite px-12 py-16 border-b border-white/[0.08]">
        <p className="text-[10px] tracking-[0.25em] uppercase text-stone mb-4">
          Contact
        </p>
        <h1 className="font-serif text-5xl text-chalk leading-tight">
          Get in <em className="text-clay">touch.</em>
        </h1>
        <p className="text-sm text-stone leading-relaxed max-w-md mt-4 font-light">
          Whether you&apos;re a gym owner, a climber with feedback, or just
          curious — we&apos;d love to hear from you.
        </p>
      </section>

      {/* Content grid */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.6fr]">
        {/* Sidebar */}
        <aside className="p-12 border-r border-fog">
          <p className="text-[9px] tracking-[0.25em] uppercase text-stone mb-4">
            Good reasons to reach out
          </p>
          {[
            "You manage a gym and want BetaBase in your space",
            "You have feedback on the product or a bug to report",
            "You want to collaborate or partner with us",
            "You're just curious about what we're building",
          ].map((reason) => (
            <div key={reason} className="flex items-start gap-3 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-clay flex-shrink-0 mt-1.5" />
              <p className="text-xs text-granite leading-relaxed font-light">
                {reason}
              </p>
            </div>
          ))}

          <p className="text-[9px] tracking-[0.25em] uppercase text-stone mt-10 mb-4">
            Elsewhere
          </p>
          <a
            href="mailto:getbetabase@outlook.com"
            className="flex items-center gap-2.5 mb-3 text-[11px] text-stone hover:text-granite transition-colors"
          >
            getbetabase@outlook.com
          </a>
        </aside>

        {/* Form */}
        <ContactForm />
      </div>
    </main>
  );
}
