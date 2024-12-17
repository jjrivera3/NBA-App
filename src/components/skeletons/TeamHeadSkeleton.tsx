import { Box, Flex, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

const TeamHeadingSkeleton = () => {
  return (
    <Box
      borderRadius={5}
      padding={5}
      paddingY="20px"
      paddingX="20px"
      minHeight={{ base: "350px", md: "125px" }}
      background="linear-gradient(295deg, #555 0%, rgba(0, 0, 0, 0.3) 60%, rgb(12 12 12 / 80%) 100%)"
    >
      <Flex
        align="center"
        justify="space-between"
        mb={0}
        direction={{ base: "column", md: "row" }}
      >
        <Flex
          direction="column"
          align={{ base: "center", md: "flex-start" }}
          mb={{ base: 4, md: 0 }}
        >
          {/* Logo and Team Name Skeleton */}
          <Flex align="center" mt={{ base: 6, md: 0 }} mb={2}>
            <Skeleton
              boxSize={{ base: "30px", md: "40px" }}
              borderRadius="full"
            />
            <SkeletonText
              ml={3}
              noOfLines={1}
              spacing="4"
              skeletonHeight="5"
              width={{ base: "170px", md: "160px" }}
            />
          </Flex>

          {/* Navigation Skeleton Items */}
          <Flex
            mt={{ base: 3, md: 4 }}
            mx={5}
            align="center"
            direction={{ base: "column", md: "row" }}
            wrap={{ base: "wrap", md: "nowrap" }}
            justify={{ base: "center", md: "flex-start" }}
            width={{ base: "100%", md: "auto" }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                height="15px"
                width={{ base: "70px", md: "60px" }}
                mr={{ base: 0, md: 10 }}
                mb={{ base: 2, md: 0 }}
                ml="-14px"
              />
            ))}
          </Flex>
        </Flex>

        {/* Conference and Record Skeleton */}
        <VStack
          align={{ base: "center", md: "flex-end" }}
          spacing={2}
          display={{ base: "flex", md: "flex" }}
        >
          <Skeleton height="16px" width={{ base: "60px", md: "80px" }} />
          <SkeletonText
            noOfLines={1}
            skeletonHeight="3"
            width={{ base: "70px", md: "100px" }}
          />
        </VStack>
      </Flex>
    </Box>
  );
};

export default TeamHeadingSkeleton;
