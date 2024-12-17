import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Function to send a page view event to Google Analytics
const logPageView = (pathname: string) => {
  if (window.gtag) {
    window.gtag("config", "G-WTH0L8KBFD", { page_path: pathname });
  }
};

// Component to track route changes and render child routes
const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname);
  }, [location.pathname]);

  return <Outlet />; // Render nested routes
};

export default RouteChangeTracker;
