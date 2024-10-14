import { VStack, Text } from "@chakra-ui/react";

interface Player {
  height: string | number;
  weight: string | number;
  bDay: string;
  college?: string;
  exp: string | number;
}

interface Props {
  player: Player;
}

const PlayerAdditionalInfo = ({ player }: Props) => {
  return (
    <VStack
      alignItems={{ base: "center", lg: "flex-start" }}
      spacing={4}
      paddingRight={{ base: 0, sm: 0, md: 4, xl: 125 }}
      mt={[0, 0]}
      mb={[5, 0]}
    >
      <Text color="white" fontSize="15px">
        HT, WT:{" "}
        <Text as="span" fontWeight="bold" fontSize="14px">
          {player?.height}", {player?.weight} lbs
        </Text>
      </Text>
      <Text as="span" fontSize="15px">
        Birthdate:{" "}
        <Text as="span" fontWeight="bold">
          {player?.bDay}
        </Text>
      </Text>
      <Text color="white" fontSize="15px">
        College:{" "}
        <Text as="span" fontWeight="bold">
          {player?.college || "N/A"}
        </Text>
      </Text>
      <Text color="white" fontSize="15px">
        Experience:{" "}
        <Text as="span" fontWeight="bold">
          {player?.exp === "R" ? "Rookie" : `${player?.exp} Years`}
        </Text>
      </Text>
    </VStack>
  );
};

export default PlayerAdditionalInfo;
