import React from "react";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";

const TopPerformers: React.FC<{
  awayTeam: any;
  homeTeam: any;
  getTopPerformerDisplayValue: any;
}> = ({ awayTeam, homeTeam, getTopPerformerDisplayValue }) => {
  const getRatingLeader = (team: any) => {
    return team?.leaders?.find(
      (leader: { name: string }) => leader.name === "rating"
    )?.leaders?.[0];
  };

  const awayRatingLeader = getRatingLeader(awayTeam);
  const homeRatingLeader = getRatingLeader(homeTeam);

  return (
    <Box flex="1" textAlign="left" color="white" borderRadius={0} py={5} pl={5}>
      <Text fontWeight={500} mb={2}>
        Top Performers
      </Text>
      <VStack align="flex-start" spacing={4}>
        {awayRatingLeader && (
          <Flex alignItems="center">
            <Image
              src={awayRatingLeader.athlete?.headshot}
              alt={awayRatingLeader.athlete?.shortName}
              boxSize="40px"
              borderRadius="full"
              objectFit="cover"
              mr={3}
            />
            <Box>
              <Text fontSize="md" fontWeight="600">
                {awayRatingLeader.athlete?.shortName}
                <Text as="span" fontSize="sm" color="gray.400" ml={2}>
                  {awayRatingLeader.athlete?.position?.abbreviation} -{" "}
                  {awayTeam.abbreviation}
                </Text>
              </Text>
              <Text fontSize="sm" color="gray.400">
                {getTopPerformerDisplayValue(awayTeam)}
              </Text>
            </Box>
          </Flex>
        )}
        {homeRatingLeader && (
          <Flex alignItems="center">
            <Image
              src={homeRatingLeader.athlete?.headshot}
              alt={homeRatingLeader.athlete?.shortName}
              boxSize="40px"
              borderRadius="full"
              objectFit="cover"
              mr={3}
            />
            <Box>
              <Text fontSize="md" fontWeight="600">
                {homeRatingLeader.athlete?.shortName}
                <Text as="span" fontSize="sm" color="gray.400" ml={2}>
                  {homeRatingLeader.athlete?.position?.abbreviation} -{" "}
                  {homeTeam.abbreviation}
                </Text>
              </Text>
              <Text fontSize="sm" color="gray.400">
                {getTopPerformerDisplayValue(homeTeam)}
              </Text>
            </Box>
          </Flex>
        )}
      </VStack>
    </Box>
  );
};

export default TopPerformers;
