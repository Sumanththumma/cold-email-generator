import Textarea from "@/components/ui/Textarea";

interface ContextSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ContextSection({ value, onChange }: ContextSectionProps) {
  return (
    <section>
      <label
        htmlFor="context"
        className="mb-3 block text-sm font-medium text-zinc-200"
      >
        Context
      </label>
      <Textarea
        id="context"
        name="context"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        className="min-h-[160px]"
        placeholder="Add company context, recent achievements, pain points, industry insights, personalization details, LinkedIn information, company news, funding events, or anything useful for personalization."
      />
    </section>
  );
}
