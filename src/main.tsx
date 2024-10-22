import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes";
import theme from "./theme";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Get the root element from the DOM
const container = document.getElementById("root");

if (container) {
  // Create the React root using React 18's createRoot API
  const root = createRoot(container);

  // Render your application using root.render()
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
