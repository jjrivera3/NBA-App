import { Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import RatingScore from "./RatingScore";

interface Player {
  espnName: string;
  rating: {
    overallAttribute: number;
  };
  jerseyNum: string;
  pos: string;
}

interface Props {
  player: Player; // Update player type to be an object
  teamCity: string;
  teamName: string;
  espnLogo1: string;
}

const PlayerInfo = ({ player, teamCity, teamName, espnLogo1 }: Props) => {
  return (
    <VStack align="flex-start" spacing={2}>
      <Flex align="center">
        <Image
          src={espnLogo1}
          alt={`${teamName} Logo`}
          title={`${teamName} Logo`}
          boxSize="25px"
          mr={2}
        />
        <Text fontSize={["sm", "md"]} fontWeight="400" color="white">
          {teamCity} {teamName}
        </Text>
      </Flex>
      <HStack align="flex-start" spacing={2}>
        <Text fontSize={["2xl", "4xl"]} fontWeight="300" color="white">
          {player.espnName.split(" ")[0]} {/* First name */}
        </Text>
        <Text fontSize={["2xl", "4xl"]} fontWeight="bold" color="white">
          {player.espnName.split(" ").slice(1).join(" ")} {/* Last name */}
        </Text>
      </HStack>
      <RatingScore rating={player.rating.overallAttribute} />
      <Text fontSize={["sm", "md"]} fontWeight="400" color="white">
        #{player.jerseyNum} • {player.pos}
      </Text>
    </VStack>
  );
};

export default PlayerInfo;
