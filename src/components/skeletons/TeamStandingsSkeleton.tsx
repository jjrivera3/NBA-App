import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";

const TeamStandingsSkeleton = () => {
  return (
    <Flex direction={{ base: "column", lg: "row" }} gap={10} mt={0}>
      <Box
        p={5}
        borderRadius="md"
        background="linear-gradient(337deg, #1a1a1d 0%, #2e2e2e 90%, #353535 100%)"
        width={{ base: "100%", lg: "100%" }}
        border="1px solid"
        borderColor="#2a2b2f"
      >
        <Skeleton height="30px" width="150px" mb={5} />
        <ButtonGroup isAttached borderRadius="full" mb={5} width="100%">
          <Button
            flex="1"
            bg="gray.700"
            color="white"
            borderRadius="full"
            _hover={{ bg: "gray.600" }}
            _active={{ bg: "gray.600" }}
          >
            <SkeletonText noOfLines={1} skeletonHeight="16px" width="100%" />
          </Button>
          <Button
            flex="1"
            bg="gray.700"
            color="white"
            borderRadius="full"
            _hover={{ bg: "gray.600" }}
            _active={{ bg: "gray.600" }}
          >
            <SkeletonText noOfLines={1} skeletonHeight="16px" width="100%" />
          </Button>
        </ButtonGroup>
        <Divider mb={4} />
        <VStack align="start" spacing={3}>
          <Flex align="center" justify="space-between" mb={2} w="100%">
            <Skeleton height="20px" width="50%" />
            <Skeleton height="20px" width="15%" />
            <Skeleton height="20px" width="15%" />
            <Skeleton height="20px" width="20%" />
          </Flex>
          {[...Array(10)].map((_, index) => (
            <Box key={index} w="full" p={2} borderRadius="md">
              <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center" w="50%">
                  <Skeleton height="16px" width="10%" mr={2} />
                  <SkeletonCircle size="24px" mr={2} />
                  <SkeletonText
                    noOfLines={1}
                    skeletonHeight="16px"
                    width="60%"
                  />
                </Flex>
                <Skeleton height="16px" width="15%" />
                <Skeleton height="16px" width="15%" />
                <Skeleton height="16px" width="20%" />
              </Flex>
            </Box>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default TeamStandingsSkeleton;
