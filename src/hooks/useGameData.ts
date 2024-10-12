import useTodaysGame from "./useTodaysGame";
import GameData from "../entities/GameData";

type Team = {
  abbreviation: string;
  logo: string;
  color?: string;
};

const useGameData = () => {
  // Function to format date as "Oct 11"
  const formatGameDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todayDate = {
    year: today.getFullYear().toString(),
    month: (today.getMonth() + 1).toString().padStart(2, "0"),
    day: today.getDate().toString().padStart(2, "0"),
  };

  const yesterdayDate = {
    year: yesterday.getFullYear().toString(),
    month: (yesterday.getMonth() + 1).toString().padStart(2, "0"),
    day: yesterday.getDate().toString().padStart(2, "0"),
  };

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
    const shortDetail = game.status.type.shortDetail || "";
    const gameDate = competition ? new Date(competition.date) : new Date();
    const gameDateFormatted = formatGameDate(gameDate); // Use the formatted date

    // Show odds only if the game is not in progress, halftime, final, or end of period
    const oddsDetails =
      statusType !== "STATUS_FINAL" &&
      statusType !== "STATUS_IN_PROGRESS" &&
      statusType !== "STATUS_HALFTIME" &&
      statusType !== "STATUS_END_PERIOD"
        ? (competition as any)?.odds?.[0]?.details ||
          (game as any)?.odds?.[0]?.details ||
          ""
        : "";
    const overUnder =
      statusType !== "STATUS_FINAL" &&
      statusType !== "STATUS_IN_PROGRESS" &&
      statusType !== "STATUS_HALFTIME" &&
      statusType !== "STATUS_END_PERIOD"
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
      shortDetail:
        statusType === "STATUS_IN_PROGRESS" ||
        statusType === "STATUS_HALFTIME" ||
        statusType === "STATUS_END_PERIOD"
          ? shortDetail
          : "",
      homeScore:
        statusType === "STATUS_FINAL" ||
        statusType === "STATUS_IN_PROGRESS" ||
        statusType === "STATUS_HALFTIME" ||
        statusType === "STATUS_END_PERIOD"
          ? homeScore
          : null,
      awayScore:
        statusType === "STATUS_FINAL" ||
        statusType === "STATUS_IN_PROGRESS" ||
        statusType === "STATUS_HALFTIME" ||
        statusType === "STATUS_END_PERIOD"
          ? awayScore
          : null,
      gameDateFormatted, // Using the new date format here
      odds:
        statusType !== "STATUS_FINAL" &&
        statusType !== "STATUS_IN_PROGRESS" &&
        statusType !== "STATUS_HALFTIME" &&
        statusType !== "STATUS_END_PERIOD"
          ? { details: oddsDetails, overUnder: overUnder }
          : null,
    };
  });

  return { games, isLoading: todayLoading, error: todayError || yestError };
};

export default useGameData;
