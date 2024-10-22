// src/stores/useTeamStore.ts
import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface TeamState {
  firstColor: string | null;
  teamID: string | null;
  espnLogo1: string | null;
  teamCity: string | null;
  teamName: string | null;
  setTeamData: (data: {
    firstColor: string;
    teamID: string;
    espnLogo1: string;
    teamCity: string;
    teamName: string;
  }) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  firstColor: null,
  teamID: null,
  espnLogo1: null,
  teamCity: null,
  teamName: null,
  setTeamData: (data) =>
    set(() => ({
      firstColor: data.firstColor,
      teamID: data.teamID,
      espnLogo1: data.espnLogo1,
      teamCity: data.teamCity,
      teamName: data.teamName,
    })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Team Store", useTeamStore);
