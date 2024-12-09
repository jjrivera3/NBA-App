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
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Player from "../entities/Player";
import playerAvatar from "../assets/player_avatar.png";
import { Link } from "react-router-dom";
import { svgString } from "../services/svgString";
import RatingTeamScore from "./RatingTeamScore";
import nbaTeams from "../data/nbateams";
import { Property } from "csstype"; // Import for type safety

interface Props {
  player: Player;
  firstColor: string;
  playerRating: any;
}

const ComparePlayerCard = ({ player, firstColor, playerRating }: Props) => {
  const [avatarSrc, setAvatarSrc] = useState(
    player?.espnID
      ? `https://a.espncdn.com/i/headshots/nba/players/full/${player.espnID}.png`
      : playerAvatar
  );

  const getTeamLogo = (abbreviation: string) => {
    if (abbreviation === "GS") abbreviation = "GSW";
    if (abbreviation === "SA") abbreviation = "SAS";
    if (abbreviation === "PHO") abbreviation = "PHX";

    const team = nbaTeams.find((team) => team.abbreviation === abbreviation);
    return team ? team.info.logoImage : "";
  };

  const teamLogo = getTeamLogo(player.team || "");

  useEffect(() => {
    if (player?.espnID) {
      setAvatarSrc(
        `https://a.espncdn.com/i/headshots/nba/players/full/${player.espnID}.png`
      );
    } else {
      setAvatarSrc(playerAvatar);
    }
  }, [player]);

  const playerOverallRating = playerRating.overallAttribute ?? 0;

  const teamAbbreviation = player.team === "GS" ? "GSW" : player.team;
  const playerProfileUrl = `/${teamAbbreviation
    .toLowerCase()
    .replace(/\s+/g, "-")}/${player?.espnName
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  // Adjust direction based on breakpoint
  const layoutDirection = useBreakpointValue<Property.FlexDirection>({
    base: "column",
    md: "row",
  });

  return (
    <Center mt={5} py={{ base: 0, md: 2 }}>
      <Box
        w={"full"}
        bg={useColorModeValue(
          "white",
          "linear-gradient(360deg, #212121 30%, #2e2e2e 70%, #353535 100%)"
        )}
        rounded={"md"}
        overflow={"hidden"}
        boxShadow={"2xl"}
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
            size={{ base: "xl", md: "2xl" }}
            src={avatarSrc}
            onError={() => setAvatarSrc(playerAvatar)}
            css={{ border: "2px solid white" }}
            bg={"#ffffff"}
          />
        </Flex>

        <Box p={{ base: 3, md: 6 }}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Flex direction={layoutDirection} align="center" gap={2}>
              <Image src={teamLogo} h={"25px"} />
              <Heading
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={500}
                fontFamily={"body"}
                textAlign="center"
                lineHeight={5}
              >
                {useBreakpointValue({
                  base: (
                    <>
                      {player?.espnName?.split(" ")[0]} <br />
                      {player?.espnName?.split(" ")[1]}
                    </>
                  ),
                  md: player?.espnName,
                })}
              </Heading>
            </Flex>

            <HStack mt={{ base: 0, md: 3 }} mb={3}>
              <RatingTeamScore playerRating={playerOverallRating} />
            </HStack>
            <Text fontSize={{ base: "14px", md: "16px" }} color={"gray.200"}>
              #{player?.jerseyNum} | {player?.pos}
            </Text>
            <Text
              mt={1}
              fontSize={{ base: "14px", md: "16px" }}
              color={"gray.200"}
            >
              {player?.height}"
            </Text>
            <Text
              mt={1}
              fontSize={{ base: "14px", md: "16px" }}
              color={"gray.200"}
            >
              {player?.weight} lbs
            </Text>
            <Text
              mt={1}
              fontSize={{ base: "14px", md: "16px" }}
              color={"gray.200"}
            >
              {player?.college === "-" || !player?.college
                ? "-"
                : player.college}
            </Text>
          </Stack>

          <Link to={playerProfileUrl}>
            <Button
              w={"full"}
              mt={2}
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
