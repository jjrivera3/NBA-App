import {
  Box,
  Button,
  Flex,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Utah_Jazz from "../assets/Utah_Jazz.png";
import nbaTeamBoxScoreId from "../data/nbaTeamBoxScoreId";
import nbaTeams from "../data/nbateams";
import GameSchedule from "../entities/GameSchedule";
import useGetGameID from "../hooks/useGetGameId";
import useNextGame from "../hooks/useNextGame";
import useTeamColor from "../hooks/useTeamColor";
import useTeamDetails from "../hooks/useTeamDetails";
import useTeamInfo from "../hooks/useTeamInfo";
import useTeamScheduleScores from "../hooks/useTeamScheduleScores";
import { formatDate } from "../utils/teamHelper";
import TeamHeading from "./TeamHeading";
import UpcomingGame from "./UpcomingGame";
import TeamHeadingSkeleton from "./skeletons/TeamHeadSkeleton";
import UpcomingGameSkeleton from "./skeletons/UpcomingGameSkeleton";

const formatTime = (epoch: string | number) => {
  const timeInSeconds = typeof epoch === "string" ? Number(epoch) : epoch;
  const date = new Date(timeInSeconds * 1000);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};

const TeamSchedule = () => {
  const { teamAbv } = useParams<{ teamAbv: string }>();
  const lowercasedTeamAbv = teamAbv?.toLowerCase();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  const selectedAbv = nbaTeams.find(
    (team) => team.info.abbrev.toLowerCase() === lowercasedTeamAbv
  );
  const teamId = selectedAbv ? selectedAbv.teamId : null;

  const teamColor = useTeamColor(teamId);
  const { data: teamInfo, isLoading: isTeamInfoLoading } = useTeamInfo(teamId, {
    schedules: "true",
  });

  const teamAbv1 = selectedAbv?.abbreviation;

  // Change "SA" to "SAS"
  const adjustedTeamAbv1 =
    teamAbv1 === "SAS"
      ? "SA"
      : teamAbv1 === "GSW"
      ? "GS"
      : teamAbv1 === "NOP"
      ? "NO"
      : teamAbv1 === "PHX"
      ? "PHO"
      : teamAbv1;

  // Check for a matching team in nbaTeamBoxScoreId's
  const matchingTeam = nbaTeamBoxScoreId.find(
    (team) => team.abbreviation === selectedAbv?.abbreviation
  );

  // Conditional hook call based on adjustedTeamAbv1
  const { data: scheduleScoresData, isLoading: isScheduleLoading } =
    adjustedTeamAbv1
      ? useTeamScheduleScores(adjustedTeamAbv1)
      : { data: null, isLoading: false };

  const scheduleScores = scheduleScoresData?.body?.schedule || [];

  const selectedTeam = Array.isArray(teamInfo?.body)
    ? teamInfo.body.find(
        (team: { teamID: string | null }) => team.teamID === teamId
      )
    : undefined;

  const { data: gameIdData } = useGetGameID(matchingTeam?.teamId, "2025", {
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000,
  });

  const espnLogo1 =
    selectedTeam?.teamID === "29" ? Utah_Jazz : selectedTeam?.espnLogo1;
  const defaultColor = "#000000";

  const nextGame = useNextGame(selectedTeam?.teamSchedule || null);
  const isHomeTeam =
    selectedTeam && nextGame && selectedTeam.teamID === nextGame?.teamIDHome;
  const opponentId = isHomeTeam ? nextGame?.teamIDAway : nextGame?.teamIDHome;

  const opponentDetails = useTeamDetails(opponentId ?? null);
  const { logoImage: opponentLogo, abbrev: opponentAbbrev } =
    opponentDetails || {};
  const nextGameDate = nextGame ? formatDate(nextGame.gameDate) : "";
  const nextGameTime = nextGame ? formatTime(nextGame.gameTime_epoch) : "";

  return (
    <>
      {isTeamInfoLoading || isScheduleLoading ? (
        <Box mt={7} mb={5}>
          <TeamHeadingSkeleton />
          <UpcomingGameSkeleton />
        </Box>
      ) : (
        selectedTeam && (
          <Box pt={7}>
            <TeamHeading
              teamCity={selectedTeam.teamCity}
              teamName={selectedTeam.teamName}
              conference={selectedTeam.conference}
              espnLogo1={espnLogo1}
              wins={selectedTeam.wins}
              loss={selectedTeam.loss}
              firstColor={teamColor || defaultColor}
              teamAbv={teamAbv ?? ""}
            />
            <UpcomingGame
              isHomeTeam={isHomeTeam}
              teamLogo={espnLogo1}
              teamAbbrev={selectedAbv?.info.abbrev}
              opponentLogo={opponentLogo}
              opponentAbbrev={opponentAbbrev}
              nextGameDate={nextGameDate}
              nextGameTime={nextGameTime}
              teamColor={teamColor || "#FFFFFF"}
              opponentColor={opponentDetails?.primaryColor || "#FFFFFF"}
            />
            <Box mt={10} p={0} w={"full"} textAlign="center">
              <Text
                fontSize={{ base: "18px", md: "2xl" }}
                fontWeight={600}
                color="white"
                mb={5}
              >
                2024-2025 Season Schedule
              </Text>
              {isMobile ? (
                <Box>
                  {selectedTeam?.teamSchedule &&
                    Object.values(selectedTeam.teamSchedule as GameSchedule[])
                      .sort((a, b) => a.gameDate.localeCompare(b.gameDate))
                      .map((game, index) => {
                        const isHomeGame =
                          selectedTeam.teamID === game.teamIDHome;
                        const opponentId = isHomeGame
                          ? game.teamIDAway
                          : game.teamIDHome;
                        const opponentDetails = useTeamDetails(
                          opponentId ?? null
                        );
                        const {
                          logoImage: opponentLogo,
                          abbrev: opponentAbbrev,
                        } = opponentDetails || {};
                        const gameTime = formatTime(game.gameTime_epoch);
                        const formattedDate = formatDate(game.gameDate);

                        const score = scheduleScores.find(
                          (score: { gameID: string; gameStatus: string }) =>
                            score.gameID === game.gameID &&
                            score.gameStatus === "Completed"
                        );
                        const isSelectedTeamWinner =
                          score &&
                          ((isHomeGame && score.homeResult === "W") ||
                            (!isHomeGame && score.awayResult === "W"));
                        const resultColor = score
                          ? isSelectedTeamWinner
                            ? "green.400"
                            : "red.400"
                          : "gray.400";
                        const resultPrefix = score
                          ? isSelectedTeamWinner
                            ? "W"
                            : "L"
                          : "";
                        const result = score
                          ? `${resultPrefix}   ${score.awayPts} - ${score.homePts}`
                          : "";
                        const borderColor = score
                          ? isSelectedTeamWinner
                            ? "green.400"
                            : "red.400"
                          : "gray.400";

                        return (
                          <Box
                            key={game.gameID}
                            mb={4}
                            p={4}
                            bgGradient="linear(to-r, #2A2A2A, #1F1F1F)"
                            borderRadius="lg"
                            boxShadow="lg"
                            transition="all 0.3s ease"
                            textAlign="center"
                            borderWidth="1px"
                            borderColor={borderColor}
                          >
                            <Text
                              fontSize="sm"
                              fontWeight={500}
                              color="gray.400"
                              mb={2}
                            >
                              {formattedDate}
                            </Text>
                            <Flex align="center" justify="center" mb={2}>
                              <Text
                                fontSize="md"
                                fontWeight={500}
                                color="gray.200"
                                mr={1}
                              >
                                {isHomeGame ? "vs" : "@"}
                              </Text>
                              {opponentLogo && (
                                <Image
                                  src={opponentLogo}
                                  alt={`${opponentAbbrev} logo`}
                                  boxSize="30px"
                                  mr={2}
                                />
                              )}
                              <Text
                                fontSize="lg"
                                fontWeight={600}
                                color="white"
                              >
                                {opponentAbbrev}
                              </Text>
                            </Flex>
                            <Box
                              fontSize="md"
                              fontWeight={600}
                              color="gray.200"
                              mb={1}
                            >
                              {gameTime}
                            </Box>
                            {result ? (
                              <>
                                <Text
                                  fontSize="lg"
                                  fontWeight="bold"
                                  color={resultColor}
                                >
                                  {result}
                                </Text>
                                {isMobile && score && (
                                  <Box
                                    mt={2}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderRadius="md"
                                    backgroundColor="#3a3a3a"
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
                                      onClick={() => {
                                        if (score) {
                                          const selectedEvent =
                                            gameIdData?.events?.[index];
                                          if (selectedEvent) {
                                            navigate(
                                              `/boxscore/${selectedEvent.id}`,
                                              {
                                                state: { selectedEvent },
                                              }
                                            );
                                          }
                                        }
                                      }}
                                    >
                                      View Box Score
                                    </Button>
                                  </Box>
                                )}
                              </>
                            ) : null}
                            {!score && (
                              <Text fontSize="xs" color="gray.400">
                                {isHomeGame ? "Home" : "Away"}
                              </Text>
                            )}
                          </Box>
                        );
                      })}
                </Box>
              ) : (
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Opponent</Th>
                      <Th>Game Time</Th>
                      <Th>Result</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selectedTeam?.teamSchedule &&
                      Object.values(selectedTeam.teamSchedule as GameSchedule[])
                        .sort((a, b) => a.gameDate.localeCompare(b.gameDate))
                        .map((game, index) => {
                          const isHomeGame =
                            selectedTeam.teamID === game.teamIDHome;
                          const opponentId = isHomeGame
                            ? game.teamIDAway
                            : game.teamIDHome;
                          const opponentDetails = useTeamDetails(
                            opponentId ?? null
                          );
                          const {
                            logoImage: opponentLogo,
                            abbrev: opponentAbbrev,
                          } = opponentDetails || {};
                          const gameTime = formatTime(game.gameTime_epoch);
                          const formattedDate = formatDate(game.gameDate);

                          // Check if the game has a completed score
                          const score = scheduleScores.find(
                            (score: { gameID: string; gameStatus: string }) =>
                              score.gameID === game.gameID &&
                              score.gameStatus === "Completed"
                          );

                          const isSelectedTeamWinner =
                            score &&
                            ((isHomeGame && score.homeResult === "W") ||
                              (!isHomeGame && score.awayResult === "W"));
                          const resultColor = score
                            ? isSelectedTeamWinner
                              ? "green.400"
                              : "red.400"
                            : "gray.400";
                          const resultPrefix = score
                            ? isSelectedTeamWinner
                              ? "W"
                              : "L"
                            : "-";
                          const result = score
                            ? `${resultPrefix} ${score.awayPts} - ${score.homePts}`
                            : resultPrefix;

                          return (
                            <Tooltip
                              key={game.gameID}
                              label="Click to view box score"
                              fontSize="sm"
                              placement="top"
                              bg="gray.700"
                              color="white"
                              hasArrow
                              isDisabled={!score} // Tooltip only enabled if score exists
                            >
                              <Tr
                                borderBottom="1px solid #2d2d2d"
                                bg={index % 2 === 0 ? "#232323" : "#2A2A2A"}
                                cursor={score ? "pointer" : "default"} // Only pointer cursor if score exists
                                sx={
                                  score
                                    ? {
                                        transition: "background-color 0.3s",
                                        _hover: {
                                          backgroundColor: "#3a3a3a",
                                          cursor: "pointer",
                                        },
                                      }
                                    : {} /* No hover effect for rows without a score */
                                }
                                onClick={() => {
                                  if (score) {
                                    const selectedEvent =
                                      gameIdData?.events?.[index];
                                    if (selectedEvent) {
                                      navigate(
                                        `/boxscore/${selectedEvent.id}`,
                                        {
                                          state: { selectedEvent },
                                        }
                                      );
                                    }
                                  }
                                }}
                              >
                                <Td fontSize="14px" fontWeight={500}>
                                  {formattedDate}
                                </Td>
                                <Td fontSize="14px">
                                  <Flex align="center">
                                    <Text mr={1}>
                                      {isHomeGame ? "vs" : "@"}
                                    </Text>
                                    {opponentLogo && (
                                      <Image
                                        src={opponentLogo}
                                        alt={`${opponentAbbrev} logo`}
                                        boxSize="25px"
                                        mr={2}
                                      />
                                    )}
                                    <Text
                                      fontWeight={500}
                                      fontSize="14px"
                                      color="white"
                                    >
                                      {isMobile
                                        ? opponentAbbrev
                                        : opponentDetails?.name}
                                    </Text>
                                  </Flex>
                                </Td>
                                <Td fontSize="16px" fontWeight={500}>
                                  {gameTime}
                                </Td>
                                <Td
                                  fontSize="15px"
                                  fontWeight={700}
                                  color={resultColor}
                                >
                                  {result}
                                </Td>
                              </Tr>
                            </Tooltip>
                          );
                        })}
                  </Tbody>
                </Table>
              )}
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default TeamSchedule;
