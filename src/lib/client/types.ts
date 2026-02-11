
/** Latitude - Longitude Geographical Coordinate. */
export type GeoCoord = { 
    lat: string, 
    long: string 
};

/** Type alias for a String-GeoCoord map. */
export type AddressMap = Map<string,GeoCoord>;

/** Representation of a StopRecord as seen on the client-side */
export type UserStopRecord = {
    Name: string;
    StopId: string;
    Lat: number;
    Lon: number;
    Distance: number,
};