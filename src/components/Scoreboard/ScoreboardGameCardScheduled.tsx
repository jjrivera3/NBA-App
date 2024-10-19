import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface GameProps {
  game: {
    gameID: string;
    awayTeamColor: string;
    homeTeamColor: string;
    awayLogo: string;
    homeLogo: string;
    awayTeam: string;
    homeTeam: string;
    awayScore?: string | null;
    homeScore?: string | null;
    statusType: string;
    shortDetail: string;
    gameDateFormatted: string;
    time: string;
    odds?: {
      details: string;
      overUnder: string;
    } | null;
  };
}

const ScoreboardGameCardScheduled: React.FC<GameProps> = ({ game }) => {
  // Helper function to get only the team name (last part of the string)
  const getTeamOnlyName = (teamName: string) => {
    return teamName.split(" ").slice(-1)[0];
  };

  return (
    <Box
      borderRadius="md"
      color="white"
      position="relative"
      overflow="hidden"
      background="linear-gradient(90deg, #5b5b5b 0%, #2e2e2e 100%, #353535 100%)"
      pt={5}
      pb={7}
      boxShadow="md"
      border="1px solid #3a3a3a"
      px={7}
    >
      {/* Game Details */}
      <Flex justifyContent="flex-start" width="100%" alignItems="center">
        <Text fontWeight={600} fontSize="14px">
          {game.time}
        </Text>
      </Flex>

      <Box p={3} mt={3}>
        {/* Flex container for logos and "vs" */}
        <Flex alignItems="center" justifyContent="space-between" mt={2} mb={3}>
          {/* Away Team */}
          <VStack spacing={1} align="center" width="200px">
            {/* Fixed width */}
            <Image
              src={game.awayLogo}
              alt={`${game.awayTeam} logo`}
              boxSize={{ base: "50px", md: "50px" }} // Larger size on mobile
              mt="10px"
            />
            <Text fontSize="16px" fontWeight={600} mt={1}>
              {getTeamOnlyName(game.awayTeam)} {/* Display only team name */}
            </Text>
          </VStack>

          {/* VS text centered */}
          <Flex
            justifyContent="center"
            alignItems="center"
            flexBasis="100px" // Ensure "vs" stays centered
          >
            <Text
              fontSize="md"
              fontWeight={500}
              color="gray.300"
              textAlign="center"
            >
              vs
            </Text>
          </Flex>

          {/* Home Team */}
          <VStack spacing={1} align="center" width="200px">
            {/* Fixed width */}
            <Image
              src={game.homeLogo}
              alt={`${game.homeTeam} logo`}
              boxSize={{ base: "50px", md: "50px" }} // Larger size on mobile
              mt="10px"
            />
            <Text fontSize="16px" fontWeight={600} mt={1}>
              {getTeamOnlyName(game.homeTeam)} {/* Display only team name */}
            </Text>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default ScoreboardGameCardScheduled;
