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
    return nbaAxiosInstance
      .get<T>(`${this.endpoint}/${config?.url || ""}`, config)
      .then((res) => res.data);
  };
}

export default NBAAPIClient;
