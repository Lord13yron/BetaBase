"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/auth/login");
  };

  return (
    <div
      onClick={logout}
      className="bg-transparent text-stone border border-stone/40 rounded-full text-[10px] tracking-[0.12em] uppercase font-mono cursor-pointer p-2 hover:bg-stone/10 transition-colors"
    >
      Logout
    </div>
  );
}
