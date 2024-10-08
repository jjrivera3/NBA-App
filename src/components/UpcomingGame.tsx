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
  teamColor: string;
  opponentColor: string;
  selectedPrimaryColor: string;
  opponentPrimaryColor: string;
}

const UpcomingGame: React.FC<UpcomingGameProps> = ({
  isHomeTeam,
  teamLogo,
  teamAbbrev,
  opponentLogo,
  opponentAbbrev,
  nextGameDate,
  nextGameTime,
  teamColor,
  opponentColor,
  selectedPrimaryColor,
  opponentPrimaryColor,
}) => {
  // Determine which team is "home" and which is "away" based on the selected team
  const awayLogo = isHomeTeam ? opponentLogo : teamLogo;
  const awayAbbrev = isHomeTeam ? opponentAbbrev : teamAbbrev;
  const homeLogo = isHomeTeam ? teamLogo : opponentLogo;
  const homeAbbrev = isHomeTeam ? teamAbbrev : opponentAbbrev;

  const awayColor = isHomeTeam ? opponentPrimaryColor : selectedPrimaryColor;
  const homeColor = isHomeTeam ? selectedPrimaryColor : opponentPrimaryColor;

  return (
    <Box
      mt={7}
      p={5}
      borderRadius="md"
      boxShadow="2xl"
      textAlign="center"
      background="linear-gradient(88deg, #1a1a1d 0%, #2d2d30 50%, #333333 100%)"
      border="1px solid #000"
      style={{
        borderLeft: `6px solid ${isHomeTeam ? opponentColor : teamColor}`,
        borderRight: `6px solid ${isHomeTeam ? teamColor : opponentColor}`,
      }}
    >
      <Text fontSize="xl" fontWeight="bold">
        Upcoming Game
      </Text>
      <Box mt={4} mb={2}>
        <Flex align="center" justify="space-evenly">
          {/* Left Side - Always Away Team */}
          <Flex align="center">
            <Flex direction="column" align="center">
              <Image
                src={awayLogo}
                alt={`${awayAbbrev} logo`}
                boxSize="100px"
              />
              <Flex direction="column" align="center" mt={1}>
                <Text fontSize="xl" fontWeight={600} color="white">
                  {awayAbbrev}
                </Text>
                <Text fontSize="sm" color="gray.300">
                  Away
                </Text>
              </Flex>
            </Flex>
          </Flex>

          {/* Center - Always shows "@" */}
          <Text fontSize="2xl" fontWeight="bold" color="white">
            @
          </Text>

          {/* Right Side - Always Home Team */}
          <Flex align="center">
            <Flex direction="column" align="center">
              <Image
                src={homeLogo}
                alt={`${homeAbbrev} logo`}
                boxSize="100px"
              />
              <Flex direction="column" align="center" mt={1}>
                <Text fontSize="xl" fontWeight={600} color="white">
                  {homeAbbrev}
                </Text>
                <Text fontSize="sm" color="gray.300">
                  Home
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex direction="column" align="center" justify="center" mt={2}>
        <Text fontSize="16px" fontWeight={600} color="white" mb={1}>
          {nextGameDate}
        </Text>
        <Text fontSize="16px" fontWeight={600} color="white" mb={1}>
          {nextGameTime}
        </Text>
      </Flex>
    </Box>
  );
};

export default UpcomingGame;
