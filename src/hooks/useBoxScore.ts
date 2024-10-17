import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/nba-api-client";

interface Options {
  refetchOnWindowFocus: boolean;
  refetchInterval?: number | false;
  staleTime?: number;
}

const useBoxScore = (gameId: string, options: Options) => {
  const apiClient = new APIClient("/nbabox");

  return useQuery({
    queryKey: ["boxScore", gameId],
    queryFn: async () => {
      const queryParams = { id: gameId }; // Use gameId directly here
      const data = await apiClient.getAll({ params: queryParams });
      return data;
    },
    refetchOnWindowFocus: options.refetchOnWindowFocus,
    refetchInterval: options.refetchInterval,
    staleTime: options.staleTime ?? 10 * 60 * 1000, // Adjust staleTime as needed
    //@ts-ignore
    keepPreviousData: true, // Keep the current data while fetching new data
  });
};

export default useBoxScore;
