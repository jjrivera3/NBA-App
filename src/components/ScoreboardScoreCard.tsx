import React from "react";
import { Box, Flex, Image, Text, Grid } from "@chakra-ui/react";

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
  };
}

const ScoreboardScoreCard: React.FC<ScoreboardScoreCardProps> = ({ game }) => {
  const { awayLinescores = [0, 0, 0, 0], homeLinescores = [0, 0, 0, 0] } = game;

  // Ensure each team has 4 quarters' scores, defaulting to "-" if missing or zero
  const filledAwayScores = awayLinescores
    .map((score) => (score === 0 ? "-" : score))
    .concat(["-", "-", "-", "-"])
    .slice(0, 4);
  const filledHomeScores = homeLinescores
    .map((score) => (score === 0 ? "-" : score))
    .concat(["-", "-", "-", "-"])
    .slice(0, 4);

  // Get the team name without the city
  const getTeamOnlyName = (teamName: string) =>
    teamName.split(" ").slice(-1)[0];

  const isScheduled = game.statusType === "STATUS_SCHEDULED";

  return (
    <Box
      p={4}
      borderRadius="md"
      color="white"
      position="relative"
      overflow="hidden"
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

      {/* Header Row */}
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <Text width="120px" fontWeight="medium" color="gray.400">
          {game.shortDetail}
        </Text>
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
            <Text>T</Text>
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
          <Text fontWeight="medium" color={game.awayTeamColor} fontSize="lg">
            {getTeamOnlyName(game.awayTeam)}
          </Text>
        </Flex>
        {!isScheduled && (
          <Grid templateColumns="repeat(5, 50px)" gap={0} textAlign="center">
            {filledAwayScores.map((score, index) => (
              <Text key={index} fontSize="lg">
                {score}
              </Text>
            ))}
            <Text fontSize="lg" fontWeight="medium">
              {game.awayScore === "0" ? "-" : game.awayScore}
            </Text>
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
          <Text fontWeight="medium" color={game.homeTeamColor} fontSize="lg">
            {getTeamOnlyName(game.homeTeam)}
          </Text>
        </Flex>
        {!isScheduled && (
          <Grid templateColumns="repeat(5, 50px)" gap={0} textAlign="center">
            {filledHomeScores.map((score, index) => (
              <Text key={index} fontSize="lg">
                {score}
              </Text>
            ))}
            <Text fontSize="lg" fontWeight="medium">
              {game.homeScore === "0" ? "-" : game.homeScore}
            </Text>
          </Grid>
        )}
      </Flex>
    </Box>
  );
};

export default ScoreboardScoreCard;
