"use client";

import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default function GoogleSignin() {
  async function handleOAuthSignIn() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
    if (error) {
      console.error("Error during Google OAuth sign-in:", error.message);
    } else {
      console.log("Google OAuth sign-in initiated:", data);
    }
  }
  return (
    <div
      onClick={handleOAuthSignIn}
      className="flex flex-row justify-between items-center bg-blue-700 hover:cursor-pointer rounded-lg"
    >
      <h6 className=" text-white text-sm px-4">Sign in with Google</h6>
      <Image
        src="/google.png"
        alt="Google Logo"
        width={32}
        height={32}
        className="bg-white p-1 border border-gray-300 "
      />
    </div>
  );
}
