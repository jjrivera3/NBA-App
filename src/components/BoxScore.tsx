import {
  Box,
  Flex,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect } from "react"; // Import useEffect
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { BoxScoreData, Player } from "../entities/BoxScoreTypes";
import useBoxScore from "../hooks/useBoxScore";
import { formatDateTime } from "../utils/scoreboardUtils";
import BoxScoreSkeleton from "./skeletons/BoxScoreSkeleton";

const BoxScore = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const location = useLocation();
  const { game } = location.state || {}; // Retrieve game and selectedDate from state
  const { selectedEvent } = location.state || {}; // Retrieve the passed selectedEvent

  useEffect(() => {
    // Scroll to the top of the page when the component loads
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only on mount

  const options = {
    refetchOnWindowFocus: true,
    staleTime: 10 * 60 * 1000,
  };

  const { data, isLoading, isError } = useBoxScore(gameId || "", options) as {
    data: BoxScoreData | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const showImage = useBreakpointValue({ base: false, md: true });

  if (isLoading) return <BoxScoreSkeleton />;

  if (isError)
    return <Text color="red.500">Error loading box score data.</Text>;

  const awayTeam = data?.teams?.find((team) => team.homeAway === "away");
  const homeTeam = data?.teams?.find((team) => team.homeAway === "home");

  const getFinalScore = (teamData: Player) => {
    const lastTotal = teamData.statistics[0].totals.at(-1);
    return lastTotal ? parseInt(lastTotal, 10) : 0;
  };

  const awayScore = data && getFinalScore(data.players[0]);
  const homeScore = data && getFinalScore(data.players[1]);

  const isAwayWinner = (awayScore ?? 0) > (homeScore ?? 0);
  const isHomeWinner = (homeScore ?? 0) > (awayScore ?? 0);

  const formatColor = (color: string | undefined) => {
    return color && !color.startsWith("#") ? `#${color}` : color || "gray";
  };

  const renderBoxScoreHeader = () => {
    const isFinal =
      game?.statusType ||
      selectedEvent.competitions[0].status.type.name === "STATUS_FINAL";
    const isScheduled = game?.statusType === "Scheduled";
    const isInProgress = game?.statusType === "In Progress";
    const formattedTime = formatDateTime(game?.date);

    return (
      <Box mt={7} borderRadius="md" boxShadow="2xl" overflow="hidden">
        <Flex height="6px" overflow="hidden">
          <Box flex="1" backgroundColor={formatColor(awayTeam?.team.color)} />
          <Box flex="1" backgroundColor={formatColor(homeTeam?.team.color)} />
        </Flex>

        <Box
          padding="35px"
          textAlign="center"
          background="linear-gradient(180deg, #484848 0%, #2e2e2e 100%, #353535 100%)"
          border="0px 1px 1px 1px solid #000"
          position="relative"
        >
          <Box mt={4} mb={2}>
            <Flex
              align="center"
              justify={{ base: "center", md: "space-evenly" }}
            >
              {/* Away Team */}
              <Flex direction="row" align="center">
                <Flex direction="column" align="center" mx={2}>
                  <Image
                    src={awayTeam?.team.logo}
                    alt={`${awayTeam?.team.abbreviation} logo`}
                    boxSize={{ base: "50px", md: "80px" }}
                    objectFit="contain"
                  />
                  <Text
                    fontSize={{ base: "md", md: "xl" }}
                    fontWeight={600}
                    color="white"
                  >
                    {awayTeam?.team.abbreviation}
                  </Text>
                  <Text fontSize="12px" color="gray.300">
                    Away
                  </Text>
                </Flex>
                <Flex align="center">
                  <Text
                    fontWeight={isAwayWinner ? "bold" : "normal"}
                    fontSize={{ base: "2xl", md: "4xl" }}
                    color="white"
                    mr={isAwayWinner && isFinal ? 2 : 0}
                    ml={{ base: 15, md: 25 }}
                  >
                    {awayScore}
                  </Text>
                  {/* Show caret only if the game is final and the away team is the winner */}
                  {isAwayWinner && isFinal && (
                    <FaCaretLeft fontSize="24px" style={{ color: "#f8991d" }} />
                  )}
                </Flex>
              </Flex>

              <Text
                fontSize={{ base: "md", md: "2xl" }}
                fontWeight="bold"
                color="white"
                mx={4}
              >
                vs
              </Text>

              {/* Home Team */}
              <Flex direction="row" align="center">
                <Flex align="center">
                  {/* Show caret only if the game is final and the home team is the winner */}
                  {isHomeWinner && isFinal && (
                    <FaCaretRight
                      fontSize="24px"
                      style={{ color: "#f8991d", marginLeft: "4px" }}
                    />
                  )}
                  <Text
                    fontWeight={isHomeWinner ? "bold" : "normal"}
                    fontSize={{ base: "2xl", md: "4xl" }}
                    color="white"
                    ml={isHomeWinner && isFinal ? 0 : 2}
                    mr={25}
                  >
                    {homeScore}
                  </Text>
                </Flex>
                <Flex direction="column" align="center" mx={2}>
                  <Image
                    src={homeTeam?.team.logo}
                    alt={`${homeTeam?.team.abbreviation} logo`}
                    boxSize={{ base: "50px", md: "80px" }}
                    objectFit="contain"
                  />
                  <Text
                    fontSize={{ base: "md", md: "xl" }}
                    fontWeight={600}
                    color="white"
                  >
                    {homeTeam?.team.abbreviation}
                  </Text>
                  <Text fontSize="12px" color="gray.300">
                    Home
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>

          {/* New Top-Left Box */}
          <Box
            maxW="220px"
            display="flex"
            alignItems="center"
            flexDirection="column"
            whiteSpace="nowrap"
            position="absolute"
            top={5}
            left={5}
          >
            <Text
              fontWeight={600}
              fontSize="14px"
              color={isFinal ? "white" : "#20da77"}
            >
              {game?.shortDetail
                ? `${game.shortDetail} - ${
                    game.date
                      ? new Date(game.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : game.gameDateFormatted
                  }`
                : selectedEvent?.competitions?.[0]?.status?.type?.shortDetail
                ? `${selectedEvent.competitions[0].status.type.shortDetail} - ${
                    selectedEvent.date
                      ? new Date(selectedEvent.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "Date Unavailable"
                  }`
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
        </Box>
      </Box>
    );
  };

  const renderPlayerStats = (playerData: Player) => {
    const team = playerData.team;
    const { names, athletes, totals } = playerData.statistics[0];

    // Define the desired stat order
    const statOrder = ["MIN", "PTS", "REB", "AST"];

    // Reorder the `names` array
    const reorderedNames = [
      ...statOrder,
      ...names.filter((name) => !statOrder.includes(name)),
    ];

    // Reorder each athlete's stats to match the new order
    const reorderedAthletes = athletes.map((athlete) => ({
      ...athlete,
      stats: [
        ...statOrder.map((statName) => {
          const index = names.indexOf(statName);
          return index !== -1 ? athlete.stats[index] : null;
        }),
        ...athlete.stats.filter((_, i) => !statOrder.includes(names[i])),
      ],
    }));

    // Reorder totals to match the new order
    const reorderedTotals = [
      ...statOrder.map((statName) => {
        const index = names.indexOf(statName);
        return index !== -1 ? totals[index] : null;
      }),
      ...totals.filter((_, i) => !statOrder.includes(names[i])),
    ];

    return (
      <Box
        mb={8}
        background="#2a2a2a"
        padding="var(--chakra-space-3)"
        borderRadius="var(--chakra-radii-md)"
        overflow="hidden"
        mt="30px"
        borderTop={`4px solid ${formatColor(team.color)}`}
        boxShadow="2xl"
      >
        {/* Team Heading */}
        <Flex justify="space-between" align="center" mb={4} borderRadius="md">
          <Flex align="center">
            <Image
              src={team.logo}
              alt={`${team.abbreviation} logo`}
              boxSize={{ base: "30px", md: "40px" }}
              mr={2}
            />
            <Text fontSize={{ base: "md", md: "xl" }} fontWeight="bold">
              {team.displayName}
            </Text>
          </Flex>
        </Flex>

        {/* Player Statistics Table */}
        <Box overflowX="auto" position="relative" zIndex={10}>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th
                  whiteSpace="nowrap"
                  position="sticky"
                  left="0"
                  background="#2a2a2a"
                  zIndex="docked"
                  padding="0px!important"
                  borderColor="#3a3a3a!important"
                  fontSize={{ base: "11px", md: "13px" }}
                >
                  <Text fontWeight="bold" textAlign="left" color="#a0a0a0">
                    Player
                  </Text>
                </Th>
                {reorderedNames.map((name, index) => (
                  <Th
                    key={index}
                    whiteSpace="nowrap"
                    borderColor="#3a3a3a!important"
                    textAlign="center"
                    fontSize={{ base: "11px", md: "13px" }}
                  >
                    {name}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {reorderedAthletes.map((athlete, index) => (
                <Tr
                  key={athlete.athlete.id || index}
                  _hover={{ bg: "#333" }}
                  borderBottom="1px solid #3a3a3a"
                >
                  <Td
                    whiteSpace="nowrap"
                    position="sticky"
                    left="0"
                    background="#2a2a2a"
                    zIndex="docked"
                    width={{ base: "80px", md: "180px" }}
                    borderColor="#3a3a3a!important"
                    padding="5px"
                  >
                    <Flex align="center">
                      {showImage && (
                        <Image
                          src={athlete.athlete.headshot?.href}
                          alt={athlete.athlete.displayName}
                          boxSize={{ base: "30px", md: "40px" }}
                          mr={2}
                          borderRadius="full"
                          objectFit="contain"
                        />
                      )}
                      <Text
                        fontWeight="600"
                        whiteSpace="nowrap"
                        fontSize={{ base: "11px", md: "13px" }}
                        className="athletes"
                      >
                        {athlete.athlete.shortName}
                      </Text>
                    </Flex>
                  </Td>
                  {athlete.didNotPlay ? (
                    <Td
                      colSpan={reorderedNames.length}
                      textAlign={{ base: "left", md: "center" }}
                      color="gray.400"
                      borderColor="#3a3a3a!important"
                      fontSize={{ base: "12px", md: "14px" }}
                    >
                      {athlete.reason}
                    </Td>
                  ) : (
                    athlete.stats.map((stat, i) => (
                      <Td
                        key={i}
                        whiteSpace="nowrap"
                        borderColor="#3a3a3a!important"
                        textAlign="center"
                        fontSize={{ base: "11px", md: "14px" }}
                      >
                        {stat}
                      </Td>
                    ))
                  )}
                </Tr>
              ))}
              <Tr fontWeight="bold">
                <Td
                  whiteSpace="nowrap"
                  position="sticky"
                  left="0"
                  background="#2a2a2a"
                  zIndex="docked"
                  textAlign="left"
                  padding={{ base: 0, md: 4 }}
                >
                  Totals
                </Td>
                {reorderedTotals.map((total, i) => (
                  <Td
                    key={i}
                    whiteSpace="nowrap"
                    borderBottom="none"
                    textAlign="center"
                  >
                    {total}
                  </Td>
                ))}
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    );
  };

  return (
    <Box p={{ base: 0, md: 4 }}>
      {renderBoxScoreHeader()}
      {data?.players?.map((playerData, index) => (
        <Box key={index}>{renderPlayerStats(playerData)}</Box>
      ))}
    </Box>
  );
};

export default BoxScore;
