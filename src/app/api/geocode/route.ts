import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const address: string | null = searchParams.get("address");

    if (!address) {
        return NextResponse.json(
            { error: "Address is required" },
            { status: 400 }
        );
    }

    const url: URL = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", address);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");

    const res: Response = await fetch(url.toString(), {
        headers: { "User-Agent": "STerdos/1.0 (kaytchjam@gmail.com)" }
    });

    if (!res.ok) {
        return NextResponse.json(
            { error: "Geocoding provider error" },
            { status: 502 }
        );
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
        return NextResponse.json(
            { error: "Address not found" },
            { status: 404 }
        );
    }

    const result = data[0];

    return NextResponse.json({
        latitude: Number(result.lat),
        longitude: Number(result.lon),
        displayName: result.display_name
    });
}