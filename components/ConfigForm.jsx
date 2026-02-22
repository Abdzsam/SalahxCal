"use client";

import { useState, useEffect } from "react";
import LocationAutocomplete from "./LocationAutocomplete";
import { CALCULATION_METHODS } from "@/lib/constants";

export default function ConfigForm({ onGenerate, loading }) {
  const [address, setAddress] = useState("");
  const [tz, setTz] = useState("");
  const [method, setMethod] = useState(2);
  const [timezones, setTimezones] = useState([]);
  const [tzLoading, setTzLoading] = useState(false);

  useEffect(() => {
    const zones = Intl.supportedValuesOf("timeZone");
    setTimezones(zones);
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  async function autoDetectTimezone(lat, lng) {
    try {
      setTzLoading(true);
      // Free timezone API — no key needed
      const res = await fetch(
        `https://timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${lng}`
      );
      const data = await res.json();
      if (data.timeZone) {
        setTz(data.timeZone);
      }
    } catch {
      // Keep existing timezone on error
    } finally {
      setTzLoading(false);
    }
  }

  function handleLocationSelect({ address: addr, lat, lng }) {
    setAddress(addr);
    autoDetectTimezone(lat, lng);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!address.trim() || loading) return;
    onGenerate({ address: address.trim(), tz, method });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Your Location
        </label>
        <LocationAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleLocationSelect}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="timezone" className="block text-sm font-semibold text-gray-200 mb-2">
            Timezone
            {tzLoading && (
              <span className="ml-2 text-xs text-emerald-400 font-normal">detecting...</span>
            )}
          </label>
          <select
            id="timezone"
            value={tz}
            onChange={(e) => setTz(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.04] focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 outline-none transition-all duration-200 text-gray-100 appearance-none cursor-pointer"
          >
            {timezones.map((zone) => (
              <option key={zone} value={zone} className="bg-gray-900 text-gray-100">
                {zone.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="method" className="block text-sm font-semibold text-gray-200 mb-2">
            Calculation Method
          </label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(Number(e.target.value))}
            className="w-full px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.04] focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 outline-none transition-all duration-200 text-gray-100 appearance-none cursor-pointer"
          >
            {CALCULATION_METHODS.map((m) => (
              <option key={m.value} value={m.value} className="bg-gray-900 text-gray-100">
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={!address.trim() || loading}
        className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:bg-white/[0.04] disabled:text-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/40 disabled:shadow-none"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Verifying your location...
          </span>
        ) : (
          "Get My Prayer Times"
        )}
      </button>
    </form>
  );
}
