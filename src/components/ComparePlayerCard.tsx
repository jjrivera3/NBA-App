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

  const calculateAge = (birthDate: string | number): number => {
    let birthDateString: string;

    // If `birthDate` is a number, assume it's a Unix timestamp
    if (typeof birthDate === "number") {
      birthDateString = new Date(birthDate).toLocaleDateString("en-US");
    } else {
      birthDateString = birthDate;
    }

    const birthDateObject = new Date(birthDateString); // Parse the birth date
    const today = new Date(); // Get the current date

    let age = today.getFullYear() - birthDateObject.getFullYear(); // Calculate the year difference
    const monthDiff = today.getMonth() - birthDateObject.getMonth(); // Calculate the month difference
    const dayDiff = today.getDate() - birthDateObject.getDate(); // Calculate the day difference

    // Adjust the age if the current month and day are before the birth month and day
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age; // Return the calculated age
  };

  const playerAge = calculateAge(player.bDay);

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
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              color={"gray.200"}
              className="mobilePlayerInfo"
            >
              #{player?.jerseyNum} | {player?.pos}
            </Text>
            <Text
              mt={2}
              fontSize={{ base: "13px", md: "16px" }}
              color={"gray.200"}
              className="mobilePlayerInfo"
            >
              {playerAge} yrs old
            </Text>
            <Text
              mt={2}
              fontSize={{ base: "14px", md: "16px" }}
              color={"gray.200"}
              className="mobilePlayerInfo"
            >
              {player?.height}"
            </Text>
            <Text
              mt={2}
              fontSize={{ base: "14px", md: "16px" }}
              color={"gray.200"}
              className="mobilePlayerInfo"
            >
              {player?.weight} lbs
            </Text>
            <Text
              mt={2}
              fontSize={{ base: "14px", md: "16px" }}
              color={"gray.200"}
              className="mobilePlayerInfo"
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
