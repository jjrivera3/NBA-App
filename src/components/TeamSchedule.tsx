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
import { lighten } from "polished"; // Import lighten function
import { useParams } from "react-router-dom";
import nbaTeams from "../data/nbateams";
import useTeamColor from "../hooks/useTeamColor";
import useTeamInfo from "../hooks/useTeamInfo";
import TeamHeading from "./TeamHeading";
import Utah_Jazz from "../assets/Utah_Jazz.png";
import TeamHeadingSkeleton from "./TeamHeadSkeleton";

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
  const formatDate = (gameDate) => {
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

  // Function to find the logo and color for a given team ID
  const getTeamDetails = (teamId) => {
    const team = nbaTeams.find((t) => t.teamId === teamId);
    if (team) {
      return {
        logoImage: team.info.logoImage,
        primaryColor: team.info.colors[0],
        lightValue: team.light,
      };
    }
    return {};
  };

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
            <Box
              mt={7}
              borderRadius="md"
              w={"full"}
              bg="#26262640"
              boxShadow={"1xl"}
              rounded={"md"}
              overflow={"hidden"}
              border="1px solid #000"
              padding="25px"
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th color="white" fontSize="15px">
                      Date
                    </Th>
                    <Th color="white" fontSize="15px">
                      Opponent
                    </Th>
                    <Th color="white" fontSize="15px">
                      Game Time
                    </Th>
                    <Th color="white" fontSize="15px">
                      Result
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.values(selectedTeam.teamSchedule)
                    .sort((a, b) => a.gameDate.localeCompare(b.gameDate))
                    .map((game) => {
                      const isHomeTeam =
                        selectedTeam.teamID === game.teamIDHome;
                      const opponentId = isHomeTeam
                        ? game.teamIDAway
                        : game.teamIDHome;
                      const opponentAbbrev = isHomeTeam ? game.away : game.home;
                      const {
                        logoImage: opponentLogo,
                        primaryColor,
                        lightValue,
                      } = getTeamDetails(opponentId);
                      const gameTime = game.gameTime;
                      const formattedDate = formatDate(game.gameDate);

                      return (
                        <Tr key={game.gameID} borderBottom="1px solid #2d2d2d">
                          <Td fontSize="15px">{formattedDate}</Td>
                          <Td fontSize="15px">
                            <Flex align="center">
                              <Text mr={1}>{isHomeTeam ? "vs" : "@"}</Text>
                              {opponentLogo && (
                                <Image
                                  src={opponentLogo}
                                  alt={`${opponentAbbrev} logo`}
                                  boxSize="20px"
                                  mr={2}
                                />
                              )}
                              <Text
                                fontWeight={600}
                                color={lighten(lightValue, primaryColor)}
                              >
                                {opponentAbbrev}
                              </Text>
                            </Flex>
                          </Td>
                          <Td fontSize="15px">{gameTime}</Td>
                          <Td fontSize="15px">—</Td>{" "}
                          {/* Placeholder for Result */}
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
