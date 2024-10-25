import GameSchedule from "../entities/GameSchedule";

const useNextGame = (
  teamSchedule: GameSchedule[] | Record<string, GameSchedule> | null
) => {
  if (!teamSchedule) return null;

  // If teamSchedule is an object, convert it to an array
  const scheduleArray = Array.isArray(teamSchedule)
    ? teamSchedule
    : Object.values(teamSchedule);

  // Get today's date in 'YYYYMMDD' format
  const today = new Date();
  const todayString = today.toISOString().split("T")[0].replace(/-/g, "");

  // Filter for upcoming games including today
  const upcomingGames = scheduleArray.filter(
    (game) => game.gameDate >= todayString
  );

  // Sort upcoming games by date and return the first one
  const nextGame = upcomingGames.sort((a, b) =>
    a.gameDate.localeCompare(b.gameDate)
  )[0];

  return nextGame || null;
};

export default useNextGame;
