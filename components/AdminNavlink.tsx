// "use client";

// import { useEffect, useState } from "react";
// import { createClient } from "@/lib/supabase/client";
// import { User } from "@supabase/supabase-js";
// import { UserProfile } from "@/app/types/types";
// import { useRouter } from "next/navigation";

// export function AdminNavlink() {
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
//     <div onClick={() => router.push(`/admin`)} className="hover:cursor-pointer">
//         {profile?.is_superuser && <p>Admin</p>}
//     </div>
//   ) : null;
// }

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { UserProfile } from "@/app/types/types";
import { useRouter } from "next/navigation";

export function AdminNavlink() {
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

  return user && profile?.is_superuser ? (
    <button
      onClick={() => router.push(`/admin`)}
      className="text-[10px] tracking-widest uppercase bg-clay text-chalk px-3 py-1.5 rounded-sm hover:bg-clay/80 transition-colors"
    >
      Admin
    </button>
  ) : null;
}