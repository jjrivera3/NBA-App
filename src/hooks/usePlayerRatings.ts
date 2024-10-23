import { useEffect } from "react";
import { usePlayerAttributesStore } from "../usePlayerAttributesStore";
import ratings from "../data/ratings"; // Import ratings data

// Custom hook to match selected player with ratings and update Zustand store
const usePlayerRatings = (selectedPlayerName: string | null) => {
  const setPlayerRating = usePlayerAttributesStore(
    (state) => state.setPlayerRating
  );

  useEffect(() => {
    if (selectedPlayerName) {
      console.log("Fetching ratings for:", selectedPlayerName); // Log selected player name

      // Find the player's ratings based on the selected player's name
      const playerRatings = ratings.find(
        (rating) => rating.name === selectedPlayerName
      );

      if (playerRatings) {
        // Update Zustand store with the matched player's ratings
        setPlayerRating(playerRatings);
        console.log(`Player Ratings for ${selectedPlayerName}:`, playerRatings); // Log player ratings
      } else {
        console.warn("No ratings found for the selected player");
      }
    }
  }, [selectedPlayerName, setPlayerRating]);
};

export default usePlayerRatings;
