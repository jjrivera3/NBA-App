import { useMemo } from "react";

// This hook sorts players by their overall rating in descending order
const useSortedPlayersByRating = (players: any[]) => {
  return useMemo(() => {
    return players.sort((a: any, b: any) => {
      const ratingA = a.rating?.overallAttribute || 0; // Default to 0 if no rating
      const ratingB = b.rating?.overallAttribute || 0; // Default to 0 if no rating
      return ratingB - ratingA; // Sort from high to low
    });
  }, [players]); // Recompute only when players array changes
};

export default useSortedPlayersByRating;
