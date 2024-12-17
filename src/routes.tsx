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
import TeamStatsPage from "./components/TeamStatsPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import AboutPage from "./components/AboutPage";
import RouteChangeTracker from "./RouteChangeTracker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteChangeTracker />, // Track route changes here
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Layout />, // Layout wrapper
        children: [
          { index: true, element: <HomePage /> },
          { path: "scoreboard/:dateParam?", element: <Scoreboard /> },
          { path: ":teamAbv/schedule", element: <TeamSchedule /> },
          { path: ":teamAbv/depth-chart", element: <DepthChart /> },
          { path: ":teamAbv", element: <HomePage /> },
          { path: ":teamAbv/:playerName", element: <PlayerDetailPage /> },
          { path: "boxscore/:gameId", element: <BoxScore /> },
          { path: "compare-players", element: <ComparePlayers /> },
          { path: ":teamAbv/team-stats", element: <TeamStatsPage /> },
          { path: "privacypolicy", element: <PrivacyPolicy /> },
          { path: "about", element: <AboutPage /> },
        ],
      },
    ],
  },
]);

export default router;
