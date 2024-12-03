import { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { svgString } from "../services/svgString";
import { usePlayerStore } from "../usePlayerStore";
import RatingTeamScore from "./RatingTeamScore";
import nbaTeams from "../data/nbateams";

interface Props {
  player: Player;
  firstColor: string;
  playerRating: any;
}

const ComparePlayerCard = ({ player, firstColor, playerRating }: Props) => {
  // State to track avatar image source
  const [avatarSrc, setAvatarSrc] = useState(
    player?.espnID
      ? `https://a.espncdn.com/i/headshots/nba/players/full/${player.espnID}.png`
      : playerAvatar
  );

  // Function to get team info based on team abbreviation
  const getTeamInfo = (abbreviation: string) => {
    const team = nbaTeams.find((team) => team.abbreviation === abbreviation);
    return team
      ? { name: team.name, city: team.info.city || "Unknown City" }
      : { name: "Unknown Team", city: "Unknown City" };
  };

  // Retrieve team info based on player.team abbreviation
  const teamInfo = getTeamInfo(player.team || ""); // Adjust player.team if necessary

  // Break up the team name into city and team name
  const [finalTeamCity] = teamInfo.name.split(" ");

  // Update avatarSrc whenever player changes (i.e., when a new player is selected)
  useEffect(() => {
    if (player?.espnID) {
      setAvatarSrc(
        `https://a.espncdn.com/i/headshots/nba/players/full/${player.espnID}.png`
      );
    } else {
      setAvatarSrc(playerAvatar); // Fallback if espnID is not available
    }
  }, [player]); // This effect will run every time the 'player' prop changes

  const setPlayerData = usePlayerStore((state) => state.setPlayerData);

  // Ensure playerRating defaults to 0 if undefined
  const playerOverallRating = playerRating.overallAttribute ?? 0;

  const handleClick = () => {
    setPlayerData({
      player,
      firstColor: firstColor || "#000000",
      teamID: player.teamID || "unknown",
      espnLogo1: avatarSrc || "defaultLogo.png",
      teamCity: finalTeamCity,
      teamName: teamInfo.name,
      playerRating: playerRating,
    });
  };

  const isLoading = !player;
  const stats = player?.stats || { pts: "0", reb: "0", ast: "0" };
  const teamAbbreviation = player.team === "GS" ? "GSW" : player.team;
  const playerProfileUrl = `/${teamAbbreviation
    .toLowerCase()
    .replace(/\s+/g, "-")}/${player?.espnName
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

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
            <Heading fontSize={"16px"} fontWeight={500} fontFamily={"body"}>
              {player?.espnName}
            </Heading>
            <HStack mt={2} mb={2}>
              <RatingTeamScore playerRating={playerOverallRating} />
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
              <Stack direction={"row"} justify={"center"} spacing={10}>
                <Stack spacing={0} align={"center"}>
                  <Text fontSize="lg" fontWeight={600}>
                    {stats.pts}
                  </Text>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    PPG
                  </Text>
                </Stack>

                <Stack spacing={0} align={"center"}>
                  <Text fontSize="lg" fontWeight={600}>
                    {stats.reb}
                  </Text>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    RPG
                  </Text>
                </Stack>

                <Stack spacing={0} align={"center"}>
                  <Text fontSize="lg" fontWeight={600}>
                    {stats.ast}
                  </Text>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    APG
                  </Text>
                </Stack>
              </Stack>
            )}
          </Center>
          <Link to={playerProfileUrl} onClick={handleClick}>
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

export default ComparePlayerCard;
