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
    awayLinescores: number[];
    homeLinescores: number[];
    statusType: string;
    shortDetail: string;
    awayRecord?: string;
    homeRecord?: string;
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
  const isAwayWinner = parseInt(game.awayScore) > parseInt(game.homeScore);
  const isHomeWinner = parseInt(game.homeScore) > parseInt(game.awayScore);

  return (
    <Box
      p={4}
      borderRadius="md"
      color="white"
      position="relative"
      overflow="hidden"
      boxShadow="md"
      background="linear-gradient(135deg, #464646, #333333)"
    >
      <Flex
        height="6px"
        borderTopRadius="md"
        overflow="hidden"
        position="relative"
        marginTop="-12px"
      >
        <Box
          flex="1"
          backgroundColor={game.awayTeamColor}
          position="relative"
          _after={{
            content: '""',
            position: "absolute",
            top: 0,
            right: "-8px",
            width: "16px",
            height: "100%",
            background: `linear-gradient(135deg, ${game.awayTeamColor} 50%, ${game.homeTeamColor} 50%)`,
          }}
        />
        <Box flex="1" backgroundColor={game.homeTeamColor}></Box>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        {/* Updated Short Detail */}
        {game.statusType === "STATUS_IN_PROGRESS" ||
        game.statusType === "STATUS_HALFTIME" ||
        game.statusType === "STATUS_END_PERIOD" ? (
          <Box maxW="120px">
            <Text fontSize="14px" color="#20da77" fontWeight={500}>
              {game.shortDetail}
            </Text>
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
          </Box>
        ) : (
          <Text width="120px" fontWeight="medium" color="gray.400">
            {game.shortDetail}
          </Text>
        )}

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
        <Flex alignItems="center" width="120px" mr={5}>
          <Image
            src={game.awayLogo}
            alt={getTeamOnlyName(game.awayTeam)}
            boxSize="35px"
            mr={3}
          />
          <Box>
            <Text fontWeight="medium" color={game.awayTeamColor} fontSize="lg">
              {getTeamOnlyName(game.awayTeam)}
            </Text>
            {game.awayRecord ? (
              <Text fontSize="sm" color="gray.400">
                {game.awayRecord}
              </Text>
            ) : (
              <Text fontSize="sm" color="gray.500">
                Record N/A
              </Text>
            )}
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
              <Text key={index} fontSize="md">
                {score}
              </Text>
            ))}
            <Box position="relative">
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={isAwayWinner ? "white" : "gray.500"}
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

      {/* Home Team Row */}
      <Flex justifyContent="space-between" alignItems="center" mt={3}>
        <Flex alignItems="center" width="120px" mr={5}>
          <Image
            src={game.homeLogo}
            alt={getTeamOnlyName(game.homeTeam)}
            boxSize="35px"
            mr={3}
          />
          <Box>
            <Text fontWeight="medium" color={game.homeTeamColor} fontSize="lg">
              {getTeamOnlyName(game.homeTeam)}
            </Text>
            {game.homeRecord ? (
              <Text fontSize="sm" color="gray.400">
                {game.homeRecord}
              </Text>
            ) : (
              <Text fontSize="sm" color="gray.500">
                Record N/A
              </Text>
            )}
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
              <Text key={index} fontSize="md">
                {score}
              </Text>
            ))}
            <Box position="relative">
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={isHomeWinner ? "white" : "gray.500"}
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
    </Box>
  );
};

export default ScoreboardScoreCard;
