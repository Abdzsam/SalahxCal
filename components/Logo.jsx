export default function Logo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SalahxCal logo"
    >
      {/* Mosque dome */}
      <path
        d="M24 4C24 4 14 14 14 22H34C34 14 24 4 24 4Z"
        fill="url(#dome-gradient)"
      />
      {/* Crescent cutout on dome */}
      <circle cx="26" cy="13" r="4" fill="#059669" fillOpacity="0.3" />
      <circle cx="27.5" cy="12.5" r="3.5" fill="url(#dome-gradient)" />
      {/* Main building body */}
      <rect x="12" y="22" width="24" height="16" rx="1" fill="url(#body-gradient)" />
      {/* Door arch */}
      <path
        d="M20 38V30C20 27.79 21.79 26 24 26C26.21 26 28 27.79 28 30V38"
        fill="#065F46"
      />
      {/* Windows */}
      <rect x="15" y="25" width="3" height="4" rx="1.5" fill="#065F46" opacity="0.6" />
      <rect x="30" y="25" width="3" height="4" rx="1.5" fill="#065F46" opacity="0.6" />
      {/* Left minaret */}
      <rect x="6" y="16" width="4" height="22" rx="1" fill="url(#body-gradient)" />
      <circle cx="8" cy="14" r="3" fill="url(#dome-gradient)" />
      {/* Right minaret */}
      <rect x="38" y="16" width="4" height="22" rx="1" fill="url(#body-gradient)" />
      <circle cx="40" cy="14" r="3" fill="url(#dome-gradient)" />
      {/* Star on top */}
      <path
        d="M24 2L24.7 3.4L26.2 3.6L25.1 4.7L25.4 6.2L24 5.5L22.6 6.2L22.9 4.7L21.8 3.6L23.3 3.4L24 2Z"
        fill="#FCD34D"
      />
      {/* Base line */}
      <rect x="4" y="38" width="40" height="2" rx="1" fill="#065F46" />

      <defs>
        <linearGradient id="dome-gradient" x1="24" y1="4" x2="24" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="body-gradient" x1="24" y1="22" x2="24" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>
    </svg>
  );
}
