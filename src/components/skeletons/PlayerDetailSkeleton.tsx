import { Box, Flex, Skeleton, VStack, HStack, Grid } from "@chakra-ui/react";

const PlayerDetailSkeleton = () => {
  return (
    <>
      {/* Player Header Section */}
      <Box
        as="section"
        padding="5px"
        borderRadius="md"
        w="full"
        boxShadow="2xl"
        rounded="md"
        overflow="hidden"
        background="linear-gradient(360deg, #26262640 30%, #000000 125%)"
        border="1px solid #000"
        mt={5}
        height={{ base: "950px", md: "460px" }} // Adjusted height for mobile
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "center" }}
          w="full"
          wrap="wrap"
          gap={{ base: 5, md: 0 }}
        >
          {/* Player Image and Info */}
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            gap={4}
            ml={{ base: 0, md: 10 }}
            mt={{ base: 12, md: 10 }}
          >
            {/* Flashing Skeleton for Avatar */}
            <Skeleton
              boxSize={{ base: "200px", md: "250px" }} // Match the player avatar size
              borderRadius="md"
              startColor="#262626"
              endColor="#333333"
            />
            {/* Skeleton for Player Info */}
            <VStack
              alignItems={{ base: "center", md: "flex-start" }}
              spacing={2}
              mb={{ base: 4, md: 0 }}
              ml={{ base: 0, md: 12 }}
            >
              <Flex align="center" mt={2} mb={4}>
                <Skeleton height="25px" width="25px" borderRadius="full" />
                <Skeleton height="20px" width="100px" ml={2} />
              </Flex>
              <HStack align="flex-start" spacing={2}>
                <Skeleton height="32px" width="80px" />
                <Skeleton height="32px" width="120px" />
              </HStack>
              <Skeleton height="20px" width="50px" />
              <Skeleton height="20px" width="80px" />
            </VStack>
          </Flex>

          {/* Skeletons stacked on top of each other */}
          <VStack
            spacing={5}
            mt={{ base: 5, md: 14 }}
            mr={{ base: 0, md: "145px" }}
            align={{ base: "center", md: "flex-start" }}
          >
            <Skeleton height="20px" width="150px" />
            <Skeleton height="20px" width="150px" />
            <Skeleton height="20px" width="150px" />
            <Skeleton height="20px" width="150px" />
          </VStack>
        </Flex>

        {/* Player Stats Skeletons for Mobile */}
        <Grid
          display={{ base: "grid", md: "none" }} // Only show on mobile
          templateColumns="repeat(2, 1fr)"
          gap={4}
          mt={5}
          px={4}
        >
          {[...Array(6)].map((_, index) => (
            <Box
              key={index}
              textAlign="center"
              height="80px"
              border="1px solid rgba(255, 255, 255, 0.1)" // Box outline
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              borderRadius="md"
            >
              <Skeleton height="20px" width="40px" mb={2} />
              <Skeleton height="30px" width="50px" />
            </Box>
          ))}
        </Grid>

        {/* Player Stats Outlines for Desktop */}
        <Flex
          justify="space-between"
          align="center"
          mt={{ base: 5, md: 12 }}
          paddingX="15px"
          paddingY="10px"
          height="100px"
          borderRadius="md"
          display={{ base: "none", md: "flex" }} // Only show on desktop
        >
          {[...Array(6)].map((_, index) => (
            <Box
              key={index}
              flex="1"
              height="95px"
              border="1px solid rgba(255, 255, 255, 0.1)" // Box outline
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Skeleton height="20px" width="40px" mb={2} />
              <Skeleton height="30px" width="50px" />
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Player Advanced Stats Section */}
      <Box
        as="section"
        padding="20px"
        borderRadius="md"
        w="full"
        mt={5}
        bg="#26262640"
        boxShadow="lg"
        rounded="md"
        border="1px solid #000"
      >
        <Skeleton height="30px" mb={2} />
        <Skeleton height="20px" width="80%" mb={2} />
        <Skeleton height="20px" width="60%" />
      </Box>

      {/* Player Attributes Section */}
      <Box
        as="section"
        padding={{ base: "0px", md: "0px" }}
        borderRadius="md"
        w="full"
        mt={5}
        boxShadow="lg"
        rounded="md"
      >
        <Skeleton height="300px" />
        <Box mt={5}>
          <Skeleton height="20px" width="80%" mb={4} />
          <Skeleton height="20px" width="60%" />
        </Box>
      </Box>
    </>
  );
};

export default PlayerDetailSkeleton;
