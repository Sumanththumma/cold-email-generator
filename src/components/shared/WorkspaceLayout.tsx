'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import SidebarToggle from './SidebarToggle';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && <Sidebar key="sidebar" />}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className="flex-1 overflow-hidden transition-all duration-300 ease-in-out"
      >
        {children}
      </main>

      {/* Sidebar Toggle Button */}
      <SidebarToggle
        isOpen={sidebarOpen}
        onClick={toggleSidebar}
      />
    </div>
  );
}
