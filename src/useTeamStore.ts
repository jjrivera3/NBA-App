import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TeamState {
  conference: any;
  firstColor: string | null;
  teamID: string | null;
  espnLogo1: string | null;
  teamCity: string | null;
  teamName: string | null;
  wins: number | null;
  loss: number | null;
  playersWithRatings: any[];
  setTeamData: (data: {
    loss: string | number | null | undefined;
    wins: string | number | null | undefined;
    conference: any;
    firstColor: string;
    teamID: string;
    espnLogo1: string;
    teamCity: string;
    teamName: string;
  }) => void;
  setPlayersWithRatings: (players: any[]) => void;
}

export const useTeamStore = create(
  persist<TeamState>(
    (set) => ({
      firstColor: null,
      teamID: null,
      espnLogo1: null,
      teamCity: null,
      teamName: null,
      conference: null,
      wins: null,
      loss: null,
      playersWithRatings: [],
      setTeamData: (data) =>
        set(() => ({
          firstColor: data.firstColor,
          teamID: data.teamID,
          espnLogo1: data.espnLogo1,
          teamCity: data.teamCity,
          teamName: data.teamName,
          conference: data.conference,
          wins: data.wins ? Number(data.wins) : null, // Convert to number
          loss: data.loss ? Number(data.loss) : null, // Convert to number
        })),
      setPlayersWithRatings: (players) =>
        set(() => ({
          playersWithRatings: players,
        })),
    }),
    {
      name: "team-store", // The key in localStorage
      //@ts-ignore
      partialize: (state) => ({
        playersWithRatings: state.playersWithRatings,
        firstColor: state.firstColor,
        teamName: state.teamName,
        teamCity: state.teamCity,
        wins: state.wins,
        loss: state.loss,
        espnLogo1: state.espnLogo1,
        teamID: state.teamID, // Ensure all required properties are included
        conference: state.conference, // Include conference to match TeamState
      }),
    }
  )
);

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Team Store", useTeamStore);
