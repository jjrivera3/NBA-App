import { useEffect, useState } from "react";
import useTodaysGame from "./useTodaysGame";
import useYesterdaysTodaysGame from "./useYesterdaysGame";
import GameData from "../entities/GameData";
import Team from "../entities/Team";

const useGameData = () => {
  const [refetchInterval, setRefetchInterval] = useState<number | false>(false);
  const [staleTime, setStaleTime] = useState<number | undefined>(
    10 * 60 * 1000
  ); // Default staleTime for non-live games

  const formatGameDate = (date: Date) => {
    if (!date) return ""; // Ensure a string is always returned
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
    refetch, // Add refetch here
  } = useTodaysGame(
    {
      ...todayDate,
      limit: "0",
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval,
      staleTime,
    }
  );

  const {
    data: yestData,
    isLoading: yestLoading,
    error: yestError,
  } = useYesterdaysTodaysGame(
    {
      ...yesterdayDate,
      limit: "0",
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    }
  );

  const totalEvents =
    (yestData as GameData)?.events?.length +
    (todayData as GameData)?.events?.length;

  console.log(totalEvents);

  useEffect(() => {
    //@ts-ignore
    if (todayData?.events) {
      const liveGameStatus = [
        "STATUS_IN_PROGRESS",
        "STATUS_HALFTIME",
        "STATUS_END_PERIOD",
      ];
      //@ts-ignore
      const hasLiveGames = todayData.events.some((game) => {
        const statusType = game.status.type.name;
        return liveGameStatus.includes(statusType);
      });

      if (hasLiveGames) {
        setRefetchInterval(30000); // 30 seconds for live games
        setStaleTime(0); // No staleTime for live games
      } else {
        setRefetchInterval(false); // Disable refetch for non-live games
        setStaleTime(10 * 60 * 1000); // Set staleTime for non-live games
      }
    }
  }, [todayData]);

  const games = [
    ...((todayData as GameData)?.events || []),
    ...((yestData as GameData)?.events || []),
  ]
    .map((game) => {
      const competition = game.competitions?.[0];
      const homeTeam = competition?.competitors.find(
        (comp) => comp.homeAway === "home"
      )?.team as unknown as Team;
      const awayTeam = competition?.competitors.find(
        (comp) => comp.homeAway === "away"
      )?.team as unknown as Team;
      const homeScore = competition?.competitors.find(
        (comp) => comp.homeAway === "home"
      )?.score;
      const awayScore = competition?.competitors.find(
        (comp) => comp.homeAway === "away"
      )?.score;
      const statusType = game.status.type.name;
      const shortDetail = game.status.type.shortDetail || "";
      const gameDate = competition ? new Date(competition.date) : new Date();

      const gameDateFormatted =
        formatGameDate(gameDate) === formatGameDate(today)
          ? formatGameDate(today) // Use today's formatted date
          : formatGameDate(gameDate) || ""; // Default to an empty string if undefined

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
        gameID: game.id, // <-- Adding gameID here
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
        shortDetail,
        homeScore: [
          "STATUS_FINAL",
          "STATUS_IN_PROGRESS",
          "STATUS_HALFTIME",
          "STATUS_END_PERIOD",
        ].includes(statusType)
          ? homeScore
          : null,
        awayScore: [
          "STATUS_FINAL",
          "STATUS_IN_PROGRESS",
          "STATUS_HALFTIME",
          "STATUS_END_PERIOD",
        ].includes(statusType)
          ? awayScore
          : null,
        gameDateFormatted,
        odds:
          oddsDetails || overUnder
            ? { details: oddsDetails, overUnder: overUnder }
            : null,
        isToday: formatGameDate(gameDate) === formatGameDate(today),
        isYesterday: formatGameDate(gameDate) === formatGameDate(yesterday),
        startTime: gameDate,
      };
    })
    .sort((a, b) => {
      const liveGameStatusOrder: Record<string, number> = {
        STATUS_IN_PROGRESS: 1,
        STATUS_END_PERIOD: 2,
        STATUS_HALFTIME: 3,
        STATUS_SCHEDULED: 4,
        STATUS_FINAL: 5,
      };

      const aLiveOrder = liveGameStatusOrder[a.statusType] ?? 6;
      const bLiveOrder = liveGameStatusOrder[b.statusType] ?? 6;

      if (aLiveOrder !== bLiveOrder) return aLiveOrder - bLiveOrder;

      if (a.statusType === "STATUS_FINAL" && a.isToday && !b.isToday) return -1;
      if (b.statusType === "STATUS_FINAL" && b.isToday && !a.isToday) return 1;

      return a.startTime.getTime() - b.startTime.getTime();
    });

  const isLoading = todayLoading || yestLoading; // Combined loading state

  // Return the combined state with the refetch function
  return {
    games,
    isLoading, // Add isLoading for combined state
    error: todayError || yestError,
    refetch, // Ensure the refetch function is returned
  };
};

export default useGameData;
