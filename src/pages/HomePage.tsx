import { GridItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import PlayerGrid from "../components/PlayerGrid";

function Homepage() {
  const { teamAbv } = useParams<{ teamAbv?: string }>();
  const lowercasedTeamAbv = teamAbv?.toLowerCase(); // Ensure teamAbv is always lowercase

  return (
    <GridItem area="main" mt={7}>
      {lowercasedTeamAbv ? (
        <PlayerGrid /> // Pass lowercasedTeamAbv as a prop
      ) : (
        <div>Select a team to see the roster</div>
      )}
    </GridItem>
  );
}

export default Homepage;
