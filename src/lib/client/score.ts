import { FIFTEEN_MINUTE_AVG_WALKING_DISTANCE_METERS } from "../utils/constants";
import { euclidean, haversine } from "../utils/metrics";
import { UserStopRecord, GeoCoord } from "./types";

/** 
 * Given a distance in meters, a radius around some central objects in meters, and a minimum radius in meters,
 * computes a "relaxed" proximity score.
 */
function relax_score(distance: number, radius: number, min_radius: number = 0) {
    const bounded_score: number = Math.max(distance, min_radius);
    return Math.max(0, Math.log2(radius / bounded_score));
}

/** 
 * Given a user position `GeoCoord` and stops `UserStopRecord`, computes a score for the coordinate based on the number
 * of stops in range of the user position & how close the stops are.
 */
export function mobility_score(user_position: GeoCoord, stops: UserStopRecord[]) {
    const N: number = stops.length;
    const { lat, long }: { lat: number, long: number } = { lat: Number(user_position.lat), long: Number(user_position.long) };

    let acc: number = 0.0;
    for (let i: number = 0; i < N; i++) {
        const other: UserStopRecord = stops[i];
        const distance: number = haversine(lat, long, Number(other.Lat), Number(other.Lon));
        acc += relax_score(distance, FIFTEEN_MINUTE_AVG_WALKING_DISTANCE_METERS, FIFTEEN_MINUTE_AVG_WALKING_DISTANCE_METERS / 4);
    }

    return acc;
}