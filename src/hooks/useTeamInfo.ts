import { useQuery } from "@tanstack/react-query";
import TeamResponse from "../entities/TeamResponse";
import FantasyStatsAPIClient from "../services/fantasy-stats-api-client";

const useTeamInfo = (teamId: string | null = null, params = {}) => {
  const apiClient = new FantasyStatsAPIClient<TeamResponse>("/getNBATeams");

  return useQuery({
    queryKey: teamId ? ["teamInfo", teamId] : ["allTeams"], // Cache key based on specific team or all teams
    queryFn: async () => {
      // Pass the teamId if it exists, else fetch all teams
      const data = await apiClient.getAll({
        params: {
          teamId: teamId || undefined,
          ...params, // Spread any additional params here
          statsToGet: "averages",
        },
      });

      return data;
    },
    enabled: true,
    staleTime: 24 * 60 * 60 * 1000, // Cache the data for 24 hours
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useTeamInfo;
