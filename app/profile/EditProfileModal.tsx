// "use client";

// import { useState, useEffect } from "react";
// import { UserProfile } from "@/app/types/types";
// import { createClient } from "@/lib/supabase/client";

// type Props = {
//   profile: UserProfile;
//   onClose: () => void;
//   onSave: () => void;
// };

// export default function EditProfileModal({ profile, onClose, onSave }: Props) {
//   const [form, setForm] = useState({
//     full_name: profile.full_name ?? "",
//     username: profile.username,
//     home_gym: profile.home_gym ?? "",
//     height: profile.height?.toString() ?? "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Close on Escape
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [onClose]);

//   // Lock body scroll
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, []);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const supabase = createClient();
//     const updates = {
//       full_name: form.full_name || null,
//       username: form.username,
//       home_gym: form.home_gym || null,
//       height: form.height ? parseInt(form.height) : null,
//     };

//     const { error: err } = await supabase
//       .from("user_profiles")
//       .update(updates)
//       .eq("id", profile.id);

//     setLoading(false);
//     if (err) {
//       setError(err.message);
//       return;
//     }
//     onSave();
//     onClose();
//   }

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-[#3A3330]/80 backdrop-blur-sm p-4"
//       onClick={onClose}
//     >
//       <div
//         className="w-full max-w-md rounded-2xl bg-[#F5EFE6] shadow-2xl overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-[#3A3330]/10">
//           <h2 className="font-serif text-lg text-[#3A3330]">Edit Profile</h2>
//           <button
//             onClick={onClose}
//             className="text-[#8C7B6B] hover:text-[#3A3330] transition-colors"
//           >
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.5"
//             >
//               <path d="M18 6L6 18M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
//           {[
//             {
//               label: "Full Name",
//               key: "full_name",
//               type: "text",
//               placeholder: "Your name",
//             },
//             {
//               label: "Username",
//               key: "username",
//               type: "text",
//               placeholder: "username",
//             },
//             {
//               label: "Home Gym",
//               key: "home_gym",
//               type: "text",
//               placeholder: "e.g. The Hive",
//             },
//             {
//               label: "Height (cm)",
//               key: "height",
//               type: "number",
//               placeholder: "175",
//             },
//           ].map(({ label, key, type, placeholder }) => (
//             <div key={key}>
//               <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8C7B6B] mb-1.5">
//                 {label}
//               </label>
//               <input
//                 type={type}
//                 value={form[key as keyof typeof form]}
//                 onChange={(e) =>
//                   setForm((f) => ({ ...f, [key]: e.target.value }))
//                 }
//                 placeholder={placeholder}
//                 className="w-full bg-white border border-[#3A3330]/15 rounded-lg px-3 py-2.5 font-mono text-sm text-[#3A3330] placeholder:text-[#8C7B6B]/60 focus:outline-none focus:ring-1 focus:ring-[#C17A5A]"
//               />
//             </div>
//           ))}

//           {error && (
//             <p className="font-mono text-[11px] text-red-500">{error}</p>
//           )}

//           <div className="flex gap-2 pt-1">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 py-2.5 border border-[#3A3330]/20 rounded-lg font-mono text-[10px] uppercase tracking-widest text-[#8C7B6B] hover:text-[#3A3330] transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 py-2.5 bg-[#C17A5A] rounded-lg font-mono text-[10px] uppercase tracking-widest text-white hover:bg-[#C17A5A]/90 transition-colors disabled:opacity-50"
//             >
//               {loading ? "Saving…" : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// components/EditProfileModal.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { UserProfile, Status } from "@/app/types/types";
import { createClient } from "@/lib/supabase/client";
import StatusDot from "@/components/StatusDot";

function classifyUsername(value: string): { valid: boolean; message: string } {
  if (value.length < 3) return { valid: false, message: "At least 3 characters" };
  if (value.length > 24) return { valid: false, message: "Max 24 characters" };
  if (!/^[a-z0-9._-]+$/.test(value))
    return { valid: false, message: "Only lowercase letters, numbers, . _ -" };
  if (/^[._-]/.test(value) || /[._-]$/.test(value))
    return { valid: false, message: "Can't start or end with . _ -" };
  return { valid: true, message: "" };
}

async function checkAvailability(username: string, currentUsername: string): Promise<boolean> {
  if (username === currentUsername) return true; // own username is always "available"
  const supabase = createClient();
  const { data } = await supabase
    .from("user_profiles")
    .select("username")
    .eq("username", username)
    .maybeSingle();
  return !data;
}

type Props = {
  profile: UserProfile;
  onClose: () => void;
  onSave: (updated: Partial<UserProfile>) => void;
};

export default function EditProfileModal({ profile, onClose, onSave }: Props) {
  const [fullName, setFullName] = useState(profile.full_name ?? "");
  const [username, setUsername] = useState(profile.username);
  const [homeGym, setHomeGym] = useState(profile.home_gym ?? "");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [heightCm, setHeightCm] = useState(profile.height?.toString() ?? "");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [status, setStatus] = useState<Status>("available"); // starts available (own username)
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Convert existing height (cm) to ft/in on mount
  useEffect(() => {
    if (profile.height) {
      const totalIn = profile.height / 2.54;
      setHeightFt(Math.floor(totalIn / 12).toString());
      setHeightIn(Math.round(totalIn % 12).toString());
    }
  }, [profile.height]);

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Debounced username check
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const { valid } = classifyUsername(username);
    if (!username) { setStatus("idle"); return; }
    if (!valid) { setStatus("invalid"); return; }
    if (username === profile.username) { setStatus("available"); return; }
    setStatus("checking");
    debounceRef.current = setTimeout(async () => {
      const available = await checkAvailability(username, profile.username);
      setStatus(available ? "available" : "taken");
    }, 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [username, profile.username]);

  const validation = classifyUsername(username);
  const canSubmit = status === "available" && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);

    const heightInCm =
      heightUnit === "cm"
        ? parseInt(heightCm) || null
        : heightFt
          ? Math.round(parseInt(heightFt) * 30.48 + parseInt(heightIn || "0") * 2.54)
          : null;

    const supabase = createClient();
    const { error: err } = await supabase
      .from("user_profiles")
      .update({
        full_name: fullName || null,
        username,
        home_gym: homeGym || null,
        height: heightInCm,
      })
      .eq("id", profile.id);

    setLoading(false);
    if (err) { setError(err.message); return; }
    onSave({ full_name: fullName || undefined, username, home_gym: homeGym || undefined, height: heightInCm ?? undefined });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#3A3330]/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#3A3330] border border-white/[0.08] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-white/[0.06]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8C7B6B] mb-1">
              Your account
            </p>
            <h2 className="font-serif text-2xl text-[#F5EFE6]">Edit Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-white/[0.08] text-[#8C7B6B] hover:text-[#F5EFE6] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Full Name */}
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C7B6B] mb-2">
              Full Name{" "}
              <span className="text-[#8C7B6B]/40 normal-case tracking-normal text-[9px]">optional</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              placeholder="Your name"
              maxLength={60}
              className={`w-full bg-white/[0.04] border rounded-lg font-mono text-sm text-[#F5EFE6] placeholder-[#8C7B6B]/40 px-4 py-3.5 outline-none transition-colors duration-200 ${
                focused === "name" ? "border-[#C17A5A]/60" : "border-white/[0.08]"
              }`}
            />
          </div>

          {/* Username */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C7B6B]">
                Username <span className="text-[#C17A5A]">*</span>
              </label>
              <StatusDot status={status} />
            </div>
            <div
              className={`flex items-center bg-white/[0.04] border rounded-lg overflow-hidden transition-colors duration-200 ${
                focused === "username" ? "border-[#C17A5A]/60" : "border-white/[0.08]"
              } ${status === "taken" ? "border-red-400/40" : ""}`}
            >
              <span className="font-mono text-[#8C7B6B] text-sm pl-4 select-none">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))}
                onFocus={() => setFocused("username")}
                onBlur={() => setFocused(null)}
                maxLength={24}
                className="flex-1 bg-transparent font-mono text-sm text-[#F5EFE6] placeholder-[#8C7B6B]/40 px-3 py-3.5 outline-none"
              />
              <span className="font-mono text-[10px] text-[#8C7B6B]/40 pr-4 select-none">
                {username.length}/24
              </span>
            </div>
            {username && !validation.valid && (
              <p className="font-mono text-[10px] text-[#8C7B6B] mt-2 ml-1">{validation.message}</p>
            )}
          </div>

          {/* Height */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C7B6B]">
                Height{" "}
                <span className="text-[#8C7B6B]/40 normal-case tracking-normal text-[9px]">optional</span>
              </label>
              <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-md overflow-hidden">
                {(["cm", "ft"] as const).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => setHeightUnit(unit)}
                    className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 transition-colors duration-150 ${
                      heightUnit === unit ? "bg-[#C17A5A] text-white" : "text-[#8C7B6B] hover:text-[#F5EFE6]"
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>

            {heightUnit === "cm" ? (
              <div className={`flex items-center bg-white/[0.04] border rounded-lg overflow-hidden transition-colors duration-200 ${focused === "height" ? "border-[#C17A5A]/60" : "border-white/[0.08]"}`}>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  onFocus={() => setFocused("height")}
                  onBlur={() => setFocused(null)}
                  placeholder="175"
                  min={100}
                  max={250}
                  className="flex-1 bg-transparent font-mono text-sm text-[#F5EFE6] placeholder-[#8C7B6B]/40 px-4 py-3.5 outline-none"
                />
                <span className="font-mono text-[11px] text-[#8C7B6B]/60 pr-4 select-none">cm</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <div className={`flex items-center flex-1 bg-white/[0.04] border rounded-lg overflow-hidden transition-colors duration-200 ${focused === "height-ft" ? "border-[#C17A5A]/60" : "border-white/[0.08]"}`}>
                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    onFocus={() => setFocused("height-ft")}
                    onBlur={() => setFocused(null)}
                    placeholder="5"
                    min={3}
                    max={8}
                    className="flex-1 bg-transparent font-mono text-sm text-[#F5EFE6] placeholder-[#8C7B6B]/40 px-4 py-3.5 outline-none"
                  />
                  <span className="font-mono text-[11px] text-[#8C7B6B]/60 pr-4 select-none">ft</span>
                </div>
                <div className={`flex items-center flex-1 bg-white/[0.04] border rounded-lg overflow-hidden transition-colors duration-200 ${focused === "height-in" ? "border-[#C17A5A]/60" : "border-white/[0.08]"}`}>
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    onFocus={() => setFocused("height-in")}
                    onBlur={() => setFocused(null)}
                    placeholder="9"
                    min={0}
                    max={11}
                    className="flex-1 bg-transparent font-mono text-sm text-[#F5EFE6] placeholder-[#8C7B6B]/40 px-4 py-3.5 outline-none"
                  />
                  <span className="font-mono text-[11px] text-[#8C7B6B]/60 pr-4 select-none">in</span>
                </div>
              </div>
            )}
          </div>

          {/* Home Gym */}
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C7B6B] mb-2">
              Home Gym{" "}
              <span className="text-[#8C7B6B]/40 normal-case tracking-normal text-[9px]">optional</span>
            </label>
            <input
              type="text"
              value={homeGym}
              onChange={(e) => setHomeGym(e.target.value)}
              onFocus={() => setFocused("gym")}
              onBlur={() => setFocused(null)}
              placeholder="e.g. Cliffhanger, Boulder Co."
              maxLength={60}
              className={`w-full bg-white/[0.04] border rounded-lg font-mono text-sm text-[#F5EFE6] placeholder-[#8C7B6B]/40 px-4 py-3.5 outline-none transition-colors duration-200 ${
                focused === "gym" ? "border-[#C17A5A]/60" : "border-white/[0.08]"
              }`}
            />
          </div>

          {error && <p className="font-mono text-[11px] text-red-400">{error}</p>}

          {/* Actions */}
          <div className="flex gap-2 pt-1 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-white/[0.08] rounded-lg font-mono text-[10px] uppercase tracking-widest text-[#8C7B6B] hover:text-[#F5EFE6] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className={`flex-1 py-3 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-all duration-200 ${
                canSubmit
                  ? "bg-[#C17A5A] text-white hover:bg-[#a96849] cursor-pointer"
                  : "bg-white/[0.04] text-[#8C7B6B]/40 cursor-not-allowed border border-white/[0.06]"
              }`}
            >
              {loading ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}