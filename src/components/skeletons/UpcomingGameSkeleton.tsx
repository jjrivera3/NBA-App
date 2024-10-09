// src/components/UpcomingGameSkeleton.tsx
import { Box, Flex, Text, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const UpcomingGameSkeleton: React.FC = () => {
  return (
    <Box
      mt={7}
      p={5}
      borderRadius="md"
      boxShadow="2xl"
      textAlign="center"
      background="linear-gradient(88deg, #1a1a1d 0%, #2d2d30 50%, #333333 100%)"
      border="1px solid #000"
    >
      <Text fontSize="xl" fontWeight="bold">
        Upcoming Game
      </Text>
      <Box mt={4} mb={2}>
        <Flex align="center" justify="space-evenly">
          {/* Left Side - Away Team Placeholder */}
          <Flex align="center">
            <Flex direction="column" align="center">
              <SkeletonCircle size="100px" />
              <Skeleton height="20px" width="50px" mt={3} />
              <Skeleton height="16px" width="40px" mt={1} />
            </Flex>
          </Flex>

          {/* Center - Placeholder for "@" */}
          <Text fontSize="2xl" fontWeight="bold" color="white">
            @
          </Text>

          {/* Right Side - Home Team Placeholder */}
          <Flex align="center">
            <Flex direction="column" align="center">
              <SkeletonCircle size="100px" />
              <Skeleton height="20px" width="50px" mt={3} />
              <Skeleton height="16px" width="40px" mt={1} />
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex direction="column" align="center" justify="center" mt={2}>
        <Skeleton height="15px" width="120px" mb={2} />
        <Skeleton height="15px" width="80px" />
      </Flex>
    </Box>
  );
};

export default UpcomingGameSkeleton;
