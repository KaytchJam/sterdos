import { UserStopRecord } from "@/lib/client/types";

/** Component representing a scrollable list of METRO stops */
export default function StopRecordList(args: { stop_list: UserStopRecord[] }): React.JSX.Element {
    return (
        <div className="mt-4 border rounded-md max-h-80 overflow-y-auto p-3 text-sm sm:text-base">
            <h2 className="font-bold mb-2 text-center">Nearby Bus Stops ({args.stop_list.length})</h2>
            <ul className="space-y-2">
                { args.stop_list.sort((a, b) => a.Distance - b.Distance).map((stop, idx) => ( 
                    <li key={idx} className="border rounded p-2 hover:bg-gray-100 transition">
                        <div className="flex justify-between items-start"><p className="font-semibold">{stop.Name}</p><p> {"<"} {Math.ceil(stop.Distance / 1.27 / 60)} min</p></div>
                        <p className="text-sm text-gray-600">ID: {stop.StopId}</p>
                        <p className="text-sm text-gray-600">Stop Number: {stop.StopId.split("_")[2]}</p>
                        <p className="text-sm text-gray-600">Lat: {stop.Lat.toFixed(5)}, Lon: {stop.Lon.toFixed(5)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}