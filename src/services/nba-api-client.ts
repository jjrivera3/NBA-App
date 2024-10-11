import axios, { AxiosRequestConfig } from "axios";

const nbaAxiosInstance = axios.create({
  baseURL: "https://api-basketball-nba.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "256fd56781msh523522a92b2e3a3p117802jsndb7be0b6b755",
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
