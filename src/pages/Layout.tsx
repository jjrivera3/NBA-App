import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import TeamList from "../components/TeamList";
import { useState, useEffect } from "react";

const Layout = () => {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleTeamSelect = (teamId: string, teamAbv: string) => {
    setSelectedTeamId(teamId);
    navigate(`/${teamAbv.toLowerCase()}`);
  };

  // Reset selected team when navigating to the homepage
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedTeamId(null);
    }
  }, [location.pathname]);

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
            base: "1fr",
            lg: "250px 1fr",
          }}
          maxW="100vw"
          overflowX="hidden"
        >
          <GridItem
            area="aside"
            paddingLeft={0}
            paddingRight={5}
            display={{ base: "none", lg: "block" }}
          >
            <TeamList
              onSelectTeam={handleTeamSelect}
              selectedTeamId={selectedTeamId}
            />
          </GridItem>

          <GridItem area="main" maxW="100%" overflowX="auto">
            <Box maxW="100%" overflowX="auto">
              <Outlet />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Layout;
