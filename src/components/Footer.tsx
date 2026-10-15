import React, { useState, useEffect } from 'react';
import { Clock, Globe, Shield, ExternalLink } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  onTabChange: (tab: ActiveTab) => void;
  onEnterZenMode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange, onEnterZenMode }) => {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateUtc = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateUtc();
    const interval = setInterval(updateUtc, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & Live UTC */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-500 text-white flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </span>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                ChronoPrecision
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Precision digital and analog online timekeeping platform. Designed for high accuracy, zero tracking bloat, and fast edge deployment on Cloudflare Pages.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 block mb-0.5">
                Universal Reference
              </span>
              <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                {utcTime || 'Synchronizing...'}
              </span>
            </div>
          </div>

          {/* Column 2: Clock Instruments */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Time Instruments
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onTabChange('clock')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  Digital Clock (Milliseconds)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('clock')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  Swiss Analog Dial Display
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('world')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  World Clock & Financial Hubs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('stopwatch')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  Precision Lap Stopwatch
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('timer')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  Countdown & Pomodoro Timer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('alarm')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  Online Desktop Alarms
                </button>
              </li>
              <li>
                <button
                  onClick={onEnterZenMode}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  Zen Fullscreen Desk Display
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: World Metropolitan Hubs */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Major Time Zones
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center justify-between">
                <span>London, United Kingdom</span>
                <span className="font-mono text-slate-400">GMT / BST</span>
              </li>
              <li className="flex items-center justify-between">
                <span>New York, USA</span>
                <span className="font-mono text-slate-400">EST / EDT</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Tokyo, Japan</span>
                <span className="font-mono text-slate-400">JST (UTC+9)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Paris, France</span>
                <span className="font-mono text-slate-400">CET / CEST</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Dubai, UAE</span>
                <span className="font-mono text-slate-400">GST (UTC+4)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Sydney, Australia</span>
                <span className="font-mono text-slate-400">AEST / AEDT</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Mandatory Legal & Pages */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Information & Legal
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onTabChange('about')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  About Us & Accuracy Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('contact')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  Contact & Support Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('privacy')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  Privacy Policy (GDPR / CCPA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('terms')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  Terms of Service & Disclaimer
                </button>
              </li>
              <li className="pt-2 flex items-center gap-3">
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <span>sitemap.xml</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <span>robots.txt</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Quiet Unboxed Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} ChronoPrecision. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Cloudflare Pages Ready</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Cookie Local Storage</span>
            <span aria-hidden="true">·</span>
            <span>AdSense Compliant Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
