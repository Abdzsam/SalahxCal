"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function LocationAutocomplete({ value, onChange, onSelect }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const search = useCallback(async (q) => {
    if (!q || q.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=6&addressdetails=1&featuretype=city`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      // Filter to meaningful place types and deduplicate by display_name
      const seen = new Set();
      const filtered = data.filter((r) => {
        const key = r.display_name;
        if (seen.has(key)) return false;
        seen.add(key);
        return ["city", "town", "village", "municipality", "administrative"].includes(r.type) || r.class === "place" || r.class === "boundary";
      });
      setSuggestions(filtered);
      setOpen(filtered.length > 0);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleChange(e) {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    setActiveIndex(-1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 350);
  }

  function handleSelect(place) {
    const label = formatLabel(place);
    setQuery(label);
    onChange(label);
    setSuggestions([]);
    setOpen(false);
    setActiveIndex(-1);
    onSelect({
      address: label,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
    });
  }

  function handleKeyDown(e) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>

      {loading && (
        <svg
          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}

      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder="Search for your city..."
        autoComplete="off"
        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.04] focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 outline-none transition-all duration-200 text-gray-100 placeholder-gray-500"
        required
      />

      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1.5 bg-[#1a2235] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden">
          {suggestions.map((place, i) => {
            const { primary, secondary } = splitLabel(place);
            return (
              <li
                key={place.place_id}
                onMouseDown={() => handleSelect(place)}
                className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  i === activeIndex
                    ? "bg-emerald-500/10"
                    : "hover:bg-white/[0.04]"
                } ${i > 0 ? "border-t border-white/[0.04]" : ""}`}
              >
                <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="min-w-0">
                  <span className="block text-sm text-gray-100 truncate">{primary}</span>
                  {secondary && (
                    <span className="block text-xs text-gray-500 truncate mt-0.5">{secondary}</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function formatLabel(place) {
  const a = place.address || {};
  const parts = [
    a.city || a.town || a.village || a.municipality || a.county,
    a.state,
    a.country,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : place.display_name.split(",").slice(0, 2).join(",").trim();
}

function splitLabel(place) {
  const a = place.address || {};
  const city = a.city || a.town || a.village || a.municipality || a.county || "";
  const rest = [a.state, a.country].filter(Boolean).join(", ");
  if (city) return { primary: city, secondary: rest };
  // fallback
  const parts = place.display_name.split(",");
  return { primary: parts[0].trim(), secondary: parts.slice(1, 3).join(",").trim() };
}
