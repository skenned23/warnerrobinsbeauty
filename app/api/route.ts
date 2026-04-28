import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get("ref");
  const name = searchParams.get("name");

  const API_KEY = process.env.GOOGLE_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: "No API key" }, { status: 500 });
  }

  let photoUrl: string;

  if (name) {
    // Places API (New) photo name
    photoUrl = `https://places.googleapis.com/v1/${name}/media?maxWidthPx=600&key=${API_KEY}`;
  } else if (ref) {
    // Legacy Places API photo reference
    photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${ref}&key=${API_KEY}`;
  } else {
    return NextResponse.json({ error: "No photo ref" }, { status: 400 });
  }

  try {
    const res = await fetch(photoUrl);
    if (!res.ok) {
      return NextResponse.json({ error: "Photo fetch failed" }, { status: 502 });
    }
    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") || "image/jpeg";
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}