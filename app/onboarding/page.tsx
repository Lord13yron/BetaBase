"use client";

import { useState, useEffect, useRef } from "react";
import { Status } from "../types/types";
import StatusDot from "@/components/StatusDot";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function classifyUsername(value: string): { valid: boolean; message: string } {
  if (value.length < 3)
    return { valid: false, message: "At least 3 characters" };
  if (value.length > 24) return { valid: false, message: "Max 24 characters" };
  if (!/^[a-z0-9._-]+$/.test(value))
    return { valid: false, message: "Only lowercase letters, numbers, . _ -" };
  if (/^[._-]/.test(value) || /[._-]$/.test(value))
    return { valid: false, message: "Can't start or end with . _ -" };
  return { valid: true, message: "" };
}

// ─── Mock availability check (replace with Supabase query) ───────────────────
async function checkAvailability(username: string): Promise<boolean> {
  const supabase = createClient();
  const { data: taken } = await supabase
    .from("user_profiles")
    .select("username")
    .eq("username", username)
    .maybeSingle();

  if (taken)
    return false; // username is taken
  else return true;
}

export default function OnboardingPage() {
  const [username, setUsername] = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [homeGym, setHomeGym] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setTimeout(() => inputRef.current?.focus(), 800);
  }, []);

  // Debounced availability check
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const { valid } = classifyUsername(username);
    if (!username) {
      setStatus("idle");
      return;
    }
    if (!valid) {
      setStatus("invalid");
      return;
    }
    setStatus("checking");
    debounceRef.current = setTimeout(async () => {
      const available = await checkAvailability(username);
      setStatus(available ? "available" : "taken");
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [username]);

  const validation = classifyUsername(username);
  const canSubmit = status === "available" && !submitted;

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitted(true);
    setError(null);

    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setError("Session expired. Please sign in again.");
      setSubmitted(false);
      return;
    }

    const heightInCm =
      heightUnit === "cm"
        ? parseInt(heightCm) || null
        : Math.round(
            parseInt(heightFt || "0") * 30.48 +
              parseInt(heightIn || "0") * 2.54,
          ) || null;

    const { error: updateError } = await supabase
      .from("user_profiles")
      .update({
        username,
        height: heightInCm,
        home_gym: homeGym || null,
      })
      .eq("id", user.id);

    if (updateError) {
      setError("Something went wrong. Please try again.");
      setSubmitted(false);
      return;
    }

    router.push("/gyms");
  }

  // ── Renders ────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#3A3330] flex items-center justify-center">
        <div
          className="text-center"
          style={{ animation: "fadeUp 0.6s ease both" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8C7B6B] mb-4">
            You&apos;re in
          </p>
          <h1 className="font-serif text-5xl text-[#F5EFE6] leading-tight">
            Welcome, <span className="text-[#C17A5A]">{username}</span>
          </h1>
          <p className="font-mono text-[#8C7B6B] text-sm mt-4">
            Redirecting to gyms…
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .font-serif  { font-family: 'DM Serif Display', serif; }
        .font-mono   { font-family: 'DM Mono', monospace; }
        .anim-0 { animation: fadeUp 0.7s 0.0s ease both; }
        .anim-1 { animation: fadeUp 0.7s 0.1s ease both; }
        .anim-2 { animation: fadeUp 0.7s 0.2s ease both; }
        .anim-3 { animation: fadeUp 0.7s 0.35s ease both; }
        .anim-4 { animation: fadeUp 0.7s 0.5s ease both; }
        .anim-5 { animation: fadeUp 0.7s 0.65s ease both; }
        .field-ring:focus-within { box-shadow: 0 0 0 1px #C17A5A; }
      `}</style>

      <div
        className="min-h-screen bg-[#3A3330] flex"
        style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.3s" }}
      >
        {/* ── Left panel – decorative ── */}
        <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 border-r border-white/[0.06] p-12 relative overflow-hidden">
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(193,122,90,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Logo */}
          <div className="anim-0 flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 56 56" fill="none">
              <ellipse
                cx="28"
                cy="44"
                rx="18"
                ry="5"
                fill="none"
                stroke="#C17A5A"
                strokeWidth="1.5"
              />
              <line
                x1="10"
                y1="28"
                x2="10"
                y2="44"
                stroke="#C17A5A"
                strokeWidth="1.5"
              />
              <line
                x1="46"
                y1="28"
                x2="46"
                y2="44"
                stroke="#C17A5A"
                strokeWidth="1.5"
              />
              <ellipse
                cx="28"
                cy="28"
                rx="18"
                ry="5"
                fill="none"
                stroke="#F5EFE6"
                strokeWidth="1.5"
              />
              <path
                d="M20 28 L28 12 L36 28"
                fill="none"
                stroke="#F5EFE6"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="28" cy="12" r="2" fill="#C17A5A" />
            </svg>
            <span className="font-serif text-xl text-[#F5EFE6]">
              Beta<span className="text-[#C17A5A]">Base</span>
            </span>
          </div>

          {/* Taglines */}
          <div className="anim-1 space-y-5">
            {[
              { line: "Watch.", italic: false },
              { line: "Learn.", italic: false },
              { line: "Send.", italic: true },
            ].map(({ line, italic }) => (
              <p
                key={line}
                className={`font-serif text-4xl leading-none ${
                  italic ? "italic text-[#C17A5A]" : "text-[#F5EFE6]"
                }`}
              >
                {line}
              </p>
            ))}
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8C7B6B] pt-2">
              Community beta · every gym · every route
            </p>
          </div>

          {/* Bottom caption */}
          <p className="anim-2 font-mono text-[10px] text-[#8C7B6B] tracking-wider">
            Step 1 of 1
          </p>
        </div>

        {/* ── Right panel – form ── */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
          <div className="w-full max-w-[440px]">
            {/* Header */}
            <div className="anim-1 mb-10">
              {/* Mobile logo */}
              <div className="flex lg:hidden items-center gap-2 mb-8">
                <svg width="24" height="24" viewBox="0 0 56 56" fill="none">
                  <ellipse
                    cx="28"
                    cy="44"
                    rx="18"
                    ry="5"
                    fill="none"
                    stroke="#C17A5A"
                    strokeWidth="2"
                  />
                  <line
                    x1="10"
                    y1="28"
                    x2="10"
                    y2="44"
                    stroke="#C17A5A"
                    strokeWidth="2"
                  />
                  <line
                    x1="46"
                    y1="28"
                    x2="46"
                    y2="44"
                    stroke="#C17A5A"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="28"
                    cy="28"
                    rx="18"
                    ry="5"
                    fill="none"
                    stroke="#F5EFE6"
                    strokeWidth="2"
                  />
                  <path
                    d="M20 28 L28 12 L36 28"
                    fill="none"
                    stroke="#F5EFE6"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="28" cy="12" r="2.5" fill="#C17A5A" />
                </svg>
                <span className="font-serif text-lg text-[#F5EFE6]">
                  Beta<span className="text-[#C17A5A]">Base</span>
                </span>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8C7B6B] mb-3">
                One last thing
              </p>
              <h1 className="font-serif text-4xl text-[#F5EFE6] leading-tight">
                Set up your
                <br />
                <span className="italic text-[#C17A5A]">climber profile.</span>
              </h1>
            </div>

            {/* ── Username field ── */}
            <div className="anim-2 mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C7B6B]">
                  Username <span className="text-[#C17A5A]">*</span>
                </label>
                <StatusDot status={status} />
              </div>

              <div
                className={`field-ring flex items-center bg-white/[0.04] border rounded-lg overflow-hidden transition-colors duration-200 ${
                  focused === "username"
                    ? "border-[#C17A5A]/60"
                    : "border-white/[0.08]"
                } ${status === "taken" ? "border-red-400/40" : ""}`}
              >
                <span className="font-mono text-[#8C7B6B] text-sm pl-4 select-none">
                  @
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))
                  }
                  onFocus={() => setFocused("username")}
                  onBlur={() => setFocused(null)}
                  placeholder="your_handle"
                  maxLength={24}
                  className="flex-1 bg-transparent font-mono text-sm text-[#F5EFE6] placeholder-[#8C7B6B]/40 px-3 py-4 outline-none"
                />
                <span className="font-mono text-[10px] text-[#8C7B6B]/40 pr-4 select-none">
                  {username.length}/24
                </span>
              </div>

              {/* Inline validation hint */}
              {username && !validation.valid && (
                <p className="font-mono text-[10px] text-[#8C7B6B] mt-2 ml-1">
                  {validation.message}
                </p>
              )}
            </div>

            {/* ── Height field ── */}
            <div className="anim-3 mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C7B6B]">
                  Height{" "}
                  <span className="text-[#8C7B6B]/40 normal-case tracking-normal text-[9px]">
                    optional
                  </span>
                </label>
                {/* Unit toggle */}
                <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-md overflow-hidden">
                  {(["cm", "ft"] as const).map((unit) => (
                    <button
                      key={unit}
                      onClick={() => setHeightUnit(unit)}
                      className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 transition-colors duration-150 ${
                        heightUnit === unit
                          ? "bg-[#C17A5A] text-white"
                          : "text-[#8C7B6B] hover:text-[#F5EFE6]"
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>

              {heightUnit === "cm" ? (
                <div
                  className={`flex items-center bg-white/[0.04] border rounded-lg overflow-hidden transition-colors duration-200 ${focused === "height" ? "border-[#C17A5A]/60" : "border-white/[0.08]"}`}
                >
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    onFocus={() => setFocused("height")}
                    onBlur={() => setFocused(null)}
                    placeholder="175"
                    min={100}
                    max={250}
                    className="flex-1 bg-transparent font-mono text-sm text-[#F5EFE6] placeholder-[#8C7B6B]/40 px-4 py-4 outline-none"
                  />
                  <span className="font-mono text-[11px] text-[#8C7B6B]/60 pr-4 select-none">
                    cm
                  </span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div
                    className={`flex items-center flex-1 bg-white/[0.04] border rounded-lg overflow-hidden transition-colors duration-200 ${focused === "height-ft" ? "border-[#C17A5A]/60" : "border-white/[0.08]"}`}
                  >
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      onFocus={() => setFocused("height-ft")}
                      onBlur={() => setFocused(null)}
                      placeholder="5"
                      min={3}
                      max={8}
                      className="flex-1 bg-transparent font-mono text-sm text-[#F5EFE6] placeholder-[#8C7B6B]/40 px-4 py-4 outline-none"
                    />
                    <span className="font-mono text-[11px] text-[#8C7B6B]/60 pr-4 select-none">
                      ft
                    </span>
                  </div>
                  <div
                    className={`flex items-center flex-1 bg-white/[0.04] border rounded-lg overflow-hidden transition-colors duration-200 ${focused === "height-in" ? "border-[#C17A5A]/60" : "border-white/[0.08]"}`}
                  >
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      onFocus={() => setFocused("height-in")}
                      onBlur={() => setFocused(null)}
                      placeholder="9"
                      min={0}
                      max={11}
                      className="flex-1 bg-transparent font-mono text-sm text-[#F5EFE6] placeholder-[#8C7B6B]/40 px-4 py-4 outline-none"
                    />
                    <span className="font-mono text-[11px] text-[#8C7B6B]/60 pr-4 select-none">
                      in
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* ── Home gym field ── */}
            <div className="anim-4 mb-8">
              <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C7B6B] mb-2">
                Home gym{" "}
                <span className="text-[#8C7B6B]/40 normal-case tracking-normal text-[9px]">
                  optional
                </span>
              </label>
              <input
                type="text"
                value={homeGym}
                onChange={(e) => setHomeGym(e.target.value)}
                onFocus={() => setFocused("gym")}
                onBlur={() => setFocused(null)}
                placeholder="e.g. Cliffhanger, Boulder Co."
                maxLength={60}
                className={`w-full bg-white/[0.04] border rounded-lg font-mono text-sm text-[#F5EFE6] placeholder-[#8C7B6B]/40 px-4 py-4 outline-none transition-colors duration-200 ${
                  focused === "gym"
                    ? "border-[#C17A5A]/60"
                    : "border-white/[0.08]"
                }`}
              />
            </div>

            {/* ── Submit ── */}
            <div className="anim-5">
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`w-full font-mono text-[11px] uppercase tracking-[0.2em] py-4 rounded-lg transition-all duration-300 ${
                  canSubmit
                    ? "bg-[#C17A5A] text-white hover:bg-[#a96849] active:scale-[0.99] cursor-pointer"
                    : "bg-white/[0.04] text-[#8C7B6B]/40 cursor-not-allowed border border-white/[0.06]"
                }`}
              >
                {canSubmit
                  ? "Create Profile →"
                  : "Choose a username to continue"}
              </button>

              {error && (
                <p className="font-mono text-[10px] text-red-400 text-center mt-3">
                  {error}
                </p>
              )}

              <p className="font-mono text-[10px] text-[#8C7B6B]/50 text-center mt-4 leading-relaxed">
                You can update your profile anytime from the Profile page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
