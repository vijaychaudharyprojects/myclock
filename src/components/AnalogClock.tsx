import React, { useState, useEffect } from 'react';

export const AnalogClock: React.FC = () => {
  const [smoothSweep, setSmoothSweep] = useState(true);
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    let animId: number;

    const tick = () => {
      setNow(new Date());
      if (smoothSweep) {
        animId = requestAnimationFrame(tick);
      }
    };

    if (smoothSweep) {
      animId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animId);
    } else {
      const interval = setInterval(tick, 200);
      return () => clearInterval(interval);
    }
  }, [smoothSweep]);

  const ms = now.getMilliseconds();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  // Hand angles
  const secondAngle = smoothSweep
    ? (seconds + ms / 1000) * 6
    : seconds * 6;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const hourAngle = (hours + minutes / 60 + seconds / 3600) * 30;

  const dayOfMonth = now.getDate();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 flex flex-col items-center justify-between shadow-sm transition-colors">
      <div className="w-full flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
        <span>Swiss Precision Dial</span>
        <button
          onClick={() => setSmoothSweep(!smoothSweep)}
          className="text-xs text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
        >
          {smoothSweep ? 'Mode: Smooth Sweep' : 'Mode: Quartz Tick'}
        </button>
      </div>

      {/* SVG Analog Watch Dial */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-2">
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full drop-shadow-md select-none"
        >
          {/* Dial Base */}
          <circle
            cx="120"
            cy="120"
            r="114"
            className="fill-slate-50 dark:fill-slate-950 stroke-slate-200 dark:stroke-slate-800"
            strokeWidth="3"
          />
          <circle
            cx="120"
            cy="120"
            r="108"
            className="fill-white dark:fill-slate-900 stroke-slate-100 dark:stroke-slate-800/60"
            strokeWidth="1"
          />

          {/* Minute Ticks */}
          {Array.from({ length: 60 }).map((_, i) => {
            const isHour = i % 5 === 0;
            const angle = (i * 6 * Math.PI) / 180;
            const rInner = isHour ? 92 : 98;
            const rOuter = 104;
            const x1 = 120 + rInner * Math.sin(angle);
            const y1 = 120 - rInner * Math.cos(angle);
            const x2 = 120 + rOuter * Math.sin(angle);
            const y2 = 120 - rOuter * Math.cos(angle);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHour ? 'currentColor' : 'currentColor'}
                className={
                  isHour
                    ? 'text-slate-800 dark:text-slate-200 stroke-[2.5]'
                    : 'text-slate-300 dark:text-slate-700 stroke-[1]'
                }
                strokeLinecap="round"
              />
            );
          })}

          {/* Major Hour Numerals (12, 3, 6, 9) */}
          <text
            x="120"
            y="42"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-bold text-sm fill-slate-800 dark:fill-slate-100 font-sans tracking-tight"
          >
            12
          </text>
          <text
            x="200"
            y="120"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-bold text-sm fill-slate-800 dark:fill-slate-100 font-sans tracking-tight"
          >
            3
          </text>
          <text
            x="120"
            y="198"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-bold text-sm fill-slate-800 dark:fill-slate-100 font-sans tracking-tight"
          >
            6
          </text>
          <text
            x="40"
            y="120"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-bold text-sm fill-slate-800 dark:fill-slate-100 font-sans tracking-tight"
          >
            9
          </text>

          {/* Date Complication Window at 3 o'clock (x=160, y=120) */}
          <rect
            x="150"
            y="111"
            width="22"
            height="18"
            rx="3"
            className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-700"
            strokeWidth="0.8"
          />
          <text
            x="161"
            y="120"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-mono text-xs font-bold fill-slate-800 dark:fill-slate-200"
          >
            {dayOfMonth}
          </text>

          {/* Brand mark text on dial */}
          <text
            x="120"
            y="76"
            textAnchor="middle"
            className="text-[9px] font-semibold tracking-widest uppercase fill-slate-400 dark:fill-slate-500"
          >
            CHRONO
          </text>
          <text
            x="120"
            y="160"
            textAnchor="middle"
            className="text-[7.5px] font-medium tracking-wider fill-slate-400 dark:fill-slate-500"
          >
            AUTOMATIC
          </text>

          {/* Hour Hand */}
          <g transform={`rotate(${hourAngle} 120 120)`}>
            <line
              x1="120"
              y1="120"
              x2="120"
              y2="62"
              className="stroke-slate-800 dark:stroke-slate-100"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Lume strip */}
            <line
              x1="120"
              y1="108"
              x2="120"
              y2="68"
              className="stroke-sky-400"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Minute Hand */}
          <g transform={`rotate(${minuteAngle} 120 120)`}>
            <line
              x1="120"
              y1="120"
              x2="120"
              y2="38"
              className="stroke-slate-700 dark:stroke-slate-200"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Lume strip */}
            <line
              x1="120"
              y1="105"
              x2="120"
              y2="45"
              className="stroke-sky-400"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Second Hand */}
          <g transform={`rotate(${secondAngle} 120 120)`}>
            {/* Counterbalance tail */}
            <line
              x1="120"
              y1="142"
              x2="120"
              y2="120"
              className="stroke-rose-500"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="120" cy="132" r="3" className="fill-rose-500" />
            {/* Main second pointer */}
            <line
              x1="120"
              y1="120"
              x2="120"
              y2="28"
              className="stroke-rose-500"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Center Cap / Jewel */}
          <circle cx="120" cy="120" r="5" className="fill-slate-900 dark:fill-white" />
          <circle cx="120" cy="120" r="2.5" className="fill-rose-500" />
        </svg>
      </div>

      <div className="text-center mt-2">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Analog Dial Display
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Synchronized to local system quartz crystal
        </p>
      </div>
    </div>
  );
};
