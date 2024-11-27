import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PlayerDetailPage from "./pages/PlayerDetailPage";
import TeamSchedule from "./components/TeamSchedule";
import DepthChart from "./components/DepthChart";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import BoxScore from "./components/BoxScore";
import ComparePlayers from "./pages/ComparePlayers";

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
        path: "scoreboard/:dateParam?",
        element: <Scoreboard />,
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
        path: ":teamAbv/:playerName",
        element: <PlayerDetailPage />,
      },
      {
        path: "boxscore/:gameId",
        element: <BoxScore />,
      },
      {
        path: "/compare-players",
        element: <ComparePlayers />,
      },
    ],
  },
]);

export default router;
