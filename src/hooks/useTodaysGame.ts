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
  p0: { refetchOnWindowFocus: boolean; staleTime: number }
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
    staleTime: 24 * 60 * 60 * 1000, // Cache the data for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchOnReconnect: false, // Disable refetch on reconnect
  });
};

export default useTodaysGame;
