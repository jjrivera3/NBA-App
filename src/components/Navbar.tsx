import {
  HStack,
  Image,
  Text,
  Box,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SearchInput from "./SearchInput";
import logo from "../assets/logo.svg";
import TeamList from "../components/TeamList";
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook to control the drawer
  const isMobile = useBreakpointValue({ base: true, md: false }); // Show on mobile (base) only
  const logoSize = useBreakpointValue({ base: "28px", md: "34px" });
  const logoTextSize = useBreakpointValue({ base: "16px", md: "17px" });

  const [selectedTeamId, setSelectedTeamId] = React.useState<string | null>(
    null
  ); // Manage selected team state

  const onSearch = (value: string) => {
    console.log("Search term:", value);
  };

  const handleSelectTeam = (teamId: string, teamAbv: string) => {
    console.log(`Selected team: ${teamId} - ${teamAbv}`);
    setSelectedTeamId(teamId); // Set the selected team ID
  };

  return (
    <HStack
      paddingY="25px"
      paddingX="15px"
      justify="space-between"
      width="100%"
      bg="gray.800"
      color="white"
      boxShadow="md"
    >
      {/* Logo and Text */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Image
          src={logo}
          height={logoSize}
          width="auto"
          marginRight={2}
          objectFit="contain"
        />
        <Text fontSize={logoTextSize} fontFamily="'Poppins', sans-serif">
          <Text as="span" fontWeight="600" color="#f37021">
            Heat Check
          </Text>{" "}
          <Text
            fontSize={logoTextSize}
            as="span"
            fontWeight="400"
            fontFamily="'Poppins', sans-serif"
          >
            Hub
          </Text>
        </Text>
      </Link>

      {/* Conditionally render Search Input only on non-mobile screens */}
      {!isMobile && (
        <Box flex="1" marginX={4}>
          <SearchInput onSearch={onSearch} />
        </Box>
      )}

      {/* Hamburger Menu Button */}
      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        variant="outline"
        onClick={onOpen}
        color="#f8991d" // Set the icon color
        borderColor="#f8991d" // Set the border color
        _hover={{
          backgroundColor: "#f8991d", // Set the background color on hover
          color: "#1f2024", // Keep the icon color the same
          borderColor: "#f8991d", // Change the border color on hover
        }}
      />

      {/* Drawer for Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="left" paddingLeft={5}>
              <Link to="/Page1">Home</Link>
              <Link to="/Page2">Scoreboard</Link>
              <Link to="/page3">Standings</Link>
              <Link to="/page4">News</Link>
              {isMobile && (
                <TeamList
                  onSelectTeam={handleSelectTeam}
                  selectedTeamId={selectedTeamId}
                />
              )}
              {/* Add more links as needed */}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default NavBar;
