import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, BookOpen, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How accurate is the ChronoPrecision online clock compared to atomic time?',
    answer:
      'ChronoPrecision utilizes your device’s internal high-resolution hardware clock, which is synchronized via the Network Time Protocol (NTP) to reference atomic clocks (such as NIST-F1 and NIST-F2 cesium fountains in the United States or the Paris Observatory in Europe). In modern operating systems and web browsers, this yields an accuracy generally within 10 to 50 milliseconds of true Coordinated Universal Time (UTC).'
  },
  {
    question: 'What is the exact difference between UTC and GMT?',
    answer:
      'Coordinated Universal Time (UTC) is an atomic time standard determined by combining signals from hundreds of highly accurate atomic clocks worldwide (International Atomic Time, TAI) with occasional leap seconds to account for the Earth’s rotational variations. Greenwich Mean Time (GMT), by contrast, is an astronomical time zone originally based on solar time at the Royal Observatory in Greenwich, London. While UTC and GMT share the exact same clock time (offset of 00:00), UTC is the scientific standard used in computing, aviation, and navigation.'
  },
  {
    question: 'Why do milliseconds sometimes appear to jump or skip on digital clocks?',
    answer:
      'Web browsers typically update their visual interface at 60 frames per second (approximately once every 16.6 milliseconds), or at the native refresh rate of your display (e.g., 120Hz or 144Hz). Because 100 centiseconds or 1,000 milliseconds elapse each second, a standard monitor will display a sampled subset of all possible millisecond numbers rather than every single sequential integer.'
  },
  {
    question: 'Can I keep ChronoPrecision open as a full-screen desk clock?',
    answer:
      'Yes! By clicking the "Zen Clock" button in the upper navigation bar, you can switch to a full-screen, distraction-free clock mode with multiple high-contrast themes including OLED Minimalist, Cyber Amber CRT, and Emerald Glow.'
  },
  {
    question: 'How does daylight saving time (DST) affect the world clock calculations?',
    answer:
      'Our world clock uses standard IANA Time Zone database identifiers (e.g., "America/New_York", "Europe/London"). The browser automatically applies daylight saving transitions according to the local legislative calendar of each respective jurisdiction without requiring manual user adjustments.'
  }
];

export const EducationalContent: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const timezoneMatrix = [
    { name: 'UTC / GMT', offset: 'UTC+0', region: 'Greenwich, UK / Universal', standard: 'Zero Meridian' },
    { name: 'EST / EDT', offset: 'UTC-5 / UTC-4', region: 'New York, Toronto, Miami', standard: 'Eastern Standard' },
    { name: 'CST / CDT', offset: 'UTC-6 / UTC-5', region: 'Chicago, Mexico City, Dallas', standard: 'Central Standard' },
    { name: 'PST / PDT', offset: 'UTC-8 / UTC-7', region: 'Los Angeles, San Francisco, Seattle', standard: 'Pacific Standard' },
    { name: 'CET / CEST', offset: 'UTC+1 / UTC+2', region: 'Berlin, Paris, Rome, Madrid', standard: 'Central European' },
    { name: 'IST', offset: 'UTC+5:30', region: 'New Delhi, Mumbai, Bengaluru', standard: 'India Standard Time' },
    { name: 'CST (China)', offset: 'UTC+8', region: 'Beijing, Shanghai, Hong Kong', standard: 'China Standard Time' },
    { name: 'JST / KST', offset: 'UTC+9', region: 'Tokyo, Seoul, Osaka', standard: 'Japan / Korea Time' },
    { name: 'AEST / AEDT', offset: 'UTC+10 / UTC+11', region: 'Sydney, Melbourne, Brisbane', standard: 'Australian Eastern' }
  ];

  return (
    <section className="mt-16 space-y-12">
      {/* Editorial Overview Section */}
      <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-colors">
        <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Horology & Chronometry</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          The Science of Modern Precision Timekeeping
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            For thousands of years, humanity measured time by observing celestial movements—the rotation of the Earth relative to the sun, the phases of the moon, and the progression of planetary bodies across the night sky. In the modern digital era, human coordination requires a precision far beyond astronomical observation alone.
          </p>
          <p>
            Today, worldwide civilization synchronizes around <strong>Coordinated Universal Time (UTC)</strong>, which is maintained by the International Bureau of Weights and Measures (BIPM) using an ensemble of over 400 atomic clocks distributed across more than 80 national metrology laboratories worldwide. These atomic clocks measure the natural resonance frequency of cesium-133 atoms, which oscillate at exactly <strong>9,192,631,770 cycles per second</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Atomic Clocks
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                Cesium fountain clocks lose or gain less than one second in over 100 million years, forming the ultimate baseline for global telecommunications and GPS positioning.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Network Time Protocol (NTP)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                Invented in 1985 by Dr. David L. Mills, NTP synchronizes computer systems across variable-latency packet-switched data networks to sub-millisecond precision.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Quartz Oscillation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                Personal computers, smartphones, and wristwatches utilize piezoelectric quartz crystals cut to vibrate at exactly 32,768 Hz when subjected to an electric current.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Timezone Comparison Reference Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Global Standard Time Zones Comparison Table
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          Quick reference offsets from the Prime Meridian (Greenwich, London) across primary economic corridors
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Timezone Code</th>
                <th className="py-3 px-4">UTC Offset</th>
                <th className="py-3 px-4">Key Metropolitan Centers</th>
                <th className="py-3 px-4">Full Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
              {timezoneMatrix.map((item) => (
                <tr key={item.name} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 font-mono tabular-nums text-sky-600 dark:text-sky-400">
                    {item.offset}
                  </td>
                  <td className="py-3 px-4">
                    {item.region}
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                    {item.standard}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors">
        <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Knowledge Base</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.question}
                className="border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-sky-500 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/40 dark:bg-slate-950/20">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
