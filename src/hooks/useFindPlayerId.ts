import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the API client
const fetchPlayerInfo = async (playerName: string) => {
  const options = {
    method: "GET",
    url: "https://tank01-fantasy-stats.p.rapidapi.com/getNBAPlayerInfo",
    params: { playerName, statsToGet: "averages" },
    headers: {
      "x-rapidapi-key": "256fd56781msh523522a92b2e3a3p117802jsndb7be0b6b755",
      "x-rapidapi-host": "tank01-fantasy-stats.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);
  return response.data;
};

// Create the custom hook
const useFindPlayerId = (playerName: string) => {
  // Ensure the name is formatted properly
  const formatName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formattedName = formatName(playerName);

  return useQuery({
    queryKey: ["playerInfo", formattedName],
    queryFn: () => fetchPlayerInfo(formattedName),
    enabled: !!playerName, // Enable query only if playerName is provided
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useFindPlayerId;
