import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { EVENT_DURATION_MINUTES, REMINDER_MINUTES } from "./constants";

dayjs.extend(utc);
dayjs.extend(timezone);

function formatLocalDateTime(dayjsObj) {
  return dayjsObj.format("YYYYMMDDTHHmmss");
}

function formatUTCDateTime(dayjsObj) {
  return dayjsObj.utc().format("YYYYMMDDTHHmmss") + "Z";
}

function escapeICS(text) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function generateICS(prayers, tz, domain = "salahxcal.vercel.app") {
  const dtstamp = formatUTCDateTime(dayjs());

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SalahxCal//Prayer Times//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Prayer Times",
    `X-WR-TIMEZONE:${tz}`,
    "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
    "X-PUBLISHED-TTL:PT12H",
  ];

  for (const prayer of prayers) {
    const start = dayjs.tz(
      `${prayer.date} ${prayer.time}`,
      "YYYY-MM-DD HH:mm",
      tz
    );
    const end = start.add(EVENT_DURATION_MINUTES, "minute");
    const uid = `${prayer.name.toLowerCase()}-${prayer.date}@${domain}`;

    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;TZID=${tz}:${formatLocalDateTime(start)}`,
      `DTEND;TZID=${tz}:${formatLocalDateTime(end)}`,
      `SUMMARY:${escapeICS(prayer.name)}`,
      `DESCRIPTION:${escapeICS(prayer.name + " prayer time - SalahxCal")}`,
      "TRANSP:TRANSPARENT",
      "BEGIN:VALARM",
      `TRIGGER:-PT${REMINDER_MINUTES}M`,
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeICS(prayer.name + " in " + REMINDER_MINUTES + " minutes")}`,
      "END:VALARM",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");

  return lines.join("\r\n");
}
