import React, { useState, useEffect } from 'react';
import { Search, Plus, Trash2, Sun, Moon, Globe, Check } from 'lucide-react';
import { ClockFormat } from '../types';
import {
  POPULAR_WORLD_CITIES,
  DEFAULT_PINNED_CITY_IDS,
  getTimeInTimezone,
  getTimeDifferenceDescription
} from '../utils/timeZones';

interface WorldClockProps {
  format: ClockFormat;
}

export const WorldClock: React.FC<WorldClockProps> = ({ format }) => {
  const [pinnedIds, setPinnedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chrono_pinned_cities');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_PINNED_CITY_IDS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [now, setNow] = useState<Date>(new Date());

  // Update world time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Save pinned cities to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chrono_pinned_cities', JSON.stringify(pinnedIds));
    } catch {}
  }, [pinnedIds]);

  const handleAddCity = (cityId: string) => {
    if (!pinnedIds.includes(cityId)) {
      setPinnedIds([...pinnedIds, cityId]);
    }
    setIsAddModalOpen(false);
  };

  const handleRemoveCity = (cityId: string) => {
    setPinnedIds(pinnedIds.filter(id => id !== cityId));
  };

  const pinnedCities = pinnedIds
    .map(id => POPULAR_WORLD_CITIES.find(c => c.id === id))
    .filter((c): c is typeof POPULAR_WORLD_CITIES[0] => Boolean(c));

  // Continents for filtering
  const continents = ['All', 'North America', 'Europe', 'Asia', 'Oceania', 'Africa', 'South America'];

  const filteredSearchCities = POPULAR_WORLD_CITIES.filter(city => {
    const matchesSearch =
      city.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent = selectedContinent === 'All' || city.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  // Financial markets status
  const marketSessions = [
    { name: 'London (LSE)', tz: 'Europe/London', openHour: 8, closeHour: 16.5 },
    { name: 'New York (NYSE)', tz: 'America/New_York', openHour: 9.5, closeHour: 16 },
    { name: 'Tokyo (TSE)', tz: 'Asia/Tokyo', openHour: 9, closeHour: 15 },
    { name: 'Hong Kong (HKEX)', tz: 'Asia/Hong_Kong', openHour: 9.5, closeHour: 16 }
  ];

  const getMarketStatus = (session: typeof marketSessions[0]) => {
    const t = getTimeInTimezone(now, session.tz, true);
    const hour = t.hourNum + (parseInt(t.minute, 10) / 60);
    const day = new Intl.DateTimeFormat('en-US', { timeZone: session.tz, weekday: 'short' }).format(now);
    const isWeekend = day === 'Sat' || day === 'Sun';

    if (isWeekend) return { status: 'Closed (Weekend)', isOpen: false };
    if (hour >= session.openHour && hour < session.closeHour) {
      return { status: 'Open Now', isOpen: true };
    }
    return { status: 'Closed', isOpen: false };
  };

  return (
    <div className="space-y-8">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-sky-500" />
            <span>World Time Zones</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track real-time hours across financial capitals and global destinations
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Add Global City</span>
        </button>
      </div>

      {/* Global Financial Markets strip */}
      <div className="bg-slate-100/70 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Major Financial Markets Status
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {marketSessions.map((session) => {
            const { status, isOpen } = getMarketStatus(session);
            const timeData = getTimeInTimezone(now, session.tz, format === '24h');
            return (
              <div
                key={session.name}
                className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 block truncate">
                    {session.name}
                  </span>
                  <span className="text-base font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    {timeData.hour}:{timeData.minute} {timeData.dayPeriod}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOpen ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      isOpen
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pinned Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pinnedCities.map((city) => {
          const is24h = format === '24h';
          const timeData = getTimeInTimezone(now, city.timezone, is24h);
          const diffStr = getTimeDifferenceDescription(now, city.timezone);

          return (
            <div
              key={city.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl" role="img" aria-label={city.country}>
                      {city.flag}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {city.city}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {city.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {timeData.isDaytime ? (
                      <span title="Daytime in this region">
                        <Sun className="w-4 h-4 text-amber-500" />
                      </span>
                    ) : (
                      <span title="Nighttime in this region">
                        <Moon className="w-4 h-4 text-indigo-400" />
                      </span>
                    )}
                    {pinnedCities.length > 1 && (
                      <button
                        onClick={() => handleRemoveCity(city.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors ml-1"
                        title="Remove city"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Digital Time readout */}
                <div className="mt-4">
                  <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
                    {timeData.hour}:{timeData.minute}
                    <span className="text-lg text-slate-400 dark:text-slate-500 ml-1">
                      :{timeData.second}
                    </span>
                    {!is24h && timeData.dayPeriod && (
                      <span className="text-sm font-semibold text-sky-600 dark:text-sky-400 ml-1.5">
                        {timeData.dayPeriod}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Metadata */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{timeData.formattedDate}</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {diffStr}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add City Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-lg w-full p-6 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Add World City Clock
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-semibold px-2 py-1"
              >
                Close
              </button>
            </div>

            {/* Search Input */}
            <div className="my-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by city or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Continent Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3">
              {continents.map((cont) => (
                <button
                  key={cont}
                  onClick={() => setSelectedContinent(cont)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    selectedContinent === cont
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cont}
                </button>
              ))}
            </div>

            {/* City List */}
            <div className="overflow-y-auto space-y-1.5 flex-1 pr-1">
              {filteredSearchCities.map((city) => {
                const isPinned = pinnedIds.includes(city.id);
                return (
                  <button
                    key={city.id}
                    onClick={() => !isPinned && handleAddCity(city.id)}
                    disabled={isPinned}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      isPinned
                        ? 'bg-slate-50 dark:bg-slate-800/50 opacity-60 cursor-not-allowed'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{city.flag}</span>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          {city.city}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {city.country} · {city.timezone}
                        </div>
                      </div>
                    </div>
                    {isPinned ? (
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Added
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                        + Add
                      </span>
                    )}
                  </button>
                );
              })}
              {filteredSearchCities.length === 0 && (
                <div className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">
                  No cities found matching &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
