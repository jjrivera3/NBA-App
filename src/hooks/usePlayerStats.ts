import { useQuery } from "@tanstack/react-query";
import BasketballStatsAPIClient from "../services/basketball-stats-api-client";
import { PlayerStats, UsePlayerStatsData } from "../entities/PlayerTypes";

const usePlayerStats = (playerId: string | null) => {
  const apiClient = new BasketballStatsAPIClient("/players");

  return useQuery<UsePlayerStatsData | null>({
    queryKey: ["playerStats", playerId],
    queryFn: async () => {
      if (!playerId) return null;

      const playerStatsEndpoint = `${playerId}/stats/PerGame`;

      // Fetch player stats and assert the type as `PlayerStats`
      const playerStats = (await apiClient.getAll({
        url: playerStatsEndpoint,
        params: { seasonType: "Regular" },
      })) as PlayerStats;

      return {
        playerStats,
      };
    },
    enabled: !!playerId,
    staleTime: 24 * 60 * 60 * 1000, // Cache the data for 24 hours
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default usePlayerStats;
