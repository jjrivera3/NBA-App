import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/fantasy-stats-api-client";
import NewsResponse from "../entities/NewsResponse";

interface NewsParams {
  playerID?: string;
  teamID?: string;
  teamAbv?: string;
  topNews?: string;
}

const useNews = (params: NewsParams) => {
  const apiClient = new APIClient<NewsResponse>("/getNBANews");

  return useQuery({
    queryKey: ["news", params], // Include params in queryKey for uniqueness
    queryFn: async () => {
      // Ensure recentNews is always true
      const queryParams = {
        ...params,
        recentNews: "true", // Always include recentNews
      };

      // Fetch the data using the API client with the provided query parameters
      const data = await apiClient.getAll({ params: queryParams });

      return data;
    },
    staleTime: 24 * 60 * 60 * 1000, // Cache the data for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchOnReconnect: false, // Disable refetch on reconnect
  });
};

export default useNews;
