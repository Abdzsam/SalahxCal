"use client";

import { useState } from "react";

export default function SubscriptionUrl({ url }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
      <p className="text-sm font-medium text-emerald-800 mb-2">
        Your Subscription URL
      </p>
      <div className="flex items-stretch gap-2">
        <input
          type="text"
          readOnly
          value={url}
          className="flex-1 px-3 py-2 bg-white border border-emerald-300 rounded-lg text-sm text-gray-700 font-mono truncate"
        />
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <p className="text-xs text-emerald-600 mt-2">
        Paste this URL into your calendar app to subscribe. Prayer times auto-update daily.
      </p>
    </div>
  );
}
