import {
  HStack,
  Image,
  Link,
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

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook to control the drawer
  const isMobile = useBreakpointValue({ base: true, md: false }); // Show on mobile (base) only
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
        href="/"
        display="flex"
        alignItems="center"
        textDecoration="none"
        _hover={{ textDecoration: "none" }}
      >
        <Image
          src={logo}
          height="42px"
          width="auto"
          marginRight={2}
          objectFit="contain"
        />
        <Text fontSize="1xl" fontFamily="'Poppins', sans-serif">
          <Text as="span" fontWeight="700" color="#f37021">
            Heat Check
          </Text>{" "}
          <Text
            fontSize="1xl"
            as="span"
            fontWeight="300"
            fontFamily="'Poppins', sans-serif"
          >
            Stats
          </Text>
        </Text>
      </Link>

      {/* Search Input */}
      <Box flex="1" marginX={4}>
        <SearchInput onSearch={onSearch} />
      </Box>

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
            <VStack spacing={4}>
              <Link href="/ATL">Page 1</Link>
              <Link href="/page2">Page 2</Link>
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
