// useGameStatus.ts

import { useMemo } from "react";

export const useGameStatus = (gameStatusType: string) => {
  const isScheduled = useMemo(
    () => gameStatusType === "STATUS_SCHEDULED",
    [gameStatusType]
  );

  const isFinal = useMemo(
    () => gameStatusType === "STATUS_FINAL",
    [gameStatusType]
  );

  const isInProgress = useMemo(
    () =>
      gameStatusType === "STATUS_IN_PROGRESS" ||
      gameStatusType === "STATUS_HALFTIME" ||
      gameStatusType === "STATUS_END_PERIOD",
    [gameStatusType]
  );

  return { isScheduled, isFinal, isInProgress };
};

export const useWinnerStatus = (
  isFinal: boolean,
  awayScore: string,
  homeScore: string
) => {
  const isAwayWinner = useMemo(
    () => isFinal && parseInt(awayScore) > parseInt(homeScore),
    [isFinal, awayScore, homeScore]
  );

  const isHomeWinner = useMemo(
    () => isFinal && parseInt(homeScore) > parseInt(awayScore),
    [isFinal, awayScore, homeScore]
  );

  return { isAwayWinner, isHomeWinner };
};
