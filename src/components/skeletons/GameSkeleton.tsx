import { Box, Flex, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

const GameSkeleton = () => {
  return (
    <Box
      borderRadius="md"
      color="white"
      border="1px solid #444444"
      position="relative"
      background="#292929"
      p={3}
      minHeight="167px"
    >
      <Skeleton height="6px" width="100%" mb={3} borderRadius="md" />
      <Flex alignItems="center" justifyContent="space-between">
        <VStack spacing={1} align="center">
          <Skeleton boxSize="25px" borderRadius="full" />
          <SkeletonText noOfLines={1} width="30px" mt="2" />
        </VStack>
        <SkeletonText noOfLines={1} width="40px" />
        <VStack spacing={1} align="center">
          <Skeleton boxSize="25px" borderRadius="full" />
          <SkeletonText noOfLines={1} width="30px" mt="2" />
        </VStack>
      </Flex>
    </Box>
  );
};

export default GameSkeleton;
