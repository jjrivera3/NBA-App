import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import playerAvatar from "../assets/player_avatar.png";
import Player from "../entities/Player";
import { svgString } from "../services/svgString";
import RatingTeamScore from "./RatingTeamScore";

interface Props {
  player: Player;
  firstColor: string;
  espnLogo1: string;
  teamCity: string;
  teamName: string;
  teamID: string;
}

const PlayerCard = ({ player, firstColor }: Props) => {
  const [avatarSrc, setAvatarSrc] = useState(
    player?.espnID
      ? `https://a.espncdn.com/i/headshots/nba/players/full/${player.espnID}.png`
      : playerAvatar
  );

  const isLoading = !player;
  const stats = player?.stats || { pts: "0", reb: "0", ast: "0" };
  const teamAbbreviation = player.team === "GS" ? "GSW" : player.team;
  const playerProfileUrl = `/${teamAbbreviation
    .toLowerCase()
    .replace(/\s+/g, "-")}/${player?.espnName
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  const playerRating = player?.rating?.overallAttribute ?? 0;

  return (
    <Center mt={5} py={{ base: 1, md: 2 }}>
      <Box
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
            onError={() => setAvatarSrc(playerAvatar)}
            css={{ border: "2px solid white" }}
            bg={"#ffffff"}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            {/* Center the name and icon together */}
            <Flex align="center" justify="center" gap={1}>
              <Heading fontSize={"16px"} fontWeight={500} fontFamily={"body"}>
                {player?.espnName}
              </Heading>
            </Flex>

            <HStack mt={2} mb={2}>
              <RatingTeamScore playerRating={playerRating} />
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
          <Link to={playerProfileUrl}>
            <Button
              w={"full"}
              mt={8}
              bg={firstColor || "#151f21"}
              color={"white"}
              rounded={"md"}
              fontSize={13}
              fontWeight={600}
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
