import Button from "@/components/ui/Button";

interface EmailNavigationProps {
  currentIndex: number;
  totalEmails: number;
  isComparing: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onCompare: () => void;
  onRegenerate: () => void;
}

export default function EmailNavigation({
  currentIndex,
  totalEmails,
  isComparing,
  onPrevious,
  onNext,
  onCompare,
  onRegenerate,
}: EmailNavigationProps) {
  return (
    <footer className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 xl:flex-row xl:items-center xl:justify-between">
      <p className="text-sm font-medium text-zinc-400">
        Email {currentIndex + 1} of {totalEmails}
      </p>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onPrevious}
          disabled={totalEmails <= 1}
        >
          ← Previous
        </Button>
        <Button
          type="button"
          variant={isComparing ? "primary" : "secondary"}
          size="sm"
          onClick={onCompare}
        >
          Compare
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onRegenerate}
        >
          Regenerate
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onNext}
          disabled={totalEmails <= 1}
        >
          Next →
        </Button>
      </div>
    </footer>
  );
}
