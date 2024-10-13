import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/nba-api-client";

interface TodaysGameParams {
  year: string;
  month: string;
  day: string;
  limit: string;
}

const useTodaysGame = (
  params: TodaysGameParams,
  p0: { refetchOnWindowFocus: boolean }
) => {
  const apiClient = new APIClient("/nbascoreboard");

  return useQuery({
    queryKey: ["todaysGame", params], // Include params in queryKey for uniqueness
    queryFn: async () => {
      const queryParams = {
        ...params,
      };

      // Fetch the data using the API client with the provided query parameters
      const data = await apiClient.getAll({ params: queryParams });

      return data;
    },

    refetchOnWindowFocus: p0.refetchOnWindowFocus, // Use the provided refetchOnWindowFocus parameter
    refetchOnReconnect: false, // Disable refetch on reconnect
    // refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export default useTodaysGame;
