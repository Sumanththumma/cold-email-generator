"use client";

import { useEffect, useState } from "react";
import CompareView from "./CompareView";
import EmailCard, { type GeneratedEmail } from "./EmailCard";
import EmailNavigation from "./EmailNavigation";
import GeneratedEmailHeader from "./GeneratedEmailHeader";

interface EmailResultProps {
  emails: GeneratedEmail[];
  currentEmail: number;
  isComparing: boolean;
  onCurrentEmailChange: (index: number) => void;
  onCompareChange: (isComparing: boolean) => void;
  onRegenerate: () => void;
}

export default function EmailResult({
  emails,
  currentEmail,
  isComparing,
  onCurrentEmailChange,
  onCompareChange,
  onRegenerate,
}: EmailResultProps) {
  const [copied, setCopied] = useState(false);
  const activeEmail = emails[currentEmail];

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(false), 2000);

    return () => window.clearTimeout(timer);
  }, [copied]);

  if (!activeEmail) {
    return null;
  }

  const goToPrevious = () => {
    onCurrentEmailChange(
      currentEmail === 0 ? emails.length - 1 : currentEmail - 1
    );
  };

  const goToNext = () => {
    onCurrentEmailChange((currentEmail + 1) % emails.length);
  };

  const handleCopy = async () => {
    const emailText = formatEmailForExport(activeEmail);

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(emailText);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = emailText;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
  };

  const handleDownload = () => {
    const blob = new Blob([formatEmailForExport(activeEmail)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `cold-email-variant-${currentEmail + 1}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mt-8">
      <GeneratedEmailHeader
        currentIndex={currentEmail}
        totalEmails={emails.length}
        email={activeEmail}
        copied={copied}
        onCopy={handleCopy}
        onDownload={handleDownload}
      />

      {isComparing ? (
        <CompareView emails={emails} />
      ) : (
        <EmailCard email={activeEmail} />
      )}

      <EmailNavigation
        currentIndex={currentEmail}
        totalEmails={emails.length}
        isComparing={isComparing}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onCompare={() => onCompareChange(!isComparing)}
        onRegenerate={onRegenerate}
      />
    </section>
  );
}

function formatEmailForExport(email: GeneratedEmail) {
  return `Subject: ${email.subject}\n\n${email.body}`;
}
