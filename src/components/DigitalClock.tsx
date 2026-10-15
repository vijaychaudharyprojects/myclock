import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Copy, Check, Clock as ClockIcon } from 'lucide-react';
import { ClockFormat } from '../types';
import { playTickSound } from '../utils/audio';

interface DigitalClockProps {
  format: ClockFormat;
  onToggleFormat: () => void;
  showMilliseconds: boolean;
  onToggleMilliseconds: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const DigitalClock: React.FC<DigitalClockProps> = ({
  format,
  onToggleFormat,
  showMilliseconds,
  onToggleMilliseconds,
  soundEnabled,
  onToggleSound
}) => {
  const [now, setNow] = useState<Date>(new Date());
  const [copied, setCopied] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);

  // Update clock at 60fps if milliseconds are enabled, or every 250ms for normal mode
  useEffect(() => {
    let animId: number;
    let lastSecond = -1;

    const tick = () => {
      const current = new Date();
      setNow(current);

      if (soundEnabled && current.getSeconds() !== lastSecond) {
        lastSecond = current.getSeconds();
        playTickSound();
      }

      if (showMilliseconds) {
        animId = requestAnimationFrame(tick);
      }
    };

    if (showMilliseconds) {
      animId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animId);
    } else {
      const interval = setInterval(tick, 100);
      return () => clearInterval(interval);
    }
  }, [showMilliseconds, soundEnabled]);

  // Format parts
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
  const msStr = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');

  // Date metadata
  const dayName = now.toLocaleDateString(undefined, { weekday: 'long' });
  const dateStr = now.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Timezone and day metadata
  const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const tzOffsetMinutes = -now.getTimezoneOffset();
  const tzOffsetHours = Math.floor(Math.abs(tzOffsetMinutes) / 60);
  const tzOffsetMins = Math.abs(tzOffsetMinutes) % 60;
  const tzSign = tzOffsetMinutes >= 0 ? '+' : '-';
  const formattedTz = `UTC${tzSign}${String(tzOffsetHours).padStart(2, '0')}:${String(tzOffsetMins).padStart(2, '0')}`;

  // Day of year calculation
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const isLeap = (now.getFullYear() % 4 === 0 && now.getFullYear() % 100 !== 0) || now.getFullYear() % 400 === 0;
  const totalDays = isLeap ? 366 : 365;
  const weekOfYear = Math.ceil((((now.getTime() - startOfYear.getTime()) / 86400000) + startOfYear.getDay() + 1) / 7);

  // Day progress %
  const secondsElapsedToday = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const dayPercent = ((secondsElapsedToday / 86400) * 100).toFixed(1);

  const handleCopyTimestamp = () => {
    const text = `${now.toISOString()} | ${now.toLocaleTimeString()} (${timeZoneName})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden transition-colors">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

      {/* Header controls bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <ClockIcon className="w-4 h-4 text-sky-500" />
          <span>Local System Time</span>
          <span aria-hidden="true">·</span>
          <span>{timeZoneName}</span>
          <span aria-hidden="true">·</span>
          <span>{formattedTz}</span>
        </div>

        {/* Control toggles */}
        <div className="flex items-center gap-2">
          {/* 12h / 24h Toggle */}
          <button
            onClick={onToggleFormat}
            className="px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 transition-colors"
          >
            {is24h ? '24-Hour' : '12-Hour'}
          </button>

          {/* Seconds Toggle */}
          <button
            onClick={() => setShowSeconds(!showSeconds)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
              showSeconds
                ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            Sec
          </button>

          {/* Milliseconds Toggle */}
          <button
            onClick={onToggleMilliseconds}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
              showMilliseconds
                ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            .ms
          </button>

          {/* Sound tick toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute clock tick' : 'Enable clock tick'}
            className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title={soundEnabled ? 'Mute tick' : 'Play ticking sound'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-sky-500" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          {/* Copy ISO Timestamp */}
          <button
            onClick={handleCopyTimestamp}
            aria-label="Copy timestamp"
            className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title="Copy ISO 8601 timestamp"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Digits Display */}
      <div className="py-8 sm:py-12 text-center">
        <div className="inline-flex items-baseline justify-center font-mono font-bold tracking-tight text-slate-900 dark:text-white tabular-nums select-all">
          {/* Hours & Minutes */}
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
            {hoursStr}:{minutesStr}
          </span>

          {/* Seconds */}
          {showSeconds && (
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-700 dark:text-slate-300 ml-1 sm:ml-2">
              :{secondsStr}
            </span>
          )}

          {/* Milliseconds */}
          {showMilliseconds && (
            <span className="text-xl sm:text-3xl md:text-4xl text-sky-600 dark:text-sky-400 ml-1 sm:ml-2 w-8 sm:w-16 text-left">
              .{msStr}
            </span>
          )}

          {/* AM / PM indicator */}
          {!is24h && ampm && (
            <span className="text-lg sm:text-2xl md:text-3xl font-semibold text-slate-500 dark:text-slate-400 ml-2 sm:ml-4 tracking-normal">
              {ampm}
            </span>
          )}
        </div>

        {/* Date Display */}
        <div className="mt-4 sm:mt-6">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100 tracking-tight">
            {dayName}, {dateStr}
          </p>
        </div>
      </div>

      {/* Bottom day progress and calendar stats */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span>Day Progress: {dayPercent}%</span>
          <span>Day {dayOfYear} of {totalDays} (Week {weekOfYear})</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-sky-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${dayPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
