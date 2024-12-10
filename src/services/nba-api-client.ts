import axios, { AxiosRequestConfig } from "axios";

const nbaAxiosInstance = axios.create({
  baseURL: "https://api-basketball-nba.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY || "",
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
