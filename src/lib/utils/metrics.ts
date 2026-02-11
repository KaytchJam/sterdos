import { TO_RADIANS, MEAN_EARTH_RADIUS } from "./constants";

/** Computes the haversine distance between a pair of latitude, longitude points. Returns the distance in meters */
export function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const delta_lat: number = (lat2 - lat1) * TO_RADIANS;
    const delta_lon: number = (lon2 - lon1) * TO_RADIANS;
    
    const lat_rad_1: number = lat1 * TO_RADIANS;
    const lat_rad_2: number = lat2 * TO_RADIANS;

    const a: number = Math.sin(delta_lat / 2) ** 2 + Math.cos(lat_rad_1) * Math.cos(lat_rad_2) * Math.sin(delta_lon / 2) ** 2;
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return MEAN_EARTH_RADIUS * c;
}

/** Computes the euclidean distance between a pair of x and y */
export function euclidean(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}