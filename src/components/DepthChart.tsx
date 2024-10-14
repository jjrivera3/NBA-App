import { Box, Text, Flex, Divider } from "@chakra-ui/react";

const DepthChart = () => {
  // Example hardcoded depth chart data
  const depthChartData = {
    PG: [
      { name: "Stephen Curry", number: 30 },
      { name: "Chris Paul", number: 3 },
    ],
    SG: [
      { name: "Klay Thompson", number: 11 },
      { name: "Gary Payton II", number: 8 },
    ],
    SF: [
      { name: "Andrew Wiggins", number: 22 },
      { name: "Moses Moody", number: 4 },
    ],
    PF: [
      { name: "Draymond Green", number: 23 },
      { name: "Jonathan Kuminga", number: 0 },
    ],
    C: [
      { name: "Kevon Looney", number: 5 },
      { name: "Dario Šarić", number: 20 },
    ],
  };

  return (
    <Box
      background="#2a2a2a"
      p={4}
      borderRadius="md"
      overflow="hidden"
      border="1px solid #282828"
      color="white"
    >
      <Text fontSize="2xl" fontWeight="bold" color="#f8991d" mb={4}>
        Depth Chart
      </Text>
      <Divider mb={4} borderColor="#444" />
      <Flex direction="column" gap={4}>
        {Object.entries(depthChartData).map(([position, players]) => (
          <Box key={position}>
            <Text fontSize="lg" fontWeight="bold" color="#f8991d" mb={2}>
              {position}
            </Text>
            <Flex
              direction={{ base: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
              bg="#1f1f1f"
              p={3}
              borderRadius="md"
              mb={3}
            >
              {players.map((player, index) => (
                <Box key={index} textAlign="center" flexBasis="50%">
                  <Text fontSize="md" fontWeight="bold">
                    #{player.number} {player.name}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default DepthChart;
