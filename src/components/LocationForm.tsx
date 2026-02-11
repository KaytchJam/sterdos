import { FormEvent } from "react";

/** Arguments for the LocationForm Component */
type LocationFormProps = {
    lat: string;
    long: string;
    address: string;
    loading: boolean;
    onLatChange: (value: string) => void;
    onLongChange: (value: string) => void;
    onAddressChange: (value: string) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onUseCurrentLocation: () => void;
};

export default function LocationForm(args: LocationFormProps) {
    return (
        <form onSubmit={args.onSubmit}>
        <p className="text-center font-bold">Enter an Address or Coordinates</p>

        {/* Address input */}
        <label className="block text-center mt-2">
            Address
            <input name="address-input" type="text" value={args.address} onChange={(e) => args.onAddressChange(e.target.value)} placeholder="Texas Medical Center, Houston TX" className="border w-full p-1 mt-1"/>
        </label>

        <p className="text-center text-gray-500 mt-2">— or —</p>
        <p className="text-center font-bold">Enter Latitude & Longitude Coordinates</p>
        <button type="button" className="block mx-auto bg-pink-500 font-bold border mb-1 p-1 hover:bg-red-500 transition" onClick={args.onUseCurrentLocation}>Use Current Location</button>

        <div className="w-4/5 flex justify-center mx-auto">
            <label className="text-center">
            <p>Latitude</p>
            <input name="lat-input" type="number" value={args.lat} onChange={(e) => args.onLatChange(e.target.value)} className="border text-center ml-1 mr-1 p-1"/>
            </label>

            <label className="text-center">
            <p>Longitude</p>
            <input name="long-input" type="number" value={args.long} onChange={(e) => args.onLongChange(e.target.value)} className="border text-center ml-1 mr-1 p-1"/>
            </label>
        </div>

        <button type="submit" className="mx-auto block border bg-yellow-500 mt-1 mb-1 p-1 font-bold hover:bg-orange-500 transition" disabled={args.loading}>
            {args.loading ? "LOADING..." : "CALCULATE"}
        </button>
        </form>
    );
}