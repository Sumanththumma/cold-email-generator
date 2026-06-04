import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={twMerge(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}