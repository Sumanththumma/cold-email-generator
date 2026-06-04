"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search contacts...",
}: SearchInputProps) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          h-9
          w-full
          rounded-xl
          border
          border-gray-700
          bg-gray-900/50
          pl-10
          pr-3
          text-sm
          text-white
          placeholder:text-gray-600
          backdrop-blur-xl
          outline-none
          transition-all
          duration-300
          focus:border-blue-500/50
          focus:ring-2
          focus:ring-blue-500/20
        "
      />
    </div>
  );
}