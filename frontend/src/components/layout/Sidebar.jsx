
import {
  LayoutDashboard,
  CalendarDays,
  Wrench,
  Users,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../context/themeContext";

const navigation = [
  {
    name: "Overview",
    path: "/overview",
    icon: LayoutDashboard,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: Users,
  },
  {
    name: "Bookings",
    path: "/bookings",
    icon: CalendarDays,
  },
  {
    name: "Mechanics",
    path: "/mechanics",
    icon: Wrench,
  },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <>
      
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed left-4 top-4 z-30 rounded-lg p-2 shadow-md md:hidden
          ${
            isDark
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-700"
          }
        `}
      >
        <Menu size={22} />
      </button>

     
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
          shadow-lg  

          ${
            isDark
              ? "border-r border-gray-800 bg-gray-950"
              : "border-r border-gray-200 bg-white"
          }

          ${isOpen ? "block" : "hidden"} md:flex
        `}
      >
         
        <div
          className={`
            flex h-16 items-center justify-between border-b px-5

            ${
              isDark
                ? "border-gray-800"
                : "border-gray-200"
            }
          `}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Wrench size={20} />
            </div>

            <div>
              <h1
                className={`
                  text-base font-bold
                  ${isDark ? "text-white" : "text-gray-900"}
                `}
              >
                Instant Mechanic
              </h1>

              <p
                className={`
                  text-[11px]
                  ${isDark ? "text-gray-500" : "text-gray-400"}
                `}
              >
                Admin Dashboard
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className={`
              rounded-lg p-1 transition md:hidden
              ${
                isDark
                  ? "text-gray-400 hover:bg-gray-800"
                  : "text-gray-500 hover:bg-gray-100"
              }
            `}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6">
          <p
            className={`
              mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider
              ${isDark ? "text-gray-600" : "text-gray-400"}
            `}
          >
            Menu
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `
                      flex items-center gap-3 rounded-lg px-3 py-2.5
                      text-sm font-medium transition-all duration-200

                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm"
                          : isDark
                          ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }
                    `
                  }
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Theme Toggle */}
        <div
          className={`
            border-t p-3
            ${isDark ? "border-gray-800" : "border-gray-200"}
          `}
        >
          <button
            onClick={toggleTheme}
            className={`
              flex w-full items-center justify-between rounded-xl
              px-3 py-2.5 transition-all duration-200

              ${
                isDark
                  ? "bg-gray-900 text-gray-300 hover:bg-gray-800"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <div className="flex items-center gap-3">
              {isDark ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}

              <span className="text-sm font-medium">
                {isDark ? "Dark Mode" : "Light Mode"}
              </span>
            </div>

            {/* Toggle */}
            <div
              className={`
                relative h-6 w-11 rounded-full transition-colors

                ${isDark ? "bg-blue-600" : "bg-gray-300"}
              `}
            >
              <div
                className={`
                  absolute top-1 h-4 w-4 rounded-full
                  bg-white shadow-sm transition-all duration-200

                  ${isDark ? "left-6" : "left-1"}
                `}
              />
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
