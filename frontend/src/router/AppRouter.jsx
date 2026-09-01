import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Bookings from "../pages/Bookings";
import Mechanics from "../pages/Mechanics";
import Analytics from "../pages/Analytics";
import Overview from "../pages/Overview";

const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/overview",
        element: <Overview />,
      },
       {
        path: "/bookings",
        element: <Bookings/>,
      },
       {
        path: "/mechanics",
        element: <Mechanics/>,
      },
      {
        path: "/analytics",
        element: <Analytics/>,
      },
     
    ],
  },
]);

export default router;