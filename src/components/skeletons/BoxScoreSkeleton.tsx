import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const BoxScoreSkeleton = () => {
  return (
    <Box
      p={{ base: 4, md: 6 }}
      mt={7}
      borderRadius="md"
      boxShadow="2xl"
      overflow="hidden"
    >
      {/* Header Skeleton */}
      <Flex height="4px" overflow="hidden">
        <Box flex="1" backgroundColor="gray.500" />
        <Box flex="1" backgroundColor="gray.500" />
      </Flex>

      <Box
        padding="28px"
        textAlign="center"
        background="linear-gradient(180deg, #484848 0%, #2e2e2e 100%, #353535 100%)"
        border="0px 1px 1px 1px solid #000"
        position="relative"
      >
        <Box mt={6} mb={2}>
          <Flex align="center" justify={{ base: "center", md: "space-evenly" }}>
            {/* Away Team Skeleton */}
            <Flex direction="row" align="center">
              <Flex direction="column" align="center" mx={2}>
                <SkeletonCircle size={{ base: "50px", md: "80px" }} />
                <Skeleton height="20px" width="60px" mt={2} />
                <Skeleton height="16px" width="40px" mt={1} />
              </Flex>
              <Flex align="center">
                <Skeleton height="40px" width="80px" ml={4} />
              </Flex>
            </Flex>

            <Skeleton height="20px" width="30px" mx={4} />

            {/* Home Team Skeleton */}
            <Flex direction="row" align="center">
              <Flex align="center">
                <Skeleton height="40px" width="80px" mr={4} />
              </Flex>
              <Flex direction="column" align="center" mx={2}>
                <SkeletonCircle size={{ base: "50px", md: "80px" }} />
                <Skeleton height="20px" width="60px" mt={2} />
                <Skeleton height="16px" width="40px" mt={1} />
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>

      {/* Player Stats Skeleton */}
      <Box mt={8} background="#2a2a2a">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>
                <Skeleton height="20px" width="80px" />
              </Th>
              {[...Array(8)].map((_, index) => (
                <Th key={index}>
                  <Skeleton height="20px" width="60px" />
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {[...Array(5)].map((_, rowIndex) => (
              <Tr key={rowIndex}>
                <Td>
                  <SkeletonCircle size="40px" mr={2} />
                  <Skeleton height="20px" width="100px" />
                </Td>
                {[...Array(8)].map((_, colIndex) => (
                  <Td key={colIndex}>
                    <Skeleton height="16px" width="40px" />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default BoxScoreSkeleton;
