import React from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Image,
  Button,
  keyframes,
} from "@chakra-ui/react";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

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

const GameCard: React.FC<GameProps> = ({ game }) => {
  const awayScore = parseInt(game.awayScore || "0");
  const homeScore = parseInt(game.homeScore || "0");

  const isAwayWinner = awayScore > homeScore;
  const isHomeWinner = homeScore > awayScore;

  return (
    <Box
      borderRadius="md"
      color="white"
      position="relative"
      overflow="hidden"
      background="linear-gradient(145deg, #464646, #3a3a3a, #333333)"
      pt={3}
      pb={1}
      boxShadow="md"
      border="1px solid #3a3a3a"
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

      {/* Container for In Progress and shortDetail at the top corners */}
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        p={2}
        position="absolute"
        top="8px"
        left="0"
        right="0"
      >
        {game.statusType === "STATUS_IN_PROGRESS" ||
        game.statusType === "STATUS_HALFTIME" ||
        game.statusType === "STATUS_END_PERIOD" ? (
          <>
            <Text fontSize="12px" fontWeight={500} color="#20da77">
              In Progress
            </Text>
            <Box textAlign="right" maxW="80%">
              <Text fontSize="12px" color="#20da77" fontWeight={500}>
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
          </>
        ) : game.statusType === "STATUS_FINAL" ? (
          <>
            <Text fontSize="12px" color="white" fontWeight={500}>
              Final - {game.gameDateFormatted}
            </Text>
            <Box />
          </>
        ) : (
          <Flex justifyContent="space-between" width="100%">
            <Text fontSize="12px" color="white" fontWeight={500}>
              Today
            </Text>
            <Text fontSize="12px" color="white" fontWeight={500}>
              {game.time}
            </Text>
          </Flex>
        )}
      </Flex>

      <Box p={3} mt={3}>
        <Flex alignItems="center" justifyContent="space-between" mt={2} mb={3}>
          <VStack spacing={1} align="center">
            <Image
              src={game.awayLogo}
              alt={`${game.awayTeam} logo`}
              boxSize={{ base: "50px", md: "30px" }} // Larger size on mobile
              mt="10px"
            />
            <Text fontSize="13px" fontWeight={600} mt={1}>
              {game.awayTeam}
            </Text>
          </VStack>

          {game.statusType === "STATUS_FINAL" ? (
            <Flex
              alignItems="center"
              fontSize={{ base: "24px", md: "24px", lg: "22px" }}
              fontWeight={500}
              color="gray.300"
            >
              <Text
                as="span"
                fontWeight={isAwayWinner ? "bold" : "normal"}
                color={isAwayWinner ? "white" : "gray.300"}
              >
                {game.awayScore}
              </Text>
              <Box
                mx={2}
                color="white"
                style={{
                  marginLeft: isAwayWinner ? "-3px" : undefined,
                  marginRight: isHomeWinner ? "-3px" : undefined,
                }}
              >
                {isAwayWinner ? <FaCaretLeft /> : <FaCaretRight />}
              </Box>
              <Text
                as="span"
                fontWeight={isHomeWinner ? "600" : "normal"}
                color={isHomeWinner ? "white" : "gray.300"}
              >
                {game.homeScore}
              </Text>
            </Flex>
          ) : game.statusType === "STATUS_IN_PROGRESS" ||
            game.statusType === "STATUS_HALFTIME" ||
            game.statusType === "STATUS_END_PERIOD" ? (
            <Text fontSize="22px" fontWeight={500} color="gray.100">
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
              boxSize={{ base: "50px", md: "30px" }} // Larger size on mobile
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
            boxShadow="md"
            border="1px solid #3a3a3a"
            background="#2a2a2a"
          >
            <Flex justifyContent="center" alignItems="center">
              <Text fontSize="12px" fontWeight={500} color="#f8991d">
                {game.odds.details}
              </Text>
              <Text mx={2} color="#cccccc">
                •
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
            backgroundColor="#2a2a2a"
            borderTopRadius="md"
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
};

export default GameCard;
