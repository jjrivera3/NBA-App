import {
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Spinner,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import useBoxScore from "../hooks/useBoxScore";
import { useParams } from "react-router-dom";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

interface Team {
  team: {
    displayName: string;
    logo: string;
    abbreviation: string;
    color: string; // Change this to a string, instead of a function
    id: string;
  };
  homeAway: "home" | "away";
  statistics: { displayValue: string; label: string }[];
}

interface Player {
  team: {
    color: string;
    abbreviation: any;
    logo: string | undefined;
    displayName: string;
  };
  statistics: {
    names: string[];
    athletes: {
      athlete: {
        id: string;
        displayName: string;
        headshot?: { href: string };
      };
      stats: string[];
    }[];
    totals: string[]; // totals can be an empty array or undefined
  }[];
}

interface BoxScoreData {
  teams: Team[];
  players: Player[];
}

const BoxScore = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const options = {
    refetchOnWindowFocus: true,
    staleTime: 10 * 60 * 1000,
  };

  const { data, isLoading, isError } = useBoxScore(gameId || "", options) as {
    data: BoxScoreData | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  useEffect(() => {
    if (data) {
      console.log("Box Score Data:", data);
    }
  }, [data]);

  if (isLoading) return <Spinner />;

  if (isError)
    return <Text color="red.500">Error loading box score data.</Text>;

  const awayTeam = data?.teams?.find((team) => team.homeAway === "away");
  const homeTeam = data?.teams?.find((team) => team.homeAway === "home");

  const getFinalScore = (teamData: Player) => {
    const lastTotal = teamData.statistics[0].totals.at(-1); // Get the last item from the totals array
    return lastTotal ? parseInt(lastTotal, 10) : 0; // If it's defined, parse it; otherwise, return 0
  };

  const awayScore = data && getFinalScore(data.players[0]);
  const homeScore = data && getFinalScore(data.players[1]);

  const isAwayWinner = (awayScore ?? 0) > (homeScore ?? 0);
  const isHomeWinner = (homeScore ?? 0) > (awayScore ?? 0);

  const formatColor = (color: string | undefined) => {
    return color && !color.startsWith("#") ? `#${color}` : color || "gray";
  };

  const renderBoxScoreHeader = () => {
    return (
      <Box mt={7} borderRadius="md" boxShadow="2xl" overflow="hidden">
        <Flex height="6px" overflow="hidden">
          <Box flex="1" backgroundColor={formatColor(awayTeam?.team.color)} />
          <Box flex="1" backgroundColor={formatColor(homeTeam?.team.color)} />
        </Flex>

        <Box
          p={5}
          textAlign="center"
          background="linear-gradient(180deg, #484848 0%, #2e2e2e 100%, #353535 100%)"
          border="0px 1px 1px 1px solid #000"
        >
          <Box mt={4} mb={2}>
            <Flex align="center" justify="space-evenly">
              {/* Away Team */}
              <Flex direction="row" align="center">
                <Flex direction="column" align="center" mx={2}>
                  <Image
                    src={awayTeam?.team.logo}
                    alt={`${awayTeam?.team.abbreviation} logo`}
                    boxSize={{ base: "60px", md: "80px" }}
                  />
                  <Text
                    fontSize={{ base: "md", md: "xl" }}
                    fontWeight={600}
                    color="white"
                  >
                    {awayTeam?.team.abbreviation}
                  </Text>
                  <Text fontSize="sm" color="gray.300">
                    Away
                  </Text>
                </Flex>
                <Flex align="center">
                  <Text
                    fontWeight={isAwayWinner ? "bold" : "normal"}
                    fontSize="4xl"
                    color="white"
                    mr={isAwayWinner ? 2 : 0}
                    ml={25}
                  >
                    {awayScore}
                  </Text>
                  {isAwayWinner && (
                    <FaCaretLeft fontSize="24px" style={{ color: "white" }} />
                  )}
                </Flex>
              </Flex>

              {/* Separator with "vs" */}
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
                  {isHomeWinner && (
                    <FaCaretRight
                      fontSize="24px"
                      style={{ color: "white", marginLeft: "4px" }}
                    />
                  )}
                  <Text
                    fontWeight={isHomeWinner ? "bold" : "normal"}
                    fontSize="4xl"
                    color="white"
                    ml={isHomeWinner ? 0 : 2}
                    mr={25}
                  >
                    {homeScore}
                  </Text>
                </Flex>
                <Flex direction="column" align="center" mx={2}>
                  <Image
                    src={homeTeam?.team.logo}
                    alt={`${homeTeam?.team.abbreviation} logo`}
                    boxSize={{ base: "60px", md: "80px" }}
                  />
                  <Text
                    fontSize={{ base: "md", md: "xl" }}
                    fontWeight={600}
                    color="white"
                  >
                    {homeTeam?.team.abbreviation}
                  </Text>
                  <Text fontSize="sm" color="gray.300">
                    Home
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
    );
  };

  const renderPlayerStats = (playerData: Player) => {
    const team = playerData.team;
    const { names, athletes, totals } = playerData.statistics[0];

    return (
      <Box
        mb={8}
        background="#2a2a2a"
        padding="var(--chakra-space-4)"
        borderRadius="var(--chakra-radii-md)"
        overflow="hidden"
        border="1px solid #282828"
        mt="50px"
        borderTop={`4px solid ${formatColor(team.color)}`}
      >
        {/* Team Logo and Team Name */}
        <Flex align="center" mb={4}>
          <Image
            src={team.logo}
            alt={`${team.abbreviation} logo`}
            boxSize="30px"
            mr={2}
          />
          <Text fontSize="xl" fontWeight="bold">
            {team.displayName}
          </Text>
        </Flex>

        <Box overflowX="auto">
          {/* Enable horizontal scroll */}
          <Table variant="simple" size="sm" minWidth="600px">
            <Thead>
              <Tr>
                <Th
                  whiteSpace="nowrap"
                  position="sticky"
                  left="0"
                  background="#2a2a2a"
                  zIndex="docked"
                  minWidth="150px"
                >
                  {/* Player Stats Heading */}
                  <Text fontWeight="bold" textAlign="left" color="#a0a0a0">
                    Player
                  </Text>
                </Th>
                {names.map((name, index) => (
                  <Th key={index} whiteSpace="nowrap">
                    {name}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {athletes.map((athlete, index) => (
                <Tr key={athlete.athlete.id || index}>
                  <Td
                    whiteSpace="nowrap"
                    position="sticky"
                    left="0"
                    background="#2a2a2a"
                    zIndex="docked"
                  >
                    <div style={{ minWidth: "185px" }}>
                      <Flex align="center">
                        <Image
                          src={athlete.athlete.headshot?.href}
                          alt={athlete.athlete.displayName}
                          boxSize="40px"
                          mr={2}
                          borderRadius="full"
                          objectFit="contain"
                        />
                        <Text fontWeight="600" whiteSpace="nowrap">
                          {athlete.athlete.displayName}
                        </Text>
                      </Flex>
                    </div>
                  </Td>
                  {athlete.stats.map((stat, i) => (
                    <Td key={i} whiteSpace="nowrap">
                      {stat}
                    </Td>
                  ))}
                </Tr>
              ))}
              {/* Render Totals Row */}
              <Tr fontWeight="bold">
                <Td whiteSpace="nowrap">Totals</Td>
                {/* Ensure totals is either an array or fallback to empty array */}
                {(totals ?? []).map((total, i) => (
                  <Td key={i} whiteSpace="nowrap">
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
    <Box p={4}>
      {renderBoxScoreHeader()}
      {data?.players?.map((playerData, index) => (
        <Box key={index}>{renderPlayerStats(playerData)}</Box>
      ))}
    </Box>
  );
};

export default BoxScore;
