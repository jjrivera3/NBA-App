export interface ScoringAverages {
  insideScoring: number;
  outsideScoring: number;
  rebounding: number;
  athleticism: number;
  defense: number;
}

export const calculateAverage = (attributes: number[]): number => {
  return Math.round(
    attributes.reduce((acc, curr) => acc + curr, 0) / attributes.length
  );
};

export const calculateScoringAverages = (rating: any) => {
  return {
    insideScoring: calculateAverage([
      rating.layup || 0,
      rating.standingDunk || 0,
      rating.drivingDunk || 0,
      rating.postHook || 0,
      rating.postFade || 0,
      rating.postControl || 0,
      rating.drawFoul || 0,
      rating.hands || 0,
    ]),
    outsideScoring: calculateAverage([
      rating.closeShot || 0,
      rating.midRangeShot || 0,
      rating.threePointShot || 0,
      rating.freeThrow || 0,
      rating.shotIQ || 0,
      rating.offensiveConsistency || 0,
    ]),
    rebounding: calculateAverage([
      rating.offensiveRebound || 0,
      rating.defensiveRebound || 0,
    ]),
    athleticism: calculateAverage([
      rating.speed || 0,
      rating.agility || 0,
      rating.strength || 0,
      rating.vertical || 0,
      rating.stamina || 0,
      rating.hustle || 0,
      rating.overallDurability || 0,
    ]),
    defense: calculateAverage([
      rating.interiorDefense || 0,
      rating.perimeterDefense || 0,
      rating.steal || 0,
      rating.block || 0,
      rating.helpDefenseIQ || 0,
      rating.passPerception || 0,
      rating.defensiveConsistency || 0,
    ]),
  };
};
