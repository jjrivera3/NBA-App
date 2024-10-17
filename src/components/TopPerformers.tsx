import React from "react";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";

interface TopPerformersProps {
  team: {
    abbreviation: string;
    leaders?: {
      name: string;
      leaders: {
        displayValue: string;
        athlete: {
          headshot: string;
          shortName: string;
          position: {
            abbreviation: string;
          };
        };
      }[];
    }[];
  };
  getTopPerformerDisplayValue: (team: any) => string;
}

const TopPerformers: React.FC<{
  awayTeam: any;
  homeTeam: any;
  getTopPerformerDisplayValue: any;
}> = ({ awayTeam, homeTeam, getTopPerformerDisplayValue }) => {
  // Debugging: Log the away and home team data
  console.log("Away Team Abbreviation:", awayTeam?.abbreviation);
  console.log("Home Team Abbreviation:", homeTeam?.abbreviation);

  return (
    <Box flex="1" textAlign="left" ml={8} color="white">
      <Text fontWeight="bold" mb={2}>
        Top Performers
      </Text>
      <VStack align="flex-start" spacing={4}>
        {awayTeam && (
          <Flex alignItems="center">
            <Image
              src={awayTeam.leaders?.[0]?.leaders?.[0]?.athlete?.headshot}
              alt={awayTeam.leaders?.[0]?.leaders?.[0]?.athlete?.shortName}
              boxSize="40px"
              borderRadius="full"
              objectFit="cover"
              mr={3}
            />
            <Box>
              <Text fontSize="md" fontWeight="600">
                {awayTeam.leaders?.[0]?.leaders?.[0]?.athlete?.shortName}
                <Text as="span" fontSize="sm" color="gray.400" ml={2}>
                  {
                    awayTeam.leaders?.[0]?.leaders?.[0]?.athlete?.position
                      ?.abbreviation
                  }{" "}
                  - {awayTeam.abbreviation}
                </Text>
              </Text>
              <Text fontSize="sm" color="gray.400">
                {getTopPerformerDisplayValue(awayTeam)}
              </Text>
            </Box>
          </Flex>
        )}
        {homeTeam && (
          <Flex alignItems="center">
            <Image
              src={homeTeam.leaders?.[0]?.leaders?.[0]?.athlete?.headshot}
              alt={homeTeam.leaders?.[0]?.leaders?.[0]?.athlete?.shortName}
              boxSize="40px"
              borderRadius="full"
              objectFit="cover"
              mr={3}
            />
            <Box>
              <Text fontSize="md" fontWeight="600">
                {homeTeam.leaders?.[0]?.leaders?.[0]?.athlete?.shortName}
                <Text as="span" fontSize="sm" color="gray.400" ml={2}>
                  {
                    homeTeam.leaders?.[0]?.leaders?.[0]?.athlete?.position
                      ?.abbreviation
                  }{" "}
                  - {homeTeam.abbreviation}
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
