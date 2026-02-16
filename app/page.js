"use client";

import { useState } from "react";
import ConfigForm from "@/components/ConfigForm";
import SubscriptionUrl from "@/components/SubscriptionUrl";
import CalendarInstructions from "@/components/CalendarInstructions";

export default function Home() {
  const [subscriptionUrl, setSubscriptionUrl] = useState("");

  function handleGenerate({ address, tz, method }) {
    const params = new URLSearchParams({
      address,
      method: String(method),
      tz,
    });
    const url = `${window.location.origin}/api/calendar.ics?${params.toString()}`;
    setSubscriptionUrl(url);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <div className="max-w-2xl mx-auto px-4 pt-16 pb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Salah<span className="text-emerald-600">x</span>Cal
        </h1>
        <p className="text-lg text-gray-600">
          Prayer times in your calendar. Any app. Free forever.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 pb-16 space-y-8">
        {/* Config Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <ConfigForm onGenerate={handleGenerate} />
        </div>

        {/* Subscription URL */}
        {subscriptionUrl && <SubscriptionUrl url={subscriptionUrl} />}

        {/* Calendar Instructions */}
        {subscriptionUrl && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <CalendarInstructions />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-400">
        <p>
          Open source. Powered by{" "}
          <a
            href="https://aladhan.com"
            className="underline hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aladhan API
          </a>
          .
        </p>
      </footer>
    </main>
  );
}
