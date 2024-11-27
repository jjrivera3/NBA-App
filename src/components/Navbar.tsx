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
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
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
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();
  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  });
  const logoSize = useBreakpointValue({ base: "28px", md: "34px" });
  const logoTextSize = useBreakpointValue({ base: "18px", md: "17px" });

  const handleSelectTeam = (teamId: string, teamAbv: string) => {
    onTeamSelect(teamId, teamAbv);
    onClose();
    onSearchClose();
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
          <Text as="span" fontWeight="400" fontFamily="'Poppins', sans-serif">
            Hub
          </Text>
        </Text>
      </Link>

      {!isMobile && (
        <Box flex="1" marginX={4} overflow="visible">
          <SearchInput onSearchClose={onSearchClose} />
        </Box>
      )}

      <HStack spacing={2}>
        {isMobile && (
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            variant="ghost"
            onClick={onSearchOpen}
            color="#f8991d"
            _hover={{ backgroundColor: "transparent", color: "#f37021" }}
            _active={{ backgroundColor: "transparent" }}
          />
        )}

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
      </HStack>

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
          <DrawerBody paddingX={4} paddingTop={6} overflowY="auto">
            <VStack spacing={6} align="left">
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
                to="/scoreboard"
                fontSize="lg"
                _hover={{ color: "#f37021" }}
                onClick={onClose}
              >
                Scoreboard
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/compare-players"
                fontSize="lg"
                _hover={{ color: "#f37021" }}
                onClick={onClose}
              >
                Compare Players
              </ChakraLink>

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

      {/* Drawer for Search Input on Mobile */}
      <Drawer isOpen={isSearchOpen} placement="top" onClose={onSearchClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search</DrawerHeader>
          <DrawerBody overflow="visible">
            <Box overflow="visible">
              <SearchInput onSearchClose={onSearchClose} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default NavBar;
