import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import usePlayerSearch from "../hooks/usePlayerSearch"; // Assume custom hook for fetching players
import ratings from "../data/ratings"; // Assume ratings data is imported here
import useTeamColor from "../hooks/useTeamColor";
import ComparePlayerCard from "./ComparePlayerCard";

interface PlayerSearchWrapperProps {
  label: string;
  onPlayerSelect: (player: any, rating: any) => void; // Callback to pass selected player and rating to parent
  areBothPlayersSelected: boolean;
}

const PlayerSearchWrapper: React.FC<PlayerSearchWrapperProps> = ({
  label,
  onPlayerSelect,
  areBothPlayersSelected,
}) => {
  const { players } = usePlayerSearch();
  const [filteredPlayers, setFilteredPlayers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [playerRating, setPlayerRating] = useState<any | null>(null);

  const teamColor = useTeamColor(selectedPlayer?.teamID);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev === null ? 0 : prev < filteredPlayers.length - 1 ? prev + 1 : prev
      );
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev === null || prev === 0 ? null : prev - 1
      );
    } else if (event.key === "Enter" && selectedIndex !== null) {
      const selectedPlayer = filteredPlayers[selectedIndex];
      if (selectedPlayer) {
        handlePlayerSelect(selectedPlayer);
      }
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);

    if (text) {
      const filtered = players.filter((player) =>
        player.longName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPlayers(filtered);
      setSelectedIndex(null); // Reset selection when search text changes
    } else {
      setFilteredPlayers([]);
      setSelectedIndex(null);
    }
  };

  const handlePlayerSelect = (player: any) => {
    setSelectedPlayer(player);
    setSearchText(""); // Clear search text after selection
    setFilteredPlayers([]); // Clear filtered list

    const rating = ratings.find((rating) => rating.name === player.longName);
    setPlayerRating(rating || null); // Update rating state

    if (rating) {
      onPlayerSelect(player, rating);
    }
  };

  console.log(selectedPlayer);
  console.log(playerRating);

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        {label}
      </Text>
      <input
        value={searchText}
        onChange={handleSearch}
        onKeyDown={handleKeyDown} // Add the keydown event listener here
        placeholder="Search players..."
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      />
      {filteredPlayers.length > 0 && (
        <Box
          bg="white"
          border="1px solid gray"
          borderRadius="md"
          mt={2}
          maxHeight="200px"
          overflowY="auto"
          zIndex={10}
          position={areBothPlayersSelected ? "absolute" : "relative"} // Dynamically set position
          width={areBothPlayersSelected ? "100%" : "auto"} // Dynamically set width
        >
          {filteredPlayers.map((player, index) => (
            <Box
              key={player.playerID}
              padding="8px"
              borderBottom="1px solid #ccc"
              _hover={{ backgroundColor: "#f8991d", color: "white" }}
              onClick={() => handlePlayerSelect(player)}
              cursor="pointer"
              backgroundColor={selectedIndex === index ? "#f8991d" : "#000"}
              color={selectedIndex === index ? "white" : "white"}
            >
              {player.longName}
            </Box>
          ))}
        </Box>
      )}

      {selectedPlayer && playerRating && (
        <ComparePlayerCard
          player={selectedPlayer}
          firstColor={teamColor || "#000000"}
          playerRating={playerRating}
        />
      )}
    </Box>
  );
};

export default PlayerSearchWrapper;
