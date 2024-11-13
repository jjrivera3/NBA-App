import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetGameID = (teamId: any, season = "2025", _options = {}) => {
  return useQuery({
    queryKey: ["gameData", teamId],
    queryFn: async () => {
      if (!teamId) throw new Error("teamId is required");

      const response = await axios.request({
        method: "GET",
        url: "https://api-basketball-nba.p.rapidapi.com/nba-schedule-team",
        params: {
          season: season,
          teamId: teamId,
        },
        headers: {
          "x-rapidapi-key":
            "256fd56781msh523522a92b2e3a3p117802jsndb7be0b6b755",
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
