import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { lighten } from "polished";
import nbaTeams from "../data/nbateams";
import useDepthChart from "../hooks/useDepthChart";
import TeamHeading from "./TeamHeading";
import useTeamInfo from "../hooks/useTeamInfo";
import useTeamColor from "../hooks/useTeamColor";
import TeamHeadingSkeleton from "./skeletons/TeamHeadSkeleton";
import DepthChartSkeleton from "./skeletons/DepthChartSkeleton";

type Player = {
  longName: string;
  playerID: string;
};

// Mapping of position abbreviations to full names
const positionNames = {
  PG: "Point Guard",
  SG: "Shooting Guard",
  SF: "Small Forward",
  PF: "Power Forward",
  C: "Center",
};

const DepthChart = () => {
  const { teamAbv } = useParams<{ teamAbv: string }>();

  useEffect(() => {
    if (teamAbv) {
      console.log("Team Abbreviation:", teamAbv);
    } else {
      console.warn("teamAbv is undefined");
    }
  }, [teamAbv]);

  if (!teamAbv) {
    return <Text color="white">Invalid team or team not found.</Text>;
  }

  const lowercasedTeamAbv = teamAbv.toLowerCase();
  const selectedAbv = nbaTeams.find(
    (team) => team.info.abbrev.toLowerCase() === lowercasedTeamAbv
  );

  const teamId = selectedAbv ? selectedAbv.teamId : null;
  const teamColor = useTeamColor(teamId);
  const { data: depthChart, isLoading: isDepthChartLoading } = useDepthChart(
    teamId || ""
  );

  const { data: teamInfo, isLoading: isTeamInfoLoading } = useTeamInfo(teamId, {
    schedules: "true",
  });

  const foundTeam = nbaTeams.find((team) => team.teamId === teamId);
  const lightValue = foundTeam?.light || 0.2;

  // Calculate the lightened color for the position heading
  const lightenedTeamColor = teamColor
    ? lighten(lightValue, teamColor)
    : "#cccccc";

  console.log(teamColor);

  // Find the selected team in the depth chart data
  // @ts-ignore
  const selectedTeam = depthChart?.body?.find((team) => team.teamID === teamId);
  const teamDepthChart = selectedTeam?.depthChart;

  const positions = ["PG", "SG", "SF", "PF", "C"];
  const depths = ["Starter", "2nd", "3rd", "4th", "5th"];

  // Safely accessing selectedTeamInfo and its properties
  //@ts-ignore
  const selectedTeamInfo = teamInfo?.body?.find(
    (team: { teamID: string | null }) => team.teamID === teamId
  );

  // Combine loading states for both `teamInfo` and `depthChart`
  const isLoading = isTeamInfoLoading || isDepthChartLoading;

  if (isLoading) {
    return (
      <>
        <Box mt={7}>
          <TeamHeadingSkeleton />
          <DepthChartSkeleton />
        </Box>
      </>
    );
  }

  if (!teamDepthChart) {
    return (
      <Text color="white">No depth chart data available for this team.</Text>
    );
  }

  return (
    <>
      {selectedTeamInfo && (
        <Box pt={7}>
          <TeamHeading
            teamCity={selectedTeamInfo.teamCity}
            teamName={selectedTeamInfo.teamName}
            conference={selectedTeamInfo.conference}
            espnLogo1={selectedTeamInfo?.espnLogo1}
            wins={selectedTeamInfo?.wins || 0}
            loss={selectedTeamInfo?.loss}
            firstColor={teamColor || "#000000"}
            teamAbv={teamAbv}
          />
        </Box>
      )}
      <Box color="white" mt={7} borderRadius="12px" boxShadow="xl">
        <Flex wrap="wrap" justifyContent="space-between" gap={6}>
          {positions.map((position) => (
            <VStack
              key={position}
              align="center"
              bg="radial-gradient(circle, rgb(48 48 48) 0%, rgb(51 51 51) 70%, rgb(49 49 49) 120%)"
              borderRadius="10px"
              p={5}
              width={{ base: "100%", md: "18%" }}
              spacing={4}
              boxShadow="md"
              transition="all 0.2s"
            >
              <Text
                fontSize="md"
                fontWeight={600}
                color={lightenedTeamColor}
                textAlign="center"
              >
                {positionNames[position as keyof typeof positionNames]}
              </Text>

              {depths.map((depth, index) => {
                const players = teamDepthChart[
                  position as keyof typeof teamDepthChart
                ] as Player[] | undefined;
                const player = players ? players[index] : null;

                return (
                  <Box
                    key={index}
                    w="100%"
                    bg={
                      player
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(255, 255, 255, 0.05)"
                    }
                    p={3}
                    borderRadius="8px"
                    textAlign="center"
                  >
                    <Text fontSize="xs" fontWeight={600} color="#999999" mb={1}>
                      {depth}
                    </Text>
                    <Text
                      fontSize="15px"
                      fontWeight={600}
                      color={player ? "white" : "#555555"}
                    >
                      {player ? player.longName : "-"}
                    </Text>
                  </Box>
                );
              })}
            </VStack>
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default DepthChart;
