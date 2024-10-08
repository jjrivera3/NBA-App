// src/hooks/useNextGame.ts
import GameSchedule from "../entities/GameSchedule";

const useNextGame = (
  teamSchedule: GameSchedule[] | Record<string, GameSchedule> | null
) => {
  if (!teamSchedule) return null;

  // If teamSchedule is an object, convert it to an array
  const scheduleArray = Array.isArray(teamSchedule)
    ? teamSchedule
    : Object.values(teamSchedule);

  return scheduleArray.sort((a, b) => a.gameDate.localeCompare(b.gameDate))[0];
};

export default useNextGame;
