import {
  Box,
  Flex,
  VStack,
  Text,
  Image,
  Button,
  keyframes,
} from "@chakra-ui/react";

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
    shortDetail: string;
    gameDateFormatted: string;
    time: string;
    odds?: {
      details: string;
      overUnder: string;
    } | null;
  };
}

// Define the keyframes for the moving line animation
const lineAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const GameCard: React.FC<GameProps> = ({ game }) => (
  <Box
    borderRadius="md"
    color="white"
    border="1px solid #444444"
    position="relative"
    background="#292929"
    overflow="hidden"
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

    {/* Container for In Progress and shortDetail at the top corners */}
    <Flex
      justifyContent="space-between"
      alignItems="flex-start" // Align items at the top
      p={2}
      position="absolute"
      top="8px"
      left="0"
      right="0"
    >
      {game.statusType === "STATUS_IN_PROGRESS" ||
      game.statusType === "STATUS_HALFTIME" ||
      game.statusType === "STATUS_END_PERIOD" ? (
        // Live game layout: In Progress on left, shortDetail on right
        <>
          <Text fontSize="11px" fontWeight={500} color="#20da77">
            In Progress
          </Text>
          <Box textAlign="right" maxW="80%">
            <Text fontSize="11px" color="#20da77" fontWeight={500}>
              {game.shortDetail}
            </Text>
            <Box
              width="100%"
              height="2px"
              overflow="hidden"
              mt="1px"
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
        </>
      ) : game.statusType === "STATUS_FINAL" ? (
        // Final game layout: show Final on the left
        <>
          <Text fontSize="11px" color="white" fontWeight={500}>
            Final {game.gameDateFormatted}
          </Text>
          <Box />
        </>
      ) : (
        // Pre-game layout: show time on the left
        <>
          <Text fontSize="11px" color="white" fontWeight={500}>
            {game.time}
          </Text>
          <Box />
        </>
      )}
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
        {game.statusType === "STATUS_FINAL" ||
        game.statusType === "STATUS_IN_PROGRESS" ||
        game.statusType === "STATUS_HALFTIME" ||
        game.statusType === "STATUS_END_PERIOD" ? (
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
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          backgroundColor="#333333"
          boxShadow="md"
          border="1px solid #3a3a3a"
        >
          <Button
            size="xs"
            color="#cccccc"
            fontSize="12px"
            fontWeight={500}
            variant="unstyled"
            _hover={{ color: "#f8991d" }}
          >
            Box Score
          </Button>
        </Box>
      )}
    </Box>
  </Box>
);

export default GameCard;
