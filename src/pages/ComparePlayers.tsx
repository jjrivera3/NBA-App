import { Box, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
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

  const getColor = (value: number) => {
    if (value >= 90) return "#0a0"; // Highest: 90-100
    if (value >= 80) return "#070"; // High: 80-89
    if (value >= 70) return "#c90"; // Medium: 70-79
    if (value >= 60) return "#d40"; // Low: 60-69
    return "#900"; // Lowest: < 60
  };

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

  // Log the difference between the outside scoring
  useEffect(() => {
    if (areBothPlayersSelected) {
      const difference =
        player1Averages.outsideScoring - player2Averages.outsideScoring;
      console.log(`Difference in Outside Scoring: ${difference}`);
    }
  }, [
    player1Averages.outsideScoring,
    player2Averages.outsideScoring,
    areBothPlayersSelected,
  ]);

  return (
    <Box p={3}>
      <Flex justify="space-between" gap={5} pb={5}>
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
            fontWeight="600"
            mb={3}
            color="#f8991d"
          >
            Overall Attributes
          </Text>
          <Box border="1px solid #636363" borderRadius="md">
            {/* Inside Scoring */}
            <Flex
              justify="space-evenly"
              p={2}
              borderBottom="1px solid #636363"
              alignItems="center"
            >
              <Text
                color="white"
                textAlign="right"
                bg={getColor(player1Averages.insideScoring)}
                p={2}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="45px"
                fontWeight="600"
              >
                {player1Averages.insideScoring}
              </Text>
              <Text
                color="white"
                textAlign="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="120px"
                fontWeight="600"
                fontSize="15px"
              >
                Inside Scoring
              </Text>
              <Text
                color="white"
                textAlign="left"
                bg={getColor(player2Averages.insideScoring)}
                p={2}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="45px"
                fontWeight="600"
              >
                {player2Averages.insideScoring}
              </Text>
            </Flex>

            {/* Outside Scoring */}
            <Flex
              justify="space-evenly"
              p={2}
              borderBottom="1px solid #636363"
              alignItems="center"
            >
              <Text
                color="white"
                textAlign="right"
                bg={getColor(player1Averages.outsideScoring)}
                p={2}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="45px"
                fontWeight="600"
              >
                {player1Averages.outsideScoring}
              </Text>
              <Text
                color="white"
                textAlign="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="120px"
                fontWeight="600"
                fontSize="15px"
              >
                Outside Scoring
              </Text>
              <Text
                color="white"
                textAlign="left"
                bg={getColor(player2Averages.outsideScoring)}
                p={2}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="45px"
                fontWeight="600"
              >
                {player2Averages.outsideScoring}
              </Text>
            </Flex>

            {/* Rebounding */}
            <Flex
              justify="space-evenly"
              p={2}
              borderBottom="1px solid #636363"
              alignItems="center"
            >
              <Text
                color="white"
                textAlign="right"
                bg={getColor(player1Averages.rebounding)}
                p={2}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="45px"
                fontWeight="600"
              >
                {player1Averages.rebounding}
              </Text>
              <Text
                color="white"
                textAlign="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="120px"
                fontWeight="600"
                fontSize="15px"
              >
                Rebounding
              </Text>
              <Text
                color="white"
                textAlign="left"
                bg={getColor(player2Averages.rebounding)}
                p={2}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="45px"
                fontWeight="600"
              >
                {player2Averages.rebounding}
              </Text>
            </Flex>

            {/* Athleticism */}
            <Flex
              justify="space-evenly"
              p={2}
              borderBottom="1px solid #636363"
              alignItems="center"
            >
              <Text
                color="white"
                textAlign="right"
                bg={getColor(player1Averages.athleticism)}
                p={2}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="45px"
                fontWeight="600"
              >
                {player1Averages.athleticism}
              </Text>
              <Text
                color="white"
                textAlign="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="120px"
                fontWeight="600"
                fontSize="15px"
              >
                Athleticism
              </Text>
              <Text
                color="white"
                textAlign="left"
                bg={getColor(player2Averages.athleticism)}
                p={2}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="45px"
                fontWeight="600"
              >
                {player2Averages.athleticism}
              </Text>
            </Flex>

            {/* Defense */}
            <Flex justify="space-evenly" p={2} alignItems="center">
              <Text
                color="white"
                textAlign="right"
                bg={getColor(player1Averages.defense)}
                p={2}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="45px"
                fontWeight="600"
              >
                {player1Averages.defense}
              </Text>
              <Text
                color="white"
                textAlign="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="120px"
                fontWeight="600"
                fontSize="15px"
              >
                Defense
              </Text>
              <Text
                color="white"
                textAlign="left"
                bg={getColor(player2Averages.defense)}
                p={2}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="45px"
                minWidth="45px"
                fontWeight="600"
              >
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
