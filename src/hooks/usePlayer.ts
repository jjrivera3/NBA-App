import { useQuery } from "@tanstack/react-query";
import Player from "../entities/Player";
import FantasyStatsAPIClient from "../services/fantasy-stats-api-client";

const usePlayers = (teamId: string | null) => {
  const apiClient = new FantasyStatsAPIClient<Player>("/getNBATeamRoster");

  return useQuery({
    queryKey: ["roster", teamId],
    queryFn: async () => {
      if (!teamId) return null; // Ensure that teamId exists

      // Pass the teamId as a query parameter and log the result
      const data = await apiClient.getAll({
        params: {
          teamID: teamId, // Dynamically set teamID
          statsToGet: "averages", // Optional parameter to fetch averages or other stats
        },
      });

      return data;
    },
    enabled: !!teamId, // Only run the query if teamId is provided
    staleTime: 24 * 60 * 60 * 1000, // Cache the data for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchOnReconnect: false, // Disable refetch on reconnect
  });
};

export default usePlayers;
