import "server-only"
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

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


let db: Database.Database | null = null; 

/** Creates an instance of the sqlite database if not already constructed */
export function get_database(): Database.Database {
    if (db != null) {
        return db;
    }
    
    const metro_db_path: string = path.join(process.cwd(), 'data', 'houston_metro_stops.db');
    console.log("Metro Database PATH: ", metro_db_path);

    if (!fs.existsSync(metro_db_path)) {
        throw new Error(`SQLite DB not found at ${metro_db_path}`);
    }

    db = new Database(metro_db_path, {
        readonly: true,
        fileMustExist: true,
    });
    
    return db!;
}


export default get_database;