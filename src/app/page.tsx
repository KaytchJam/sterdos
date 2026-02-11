"use client";

import { Dispatch, FormEvent, useState, useRef } from "react";
import LocationForm from "@/components/LocationForm";
import StopRecordList from "@/components/StopRecordList";
import { UserStopRecord } from "@/lib/client/types";
import { useLocation } from "@/hooks/useLocation";

import { GeoCoord, AddressMap } from "@/lib/client/types";
import { mobility_score } from "@/lib/client/score";


const HOUSTON_LAT: number = 29.749907;
const HOUSTON_LONG: number = -95.358421;

type SSDispatch<T> = Dispatch<React.SetStateAction<T>>;

/** Function handling submission of form information. */
async function handleLocationSubmit(
    e: FormEvent<HTMLFormElement>, 
    errSSD: SSDispatch<string | null>, loadSSD: SSDispatch<boolean>, resSSD: SSDispatch<UserStopRecord[]>,
    lat: string, long: string, address?: string, address_cache?: AddressMap,
    setLat?: SSDispatch<string>, setLong?: SSDispatch<string>
) {
    e.preventDefault();

    // "guards" the submission button and empties out prior information
    loadSSD(true);
    errSSD(null);
    resSSD([]);

    // api call + case handling
    try {
        let finalLat: string = lat;
        let finalLong: string = long;

        // If an address was passed in, we transform it into a geo_coord
        if (address && address_cache && (!lat || !long)) {
            const geo: GeoCoord = await address_to_geocoord(address, address_cache);
            finalLat = geo.lat;
            finalLong = geo.long;

            setLat?.(finalLat);
            setLong?.(finalLong);
        }

        if (!finalLat || !finalLong) {
            throw new Error("No location provided");
        }

        const params: URLSearchParams = new URLSearchParams({
            latitude: finalLat,
            longitude: finalLong
        });

        const res = await fetch(`/api/find-stops?${params.toString()}`);
        if (!res.ok) throw new Error("Query failed");
        resSSD(await res.json());
    } catch (err) {
        errSSD("Failed to fetch nearby bus stops.");
    } finally {
        loadSSD(false);
    }
}

/** Transforms a passed in address into a latitude longitude pair */
async function address_to_geocoord(address: string, address_cache: AddressMap): Promise<GeoCoord> {
    if (address_cache && address_cache.has(address)) {
        return address_cache.get(address)!;
    }

    const res = await fetch(
        `/api/geocode?address=${encodeURIComponent(address)}`
    );

    if (!res.ok) {
        throw new Error("Geocoding failed");
    }

    const data = await res.json();
    const coord: GeoCoord = {
        lat: String(data.latitude),
        long: String(data.longitude)
    };

    address_cache.set(address, coord);
    return coord;
}

export default function Page() {
    const {lat, long, setLat, setLong, useCurrentLocation } = useLocation();
    const [address, setAddr] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<UserStopRecord[]>([]);
    const [error, setError] = useState<string | null>(null);
    const addressCache = useRef<AddressMap>(new Map());

    const onAddressChange = (value: string) => {
        setAddr(value);
        setLat("");
        setLong("");
    };

    return (
        <section className="flex justify-center pt-20">
            <div>
                <h1 className="font-bold text-xl"> <span className="text-red-800">ST</span>ERDOS</h1>
                <LocationForm lat={lat} long={long} loading={loading} onLatChange={setLat} onLongChange={setLong} address={address} onAddressChange={onAddressChange}
                    onSubmit={(e) => handleLocationSubmit(e, setError, setLoading, setResults, lat, long, address, addressCache.current, setLat, setLong)} onUseCurrentLocation={useCurrentLocation}/>

                { error && (
                    <div className="mt-4 text-red-600 text-center font-semibold">
                        {error}
                    </div>
                )}

                { results.length > 0 && (
                    <div className="mt-2">
                        <p className="text-center"> SCORE: <span className="font-bold">{mobility_score({ lat, long }, results).toFixed(2) }</span></p>
                        <StopRecordList stop_list={results}/>
                    </div>
                )}

                { !loading && results.length === 0 && !error && (
                    <p className="mt-4 text-center text-gray-500">
                        No results yet — submit a location to search.
                    </p>
                )}
            </div>
        </section>
    );
}
