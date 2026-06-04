"use client";

interface Contact {
  id: string;
  name: string;
  role: string;
}

interface ContactCardProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

export default function ContactCard({
  contact,
  isSelected,
  onClick,
}: ContactCardProps) {
  const initials = contact.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300 ${
        isSelected
          ? "border-blue-500/50 bg-zinc-900 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
          : "border-zinc-800 bg-zinc-950 hover:border-blue-500/30"
      }`}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-900 text-xs font-medium text-zinc-300">
        {initials}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-medium ${
            isSelected ? "text-blue-400" : "text-white"
          }`}
        >
          {contact.name}
        </p>

        <p className="truncate text-xs text-zinc-500">
          {contact.role}
        </p>
      </div>

      {isSelected && (
        <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
      )}
    </button>
  );
}