import { Box, Text, VStack, Image } from "@chakra-ui/react";
import { useState } from "react";
import usePlayerSearch from "../hooks/usePlayerSearch"; // Assume custom hook for fetching players
import ratings from "../data/ratings"; // Assume ratings data is imported here

interface PlayerSearchWrapperProps {
  label: string;
  onPlayerSelect: (player: any, rating: any) => void; // Callback to pass selected player and rating to parent
}

const PlayerSearchWrapper: React.FC<PlayerSearchWrapperProps> = ({
  label,
  onPlayerSelect,
}) => {
  const { players } = usePlayerSearch();
  const [filteredPlayers, setFilteredPlayers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [playerRating, setPlayerRating] = useState<any | null>(null);

  // Average calculation function for ratings
  const calculateAverage = (attributes: number[]) =>
    Math.round(
      attributes.reduce((acc, curr) => acc + curr, 0) / attributes.length
    );

  // Calculate various ratings
  const insideScoringAverage = playerRating
    ? calculateAverage([
        playerRating.layup || 0,
        playerRating.standingDunk || 0,
        playerRating.drivingDunk || 0,
        playerRating.postHook || 0,
        playerRating.postFade || 0,
        playerRating.postControl || 0,
        playerRating.drawFoul || 0,
        playerRating.hands || 0,
      ])
    : 0;

  const outsideScoringAverage = playerRating
    ? calculateAverage([
        playerRating.closeShot || 0,
        playerRating.midRangeShot || 0,
        playerRating.threePointShot || 0,
        playerRating.freeThrow || 0,
        playerRating.shotIQ || 0,
        playerRating.offensiveConsistency || 0,
      ])
    : 0;

  const reboundingAverage = playerRating
    ? calculateAverage([
        playerRating.offensiveRebound || 0,
        playerRating.defensiveRebound || 0,
      ])
    : 0;

  const athleticismAverage = playerRating
    ? calculateAverage([
        playerRating.speed || 0,
        playerRating.agility || 0,
        playerRating.strength || 0,
        playerRating.vertical || 0,
        playerRating.stamina || 0,
        playerRating.hustle || 0,
        playerRating.overallDurability || 0,
      ])
    : 0;

  const defenseAverage = playerRating
    ? calculateAverage([
        playerRating.interiorDefense || 0,
        playerRating.perimeterDefense || 0,
        playerRating.steal || 0,
        playerRating.block || 0,
        playerRating.helpDefenseIQ || 0,
        playerRating.passPerception || 0,
        playerRating.defensiveConsistency || 0,
      ])
    : 0;

  // Handle search input
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

  // Handle player selection
  const handlePlayerSelect = (player: any) => {
    setSelectedPlayer(player);
    setSearchText(""); // Clear search text after selection
    setFilteredPlayers([]); // Clear filtered list

    // Find player rating from ratings data
    const rating = ratings.find((rating) => rating.name === player.longName);
    setPlayerRating(rating || null); // Update rating state

    // Pass player and rating data to parent component
    if (rating) {
      onPlayerSelect(player, rating);
    }
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
      {selectedPlayer && playerRating && (
        <VStack spacing={3} mt={5} bg="gray.800" p={4} borderRadius="md">
          <Image
            src={selectedPlayer.espnHeadshot}
            alt={selectedPlayer.longName}
            boxSize="80px"
            borderRadius="full"
          />
          <Text fontWeight="bold">{selectedPlayer.longName}</Text>
          <Text>{selectedPlayer.team}</Text>

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
        </VStack>
      )}
    </Box>
  );
};

export default PlayerSearchWrapper;
