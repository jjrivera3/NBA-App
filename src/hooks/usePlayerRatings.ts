import { useMemo } from "react";
import ratings from "../data/ratings"; // Example ratings data
import { normalizeName } from "../utils/normalizeName";

const usePlayerRatings = (normalizedPlayerName: string | null) => {
  // Use useMemo to derive the player's rating
  const playerRating = useMemo(() => {
    if (!normalizedPlayerName) return null;

    return ratings.find(
      (rating) => normalizeName(rating.name) === normalizedPlayerName
    );
  }, [normalizedPlayerName]);

  return playerRating;
};

export default usePlayerRatings;
