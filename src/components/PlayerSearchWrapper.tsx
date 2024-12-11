import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import usePlayerSearch from "../hooks/usePlayerSearch";
import ratings from "../data/ratings";
import useTeamColor from "../hooks/useTeamColor";
import ComparePlayerCard from "./ComparePlayerCard";
import { normalizeName } from "../utils/normalizeName";
import { getMappedPlayerName2 } from "../utils/playerNameMap2";

interface PlayerSearchWrapperProps {
  label: string;
  onPlayerSelect: (player: any, rating: any) => void;
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

  const teamColor = useTeamColor(selectedPlayer?.teamID);

  useEffect(() => {
    if (selectedPlayer && !selectedPlayer.rating) {
      // Map the playerName to its standardized version
      let playerName = normalizeName(selectedPlayer.longName);
      if (playerName) {
        playerName = getMappedPlayerName2(playerName);
      }

      const rating = ratings.find(
        (rating) => normalizeName(rating.name) === playerName
      );

      const playerWithRating = { ...selectedPlayer, rating: rating || null };

      setSelectedPlayer(playerWithRating);

      if (rating) {
        onPlayerSelect(playerWithRating, rating);
      }
    }
  }, [selectedPlayer, onPlayerSelect]);

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
      const selected = filteredPlayers[selectedIndex];

      if (selected) {
        setSelectedPlayer(selected);
        setSearchText("");
        setFilteredPlayers([]);
        setSelectedIndex(null);
      }
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);

    if (text) {
      const normalizedSearchText = normalizeName(text);
      const filtered = players.filter((player) =>
        normalizeName(player.longName).includes(normalizedSearchText)
      );
      setFilteredPlayers(filtered);
      setSelectedIndex(null);
    } else {
      setFilteredPlayers([]);
      setSelectedIndex(null);
    }
  };

  const handlePlayerSelect = (player: any) => {
    // Map the playerName to its standardized version
    let playerName = normalizeName(player.longName);

    const updatedPlayer = { ...player, longName: playerName };
    setSelectedPlayer(updatedPlayer);
    setSearchText("");
    setFilteredPlayers([]);
  };

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        {label}
      </Text>
      <input
        value={searchText}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
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
          position={areBothPlayersSelected ? "absolute" : "relative"}
          width={areBothPlayersSelected ? "100%" : "auto"}
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

      {selectedPlayer && selectedPlayer.rating && (
        <ComparePlayerCard
          player={selectedPlayer}
          firstColor={teamColor || "#000000"}
          playerRating={selectedPlayer.rating}
        />
      )}
    </Box>
  );
};

export default PlayerSearchWrapper;
