'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      )
    },
    {
      name: 'Edit Notices',
      path: '/dashboard/notice',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      )
    },
    {
      name: 'Create Bill',
      path: '/dashboard/bill',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 lg:w-[20%] lg:min-w-[200px] lg:max-w-[280px] min-h-screen bg-gradient-to-b from-purple-600 via-purple-500 to-blue-500 
        p-5 flex flex-col flex-shrink-0
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header with Close button on mobile */}
        <div className="flex items-center justify-between mb-8 pl-1">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative bg-white/20 p-1">
              <Image
                src="/logo.webp"
                alt="Proshosto Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white tracking-wide">Proshosto</h1>
              <span className="text-[10px] text-white/80 uppercase tracking-widest font-medium">Dashboard</span>
            </div>
          </div>

          {/* Close button - mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                  ? 'bg-white text-gray-900 shadow-xl scale-[1.02]'
                  : 'text-white/90 hover:bg-white/10 hover:text-white hover:translate-x-1'
                  }`}
              >
                <span className={`transition-colors ${isActive ? 'text-blue-600' : 'text-white/80 group-hover:text-white'}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="pt-6 border-t border-white/10 mt-auto">
          <div className="px-2 text-center">
            <p className="text-xs font-medium text-white/80">Version 1.0.0</p>
            <p className="text-[10px] text-white/50 mt-1">
              &copy; Proshosto, 2026. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
