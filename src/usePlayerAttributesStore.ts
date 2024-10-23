// src/stores/usePlayerAttributesStore.ts
import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface PlayerAttributesState {
  firstColor: string | null;
  playerRating: {
    name: any;
    overallAttribute: any;
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
  averages: {
    insideScoringAverage: number;
    outsideScoringAverage: number;
    reboundingAverage: number;
    athleticismAverage: number;
    playmakingAverage: number;
    defenseAverage: number;
  } | null;
  setPlayerRating: (rating: any) => void;
  setFirstColor: (color: string) => void;
}

export const usePlayerAttributesStore = create<PlayerAttributesState>(
  (set) => ({
    playerRating: null,
    firstColor: null,
    averages: null, // Add a new state for storing averages
    setPlayerRating: (rating) => {
      set(() => {
        const calculateAverage = (attributes: number[]) =>
          Math.round(
            attributes.reduce((acc, curr) => acc + curr, 0) / attributes.length
          );

        // Calculate the averages here
        const insideScoringAverage = calculateAverage([
          rating.layup,
          rating.standingDunk,
          rating.drivingDunk,
          rating.postHook,
          rating.postFade,
          rating.postControl,
          rating.drawFoul,
          rating.hands,
        ]);

        const outsideScoringAverage = calculateAverage([
          rating.closeShot,
          rating.midRangeShot,
          rating.threePointShot,
          rating.freeThrow,
          rating.shotIQ,
          rating.offensiveConsistency,
        ]);

        const reboundingAverage = calculateAverage([
          rating.offensiveRebound,
          rating.defensiveRebound,
        ]);

        const athleticismAverage = calculateAverage([
          rating.speed,
          rating.agility,
          rating.strength,
          rating.vertical,
          rating.stamina,
          rating.hustle,
          rating.overallDurability,
        ]);

        const playmakingAverage = calculateAverage([
          rating.passAccuracy,
          rating.ballHandle,
          rating.speedWithBall,
          rating.passIQ,
          rating.passVision,
        ]);

        const defenseAverage = calculateAverage([
          rating.interiorDefense,
          rating.perimeterDefense,
          rating.steal,
          rating.block,
          rating.helpDefenseIQ,
          rating.passPerception,
          rating.defensiveConsistency,
        ]);

        // Return the new state with the playerRating and averages updated
        return {
          playerRating: rating,
          averages: {
            insideScoringAverage,
            outsideScoringAverage,
            reboundingAverage,
            athleticismAverage,
            playmakingAverage,
            defenseAverage,
          },
        };
      });
    },
    setFirstColor: (color) => set(() => ({ firstColor: color })),
  })
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Player Attributes Store", usePlayerAttributesStore);
}
