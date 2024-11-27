import { Box, Flex, Text } from "@chakra-ui/react";
import PlayerSearchWrapper from "../components/PlayerSearchWrapper";

const ComparePlayers = () => {
  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={5} textAlign="center">
        Compare Players
      </Text>
      <Flex justify="space-between" gap={5}>
        {/* Player 1 Search */}
        <Box flex={1}>
          <PlayerSearchWrapper label="Search Player 1" />
        </Box>

        {/* Player 2 Search */}
        <Box flex={1}>
          <PlayerSearchWrapper label="Search Player 2" />
        </Box>
      </Flex>
    </Box>
  );
};

export default ComparePlayers;
