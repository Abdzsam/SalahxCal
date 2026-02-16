"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import ConfigForm from "@/components/ConfigForm";
import PrayerPreview from "@/components/PrayerPreview";
import SubscriptionUrl from "@/components/SubscriptionUrl";
import CalendarInstructions from "@/components/CalendarInstructions";
import { PRAYERS } from "@/lib/constants";

export default function Home() {
  const [subscriptionUrl, setSubscriptionUrl] = useState("");
  const [todayPrayers, setTodayPrayers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");

  async function handleGenerate({ address: addr, tz, method }) {
    setLoading(true);
    setError("");
    setTodayPrayers(null);
    setSubscriptionUrl("");

    try {
      const today = new Date();
      const dateStr = `${String(today.getDate()).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}`;
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByAddress/${dateStr}?address=${encodeURIComponent(addr)}&method=${method}`
      );

      if (!res.ok) {
        throw new Error("Could not find prayer times for this location. Please check the address.");
      }

      const json = await res.json();

      if (json.code !== 200 || !json.data) {
        throw new Error("Could not find prayer times for this location. Please check the address.");
      }

      const timings = json.data.timings;
      const preview = PRAYERS.map((name) => ({
        name,
        time: (timings[name] || "").replace(/\s*\(.*\)$/, ""),
      }));

      setTodayPrayers(preview);
      setAddress(addr);

      const params = new URLSearchParams({
        address: addr,
        method: String(method),
        tz,
      });
      setSubscriptionUrl(`${window.location.origin}/api/calendar.ics?${params.toString()}`);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0f1a]">
      {/* Subtle gradient glow */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <header className="max-w-2xl mx-auto px-4 pt-16 sm:pt-20 pb-4 text-center">
          <div className="flex justify-center mb-5">
            <Logo />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Salah<span className="text-emerald-400">x</span>Cal
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-300 max-w-md mx-auto leading-relaxed font-medium">
            Build your day around salah — not the other way around.
          </p>
          <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
            Subscribe once, updated forever.
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              No account needed
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Works with any calendar
            </span>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-lg mx-auto px-4 pt-8 pb-20 space-y-6">
          {/* Config Form Card */}
          <section className="bg-[#111827] rounded-2xl border border-white/[0.06] p-6 sm:p-8">
            <ConfigForm onGenerate={handleGenerate} loading={loading} />

            {error && (
              <div className="mt-4 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl animate-fade-in">
                <p className="text-sm text-red-400 flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  {error}
                </p>
              </div>
            )}
          </section>

          {/* Results */}
          {subscriptionUrl && (
            <div className="space-y-6 animate-fade-in-up">
              {todayPrayers && (
                <section className="bg-[#111827] rounded-2xl border border-white/[0.06] p-6 sm:p-8">
                  <PrayerPreview prayers={todayPrayers} address={address} />
                </section>
              )}

              <section className="bg-[#111827] rounded-2xl border border-white/[0.06] p-6 sm:p-8">
                <SubscriptionUrl url={subscriptionUrl} />
              </section>

            </div>
          )}

          {/* How it works */}
          {!subscriptionUrl && !loading && (
            <section className="text-center py-8 opacity-0 animate-fade-in stagger-2">
              <h2 className="text-sm font-semibold text-gray-300 mb-5">How it works</h2>
              <div className="flex items-start justify-center gap-6 sm:gap-10">
                {[
                  { step: "1", label: "Enter your location" },
                  { step: "2", label: "Copy the link" },
                  { step: "3", label: "Add to calendar" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 max-w-[100px]">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                      {item.step}
                    </div>
                    <span className="text-xs text-gray-500 leading-snug">{item.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-gray-600 max-w-sm mx-auto">
                Your calendar app automatically fetches updated prayer times.
                No resubscribing, no manual updates, no apps to install.
              </p>
            </section>
          )}

          {/* Calendar setup instructions — always visible */}
          <section className="bg-[#111827] rounded-2xl border border-white/[0.06] p-6 sm:p-8">
            <CalendarInstructions />
          </section>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-white/[0.04]">
          <p className="text-xs text-gray-600">
            Open source. Prayer times by{" "}
            <a
              href="https://aladhan.com"
              className="underline underline-offset-2 hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aladhan API
            </a>
            . Built for the Ummah.
          </p>
        </footer>
      </div>
    </main>
  );
}
