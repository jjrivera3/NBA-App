import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

import TeamList from "../components/TeamList";
import NavBar from "../components/Navbar";

const Layout = () => {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const handleTeamSelect = (teamId: string | null, teamAbv: string) => {
    if (teamId === null) {
      setSelectedTeamId(null);
      navigate(`/`); // Navigate to the home page or any default route
    } else {
      setSelectedTeamId(teamId);
      navigate(`/${teamAbv.toLowerCase()}`);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedTeamId(null);
    }
  }, [location.pathname]);

  return (
    <>
      <NavBar onTeamSelect={handleTeamSelect} selectedTeamId={selectedTeamId} />
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
          {/* Desktop Sidebar */}
          {!isMobile && (
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
          )}

          <GridItem area="main" maxW="100%" overflowX="auto">
            <Box maxW="100%" overflowX="auto">
              <Outlet />
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
