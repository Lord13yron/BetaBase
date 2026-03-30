import { BetaBaseIcon } from "@/lib/utils";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2A2420] border-t border-white/6 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <BetaBaseIcon size={22} light />
          <span className="font-serif text-[#F5EFE6] text-base">
            Beta<span className="text-[#C17A5A]">Base</span>
          </span>
        </div>
        <div className="flex items-center gap-8">
          {["About", "Privacy", "Terms", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="font-mono text-[9px] tracking-widest uppercase text-[#8C7B6B] hover:text-[#F5EFE6] transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="font-mono text-[9px] tracking-widest text-[#8C7B6B]/50">
          © 2026 BetaBase
        </div>
      </div>
    </footer>
  );
}
