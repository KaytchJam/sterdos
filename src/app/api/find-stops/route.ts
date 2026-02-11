import { NextResponse } from "next/server";
import db from "@/lib/server/db"
import { StopRecord } from "@/lib/server/db";
import { haversine } from "@/lib/utils/metrics";
import { FIFTEEN_MINUTE_AVG_WALKING_DISTANCE_METERS } from "@/lib/utils/constants";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const latitude: string | null = searchParams.get("latitude");
    const longitude: string | null = searchParams.get("longitude");

    if (Number.isNaN(longitude) || Number.isNaN(latitude)) {
        return NextResponse.json(
            { error: "Invalid lat/lon" },
            { status: 400 }
        );
    }

    const stops: StopRecord[] = db.prepare(`
        SELECT s.* FROM Stops_RTree r 
        JOIN Stops s ON s.id = r.id
        WHERE
        r.min_lat <= ?
        AND r.max_lat >= ?
        AND r.min_lon <= ?
        AND r.max_lon >= ?
    `).all(latitude, latitude, longitude, longitude) as StopRecord[];

    const lat: number = Number(latitude);
    const lon: number = Number(longitude);
    const meter_dist_thresh: number = FIFTEEN_MINUTE_AVG_WALKING_DISTANCE_METERS;

    /** Filter for records below distance threshold (and also set the distance from the query point) */
    return NextResponse.json(stops.filter((rec: StopRecord) => {
        const distance: number = haversine(lat, lon, rec.Lat, rec.Lon);
        rec.Distance = distance;
        return distance <= meter_dist_thresh;
    }));
}