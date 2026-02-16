import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { PRAYERS } from "./constants";

dayjs.extend(utc);
dayjs.extend(timezone);

async function fetchMonthlyTimings(year, month, address, method) {
  const url = `https://api.aladhan.com/v1/calendarByAddress/${year}/${month}?address=${encodeURIComponent(address)}&method=${method}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Aladhan API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.code !== 200 || !json.data) {
    throw new Error("Aladhan API returned unexpected response");
  }

  return json.data;
}

export async function fetchPrayerTimes(daysAhead, address, method, tz) {
  const today = dayjs().tz(tz);
  const endDate = today.add(daysAhead, "day");

  // Determine which months we need (current + possibly next)
  const months = new Set();
  months.add(`${today.year()}-${today.month() + 1}`);
  months.add(`${endDate.year()}-${endDate.month() + 1}`);

  // Fetch all needed months in parallel (1-2 API calls max)
  const monthlyData = await Promise.all(
    [...months].map((key) => {
      const [year, month] = key.split("-");
      return fetchMonthlyTimings(year, month, address, method);
    })
  );

  // Flatten all days from all months
  const allDays = monthlyData.flat();

  // Filter to our date range and extract the 5 prayers
  const todayStr = today.format("YYYY-MM-DD");
  const endStr = endDate.format("YYYY-MM-DD");
  const prayers = [];

  for (const day of allDays) {
    const dateStr = day.date.gregorian.date; // "DD-MM-YYYY"
    const parts = dateStr.split("-");
    const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // "YYYY-MM-DD"

    if (isoDate < todayStr || isoDate >= endStr) continue;

    for (const name of PRAYERS) {
      const time = day.timings[name];
      if (!time) continue;

      // Strip timezone suffix like " (BST)"
      const cleanTime = time.replace(/\s*\(.*\)$/, "");

      prayers.push({
        name,
        date: isoDate,
        time: cleanTime,
      });
    }
  }

  return prayers;
}
