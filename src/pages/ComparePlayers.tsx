import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import PlayerSearchWrapper from "../components/PlayerSearchWrapper";
import CompareRadarChart from "../components/CompareRadarChart";
import AttributeComparison from "../components/AttributeComparison"; // Import the new component
import { calculateScoringAverages } from "../utils/playerRatingUtilty";
import ComparePlayerStats from "../components/ComparePlayerStats";
import { useBreakpointValue } from "@chakra-ui/react";

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

  const pointsLabel =
    useBreakpointValue({
      base: "PPG",
      md: "Points Per Game",
    }) || "Points Per Game";

  const reboundsLabel =
    useBreakpointValue({
      base: "RPG",
      md: "Rebounds Per Game",
    }) || "Rebounds Per Game";

  const assistLabel =
    useBreakpointValue({
      base: "APG",
      md: "Assists Per Game",
    }) || "Assists Per Game";

  return (
    <Box p={{ base: 0, md: 5 }}>
      {!areBothPlayersSelected && (
        <Text
          mt={5}
          mb={5}
          textAlign="center"
          fontSize={{ base: "sm", md: "lg" }}
          fontWeight="600"
          color="#f8991d"
        >
          Please select both players to compare.
        </Text>
      )}
      <Flex justify="space-between" gap={{ base: 1, md: 5 }} pb={5}>
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
        <>
          <Box
            p={{ base: 2, md: 4 }}
            borderTopRadius="md"
            borderBottomRadius="md"
            width="100%"
            background="#2a2a2a"
            boxShadow={"2xl"}
          >
            <Text
              textAlign="center"
              fontSize="xl"
              fontWeight="600"
              mb={3}
              color="#f8991d"
            >
              2024-2025 Stats
            </Text>
            <Box border="1px solid #636363" borderRadius="md">
              <ComparePlayerStats
                label={pointsLabel}
                player1Value={player1.stats.pts}
                player2Value={player2.stats.pts}
              />
              <ComparePlayerStats
                label={reboundsLabel}
                player1Value={player1.stats.reb}
                player2Value={player2.stats.reb}
              />
              <ComparePlayerStats
                label={assistLabel}
                player1Value={player1.stats.ast}
                player2Value={player2.stats.ast}
              />
              <ComparePlayerStats
                label="FG%"
                player1Value={player1.stats.fgp}
                player2Value={player2.stats.fgp}
              />
              <ComparePlayerStats
                label="3PT%"
                player1Value={player1.stats.tptfgp}
                player2Value={player2.stats.tptfgp}
              />
              <ComparePlayerStats
                label="FTP%"
                player1Value={player1.stats.ftp}
                player2Value={player2.stats.ftp}
              />
            </Box>
          </Box>
          <Box
            p={{ base: 2, md: 4 }}
            borderTopRadius="md"
            borderBottomRadius="md"
            width="100%"
            background="#2a2a2a"
            mt={10}
            boxShadow={"2xl"}
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
        </>
      )}

      {areBothPlayersSelected && (
        <Box mt={10} borderRadius="md" width="100%" boxShadow={"2xl"}>
          <CompareRadarChart player1={rating1} player2={rating2} />
        </Box>
      )}
    </Box>
  );
};

export default ComparePlayers;
