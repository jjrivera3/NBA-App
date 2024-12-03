import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import PlayerSearchWrapper from "../components/PlayerSearchWrapper";
import CompareRadarChart from "../components/CompareRadarChart";
import { calculateScoringAverages } from "../utils/playerRatingUtilty";

// Reusable AttributeComparison Component
const AttributeComparison = ({
  label,
  player1Value,
  player2Value,
  getColor,
}: {
  label: string;
  player1Value: number;
  player2Value: number;
  getColor: (value: number) => string;
}) => {
  const difference = player1Value - player2Value;
  return (
    <Flex
      justify="space-evenly"
      p={2}
      borderBottom="1px solid #636363"
      alignItems="center"
    >
      <HStack>
        <Text
          color={difference > 0 ? "green.500" : "red.500"}
          textAlign="center"
          fontSize="14px"
          fontWeight="600"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="45px"
          minWidth="45px"
        >
          {difference > 0 ? `+${difference}` : difference}
        </Text>
        <Text
          color="white"
          textAlign="right"
          bg={getColor(player1Value)}
          p={2}
          borderRadius="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="45px"
          minWidth="45px"
          fontWeight="600"
        >
          {player1Value}
        </Text>
      </HStack>
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
        {label}
      </Text>
      <HStack>
        <Text
          color="white"
          textAlign="left"
          bg={getColor(player2Value)}
          p={2}
          borderRadius="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="45px"
          minWidth="45px"
          fontWeight="600"
        >
          {player2Value}
        </Text>
        <Text
          color={-difference > 0 ? "green.500" : "red.500"}
          fontWeight="600"
          fontSize="14px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="45px"
          minWidth="45px"
        >
          {-difference > 0 ? `+${-difference}` : -difference}
        </Text>
      </HStack>
    </Flex>
  );
};

const ComparePlayers = () => {
  const [player1, setPlayer1] = useState<any | null>(null);
  const [player2, setPlayer2] = useState<any | null>(null);
  const [rating1, setRating1] = useState<any | null>(null);
  const [rating2, setRating2] = useState<any | null>(null);

  const areBothPlayersSelected =
    player1 !== null &&
    player2 !== null &&
    rating1 !== null &&
    rating2 !== null;

  const getColor = (value: number) => {
    if (value >= 90) return "#0a0";
    if (value >= 80) return "#070";
    if (value >= 70) return "#c90";
    if (value >= 60) return "#d40";
    return "#900";
  };

  const handlePlayer1Select = (player: any, rating: any) => {
    setPlayer1(player);
    setRating1(rating);
  };

  const handlePlayer2Select = (player: any, rating: any) => {
    setPlayer2(player);
    setRating2(rating);
  };

  const player1Averages = rating1
    ? calculateScoringAverages(rating1)
    : {
        insideScoring: 0,
        outsideScoring: 0,
        rebounding: 0,
        athleticism: 0,
        defense: 0,
      };

  const player2Averages = rating2
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
      <Flex justify="space-between" gap={5} pb={5}>
        <Box flex={1} position="relative">
          <PlayerSearchWrapper
            label="Search Player 1"
            onPlayerSelect={handlePlayer1Select}
            areBothPlayersSelected={areBothPlayersSelected}
          />
        </Box>
        <Box flex={1} position="relative">
          <PlayerSearchWrapper
            label="Search Player 2"
            onPlayerSelect={handlePlayer2Select}
            areBothPlayersSelected={areBothPlayersSelected}
          />
        </Box>
      </Flex>

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
            <AttributeComparison
              label="Inside Scoring"
              player1Value={player1Averages.insideScoring}
              player2Value={player2Averages.insideScoring}
              getColor={getColor}
            />
            <AttributeComparison
              label="Outside Scoring"
              player1Value={player1Averages.outsideScoring}
              player2Value={player2Averages.outsideScoring}
              getColor={getColor}
            />
            <AttributeComparison
              label="Rebounding"
              player1Value={player1Averages.rebounding}
              player2Value={player2Averages.rebounding}
              getColor={getColor}
            />
            <AttributeComparison
              label="Athleticism"
              player1Value={player1Averages.athleticism}
              player2Value={player2Averages.athleticism}
              getColor={getColor}
            />
            <AttributeComparison
              label="Defense"
              player1Value={player1Averages.defense}
              player2Value={player2Averages.defense}
              getColor={getColor}
            />
          </Box>
        </Box>
      )}

      {areBothPlayersSelected && (
        <Box mt={5} borderRadius="md" width="100%">
          <CompareRadarChart player1={rating1} player2={rating2} />
        </Box>
      )}

      {!areBothPlayersSelected && (
        <Text mt={5} textAlign="center" color="gray.500">
          Please select both players to compare.
        </Text>
      )}
    </Box>
  );
};

export default ComparePlayers;
