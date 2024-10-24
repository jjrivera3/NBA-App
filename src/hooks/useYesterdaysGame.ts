import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/nba-api-client";

interface TodaysGameParams {
  year: string;
  month: string;
  day: string;
  limit: string;
}

const useYesterdaysTodaysGame = (
  params: TodaysGameParams,
  p0: { refetchOnWindowFocus: boolean; staleTime: number }
) => {
  const apiClient = new APIClient("/nbascoreboard");

  return useQuery({
    queryKey: ["yesterdaysGame", params], // Include params in queryKey for uniqueness
    queryFn: async () => {
      const queryParams = {
        ...params,
      };

      // Fetch the data using the API client with the provided query parameters
      const data = await apiClient.getAll({ params: queryParams });

      return data;
    },
    staleTime: p0.staleTime, // Use the provided staleTime parameter
    refetchOnWindowFocus: p0.refetchOnWindowFocus, // Use the provided refetchOnWindowFocus parameter
    refetchOnReconnect: false, // Disable refetch on reconnect
  });
};

export default useYesterdaysTodaysGame;
