"use client";

import { useState, useEffect } from "react";
import { CALCULATION_METHODS } from "@/lib/constants";

export default function ConfigForm({ onGenerate }) {
  const [address, setAddress] = useState("");
  const [tz, setTz] = useState("");
  const [method, setMethod] = useState(2);
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    const zones = Intl.supportedValuesOf("timeZone");
    setTimezones(zones);
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!address.trim()) return;
    onGenerate({ address: address.trim(), tz, method });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Your Location
        </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='e.g. "New York, NY" or "London, UK"'
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-gray-900 placeholder-gray-400"
          required
        />
      </div>

      <div>
        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
          Timezone
        </label>
        <select
          id="timezone"
          value={tz}
          onChange={(e) => setTz(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-gray-900 bg-white"
        >
          {timezones.map((zone) => (
            <option key={zone} value={zone}>
              {zone.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
          Calculation Method
        </label>
        <select
          id="method"
          value={method}
          onChange={(e) => setMethod(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-gray-900 bg-white"
        >
          {CALCULATION_METHODS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={!address.trim()}
        className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
      >
        Generate Subscription Link
      </button>
    </form>
  );
}
