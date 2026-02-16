"use client";

import { useState } from "react";

const INSTRUCTIONS = [
  {
    name: "Google Calendar",
    steps: [
      "Open Google Calendar on your computer (calendar.google.com)",
      'On the left sidebar, click the "+" next to "Other calendars"',
      'Select "From URL"',
      "Paste your subscription URL",
      'Click "Add calendar"',
      "Prayer times will appear within a few hours and auto-update daily",
    ],
  },
  {
    name: "Apple Calendar (Mac)",
    steps: [
      "Open the Calendar app",
      'Go to File → New Calendar Subscription',
      "Paste your subscription URL",
      'Set "Auto-refresh" to "Every day"',
      "Click Subscribe",
    ],
  },
  {
    name: "Apple Calendar (iPhone/iPad)",
    steps: [
      "Open Settings → Calendar → Accounts",
      "Tap Add Account → Other",
      "Tap Add Subscribed Calendar",
      "Paste your subscription URL",
      "Tap Next, then Save",
    ],
  },
  {
    name: "Microsoft Outlook",
    steps: [
      "Open Outlook (web or desktop)",
      'Click "Add calendar" in the sidebar',
      'Select "Subscribe from web"',
      "Paste your subscription URL",
      'Name it "Prayer Times" and click Import',
    ],
  },
  {
    name: "Notion",
    steps: [
      "Notion doesn't natively support calendar subscriptions",
      "First, add the subscription to Google Calendar (see above)",
      "In Notion, use the Google Calendar embed or a third-party integration",
      "Alternatively, use Notion's calendar database with a Zapier/Make automation",
    ],
  },
  {
    name: "Other Apps",
    steps: [
      'Most calendar apps support "Subscribe to calendar" or "Add by URL"',
      "Look for an option to add an internet/external calendar",
      "Paste your subscription URL",
      "The calendar app will periodically fetch updated prayer times",
    ],
  },
];

export default function CalendarInstructions() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        How to Subscribe
      </h3>
      {INSTRUCTIONS.map((item, i) => (
        <div key={item.name} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition"
          >
            <span className="font-medium text-gray-700">{item.name}</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4">
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                {item.steps.map((step, j) => (
                  <li key={j}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
