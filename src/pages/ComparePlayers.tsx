import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import PlayerSearchWrapper from "../components/PlayerSearchWrapper";
import CompareRadarChart from "../components/CompareRadarChart";

const ComparePlayers = () => {
  const [player1, setPlayer1] = useState<any | null>(null);
  const [player2, setPlayer2] = useState<any | null>(null);
  const [rating1, setRating1] = useState<any | null>(null);
  const [rating2, setRating2] = useState<any | null>(null);

  console.log(player1);
  console.log(player2);

  // Callback for when Player 1 is selected
  const handlePlayer1Select = (player: any, rating: any) => {
    setPlayer1(player);
    setRating1(rating);
  };

  // Callback for when Player 2 is selected
  const handlePlayer2Select = (player: any, rating: any) => {
    setPlayer2(player);
    setRating2(rating);
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={5} textAlign="center">
        Compare Players
      </Text>
      <Flex justify="space-between" gap={5}>
        {/* Player 1 Search */}
        <Box flex={1}>
          <PlayerSearchWrapper
            label="Search Player 1"
            onPlayerSelect={handlePlayer1Select}
          />
        </Box>

        {/* Player 2 Search */}
        <Box flex={1}>
          <PlayerSearchWrapper
            label="Search Player 2"
            onPlayerSelect={handlePlayer2Select}
          />
        </Box>
      </Flex>

      {rating1 && rating2 && (
        <Box mt={5} bg="gray.800" p={4} borderRadius="md" width="100%">
          <CompareRadarChart player1={rating1} player2={rating2} />
        </Box>
      )}
    </Box>
  );
};

export default ComparePlayers;
