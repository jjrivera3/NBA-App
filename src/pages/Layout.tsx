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
    navigate(`/${teamAbv.toLowerCase()}`); // Navigate with lowercase team abbreviation
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
          maxW="100vw" // Ensure the grid doesn't extend beyond the viewport width
          overflowX="hidden" // Prevent the grid from adding a scrollbar
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
          <GridItem
            area="main"
            maxW="100%" // Ensure the main content stays within 100% of the grid column
            overflowX="auto" // Allow horizontal scrolling for the content if necessary
          >
            <Box maxW="100%" overflowX="auto">
              {" "}
              {/* Wrap the Outlet in a Box for better control */}
              <Outlet />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Layout;
