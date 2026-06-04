'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function SidebarToggle({
  isOpen,
  onClick,
}: SidebarToggleProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group absolute top-6 z-50"
      animate={{
        left: isOpen ? '268px' : '12px',
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-zinc-800 to-black shadow-lg">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-md border border-zinc-700/50 transition-all duration-300 group-hover:border-zinc-600/50 group-hover:bg-white/10" />

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/20 to-transparent blur-lg" />

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isOpen ? (
            <motion.div
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeft className="h-5 w-5 text-white" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-5 w-5 text-white" strokeWidth={2.5} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
