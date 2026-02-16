export default function Logo() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SalahxCal logo"
    >
      {/* Calendar body */}
      <rect x="6" y="10" width="40" height="36" rx="6" fill="url(#cal-bg)" />
      {/* Calendar top bar */}
      <rect x="6" y="10" width="40" height="12" rx="6" fill="url(#cal-header)" />
      <rect x="6" y="16" width="40" height="6" fill="url(#cal-header)" />
      {/* Calendar rings */}
      <rect x="16" y="6" width="3" height="10" rx="1.5" fill="#a7f3d0" />
      <rect x="33" y="6" width="3" height="10" rx="1.5" fill="#a7f3d0" />
      {/* Crescent moon - the Islamic symbol inside the calendar */}
      <circle cx="26" cy="34" r="10" fill="#d1fae5" fillOpacity="0.15" />
      <circle cx="26" cy="34" r="8" fill="#34d399" />
      <circle cx="29.5" cy="31" r="7" fill="url(#cal-bg)" />
      {/* Star next to crescent */}
      <path
        d="M21.5 29L22.2 30.8L24 31.1L22.75 32.3L23.1 34.2L21.5 33.3L19.9 34.2L20.25 32.3L19 31.1L20.8 30.8L21.5 29Z"
        fill="#34d399"
      />
      {/* Calendar grid dots */}
      <circle cx="14" cy="27" r="1.2" fill="#6ee7b7" opacity="0.3" />
      <circle cx="20" cy="27" r="1.2" fill="#6ee7b7" opacity="0.3" />
      <circle cx="32" cy="27" r="1.2" fill="#6ee7b7" opacity="0.3" />
      <circle cx="38" cy="27" r="1.2" fill="#6ee7b7" opacity="0.3" />

      <defs>
        <linearGradient id="cal-bg" x1="26" y1="10" x2="26" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e293b" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="cal-header" x1="26" y1="10" x2="26" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>
    </svg>
  );
}
