import { useEffect } from "react";
import useTodaysGame from "./useTodaysGame";
import GameData from "../entities/GameData";

// Define the Team type here if it's not available elsewhere
type Team = {
  abbreviation: string;
  logo: string;
  color?: string; // Optional property to avoid errors if color is missing
};

const useGameData = () => {
  const formatDate = (date: Date) => ({
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, "0"),
    day: date.getDate().toString().padStart(2, "0"),
  });

  // Get today's and yesterday's dates
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Format dates for fetching
  const todayDate = formatDate(today);
  const yesterdayDate = formatDate(yesterday);

  // Fetch games data
  const {
    data: todayData,
    isLoading: todayLoading,
    error: todayError,
  } = useTodaysGame({
    ...todayDate,
    limit: "0",
  });
  const { data: yestData, error: yestError } = useTodaysGame({
    ...yesterdayDate,
    limit: "0",
  });

  useEffect(() => {
    if (todayError) console.error("Error fetching today's games:", todayError);
    if (yestError)
      console.error("Error fetching yesterday's games:", yestError);
  }, [todayError, yestError]);

  // Process and format game data
  const games = [
    ...((todayData as GameData)?.events || []),
    ...((yestData as GameData)?.events || []),
  ].map((game) => {
    const competition = game.competitions?.[0];
    const homeTeam = competition?.competitors.find(
      (comp) => comp.homeAway === "home"
    )?.team as Team; // Use Team type
    const awayTeam = competition?.competitors.find(
      (comp) => comp.homeAway === "away"
    )?.team as Team; // Use Team type
    const homeScore = competition?.competitors.find(
      (comp) => comp.homeAway === "home"
    )?.score;
    const awayScore = competition?.competitors.find(
      (comp) => comp.homeAway === "away"
    )?.score;
    const statusType = game.status.type.name;
    const gameDate = competition ? new Date(competition.date) : new Date();
    const gameDateFormatted = `${
      gameDate.getMonth() + 1
    }/${gameDate.getDate()}`;

    return {
      homeTeam: homeTeam?.abbreviation || "",
      awayTeam: awayTeam?.abbreviation || "",
      time: gameDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      homeLogo: homeTeam?.logo || "",
      awayLogo: awayTeam?.logo || "",
      homeTeamColor: homeTeam?.color ? `#${homeTeam.color}` : "#000000", // Ensure color exists or default to black
      awayTeamColor: awayTeam?.color ? `#${awayTeam.color}` : "#000000", // Ensure color exists or default to black
      statusType,
      homeScore: statusType === "STATUS_FINAL" ? homeScore : null,
      awayScore: statusType === "STATUS_FINAL" ? awayScore : null,
      gameDateFormatted,
    };
  });

  return { games, isLoading: todayLoading, error: todayError || yestError };
};

export default useGameData;
