import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useTheme } from "../../context/themeContext";

function DashboardLayout() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar />

      {/* Main content */}
      <div className="md:ml-64">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;