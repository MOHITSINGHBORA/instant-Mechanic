import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Circle,
  RefreshCw,
} from "lucide-react";

import { useTheme } from "../context/themeContext";

const statusIcons = {
  Available: CheckCircle2,
  Busy: Clock3,
  Offline: Circle,
};

function Mechanics() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMechanics = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/mechanics`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch mechanics");
      }

      const result = await response.json();

      setMechanics(result.data);
    } catch (error) {
      console.error("Fetch mechanics error:", error);
      setError("Failed to load mechanics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMechanics();
  }, []);

  return (
    <div
      className={`min-h-full p-6 ${isDark ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900" }`}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Mechanics
          </h1>

          <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Monitor mechanic availability and assignments.
          </p>
        </div>

        <button
          onClick={fetchMechanics}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>


      <div
        className={`overflow-x-auto rounded-xl border ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white" }`}
      >
        {loading ? (
          <div className="flex min-h-80 items-center justify-center text-sm text-gray-500">
            Loading mechanics...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-sm text-red-500">
            {error}
          </div>
        ) : mechanics.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-500">
            No mechanics found.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className={`border-b ${isDark ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}>
              <tr>
                <th className="px-6 py-4">Mechanic Name</th>
                <th className="px-6 py-4">Current Status</th>
                <th className="px-6 py-4">Jobs Completed</th>
                <th className="px-6 py-4">Current / Last Booking</th>
              </tr>
            </thead>

            <tbody>
              {mechanics.map((mechanic) => {
                const StatusIcon =
                  statusIcons[mechanic.status] || Circle;

                return (
                  <tr
                    key={mechanic._id}
                    className={`border-b ${isDark
                        ? "border-gray-800"
                        : "border-gray-100"
                      }`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold">
                        {mechanic.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {mechanic.mechanicId}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <StatusIcon size={16} />
                        {mechanic.status}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {mechanic.jobsCompleted || 0}
                    </td>

                    <td className="px-6 py-4">
                      {mechanic.currentBooking
                        ? `#${mechanic.currentBooking}`
                        : "No booking"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Mechanics;