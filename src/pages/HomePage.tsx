import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import NbaTeamList from "../components/NbaTeamList";
import PlayerGrid from "../components/PlayerGrid";

function Homepage() {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const handleTeamSelect = (teamId: string) => {
    setSelectedTeamId(teamId); // Set the selected team
  };

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      {/* NBA Team List (Aside) */}
      <GridItem area="aside" paddingLeft={0} paddingRight={6}>
        <NbaTeamList
          onSelectTeam={handleTeamSelect}
          selectedTeamId={selectedTeamId} // Pass the selected team ID to the NbaTeamList component
        />
      </GridItem>

      {/* Main Content (Player Grid for the selected team) */}
      <GridItem area="main" mt={7}>
        {/* Render PlayerGrid only when a team is selected */}
        {selectedTeamId ? (
          <PlayerGrid selectedTeamId={selectedTeamId} />
        ) : (
          <div>Select a team to see the roster</div>
        )}
      </GridItem>
    </Grid>
  );
}

export default Homepage;
