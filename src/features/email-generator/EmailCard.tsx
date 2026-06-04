import { twMerge } from "tailwind-merge";

export interface GeneratedEmail {
  id: number;
  variant: string;
  subject: string;
  preview: string;
  body: string;
}

interface EmailCardProps {
  email: GeneratedEmail;
  className?: string;
  compact?: boolean;
}

export default function EmailCard({
  email,
  className,
  compact = false,
}: EmailCardProps) {
  return (
    <article
      className={twMerge(
        "rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-md",
        compact ? "p-5" : "min-h-[600px] p-6 md:p-8",
        className
      )}
    >
      <div className="mb-6 border-b border-white/10 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
          {email.variant}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          {email.subject}
        </h3>
      </div>

      <div
        className={twMerge(
          "overflow-y-auto pr-2 text-[15px] leading-7 text-zinc-100 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10",
          compact ? "max-h-[520px]" : "max-h-[500px] md:max-h-[540px]"
        )}
      >
        {email.body.split("\n\n").map((paragraph) => (
          <p key={paragraph} className="mb-5 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
