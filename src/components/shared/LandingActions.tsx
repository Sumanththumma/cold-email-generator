"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Button from "@/components/ui/Button";
import LoginModal from "./LoginModal";

export default function LandingActions() {
  const { isLoaded } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        size="xl"
        className="mt-10"
        onClick={() => setIsLoginOpen(true)}
        disabled={!isLoaded}
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
