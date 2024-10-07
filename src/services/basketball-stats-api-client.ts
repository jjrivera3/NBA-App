import axios, { AxiosRequestConfig } from "axios";

const basketballAxiosInstance = axios.create({
  baseURL: "https://basketball-head.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "256fd56781msh523522a92b2e3a3p117802jsndb7be0b6b755",
    "x-rapidapi-host": "basketball-head.p.rapidapi.com",
  },
});

class BasketballStatsAPIClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = <T>(config?: AxiosRequestConfig): Promise<T> => {
    const fullUrl = `${basketballAxiosInstance.defaults.baseURL}${
      this.endpoint
    }/${config?.url || ""}`;

    return basketballAxiosInstance
      .get<T>(`${this.endpoint}/${config?.url || ""}`, config)
      .then((res) => res.data);
  };
}

export default BasketballStatsAPIClient;
