"use client";
import { BetaBaseIcon } from "@/lib/utils";
import { useFadeIn } from "./hero";
import Link from "next/link";

export default function EmailSection() {
  const ctaFade = useFadeIn();
  return (
    <section className="w-full py-24 px-6 bg-[#3A3330] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F5EFE6' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C17A5A]/8 blur-3xl pointer-events-none" />

      <div
        ref={ctaFade.ref}
        className="max-w-2xl mx-auto text-center relative"
        style={{
          opacity: ctaFade.visible ? 1 : 0,
          transform: ctaFade.visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="flex justify-center mb-8">
          <BetaBaseIcon size={48} light />
        </div>
        <h2 className="font-serif text-[#F5EFE6] text-4xl md:text-5xl mb-4 leading-tight">
          Ready to find
          <br />
          <em className="text-[#C17A5A]">your beta?</em>
        </h2>
        <p className="font-mono text-[#8C7B6B] text-sm leading-relaxed mb-10 font-light">
          Join thousands of climbers already sharing beta at their gyms. Create
          your account to upload and share your videos.
        </p>

        <Link href="/auth/login" className="inline-block">
          <button className="bg-[#C17A5A] text-white text-[11px] tracking-widest uppercase px-6 py-3 rounded-full hover:bg-[#A0522D] transition-colors duration-300 whitespace-nowrap">
            Create Account
          </button>
        </Link>
      </div>
    </section>
  );
}
