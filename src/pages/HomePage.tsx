import { GridItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import PlayerGrid from "../components/PlayerGrid";

function Homepage() {
  const { teamAbv } = useParams<{ teamAbv?: string }>(); // Get teamAbv from URL

  return (
    <GridItem area="main" mt={7}>
      {/* If there's a team abbreviation in the URL, show the PlayerGrid */}
      {teamAbv ? (
        <PlayerGrid /> // selectedTeamId can be handled internally in PlayerGrid
      ) : (
        <div>Select a team to see the roster</div>
      )}
    </GridItem>
  );
}

export default Homepage;
