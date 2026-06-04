"use client";

import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import EmailCard, { type GeneratedEmail } from "./EmailCard";

interface CompareViewProps {
  emails: GeneratedEmail[];
}

interface EmailVariantSelectorProps {
  label: string;
  emails: GeneratedEmail[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

function EmailVariantSelector({
  label,
  emails,
  selectedIndex,
  onSelect,
}: EmailVariantSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-zinc-200">{label}</p>
      <div className="flex flex-wrap gap-2">
        {emails.map((email, index) => {
          const isActive = selectedIndex === index;

          return (
            <button
              key={email.id}
              type="button"
              onClick={() => onSelect(index)}
              className={twMerge(
                "rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-md transition-all duration-200",
                "hover:brightness-125 focus:outline-none focus:ring-2 focus:ring-blue-500/40",
                isActive
                  ? "border-blue-400 bg-blue-500/15 text-white shadow-[0_0_24px_rgba(59,130,246,0.38)]"
                  : "border-white/10 bg-white/[0.06] text-zinc-400 hover:border-white/20 hover:text-zinc-100"
              )}
              aria-pressed={isActive}
            >
              Email {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CompareView({ emails }: CompareViewProps) {
  const [leftEmailIndex, setLeftEmailIndex] = useState(0);
  const [rightEmailIndex, setRightEmailIndex] = useState(1);
  const maxEmailIndex = Math.max(emails.length - 1, 0);
  const selectedLeftEmailIndex = Math.min(leftEmailIndex, maxEmailIndex);
  const selectedRightEmailIndex = Math.min(rightEmailIndex, maxEmailIndex);
  const rightDefaultIndex = emails.length > 1 ? 1 : 0;

  const leftEmail = emails[selectedLeftEmailIndex] ?? emails[0];
  const rightEmail = emails[selectedRightEmailIndex] ?? emails[rightDefaultIndex];

  const selectedLabels = useMemo(
    () => ({
      left: `Email ${selectedLeftEmailIndex + 1}`,
      right: `Email ${selectedRightEmailIndex + 1}`,
    }),
    [selectedLeftEmailIndex, selectedRightEmailIndex]
  );

  if (!leftEmail || !rightEmail) {
    return null;
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-white">Compare Emails</h2>
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
        <EmailVariantSelector
          label="Left Email Selector:"
          emails={emails}
          selectedIndex={selectedLeftEmailIndex}
          onSelect={setLeftEmailIndex}
        />

        <EmailVariantSelector
          label="Right Email Selector:"
          emails={emails}
          selectedIndex={selectedRightEmailIndex}
          onSelect={setRightEmailIndex}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-zinc-200">
              {selectedLabels.left}
            </p>
            <span className="rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs text-blue-100">
              Left
            </span>
          </div>
          <EmailCard email={leftEmail} compact className="min-h-[560px]" />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-zinc-200">
              {selectedLabels.right}
            </p>
            <span className="rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs text-blue-100">
              Right
            </span>
          </div>
          <EmailCard email={rightEmail} compact className="min-h-[560px]" />
        </div>
      </div>
    </section>
  );
}
