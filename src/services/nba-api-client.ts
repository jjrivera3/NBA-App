import axios, { AxiosRequestConfig } from "axios";

const nbaAxiosInstance = axios.create({
  // Routes through our serverless proxy, which injects the key server-side.
  baseURL: "/api/rapidapi",
  headers: {
    "x-rapidapi-host": "api-basketball-nba.p.rapidapi.com",
  },
});

class NBAAPIClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = <T>(config?: AxiosRequestConfig): Promise<T> => {
    // Only append config.url when present; otherwise a trailing slash
    // (e.g. "/nbascoreboard/") makes RapidAPI 404.
    const path = config?.url ? `${this.endpoint}/${config.url}` : this.endpoint;
    return nbaAxiosInstance.get<T>(path, config).then((res) => res.data);
  };
}

export default NBAAPIClient;
