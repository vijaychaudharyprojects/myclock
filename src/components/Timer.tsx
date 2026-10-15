import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, BellRing } from 'lucide-react';
import { playTimerChime } from '../utils/audio';

export const Timer: React.FC = () => {
  const [initialDuration, setInitialDuration] = useState<number>(25 * 60); // in seconds
  const [remainingTime, setRemainingTime] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Custom inputs
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(25);
  const [inputSeconds, setInputSeconds] = useState(0);

  const timerRef = useRef<number | null>(null);

  // Presets
  const presets = [
    { label: 'Pomodoro', duration: 25 * 60 },
    { label: 'Short Break', duration: 5 * 60 },
    { label: 'Long Break', duration: 15 * 60 },
    { label: '10 Min', duration: 10 * 60 },
    { label: '30 Min', duration: 30 * 60 },
    { label: '45 Min', duration: 45 * 60 },
    { label: '1 Hour', duration: 60 * 60 }
  ];

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setIsFinished(true);
            playTimerChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    if (remainingTime <= 0) {
      const total = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
      if (total <= 0) return;
      setInitialDuration(total);
      setRemainingTime(total);
    }
    setIsFinished(false);
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setRemainingTime(initialDuration);
  };

  const handleSelectPreset = (duration: number) => {
    setIsRunning(false);
    setIsFinished(false);
    setInitialDuration(duration);
    setRemainingTime(duration);

    const h = Math.floor(duration / 3600);
    const m = Math.floor((duration % 3600) / 60);
    const s = duration % 60;
    setInputHours(h);
    setInputMinutes(m);
    setInputSeconds(s);
  };

  const handleApplyCustomTime = () => {
    const total = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
    if (total <= 0) return;
    setIsRunning(false);
    setIsFinished(false);
    setInitialDuration(total);
    setRemainingTime(total);
  };

  const handleAddMinutes = (mins: number) => {
    setRemainingTime((prev) => prev + mins * 60);
    setInitialDuration((prev) => prev + mins * 60);
  };

  // Formatting
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');

  // Circular progress calculation
  const progressRatio = initialDuration > 0 ? remainingTime / initialDuration : 0;
  const strokeDashoffset = 283 - 283 * progressRatio;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 md:p-10 shadow-sm transition-colors">
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Countdown Timer
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Focus sessions, Pomodoro intervals, and cooking countdowns
          </p>
        </div>
      </div>

      {/* Preset tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-4 border-b border-slate-100 dark:border-slate-800">
        {presets.map((preset) => {
          const isActive = initialDuration === preset.duration && !isRunning;
          return (
            <button
              key={preset.label}
              onClick={() => handleSelectPreset(preset.duration)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Center Countdown Display with Radial Ring */}
      <div className="py-8 sm:py-12 flex flex-col items-center justify-center">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          {/* SVG Progress Circle */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="6"
              className="stroke-slate-100 dark:stroke-slate-800"
            />
            {/* Active progress */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="6"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-300 ${
                isFinished
                  ? 'stroke-emerald-500'
                  : remainingTime <= 10 && isRunning
                  ? 'stroke-rose-500'
                  : 'stroke-sky-500'
              }`}
            />
          </svg>

          {/* Time text centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            {isFinished ? (
              <div className="flex flex-col items-center animate-bounce">
                <BellRing className="w-10 h-10 text-emerald-500 mb-2" />
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  Time&apos;s Up!
                </span>
              </div>
            ) : (
              <div className="font-mono font-bold tracking-tight text-slate-900 dark:text-white tabular-nums select-all">
                <div className="text-4xl sm:text-5xl">
                  {hours > 0 ? `${hoursStr}:${minutesStr}:${secondsStr}` : `${minutesStr}:${secondsStr}`}
                </div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-sans font-medium">
                  {isRunning ? 'Counting Down' : remainingTime < initialDuration ? 'Paused' : 'Ready'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pb-8 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={handleStartStop}
          className={`px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold'
              : 'bg-sky-600 hover:bg-sky-500 text-white font-bold'
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isRunning ? 'Pause' : remainingTime < initialDuration ? 'Resume' : 'Start'}</span>
        </button>

        <button
          onClick={handleReset}
          className="px-6 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>

        {/* Quick add minutes */}
        <button
          onClick={() => handleAddMinutes(1)}
          className="px-4 py-3.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> 1 Min
        </button>
        <button
          onClick={() => handleAddMinutes(5)}
          className="px-4 py-3.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> 5 Min
        </button>
      </div>

      {/* Custom Duration Configurator */}
      <div className="pt-6">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Set Custom Duration
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              Hours
            </label>
            <input
              type="number"
              min="0"
              max="24"
              value={inputHours}
              onChange={(e) => setInputHours(Math.max(0, parseInt(e.target.value) || 0))}
              disabled={isRunning}
              className="w-full px-3 py-2 text-sm font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              Minutes
            </label>
            <input
              type="number"
              min="0"
              max="59"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              disabled={isRunning}
              className="w-full px-3 py-2 text-sm font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              Seconds
            </label>
            <input
              type="number"
              min="0"
              max="59"
              value={inputSeconds}
              onChange={(e) => setInputSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              disabled={isRunning}
              className="w-full px-3 py-2 text-sm font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>
          <div className="col-span-3 sm:col-span-1 flex items-end">
            <button
              onClick={handleApplyCustomTime}
              disabled={isRunning}
              className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition-colors disabled:opacity-50"
            >
              Set Duration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
