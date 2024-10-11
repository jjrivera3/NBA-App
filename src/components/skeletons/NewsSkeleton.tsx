// components/NewsSkeleton.tsx
import {
  Box,
  Flex,
  VStack,
  Skeleton,
  SkeletonText,
  Divider,
  Text,
} from "@chakra-ui/react";

const NewsSkeleton = () => {
  return (
    <>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color="white"
        paddingTop={5}
        paddingLeft={5}
      >
        Top Headlines
      </Text>
      <VStack align="stretch" spacing={0} borderRadius="md" p={3}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Box key={index} p={4}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={5}
              alignItems="center"
            >
              <Skeleton
                boxSize={{ base: "100%", md: "70px" }}
                height="70px"
                borderRadius="md"
              />
              <VStack align="start" spacing={2} flex="1">
                <SkeletonText noOfLines={2} spacing="4" width="full" />
              </VStack>
            </Flex>
            {index < 7 && <Divider mt={4} borderColor="gray.600" />}
          </Box>
        ))}
      </VStack>
    </>
  );
};

export default NewsSkeleton;
