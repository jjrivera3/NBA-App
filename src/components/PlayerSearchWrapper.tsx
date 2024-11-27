import { Box, Text, VStack, Image } from "@chakra-ui/react";
import { useState } from "react";
import usePlayerSearch from "../hooks/usePlayerSearch";
import ratings from "../data/ratings";
import {
  calculateInsideScoringAverage,
  calculateOutsideScoringAverage,
  calculateReboundingAverage,
  calculateAthleticismAverage,
  calculateDefenseAverage,
} from "../utils/playerRatingUtils";

interface PlayerSearchWrapperProps {
  label: string;
}

const PlayerSearchWrapper: React.FC<PlayerSearchWrapperProps> = ({ label }) => {
  const { players } = usePlayerSearch();
  const [filteredPlayers, setFilteredPlayers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [playerRating, setPlayerRating] = useState<any | null>(null);

  const insideScoringAverage = calculateInsideScoringAverage(playerRating);
  const outsideScoringAverage = calculateOutsideScoringAverage(playerRating);
  const reboundingAverage = calculateReboundingAverage(playerRating);
  const athleticismAverage = calculateAthleticismAverage(playerRating);
  const defenseAverage = calculateDefenseAverage(playerRating);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);

    if (text) {
      const filtered = players.filter((player) =>
        player.longName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPlayers(filtered);
    } else {
      setFilteredPlayers([]);
    }
  };

  const handlePlayerSelect = (player: any) => {
    setSelectedPlayer(player);
    setSearchText("");
    setFilteredPlayers([]);

    const rating = ratings.find((rating) => rating.name === player.longName);
    setPlayerRating(rating || null);
  };

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        {label}
      </Text>
      <input
        value={searchText}
        onChange={handleSearch}
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
          position="relative"
          zIndex={10}
        >
          {filteredPlayers.map((player) => (
            <Box
              key={player.playerID}
              padding="8px"
              borderBottom="1px solid #ccc"
              _hover={{ backgroundColor: "#f8991d", color: "white" }}
              onClick={() => handlePlayerSelect(player)}
              cursor="pointer"
            >
              {player.longName}
            </Box>
          ))}
        </Box>
      )}
      {selectedPlayer && (
        <VStack spacing={3} mt={5} bg="gray.800" p={4} borderRadius="md">
          <Image
            src={selectedPlayer.espnHeadshot}
            alt={selectedPlayer.longName}
            boxSize="80px"
            borderRadius="full"
          />
          <Text fontWeight="bold">{selectedPlayer.longName}</Text>
          <Text>{selectedPlayer.team}</Text>

          {playerRating ? (
            <Box bg="gray.700" p={4} borderRadius="md" width="100%">
              <Text fontWeight="bold" color="orange.400">
                Player Rating:
              </Text>
              <Text>Overall: {playerRating.overallAttribute}</Text>
              <Text>Inside Scoring Overall: {insideScoringAverage}</Text>
              <Text>Outside Scoring Overall: {outsideScoringAverage}</Text>
              <Text>Rebounding Overall: {reboundingAverage}</Text>
              <Text>Athleticism Overall: {athleticismAverage}</Text>
              <Text>Defensive Overall: {defenseAverage}</Text>
            </Box>
          ) : (
            <Text color="gray.400">No rating available</Text>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default PlayerSearchWrapper;
