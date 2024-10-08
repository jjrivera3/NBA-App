import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PlayerDetailPage from "./pages/PlayerDetailPage";
import TeamSchedule from "./components/TeamSchedule";

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
        path: ":teamName/:playerName",
        element: <PlayerDetailPage />,
      },
    ],
  },
]);

export default router;
