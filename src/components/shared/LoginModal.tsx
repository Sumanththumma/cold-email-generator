"use client";

import { useSignIn } from "@clerk/nextjs/legacy";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const oauthProviders = [
  {
    label: "Continue with Google",
    strategy: "oauth_google",
    mark: "G",
  },
  {
    label: "Continue with GitHub",
    strategy: "oauth_github",
    mark: "GH",
  },
] as const;

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "errors" in error &&
    Array.isArray(error.errors) &&
    error.errors[0]?.message
  ) {
    return String(error.errors[0].message);
  }

  return "Unable to sign in. Check your details and try again.";
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { isLoaded, signIn } = useSignIn();
  const [error, setError] = useState("");
  const [activeProvider, setActiveProvider] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setError("");
    setActiveProvider(null);
    onClose();
  };

  const handleOAuthLogin = async (
    strategy: (typeof oauthProviders)[number]["strategy"]
  ) => {
    if (!isLoaded) {
      return;
    }

    setActiveProvider(strategy);
    setError("");

    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/workspace",
        continueSignUp: true,
        continueSignIn: true,
      });
    } catch (error) {
      setError(getErrorMessage(error));
      setActiveProvider(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      onMouseDown={handleClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/95 p-6 text-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="login-modal-title" className="text-2xl font-semibold">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Sign in to open your workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
            aria-label="Close login modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {oauthProviders.map((provider) => (
            <Button
              key={provider.strategy}
              type="button"
              variant="secondary"
              size="lg"
              className="w-full justify-start gap-3 px-5"
              disabled={!isLoaded || activeProvider !== null}
              onClick={() => handleOAuthLogin(provider.strategy)}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 bg-black text-[11px] font-semibold text-white">
                {provider.mark}
              </span>
              <span>
                {activeProvider === provider.strategy
                  ? "Redirecting..."
                  : provider.label}
              </span>
            </Button>
          ))}

          {error ? (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
