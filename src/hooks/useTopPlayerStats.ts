import { useEffect, useState } from "react";
import useTeamInfo from "../hooks/useTeamInfo";

interface Player {
  longName?: string;
  espnName?: string;
  stats?: {
    pts?: string;
    reb?: string;
    ast?: string;
    [key: string]: any;
  };
  espnHeadshot?: string;
  team?: string;
}

type StatsKeys = "pts" | "reb" | "ast";

function useTopPlayerStats() {
  const {
    data: allTeamsData,
    isLoading,
    isError,
  } = useTeamInfo(null, { rosters: "true", statsToGet: "averages" });
  const [top10Pts, setTop10Pts] = useState<Player[]>([]);
  const [top10Reb, setTop10Reb] = useState<Player[]>([]);
  const [top10Ast, setTop10Ast] = useState<Player[]>([]);

  useEffect(() => {
    if (isLoading) {
      console.log("Top player stats are loading...");
      setTop10Pts([]); // Clear data while loading
      setTop10Reb([]);
      setTop10Ast([]);
      return;
    }

    if (isError || !allTeamsData?.body) {
      console.log("Error or missing data.");
      return;
    }

    const players: Player[] = [];
    allTeamsData.body.forEach((team) => {
      if (team && team.Roster) {
        Object.values(team.Roster).forEach((player) => {
          players.push(player as Player);
        });
      }
    });

    console.log("Extracted players:", players);

    const getTop10ByStat = (stat: StatsKeys) => {
      const filteredPlayers = players.filter(
        (player) => player.stats && player.stats[stat] !== undefined
      );

      const sortedPlayers = filteredPlayers.sort(
        (a, b) =>
          parseFloat(b.stats![stat] || "0") - parseFloat(a.stats![stat] || "0")
      );

      return sortedPlayers.slice(0, 10); // Get top 10 players
    };

    setTop10Pts(getTop10ByStat("pts"));
    setTop10Reb(getTop10ByStat("reb"));
    setTop10Ast(getTop10ByStat("ast"));
  }, [allTeamsData, isLoading, isError]);

  return { top10Pts, top10Reb, top10Ast, isLoading, isError };
}

export default useTopPlayerStats;
