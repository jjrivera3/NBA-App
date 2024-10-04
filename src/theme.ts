import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const breakpoints = {
  sm: "480px", // Small screens like mobile devices
  md: "768px", // Medium screens like tablets
  lg: "1024px", // Large screens like laptops
  xl: "1320px", // Extra large screens like desktops (your custom value)
  "2xl": "1536px", // Optional for very large screens
};

const theme = extendTheme({
  config,
  breakpoints, // Apply the updated breakpoints here
  styles: {
    global: () => ({
      body: {
        bg: "#1f2024",
      },
    }),
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#111",
    },
  },
});

export default theme;
