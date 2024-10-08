// src/components/UpcomingGame.tsx
import { Box, Flex, Text, Image } from "@chakra-ui/react";

interface UpcomingGameProps {
  isHomeTeam: boolean;
  teamLogo: string | undefined;
  teamAbbrev: string | undefined;
  opponentLogo: string | undefined;
  opponentAbbrev: string | undefined;
  nextGameDate: string;
  nextGameTime: string;
}

const UpcomingGame: React.FC<UpcomingGameProps> = ({
  isHomeTeam,
  teamLogo,
  teamAbbrev,
  opponentLogo,
  opponentAbbrev,
  nextGameDate,
  nextGameTime,
}) => (
  <Box
    mt={7}
    p={5}
    borderRadius="md"
    boxShadow="2xl"
    textAlign="center"
    bg="#26262640"
    border="1px solid #000"
  >
    <Text fontSize="xl" fontWeight="bold">
      Upcoming Game
    </Text>
    <Box mt={4} mb={2}>
      <Flex align="center" justify="space-between">
        {/* Left Side - Home or Away Label and Logo */}
        <Flex align="center">
          <Text fontSize="sm" color="white" mr={2}>
            {isHomeTeam ? "Home" : "Away"}
          </Text>
          <Flex direction="column" align="center">
            <Image src={teamLogo} alt={`${teamAbbrev} logo`} boxSize="75px" />
            <Text fontSize="sm" color="white" mt={1}>
              {teamAbbrev}
            </Text>
          </Flex>
        </Flex>

        <Text fontSize="2xl" fontWeight="bold" color="white">
          {isHomeTeam ? "vs" : "@"}
        </Text>

        {/* Right Side - Logo and Home or Away Label */}
        <Flex align="center">
          <Flex direction="column" align="center">
            <Image
              src={opponentLogo}
              alt={`${opponentAbbrev} logo`}
              boxSize="75px"
            />
            <Text fontSize="sm" color="white" mt={1}>
              {opponentAbbrev}
            </Text>
          </Flex>
          <Text fontSize="sm" color="white" ml={2}>
            {isHomeTeam ? "Away" : "Home"}
          </Text>
        </Flex>
      </Flex>
    </Box>
    <Flex direction="column" align="center" justify="center" mt={2}>
      <Text fontSize="15px" color="white" mb={1}>
        {nextGameDate}
      </Text>
      <Text fontSize="15px" color="white">
        {nextGameTime}
      </Text>
    </Flex>
  </Box>
);

export default UpcomingGame;
