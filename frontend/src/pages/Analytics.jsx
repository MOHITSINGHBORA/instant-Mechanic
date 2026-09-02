import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useTheme } from "../context/themeContext";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const statusColors = {
    Completed: "#22c55e",
    Pending: "#eab308",
    Cancelled: "#ef4444",
    Assigned: "#8b5cf6",
    "Mechanic On The Way": "#9ca3af",
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/analytics`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch analytics");
        }

        const result = await response.json();

        setAnalytics(result.data);
      } catch (error) {
        console.error("Analytics error:", error);
        setError("Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div
        className={`flex min-h-screen flex-col items-center justify-center gap-3 ${isDark ? "bg-gray-950" : "bg-gray-50"
          }`}
      >

        <p
          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"
            }`}
        >
          Loading analytics...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen p-6 flex-col ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
          <p className= "justify-center items-center text-sm text-red-400">
            {error}
          </p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div
        className={`p-6 text-center ${isDark ? "bg-gray-950 text-gray-400" : "bg-gray-50 text-gray-500"
          }`}
      >
        No analytics data available.
      </div>
    );
  }

  const totalBookings =
    analytics.bookingStatus?.reduce(
      (total, item) => total + item.value,
      0
    ) || 0;

  const totalRevenue =
    analytics.revenueOverTime?.reduce(
      (total, item) => total + item.revenue,
      0
    ) || 0;

  const completedBookings =
    analytics.bookingStatus?.find(
      (item) => item.name === "Completed"
    )?.value || 0;

  const pendingBookings =
    analytics.bookingStatus?.find(
      (item) => item.name === "Pending"
    )?.value || 0;

  const cardClass = isDark
    ? "border border-gray-800 bg-gray-900"
    : "border border-gray-100 bg-white";

  const primaryText = isDark ? "text-white" : "text-gray-900";
  const secondaryText = isDark ? "text-gray-400" : "text-gray-500";
  const mutedText = isDark ? "text-gray-500" : "text-gray-400";

  const chartTextColor = isDark ? "#9ca3af" : "#6b7280";
  const chartGridColor = isDark ? "#374151" : "#e5e7eb";

  const tooltipStyle = {
    backgroundColor: isDark ? "#111827" : "#ffffff",
    border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
    borderRadius: "10px",
    boxShadow: isDark
      ? "0 4px 15px rgba(0,0,0,0.4)"
      : "0 4px 15px rgba(0,0,0,0.1)",
    color: isDark ? "#ffffff" : "#111827",
  };

  return (
    <div
      className={`min-h-full space-y-6 p-3 transition-colors duration-300 sm:p-5 lg:p-6 ${isDark ? "bg-gray-950" : "bg-gray-50"
        }`}
    >

      <div
        className={`rounded-2xl p-5 shadow-sm transition-colors duration-300 sm:p-6 ${cardClass}`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1
              className={`text-2xl font-bold tracking-tight sm:text-3xl ${primaryText}`}
            >
              Analytics
            </h1>

            <p className={`mt-1 text-sm ${secondaryText}`}>
              Monitor your bookings, revenue and service performance.
            </p>
          </div>


        </div>
      </div>


      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        <div
          className={`rounded-2xl p-4 shadow-sm transition-all hover:shadow-md sm:p-5 ${cardClass}`}
        >
          <div className="mb-4">
            <h2 className={`text-lg font-semibold ${primaryText}`}>
              Bookings Over Time
            </h2>

            <p className={`mt-1 text-xs sm:text-sm ${secondaryText}`}>
              Number of bookings over time
            </p>
          </div>

          <div className="h-64 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analytics.bookingsOverTime}
                margin={{
                  top: 10,
                  right: 5,
                  left: -20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={chartGridColor}
                />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: chartTextColor }}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                  minTickGap={25}
                />

                <YAxis
                  tick={{ fontSize: 10, fill: chartTextColor }}
                  tickLine={false}
                  axisLine={false}
                  width={35}
                />

                <Tooltip contentStyle={tooltipStyle} />

                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div
          className={`rounded-2xl p-4 shadow-sm transition-all hover:shadow-md sm:p-5 ${cardClass}`}
        >
          <div className="mb-4">
            <h2 className={`text-lg font-semibold ${primaryText}`}>
              Revenue Over Time
            </h2>

            <p className={`mt-1 text-xs sm:text-sm ${secondaryText}`}>
              Revenue generated from bookings
            </p>
          </div>

          <div className="h-64 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.revenueOverTime}
                margin={{
                  top: 10,
                  right: 5,
                  left: -15,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={chartGridColor}
                />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: chartTextColor }}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                  minTickGap={25}
                />

                <YAxis
                  tick={{ fontSize: 10, fill: chartTextColor }}
                  tickLine={false}
                  axisLine={false}
                  width={45}
                />

                <Tooltip
                  formatter={(value) => [
                    `₹${Number(value).toLocaleString("en-IN")}`,
                    "Revenue",
                  ]}
                  contentStyle={tooltipStyle}
                />

                <Bar
                  dataKey="revenue"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div
          className={`rounded-2xl p-4 shadow-sm transition-all hover:shadow-md sm:p-5 ${cardClass}`}
        >
          <div className="mb-2">
            <h2 className={`text-lg font-semibold ${primaryText}`}>
              Booking Status
            </h2>

            <p className={`mt-1 text-xs sm:text-sm ${secondaryText}`}>
              Distribution of booking statuses
            </p>
          </div>

          <div className="h-72 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.bookingStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {analytics.bookingStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={statusColors[entry.name] || "#d1d5db"}
                    />
                  ))}
                </Pie>

                <Tooltip contentStyle={tooltipStyle} />

                <Legend
                  verticalAlign="bottom"
                  height={45}
                  wrapperStyle={{
                    fontSize: "11px",
                    color: chartTextColor,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div
          className={`rounded-2xl p-4 shadow-sm transition-all hover:shadow-md sm:p-5 ${cardClass}`}
        >
          <div className="mb-4">
            <h2 className={`text-lg font-semibold ${primaryText}`}>
              Service Breakdown
            </h2>

            <p className={`mt-1 text-xs sm:text-sm ${secondaryText}`}>
              Bookings by service category
            </p>
          </div>

          <div className="h-72 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.serviceBreakdown}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 15,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke={chartGridColor}
                />

                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: chartTextColor }}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={105}
                  tick={{ fontSize: 10, fill: chartTextColor }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip contentStyle={tooltipStyle} />

                <Bar
                  dataKey="bookings"
                  fill="#3b82f6"
                  radius={[0, 6, 6, 0]}
                  maxBarSize={25}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;