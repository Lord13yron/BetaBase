import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <h1>Home</h1>
      <Suspense>
        <AuthButton />
      </Suspense>
      <Link className="underline underline-offset-4 p-2" href="/account">
        Go to Account
      </Link>
    </main>
  );
}
