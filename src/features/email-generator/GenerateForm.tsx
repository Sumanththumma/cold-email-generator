"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import CTASection from "./CTASection";
import ContextSection from "./ContextSection";
import EmailResult from "./EmailResult";
import type { GeneratedEmail } from "./EmailCard";
import NameInput from "./NameInput";
import TargetSection from "./TargetSection";
import ToneSelector from "./ToneSelector";

interface GenerateFormState {
  senderName: string;
  targetName: string;
  designation: string;
  companyUrl: string;
  context: string;
  tone: string;
  cta: string;
}

const initialFormState: GenerateFormState = {
  senderName: "",
  targetName: "",
  designation: "",
  companyUrl: "",
  context: "",
  tone: "",
  cta: "",
};

export default function GenerateForm() {
  const [formState, setFormState] = useState<GenerateFormState>(initialFormState);
  const [showResult, setShowResult] = useState(false);
  const [emails, setEmails] = useState<GeneratedEmail[]>([]);
  const [currentEmail, setCurrentEmail] = useState(0);
  const [isComparing, setIsComparing] = useState(false);

  const updateField = <Field extends keyof GenerateFormState>(
    field: Field,
    value: GenerateFormState[Field]
  ) => {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmails(generateEmailVariants(formState));
    setCurrentEmail(0);
    setIsComparing(false);
    setShowResult(true);
  };

  const handleRegenerate = () => {
    setEmails(generateEmailVariants(formState, true));
    setCurrentEmail(0);
    setIsComparing(false);
  };

  if (showResult) {
    return (
      <EmailResult
        emails={emails}
        currentEmail={currentEmail}
        isComparing={isComparing}
        onCurrentEmailChange={setCurrentEmail}
        onCompareChange={setIsComparing}
        onRegenerate={handleRegenerate}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-8">
      <NameInput
        value={formState.senderName}
        onChange={(value) => updateField("senderName", value)}
      />

      <TargetSection
        targetName={formState.targetName}
        designation={formState.designation}
        companyUrl={formState.companyUrl}
        onChange={updateField}
      />

      <ContextSection
        value={formState.context}
        onChange={(value) => updateField("context", value)}
      />

      <ToneSelector
        value={formState.tone}
        onChange={(value) => updateField("tone", value)}
      />

      <CTASection
        value={formState.cta}
        onChange={(value) => updateField("cta", value)}
      />

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" size="lg">
          Generate Email
        </Button>
      </div>
    </form>
  );
}

const variantStyles = [
  {
    variant: "Direct",
    subject: "Increase outbound meetings by 30%",
    opener: "I noticed your team is building a sharper outbound motion, and there may be a direct way to turn more qualified accounts into booked conversations.",
    angle: "CONVERGE helps teams turn target context into concise, personalized cold emails that are easier to review, send, and improve.",
  },
  {
    variant: "Consulting",
    subject: "A cleaner outbound workflow for your team",
    opener: "I was looking at your current growth motion and wanted to share a practical idea that could simplify how your team approaches outbound.",
    angle: "The biggest lift usually comes from improving message relevance before volume increases. CONVERGE gives reps a structured way to move from account research to usable email variants without losing the human edge.",
  },
  {
    variant: "Challenging",
    subject: "Your outbound may be leaving meetings on the table",
    opener: "Most teams are investing in more outbound activity, but the messaging still sounds too generic to earn attention from busy buyers.",
    angle: "CONVERGE is built to challenge that pattern by generating targeted variants that speak to the account, the role, and the desired next step.",
  },
  {
    variant: "Ego Boost",
    subject: "Impressed by the way your team is scaling outbound",
    opener: "Your team appears to be approaching growth with real intent, which is exactly when small improvements in outbound quality can compound quickly.",
    angle: "CONVERGE can help preserve that quality as volume increases by turning seller context into polished, on-brand emails in minutes.",
  },
  {
    variant: "Witty/Funny",
    subject: "Less cold-email guesswork, more booked meetings",
    opener: "Cold outbound should not feel like tossing messages into the void and hoping one returns with a calendar link.",
    angle: "CONVERGE gives your team a faster way to create relevant, readable emails that sound like a person wrote them because a person still guided the context.",
  },
];

function generateEmailVariants(
  formData: GenerateFormState,
  regenerated = false
): GeneratedEmail[] {
  const targetName = formData.targetName.trim() || "John";
  const senderName = formData.senderName.trim() || "Your Name";
  const designation = formData.designation.trim() || "your role";
  const company = getCompanyName(formData.companyUrl) || "your company";
  const context =
    formData.context.trim() ||
    "your team is focused on improving outbound quality and booking more qualified conversations";
  const cta =
    formData.cta.trim() ||
    "Would you be open to a quick 15-minute conversation next week?";
  const refreshLine = regenerated
    ? "I took another pass and tightened the message around the clearest business outcome."
    : "I thought this might be relevant based on the context you shared.";

  return variantStyles.map((style, index) => ({
    id: index + 1,
    variant: style.variant,
    subject:
      index === 0
        ? style.subject
        : `${style.subject}${regenerated ? " - refreshed" : ""}`,
    preview: style.angle,
    body: `Hi ${targetName},\n\n${style.opener}\n\n${style.angle}\n\nGiven your work as ${designation} at ${company}, the current priority seems to be that ${context}. ${refreshLine}\n\nThe goal is not to replace thoughtful selling. It is to give your team stronger starting points, cleaner variants, and a faster path from research to outreach.\n\n${cta}\n\nBest,\n${senderName}`,
  }));
}

function getCompanyName(companyUrl: string) {
  if (!companyUrl.trim()) {
    return "";
  }

  try {
    const url = new URL(companyUrl);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return companyUrl.replace(/^https?:\/\//, "").replace(/^www\./, "");
  }
}
