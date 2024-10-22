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
  playerRating: {
    name: string;
    overallAttribute: number;
    closeShot: number;
    midRangeShot: number;
    threePointShot: number;
    freeThrow: number;
    shotIQ: number;
    offensiveConsistency: number;
    speed: number;
    agility: number;
    strength: number;
    vertical: number;
    stamina: number;
    hustle: number;
    overallDurability: number;
    layup: number;
    standingDunk: number;
    drivingDunk: number;
    postHook: number;
    postFade: number;
    postControl: number;
    drawFoul: number;
    hands: number;
    passAccuracy: number;
    ballHandle: number;
    speedWithBall: number;
    passIQ: number;
    passVision: number;
    interiorDefense: number;
    perimeterDefense: number;
    steal: number;
    block: number;
    helpDefenseIQ: number;
    passPerception: number;
    defensiveConsistency: number;
    offensiveRebound: number;
    defensiveRebound: number;
  } | null;
  setPlayerData: (data: {
    player: Player;
    firstColor: string;
    teamID: string;
    espnLogo1: string;
    teamCity: string;
    teamName: string;
    playerRating: PlayerState["playerRating"]; // Add playerRating
  }) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  player: null,
  firstColor: null,
  teamID: null,
  espnLogo1: null,
  teamCity: null,
  teamName: null,
  playerRating: null, // Initial player rating is null
  setPlayerData: (data) =>
    set(() => ({
      player: data.player,
      firstColor: data.firstColor,
      teamID: data.teamID,
      espnLogo1: data.espnLogo1,
      teamCity: data.teamCity,
      teamName: data.teamName,
      playerRating: data.playerRating, // Set player rating from data
    })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Player Store", usePlayerStore);
