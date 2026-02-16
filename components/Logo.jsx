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
      {/* Calendar body — flat fill so the overlay circle matches perfectly */}
      <rect x="6" y="12" width="40" height="34" rx="6" fill="#0f172a" />

      {/* Calendar header */}
      <rect x="6" y="12" width="40" height="12" rx="6" fill="#059669" />
      <rect x="6" y="18" width="40" height="6" fill="#059669" />

      {/* Calendar pins */}
      <rect x="16" y="7" width="3" height="10" rx="1.5" fill="#a7f3d0" />
      <rect x="33" y="7" width="3" height="10" rx="1.5" fill="#a7f3d0" />

      {/* Crescent moon — green circle with overlay circle in body color */}
      <circle cx="26" cy="35" r="8" fill="#34d399" />
      <circle cx="29" cy="33" r="7" fill="#0f172a" />

      {/* Five-pointed star */}
      <path
        d="M30 29l.6 1.2 1.3.2-.95.95.2 1.3-1.15-.6-1.15.6.2-1.3-.95-.95 1.3-.2z"
        fill="#34d399"
      />
    </svg>
  );
}
