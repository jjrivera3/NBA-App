import { GridItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import TeamGrid from "../components/TeamGrid";
import TeamSchedule from "../components/TeamSchedule";

function Homepage() {
  const { teamAbv, schedule } = useParams<{
    teamAbv?: string;
    schedule?: string;
  }>();
  const lowercasedTeamAbv = teamAbv?.toLowerCase();

  return (
    <GridItem area="main" mt={7}>
      {schedule ? (
        <TeamSchedule /> // Render TeamSchedule component
      ) : lowercasedTeamAbv ? (
        <TeamGrid teamAbv={lowercasedTeamAbv} /> // Render TeamGrid component for the roster
      ) : (
        <div>Select a team to see the roster</div>
      )}
    </GridItem>
  );
}

export default Homepage;
