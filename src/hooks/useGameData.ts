import useTodaysGame from "./useTodaysGame";
import GameData from "../entities/GameData";

type Team = {
  abbreviation: string;
  logo: string;
  color?: string;
};

const useGameData = () => {
  const formatDate = (date: Date) => ({
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, "0"),
    day: date.getDate().toString().padStart(2, "0"),
  });

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todayDate = formatDate(today);
  const yesterdayDate = formatDate(yesterday);

  const {
    data: todayData,
    isLoading: todayLoading,
    error: todayError,
  } = useTodaysGame(
    {
      ...todayDate,
      limit: "0",
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    }
  );

  const { data: yestData, error: yestError } = useTodaysGame(
    {
      ...yesterdayDate,
      limit: "0",
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    }
  );

  console.log(todayData);

  const games = [
    ...((todayData as GameData)?.events || []),
    ...((yestData as GameData)?.events || []),
  ].map((game) => {
    const competition = game.competitions?.[0];
    const homeTeam = competition?.competitors.find(
      (comp) => comp.homeAway === "home"
    )?.team as Team;
    const awayTeam = competition?.competitors.find(
      (comp) => comp.homeAway === "away"
    )?.team as Team;
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

    // Check if odds should be shown (only if game is not final)
    const oddsDetails =
      statusType !== "STATUS_FINAL"
        ? (competition as any)?.odds?.[0]?.details ||
          (game as any)?.odds?.[0]?.details ||
          ""
        : "";
    const overUnder =
      statusType !== "STATUS_FINAL"
        ? (competition as any)?.odds?.[0]?.overUnder ||
          (game as any)?.odds?.[0]?.overUnder ||
          ""
        : "";

    return {
      homeTeam: homeTeam?.abbreviation || "",
      awayTeam: awayTeam?.abbreviation || "",
      time: gameDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      homeLogo: homeTeam?.logo || "",
      awayLogo: awayTeam?.logo || "",
      homeTeamColor: homeTeam?.color ? `#${homeTeam.color}` : "#000000",
      awayTeamColor: awayTeam?.color ? `#${awayTeam.color}` : "#000000",
      statusType,
      homeScore: statusType === "STATUS_FINAL" ? homeScore : null,
      awayScore: statusType === "STATUS_FINAL" ? awayScore : null,
      gameDateFormatted,
      odds:
        statusType !== "STATUS_FINAL"
          ? { details: oddsDetails, overUnder: overUnder }
          : null,
    };
  });

  return { games, isLoading: todayLoading, error: todayError || yestError };
};

export default useGameData;
