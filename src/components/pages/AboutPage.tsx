import React from 'react';
import { ShieldCheck, Zap, Globe2, Award, HeartHandshake } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Hero card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 shadow-sm transition-colors text-center sm:text-left">
        <span className="text-xs font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400 mb-2 block">
          About ChronoPrecision
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Precision Timekeeping for the Modern Web
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          ChronoPrecision was created with a clear objective: to build the world&apos;s fastest, cleanest, and most reliable web-based clock, stopwatch, countdown timer, and international timezone converter without unnecessary tracking scripts, intrusive popups, or bloated frameworks.
        </p>
      </div>

      {/* Core values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            Sub-Millisecond Accuracy
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Engineered using the browser&apos;s High Resolution Time API (`performance.now()`) and synchronized against device operating system NTP servers.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            Zero Tracking Bloat
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            All timers, alarms, laps, and pinned timezone preferences stay strictly inside your local browser storage (`localStorage`). We never transmit your alarms to remote servers.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            Global IANA Standard
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Fully compatible with international daylight saving transitions, UTC offset calculations, and world metropolitan market sessions.
          </p>
        </div>
      </div>

      {/* Deep Story & Standards */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Our Engineering Standards
        </h2>
        <p>
          Online time tools frequently suffer from poor UX: cluttered banner ads obstructing the screen, heavy tracking scripts causing battery drain, or delayed timers that fail because the browser tab went idle.
        </p>
        <p>
          ChronoPrecision addresses these issues systematically:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li>
            <strong>Web Audio API Acoustic Alerts:</strong> Synthesized purely on the fly using standard HTML5 oscillator nodes, guaranteeing that alarms and timer chimes trigger instantly without downloading external MP3 files.
          </li>
          <li>
            <strong>Optimized Refresh Cycles:</strong> Clock renders intelligently scale: running at 60Hz when milliseconds are requested, and dropping to low-CPU ticks for standard hours and minutes to preserve mobile battery longevity.
          </li>
          <li>
            <strong>Cloudflare Edge Deployment:</strong> Built as a pristine static bundle with instant global CDN caching via Cloudflare Pages, yielding near-zero First Contentful Paint (FCP) anywhere on Earth.
          </li>
        </ul>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Award className="w-5 h-5 text-sky-500" />
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Designed for students, remote engineering teams, laboratory researchers, and desk setups worldwide.
          </span>
        </div>
      </div>
    </div>
  );
};
