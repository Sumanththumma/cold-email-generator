import Button from "@/components/ui/Button";
import type { GeneratedEmail } from "./EmailCard";

interface GeneratedEmailHeaderProps {
  currentIndex: number;
  totalEmails: number;
  email: GeneratedEmail;
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
}

export default function GeneratedEmailHeader({
  currentIndex,
  totalEmails,
  email,
  copied,
  onCopy,
  onDownload,
}: GeneratedEmailHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-medium text-blue-200">
          Email Variant {currentIndex + 1} of {totalEmails}
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Generated Email
        </h2>
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Subject
          </p>
          <p className="mt-1 text-lg font-medium text-zinc-100">
            {email.subject}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onCopy}
          className="min-w-28"
        >
          {copied ? "✓ Copied" : "Copy"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onDownload}
        >
          Download
        </Button>
      </div>
    </header>
  );
}
