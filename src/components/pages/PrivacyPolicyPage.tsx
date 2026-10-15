import React from 'react';
import { Shield, Lock, FileText, Eye } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center sm:text-left">
        <span className="text-xs font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400 mb-2 block">
          Legal & Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: October 14, 2026 · Compliant with GDPR, CCPA, and Google AdSense Publisher Policies
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 shadow-sm prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-6">
        <p>
          At <strong>ChronoPrecision</strong> (accessible from https://chronoprecision.pages.dev/), the privacy of our visitors is one of our primary priorities. This Privacy Policy document outlines the types of information collected and recorded by ChronoPrecision and how we use it.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          1. Local Client-Side Operation
        </h2>
        <p>
          ChronoPrecision is engineered primarily as a client-side utility. Your customized settings—such as preferred clock format (12-hour vs 24-hour), enabled sound alerts, pinned world timezone cards, saved stopwatch laps, and alarms—are stored directly within your web browser’s local storage (<code>localStorage</code>). We do not transmit or store your personal alarms or timers on our backend servers.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          2. Log Files & Standard Web Metrics
        </h2>
        <p>
          Like almost all websites hosted on edge delivery networks (such as Cloudflare Pages), ChronoPrecision follows standard procedures using log files. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information. The sole purpose is for analyzing technical operational trends, administering the site, tracking movements around the site, and maintaining DDoS and uptime protection.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          3. Google AdSense & Cookies Policy
        </h2>
        <p>
          We may partner with third-party advertising vendors, including Google AdSense, to serve advertisements when you visit our website.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Google&apos;s use of advertising cookies:</strong> Google uses cookies to serve ads on our site based on a user’s prior visits to our website or other websites on the internet.
          </li>
          <li>
            <strong>DoubleClick DART Cookie:</strong> Google’s use of the DART cookie enables it and its partners to serve ads to users based on their visit to ChronoPrecision and other sites across the World Wide Web.
          </li>
          <li>
            <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline">Google Ads Settings</a> or through the Network Advertising Initiative opt-out page at <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline">aboutads.info</a>.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          4. General Data Protection Regulation (GDPR) Data Protection Rights
        </h2>
        <p>
          Under European data protection laws, every user is entitled to the following rights:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
          <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
          <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
          <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          5. California Consumer Privacy Act (CCPA) Privacy Rights
        </h2>
        <p>
          Under the CCPA and CPRA, California consumers have the right to request that a business disclose the categories and specific pieces of personal data collected, request deletion of collected personal data, and request that a business not sell their personal data. ChronoPrecision does not sell personal information.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          6. Children&apos;s Online Privacy Protection Act (COPPA)
        </h2>
        <p>
          Protecting the safety of children online is especially important to us. ChronoPrecision does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          7. Contact Information
        </h2>
        <p>
          If you have questions regarding this Privacy Policy or require further clarification on our data handling practices, please contact us at: <a href="mailto:privacy@chronoprecision.org" className="text-sky-600 dark:text-sky-400 hover:underline">privacy@chronoprecision.org</a>.
        </p>
      </div>
    </div>
  );
};
