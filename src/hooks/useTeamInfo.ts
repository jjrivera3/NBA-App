import { useQuery } from "@tanstack/react-query";
import TeamResponse from "../entities/TeamResponse";
import FantasyStatsAPIClient from "../services/fantasy-stats-api-client";

const useTeamInfo = (teamId: string | null) => {
  const apiClient = new FantasyStatsAPIClient<TeamResponse>("/getNBATeams");

  return useQuery({
    queryKey: ["teamInfo", teamId],
    queryFn: async () => {
      if (!teamId) return null; // Ensure that teamId exists

      // Pass the teamId as a query parameter to request only the specific team data
      const data = await apiClient.getAll({
        params: {
          schedules: "true",
          rosters: "true",
          topPerformers: "false",
          teamStats: "false",
          statsToGet: "averages",
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

export default useTeamInfo;
