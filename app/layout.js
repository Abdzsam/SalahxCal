import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SalahxCal - Prayer Times in Your Calendar",
  description:
    "Subscribe to accurate Islamic prayer times in Google Calendar, Apple Calendar, Outlook, and more. Free, no account needed.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
