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
        path: ":teamAbv/schedule",
        element: <TeamSchedule />,
      },
      {
        path: ":teamAbv",
        element: <HomePage />,
      },
      {
        path: ":teamAbv/depth-chart", // New route for DepthChart
        element: <DepthChart />, // Display the DepthChart component here
      },
      {
        path: ":teamName/:playerName",
        element: <PlayerDetailPage />,
      },
    ],
  },
]);

export default router;
