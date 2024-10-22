import { useEffect, useState } from "react";
import useTeamInfo from "./useTeamInfo";
import Player from "../entities/Player";
import nbaTeams from "../data/nbateams";
import { usePlayerStore } from "../usePlayerStore";
import { usePlayerAttributesStore } from "../usePlayerAttributesStore";
import Team from "../entities/Team";

const usePlayerSearch = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const { data: teamsData, isError } = useTeamInfo();
  const setPlayerData = usePlayerStore((state) => state.setPlayerData);
  const setPlayerRating = usePlayerAttributesStore(
    (state) => state.setPlayerRating
  );

  useEffect(() => {
    if (teamsData?.body && Array.isArray(teamsData.body)) {
      const teams = teamsData.body as Team[];

      const allPlayers: Player[] = teams.flatMap((team) => {
        return Object.values(team.Roster).map((player) => ({
          ...player,
          stats: { pts: "0", reb: "0", ast: "0" },
          espnHeadshot: `https://a.espncdn.com/i/headshots/nba/players/full/${player.espnID}.png`,
        }));
      });
      setPlayers(allPlayers);
    }
  }, [teamsData]);

  const handleSelectPlayer = (
    playerName: string,
    playerID: string,
    teamAbbreviation: string,
    navigate: (path: string) => void
  ) => {
    // Convert "gs" to "gsw" for the Golden State Warriors
    const adjustedTeamAbbreviation =
      teamAbbreviation.toLowerCase() === "gs" ? "gsw" : teamAbbreviation;

    const selectedTeam = nbaTeams.find(
      (team) =>
        team.info.abbrev.toLowerCase() ===
        adjustedTeamAbbreviation.toLowerCase()
    );

    if (selectedTeam && teamsData?.body) {
      const playerInfo = Object.values(teamsData.body as unknown as Team[])
        .flatMap((team) => Object.values(team.Roster))
        .find((p) => p.playerID === playerID);

      if (playerInfo) {
        setPlayerData({
          player: {
            ...playerInfo,
            espnHeadshot: `https://a.espncdn.com/i/headshots/nba/players/full/${playerInfo.espnID}.png`,
          },
          firstColor: selectedTeam.info.colors[0],
          teamID: selectedTeam.teamId,
          espnLogo1: selectedTeam.info.logoImage,
          teamCity: selectedTeam.info.city,
          teamName: selectedTeam.name,
        });
        setPlayerRating(playerInfo.rating);
        navigate(
          `/${adjustedTeamAbbreviation}/${playerName
            .toLowerCase()
            .replace(/\s+/g, "-")}`
        );
      }
    }
  };

  return { players, handleSelectPlayer, isError };
};

export default usePlayerSearch;
