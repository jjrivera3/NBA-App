import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetGameID = (teamId: any, season = "2025", _options = {}) => {
  return useQuery({
    queryKey: ["gameData", teamId],
    queryFn: async () => {
      if (!teamId) throw new Error("teamId is required");

      const response = await axios.request({
        method: "GET",
        // Routes through our serverless proxy, which injects the key server-side.
        url: "/api/rapidapi/nba-schedule-team",
        params: {
          season: season,
          teamId: teamId,
        },
        headers: {
          "x-rapidapi-host": "api-basketball-nba.p.rapidapi.com",
        },
      });

      return response.data;
    },
    enabled: !!teamId, // Only run if teamId is provided
    // refetchOnWindowFocus: options.refetchOnWindowFocus ?? false,
    // refetchInterval: options.refetchInterval ?? false,
    // staleTime: options.staleTime ?? 10 * 60 * 1000,
    // keepPreviousData: true,
  });
};

export default useGetGameID;
