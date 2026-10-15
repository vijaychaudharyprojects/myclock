export type ActiveTab =
  | 'clock'
  | 'world'
  | 'stopwatch'
  | 'timer'
  | 'alarm'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';

export type ClockFormat = '12h' | '24h';
export type ClockFaceMode = 'both' | 'digital' | 'analog';

export interface WorldCity {
  id: string;
  city: string;
  country: string;
  timezone: string;
  flag: string;
  continent: string;
}

export interface LapRecord {
  lapNumber: number;
  lapTimeMs: number;
  overallTimeMs: number;
}

export interface AlarmItem {
  id: string;
  time: string; // "HH:MM" in 24h
  label: string;
  enabled: boolean;
  days: number[]; // 0 = Sun, 1 = Mon, ..., 6 = Sat (empty = once)
  sound: string;
}

export type ZenTheme = 'minimal' | 'cyber-amber' | 'emerald-oled' | 'swiss-classic';
