export const calculateAverage = (attributes: number[]): number =>
  Math.round(
    attributes.reduce((acc, curr) => acc + curr, 0) / attributes.length
  );

export const calculateInsideScoringAverage = (
  playerRating: any
): number | null =>
  playerRating
    ? calculateAverage([
        playerRating.layup || 0,
        playerRating.standingDunk || 0,
        playerRating.drivingDunk || 0,
        playerRating.postHook || 0,
        playerRating.postFade || 0,
        playerRating.postControl || 0,
        playerRating.drawFoul || 0,
        playerRating.hands || 0,
      ])
    : null;

export const calculateOutsideScoringAverage = (
  playerRating: any
): number | null =>
  playerRating
    ? calculateAverage([
        playerRating.closeShot || 0,
        playerRating.midRangeShot || 0,
        playerRating.threePointShot || 0,
        playerRating.freeThrow || 0,
        playerRating.shotIQ || 0,
        playerRating.offensiveConsistency || 0,
      ])
    : null;

export const calculateReboundingAverage = (playerRating: any): number | null =>
  playerRating
    ? calculateAverage([
        playerRating.offensiveRebound || 0,
        playerRating.defensiveRebound || 0,
      ])
    : null;

export const calculateAthleticismAverage = (playerRating: any): number | null =>
  playerRating
    ? calculateAverage([
        playerRating.speed || 0,
        playerRating.agility || 0,
        playerRating.strength || 0,
        playerRating.vertical || 0,
        playerRating.stamina || 0,
        playerRating.hustle || 0,
        playerRating.overallDurability || 0,
      ])
    : null;

export const calculateDefenseAverage = (playerRating: any): number | null =>
  playerRating
    ? calculateAverage([
        playerRating.interiorDefense || 0,
        playerRating.perimeterDefense || 0,
        playerRating.steal || 0,
        playerRating.block || 0,
        playerRating.helpDefenseIQ || 0,
        playerRating.passPerception || 0,
        playerRating.defensiveConsistency || 0,
      ])
    : null;
