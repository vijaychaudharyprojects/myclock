import React, { useState } from 'react';
import { Clock, Sun, Moon, Maximize2, Menu, X } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onEnterZenMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  isDarkMode,
  onToggleTheme,
  onEnterZenMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'clock', label: 'Clock' },
    { id: 'world', label: 'World Time' },
    { id: 'stopwatch', label: 'Stopwatch' },
    { id: 'timer', label: 'Timer' },
    { id: 'alarm', label: 'Alarm' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#clock"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('clock');
            }}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            <span className="p-1.5 rounded-lg bg-sky-500 text-white shadow-sm flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </span>
            <span>ChronoPrecision</span>
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-sky-600 dark:text-sky-400 font-semibold'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary utilities & action controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Zen Fullscreen Action */}
            <button
              onClick={onEnterZenMode}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
              title="Open full-screen distraction-free desk clock"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Zen Clock</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="p-2 md:hidden rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                onEnterZenMode();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 dark:bg-sky-500 rounded-lg shadow-sm"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Full-Screen Zen Mode</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
