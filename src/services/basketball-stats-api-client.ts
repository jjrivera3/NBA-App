import axios, { AxiosRequestConfig } from "axios";

// Routes through our serverless proxy, which injects the key server-side.
const basketballAxiosInstance = axios.create({
  baseURL: "/api/rapidapi",
  headers: {
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
