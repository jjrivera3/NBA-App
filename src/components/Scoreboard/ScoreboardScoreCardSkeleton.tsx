import React from "react";
import { Box, Flex, Grid, Skeleton } from "@chakra-ui/react";

const ScoreboardScoreCardSkeleton: React.FC = () => {
  return (
    <Box
      px={4}
      pt="55px" // Reduced padding-top
      pb={8} // Reduced padding-bottom
      color="white"
      position="relative"
      overflow="hidden"
      boxShadow="md"
      background="linear-gradient(135deg, #464646, #333333)"
      width="100%" // Ensure full width
      mb={1} // Adjust margin between skeletons if needed
    >
      {/* Final/Game Time in Top Left Corner */}
      <Skeleton
        position="absolute"
        top="8px"
        left="8px"
        height="14px" // Adjusted height
        width="50px"
      />

      {/* Away Team Row */}
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        {" "}
        {/* Reduced bottom margin */}
        <Flex alignItems="center" width="250px" mr={5}>
          <Skeleton boxSize="30px" borderRadius="full" mr={3} />{" "}
          {/* Reduced size */}
          <Box>
            <Skeleton height="14px" width="120px" /> {/* Adjusted height */}
            <Skeleton height="14px" width="60px" mt={2} />{" "}
            {/* Adjusted height */}
          </Box>
        </Flex>
        <Grid
          templateColumns="repeat(5, 40px)" // Adjusted column width
          gap={0}
          textAlign="center"
          alignItems="center"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height="16px" width="20px" />
          ))}
        </Grid>
      </Flex>

      {/* Home Team Row */}
      <Flex justifyContent="space-between" alignItems="center" mt={2}>
        {" "}
        {/* Reduced top margin */}
        <Flex alignItems="center" width="250px" mr={5}>
          <Skeleton boxSize="30px" borderRadius="full" mr={3} />{" "}
          {/* Reduced size */}
          <Box>
            <Skeleton height="14px" width="120px" /> {/* Adjusted height */}
            <Skeleton height="14px" width="60px" mt={2} />{" "}
            {/* Adjusted height */}
          </Box>
        </Flex>
        <Grid
          templateColumns="repeat(5, 40px)" // Adjusted column width
          gap={0}
          textAlign="center"
          alignItems="center"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height="16px" width="20px" />
          ))}
        </Grid>
      </Flex>
    </Box>
  );
};

export default ScoreboardScoreCardSkeleton;
