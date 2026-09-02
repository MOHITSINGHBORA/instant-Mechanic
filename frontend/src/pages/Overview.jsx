import { useEffect, useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  IndianRupee,
  Wrench,
  Users,
  ClipboardList,
} from "lucide-react";

import { useTheme } from "../context/themeContext";

const statsConfig = [
  {
    key: "totalBookings",
    title: "Total Bookings",
    icon: ClipboardList,
    description: "All time bookings",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    
  },
  {
    key: "todaysBookings",
    title: "Today's Bookings",
    icon: CalendarDays,
    description: "Bookings today",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
   
  },
  {
    key: "completedBookings",
    title: "Completed",
    icon: CheckCircle2,
    description: "Successfully completed",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    
  },
  {
    key: "pendingBookings",
    title: "Pending",
    icon: Clock3,
    description: "Waiting for action",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    
  },
  {
    key: "cancelledBookings",
    title: "Cancelled",
    icon: XCircle,
    description: "Cancelled bookings",
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
   
  },
  {
    key: "totalRevenue",
    title: "Total Revenue",
    icon: IndianRupee,
    description: "Total earnings",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    
  },
  {
    key: "activeMechanics",
    title: "Active Mechanics",
    icon: Wrench,
    description: "Currently active",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
   
  },
  {
    key: "newCustomers",
    title: "New Customers",
    icon: Users,
    description: "Joined today",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
   
  },
];

function Overview() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/overview`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch overview"
          );
        }

        setOverview(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center p-6 ${
          isDark ? "bg-gray-950" : "bg-gray-50"
        }`}
      >
        <div
          className={`text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Loading overview...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center p-6 ${
          isDark ? "bg-gray-950" : "bg-gray-50"
        }`}
      >
        <div
          className = "text-red-400 text-sm"
        >
          {error}
        </div>
      </div>
    );
  }

  if (!overview) {
    return (
      <div
        className={`p-6 text-center text-sm ${
          isDark
            ? "bg-gray-950 text-gray-400"
            : "text-gray-500"
        }`}
      >
        No overview data available.
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col justify-center space-y-6 p-3 sm:p-5 lg:p-6 ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
     
      <div
        className={`rounded-2xl p-5 shadow-sm sm:p-6  ${
          isDark
            ? "border border-gray-800 bg-gray-900"
            : "bg-white"
        }`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1
              className={`mt-1 text-2xl font-bold tracking-tight sm:text-3xl ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Overview
            </h1>

            <p
              className={`mt-1 max-w-2xl text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Here's what's happening with your operations today.
            </p>
          </div>

        </div>
      </div>
 
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsConfig.map((stat) => {
          const Icon = stat.icon;

          let value = overview[stat.key];

          if (stat.key === "totalRevenue") {
            value = `₹${Number(value || 0).toLocaleString("en-IN")}`;
          }

          return (
            <div
              key={stat.key}
              className={`group relative overflow-hidden rounded-2xl p-5 shadow-sm  hover:-translate-y-1 hover:shadow-md sm:p-6 ${
                isDark
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-100 bg-white"
              }`}
            >
              
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p
                    className={`truncate text-sm font-medium ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {stat.title}
                  </p>

                  <h2
                    className={`mt-2  text-2xl font-bold tracking-tight sm:text-3xl ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {value}
                  </h2>

                  <div className="mt-2 flex items-center gap-1.5">
                    <span
                      className={`text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {stat.description}
                    </span>
                  </div>
                </div>

            
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon
                    size={21}
                    className={stat.iconColor}
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Overview;
