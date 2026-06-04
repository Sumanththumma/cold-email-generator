import Input from "@/components/ui/Input";

interface NameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function NameInput({ value, onChange }: NameInputProps) {
  return (
    <section>
      <label
        htmlFor="senderName"
        className="mb-3 block text-sm font-medium text-zinc-200"
      >
        Name
      </label>
      <Input
        id="senderName"
        name="senderName"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter your name"
        autoComplete="name"
      />
    </section>
  );
}
