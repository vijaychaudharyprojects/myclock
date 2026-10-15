import React, { useState, useEffect } from 'react';
import { Minimize2, Settings2 } from 'lucide-react';
import { ZenTheme, ClockFormat } from '../types';

interface ZenFullscreenProps {
  onExit: () => void;
  format: ClockFormat;
  onToggleFormat: () => void;
}

export const ZenFullscreen: React.FC<ZenFullscreenProps> = ({
  onExit,
  format,
  onToggleFormat
}) => {
  const [theme, setTheme] = useState<ZenTheme>('minimal');
  const [showControls, setShowControls] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);
  const [now, setNow] = useState<Date>(new Date());

  // Clock tick
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Escape key to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  // Auto-hide controls after 3.5s of no mouse movement
  useEffect(() => {
    let timeout: number;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        setShowControls(false);
      }, 3500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    timeout = window.setTimeout(() => {
      setShowControls(false);
    }, 3500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const is24h = format === '24h';
  const hours24 = now.getHours();
  let hours = hours24;
  let ampm = '';

  if (!is24h) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
  }

  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(now.getMinutes()).padStart(2, '0');
  const secondsStr = String(now.getSeconds()).padStart(2, '0');

  const dateStr = now.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Theme styling map
  const themeStyles: Record<ZenTheme, { bg: string; text: string; subtext: string; accent: string }> = {
    'minimal': {
      bg: 'bg-black',
      text: 'text-white',
      subtext: 'text-neutral-400',
      accent: 'text-sky-400'
    },
    'cyber-amber': {
      bg: 'bg-stone-950',
      text: 'text-amber-400',
      subtext: 'text-amber-600',
      accent: 'text-amber-300'
    },
    'emerald-oled': {
      bg: 'bg-zinc-950',
      text: 'text-emerald-400',
      subtext: 'text-emerald-600',
      accent: 'text-emerald-300'
    },
    'swiss-classic': {
      bg: 'bg-slate-900',
      text: 'text-slate-100',
      subtext: 'text-slate-400',
      accent: 'text-sky-400'
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 select-none transition-colors duration-500 ${currentTheme.bg}`}
    >
      {/* Floating Controls Bar (Fades when idle) */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-1.5 text-xs">
          <Settings2 className="w-3.5 h-3.5 opacity-60 mr-1" />
          <button
            onClick={() => setTheme('minimal')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              theme === 'minimal' ? 'bg-white/20 text-white font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            OLED White
          </button>
          <button
            onClick={() => setTheme('cyber-amber')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              theme === 'cyber-amber' ? 'bg-amber-500/30 text-amber-300 font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Amber CRT
          </button>
          <button
            onClick={() => setTheme('emerald-oled')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              theme === 'emerald-oled' ? 'bg-emerald-500/30 text-emerald-300 font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Emerald
          </button>
          <button
            onClick={() => setTheme('swiss-classic')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              theme === 'swiss-classic' ? 'bg-sky-500/30 text-sky-300 font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Classic Slate
          </button>
        </div>

        <div className="h-4 w-px bg-white/20" />

        {/* 12h/24h toggle */}
        <button
          onClick={onToggleFormat}
          className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors"
        >
          {is24h ? '24H' : '12H'}
        </button>

        {/* Seconds toggle */}
        <button
          onClick={() => setShowSeconds(!showSeconds)}
          className={`text-[11px] font-mono px-2 py-0.5 rounded transition-colors ${
            showSeconds ? 'bg-white/20 font-bold' : 'bg-white/10 opacity-60'
          }`}
        >
          SEC
        </button>

        <div className="h-4 w-px bg-white/20" />

        {/* Exit fullscreen */}
        <button
          onClick={onExit}
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-rose-500/80 hover:bg-rose-500 text-white font-medium transition-colors"
          title="Exit Zen mode (Esc)"
        >
          <Minimize2 className="w-3.5 h-3.5" />
          <span>Exit</span>
        </button>
      </div>

      {/* Main Big Digits */}
      <div className="text-center font-mono font-bold tracking-tight tabular-nums select-none">
        <div className={`text-7xl sm:text-9xl md:text-[13rem] lg:text-[16rem] leading-none ${currentTheme.text}`}>
          {hoursStr}:{minutesStr}
          {showSeconds && (
            <span className={`text-4xl sm:text-6xl md:text-8xl lg:text-9xl opacity-75 ml-2 ${currentTheme.accent}`}>
              :{secondsStr}
            </span>
          )}
          {!is24h && ampm && (
            <span className={`text-2xl sm:text-4xl md:text-5xl font-sans font-medium ml-4 ${currentTheme.subtext}`}>
              {ampm}
            </span>
          )}
        </div>

        {/* Full Date */}
        <div className={`mt-8 sm:mt-12 text-lg sm:text-2xl md:text-3xl font-sans font-medium ${currentTheme.subtext}`}>
          {dateStr}
        </div>
      </div>
    </div>
  );
};
