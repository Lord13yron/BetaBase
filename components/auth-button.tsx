// "use client";

// import { useEffect, useState } from "react";
// import { createClient } from "@/lib/supabase/client";
// import { User } from "@supabase/supabase-js";
// import { UserProfile } from "@/app/types/types";
// import Avatar from "./Avatar";
// import { useRouter } from "next/navigation";

// export function AuthButton({ isDrawer = false }: { isDrawer?: boolean }) {
//   const supabase = createClient();
//   const [user, setUser] = useState<User | null>(null);
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProfile = async (userId: string) => {
//       const { data } = await supabase
//         .from("user_profiles")
//         .select("*")
//         .eq("id", userId)
//         .single();
//       setProfile(data);
//     };

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       const currentUser = session?.user ?? null;
//       setUser(currentUser);
//       if (currentUser) {
//         fetchProfile(currentUser.id);
//       } else {
//         setProfile(null);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [supabase]);

//   return user ? (
//     <div
//       onClick={() => router.push(`/profile`)}
//       className="hover:cursor-pointer"
//     >
//       {profile ? (
//         <Avatar profile={profile} size="small" />
//       ) : (
//         <div
//           className={`w-10 h-10
//              rounded-full bg-[#C17A5A]/15 ring-2 ring-[#C17A5A]/30 flex items-center justify-center`}
//         ></div>
//       )}
//     </div>
//   ) : (
//     <div className="flex gap-2">
//       <button
//         className={`text-[10px] tracking-widest uppercase text-stone hover:text-granite transition-colors ${isDrawer ? "block" : "hidden md:block"}`}
//         onClick={() => router.push(`/auth/login`)}
//       >
//         Sign in
//       </button>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { UserProfile } from "@/app/types/types";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import { LogoutButton } from "./logout-button";

export function AuthButton({ isDrawer = false }: { isDrawer?: boolean }) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const { data } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();
      setProfile(data);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return user ? (
    <div
      onClick={() => router.push(`/profile`)}
      className="hover:cursor-pointer"
    >
      {profile ? (
        <div className="flex gap-4 items-center">
          <Avatar profile={profile} size="small" />
          <LogoutButton />
        </div>
      ) : (
        <div
          className={`w-10 h-10
             rounded-full bg-[#C17A5A]/15 ring-2 ring-[#C17A5A]/30 flex items-center justify-center`}
        ></div>
      )}
    </div>
  ) : (
    <div className="flex gap-2">
      <div
        className={`text-[10px] tracking-widest uppercase text-stone hover:text-granite transition-colors ${isDrawer ? "block" : "hidden md:block"}`}
        onClick={() => router.push(`/auth/login`)}
      >
        Sign in
      </div>
    </div>
  );
}
