// router.ts
import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PlayerDetailPage from "./pages/PlayerDetailPage";
import TeamSchedule from "./components/TeamSchedule";
import DepthChart from "./components/DepthChart";
import Scoreboard from "./components/Scoreboard/Scoreboard";

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
        path: "scoreboard",
        element: <Scoreboard />, // Add the new route here
      },
      {
        path: ":teamAbv/schedule",
        element: <TeamSchedule />,
      },
      {
        path: ":teamAbv/depth-chart",
        element: <DepthChart />,
      },
      {
        path: ":teamAbv",
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
