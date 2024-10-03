import { createBrowserRouter } from "react-router-dom";
import PlayerDetailPage from "./pages/PlayerDetailPage";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // The Layout that includes TeamList and the Outlet
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // Default route
        element: <HomePage />, // Render HomePage or a message when no team is selected
      },
      {
        path: ":teamAbv", // Dynamic route for team abbreviation
        element: <HomePage />, // HomePage handles showing PlayerGrid when a team is selected
      },
      {
        path: ":teamName/:playerName", // Player detail route
        element: <PlayerDetailPage />,
      },
    ],
  },
]);

export default router;
