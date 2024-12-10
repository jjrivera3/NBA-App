import axios, { AxiosRequestConfig } from "axios";

// Use Vite's import.meta.env to access the environment variable
const basketballAxiosInstance = axios.create({
  baseURL: "https://basketball-head.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY || "",
    "x-rapidapi-host": "basketball-head.p.rapidapi.com",
  },
});

class BasketballStatsAPIClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = <T>(config?: AxiosRequestConfig): Promise<T> => {
    return basketballAxiosInstance
      .get<T>(`${this.endpoint}/${config?.url || ""}`, config)
      .then((res) => res.data);
  };
}

export default BasketballStatsAPIClient;
