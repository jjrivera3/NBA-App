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
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SearchInput from "./SearchInput";
import logo from "../assets/logo.svg";
import TeamList from "../components/TeamList";
import React from "react";
import { Link } from "react-router-dom";

interface NavBarProps {
  onTeamSelect: (teamId: string, teamAbv: string) => void;
  selectedTeamId: string | null;
}

const NavBar: React.FC<NavBarProps> = ({ onTeamSelect, selectedTeamId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  });
  const logoSize = useBreakpointValue({ base: "28px", md: "34px" });
  const logoTextSize = useBreakpointValue({ base: "16px", md: "17px" });

  const onSearch = (value: string) => {
    console.log("Search term:", value);
  };

  const handleSelectTeam = (teamId: string, teamAbv: string) => {
    onTeamSelect(teamId, teamAbv);
    onClose(); // Close the drawer on team selection
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
        color="#f8991d"
        borderColor="#f8991d"
        _hover={{
          backgroundColor: "#f8991d",
          color: "#1f2024",
          borderColor: "#f8991d",
        }}
      />

      {/* Drawer for Navigation Links and TeamList on Mobile */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          bgGradient="linear(to-br, #1a1a1d, #353535)"
          color="white"
        >
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" paddingLeft={4}>
            <Box display="flex" alignItems="center">
              <Image src={logo} height="30px" width="auto" marginRight={2} />
              <Text fontSize="lg" fontFamily="'Poppins', sans-serif">
                <Text as="span" fontWeight="600" color="#f37021">
                  Heat Check
                </Text>{" "}
                <Text as="span" fontWeight="400" color="white">
                  Hub
                </Text>
              </Text>
            </Box>
          </DrawerHeader>
          <DrawerBody paddingX={4} paddingTop={6}>
            <VStack spacing={6} align="left">
              {/* Navigation Links - Always Show */}
              <ChakraLink
                as={Link}
                to="/Page1"
                fontSize="lg"
                _hover={{ color: "#f37021" }}
                onClick={onClose}
              >
                Home
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/Page2"
                fontSize="lg"
                _hover={{ color: "#f37021" }}
                onClick={onClose}
              >
                Scoreboard
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/Page3"
                fontSize="lg"
                _hover={{ color: "#f37021" }}
                onClick={onClose}
              >
                Standings
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/Page4"
                fontSize="lg"
                _hover={{ color: "#f37021" }}
                onClick={onClose}
              >
                News
              </ChakraLink>

              {/* TeamList - Show Only on Mobile */}
              {isMobile && (
                <Box width="100%" mt={4}>
                  <TeamList
                    onSelectTeam={handleSelectTeam}
                    selectedTeamId={selectedTeamId}
                  />
                </Box>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default NavBar;
