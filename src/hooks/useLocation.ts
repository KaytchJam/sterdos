import { useState } from "react";

export function useLocation() {
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");

    function setFromGeolocation(pos: GeolocationPosition) {
        setLat(String(pos.coords.latitude));
        setLong(String(pos.coords.longitude));
    }

    function useCurrentLocation() {
        if (!navigator.geolocation) {
        console.log("No geolocation possible.");
        return;
        }

        navigator.geolocation.getCurrentPosition(
        setFromGeolocation,
        () => console.log("Location access denied.")
        );
    }

    return { lat, long, setLat, setLong, useCurrentLocation };
}