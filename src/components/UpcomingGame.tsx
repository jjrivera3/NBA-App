import { Box, Flex, Image, Text } from "@chakra-ui/react";

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
}) => {
  const awayLogo = isHomeTeam ? opponentLogo : teamLogo;
  const awayAbbrev = isHomeTeam ? opponentAbbrev : teamAbbrev;
  const homeLogo = isHomeTeam ? teamLogo : opponentLogo;
  const homeAbbrev = isHomeTeam ? teamAbbrev : opponentAbbrev;

  return (
    <Box mt={7} borderRadius="md" boxShadow="2xl" overflow="hidden">
      {/* Top Bar with Team Colors */}
      <Flex height="6px" overflow="hidden">
        <Box flex="1" backgroundColor={teamColor} />
        <Box flex="1" backgroundColor={opponentColor} />
      </Flex>

      <Box
        p={5}
        textAlign="center"
        background="linear-gradient(88deg, #1a1a1d 0%, #2d2d30 50%, #333333 100%)"
        border="1px solid #000"
      >
        <Text
          fontSize={{ base: "md", md: "xl" }}
          fontWeight={600}
          color="gray.100"
          mt={2}
        >
          Upcoming Game
        </Text>
        <Box mt={4} mb={2}>
          <Flex align="center" justify="space-evenly">
            {/* Away Team */}
            <Flex direction="column" align="center">
              <Image
                src={awayLogo}
                alt={`${awayAbbrev} logo`}
                boxSize={{ base: "60px", md: "100px" }} // Smaller size on mobile
              />
              <Text
                fontSize={{ base: "md", md: "xl" }} // Smaller font size on mobile
                fontWeight={600}
                color="white"
              >
                {awayAbbrev}
              </Text>
              <Text fontSize="sm" color="gray.300">
                Away
              </Text>
            </Flex>

            {/* Separator with "vs" */}
            <Text
              fontSize={{ base: "md", md: "2xl" }}
              fontWeight="bold"
              color="white"
            >
              vs
            </Text>

            {/* Home Team */}
            <Flex direction="column" align="center">
              <Image
                src={homeLogo}
                alt={`${homeAbbrev} logo`}
                boxSize={{ base: "60px", md: "100px" }} // Smaller size on mobile
              />
              <Text
                fontSize={{ base: "md", md: "xl" }} // Smaller font size on mobile
                fontWeight={600}
                color="white"
              >
                {homeAbbrev}
              </Text>
              <Text fontSize="sm" color="gray.300">
                Home
              </Text>
            </Flex>
          </Flex>
        </Box>

        {/* Game Date and Time */}
        <Box mt={3}>
          <Text
            fontSize={{ base: "sm", md: "16px" }}
            fontWeight={600}
            color="white"
          >
            {nextGameDate}
          </Text>
          <Text
            fontSize={{ base: "sm", md: "16px" }}
            fontWeight={600}
            color="white"
          >
            {nextGameTime}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default UpcomingGame;
