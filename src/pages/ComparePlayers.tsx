import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import PlayerSearchWrapper from "../components/PlayerSearchWrapper";
import CompareRadarChart from "../components/CompareRadarChart";
import {
  calculateScoringAverages,
  ScoringAverages,
} from "../utils/playerRatingUtilty";

const ComparePlayers = () => {
  const [player1, setPlayer1] = useState<any | null>(null);
  const [player2, setPlayer2] = useState<any | null>(null);
  const [rating1, setRating1] = useState<any | null>(null);
  const [rating2, setRating2] = useState<any | null>(null);

  // Check if both players are selected and have ratings
  const areBothPlayersSelected =
    player1 !== null &&
    player2 !== null &&
    rating1 !== null &&
    rating2 !== null;

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

  // Calculate averages for both players
  const player1Averages: ScoringAverages = rating1
    ? calculateScoringAverages(rating1)
    : {
        insideScoring: 0,
        outsideScoring: 0,
        rebounding: 0,
        athleticism: 0,
        defense: 0,
      };

  const player2Averages: ScoringAverages = rating2
    ? calculateScoringAverages(rating2)
    : {
        insideScoring: 0,
        outsideScoring: 0,
        rebounding: 0,
        athleticism: 0,
        defense: 0,
      };

  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={5} textAlign="center">
        Compare Players
      </Text>

      <Flex justify="space-between" gap={5} background="#2a2a2a" p={5}>
        {/* Player 1 Search */}
        <Box flex={1} position="relative">
          <PlayerSearchWrapper
            label="Search Player 1"
            onPlayerSelect={handlePlayer1Select}
            areBothPlayersSelected={areBothPlayersSelected}
          />
        </Box>

        {/* Player 2 Search */}
        <Box flex={1} position="relative">
          <PlayerSearchWrapper
            label="Search Player 2"
            onPlayerSelect={handlePlayer2Select}
            areBothPlayersSelected={areBothPlayersSelected}
          />
        </Box>
      </Flex>

      {/* Render Attribute Names and Values in a New Row */}
      {areBothPlayersSelected && (
        <Box
          p={4}
          borderTopRadius="md"
          borderBottomRadius="md"
          width="100%"
          background="#2a2a2a"
        >
          <Text
            textAlign="center"
            fontSize="xl"
            fontWeight="bold"
            color="white"
            mb={3}
          >
            Overall Attributes
          </Text>

          <Box border="1px solid #636363" borderRadius="md">
            {/* Inside Scoring */}
            <Flex
              justify="space-between"
              p={2}
              borderBottom="1px solid #636363"
              alignItems="center"
            >
              <Text color="white" flex={1} textAlign="right">
                {player1Averages.insideScoring}
              </Text>
              <Text color="white" flex={2} textAlign="center">
                Inside Scoring
              </Text>
              <Text color="white" flex={1} textAlign="left">
                {player2Averages.insideScoring}
              </Text>
            </Flex>

            {/* Outside Scoring */}
            <Flex
              justify="space-between"
              p={2}
              borderBottom="1px solid #636363"
              alignItems="center"
            >
              <Text color="white" flex={1} textAlign="right">
                {player1Averages.outsideScoring}
              </Text>
              <Text color="white" flex={2} textAlign="center">
                Outside Scoring
              </Text>
              <Text color="white" flex={1} textAlign="left">
                {player2Averages.outsideScoring}
              </Text>
            </Flex>

            {/* Rebounding */}
            <Flex
              justify="space-between"
              p={2}
              borderBottom="1px solid #636363"
              alignItems="center"
            >
              <Text color="white" flex={1} textAlign="right">
                {player1Averages.rebounding}
              </Text>
              <Text color="white" flex={2} textAlign="center">
                Rebounding
              </Text>
              <Text color="white" flex={1} textAlign="left">
                {player2Averages.rebounding}
              </Text>
            </Flex>

            {/* Athleticism */}
            <Flex
              justify="space-between"
              p={2}
              borderBottom="1px solid #636363"
              alignItems="center"
            >
              <Text color="white" flex={1} textAlign="right">
                {player1Averages.athleticism}
              </Text>
              <Text color="white" flex={2} textAlign="center">
                Athleticism
              </Text>
              <Text color="white" flex={1} textAlign="left">
                {player2Averages.athleticism}
              </Text>
            </Flex>

            {/* Defense */}
            <Flex justify="space-between" p={2} alignItems="center">
              <Text color="white" flex={1} textAlign="right">
                {player1Averages.defense}
              </Text>
              <Text color="white" flex={2} textAlign="center">
                Defense
              </Text>
              <Text color="white" flex={1} textAlign="left">
                {player2Averages.defense}
              </Text>
            </Flex>
          </Box>
        </Box>
      )}

      {/* Render radar chart only if both players are selected */}
      {areBothPlayersSelected && (
        <Box mt={5} p={4} borderRadius="md" width="100%">
          <CompareRadarChart player1={rating1} player2={rating2} />
        </Box>
      )}

      {/* Optional: Show message if both players aren't selected */}
      {!areBothPlayersSelected && (
        <Text mt={5} textAlign="center" color="gray.500">
          Please select both players to compare.
        </Text>
      )}
    </Box>
  );
};

export default ComparePlayers;
