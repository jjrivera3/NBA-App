import { useEffect, useState } from "react";
import useTodaysGame from "./useTodaysGame";
import GameData from "../entities/GameData";
import useYesterdaysTodaysGame from "./useYesterdaysGame";
import Team from "../entities/Team";

const useGameData = () => {
  const [refetchInterval, setRefetchInterval] = useState<number | false>(false);
  const [staleTime, setStaleTime] = useState<number | undefined>(
    10 * 60 * 1000
  ); // Default staleTime for non-live games

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
      refetchInterval,
      staleTime,
    }
  );

  const { data: yestData, error: yestError } = useYesterdaysTodaysGame(
    {
      ...yesterdayDate,
      limit: "0",
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (todayData?.events) {
      const liveGameStatus = [
        "STATUS_IN_PROGRESS",
        "STATUS_HALFTIME",
        "STATUS_END_PERIOD",
      ];
      const hasLiveGames = todayData.events.some((game) => {
        const statusType = game.status.type.name;
        return liveGameStatus.includes(statusType);
      });

      console.log("Resetinterval is:", refetchInterval);

      setRefetchInterval(hasLiveGames ? 30000 : false); // 30 seconds or disable
      setStaleTime(hasLiveGames ? 0 : 10 * 60 * 1000); // No staleTime for live games, staleTime for non-live
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
      const gameDateFormatted = formatGameDate(gameDate);

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
      };
    })
    .sort((a, b) => {
      const statusOrder: { [key: string]: number } = {
        STATUS_IN_PROGRESS: 1,
        STATUS_END_PERIOD: 2,
        STATUS_HALFTIME: 3,
        STATUS_SCHEDULED: 4,
        STATUS_FINAL: 5,
      };

      const aOrder = statusOrder[a.statusType as keyof typeof statusOrder] || 6;
      const bOrder = statusOrder[b.statusType as keyof typeof statusOrder] || 6;

      if (aOrder !== bOrder) return aOrder - bOrder;
      if (a.statusType === "STATUS_FINAL" && b.statusType === "STATUS_FINAL") {
        if (a.isToday && !b.isToday) return -1;
        if (!a.isToday && b.isToday) return 1;
      }

      return 0;
    });

  return { games, isLoading: todayLoading, error: todayError || yestError };
};

export default useGameData;
