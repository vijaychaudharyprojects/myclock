import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center sm:text-left">
        <span className="text-xs font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400 mb-2 block">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: October 14, 2026
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 shadow-sm prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-6">
        <p>
          Welcome to <strong>ChronoPrecision</strong>. By accessing or using our website, services, and online timekeeping tools (including our Digital Clock, World Clock, Stopwatch, Timer, and Alarm services), you agree to be bound by these Terms of Service.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          1. Use of Service
        </h2>
        <p>
          ChronoPrecision grants you a non-exclusive, non-transferable, revocable license to access and use our web-based timekeeping tools strictly for personal, educational, and general business productivity purposes in accordance with these terms.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          2. High-Risk Activities Disclaimer
        </h2>
        <p>
          The tools provided by ChronoPrecision are intended for standard everyday reference, study, cooking, fitness, and office time tracking. <strong>They are not certified for safety-critical, life-support, medical surgery, aerospace navigation, nuclear control, or high-frequency algorithmic financial execution.</strong> Web browser execution relies on host operating system scheduling, network connectivity, and hardware state; therefore, ChronoPrecision makes no warranties that timekeeping will be continuous, error-free, or fail-safe under all conditions.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          3. Accuracy and Time Synchronization
        </h2>
        <p>
          While ChronoPrecision employs high-resolution browser APIs and IANA international standards, local time accuracy depends on the synchronization of your client hardware clock with external time servers (NTP). We cannot guarantee absolute synchronization down to the picosecond for external systems.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          4. Intellectual Property
        </h2>
        <p>
          All trademarks, interface styling, code architectures, SVG designs, and educational content on ChronoPrecision are the property of ChronoPrecision or its licensors and are protected under international copyright and intellectual property legislation.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          5. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by applicable law, in no event shall ChronoPrecision or its contributors be liable for any indirect, incidental, consequential, special, or punitive damages arising from the use or inability to use the timekeeping utilities or missed alarms.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          6. Modifications
        </h2>
        <p>
          We reserve the right to modify or replace these terms at any time. Continued usage of the website following any revisions constitutes your acceptance of the new terms.
        </p>
      </div>
    </div>
  );
};
