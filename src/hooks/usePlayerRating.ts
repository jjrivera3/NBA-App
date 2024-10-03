import { useState } from "react";
import Ratings from "../entities/Ratings";
import ratings from "../data/ratings";

// Hook to return NBA teams data
export const usePlayerRating = () => {
  const [rating] = useState<Ratings[]>(ratings);
  return rating;
};

export default usePlayerRating;
