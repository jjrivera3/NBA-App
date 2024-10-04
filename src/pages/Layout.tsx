import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import TeamList from "../components/TeamList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTeamSelect = (teamId: string, teamAbv: string) => {
    setSelectedTeamId(teamId); // Update the selected team ID
    navigate(`/${teamAbv}`); // Navigate to the route with the team's abbreviation
  };

  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Grid
          templateAreas={{
            base: `"nav" "main"`,
            lg: `"nav nav" "aside main"`,
          }}
          templateColumns={{
            base: "1fr", // Single column on mobile
            lg: "250px 1fr", // Two columns on large screens
          }}
        >
          {/* NBA Team List (Aside) - Hidden on mobile */}
          <GridItem
            area="aside"
            paddingLeft={0}
            paddingRight={5}
            display={{ base: "none", lg: "block" }} // Hide on mobile (base) and show on larger screens (lg)
          >
            <TeamList
              onSelectTeam={handleTeamSelect}
              selectedTeamId={selectedTeamId} // Pass the selected team ID to the TeamList component
            />
          </GridItem>

          {/* Main Content (PlayerGrid or other components via Outlet) */}
          <GridItem area="main">
            <Outlet />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Layout;
