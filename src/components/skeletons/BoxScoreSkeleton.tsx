import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const BoxScoreSkeleton = () => {
  const skeletonRows = Array.from({ length: 10 }, (_, i) => i); // Generate 10 placeholder rows
  const skeletonColumns = Array.from({ length: 8 }, (_, i) => i); // Adjust for player stats columns

  return (
    <Box p={{ base: 0, md: 4 }} mt={7}>
      {/* Skeleton Header */}
      <Box mb={8} borderRadius="md" boxShadow="2xl" overflow="hidden">
        <Flex height="6px" overflow="hidden">
          <Box flex="1" backgroundColor="#4a4a4a" />
          <Box flex="1" backgroundColor="#3a3a3a" />
        </Flex>
        <Box
          padding="40px"
          textAlign="center"
          background="linear-gradient(180deg, #484848 0%, #2e2e2e 100%, #353535 100%)"
          border="0px 1px 1px 1px solid #000"
          height="222px"
        >
          <Flex align="center" justify={{ base: "center", md: "space-evenly" }}>
            {/* Away Team */}
            <Flex direction="row" align="center">
              <Flex direction="column" align="center" mx={8}>
                <SkeletonCircle size={{ base: "60px", md: "80px" }} />
                <SkeletonText mt={2} noOfLines={1} width="50px" />
                <SkeletonText mt={1} noOfLines={1} width="30px" />
              </Flex>
              <Skeleton height="40px" width="70px" />
            </Flex>

            <SkeletonText mt={2} noOfLines={1} width="30px" />

            {/* Home Team */}
            <Flex direction="row" align="center">
              <Skeleton height="40px" width="70px" />
              <Flex direction="column" align="center" mx={8}>
                <SkeletonCircle size={{ base: "60px", md: "80px" }} />
                <SkeletonText mt={2} noOfLines={1} width="50px" />
                <SkeletonText mt={1} noOfLines={1} width="30px" />
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>

      {/* Skeleton Player Stats Table */}
      <Box
        mb={8}
        background="#2a2a2a"
        padding="var(--chakra-space-3)"
        borderRadius="var(--chakra-radii-md)"
        overflow="auto"
        mt="30px"
        borderTop="4px solid #4a4a4a"
        boxShadow="2xl"
      >
        <Flex align="center" mb={4}>
          <SkeletonCircle size="40px" mr={3} />
          <SkeletonText noOfLines={1} width="150px" />
        </Flex>
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>
                  <Skeleton height="20px" width="120px" />
                </Th>
                {skeletonColumns.map((_, i) => (
                  <Th key={i}>
                    <Skeleton height="20px" width="60px" />
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {skeletonRows.map((_, rowIndex) => (
                <Tr key={rowIndex}>
                  <Td>
                    <Flex align="center">
                      <SkeletonCircle size="40px" mr={3} />
                      <SkeletonText noOfLines={1} width="150px" />
                    </Flex>
                  </Td>
                  {skeletonColumns.map((_, colIndex) => (
                    <Td key={colIndex}>
                      <Skeleton height="20px" width="50px" />
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default BoxScoreSkeleton;
