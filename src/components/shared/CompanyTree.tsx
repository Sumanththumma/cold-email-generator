"use client";

import { useState } from "react";
import { Building2, ChevronDown } from "lucide-react";
import ContactCard from "./ContactCard";

interface Contact {
  id: string;
  name: string;
  role: string;
}

interface Company {
  name: string;
  contacts: Contact[];
}

interface CompanyTreeProps {
  company: Company;
}

export default function CompanyTree({
  company,
}: CompanyTreeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {/* Company Card */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-xl
          border
          border-zinc-800
          bg-zinc-950
          p-3
          transition-all
          hover:border-blue-500/30
          hover:bg-zinc-900
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              rounded-lg
              border
              border-blue-500/20
              bg-gradient-to-br
              from-blue-500/10
              to-purple-500/10
              p-2
            "
          >
            <Building2
              size={16}
              className="text-blue-400"
            />
          </div>

          <span className="text-sm font-medium text-white">
            {company.name}
          </span>
        </div>

        <ChevronDown
          size={16}
          className={`text-zinc-400 transition-transform duration-300 ${
            isExpanded ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>

      {/* Contacts */}
      {isExpanded && (
        <div className="ml-6 space-y-2 border-l border-zinc-800 pl-4">
          {company.contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isSelected={
                selectedContact === contact.id
              }
              onClick={() =>
                setSelectedContact(contact.id)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}