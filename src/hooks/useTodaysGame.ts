import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/nba-api-client";
import GameData from "../entities/GameData";

interface TodaysGameParams {
  year: string;
  month: string;
  day: string;
  limit: string;
}

const useTodaysGame = (
  params: TodaysGameParams,
  options: {
    refetchOnWindowFocus: boolean;
    refetchInterval?: number | false;
    staleTime?: number;
  }
) => {
  const apiClient = new APIClient("/nbascoreboard");

  return useQuery<GameData>({
    queryKey: ["todaysGame", params],
    queryFn: async () => {
      const queryParams = { ...params };
      const data = await apiClient.getAll<GameData>({ params: queryParams });
      return data;
    },
    refetchOnWindowFocus: options.refetchOnWindowFocus,
    refetchInterval: options.refetchInterval,
    refetchOnReconnect: false,
    staleTime: options.staleTime, // Substitute cacheTime with staleTime
  });
};

export default useTodaysGame;
