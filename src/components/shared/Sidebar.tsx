'use client';

import { motion } from 'framer-motion';
import SearchInput from "@/components/ui/SearchInput";
import CompanyTree from "./CompanyTree";
import SidebarUserProfile from "./SidebarUserProfile";

const companies = [
  {
    name: "Tesla Inc",
    contacts: [
      {
        id: "1",
        name: "Elon Musk",
        role: "CEO",
      },
      {
        id: "2",
        name: "Marketing Team",
        role: "Marketing",
      },
      {
        id: "3",
        name: "HR Team",
        role: "Human Resources",
      },
    ],
  },
  {
    name: "SpaceX",
    contacts: [
      {
        id: "4",
        name: "Gwynne Shotwell",
        role: "President & COO",
      },
      {
        id: "5",
        name: "Sales Team",
        role: "Sales",
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <motion.aside
      className="relative flex h-screen w-[280px] flex-col border-r border-zinc-800/50 bg-gradient-to-b from-black via-black to-black p-4"
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -280, opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <SearchInput />

          <motion.div
            className="mt-4 space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: 'easeOut',
            }}
          >
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 + index * 0.05,
                  ease: 'easeOut',
                }}
              >
                <CompanyTree company={company} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-4 border-t border-zinc-800/50 pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.2,
            ease: 'easeOut',
          }}
        >
          <SidebarUserProfile />
        </motion.div>
      </div>

      {/* Subtle border glow */}
      <div className="absolute -right-px top-0 bottom-0 w-px bg-gradient-to-b from-zinc-700/50 via-zinc-800/0 to-zinc-700/50" />
    </motion.aside>
  );
}
