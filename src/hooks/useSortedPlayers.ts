import { useMemo } from "react";

const useSortedPlayers = (players: any[]) => {
  return useMemo(() => {
    return players.sort((a, b) => {
      const ratingA = a.rating?.overallAttribute || 0;
      const ratingB = b.rating?.overallAttribute || 0;
      return ratingB - ratingA; // Sort from high to low
    });
  }, [players]);
};

export default useSortedPlayers;
