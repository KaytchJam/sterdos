import "server-only"
import Database from "better-sqlite3";
import path from "path";

/** Represents a record from our "Stops" metro SQLITE database, with the exception of
 * the `Distance` field which is NOT present in the database schema */
export interface StopRecord {
    id: number,
    StopId: String,
    Name: String,
    Lat: number,
    Lon: number,
    Distance: number
};

const db = new Database(path.join(process.cwd(), "/data/houston_metro_stops.db"), {
    readonly: false,
    fileMustExist: true,
});

export default db;