import React from 'react';

interface AdSenseBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle';
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slotId = '1234567890',
  format = 'horizontal',
  className = ''
}) => {
  return (
    <aside
      aria-label="Advertisement"
      className={`my-8 flex flex-col items-center justify-center ${className}`}
    >
      <span className="text-[10px] tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-1.5 select-none">
        Advertisement
      </span>

      <div
        className={`w-full bg-slate-100/80 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col items-center justify-center text-center p-4 transition-colors ${
          format === 'horizontal'
            ? 'min-h-[100px] max-w-4xl'
            : 'min-h-[250px] max-w-sm'
        }`}
        data-ad-slot={slotId}
      >
        {/*
          To connect live Google AdSense:
          1. Replace ca-pub-XXXXXXXXXXXXXXXX with your actual Google AdSense Publisher ID.
          2. Replace slotId with your Ad Unit ID.
          3. Uncomment the <ins> tag below and ensure the AdSense script is in index.html.
        */}
        {/*
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        */}
        <div className="text-xs text-slate-400 dark:text-slate-500">
          <p className="font-medium text-slate-500 dark:text-slate-400">
            AdSense Responsive Placement Slot
          </p>
          <p className="text-[11px] mt-0.5 opacity-80">
            Compliant 728x90 / responsive container · zero layout shift (CLS 0)
          </p>
        </div>
      </div>
    </aside>
  );
};
