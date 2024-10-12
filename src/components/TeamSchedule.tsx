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
import { useParams } from "react-router-dom";
import Utah_Jazz from "../assets/Utah_Jazz.png";
import nbaTeams from "../data/nbateams";
import GameSchedule from "../entities/GameSchedule";
import useNextGame from "../hooks/useNextGame";
import useTeamColor from "../hooks/useTeamColor";
import useTeamDetails from "../hooks/useTeamDetails";
import useTeamInfo from "../hooks/useTeamInfo";
import { formatDate } from "../utils/teamHelper";
import TeamHeading from "./TeamHeading";
import UpcomingGame from "./UpcomingGame";
import TeamHeadingSkeleton from "./skeletons/TeamHeadSkeleton";
import UpcomingGameSkeleton from "./skeletons/UpcomingGameSkeleton";

const TeamSchedule = () => {
  const { teamAbv } = useParams<{ teamAbv: string }>();
  const lowercasedTeamAbv = teamAbv?.toLowerCase();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const selectedAbv = nbaTeams.find(
    (team) => team.info.abbrev.toLowerCase() === lowercasedTeamAbv
  );
  const teamId = selectedAbv ? selectedAbv.teamId : null;

  const teamColor = useTeamColor(teamId);
  const { data: teamInfo, isLoading: isTeamInfoLoading } = useTeamInfo(teamId, {
    schedules: "true",
  });

  // @ts-ignore
  const selectedTeam = teamInfo?.body?.find((team) => team.teamID === teamId);

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
  const nextGameTime = nextGame?.gameTime || "";

  return (
    <>
      {isTeamInfoLoading ? (
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
            <Box
              mt={7}
              borderRadius="md"
              w={"full"}
              bg="#26262640"
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
              border="1px solid #000"
              padding={5}
              paddingX="25px"
            >
              <Text
                fontSize="xl"
                fontWeight={500}
                mb="2"
                textAlign="center"
                color="gray.300"
              >
                2024-2025 Season Schedule
              </Text>
              {isMobile ? (
                <Box>
                  {selectedTeam?.teamSchedule &&
                    Object.values(selectedTeam.teamSchedule as GameSchedule[])
                      .sort((a, b) => a.gameDate.localeCompare(b.gameDate))
                      .map((game) => {
                        const isHomeGame =
                          selectedTeam.teamID === game.teamIDHome;
                        const opponentId = isHomeGame
                          ? game.teamIDAway
                          : game.teamIDHome;
                        const opponentDetails = useTeamDetails(
                          opponentId ?? null
                        );
                        const { logoImage: opponentLogo, name: opponentName } =
                          opponentDetails || {};
                        const gameTime = game.gameTime;
                        const formattedDate = formatDate(game.gameDate);

                        return (
                          <Box
                            key={game.gameID}
                            mb={4}
                            p={4}
                            bg="#2A2A2A"
                            borderRadius="md"
                            textAlign="center"
                          >
                            <Text
                              fontSize="lg"
                              fontWeight={600}
                              mb={2}
                              color="white"
                            >
                              {formattedDate}
                            </Text>
                            <Flex direction="column" align="center" mb={2}>
                              <Text
                                fontSize="lg"
                                fontWeight={600}
                                color="white"
                              >
                                {isHomeGame ? "vs" : "@"} {opponentName}
                              </Text>
                              {opponentLogo && (
                                <Image
                                  src={opponentLogo}
                                  alt={`${opponentName} logo`}
                                  boxSize="35px"
                                  my={2}
                                />
                              )}
                              <Text
                                fontSize="lg"
                                fontWeight={600}
                                color="white"
                              >
                                {gameTime}
                              </Text>
                            </Flex>
                            <Text fontSize="lg" fontWeight={600} color="white">
                              —
                            </Text>
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
                            name: opponentName,
                          } = opponentDetails || {};
                          const gameTime = game.gameTime;
                          const formattedDate = formatDate(game.gameDate);

                          return (
                            <Tr
                              key={game.gameID}
                              borderBottom="1px solid #2d2d2d"
                              bg={index % 2 === 0 ? "#232323" : "#2A2A2A"}
                            >
                              <Td fontSize="14px" fontWeight={500}>
                                {formattedDate}
                              </Td>
                              <Td fontSize="14px">
                                <Flex align="center">
                                  <Text mr={1}>{isHomeGame ? "vs" : "@"}</Text>
                                  {opponentLogo && (
                                    <Image
                                      src={opponentLogo}
                                      alt={`${opponentName} logo`}
                                      boxSize="25px"
                                      mr={2}
                                    />
                                  )}
                                  <Text
                                    fontWeight={500}
                                    fontSize="14px"
                                    color="white"
                                  >
                                    {opponentName}
                                  </Text>
                                </Flex>
                              </Td>
                              <Td fontSize="15px" fontWeight={500}>
                                {gameTime}
                              </Td>
                              <Td fontSize="15px">—</Td>
                            </Tr>
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
