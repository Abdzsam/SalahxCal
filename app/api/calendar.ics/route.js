import { NextResponse } from "next/server";
import { fetchPrayerTimes } from "@/lib/aladhan";
import { generateICS } from "@/lib/ics";
import { DAYS_AHEAD } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const address = searchParams.get("address");
  const method = searchParams.get("method") || "2";
  const tz = searchParams.get("tz");

  if (!address || !tz) {
    return NextResponse.json(
      { error: "Missing required parameters: address and tz" },
      { status: 400 }
    );
  }

  const methodNum = parseInt(method, 10);
  if (isNaN(methodNum) || methodNum < 0 || methodNum > 23) {
    return NextResponse.json(
      { error: "Invalid calculation method" },
      { status: 400 }
    );
  }

  try {
    const prayers = await fetchPrayerTimes(DAYS_AHEAD, address, methodNum, tz);
    const icsContent = generateICS(prayers, tz);

    return new Response(icsContent, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="prayer-times.ics"',
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err) {
    console.error("ICS generation failed:", err);
    return NextResponse.json(
      { error: "Failed to generate calendar. Check your address and timezone." },
      { status: 500 }
    );
  }
}
