import { WorldCity } from '../types';

export const POPULAR_WORLD_CITIES: WorldCity[] = [
  { id: 'london', city: 'London', country: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧', continent: 'Europe' },
  { id: 'new_york', city: 'New York', country: 'United States', timezone: 'America/New_York', flag: '🇺🇸', continent: 'North America' },
  { id: 'tokyo', city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵', continent: 'Asia' },
  { id: 'paris', city: 'Paris', country: 'France', timezone: 'Europe/Paris', flag: '🇫🇷', continent: 'Europe' },
  { id: 'dubai', city: 'Dubai', country: 'United Arab Emirates', timezone: 'Asia/Dubai', flag: '🇦🇪', continent: 'Asia' },
  { id: 'singapore', city: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬', continent: 'Asia' },
  { id: 'sydney', city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺', continent: 'Oceania' },
  { id: 'los_angeles', city: 'Los Angeles', country: 'United States', timezone: 'America/Los_Angeles', flag: '🇺🇸', continent: 'North America' },
  { id: 'berlin', city: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', flag: '🇩🇪', continent: 'Europe' },
  { id: 'hong_kong', city: 'Hong Kong', country: 'China', timezone: 'Asia/Hong_Kong', flag: '🇭🇰', continent: 'Asia' },
  { id: 'toronto', city: 'Toronto', country: 'Canada', timezone: 'America/Toronto', flag: '🇨🇦', continent: 'North America' },
  { id: 'mumbai', city: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', flag: '🇮🇳', continent: 'Asia' },
  { id: 'sao_paulo', city: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', flag: '🇧🇷', continent: 'South America' },
  { id: 'cairo', city: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', flag: '🇪🇬', continent: 'Africa' },
  { id: 'seoul', city: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', flag: '🇰🇷', continent: 'Asia' },
  { id: 'amsterdam', city: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam', flag: '🇳🇱', continent: 'Europe' },
  { id: 'chicago', city: 'Chicago', country: 'United States', timezone: 'America/Chicago', flag: '🇺🇸', continent: 'North America' },
  { id: 'johannesburg', city: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg', flag: '🇿🇦', continent: 'Africa' },
  { id: 'bangkok', city: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok', flag: '🇹🇭', continent: 'Asia' },
  { id: 'auckland', city: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland', flag: '🇳🇿', continent: 'Oceania' },
  { id: 'zurich', city: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich', flag: '🇨🇭', continent: 'Europe' },
  { id: 'istanbul', city: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', flag: '🇹🇷', continent: 'Europe' },
  { id: 'buenos_aires', city: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷', continent: 'South America' },
  { id: 'shanghai', city: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai', flag: '🇨🇳', continent: 'Asia' }
];

export const DEFAULT_PINNED_CITY_IDS = ['london', 'new_york', 'tokyo', 'dubai', 'sydney', 'paris'];

/**
 * Get formatted time in target timezone
 */
export function getTimeInTimezone(date: Date, timezone: string, is24h: boolean = false) {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: !is24h
    });

    const parts = formatter.formatToParts(date);
    const hour = parts.find(p => p.type === 'hour')?.value || '00';
    const minute = parts.find(p => p.type === 'minute')?.value || '00';
    const second = parts.find(p => p.type === 'second')?.value || '00';
    const dayPeriod = parts.find(p => p.type === 'dayPeriod')?.value || '';

    // Date in target timezone
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    const formattedDate = dateFormatter.format(date);

    // Calculate approximate 24-hour hour for day/night determination
    const h24Formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      hour12: false
    });
    const hourNum = parseInt(h24Formatter.format(date), 10);
    const isDaytime = hourNum >= 6 && hourNum < 18;

    return {
      hour,
      minute,
      second,
      dayPeriod,
      formattedDate,
      isDaytime,
      hourNum
    };
  } catch {
    return {
      hour: '--',
      minute: '--',
      second: '--',
      dayPeriod: '',
      formattedDate: 'Unknown',
      isDaytime: true,
      hourNum: 12
    };
  }
}

/**
 * Calculates time difference relative to the user's current local timezone
 */
export function getTimeDifferenceDescription(date: Date, targetTimezone: string): string {
  try {
    // Current local offset
    const userOffset = -date.getTimezoneOffset(); // in minutes

    // Target timezone offset
    const targetFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: targetTimezone,
      timeZoneName: 'longOffset'
    });
    const parts = targetFormatter.formatToParts(date);
    const offsetPart = parts.find(p => p.type === 'timeZoneName')?.value; // e.g. "GMT+05:30" or "GMT-04:00"

    if (!offsetPart) return 'Same time';

    let targetOffsetMinutes = 0;
    const match = offsetPart.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);
    if (match) {
      const sign = match[1] === '+' ? 1 : -1;
      const hours = parseInt(match[2], 10);
      const mins = match[3] ? parseInt(match[3], 10) : 0;
      targetOffsetMinutes = sign * (hours * 60 + mins);
    }

    const diffMinutes = targetOffsetMinutes - userOffset;
    if (diffMinutes === 0) {
      return 'Same time';
    }

    const diffHours = diffMinutes / 60;
    const formattedHours = Number.isInteger(diffHours)
      ? Math.abs(diffHours).toString()
      : Math.abs(diffHours).toFixed(1);

    if (diffHours > 0) {
      return `+${formattedHours}h ahead`;
    } else {
      return `-${formattedHours}h behind`;
    }
  } catch {
    return '';
  }
}
