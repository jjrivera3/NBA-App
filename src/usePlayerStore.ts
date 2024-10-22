// src/stores/usePlayerStore.ts
import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import Player from "./entities/Player";

interface PlayerState {
  player: Player | null;
  firstColor: string | null;
  teamID: string | null;
  espnLogo1: string | null;

  teamCity: string | null;
  teamName: string | null;
  setPlayerData: (data: {
    player: Player;
    firstColor: string;
    teamID: string;
    espnLogo1: string;
    teamCity: string;
    teamName: string;
  }) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  player: null,
  firstColor: null,
  teamID: null,
  espnLogo1: null,
  teamCity: null,
  teamName: null,
  setPlayerData: (data) =>
    set(() => ({
      player: data.player,
      firstColor: data.firstColor,
      teamID: data.teamID,
      espnLogo1: data.espnLogo1,
      teamCity: data.teamCity,
      teamName: data.teamName,
    })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Player Store", usePlayerStore);
