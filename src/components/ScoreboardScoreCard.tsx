import React from "react";
import { Box, Flex, Image, Text, VStack, HStack } from "@chakra-ui/react";

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

  return (
    <Box width="100%" p={4} bg="gray.800" borderRadius="md" color="white">
      <Text mb={2} fontSize="sm" color="gray.400" textAlign="center">
        {game.statusType} - {game.shortDetail}
      </Text>

      {/* Header Row */}
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text width="120px" fontWeight="bold">
          Team
        </Text>
        <Flex flex="1" justifyContent="space-around">
          <Text width="40px" textAlign="center">
            1
          </Text>
          <Text width="40px" textAlign="center">
            2
          </Text>
          <Text width="40px" textAlign="center">
            3
          </Text>
          <Text width="40px" textAlign="center">
            4
          </Text>
          <Text width="50px" textAlign="center" fontWeight="bold">
            T
          </Text>
        </Flex>
      </Flex>

      {/* Away Team Row */}
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Flex alignItems="center" width="120px">
          <Image
            src={game.awayLogo}
            alt={game.awayTeam}
            boxSize="30px"
            mr={2}
          />
          <Text fontWeight="bold" color={game.awayTeamColor}>
            {game.awayTeam}
          </Text>
        </Flex>
        <Flex flex="1" justifyContent="space-around">
          {awayLinescores.map((score, index) => (
            <Text key={index} width="40px" textAlign="center">
              {score}
            </Text>
          ))}
          <Text width="50px" textAlign="center" fontWeight="bold">
            {game.awayScore}
          </Text>
        </Flex>
      </Flex>

      {/* Home Team Row */}
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Flex alignItems="center" width="120px">
          <Image
            src={game.homeLogo}
            alt={game.homeTeam}
            boxSize="30px"
            mr={2}
          />
          <Text fontWeight="bold" color={game.homeTeamColor}>
            {game.homeTeam}
          </Text>
        </Flex>
        <Flex flex="1" justifyContent="space-around">
          {homeLinescores.map((score, index) => (
            <Text key={index} width="40px" textAlign="center">
              {score}
            </Text>
          ))}
          <Text width="50px" textAlign="center" fontWeight="bold">
            {game.homeScore}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ScoreboardScoreCard;
