// TeamHeadingSkeleton.tsx
import { Box, Flex, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

const TeamHeadingSkeleton = () => {
  return (
    <Box
      borderRadius={5}
      padding={5}
      paddingY="20px"
      paddingX="20px"
      background="linear-gradient(295deg, #555 0%, rgba(0, 0, 0, 0.3) 60%, rgb(12 12 12 / 80%) 100%)"
    >
      <Flex align="center" justify="space-between" mb={2}>
        <Flex direction="column">
          <Flex align="center" mb={2}>
            <Skeleton boxSize="64px" borderRadius="full" />
            <SkeletonText
              ml={3}
              noOfLines={2}
              spacing="4"
              skeletonHeight="2"
              width="120px"
            />
          </Flex>
          <SkeletonText mt={2} noOfLines={1} width="160px" skeletonHeight="2" />
        </Flex>
        <VStack align="flex-end">
          <SkeletonText noOfLines={1} skeletonHeight="2" width="50px" />
          <SkeletonText noOfLines={1} skeletonHeight="2" width="80px" />
        </VStack>
      </Flex>
    </Box>
  );
};

export default TeamHeadingSkeleton;
