import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/fantasy-stats-api-client";

const useTeamScheduleScores = (teamAbv1: string) => {
  const apiClient = new APIClient("/getNBATeamSchedule");

  return useQuery({
    queryKey: ["teamScheduleResults", teamAbv1],
    queryFn: async () => {
      if (!teamAbv1) {
        throw new Error("No teamID provided"); // Handle case when teamId is null
      }
      const params = {
        teamAbv: teamAbv1,
        season: "2025", // Use the desired season here
      };
      const data = await apiClient.getAll({ params });
      return data;
    },
    enabled: !!teamAbv1, // Ensure the query only runs if teamId is available
  });
};

export default useTeamScheduleScores;
