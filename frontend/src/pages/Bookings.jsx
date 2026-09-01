
import { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  IndianRupee,
} from "lucide-react";
import { useTheme } from "../context/themeContext";

const statusStyles = {
  Completed: "bg-green-50 text-green-700 border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",

  Pending: "bg-yellow-50 text-yellow-700 border-yellow-100 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20",

  Assigned: "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",

  "Mechanic On The Way": "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",

  Cancelled: "bg-red-50 text-red-700 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
};

function Bookings() {
  const { theme } = useTheme();

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 10;

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        search,
        status,
        page: currentPage,
        limit,
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings?${params}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const result = await response.json();

      setBookings(result.data || []);

      setTotalPages(result.pagination?.totalPages || 1);
      setTotalBookings(result.pagination?.totalBookings || 0);
    } catch (error) {
      console.error("Fetch bookings error:", error);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [search, status, currentPage]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div
      className={`min-h-full space-y-5 p-3 sm:p-5 lg:p-6 ${theme === "dark"
        ? "bg-gray-950 text-white"
        : "bg-gray-50 text-gray-900"
        }`}
    >
      <div
        className={`rounded-2xl p-5 shadow-sm sm:p-6 ${theme === "dark"
          ? "border border-gray-800 bg-gray-900"
          : "bg-white"
          }`}
      >
        <h1 className="text-2xl font-bold">Bookings</h1>

        <p
          className={`mt-1 text-sm ${theme === "dark"
            ? "text-gray-400"
            : "text-gray-500"
            }`}
        >
          Manage and monitor vehicle service bookings.
        </p>
      </div>

      <div
        className={`overflow-hidden rounded-2xl shadow-sm ${theme === "dark"
          ? "border border-gray-800 bg-gray-900"
          : "bg-white"
          }`}
      >

        <div
          className={`border-b p-4 sm:p-5 ${theme === "dark"
            ? "border-gray-800"
            : "border-gray-100"
            }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row">

            <div className="relative flex-1">
              <Search
                size={18}
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme === "dark"
                  ? "text-gray-500"
                  : "text-gray-400"
                  }`}
              />

              <input
                type="text"
                placeholder="Search booking, vehicle, registration..."
                value={search}
                onChange={handleSearch}
                className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm outline-none ${theme === "dark"
                  ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                  : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                  }`}
              />
            </div>


            <div className="relative sm:w-56">
              <SlidersHorizontal
                size={17}
                className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${theme === "dark"
                  ? "text-gray-500"
                  : "text-gray-400"
                  }`}
              />

              <select
                value={status}
                onChange={handleStatusChange}
                className={`w-full appearance-none rounded-xl border py-2.5 pl-10 pr-10 text-sm outline-none ${theme === "dark"
                  ? "border-gray-700 bg-gray-800 text-gray-200"
                  : "border-gray-200 bg-white text-gray-700"
                  }`}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="Mechanic On The Way">Mechanic On The Way</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <ChevronDown
                size={16}
                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${theme === "dark"
                  ? "text-gray-500"
                  : "text-gray-400"
                  }`}
              />
            </div>
          </div>
        </div>


        {loading && (
          <div className="flex min-h-100 items-center justify-center">
            <div className="text-center">

              <p
                className={`text-sm ${theme === "dark"
                  ? "text-gray-400"
                  : "text-gray-500"
                  }`}
              >
                Loading bookings...
              </p>
            </div>
          </div>
        )}


        {!loading && error && (
          <div className="p-10 text-center text-sm text-red-500">
            {error}
          </div>
        )}


        {!loading && !error && (
          <>
            {bookings.length === 0 ? (
              <div className="p-12 text-center">
                <p
                  className={`font-medium ${theme === "dark"
                    ? "text-gray-200"
                    : "text-gray-700"
                    }`}
                >
                  No bookings found
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Try changing your search or status.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead
                    className={
                      theme === "dark"
                        ? "bg-gray-800/50 text-xs uppercase text-gray-400"
                        : "bg-gray-50 text-xs uppercase text-gray-500"
                    }
                  >
                    <tr>
                      <th className="px-6 py-3.5">
                        Booking
                      </th>
                      <th className="px-6 py-3.5">
                        Customer
                      </th>
                      <th className="px-6 py-3.5">
                        Vehicle
                      </th>
                      <th className="px-6 py-3.5">
                        Service
                      </th>
                      <th className="px-6 py-3.5">
                        Mechanic
                      </th>
                      <th className="px-6 py-3.5">
                        Status
                      </th>
                      <th className="px-6 py-3.5">
                        Amount
                      </th>
                      <th className="px-6 py-3.5">
                        Date / Time
                      </th>
                    </tr>
                  </thead>

                  <tbody
                    className={`divide-y ${theme === "dark"
                      ? "divide-gray-800"
                      : "divide-gray-100"
                      }`}
                  >
                    {bookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className={
                          theme === "dark"
                            ? "hover:bg-gray-800/50"
                            : "hover:bg-gray-50"
                        }
                      >
                        <td className="px-6 py-4">
                          <span
                            className={`font-semibold ${theme === "dark"
                              ? "text-blue-400"
                              : "text-blue-600"
                              }`}
                          >
                            #{booking.bookingId}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="font-medium">
                            {booking.customer?.name || "N/A"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <p className="font-medium">
                            {booking.vehicle || "N/A"}
                          </p>

                          <p className="text-xs text-gray-400">
                            {booking.registrationNumber || "N/A"}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          {booking.service || "N/A"}
                        </td>

                        <td className="px-6 py-4">
                          {booking.mechanic?.name || "Not Assigned"}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[
                              booking.status] ||"border-gray-100 bg-gray-50 text-gray-700"}`}
                          >
                            {booking.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-semibold">
                          <span className="flex items-center gap-1">
                            <IndianRupee size={14} />
                            {Number(
                              booking.amount || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-gray-500">
                          {formatDate(
                            booking.bookingDate
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}


            <div
              className={`flex items-center justify-between border-t px-4 py-4 ${theme === "dark"
                ? "border-gray-800"
                : "border-gray-100"
                }`}
            >
              <p className="text-sm text-gray-500">
                Showing {bookings.length} of {totalBookings}{" "} bookings
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => page - 1)
                  }
                  className={`rounded-lg border px-3 py-2 text-sm ${theme === "dark"
                    ? "border-gray-700 text-gray-300"
                    : "border-gray-200 text-gray-600"
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  Previous
                </button>

                <span
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium ${theme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-600 text-white"
                    }`}
                >
                  {currentPage}
                </span>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((page) => page + 1)
                  }
                  className={`rounded-lg border px-3 py-2 text-sm ${theme === "dark"
                    ? "border-gray-700 text-gray-300"
                    : "border-gray-200 text-gray-600"
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Bookings;
