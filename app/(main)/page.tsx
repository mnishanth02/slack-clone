"use client";

import { useAuthActions } from "@convex-dev/auth/react";

import { Button } from "@/components/ui/button";

export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <p>Logged in</p>
      <Button onClick={() => signOut()}>Sign out</Button>
    </main>
  );
}
