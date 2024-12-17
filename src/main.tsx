import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes";
import theme from "./theme";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Get the root element from the DOM
const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  );
} else {
  console.error("Root element not found");
}
