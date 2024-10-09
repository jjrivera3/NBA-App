// src/components/TeamHeadingSkeleton.tsx
import { Box, Flex, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

const TeamHeadingSkeleton = () => {
  return (
    <Box
      borderRadius={5}
      padding={5}
      paddingY="20px"
      paddingX="20px"
      minHeight="136px" // Set a minimum height to increase the box size
      background="linear-gradient(295deg, #555 0%, rgba(0, 0, 0, 0.3) 60%, rgb(12 12 12 / 80%) 100%)"
    >
      <Flex align="center" justify="space-between" mb={0}>
        <Flex direction="column">
          {/* Logo and Team Name */}
          <Flex align="center" mb={2}>
            <Skeleton boxSize="40px" borderRadius="full" />
            <SkeletonText
              ml={3}
              noOfLines={1}
              spacing="4"
              skeletonHeight="5"
              width="160px"
            />
          </Flex>

          {/* Navigation Skeleton Items without Dividers */}
          <Flex mt={5} mx={5} align="center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} height="16px" width="50px" mr={10} />
            ))}
          </Flex>
        </Flex>

        {/* Conference and Record */}
        <VStack align="flex-end" spacing={2}>
          <Skeleton height="16px" width="80px" />
          <SkeletonText noOfLines={1} skeletonHeight="3" width="100px" />
        </VStack>
      </Flex>
    </Box>
  );
};

export default TeamHeadingSkeleton;
