import { Box, Flex, VStack, Text, Image } from "@chakra-ui/react";

interface GameProps {
  game: {
    awayTeamColor: string;
    homeTeamColor: string;
    awayLogo: string;
    homeLogo: string;
    awayTeam: string;
    homeTeam: string;
    awayScore?: string | null;
    homeScore?: string | null;
    statusType: string;
    gameDateFormatted: string;
    time: string;
    odds?: {
      details: string;
      overUnder: string;
    } | null;
  };
}

const GameCard: React.FC<GameProps> = ({ game }) => (
  <Box
    borderRadius="md"
    color="white"
    border="1px solid #444444"
    position="relative"
    background="#292929"
  >
    <Flex
      height="6px"
      borderTopRadius="md"
      overflow="hidden"
      position="relative"
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

    <Box p={3} mt={3} background="#292929">
      <Flex alignItems="center" justifyContent="space-between">
        <VStack spacing={1} align="center" mt="4px">
          <Image
            src={game.awayLogo}
            alt={`${game.awayTeam} logo`}
            boxSize="25px"
            mt="10px"
          />
          <Text fontSize="13px" fontWeight={600} mt={1}>
            {game.awayTeam}
          </Text>
        </VStack>
        {game.statusType === "STATUS_FINAL" ? (
          <Text fontSize="md" fontWeight={500} color="gray.300">
            {game.awayScore} - {game.homeScore}
          </Text>
        ) : (
          <Text fontSize="md" fontWeight={500} color="gray.300">
            vs
          </Text>
        )}
        <VStack spacing={1} align="center" mt="4px">
          <Image
            src={game.homeLogo}
            alt={`${game.homeTeam} logo`}
            boxSize="25px"
            mt="10px"
          />
          <Text fontSize="13px" fontWeight={600} mt={1}>
            {game.homeTeam}
          </Text>
        </VStack>
      </Flex>
      <Box position="absolute" top="15px" left="5px">
        <Text fontSize="11px" color="white" fontWeight={500}>
          {game.statusType === "STATUS_HALFTIME" ||
          game.statusType === "STATUS_IN_PROGRESS" ? (
            <Text color="green.400">In Progress</Text>
          ) : game.statusType === "STATUS_FINAL" ? (
            `Final ${game.gameDateFormatted}`
          ) : (
            game.time
          )}
        </Text>
      </Box>
      {game.odds ? (
        <Box
          textAlign="center"
          mt={2}
          p={0}
          borderRadius="md"
          backgroundColor="#1f1f1f"
          boxShadow="md"
          border="1px solid #3a3a3a"
        >
          <Flex justifyContent="center" alignItems="center">
            <Text fontSize="12px" fontWeight={500} color="#f8991d">
              {game.odds.details}
            </Text>
            <Text mx={2} color="#cccccc">
              |
            </Text>
            <Text fontSize="12px" fontWeight={500} color="#f8991d">
              O/U: {game.odds.overUnder}
            </Text>
          </Flex>
        </Box>
      ) : (
        <Box
          mt={2}
          height="25px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          backgroundColor="#333333"
        >
          <Text fontSize="12px" fontWeight={500} color="gray.400">
            Game Over
          </Text>
        </Box>
      )}
    </Box>
  </Box>
);

export default GameCard;
