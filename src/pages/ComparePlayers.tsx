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

  const mpgLabel =
    useBreakpointValue({
      base: "MPG",
      md: "Minutes Per Game",
    }) || "Minutes Per Game";

  return (
    <>
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
                  label="Steals"
                  player1Value={player1.stats.stl}
                  player2Value={player2.stats.stl}
                />
                <ComparePlayerStats
                  label="Blocks"
                  player1Value={player1.stats.blk}
                  player2Value={player2.stats.blk}
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
                <ComparePlayerStats
                  label={mpgLabel}
                  player1Value={player1.stats.mins}
                  player2Value={player2.stats.mins}
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
                  label="2k Rating"
                  player1Value={rating1.overallAttribute}
                  player2Value={rating2.overallAttribute}
                  getColor={getColor}
                />
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
      {areBothPlayersSelected && (
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
            Outside Scoring
          </Text>
          <Box border="1px solid #636363" borderRadius="md">
            <AttributeComparison
              label="Close Shot"
              player1Value={rating1.closeShot}
              player2Value={rating2.closeShot}
              getColor={getColor}
            />
            <AttributeComparison
              label="Mid-Range Shot"
              player1Value={rating1.midRangeShot}
              player2Value={rating2.midRangeShot}
              getColor={getColor}
            />
            <AttributeComparison
              label="Three-Point Shot"
              player1Value={rating1.threePointShot}
              player2Value={rating2.threePointShot}
              getColor={getColor}
            />
            <AttributeComparison
              label="Free Throw"
              player1Value={rating1.freeThrow}
              player2Value={rating2.freeThrow}
              getColor={getColor}
            />
            <AttributeComparison
              label="Shot IQ"
              player1Value={rating1.shotIQ}
              player2Value={rating2.shotIQ}
              getColor={getColor}
            />
            <AttributeComparison
              label="Offensive Consistency"
              player1Value={rating1.offensiveConsistency}
              player2Value={rating2.offensiveConsistency}
              getColor={getColor}
            />
          </Box>
        </Box>
      )}
      {areBothPlayersSelected && (
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
            Athleticism
          </Text>
          <Box border="1px solid #636363" borderRadius="md">
            <AttributeComparison
              label="Speed"
              player1Value={rating1.speed}
              player2Value={rating2.speed}
              getColor={getColor}
            />
            <AttributeComparison
              label="Agility"
              player1Value={rating1.agility}
              player2Value={rating2.agility}
              getColor={getColor}
            />
            <AttributeComparison
              label="Strength"
              player1Value={rating1.strength}
              player2Value={rating2.strength}
              getColor={getColor}
            />
            <AttributeComparison
              label="Vertical"
              player1Value={rating1.vertical}
              player2Value={rating2.vertical}
              getColor={getColor}
            />
            <AttributeComparison
              label="Stamina"
              player1Value={rating1.stamina}
              player2Value={rating2.stamina}
              getColor={getColor}
            />
            <AttributeComparison
              label="Hustle"
              player1Value={rating1.hustle}
              player2Value={rating2.hustle}
              getColor={getColor}
            />
            <AttributeComparison
              label="Overall Durability"
              player1Value={rating1.overallDurability}
              player2Value={rating2.overallDurability}
              getColor={getColor}
            />
          </Box>
        </Box>
      )}
      {areBothPlayersSelected && (
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
            Inside Scoring
          </Text>
          <Box border="1px solid #636363" borderRadius="md">
            <AttributeComparison
              label="Layup"
              player1Value={rating1.layup}
              player2Value={rating2.layup}
              getColor={getColor}
            />
            <AttributeComparison
              label="Standing Dunk"
              player1Value={rating1.standingDunk}
              player2Value={rating2.standingDunk}
              getColor={getColor}
            />
            <AttributeComparison
              label="Driving Dunk"
              player1Value={rating1.drivingDunk}
              player2Value={rating2.drivingDunk}
              getColor={getColor}
            />
            <AttributeComparison
              label="Post Hook"
              player1Value={rating1.postHook}
              player2Value={rating2.postHook}
              getColor={getColor}
            />
            <AttributeComparison
              label="Post Fade"
              player1Value={rating1.postFade}
              player2Value={rating2.postFade}
              getColor={getColor}
            />
            <AttributeComparison
              label="Post Control"
              player1Value={rating1.postControl}
              player2Value={rating2.postControl}
              getColor={getColor}
            />
            <AttributeComparison
              label="Draw Foul"
              player1Value={rating1.drawFoul}
              player2Value={rating2.drawFoul}
              getColor={getColor}
            />
            <AttributeComparison
              label="Hands"
              player1Value={rating1.hands}
              player2Value={rating2.hands}
              getColor={getColor}
            />
          </Box>
        </Box>
      )}
      {areBothPlayersSelected && (
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
            Playmaking
          </Text>
          <Box border="1px solid #636363" borderRadius="md">
            <AttributeComparison
              label="Pass Accuracy"
              player1Value={rating1.passAccuracy}
              player2Value={rating2.passAccuracy}
              getColor={getColor}
            />
            <AttributeComparison
              label="Ball Handle"
              player1Value={rating1.ballHandle}
              player2Value={rating2.ballHandle}
              getColor={getColor}
            />
            <AttributeComparison
              label="Speed with Ball"
              player1Value={rating1.speedWithBall}
              player2Value={rating2.speedWithBall}
              getColor={getColor}
            />
            <AttributeComparison
              label="Pass IQ"
              player1Value={rating1.passIQ}
              player2Value={rating2.passIQ}
              getColor={getColor}
            />
            <AttributeComparison
              label="Pass Vision"
              player1Value={rating1.passVision}
              player2Value={rating2.passVision}
              getColor={getColor}
            />
          </Box>
        </Box>
      )}
      {areBothPlayersSelected && (
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
            Defense
          </Text>
          <Box border="1px solid #636363" borderRadius="md">
            <AttributeComparison
              label="Interior Defense"
              player1Value={rating1.interiorDefense}
              player2Value={rating2.interiorDefense}
              getColor={getColor}
            />
            <AttributeComparison
              label="Perimeter Defense"
              player1Value={rating1.perimeterDefense}
              player2Value={rating2.perimeterDefense}
              getColor={getColor}
            />
            <AttributeComparison
              label="Steal"
              player1Value={rating1.steal}
              player2Value={rating2.steal}
              getColor={getColor}
            />
            <AttributeComparison
              label="Block"
              player1Value={rating1.block}
              player2Value={rating2.block}
              getColor={getColor}
            />
            <AttributeComparison
              label="Help Defense IQ"
              player1Value={rating1.helpDefenseIQ}
              player2Value={rating2.helpDefenseIQ}
              getColor={getColor}
            />
            <AttributeComparison
              label="Pass Perception"
              player1Value={rating1.passPerception}
              player2Value={rating2.passPerception}
              getColor={getColor}
            />
            <AttributeComparison
              label="Defensive Consistency"
              player1Value={rating1.defensiveConsistency}
              player2Value={rating2.defensiveConsistency}
              getColor={getColor}
            />
          </Box>
        </Box>
      )}
      {areBothPlayersSelected && (
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
            Rebounding
          </Text>
          <Box border="1px solid #636363" borderRadius="md">
            <AttributeComparison
              label="Offensive Rebound"
              player1Value={rating1.offensiveRebound}
              player2Value={rating2.offensiveRebound}
              getColor={getColor}
            />
            <AttributeComparison
              label="Defensive Rebound"
              player1Value={rating1.defensiveRebound}
              player2Value={rating2.defensiveRebound}
              getColor={getColor}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ComparePlayers;
