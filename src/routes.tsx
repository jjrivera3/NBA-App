import { createBrowserRouter } from "react-router-dom";
import PlayerDetailPage from "./pages/PlayerDetailPage";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PlayerGrid from "./components/PlayerGrid";

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
        path: "team/:teamId", // Expect `teamId` from the URL
        element: <PlayerGrid selectedTeamId={null} />,
      },
      {
        path: ":teamName/:playerName",
        element: <PlayerDetailPage />,
      },
    ],
  },
]);

export default router;
