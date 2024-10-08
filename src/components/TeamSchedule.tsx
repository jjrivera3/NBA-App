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

  // Helper function to format the date and adjust by one day
  const formatDate = (gameDate: string) => {
    const year = gameDate.slice(0, 4);
    const month = gameDate.slice(4, 6);
    const day = gameDate.slice(6, 8);
    const date = new Date(`${year}-${month}-${day}`);

    // Add one day
    date.setDate(date.getDate() + 1);

    // Format to "Wed, Oct 23"
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Function to find the logo, color, name, and light value for a given team ID
  const getTeamDetails = (teamId: string) => {
    const team = nbaTeams.find((t) => t.teamId === teamId);
    if (team) {
      return {
        logoImage: team.info.logoImage,
        primaryColor: team.info.colors[0],
        lightValue: team.light,
        name: team.name,
      };
    }
    return {};
  };

  const { primaryColor: selectedPrimaryColor, lightValue: selectedLightValue } =
    getTeamDetails(teamId ?? ""); // Avoid undefined with an empty string fallback
  const headingColor = lighten(
    selectedLightValue ?? 0.1,
    selectedPrimaryColor ?? "white"
  );

  // Get the next game from the schedule
  const nextGame = selectedTeam?.teamSchedule
    ? Object.values(selectedTeam.teamSchedule as GameSchedule[]).sort((a, b) =>
        a.gameDate.localeCompare(b.gameDate)
      )[0]
    : null;

  const isHomeTeam =
    selectedTeam && nextGame && selectedTeam.teamID === nextGame?.teamIDHome;
  const opponentId = isHomeTeam ? nextGame?.teamIDAway : nextGame?.teamIDHome;

  const {
    logoImage: opponentLogo,
    primaryColor: opponentPrimaryColor,
    name: opponentName,
  } = getTeamDetails(opponentId ?? "");
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
            {/* Upcoming Game Section */}
            <Box
              mt={7}
              p={5}
              borderRadius="md"
              boxShadow="2xl"
              textAlign="center"
              background={`linear-gradient(88deg, ${selectedPrimaryColor} 0%, rgba(0, 0, 0, 0.3) 50%, ${opponentPrimaryColor} 100%)`}
            >
              <Text fontSize="xl" fontWeight="bold" color={headingColor}>
                Upcoming Game
              </Text>
              <Flex align="center" justify="center" mt={4} mb={2}>
                <Image
                  src={espnLogo1}
                  alt={`${selectedTeam.teamName} logo`}
                  boxSize="75px"
                  mr={4}
                />
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {isHomeTeam ? "vs" : "@"}
                </Text>
                <Image
                  src={opponentLogo}
                  alt={`${opponentName} logo`}
                  boxSize="75px"
                  ml={4}
                />
              </Flex>
              <Text fontSize="lg" color="white" mt={2}>
                {nextGameDate} • {nextGameTime}
              </Text>
            </Box>

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
                        const {
                          logoImage: opponentLogo,
                          primaryColor,
                          lightValue,
                          name: opponentName,
                        } = getTeamDetails(opponentId);
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
