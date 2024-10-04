import { VStack, Text } from "@chakra-ui/react";

const PlayerAdditionalInfo = ({ player }) => {
  return (
    <VStack align="flex-start" spacing={4} w={["100%", "30%"]}>
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
