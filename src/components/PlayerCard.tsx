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

interface Props {
  player: Player;
  firstColor: string | null; // Add firstColor as a prop
}

const PlayerCard = ({ player, firstColor }: Props) => {
  // Check if player exists
  const isLoading = !player;

  // Default stats if player is defined but stats are missing
  const stats = player?.stats || {
    pts: "0",
    reb: "0",
    ast: "0",
  };

  const playerProfileUrl = `/${player.team
    .toLowerCase()
    .replace(/\s+/g, "-")}/${player?.espnName
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  // Safely access the player's rating
  const playerRating = player?.rating?.overallAttribute || 0;

  const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 3200 935.65"><defs><clipPath id="b"><path style="fill:none" d="M.03 0h3200v2000H.03z"/></clipPath><clipPath id="c"><path transform="rotate(-61.98 1907.402 379.44)" style="fill:none" d="M1570.66-1330.09h673.72V2088.9h-673.72z"/></clipPath><clipPath id="d"><path transform="rotate(45 92.4 78.753)" style="fill:none" d="M-26.85-566.04h238.51V723.55H-26.85z"/></clipPath><clipPath id="f"><path transform="rotate(31.96 200.547 -19.495)" style="fill:none" d="M-210.88-1301.35h822.85v2563.72h-822.85z"/></clipPath><clipPath id="h"><path transform="rotate(-66.35 308.404 841.842)" style="fill:none" d="M-117.87-232.29h852.46v2148.2h-852.46z"/></clipPath><clipPath id="j"><path transform="rotate(-51.14 1103.957 476.835)" style="fill:none" d="M677.73-989.5h852.46v2932.66H677.73z"/></clipPath><clipPath id="l"><path transform="rotate(-123.83 3229.68 493.192)" style="fill:none" d="M2803.42-981.93h852.46v2950.32h-852.46z"/></clipPath><clipPath id="n"><path transform="rotate(56.17 862.062 184.514)" style="fill:none" d="M435.85-1290.63h852.46v2950.32H435.85z"/></clipPath><clipPath id="p"><path transform="rotate(-66.35 2656.43 379.336)" style="fill:none" d="M2230.07-694.7h852.46v2148.2h-852.46z"/></clipPath><clipPath id="r"><path transform="rotate(-27.6 768.092 622.92)" style="fill:none" d="M342-680.52h852.46V1926.5H342z"/></clipPath><clipPath id="t"><path transform="rotate(27.17 1557.795 322.439)" style="fill:none" d="M1134.87-806.86h845.62v2258.49h-845.62z"/></clipPath><clipPath id="v"><path transform="rotate(-17.83 1347.204 377.562)" style="fill:none" d="M1151.74-477.18h391.19v1709.52h-391.19z"/></clipPath><clipPath id="x"><path transform="rotate(-34.03 2766.074 647.458)" style="fill:none" d="M2570.28-130.64h391.19v1556.21h-391.19z"/></clipPath><clipPath id="z"><path transform="rotate(-160.33 2836.44 385.754)" style="fill:none" d="M2640.81-468.9H3032v1709.52h-391.19z"/></clipPath><clipPath id="B"><path transform="rotate(-14.52 174.653 385.766)" style="fill:none" d="M-44.61-468.9h438.6v1709.52h-438.6z"/></clipPath><radialGradient id="a" cx="9631.49" cy="4121.73" fx="9631.49" fy="4121.73" r="611.67" gradientTransform="matrix(.79 0 0 2.05 -5559.69 -8373.34)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".3" stop-color="#dfdfdf"/><stop offset=".73" stop-color="#f6f6f6"/><stop offset="1" stop-color="#fff"/></radialGradient><radialGradient id="e" cx="-4864.53" cy="4708.62" fx="-4864.53" fy="4708.62" r="281.21" gradientTransform="matrix(0 .61 -1.68 0 8098.74 3130.65)" xlink:href="#a"/><radialGradient id="g" cx="-2710.2" cy="4081.48" fx="-2710.2" fy="4081.48" r="611.67" gradientTransform="matrix(0 .97 -1.54 0 6829.62 2822.4)" xlink:href="#a"/><radialGradient id="i" cx="4463.41" cy="7146.57" fx="4463.41" fy="7146.57" r="434.53" gradientTransform="matrix(1.03 0 0 3.44 -4405.78 -24281.73)" xlink:href="#a"/><radialGradient id="k" cx="4078.56" cy="7181.88" fx="4078.56" fy="7181.88" r="434.51" gradientTransform="matrix(1.03 0 -.00018 4.7 -3165.38 -33884.62)" xlink:href="#a"/><radialGradient id="m" cx="3172.68" cy="9365.5" fx="3172.68" fy="9365.5" r="434.53" gradientTransform="matrix(0 -1.03 4.73 0 -40820.52 3112.19)" xlink:href="#a"/><radialGradient id="o" cx="-6271.45" cy="7934.05" fx="-6271.45" fy="7934.05" r="434.53" gradientTransform="matrix(0 1.03 -4.73 0 38979.6 6732.42)" xlink:href="#a"/><radialGradient id="q" cx="5792.82" cy="7717.71" fx="5792.82" fy="7717.71" r="434.53" gradientTransform="matrix(1.03 0 0 3.44 -3423.19 -26709.46)" xlink:href="#a"/><radialGradient id="s" cx="1114.1" cy="7083.99" fx="1114.1" fy="7083.99" r="434.52" gradientTransform="matrix(1.03 0 0 4.18 -177.82 -29518.94)" xlink:href="#a"/><radialGradient id="u" cx="-3277.76" cy="7018.58" fx="-3277.76" fy="7018.58" r="346.87" gradientTransform="matrix(0 1.28 -4.53 0 33908.89 4391.8)" xlink:href="#a"/><radialGradient id="w" cx="-55.17" cy="7665.26" fx="-55.17" fy="7665.26" r="129.61" gradientTransform="matrix(1.58 0 0 7.42 1529.16 -56692.45)" xlink:href="#a"/><radialGradient id="y" cx="1698.74" cy="7802.08" fx="1698.74" fy="7802.08" r="129.61" gradientTransform="matrix(1.58 0 0 6.75 123.49 -52251.63)" xlink:href="#a"/><radialGradient id="A" cx="886.37" cy="9234.96" fx="886.37" fy="9234.96" r="95.4" gradientTransform="matrix(0 -1.28 7.42 .00067 -65809.31 1389.96)" xlink:href="#a"/><radialGradient id="C" cx="-1047.08" cy="7828.39" fx="-1047.08" fy="7828.39" r="95.4" gradientTransform="matrix(1.43 0 -.00025 7.42 1905.51 -57657.77)" xlink:href="#a"/></defs><g style="isolation:isolate"><g style="clip-path:url(#b)"><path style="fill:${firstColor}" d="M.03 0h3200v2000H.03z"/><g style="mix-blend-mode:multiply"><g style="clip-path:url(#c)"><ellipse cx="2067.94" cy="78.01" rx="484.4" ry="1254.2" transform="rotate(-61.98 2067.813 78.078)" style="fill:url(#a)"/></g></g><g style="mix-blend-mode:multiply"><g style="clip-path:url(#d)"><ellipse cx="177.87" cy="164.22" rx="473.07" ry="171.48" transform="rotate(-45 177.87 164.214)" style="fill:url(#e)"/></g></g><g style="mix-blend-mode:multiply"><g style="clip-path:url(#f)"><ellipse cx="554.33" cy="201.23" rx="940.46" ry="591.62" transform="rotate(-58.04 554.337 201.223)" style="fill:url(#g)"/></g></g><g style="mix-blend-mode:multiply"><g style="clip-path:url(#h)"><ellipse cx="178.52" cy="310.28" rx="446.27" ry="1495.26" transform="rotate(-66.35 178.538 310.288)" style="fill:url(#i)"/></g></g><g style="mix-blend-mode:multiply"><g style="clip-path:url(#j)"><ellipse cx="1023.72" cy="-146.24" rx="446.27" ry="2041.29" transform="rotate(-51.14 1023.698 -146.235)" style="fill:url(#k)"/></g></g><g style="mix-blend-mode:multiply"><g style="clip-path:url(#l)"><ellipse cx="3440.79" cy="-146.33" rx="2053.58" ry="446.27" transform="rotate(-33.83 3440.892 -146.36)" style="fill:url(#m)"/></g></g><g style="mix-blend-mode:multiply"><g style="clip-path:url(#n)"><ellipse cx="1483.08" cy="291.77" rx="2053.58" ry="446.27" transform="rotate(-33.83 1483.127 291.764)" style="fill:url(#o)"/></g></g><g style="mix-blend-mode:multiply"><g style="clip-path:url(#p)"><ellipse cx="2526.45" cy="-152.14" rx="446.27" ry="1495.26" transform="rotate(-66.35 2526.547 -152.207)" style="fill:url(#q)"/></g></g><g style="mix-blend-mode:multiply"><g style="clip-path:url(#r)"><ellipse cx="966.88" cy="64.35" rx="446.27" ry="1814.62" transform="rotate(-27.6 966.711 64.383)" style="fill:url(#s)"/></g></g><g style="mix-blend-mode:multiply"><g style="clip-path:url(#t)"><ellipse cx="2100.88" cy="208.71" rx="1572.02" ry="442.69" transform="rotate(-62.83 2100.794 208.748)" style="fill:url(#u)"/></g></g><g style="mix-blend-mode:multiply"><g style="clip-path:url(#v)"><ellipse cx="1442.02" cy="147.48" rx="204.37" ry="961.08" transform="rotate(-17.83 1441.818 147.494)" style="fill:url(#w)"/></g></g><g style="mix-blend-mode:multiply"><g style="clip-path:url(#x)"><ellipse cx="2802.13" cy="414.2" rx="204.37" ry="874.89" transform="rotate(-34.03 2802.277 414.178)" style="fill:url(#y)"/></g></g><g style="mix-blend-mode:multiply"><g style="clip-path:url(#z)"><ellipse cx="2669.92" cy="258.78" rx="707.38" ry="121.75" transform="rotate(-70.33 2670.065 258.701)" style="fill:url(#A)"/></g></g><g style="mix-blend-mode:multiply;opacity:.24"><g style="clip-path:url(#B)"><ellipse cx="407.23" cy="391.38" rx="136.5" ry="707.38" transform="rotate(-14.52 407.08 391.285)" style="fill:url(#C)"/></g></g></g></g></svg>
`;

  return (
    <Center py={6}>
      <Box
        maxW={"350px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        border="1px solid #000"
      >
        <Image
          h={"80px"}
          w={"full"}
          src={`data:image/svg+xml,${encodeURIComponent(svgString)}`}
          objectFit="cover"
          alt="#"
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"2xl"}
            src={player?.espnHeadshot || playerAvatar}
            css={{
              border: "2px solid white",
            }}
            bg={"#ffffff"}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"18px"} fontWeight={500} fontFamily={"body"}>
              {player?.espnName}
            </Heading>
            <HStack mt={2}>
              {/* Pass the player's rating to the RatingScore component */}
              <RatingScore rating={playerRating} />
            </HStack>
            <Text fontSize={"15px"} color={"gray.400"}>
              {player?.jerseyNum} | {player?.pos}
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
                    TRB
                  </Text>
                </Stack>

                <Stack spacing={0} align={"center"}>
                  <Text fontWeight={600}>{stats.ast}</Text>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    AST
                  </Text>
                </Stack>
              </Stack>
            )}
          </Center>
          <Link
            to={playerProfileUrl}
            state={{ player, teamName: player.team }} // Pass player and team info via state
          >
            <Button
              w={"full"}
              mt={8}
              bg={firstColor || "#151f21"} // Use firstColor as the background color
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
