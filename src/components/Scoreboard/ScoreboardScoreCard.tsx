import { Box, Flex, Grid, Image, Text, keyframes } from "@chakra-ui/react";
import React from "react";
import { FaCaretLeft, FaEye } from "react-icons/fa"; // Import the FaEye icon
import ScoreboardScoreCardProps from "../../entities/ScoreboardScoreCardProps";

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
      borderLeftRadius="5px"
      color="white"
      position="relative"
      overflow="hidden"
      px={8}
      pt={5}
      pb={5}
      borderRight="1px solid #545454"
      background="linear-gradient(90deg, #5b5b5b 0%, #2e2e2e 100%, #353535 100%)"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        {/* Game Status or Time */}
        <Box maxW="220px" display="flex" alignItems="center">
          <Text
            fontWeight={600}
            fontSize="14px"
            color={isFinal ? "white" : "#20da77"}
          >
            {game.shortDetail
              ? game.shortDetail
              : isScheduled
              ? formattedTime
              : "Status Unavailable"}
          </Text>
        </Box>

        {!isScheduled && (
          <Grid
            templateColumns="repeat(5, 50px)"
            gap={0}
            textAlign="center"
            color="gray.200"
            fontWeight="500"
            fontSize="15px"
          >
            <Text>1</Text>
            <Text>2</Text>
            <Text>3</Text>
            <Text>4</Text>
            <Text fontWeight="bold">T</Text>
          </Grid>
        )}
      </Flex>

      {/* Progress Bar for In-Progress Games */}
      {isInProgress && (
        <Box
          width="100%"
          height="2px"
          overflow="hidden"
          position="relative"
          mt={1}
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

      <Flex justifyContent="space-between" alignItems="center" mt={3} mb={4}>
        <Flex alignItems="center" width="250px" mr={5}>
          <Image
            src={game.awayLogo}
            alt={getTeamOnlyName(game.awayTeam)}
            boxSize="35px"
            mr={3}
          />
          <Box>
            <Text
              fontWeight={
                isInProgress || (!isAwayWinner && isFinal)
                  ? "600"
                  : isAwayWinner
                  ? "bold"
                  : "300"
              }
              color={game.awayTeamColor}
              fontSize="lg"
            >
              {getTeamOnlyName(game.awayTeam)}
              <Text
                as="span"
                fontSize="sm"
                color={isAwayWinner ? "white" : "gray.100"} // Make record white for winners
                ml={2}
              >
                ( {game.awayRecord} )
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
            color="gray.200"
            fontWeight="500"
            fontSize="15px"
          >
            {filledAwayScores.map((score, index) => (
              <Text key={index} fontSize="15px">
                {score}
              </Text>
            ))}
            <Box position="relative">
              <Text
                fontSize="lg"
                fontWeight={isAwayWinner ? "bold" : "400"}
                color={isAwayWinner ? "white" : "gray.200"}
              >
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

      <Flex justifyContent="space-between" alignItems="center" mt={3}>
        <Flex alignItems="center" width="250px" mr={5}>
          <Image
            src={game.homeLogo}
            alt={getTeamOnlyName(game.homeTeam)}
            boxSize="35px"
            mr={3}
          />
          <Box>
            <Text
              fontWeight={
                isInProgress || (!isHomeWinner && isFinal)
                  ? "600"
                  : isHomeWinner
                  ? "bold"
                  : "300"
              }
              color={game.homeTeamColor}
              fontSize="lg"
            >
              {getTeamOnlyName(game.homeTeam)}
              <Text
                as="span"
                fontSize="sm"
                color={isHomeWinner ? "white" : "gray.100"} // Make record white for winners
                ml={2}
              >
                ( {game.homeRecord} )
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
              <Text
                fontSize="lg"
                fontWeight={isHomeWinner ? "bold" : "400"}
                color={isHomeWinner ? "white" : "gray.200"}
              >
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

      {!isScheduled && (
        <Flex justifyContent="flex-end" mt={4} alignItems="center">
          <FaEye color="#f8991d" />
          <Text
            as="span"
            color="#f8991d"
            fontSize="14px"
            cursor="pointer"
            onClick={() => {
              console.log("View Box Score clicked!");
            }}
            ml={2}
            _hover={{ textDecoration: "underline" }}
          >
            View Box Score
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default ScoreboardScoreCard;
