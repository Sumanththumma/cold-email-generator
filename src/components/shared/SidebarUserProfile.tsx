"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { ChevronUp, HelpCircle, LogOut, Settings, Sparkles, User, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    icon: Zap,
    label: "Upgrade Plan",
    href: "/pricing",
    isHighlight: true,
  },
  {
    icon: Sparkles,
    label: "Personalization",
    href: "/personalization",
  },
  {
    icon: User,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
  {
    icon: HelpCircle,
    label: "Help",
    href: "/help",
  },
];

export default function SidebarUserProfile() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { isLoaded, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!isLoaded || !user) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-3">
        <div className="flex animate-pulse items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-zinc-800" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3 w-24 rounded bg-zinc-800" />
            <div className="h-3 w-32 rounded bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  const userName = user.fullName || "User";
  const userEmail = user.primaryEmailAddress?.emailAddress || "";
  const userInitial = userName.charAt(0).toUpperCase();

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 text-left backdrop-blur-sm transition-colors hover:border-zinc-700 hover:bg-zinc-900/70"
      >
        <div className="flex items-center gap-3">
          {user.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.imageUrl}
              alt={userName}
              className="h-10 w-10 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-sm font-semibold text-white">
              {userInitial}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{userName}</p>
            <p className="truncate text-xs text-zinc-400">{userEmail}</p>
          </div>

          <ChevronUp
            className={`h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen ? (
        <div className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/95 shadow-2xl backdrop-blur-xl">
          <div className="space-y-1 p-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigation(item.href)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  item.isHighlight
                    ? "text-yellow-400 hover:bg-yellow-500/10"
                    : "text-zinc-200 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mx-2 h-px bg-zinc-800" />

          <div className="p-2">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
