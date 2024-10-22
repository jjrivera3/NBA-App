import { Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import RatingScore from "../RatingScore";
import { usePlayerStore } from "../../usePlayerStore";

const PlayerInfo = () => {
  const { player, teamName, espnLogo1 } = usePlayerStore((state) => state); // Get player from store

  // Define the responsive font size as a constant
  const responsiveFontSize = { base: 22, sm: 24, md: 22, xl: 32 };

  const fontSize =
    player?.espnName === "Shai Gilgeous-Alexander"
      ? responsiveFontSize
      : responsiveFontSize;

  if (!player) return null; // Handle case when player is not available

  return (
    <VStack
      alignItems={{ base: "center", md: "flex-start", lg: "flex-start" }}
      spacing={2}
      mb={[2, 0]}
    >
      <Flex align="center">
        <Image
          src={espnLogo1 ?? undefined}
          alt={`${teamName} Logo`}
          title={`${teamName} Logo`}
          boxSize="25px"
          mr={2}
        />
        <Text fontSize={["sm", "md"]} fontWeight="400" color="white">
          {teamName}
        </Text>
      </Flex>
      <HStack align="flex-start" spacing={2}>
        <Text fontSize={fontSize} fontWeight="200" color="white">
          {player.espnName.split(" ")[0]} {/* First name */}
        </Text>
        <Text fontSize={fontSize} fontWeight="600" color="white">
          {player.espnName.split(" ").slice(1).join(" ")} {/* Last name */}
        </Text>
      </HStack>
      <RatingScore /> {/* No need to pass rating as a prop */}
      <Text
        fontSize="md"
        fontWeight="400"
        color="white"
        mb={{ base: 4, md: 0 }}
      >
        #{player.jerseyNum} • {player.pos}
      </Text>
    </VStack>
  );
};

export default PlayerInfo;
