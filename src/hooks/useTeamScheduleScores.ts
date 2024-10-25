import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/fantasy-stats-api-client";

const useTeamScheduleScores = (teamId: string | null) => {
  const apiClient = new APIClient("/getNBATeamSchedule");

  return useQuery({
    queryKey: ["teamScheduleResults", teamId],
    queryFn: async () => {
      if (!teamId) {
        throw new Error("No teamID provided"); // Handle case when teamId is null
      }
      const params = {
        teamID: teamId,
        season: "2025", // Use the desired season here
      };
      const data = await apiClient.getAll({ params });
      return data;
    },
    enabled: !!teamId, // Ensure the query only runs if teamId is available
  });
};

export default useTeamScheduleScores;
