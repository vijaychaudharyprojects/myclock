import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag, Download, Copy, Check } from 'lucide-react';
import { LapRecord } from '../types';
import { playLapSound } from '../utils/audio';

export const Stopwatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<LapRecord[]>([]);
  const [copied, setCopied] = useState(false);

  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastLapElapsedRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - elapsedTime;

      const update = () => {
        setElapsedTime(performance.now() - startTimeRef.current);
        animationFrameRef.current = requestAnimationFrame(update);
      };

      animationFrameRef.current = requestAnimationFrame(update);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsRunning(prev => !prev);
      } else if (e.code === 'KeyL' && isRunning) {
        handleLap();
      } else if (e.code === 'KeyR' && !isRunning) {
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, elapsedTime]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    lastLapElapsedRef.current = 0;
  };

  const handleLap = () => {
    if (!isRunning && elapsedTime === 0) return;
    playLapSound();

    const currentTotal = elapsedTime;
    const lapTime = currentTotal - lastLapElapsedRef.current;
    lastLapElapsedRef.current = currentTotal;

    const newLap: LapRecord = {
      lapNumber: laps.length + 1,
      lapTimeMs: lapTime,
      overallTimeMs: currentTotal
    };

    setLaps([newLap, ...laps]);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);

    const minStr = String(minutes).padStart(2, '0');
    const secStr = String(seconds).padStart(2, '0');
    const csStr = String(centiseconds).padStart(2, '0');

    return { minStr, secStr, csStr };
  };

  const { minStr, secStr, csStr } = formatTime(elapsedTime);

  // Identify fastest and slowest lap (if > 1 lap)
  let fastestLapNumber = -1;
  let slowestLapNumber = -1;
  if (laps.length > 1) {
    const sorted = [...laps].sort((a, b) => a.lapTimeMs - b.lapTimeMs);
    fastestLapNumber = sorted[0].lapNumber;
    slowestLapNumber = sorted[sorted.length - 1].lapNumber;
  }

  const handleExportCSV = () => {
    if (laps.length === 0) return;
    const rows = [
      ['Lap #', 'Lap Time', 'Overall Time'],
      ...laps.map(l => {
        const lapFmt = formatTime(l.lapTimeMs);
        const overFmt = formatTime(l.overallTimeMs);
        return [
          l.lapNumber,
          `${lapFmt.minStr}:${lapFmt.secStr}.${lapFmt.csStr}`,
          `${overFmt.minStr}:${overFmt.secStr}.${overFmt.csStr}`
        ];
      })
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `stopwatch_laps_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLaps = () => {
    if (laps.length === 0) return;
    const lines = laps.map(l => {
      const lapFmt = formatTime(l.lapTimeMs);
      const overFmt = formatTime(l.overallTimeMs);
      return `Lap ${l.lapNumber}: ${lapFmt.minStr}:${lapFmt.secStr}.${lapFmt.csStr} (Total: ${overFmt.minStr}:${overFmt.secStr}.${overFmt.csStr})`;
    }).join('\n');

    navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 md:p-10 shadow-sm transition-colors">
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Precision Stopwatch
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            1/100th second millisecond accuracy with lap split analysis
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400 hidden sm:block">
          Hotkeys: [Space] Start/Stop · [L] Lap · [R] Reset
        </div>
      </div>

      {/* Big Digits Display */}
      <div className="py-10 sm:py-16 text-center">
        <div className="inline-flex items-baseline justify-center font-mono font-bold tracking-tight text-slate-900 dark:text-white tabular-nums select-all">
          <span className="text-6xl sm:text-8xl md:text-9xl">
            {minStr}:{secStr}
          </span>
          <span className="text-3xl sm:text-5xl md:text-6xl text-sky-600 dark:text-sky-400 ml-2">
            .{csStr}
          </span>
        </div>
      </div>

      {/* Action Controls */}
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
          <span>{isRunning ? 'Pause' : elapsedTime > 0 ? 'Resume' : 'Start'}</span>
        </button>

        <button
          onClick={handleLap}
          disabled={!isRunning}
          className={`px-6 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 border transition-all ${
            isRunning
              ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer'
              : 'opacity-40 border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Flag className="w-4 h-4" />
          <span>Lap</span>
        </button>

        <button
          onClick={handleReset}
          disabled={elapsedTime === 0 && !isRunning}
          className={`px-6 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 border transition-all ${
            elapsedTime > 0
              ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer'
              : 'opacity-40 border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Recorded Laps Table */}
      {laps.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Recorded Laps ({laps.length})
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLaps}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800">
            {laps.map((lap) => {
              const lapFmt = formatTime(lap.lapTimeMs);
              const overFmt = formatTime(lap.overallTimeMs);
              const isFastest = lap.lapNumber === fastestLapNumber;
              const isSlowest = lap.lapNumber === slowestLapNumber;

              return (
                <div
                  key={lap.lapNumber}
                  className={`flex items-center justify-between px-4 py-2.5 text-xs font-mono tabular-nums ${
                    isFastest
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300'
                      : isSlowest
                      ? 'bg-amber-50/60 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                      Lap {String(lap.lapNumber).padStart(2, '0')}
                    </span>
                    {isFastest && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                        Fastest
                      </span>
                    )}
                    {isSlowest && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
                        Slowest
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[10px] text-slate-400 block sm:inline mr-1">Lap:</span>
                      <span className="font-semibold">
                        +{lapFmt.minStr}:{lapFmt.secStr}.{lapFmt.csStr}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block sm:inline mr-1">Total:</span>
                      <span>
                        {overFmt.minStr}:{overFmt.secStr}.{overFmt.csStr}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
