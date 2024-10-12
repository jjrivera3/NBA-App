import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  Button,
  Image,
  useColorModeValue,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import Player from "../entities/Player";
import playerAvatar from "../assets/player_avatar.png";
import RatingScore from "./RatingScore"; // Ensure RatingScore is correctly imported
import { Link } from "react-router-dom";
import { svgString } from "../services/svgString";
import { useState } from "react"; // Import useState

interface Props {
  player: Player;
  firstColor: string | null; // Add firstColor as a prop
  espnLogo1: string; // Add espnLogo1 as a prop
  teamCity: string;
  teamName: string;
  teamID: string;
}

const PlayerCard = ({
  player,
  firstColor,
  espnLogo1,
  teamCity,
  teamName,
  teamID,
}: Props) => {
  const [avatarSrc, setAvatarSrc] = useState(
    player?.espnID
      ? `https://a.espncdn.com/i/headshots/nba/players/full/${player.espnID}.png`
      : playerAvatar
  );

  // Check if player exists
  const isLoading = !player;

  // Default stats if player is defined but stats are missing
  const stats = player?.stats || {
    pts: "0",
    reb: "0",
    ast: "0",
  };

  // Determine if the button should be disabled
  const isButtonDisabled =
    stats.pts === "0" && stats.reb === "0" && stats.ast === "0";

  // Change team abbreviation from "GS" to "GSW" if necessary
  const teamAbbreviation = player.team === "GS" ? "GSW" : player.team;

  const playerProfileUrl = `/${teamAbbreviation
    .toLowerCase()
    .replace(/\s+/g, "-")}/${player?.espnName
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  // Safely access the player's rating
  const playerRating = player?.rating?.overallAttribute || 0;

  return (
    <Center mt={5} py={{ base: 1, md: 2 }}>
      <Box
        maxW={"550px"}
        w={"full"}
        bg={useColorModeValue(
          "white",
          "linear-gradient(360deg, #212121 30%, #2e2e2e 70%, #353535 100%);"
        )}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        border="1px solid #000"
      >
        <Image
          h={"80px"}
          w={"full"}
          src={`data:image/svg+xml,${encodeURIComponent(
            svgString(firstColor || "#ffffff")
          )}`}
          objectFit="cover"
          alt="#"
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"2xl"}
            src={avatarSrc}
            onError={() => setAvatarSrc(playerAvatar)} // Fallback to playerAvatar on error
            css={{
              border: "2px solid white",
            }}
            bg={"#ffffff"}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"16px"} fontWeight={500} fontFamily={"body"}>
              {player?.espnName}
            </Heading>
            <HStack mt={2} mb={2}>
              {/* Pass the player's rating to the RatingScore component */}
              <RatingScore rating={playerRating} />
            </HStack>
            <Text fontSize={"15px"} color={"gray.400"}>
              #{player?.jerseyNum} | {player?.pos}
            </Text>
          </Stack>
          <Center>
            {isLoading ? (
              <Center>
                <Spinner color="blue.500" />
              </Center>
            ) : (
              <Stack direction={"row"} justify={"center"} spacing={6}>
                <Stack spacing={0} align={"center"}>
                  <Text fontWeight={600}>{stats.pts}</Text>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    PPG
                  </Text>
                </Stack>

                <Stack spacing={0} align={"center"}>
                  <Text fontWeight={600}>{stats.reb}</Text>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    RPG
                  </Text>
                </Stack>

                <Stack spacing={0} align={"center"}>
                  <Text fontWeight={600}>{stats.ast}</Text>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    APG
                  </Text>
                </Stack>
              </Stack>
            )}
          </Center>
          <Link
            to={playerProfileUrl}
            state={{
              espnLogo1,
              player,
              teamCity,
              teamName,
              firstColor,
              teamID,
            }} // Pass player and team info via state
          >
            <Button
              w={"full"}
              mt={8}
              bg={firstColor || "#151f21"} // Use firstColor as the background color
              color={"white"}
              rounded={"md"}
              fontSize={13}
              fontWeight={600}
              isDisabled={isButtonDisabled}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Player Profile
            </Button>
          </Link>
        </Box>
      </Box>
    </Center>
  );
};

export default PlayerCard;
