import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DigitalClock } from './components/DigitalClock';
import { AnalogClock } from './components/AnalogClock';
import { WorldClock } from './components/WorldClock';
import { Stopwatch } from './components/Stopwatch';
import { Timer } from './components/Timer';
import { AlarmClock } from './components/AlarmClock';
import { ZenFullscreen } from './components/ZenFullscreen';
import { AdSenseBanner } from './components/AdSenseBanner';
import { EducationalContent } from './components/EducationalContent';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsPage } from './components/pages/TermsPage';
import { ActiveTab, ClockFormat, ClockFaceMode } from './types';
import { Globe, Timer as TimerIcon, Play, Bell, Maximize2 } from 'lucide-react';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('chrono_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Tab & routing state
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    try {
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      const validTabs: ActiveTab[] = ['clock', 'world', 'stopwatch', 'timer', 'alarm', 'about', 'contact', 'privacy', 'terms'];
      if (validTabs.includes(hash)) return hash;
    } catch {}
    return 'clock';
  });

  // Clock preferences
  const [format, setFormat] = useState<ClockFormat>(() => {
    try {
      return (localStorage.getItem('chrono_format') as ClockFormat) || '12h';
    } catch {
      return '12h';
    }
  });

  const [showMilliseconds, setShowMilliseconds] = useState<boolean>(() => {
    try {
      return localStorage.getItem('chrono_ms') === 'true';
    } catch {
      return false;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('chrono_sound') === 'true';
    } catch {
      return false;
    }
  });

  const [clockFaceMode, setClockFaceMode] = useState<ClockFaceMode>('both');
  const [isZenMode, setIsZenMode] = useState<boolean>(false);

  // Sync theme with HTML document class
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('chrono_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('chrono_theme', 'light');
      }
    } catch {}
  }, [isDarkMode]);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      const validTabs: ActiveTab[] = ['clock', 'world', 'stopwatch', 'timer', 'alarm', 'about', 'contact', 'privacy', 'terms'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleToggleFormat = () => {
    setFormat((prev) => {
      const next = prev === '12h' ? '24h' : '12h';
      try {
        localStorage.setItem('chrono_format', next);
      } catch {}
      return next;
    });
  };

  const handleToggleMilliseconds = () => {
    setShowMilliseconds((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('chrono_ms', String(next));
      } catch {}
      return next;
    });
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('chrono_sound', String(next));
      } catch {}
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Zen Fullscreen Overlay */}
      {isZenMode && (
        <ZenFullscreen
          onExit={() => setIsZenMode(false)}
          format={format}
          onToggleFormat={handleToggleFormat}
        />
      )}

      {/* Primary Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onEnterZenMode={() => setIsZenMode(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Top Responsive Ad Placement */}
        <AdSenseBanner slotId="top-leaderboard-01" format="horizontal" />

        {/* Tab 1: Primary Clock Experience */}
        {activeTab === 'clock' && (
          <div className="space-y-8">
            {/* View Switcher for Clock (Digital / Analog / Both) */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Clock Display Modes
              </div>

              {/* Segmented control buttons */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  onClick={() => setClockFaceMode('both')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    clockFaceMode === 'both'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Side by Side
                </button>
                <button
                  onClick={() => setClockFaceMode('digital')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    clockFaceMode === 'digital'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Digital Only
                </button>
                <button
                  onClick={() => setClockFaceMode('analog')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    clockFaceMode === 'analog'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Analog Only
                </button>
              </div>
            </div>

            {/* Clock Components Layout */}
            {clockFaceMode === 'both' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <DigitalClock
                    format={format}
                    onToggleFormat={handleToggleFormat}
                    showMilliseconds={showMilliseconds}
                    onToggleMilliseconds={handleToggleMilliseconds}
                    soundEnabled={soundEnabled}
                    onToggleSound={handleToggleSound}
                  />
                </div>
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <AnalogClock />
                </div>
              </div>
            )}

            {clockFaceMode === 'digital' && (
              <DigitalClock
                format={format}
                onToggleFormat={handleToggleFormat}
                showMilliseconds={showMilliseconds}
                onToggleMilliseconds={handleToggleMilliseconds}
                soundEnabled={soundEnabled}
                onToggleSound={handleToggleSound}
              />
            )}

            {clockFaceMode === 'analog' && (
              <div className="max-w-xl mx-auto">
                <AnalogClock />
              </div>
            )}

            {/* Quick Utility Feature Shortcuts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <button
                onClick={() => handleTabChange('world')}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 text-left hover:border-sky-500/50 transition-all cursor-pointer group"
              >
                <Globe className="w-5 h-5 text-sky-500 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  World Clock
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  24+ international cities
                </p>
              </button>

              <button
                onClick={() => handleTabChange('stopwatch')}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 text-left hover:border-sky-500/50 transition-all cursor-pointer group"
              >
                <Play className="w-5 h-5 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Stopwatch
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Lap split analysis & CSV
                </p>
              </button>

              <button
                onClick={() => handleTabChange('timer')}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 text-left hover:border-sky-500/50 transition-all cursor-pointer group"
              >
                <TimerIcon className="w-5 h-5 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Countdown Timer
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Pomodoro & audio chime
                </p>
              </button>

              <button
                onClick={() => handleTabChange('alarm')}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 text-left hover:border-sky-500/50 transition-all cursor-pointer group"
              >
                <Bell className="w-5 h-5 text-rose-500 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Desktop Alarm
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Custom recurring alerts
                </p>
              </button>
            </div>

            {/* Mid-content In-Article Ad Placement */}
            <AdSenseBanner slotId="mid-article-02" format="horizontal" />

            {/* Educational & SEO Content Section */}
            <EducationalContent />
          </div>
        )}

        {/* Tab 2: World Time Zones */}
        {activeTab === 'world' && (
          <div className="space-y-8">
            <WorldClock format={format} />
            <AdSenseBanner slotId="world-clock-bottom-01" format="horizontal" />
          </div>
        )}

        {/* Tab 3: Precision Stopwatch */}
        {activeTab === 'stopwatch' && (
          <div className="space-y-8">
            <Stopwatch />
            <AdSenseBanner slotId="stopwatch-bottom-01" format="horizontal" />
          </div>
        )}

        {/* Tab 4: Countdown Timer */}
        {activeTab === 'timer' && (
          <div className="space-y-8">
            <Timer />
            <AdSenseBanner slotId="timer-bottom-01" format="horizontal" />
          </div>
        )}

        {/* Tab 5: Online Desktop Alarm */}
        {activeTab === 'alarm' && (
          <div className="space-y-8">
            <AlarmClock />
            <AdSenseBanner slotId="alarm-bottom-01" format="horizontal" />
          </div>
        )}

        {/* Tab 6: About Us */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            <AboutPage />
            <AdSenseBanner slotId="about-page-01" format="horizontal" />
          </div>
        )}

        {/* Tab 7: Contact Us */}
        {activeTab === 'contact' && (
          <div className="space-y-8">
            <ContactPage />
            <AdSenseBanner slotId="contact-page-01" format="horizontal" />
          </div>
        )}

        {/* Tab 8: Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="space-y-8">
            <PrivacyPolicyPage />
          </div>
        )}

        {/* Tab 9: Terms of Service */}
        {activeTab === 'terms' && (
          <div className="space-y-8">
            <TermsPage />
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onTabChange={handleTabChange}
        onEnterZenMode={() => setIsZenMode(true)}
      />
    </div>
  );
}
