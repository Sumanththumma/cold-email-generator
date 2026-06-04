"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Button from "@/components/ui/Button";
import LoginModal from "./LoginModal";

export default function AuthNavControls() {
  const { isLoaded, isSignedIn } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  if (!isLoaded) {
    return (
      <div className="h-11 w-24 rounded-full border border-zinc-800 bg-zinc-900/70" />
    );
  }

  if (isSignedIn) {
    return (
      <Link
        href="/workspace"
        className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-zinc-800"
      >
        Workspace
      </Link>
    );
  }

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size="md"
        onClick={() => setIsLoginOpen(true)}
      >
        Login
      </Button>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}
