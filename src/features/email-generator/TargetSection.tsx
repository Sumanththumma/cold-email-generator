import Input from "@/components/ui/Input";

interface TargetSectionProps {
  targetName: string;
  designation: string;
  companyUrl: string;
  onChange: (field: "targetName" | "designation" | "companyUrl", value: string) => void;
}

const fields = [
  {
    id: "targetName",
    label: "Target Name",
    placeholder: "Enter target name",
    autoComplete: "name",
  },
  {
    id: "designation",
    label: "Designation",
    placeholder: "Enter designation",
    autoComplete: "organization-title",
  },
  {
    id: "companyUrl",
    label: "Company URL",
    placeholder: "https://company.com",
    autoComplete: "url",
  },
] as const;

export default function TargetSection({
  targetName,
  designation,
  companyUrl,
  onChange,
}: TargetSectionProps) {
  const values = {
    targetName,
    designation,
    companyUrl,
  };

  return (
    <section>
      <h3 className="mb-3 text-sm font-medium text-zinc-200">Target</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="mb-3 block text-xs font-medium text-zinc-400"
            >
              {field.label}
            </label>
            <Input
              id={field.id}
              name={field.id}
              value={values[field.id]}
              onChange={(event) => onChange(field.id, event.target.value)}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              type={field.id === "companyUrl" ? "url" : "text"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
