import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import nbaTeams from "../data/nbateams";
import useTeamColor from "../hooks/useTeamColor";
import useTeamInfo from "../hooks/useTeamInfo";
import TeamHeading from "./TeamHeading";
import Utah_Jazz from "../assets/Utah_Jazz.png";

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

  return (
    <>
      {isTeamInfoLoading ? (
        <Flex justify="center" align="center" height="100px">
          <Spinner size="lg" color="#f8991d" />
        </Flex>
      ) : (
        selectedTeam && (
          <Box pt={7}>
            {" "}
            {/* Add top padding here */}
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
          </Box>
        )
      )}
      <div>This is the team Schedule</div>
    </>
  );
};

export default TeamSchedule;
