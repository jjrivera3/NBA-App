import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  loss: string;
  wins: number;
  espnLogo1: string;
  conference: string;
  teamName: string;
  teamCity: string;
  find(
    arg0: (team: import("../entities/TeamInfo").default) => boolean
  ): unknown;
  body: {
    teamId: string;
    seasonId: string;
    roster: T[]; // Roster is the array of players
  };
}

const fantasyStatsAxiosInstance = axios.create({
  baseURL: "https://tank01-fantasy-stats.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "256fd56781msh523522a92b2e3a3p117802jsndb7be0b6b755",
    "x-rapidapi-host": "tank01-fantasy-stats.p.rapidapi.com",
  },
});

class FantasyStatsAPIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Add config param to accept dynamic params like teamID and others
  getAll = (config?: AxiosRequestConfig) => {
    return fantasyStatsAxiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
}

export default FantasyStatsAPIClient;
