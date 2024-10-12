import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Grid,
  GridItem,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import TeamList from "../components/TeamList";

const Layout = () => {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, lg: false }); // Define mobile breakpoint

  const handleTeamSelect = (teamId: string, teamAbv: string) => {
    setSelectedTeamId(teamId);
    navigate(`/${teamAbv.toLowerCase()}`);
  };

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
          {/* Mobile Dropdown Menu */}
          {isMobile && (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                aria-label="Teams Menu"
                mb={4}
              >
                Select Team
              </MenuButton>
              <MenuList>
                {/* Render TeamList inside MenuList for mobile */}
                <TeamList
                  onSelectTeam={handleTeamSelect}
                  selectedTeamId={selectedTeamId}
                />
              </MenuList>
            </Menu>
          )}

          {/* Desktop Sidebar */}
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
      <Footer />
    </>
  );
};

export default Layout;
