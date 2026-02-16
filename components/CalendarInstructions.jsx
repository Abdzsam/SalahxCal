"use client";

import { useState } from "react";

const CALENDARS = [
  {
    name: "Google Calendar",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 4V2m6 2V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="7" y="12" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="14" y="12" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="7" y="17" width="3" height="2" rx="0.5" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    steps: [
      'Open Google Calendar on desktop',
      'Click "+" next to "Other calendars" in the sidebar',
      'Select "From URL"',
      "Paste your subscription link and click Add calendar",
    ],
  },
  {
    name: "Apple Calendar",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 4V2m6 2V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="15.5" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    steps: [
      'Mac: File > New Calendar Subscription > paste link > set auto-refresh to "Every day"',
      "iPhone: Settings > Calendar > Accounts > Add Account > Other > Add Subscribed Calendar > paste link",
    ],
  },
  {
    name: "Outlook",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 4V2m6 2V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 14h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    steps: [
      'Click "Add calendar" > "Subscribe from web"',
      'Paste your link, name it "Prayer Times", and click Import',
    ],
  },
  {
    name: "Any Other App",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.102 1.101" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    steps: [
      'Look for "Subscribe to calendar", "Add by URL", or "Internet calendar"',
      "Paste your subscription link — it works with any app that supports ICS feeds",
    ],
  },
];

const FAQ = [
  {
    q: "Do I need to resubscribe every month?",
    a: "No. You subscribe once and it works forever. Your calendar app automatically re-fetches updated prayer times every day. The link always serves the next 30 days of accurate times.",
  },
  {
    q: "How accurate are the prayer times?",
    a: "Times are sourced from the Aladhan API, which uses established astronomical calculation methods used by Islamic organizations worldwide. Choose the method that matches your local mosque or organization.",
  },
  {
    q: "What if I move to a different city?",
    a: "Generate a new subscription link with your new address and add it to your calendar. You can remove the old subscription anytime.",
  },
  {
    q: "Why don't the events appear immediately?",
    a: "Google Calendar can take up to 12-24 hours to first fetch a subscribed calendar. Apple Calendar is usually faster. This is a limitation of how calendar apps poll for updates, not SalahxCal.",
  },
];

export default function CalendarInstructions() {
  const [openCalendar, setOpenCalendar] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="space-y-8">
      {/* Calendar Setup */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Add to Your Calendar
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CALENDARS.map((cal, i) => (
            <div key={cal.name} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenCalendar(openCalendar === i ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50/80 transition-colors"
              >
                <span className="text-emerald-600">{cal.icon}</span>
                <span className="text-sm font-medium text-gray-700 flex-1">{cal.name}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${openCalendar === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openCalendar === i && (
                <div className="px-4 pb-3 animate-fade-in">
                  <ol className="space-y-1.5 text-sm text-gray-600">
                    {cal.steps.map((step, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-emerald-500 font-semibold text-xs mt-0.5">{j + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Frequently Asked Questions
        </h3>
        <div className="space-y-2">
          {FAQ.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50/80 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700 pr-4">{item.q}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-4 pb-3 animate-fade-in">
                  <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
