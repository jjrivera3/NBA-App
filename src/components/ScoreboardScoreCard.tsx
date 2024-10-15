import React from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Image,
  Button,
  keyframes,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

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
    awayTeamPeriods?: number[]; // Period scores for the away team
    homeTeamPeriods?: number[]; // Period scores for the home team
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

const ScoreboardScoreCard: React.FC<GameProps> = ({ game }) => {
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
      {/* Game Status */}
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        p={2}
        position="absolute"
        top="8px"
        left="0"
        right="0"
      >
        {game.statusType === "STATUS_IN_PROGRESS" ? (
          <>
            <Text fontSize="12px" fontWeight={500} color="#20da77">
              In Progress
            </Text>
            <Text fontSize="12px" color="#20da77" fontWeight={500}>
              {game.shortDetail}
            </Text>
          </>
        ) : game.statusType === "STATUS_FINAL" ? (
          <Text fontSize="12px" color="white" fontWeight={500}>
            Final - {game.gameDateFormatted}
          </Text>
        ) : (
          <>
            <Text fontSize="12px" color="white" fontWeight={500}>
              Today
            </Text>
            <Text fontSize="12px" color="white" fontWeight={500}>
              {game.time}
            </Text>
          </>
        )}
      </Flex>

      {/* Teams and Scores */}
      <Box p={3} mt={3}>
        {game.statusType === "STATUS_FINAL" ? (
          <VStack spacing={2} align="center">
            {/* Away Team */}
            <Flex alignItems="center" width="100%">
              <Image
                src={game.awayLogo}
                alt={`${game.awayTeam} logo`}
                boxSize="30px"
              />
              <VStack ml={3} spacing={0} align="left">
                <Text fontSize="13px" fontWeight={600}>
                  {game.awayTeam}
                </Text>
                <HStack spacing={2}>
                  {game.awayTeamPeriods?.map((score, index) => (
                    <Text
                      key={index}
                      fontSize="12px"
                      color="gray.400"
                      fontWeight="bold"
                    >
                      {score}
                    </Text>
                  ))}
                </HStack>
              </VStack>
              <Text
                fontSize="20px"
                fontWeight="bold"
                ml="auto"
                color={isAwayWinner ? "white" : "gray.300"}
              >
                {game.awayScore}
              </Text>
            </Flex>

            {/* Divider */}
            <Divider my={2} borderColor="gray.500" />

            {/* Home Team */}
            <Flex alignItems="center" width="100%">
              <Image
                src={game.homeLogo}
                alt={`${game.homeTeam} logo`}
                boxSize="30px"
              />
              <VStack ml={3} spacing={0} align="left">
                <Text fontSize="13px" fontWeight={600}>
                  {game.homeTeam}
                </Text>
                <HStack spacing={2}>
                  {game.homeTeamPeriods?.map((score, index) => (
                    <Text
                      key={index}
                      fontSize="12px"
                      color="gray.400"
                      fontWeight="bold"
                    >
                      {score}
                    </Text>
                  ))}
                </HStack>
              </VStack>
              <Text
                fontSize="20px"
                fontWeight="bold"
                ml="auto"
                color={isHomeWinner ? "white" : "gray.300"}
              >
                {game.homeScore}
              </Text>
            </Flex>
          </VStack>
        ) : (
          <Flex alignItems="center" justifyContent="space-between">
            {/* Regular Horizontal Layout */}
            <VStack spacing={1} align="center">
              <Image
                src={game.awayLogo}
                alt={`${game.awayTeam} logo`}
                boxSize="30px"
              />
              <Text fontSize="13px" fontWeight={600}>
                {game.awayTeam}
              </Text>
            </VStack>
            <Text fontSize="md" fontWeight={500} color="gray.300">
              vs
            </Text>
            <VStack spacing={1} align="center">
              <Image
                src={game.homeLogo}
                alt={`${game.homeTeam} logo`}
                boxSize="30px"
              />
              <Text fontSize="13px" fontWeight={600}>
                {game.homeTeam}
              </Text>
            </VStack>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default ScoreboardScoreCard;
