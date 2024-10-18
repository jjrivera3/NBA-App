import React from "react";
import { Box, Flex, Image, Text, Grid, keyframes } from "@chakra-ui/react";
import { FaCaretLeft } from "react-icons/fa";

interface ScoreboardScoreCardProps {
  game: {
    gameID: string;
    awayTeamColor: string;
    homeTeamColor: string;
    awayLogo: string;
    homeLogo: string;
    awayTeam: string;
    homeTeam: string;
    awayScore: string;
    homeScore: string;
    awayLinescores?: number[];
    homeLinescores?: number[];
    statusType: string;
    shortDetail: string;
    awayRecord: string; // Expecting a string for record now
    homeRecord: string; // Expecting a string for record now
    date: string;
  };
}

// Define keyframes for the animated green line
const lineAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const ScoreboardScoreCard: React.FC<ScoreboardScoreCardProps> = ({ game }) => {
  const { awayLinescores = [0, 0, 0, 0], homeLinescores = [0, 0, 0, 0] } = game;

  const filledAwayScores = awayLinescores
    .map((score) => (score === 0 ? "-" : score))
    .concat(["-", "-", "-", "-"])
    .slice(0, 4);
  const filledHomeScores = homeLinescores
    .map((score) => (score === 0 ? "-" : score))
    .concat(["-", "-", "-", "-"])
    .slice(0, 4);

  const getTeamOnlyName = (teamName: string) =>
    teamName.split(" ").slice(-1)[0];

  const isScheduled = game.statusType === "STATUS_SCHEDULED";
  const isFinal = game.statusType === "STATUS_FINAL";
  const isInProgress =
    game.statusType === "STATUS_IN_PROGRESS" ||
    game.statusType === "STATUS_HALFTIME" ||
    game.statusType === "STATUS_END_PERIOD";

  // Only highlight winner when the game is final
  const isAwayWinner =
    isFinal && parseInt(game.awayScore) > parseInt(game.homeScore);
  const isHomeWinner =
    isFinal && parseInt(game.homeScore) > parseInt(game.awayScore);

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Time Unavailable";

    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  };

  const formattedTime = formatDateTime(game.date);

  return (
    <Box
      pt="20px"
      borderRadius="md"
      color="white"
      position="relative"
      overflow="hidden"
      px={5}
      paddingBottom="30px"
      background="linear-gradient(135deg, #464646, #333333)"
    >
      {/* Final/Game Time in Top Left Corner */}
      <Flex justifyContent="space-between" alignItems="center" mb="15px">
        <Box maxW="120px">
          <Text
            fontSize="md"
            fontWeight={500}
            color={isInProgress ? "#20da77" : "gray.200"}
          >
            {isFinal ? "Final" : isScheduled ? formattedTime : game.shortDetail}
          </Text>
          {isInProgress && (
            <Box
              width="100%"
              height="2px"
              overflow="hidden"
              position="relative"
            >
              <Box
                width="150%"
                height="2px"
                backgroundColor="#20da77"
                position="absolute"
                animation={`${lineAnimation} 1.7s infinite alternate cubic-bezier(0.21, 0.85, 0.34, 0.98)`}
              />
            </Box>
          )}
        </Box>

        {!isScheduled && (
          <Grid
            templateColumns="repeat(5, 50px)"
            gap={0}
            textAlign="center"
            color="gray.400"
            fontWeight="medium"
          >
            <Text>1</Text>
            <Text>2</Text>
            <Text>3</Text>
            <Text>4</Text>
            <Text fontWeight="bold">T</Text>
          </Grid>
        )}
      </Flex>

      {/* Away Team Row */}
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Flex alignItems="center" width="250px" mr={5}>
          <Image
            src={game.awayLogo}
            alt={getTeamOnlyName(game.awayTeam)}
            boxSize="35px"
            mr={3}
          />
          <Box>
            <Text fontWeight="medium" color={game.awayTeamColor} fontSize="lg">
              {getTeamOnlyName(game.awayTeam)}
              <Text as="span" fontSize="sm" color="gray.400" ml={2}>
                {game.awayRecord}
              </Text>
            </Text>
          </Box>
        </Flex>
        {!isScheduled && (
          <Grid
            templateColumns="repeat(5, 50px)"
            gap={0}
            textAlign="center"
            alignItems="center"
          >
            {filledAwayScores.map((score, index) => (
              <Text key={index} fontSize="15px">
                {score}
              </Text>
            ))}
            <Box position="relative">
              <Text fontSize="lg" fontWeight="bold" color="white">
                {game.awayScore === "0" ? "-" : game.awayScore}
              </Text>
              {isAwayWinner && (
                <Box
                  as={FaCaretLeft}
                  color={game.awayTeamColor}
                  position="absolute"
                  left="40px"
                  top="50%"
                  transform="translateY(-50%)"
                  fontSize="20px"
                />
              )}
            </Box>
          </Grid>
        )}
      </Flex>

      {/* Home Team Row */}
      <Flex justifyContent="space-between" alignItems="center" mt={3}>
        <Flex alignItems="center" width="250px" mr={5}>
          <Image
            src={game.homeLogo}
            alt={getTeamOnlyName(game.homeTeam)}
            boxSize="35px"
            mr={3}
          />
          <Box>
            <Text fontWeight="medium" color={game.homeTeamColor} fontSize="lg">
              {getTeamOnlyName(game.homeTeam)}
              <Text as="span" fontSize="sm" color="gray.400" ml={2}>
                {game.homeRecord}
              </Text>
            </Text>
          </Box>
        </Flex>
        {!isScheduled && (
          <Grid
            templateColumns="repeat(5, 50px)"
            gap={0}
            textAlign="center"
            alignItems="center"
          >
            {filledHomeScores.map((score, index) => (
              <Text key={index} fontSize="15px">
                {score}
              </Text>
            ))}
            <Box position="relative">
              <Text fontSize="lg" fontWeight="bold" color="white">
                {game.homeScore === "0" ? "-" : game.homeScore}
              </Text>
              {isHomeWinner && (
                <Box
                  as={FaCaretLeft}
                  color={game.homeTeamColor}
                  position="absolute"
                  left="40px"
                  top="50%"
                  transform="translateY(-50%)"
                  fontSize="20px"
                />
              )}
            </Box>
          </Grid>
        )}
      </Flex>
    </Box>
  );
};

export default ScoreboardScoreCard;
