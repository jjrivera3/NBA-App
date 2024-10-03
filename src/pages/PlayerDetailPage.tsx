import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Button,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useEffect and useState
import playerAvatar from "../assets/player_avatar.png";

const PlayerDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const player = location.state?.player; // Access the passed player data
  const espnLogo1 = location.state?.espnLogo1; // Access the passed team logo
  const teamCity = location.state?.teamCity; // Access the passed teamCity
  const teamName = location.state?.teamName; // Access the passed teamName

  const [avatarSrc, setAvatarSrc] = useState(
    player?.espnID
      ? `https://a.espncdn.com/i/headshots/nba/players/full/${player.espnID}.png`
      : playerAvatar
  );

  console.log(player);

  // Scroll to the top of the page when the component renders
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!player) {
    return <div>No player data found</div>;
  }

  // Function to go back to the team page
  const handleBack = () => {
    navigate(-1); // Go back to the previous page (team page)
  };

  return (
    <Box as="section" padding="20px" borderRadius="md">
      {/* Main Player Summary Section */}
      <Flex direction={["column", "row"]} align="center">
        {/* Left Side: Team Logo and Player Image */}
        <Flex direction="column" align="center" mr={[0, 8]} mb={[4, 0]}>
          <Image
            src={avatarSrc}
            alt={`${player?.espnName} Headshot`}
            boxSize="350px"
            mt={4}
            borderRadius="md"
            objectFit="contain"
            onError={() => setAvatarSrc(playerAvatar)} // Fallback to default image on error
          />
        </Flex>

        {/* Right Side: Player Info */}
        <VStack align="flex-start" spacing={2}>
          {/* Team Logo and City/Name */}
          <Flex align="center">
            <Image
              src={espnLogo1}
              alt={`${teamName} Logo`}
              title={`${teamName} Logo`}
              boxSize="25px"
              mr={2} // Add some margin to the right of the logo
            />
            <Text fontSize="md" fontWeight="400" color="white">
              {teamCity} {teamName} • #{player?.jerseyNum} • {player?.pos}
            </Text>
          </Flex>

          {/* Split the player's name into first and last names */}
          <VStack align="flex-start" spacing={0}>
            {/* First part of the name (light font weight) */}
            <Text fontSize="4xl" fontWeight="light" color="white">
              {player?.espnName?.split(" ")[0]} {/* First Name */}
            </Text>

            {/* Remaining parts of the name (bold font weight) */}
            <Text fontSize="4xl" fontWeight="bold" color="white">
              {player?.espnName?.split(" ").slice(1).join(" ")}{" "}
              {/* Last Name */}
            </Text>
          </VStack>
        </VStack>
      </Flex>

      {/* Divider */}
      <Box height="1px" bg="gray.300" />

      {/* Stats Section */}
      <Flex
        justify="space-between"
        align="center"
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          height: "1px",
          bg: "gray.300",
        }}
      >
        {/* PPG with vertical line on the left and right, and padding */}
        <Box position="relative" flex="1" textAlign="center" padding="15px">
          <Box
            position="absolute"
            left="0"
            top="0"
            bottom="0"
            height="100%"
            width="1px"
            bg="gray.300"
          />
          <Text fontWeight="300" color="white">
            PPG
          </Text>
          <Text fontWeight="600" fontSize="2xl" color="white">
            {player?.stats?.pts}
          </Text>
          <Box
            position="absolute"
            right="0"
            top="0"
            bottom="0"
            height="100%"
            width="1px"
            bg="gray.300"
          />
        </Box>

        {/* RPG with vertical line on the right, and padding */}
        <Box position="relative" flex="1" textAlign="center" padding="15px">
          <Text fontWeight="300" color="white">
            RPG
          </Text>
          <Text fontWeight="600" fontSize="2xl" color="white">
            {player?.stats?.reb}
          </Text>
          <Box
            position="absolute"
            right="0"
            top="0"
            bottom="0"
            height="100%"
            width="1px"
            bg="gray.300"
          />
        </Box>

        {/* APG with vertical line on the right, and padding */}
        <Box position="relative" flex="1" textAlign="center" padding="15px">
          <Text fontWeight="300" color="white">
            APG
          </Text>
          <Text fontWeight="600" fontSize="2xl" color="white">
            {player?.stats?.ast}
          </Text>
          <Box
            position="absolute"
            right="0"
            top="0"
            bottom="0"
            height="100%"
            width="1px"
            bg="gray.300"
          />
        </Box>

        {/* FG% with vertical line on the right, and padding */}
        <Box position="relative" flex="1" textAlign="center" padding="15px">
          <Text fontWeight="300" color="white">
            FG%
          </Text>
          <Text fontWeight="600" fontSize="2xl" color="white">
            {player?.stats?.fgp}%
          </Text>
          <Box
            position="absolute"
            right="0"
            top="0"
            bottom="0"
            height="100%"
            width="1px"
            bg="gray.300"
          />
        </Box>
      </Flex>

      {/* Back Button */}
      <Button mt={4} onClick={handleBack} colorScheme="teal">
        Back to Team
      </Button>
    </Box>
  );
};

export default PlayerDetailPage;
