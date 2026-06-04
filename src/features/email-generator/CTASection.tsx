import Textarea from "@/components/ui/Textarea";

interface CTASectionProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CTASection({ value, onChange }: CTASectionProps) {
  return (
    <section>
      <label
        htmlFor="cta"
        className="mb-3 block text-sm font-medium text-zinc-200"
      >
        Call To Action
      </label>
      <Textarea
        id="cta"
        name="cta"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="min-h-[132px]"
        placeholder={`What action should the recipient take after reading the email?\n\nExamples:\n\n- Schedule a call\n- Book a demo\n- Reply to this email\n- Connect on LinkedIn`}
      />
    </section>
  );
}
