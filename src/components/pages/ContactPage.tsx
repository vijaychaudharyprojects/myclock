import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, CheckCircle2, Send, HelpCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Feedback & Suggestions');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant secure processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center sm:text-left">
        <span className="text-xs font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400 mb-2 block">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Contact Support & ChronoPrecision Team
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Have an inquiry, found a timezone discrepancy, or want to suggest an improvement? We respond to all correspondence promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact info column */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Direct Inquiries
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              General feedback & partnerships:
            </p>
            <a
              href="mailto:support@chronoprecision.org"
              className="text-xs font-mono font-medium text-sky-600 dark:text-sky-400 hover:underline"
            >
              support@chronoprecision.org
            </a>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Response Window
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Monday through Friday, 09:00 - 18:00 UTC. Inquiries typically receive a human reply within 24 business hours.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Common Questions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Check our FAQ on the home page for quick answers regarding device clock synchronization and NTP latency.
            </p>
          </div>
        </div>

        {/* Contact form column */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/80 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Message Received!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Thank you for contacting ChronoPrecision, <strong>{name}</strong>. A confirmation copy has been logged, and our team will review your message promptly.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-5 py-2 text-xs font-semibold text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Send Us a Note
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Topic / Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                >
                  <option>Feedback & Suggestions</option>
                  <option>Bug Report / Calibration Issue</option>
                  <option>New City / Timezone Request</option>
                  <option>Advertising & Partnership Inquiries</option>
                  <option>General Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with precision timekeeping?"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 resize-y"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  We respect your privacy. No marketing spam.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Submit Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
