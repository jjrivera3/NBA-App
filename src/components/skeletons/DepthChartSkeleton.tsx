import { Box, Flex, SkeletonText, Text, VStack } from "@chakra-ui/react";

const DepthChartSkeleton = () => {
  const positions = ["PG", "SG", "SF", "PF", "C"];
  const depths = ["Starter", "2nd", "3rd", "4th", "5th"];

  return (
    <Box background="#1e1e1e" color="white" py={6} px={4}>
      <Flex wrap="wrap" justifyContent="space-around" gap={6}>
        {positions.map((position) => (
          <VStack
            key={position}
            align="flex-start"
            bgGradient="linear(to-b, #2a2a2a, #1f1f1f)"
            borderRadius="lg"
            p={6}
            boxShadow="lg"
            width={{ base: "100%", md: "18%" }}
          >
            <SkeletonText
              noOfLines={1}
              width="40%"
              startColor="gray.600"
              endColor="gray.800"
              mb={3}
            >
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="#f8991d"
                textTransform="uppercase"
              >
                {position}
              </Text>
            </SkeletonText>

            {depths.map((depth, index) => (
              <Box
                key={index}
                w="100%"
                bg="rgba(255, 255, 255, 0.05)"
                p={2}
                borderRadius="md"
                mb={2}
                textAlign="center"
              >
                <SkeletonText
                  noOfLines={2}
                  spacing="2"
                  startColor="gray.600"
                  endColor="gray.800"
                >
                  <Text fontSize="xs" color="#bbb" mb={1}>
                    {depth}
                  </Text>
                  <Text fontSize="sm" color="#666">
                    Loading...
                  </Text>
                </SkeletonText>
              </Box>
            ))}
          </VStack>
        ))}
      </Flex>
    </Box>
  );
};

export default DepthChartSkeleton;
