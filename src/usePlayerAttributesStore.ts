import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface PlayerAttributesState {
  playerRating: {
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
  setPlayerRating: (rating: any) => void;
}

export const usePlayerAttributesStore = create<PlayerAttributesState>(
  (set) => ({
    playerRating: null,
    setPlayerRating: (rating) => set(() => ({ playerRating: rating })),
  })
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Player Attributes Store", usePlayerAttributesStore);
}
