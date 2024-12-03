import { Box, Text, VStack, Image } from "@chakra-ui/react";
import { useState } from "react";
import usePlayerSearch from "../hooks/usePlayerSearch"; // Assume custom hook for fetching players
import ratings from "../data/ratings"; // Assume ratings data is imported here
import RatingTeamScore from "./RatingTeamScore"; // Import the RatingTeamScore component

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

  const calculateAverage = (attributes: number[]) =>
    Math.round(
      attributes.reduce((acc, curr) => acc + curr, 0) / attributes.length
    );

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
        <VStack spacing={3} mt={5} bg="#2a2a2a" p={4} borderRadius="md">
          <Image
            src={selectedPlayer.espnHeadshot}
            alt={selectedPlayer.longName}
            boxSize="150px"
            borderRadius="full"
            objectFit="contain"
          />
          <Text fontWeight="bold">{selectedPlayer.longName}</Text>

          <Box borderRadius="md" width="100%" textAlign="center">
            <RatingTeamScore
              playerRating={playerRating.overallAttribute}
              fontSize="16px"
            />
          </Box>
        </VStack>
      )}
    </Box>
  );
};

export default PlayerSearchWrapper;
