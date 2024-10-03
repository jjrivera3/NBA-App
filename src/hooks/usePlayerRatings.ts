import { useMemo } from "react";
import { normalizeName } from "../utils/normalizeName"; // Import utility

const usePlayerRatings = (players: any[], ratings: any[]) => {
  const playersWithRatings = useMemo(() => {
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

    return players.map((player) => ({
      ...player,
      rating: playerRatingsMap[player.espnName] || null,
    }));
  }, [players, ratings]);

  return playersWithRatings;
};

export default usePlayerRatings;
