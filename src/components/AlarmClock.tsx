import React, { useState, useEffect, useRef } from 'react';
import { Bell, BellOff, Plus, Trash2, Volume2, X, AlertTriangle } from 'lucide-react';
import { AlarmItem } from '../types';
import { playAlarmSound } from '../utils/audio';

const DEFAULT_ALARMS: AlarmItem[] = [
  { id: '1', time: '07:00', label: 'Morning Wakeup', enabled: true, days: [1, 2, 3, 4, 5], sound: 'Default Bell' },
  { id: '2', time: '13:00', label: 'Lunch & Standup', enabled: false, days: [1, 2, 3, 4, 5], sound: 'Default Bell' }
];

const DAYS_OF_WEEK = [
  { day: 0, label: 'S', name: 'Sun' },
  { day: 1, label: 'M', name: 'Mon' },
  { day: 2, label: 'T', name: 'Tue' },
  { day: 3, label: 'W', name: 'Wed' },
  { day: 4, label: 'T', name: 'Thu' },
  { day: 5, label: 'F', name: 'Fri' },
  { day: 6, label: 'S', name: 'Sat' }
];

export const AlarmClock: React.FC = () => {
  const [alarms, setAlarms] = useState<AlarmItem[]>(() => {
    try {
      const saved = localStorage.getItem('chrono_alarms');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_ALARMS;
  });

  const [activeRingingAlarm, setActiveRingingAlarm] = useState<AlarmItem | null>(null);
  const [isNewAlarmModalOpen, setIsNewAlarmModalOpen] = useState(false);

  // New Alarm form state
  const [newTime, setNewTime] = useState('08:00');
  const [newLabel, setNewLabel] = useState('New Alarm');
  const [newDays, setNewDays] = useState<number[]>([1, 2, 3, 4, 5]);

  const alarmAudioIntervalRef = useRef<number | null>(null);
  const triggeredTimesRef = useRef<Set<string>>(new Set());

  // Save alarms
  useEffect(() => {
    try {
      localStorage.setItem('chrono_alarms', JSON.stringify(alarms));
    } catch {}
  }, [alarms]);

  // Alarm ringing checker loop
  useEffect(() => {
    const checkInterval = setInterval(() => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      const currentDay = now.getDay();
      const currentSeconds = now.getSeconds();

      // Reset triggered alarms on minute change
      if (currentSeconds === 0) {
        triggeredTimesRef.current.clear();
      }

      alarms.forEach((alarm) => {
        if (!alarm.enabled) return;
        const matchesTime = alarm.time === currentTimeStr;
        const matchesDay = alarm.days.length === 0 || alarm.days.includes(currentDay);

        const key = `${alarm.id}_${currentTimeStr}`;
        if (matchesTime && matchesDay && !triggeredTimesRef.current.has(key) && !activeRingingAlarm) {
          triggeredTimesRef.current.add(key);
          triggerAlarm(alarm);
        }
      });
    }, 1000);

    return () => clearInterval(checkInterval);
  }, [alarms, activeRingingAlarm]);

  const triggerAlarm = (alarm: AlarmItem) => {
    setActiveRingingAlarm(alarm);
    playAlarmSound();

    if (alarmAudioIntervalRef.current) clearInterval(alarmAudioIntervalRef.current);
    alarmAudioIntervalRef.current = window.setInterval(() => {
      playAlarmSound();
    }, 1200);
  };

  const handleDismissAlarm = () => {
    if (alarmAudioIntervalRef.current) {
      clearInterval(alarmAudioIntervalRef.current);
      alarmAudioIntervalRef.current = null;
    }
    setActiveRingingAlarm(null);
  };

  const handleSnooze = () => {
    handleDismissAlarm();
    // Add snooze alarm 5 minutes from now
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    const snoozeTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const snoozeAlarm: AlarmItem = {
      id: `snooze_${Date.now()}`,
      time: snoozeTime,
      label: `Snooze: ${activeRingingAlarm?.label || 'Alarm'}`,
      enabled: true,
      days: [],
      sound: 'Default Bell'
    };
    setAlarms((prev) => [...prev, snoozeAlarm]);
  };

  const handleToggleAlarm = (id: string) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const handleDeleteAlarm = (id: string) => {
    setAlarms((prev) => prev.filter((a) => a.id !== id));
  };

  const handleCreateAlarm = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlarm: AlarmItem = {
      id: String(Date.now()),
      time: newTime,
      label: newLabel.trim() || 'Alarm',
      enabled: true,
      days: newDays,
      sound: 'Default Bell'
    };
    setAlarms([...alarms, newAlarm]);
    setIsNewAlarmModalOpen(false);
  };

  const toggleDaySelection = (dayNum: number) => {
    if (newDays.includes(dayNum)) {
      setNewDays(newDays.filter((d) => d !== dayNum));
    } else {
      setNewDays([...newDays, dayNum].sort());
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-sky-500" />
            <span>Online Desktop Alarm</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Reliable acoustic alerts with snooze and day repeats
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => playAlarmSound()}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            title="Preview alarm sound tone"
          >
            <Volume2 className="w-3.5 h-3.5 text-sky-500" />
            <span>Test Sound</span>
          </button>

          <button
            onClick={() => setIsNewAlarmModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Alarm</span>
          </button>
        </div>
      </div>

      {/* Alarms list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alarms.map((alarm) => {
          // Format 12-hour display with AM/PM
          const [hStr, mStr] = alarm.time.split(':');
          const hNum = parseInt(hStr, 10);
          const ampm = hNum >= 12 ? 'PM' : 'AM';
          const h12 = hNum % 12 === 0 ? 12 : hNum % 12;

          return (
            <div
              key={alarm.id}
              className={`rounded-xl border p-5 transition-all flex items-center justify-between ${
                alarm.enabled
                  ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-sm'
                  : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                    {String(h12).padStart(2, '0')}:{mStr}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {ampm} ({alarm.time})
                  </span>
                </div>

                <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">
                  {alarm.label}
                </div>

                <div className="flex items-center gap-1 mt-2">
                  {DAYS_OF_WEEK.map((d) => {
                    const isSet = alarm.days.includes(d.day);
                    return (
                      <span
                        key={d.day}
                        className={`text-[10px] w-5 h-5 flex items-center justify-center rounded font-semibold ${
                          isSet
                            ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      >
                        {d.label}
                      </span>
                    );
                  })}
                  {alarm.days.length === 0 && (
                    <span className="text-xs text-slate-400">Once</span>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {/* On / Off switch */}
                <button
                  onClick={() => handleToggleAlarm(alarm.id)}
                  aria-label={alarm.enabled ? 'Disable alarm' : 'Enable alarm'}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    alarm.enabled ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      alarm.enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>

                <button
                  onClick={() => handleDeleteAlarm(alarm.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Delete alarm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {alarms.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <BellOff className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No alarms set
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Click &quot;Add Alarm&quot; to configure your first wake-up or reminder alert
            </p>
          </div>
        )}
      </div>

      {/* Ringing Alarm Modal */}
      {activeRingingAlarm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-rose-500 p-8 max-w-md w-full shadow-2xl text-center animate-pulse">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/60 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-600">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {activeRingingAlarm.label}
            </h3>
            <p className="text-4xl font-mono font-extrabold text-rose-600 dark:text-rose-400 my-4 tabular-nums">
              {activeRingingAlarm.time}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Your scheduled alarm is ringing right now!
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleSnooze}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-colors"
              >
                Snooze (+5m)
              </button>
              <button
                onClick={handleDismissAlarm}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md transition-colors"
              >
                Dismiss Alarm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Alarm Modal */}
      {isNewAlarmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Set New Alarm
              </h3>
              <button
                onClick={() => setIsNewAlarmModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAlarm} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Alarm Time (24-Hour)
                </label>
                <input
                  type="time"
                  required
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-4 py-2.5 text-lg font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Alarm Label
                </label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g. Morning Standup, Flight Alert..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Repeat Days
                </label>
                <div className="flex items-center justify-between gap-1">
                  {DAYS_OF_WEEK.map((d) => {
                    const isSelected = newDays.includes(d.day);
                    return (
                      <button
                        type="button"
                        key={d.day}
                        onClick={() => toggleDaySelection(d.day)}
                        className={`w-9 h-9 rounded-lg text-xs font-semibold transition-colors ${
                          isSelected
                            ? 'bg-sky-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {d.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewAlarmModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm"
                >
                  Save Alarm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
