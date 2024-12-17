// src/components/UpcomingGameSkeleton.tsx
import {
  Box,
  Flex,
  Text,
  Skeleton,
  SkeletonCircle,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";

const UpcomingGameSkeleton: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Box
        mt={7}
        p={5}
        borderRadius="md"
        boxShadow="2xl"
        textAlign="center"
        background="linear-gradient(88deg, #1a1a1d 0%, #2d2d30 50%, #333333 100%)"
        border="1px solid #000"
        borderTop="7px solid #4a4a4a"
      >
        <Text mt={2} fontSize="xl" fontWeight="bold">
          Upcoming Game
        </Text>
        <Box height="165px" mt={4} mb={2}>
          <Flex align="center" justify="space-evenly">
            {/* Left Side - Away Team Placeholder */}
            <Flex align="center">
              <Flex direction="column" align="center">
                <SkeletonCircle size="100px" />
                <Skeleton height="20px" width="50px" mt={3} />
                <Skeleton height="16px" width="40px" mt={1} />
              </Flex>
            </Flex>

            {/* Center - Placeholder for "vs" */}
            <Text fontSize="2xl" fontWeight="bold" color="white">
              vs
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
      <Box mt={10} p={0} w={"full"} textAlign="center">
        <Text
          fontSize={{ base: "18px", md: "2xl" }}
          fontWeight={600}
          color="white"
          mb={5}
        >
          2024-2025 Season Schedule
        </Text>

        {isMobile ? (
          <Box>
            {/* Mobile Schedule Skeleton */}
            {Array.from({ length: 5 }).map((_, index) => (
              <Box
                key={index}
                mb={4}
                p={4}
                bgGradient="linear(to-r, #2A2A2A, #1F1F1F)"
                borderRadius="lg"
                boxShadow="lg"
                textAlign="center"
                borderWidth="1px"
                borderColor="gray.400"
              >
                <Skeleton height="20px" width="100px" mb={2} />
                <Flex align="center" justify="center" mb={2}>
                  <SkeletonCircle size="30px" />
                  <Skeleton height="20px" width="80px" />
                </Flex>
                <Skeleton height="16px" width="120px" />
                <Skeleton height="16px" width="80px" mt={2} />
              </Box>
            ))}
          </Box>
        ) : (
          // Desktop Schedule Skeleton
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <Skeleton height="20px" width="100px" />
                </Th>
                <Th>
                  <Skeleton height="20px" width="150px" />
                </Th>
                <Th>
                  <Skeleton height="20px" width="100px" />
                </Th>
                <Th>
                  <Skeleton height="20px" width="70px" />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.from({ length: 15 }).map((_, index) => (
                <Tr key={index}>
                  <Td>
                    <Skeleton height="20px" width="100px" />
                  </Td>
                  <Td>
                    <Flex align="center">
                      <SkeletonCircle size="25px" mr={2} />
                      <Skeleton height="20px" width="100px" />
                    </Flex>
                  </Td>
                  <Td>
                    <Skeleton height="20px" width="80px" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" width="60px" />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </>
  );
};

export default UpcomingGameSkeleton;
