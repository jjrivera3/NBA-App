import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
} from "@chakra-ui/react";
import { lighten } from "polished";
import { useParams } from "react-router-dom";
import nbaTeams from "../data/nbateams";
import useTeamColor from "../hooks/useTeamColor";
import useTeamInfo from "../hooks/useTeamInfo";
import TeamHeading from "./TeamHeading";
import Utah_Jazz from "../assets/Utah_Jazz.png";
import TeamHeadingSkeleton from "./TeamHeadSkeleton";
import GameSchedule from "../entities/GameSchedule";
import { formatDate } from "../utils/teamHelper";
import useTeamDetails from "../hooks/useTeamDetails";
import useNextGame from "../hooks/useNextGame";
import UpcomingGame from "./UpcomingGame";

const TeamSchedule = () => {
  const { teamAbv } = useParams<{ teamAbv: string }>();
  const lowercasedTeamAbv = teamAbv?.toLowerCase();

  const selectedAbv = nbaTeams.find(
    (team) => team.info.abbrev.toLowerCase() === lowercasedTeamAbv
  );
  const teamId = selectedAbv ? selectedAbv.teamId : null;

  const teamColor = useTeamColor(teamId);
  const { data: teamInfo, isLoading: isTeamInfoLoading } = useTeamInfo(teamId);

  //@ts-ignore
  const selectedTeam = teamInfo?.body?.find((team) => team.teamID === teamId);

  const espnLogo1 =
    selectedTeam?.teamID === "29" ? Utah_Jazz : selectedTeam?.espnLogo1;
  const defaultColor = "#000000";

  // Retrieve selected team's color and light value
  const teamDetails = useTeamDetails(teamId);
  const { primaryColor: selectedPrimaryColor, lightValue: selectedLightValue } =
    teamDetails || {};
  const headingColor = lighten(
    selectedLightValue ?? 0.1,
    selectedPrimaryColor ?? "white"
  );

  // Get the next game from the schedule
  const nextGame = useNextGame(selectedTeam?.teamSchedule || null);
  const isHomeTeam =
    selectedTeam && nextGame && selectedTeam.teamID === nextGame?.teamIDHome;
  const opponentId = isHomeTeam ? nextGame?.teamIDAway : nextGame?.teamIDHome;

  const opponentDetails = useTeamDetails(opponentId ?? null); // Ensure opponentId is either string or null
  const { logoImage: opponentLogo, abbrev: opponentAbbrev } =
    opponentDetails || {};
  const nextGameDate = nextGame ? formatDate(nextGame.gameDate) : "";
  const nextGameTime = nextGame?.gameTime || "";

  return (
    <>
      {isTeamInfoLoading ? (
        <Box mt={7} mb={5}>
          <TeamHeadingSkeleton />
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
              teamColor={teamColor || "#FFFFFF"} // Default to white if teamColor is undefined
              opponentColor={opponentDetails?.primaryColor || "#FFFFFF"} // Default to white if opponentColor is undefined
              selectedPrimaryColor={selectedPrimaryColor || "#FFFFFF"} // Pass the primary color of the selected team
              opponentPrimaryColor={opponentDetails?.primaryColor || "#FFFFFF"} // Pass the primary color of the opponent
            />
            {/* Full Schedule Table */}
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
                fontSize="2xl"
                fontWeight="bold"
                mb="2"
                textAlign="left"
                color={headingColor}
              >
                2024-2025 Schedule
              </Text>
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
                          primaryColor,
                          lightValue,
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
                                  fontSize="15px"
                                  color={lighten(
                                    lightValue ?? 0.1,
                                    primaryColor ?? "white"
                                  )}
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
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default TeamSchedule;
