"use client";

const PRAYER_ICONS = {
  Fajr: "M12 3v1m0 16v1m-8.66-9H4.5m15 0h-.84M6.34 6.34l-.7-.7m12.02.7l.7-.7M6.34 17.66l-.7.7m12.02-.7l.7.7",
  Dhuhr: "M12 2v2m0 16v2M4 12H2m20 0h-2m-2.93-7.07l-1.41 1.41M7.76 16.24l-1.41 1.41m12.02 0l-1.41-1.41M7.76 7.76L6.34 6.34M12 8a4 4 0 100 8 4 4 0 000-8z",
  Asr: "M12 2v2m0 16v2M4 12H2m20 0h-2M12 8a4 4 0 100 8 4 4 0 000-8z",
  Maghrib: "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z",
  Isha: "M21.752 15.002A9.718 9.718 0 0118 15.75 9.75 9.75 0 018.25 6c0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25 9.75 9.75 0 0012.75 21a9.753 9.753 0 009.002-5.998z",
};

function formatTime12h(time24) {
  const [h, m] = time24.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour12}:${m} ${ampm}`;
}

export default function PrayerPreview({ prayers, address }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-200">
          Today&apos;s Prayer Times
        </h3>
        <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-1 rounded-full">
          {today}
        </span>
      </div>

      <div className="space-y-2">
        {prayers.map((prayer, i) => (
          <div
            key={prayer.name}
            className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300 opacity-0 animate-fade-in-up stagger-${i + 1} hover:bg-white/[0.03]`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={PRAYER_ICONS[prayer.name]} />
                </svg>
              </div>
              <span className="font-medium text-gray-200">{prayer.name}</span>
            </div>
            <span className="font-mono text-sm font-semibold text-emerald-400 tabular-nums">
              {formatTime12h(prayer.time)}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-400 text-center">
        Showing times for {address}
      </p>
    </div>
  );
}
