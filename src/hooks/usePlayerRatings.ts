import { useMemo } from "react";
import { normalizeName } from "../utils/normalizeName"; // Import utility function

const usePlayerRatings = (players: any[], ratings: any[]) => {
  // Use useMemo to optimize performance and recalculate only when dependencies change
  return useMemo(() => {
    const playerRatingsMap: { [key: string]: any } = {};

    players.forEach((player: any) => {
      const normalizedPlayerName = normalizeName(player.espnName);

      const playerRating = ratings.find((rating) => {
        const normalizedRatingName = normalizeName(rating.name);
        return normalizedPlayerName === normalizedRatingName;
      });

      if (playerRating) {
        playerRatingsMap[player.espnName] = playerRating;
      }
    });

    // Return players enriched with their ratings
    return players.map((player: any) => ({
      ...player,
      rating: playerRatingsMap[player.espnName] || null,
    }));
  }, [players, ratings]); // Recompute when players or ratings change
};

export default usePlayerRatings;
