import { useQuery } from "@tanstack/react-query";
import TeamResponse from "../entities/TeamResponse";
import FantasyStatsAPIClient from "../services/fantasy-stats-api-client";

const useDepthChart = (teamId: string) => {
  const apiClient = new FantasyStatsAPIClient<TeamResponse>(
    "/getNBADepthCharts"
  );

  return useQuery({
    queryKey: teamId ? ["depthChart", teamId] : ["depthChart"],
    queryFn: async () => {
      // Pass the teamId if it exists, else fetch all teams
      const data = await apiClient.getAll();

      return data;
    },
    enabled: true,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useDepthChart;
