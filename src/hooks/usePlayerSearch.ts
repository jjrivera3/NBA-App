import { useEffect, useState } from "react";
import nbaTeams from "../data/nbateams";
import ratings from "../data/ratings"; // Import ratings data
import Player from "../entities/Player";
import TeamStore from "../entities/TeamStore";
import { usePlayerAttributesStore } from "../stores/usePlayerAttributesStore";
import { usePlayerStore } from "../stores/usePlayerStore";
import useTeamInfo from "./useTeamInfo";
import { normalizeName } from "../utils/normalizeName"; // Import normalizeName

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
        : teamAbbreviation.toLowerCase() === "pho"
        ? "phx"
        : teamAbbreviation.toLowerCase();

    const selectedTeam = nbaTeams.find(
      (team) => team.info.abbrev.toLowerCase() === adjustedTeamAbbreviation
    );

    if (selectedTeam && teamsData?.body) {
      const playerInfo = Object.values(teamsData.body as unknown as TeamStore[])
        .flatMap((team) => Object.values(team.Roster))
        .find((p) => p.playerID === playerID);

      if (playerInfo) {
        // Normalize the player name before searching for it in ratings
        const normalizedPlayerName = normalizeName(playerName);

        // Find player ratings using normalized name
        const playerRatings = ratings.find(
          (rating) => normalizeName(rating.name) === normalizedPlayerName
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
          `/${adjustedTeamAbbreviation}/${normalizedPlayerName
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
