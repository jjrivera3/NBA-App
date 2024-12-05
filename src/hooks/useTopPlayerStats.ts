import { useQuery } from "@tanstack/react-query"; // Ensure you're importing from the correct package
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

  const {
    data: topPlayersData,
    isLoading: isTopPlayersLoading,
    isError: isTopPlayersError,
  } = useQuery({
    queryKey: ["topPlayerStats", allTeamsData],
    queryFn: () => {
      const players: Player[] = [];
      if (!allTeamsData?.body) {
        throw new Error("Missing team data");
      }

      allTeamsData.body.forEach((team) => {
        if (team && team.Roster) {
          Object.values(team.Roster).forEach((player) => {
            players.push(player as Player);
          });
        }
      });

      const getTop10ByStat = (stat: StatsKeys) => {
        const filteredPlayers = players.filter(
          (player) => player.stats && player.stats[stat] !== undefined
        );

        const sortedPlayers = filteredPlayers.sort(
          (a, b) =>
            parseFloat(b.stats![stat] || "0") -
            parseFloat(a.stats![stat] || "0")
        );

        return sortedPlayers.slice(0, 10); // Get top 10 players
      };

      return {
        top10Pts: getTop10ByStat("pts"),
        top10Reb: getTop10ByStat("reb"),
        top10Ast: getTop10ByStat("ast"),
      };
    },
    enabled: !!allTeamsData, // Only run the query if allTeamsData is available
    retry: false, // Adjust retry options as needed
  });

  return {
    top10Pts: topPlayersData?.top10Pts || [],
    top10Reb: topPlayersData?.top10Reb || [],
    top10Ast: topPlayersData?.top10Ast || [],
    isLoading: isLoading || isTopPlayersLoading,
    isError: isError || isTopPlayersError,
  };
}

export default useTopPlayerStats;
