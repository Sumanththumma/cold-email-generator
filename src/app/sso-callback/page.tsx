"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SSOCallbackPage() {
  const { handleRedirectCallback } = useClerk();
  const [error, setError] = useState("");

  useEffect(() => {
    handleRedirectCallback({
      signInFallbackRedirectUrl: "/workspace",
      signInForceRedirectUrl: "/workspace",
      signUpFallbackRedirectUrl: "/workspace",
      signUpForceRedirectUrl: "/workspace",
    }).catch(() => {
      setError("We could not complete sign in. Please try again.");
    });
  }, [handleRedirectCallback]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 text-center shadow-2xl">
        <h1 className="text-2xl font-semibold">
          {error ? "Login failed" : "Completing login"}
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          {error || "One moment while we open your workspace."}
        </p>
      </div>
    </main>
  );
}
