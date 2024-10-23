import { useMemo } from "react";
import usePlayerRating from "../hooks/usePlayerRating";

const normalizeName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/['’]/g, "") // Remove apostrophes
    .replace(/\s+/g, " "); // Normalize white spaces
};

const usePlayerRatingsMap = (players: any[]) => {
  const ratings = usePlayerRating();

  return useMemo(() => {
    const playerRatingsMap: { [key: string]: any } = {};

    players.forEach((player) => {
      const normalizedPlayerName = normalizeName(player.espnName);

      const playerRating = ratings.find((rating) => {
        const normalizedRatingName = normalizeName(rating.name);
        return normalizedPlayerName === normalizedRatingName;
      });

      if (playerRating) {
        playerRatingsMap[player.espnName] = playerRating;
      }
    });

  
    return players.map((player) => {
      const playerWithRating = {
        ...player,
        rating: playerRatingsMap[player.espnName] || null,
      };

      return playerWithRating;
    });
  }, [players, ratings]);
};

export default usePlayerRatingsMap;
