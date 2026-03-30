"use client";
import { useFadeIn } from "./hero";

const STEPS = [
  {
    num: "01",
    title: "Find your gym",
    body: "Search for your climbing gyms. Every route, every wall, all in one place.",
  },
  {
    num: "02",
    title: "Browse or upload beta",
    body: "Watch community-uploaded beta videos from your favorite gyms.",
  },
  {
    num: "03",
    title: "Send your project",
    body: "Use the knowledge. Crush the crux. Log the send and give back to the community.",
  },
];

export default function HowItWorks() {
  const howFade = useFadeIn();
  return (
    <section className="w-full py-24 px-6 bg-[#3A3330]">
      <div
        ref={howFade.ref}
        className="max-w-6xl mx-auto"
        style={{
          opacity: howFade.visible ? 1 : 0,
          transform: howFade.visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="mb-16">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#C17A5A] block mb-3">
            How it works
          </span>
          <h2 className="font-serif text-4xl text-[#F5EFE6] leading-tight">
            Watch. Learn.
            <br />
            <em className="text-[#C17A5A]">Send.</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-[#8C7B6B]/20">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="bg-[#3A3330] p-10 relative group hover:bg-[#2A2420] transition-colors duration-300"
            >
              <div className="font-serif text-[80px] leading-none text-white/5 absolute top-6 right-6 select-none group-hover:text-[#C17A5A]/10 transition-colors">
                {step.num}
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-[#C17A5A] mb-6">
                {step.num}
              </div>
              <h3 className="font-serif text-[#F5EFE6] text-2xl mb-4">
                {step.title}
              </h3>
              <p className="font-mono text-[#8C7B6B] text-sm leading-relaxed font-light">
                {step.body}
              </p>
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <div className="w-6 h-px bg-[#C17A5A]/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
