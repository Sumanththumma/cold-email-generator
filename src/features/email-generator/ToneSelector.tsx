import { twMerge } from "tailwind-merge";

interface ToneSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options?: string[];
}

const defaultToneOptions = [
  "Direct",
  "Consulting",
  "Challenging",
  "Ego Boost",
  "Witty/Funny",
];

export default function ToneSelector({
  value,
  onChange,
  options = defaultToneOptions,
}: ToneSelectorProps) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-medium text-zinc-200">Tone</h3>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => {
          const isActive = value === option;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option)}
              className={twMerge(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "border-blue-400 bg-blue-500/15 text-blue-100 shadow-[0_0_24px_rgba(59,130,246,0.28)]"
                  : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </section>
  );
}
