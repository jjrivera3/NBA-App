import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaCaretLeft, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ScoreboardScoreCardProps from "../../entities/ScoreboardScoreCardProps";
import { useGameStatus, useWinnerStatus } from "../../hooks/useGameStatus";
import {
  fillScores,
  formatDateTime,
  getTeamOnlyName,
} from "../../utils/scoreboardUtils";

const ScoreboardScoreCard: React.FC<ScoreboardScoreCardProps> = ({ game }) => {
  const navigate = useNavigate();
  const { awayLinescores = [0, 0, 0, 0], homeLinescores = [0, 0, 0, 0] } = game;

  const filledAwayScores = fillScores(awayLinescores);
  const filledHomeScores = fillScores(homeLinescores);
  const formattedTime = formatDateTime(game.date);

  const { isScheduled, isFinal, isInProgress } = useGameStatus(game.statusType);
  const { isAwayWinner, isHomeWinner } = useWinnerStatus(
    isFinal,
    game.awayScore,
    game.homeScore
  );

  return (
    <Box
      borderLeftRadius="5px"
      borderRightRadius={{ base: "5px", md: "0" }}
      color="white"
      position="relative"
      overflow="hidden"
      px={{ base: 4, md: 8 }}
      py={6}
      borderRight={{ base: "none", md: "1px solid #545454" }}
      borderBottom={{ base: "1px solid #545454", md: "none" }}
      background="linear-gradient(180deg, #484848 0%, #2e2e2e 100%, #353535 100%)"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box
          maxW="220px"
          display="flex"
          alignItems="center"
          flexDirection="column"
          whiteSpace="nowrap"
        >
          <Text
            fontWeight={600}
            fontSize="14px"
            color={isFinal ? "white" : "#20da77"}
          >
            {game.shortDetail
              ? game.shortDetail
              : isScheduled
              ? formattedTime
              : "Status Unavailable"}
          </Text>
          {isInProgress && (
            <Box
              width="100%"
              height="2px"
              overflow="hidden"
              position="relative"
              mt={1}
            >
              <Box
                width="100%"
                height="2px"
                backgroundColor="#20da77"
                position="absolute"
                animation="animation-ariwm7 1.4s infinite alternate cubic-bezier(0.21, 0.85, 0.34, 0.98)"
              />
            </Box>
          )}
        </Box>

        {!isScheduled && (
          <Grid
            templateColumns={{ base: "repeat(5, 40px)", md: "repeat(5, 50px)" }}
            gap={0}
            textAlign="center"
            color="gray.200"
            fontWeight="500"
            fontSize="15px"
          >
            <Text>1</Text>
            <Text>2</Text>
            <Text>3</Text>
            <Text>4</Text>
            <Text fontWeight="bold">T</Text>
          </Grid>
        )}
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mt={6} mb={4}>
        <Flex alignItems="center" width="250px" mr={5}>
          <Image
            src={game.awayLogo}
            alt={getTeamOnlyName(game.awayTeam)}
            boxSize="35px"
            mr={3}
          />
          <Box>
            <Text
              fontWeight={
                isInProgress || (!isAwayWinner && isFinal)
                  ? "300"
                  : isAwayWinner
                  ? "bold"
                  : "600"
              }
              color={game.awayTeamColor}
              fontSize={{ base: "sm", md: "lg" }}
            >
              <Text
                display={{ base: "inline", md: "none" }}
                as="span"
                fontSize={{ base: "sm", md: "lg" }}
              >
                {game.awayAbbreviation}
              </Text>
              <Text
                display={{ base: "none", md: "inline" }}
                as="span"
                fontSize={{ base: "sm", md: "lg" }}
              >
                {getTeamOnlyName(game.awayTeam)}
              </Text>
              <Box as="span" display={{ base: "none", md: "inline" }}>
                <Text
                  as="span"
                  fontSize="sm"
                  color={isAwayWinner ? "white" : "gray.100"}
                  ml={2}
                >
                  ( {game.awayRecord} )
                </Text>
              </Box>
            </Text>
          </Box>
        </Flex>

        {!isScheduled && (
          <Grid
            templateColumns={{ base: "repeat(5, 40px)", md: "repeat(5, 50px)" }}
            gap={0}
            textAlign="center"
            alignItems="center"
            color="gray.200"
            fontWeight="500"
            fontSize="15px"
          >
            {filledAwayScores.map((score, index) => (
              <Text key={index} fontSize="15px">
                {score}
              </Text>
            ))}
            <Box position="relative">
              <Text
                fontSize="lg"
                fontWeight={isAwayWinner ? "bold" : "400"}
                color={isAwayWinner ? "white" : "gray.200"}
              >
                {game.awayScore === "0" ? "-" : game.awayScore}
              </Text>
              {isAwayWinner && (
                <Box
                  as={FaCaretLeft}
                  color={game.awayTeamColor}
                  position="absolute"
                  left={{ base: "35px", md: "40px" }}
                  top="50%"
                  transform="translateY(-50%)"
                  fontSize="20px"
                />
              )}
            </Box>
          </Grid>
        )}
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mt={3}>
        <Flex alignItems="center" width="250px" mr={5}>
          <Image
            src={game.homeLogo}
            alt={getTeamOnlyName(game.homeTeam)}
            boxSize="35px"
            mr={3}
          />
          <Box>
            <Text
              fontWeight={
                isInProgress || (!isHomeWinner && isFinal)
                  ? "300"
                  : isHomeWinner
                  ? "bold"
                  : "600"
              }
              color={game.homeTeamColor}
              fontSize={{ base: "sm", md: "lg" }}
            >
              <Text
                display={{ base: "inline", md: "none" }}
                as="span"
                fontSize={{ base: "sm", md: "lg" }}
              >
                {game.homeAbbreviation}
              </Text>
              <Text
                display={{ base: "none", md: "inline" }}
                as="span"
                fontSize={{ base: "sm", md: "lg" }}
              >
                {getTeamOnlyName(game.homeTeam)}
              </Text>
              <Box as="span" display={{ base: "none", md: "inline" }}>
                <Text
                  as="span"
                  fontSize="sm"
                  color={isHomeWinner ? "white" : "gray.100"}
                  ml={2}
                >
                  ( {game.homeRecord} )
                </Text>
              </Box>
            </Text>
          </Box>
        </Flex>

        {!isScheduled && (
          <Grid
            templateColumns={{ base: "repeat(5, 40px)", md: "repeat(5, 50px)" }}
            gap={0}
            textAlign="center"
            alignItems="center"
          >
            {filledHomeScores.map((score, index) => (
              <Text key={index} fontSize="15px">
                {score}
              </Text>
            ))}
            <Box position="relative">
              <Text
                fontSize="lg"
                fontWeight={isHomeWinner ? "bold" : "400"}
                color={isHomeWinner ? "white" : "gray.200"}
              >
                {game.homeScore === "0" ? "-" : game.homeScore}
              </Text>
              {isHomeWinner && (
                <Box
                  as={FaCaretLeft}
                  color={game.homeTeamColor}
                  position="absolute"
                  left={{ base: "35px", md: "40px" }}
                  top="50%"
                  transform="translateY(-50%)"
                  fontSize="20px"
                />
              )}
            </Box>
          </Grid>
        )}
      </Flex>

      {!isScheduled && (
        <Flex justifyContent="flex-end" mt={4} alignItems="center">
          <FaEye color="#f8991d" />
          <Text
            as="span"
            color="#f8991d"
            fontSize="14px"
            cursor="pointer"
            onClick={() => navigate(`/boxscore/${game.gameID}`)}
            ml={2}
            _hover={{ textDecoration: "underline" }}
          >
            View Box Score
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default ScoreboardScoreCard;
