import { HStack, Image, Link, Text, Box } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import logo from "../assets/logo.svg";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  // Define the onSearch function
  const onSearch = (value: string) => {
    console.log("Search term:", value);
  };

  return (
    <HStack
      paddingY="25px"
      paddingX="15px"
      justify="space-between"
      width="100%"
      bg="gray.800" // Set the background color of the navbar
      color="white" // Set the text color to ensure contrast
      boxShadow="md" // Optional: adds a shadow for a modern effect
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

      {/* Color Mode Switch */}
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
