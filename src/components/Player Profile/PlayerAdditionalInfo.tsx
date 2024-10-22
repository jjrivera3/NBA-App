import { VStack, Text } from "@chakra-ui/react";
import { usePlayerStore } from "../../usePlayerStore"; // Import the player store

const PlayerAdditionalInfo = () => {
  const { player } = usePlayerStore((state) => state); // Get player from the store

  if (!player) return null; // Handle case when player is not available

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
          {player.height}", {player.weight} lbs
        </Text>
      </Text>
      <Text as="span" fontSize="15px">
        Birthdate:{" "}
        <Text as="span" fontWeight="bold">
          {player.bDay}
        </Text>
      </Text>
      <Text color="white" fontSize="15px">
        College:{" "}
        <Text as="span" fontWeight="bold">
          {player.college || "N/A"}
        </Text>
      </Text>
      <Text color="white" fontSize="15px">
        Experience:{" "}
        <Text as="span" fontWeight="bold">
          {player.exp === "R" ? "Rookie" : `${player.exp} Years`}
        </Text>
      </Text>
    </VStack>
  );
};

export default PlayerAdditionalInfo;
