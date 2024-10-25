import { useEffect, useState } from "react";
import nbaTeams from "../data/nbateams";
import ratings from "../data/ratings"; // Import ratings data
import Player from "../entities/Player";
import TeamStore from "../entities/TeamStore";
import { usePlayerAttributesStore } from "../usePlayerAttributesStore";
import { usePlayerStore } from "../usePlayerStore";
import useTeamInfo from "./useTeamInfo";

const usePlayerSearch = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const { data: teamsData, isError } = useTeamInfo();
  const setPlayerData = usePlayerStore((state) => state.setPlayerData);
  const setPlayerRating = usePlayerAttributesStore(
    (state) => state.setPlayerRating
  );

  useEffect(() => {
    if (teamsData?.body && Array.isArray(teamsData.body)) {
      const teams = teamsData.body as TeamStore[];

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
    const adjustedTeamAbbreviation =
      teamAbbreviation.toLowerCase() === "gs"
        ? "gsw"
        : teamAbbreviation.toLowerCase() === "sa"
        ? "sas"
        : teamAbbreviation;

    const selectedTeam = nbaTeams.find(
      (team) =>
        team.info.abbrev.toLowerCase() ===
        adjustedTeamAbbreviation.toLowerCase()
    );

    if (selectedTeam && teamsData?.body) {
      const playerInfo = Object.values(teamsData.body as unknown as TeamStore[])
        .flatMap((team) => Object.values(team.Roster))
        .find((p) => p.playerID === playerID);

      if (playerInfo) {
        // Find player ratings in the ratings.ts file based on player name
        const playerRatings = ratings.find(
          (rating) => rating.name === playerName
        );

        // Combine player info with player ratings
        const playerWithRating = {
          ...playerInfo,
          rating: playerRatings || null, // Add the rating property
          espnHeadshot: `https://a.espncdn.com/i/headshots/nba/players/full/${playerInfo.espnID}.png`,
        };

        // Set player data including rating into Zustand store
        setPlayerData({
          player: playerWithRating,
          firstColor: selectedTeam.info.colors[0],
          teamID: selectedTeam.teamId,
          espnLogo1: selectedTeam.info.logoImage,
          teamCity: selectedTeam.info.city,
          teamName: selectedTeam.name,
          playerRating: playerRatings || null, // You can also store ratings in a separate state
        });

        // If player ratings are found, set them in Zustand store
        if (playerRatings) {
          setPlayerRating(playerRatings);
        } else {
          console.warn(`No ratings found for player: ${playerName}`);
        }

        // Navigate to the player's detail page
        navigate(
          `/${adjustedTeamAbbreviation}/${playerName
            .toLowerCase()
            .replace(/\s+/g, "-")}`
        );

        return playerInfo.espnName; // Return the player's espnName
      }
    }
    return null;
  };

  return { players, handleSelectPlayer, isError };
};

export default usePlayerSearch;
