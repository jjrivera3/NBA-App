import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PlayerDetailPage from "./pages/PlayerDetailPage";
import TeamSchedule from "./components/TeamSchedule";
import DepthChart from "./components/DepthChart"; // Import your DepthChart component

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ":teamAbv/schedule", // More specific paths should come first
        element: <TeamSchedule />,
      },

      {
        path: ":teamAbv/depth-chart",
        element: <DepthChart />,
      },
      {
        path: ":teamAbv", // Place the general route at the end
        element: <HomePage />,
      },
      {
        path: ":teamName/:playerName",
        element: <PlayerDetailPage />,
      },
    ],
  },
]);

export default router;
