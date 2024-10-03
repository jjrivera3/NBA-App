import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import TeamResponse from "../entities/TeamResponse";

const useTeamInfo = (teamId: string | null) => {
  const apiClient = new APIClient<TeamResponse>("/getNBATeams");

  return useQuery({
    queryKey: ["teamInfo", teamId],
    queryFn: async () => {
      if (!teamId) return null; // Ensure that teamId exists

      // Pass the teamId as a query parameter to request only the specific team data
      const data = await apiClient.getAll({
        params: {
          schedules: "false",
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
