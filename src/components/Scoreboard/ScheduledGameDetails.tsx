import React from "react";
import { Box, Text, Link, VStack, Divider, Flex } from "@chakra-ui/react";

interface ScheduledGameDetailsProps {
  venue: {
    fullName: string;
    address: {
      city: string;
      state: string;
    };
  };
  odds: {
    provider: { name: string };
    details: string;
    overUnder: number;
  } | null;
  tickets: {
    summary: string;
    numberAvailable: number; // Added this property
    links: string[];
  } | null;
}

const ScheduledGameDetails: React.FC<ScheduledGameDetailsProps> = ({
  venue,
  odds,
  tickets,
}) => {
  return (
    <Box px={6} borderRadius="md" color="white">
      <VStack spacing={3} align="left">
        {/* Venue Details */}
        <Box>
          <Flex>
            <Text fontSize="15px">{venue.fullName}</Text>

            <Text fontSize="15px" color="gray.400" ml={2}>
              {venue.address.city}, {venue.address.state}
            </Text>
          </Flex>
        </Box>

        <Divider borderColor="gray.600" />

        {/* Odds Details */}
        {odds ? (
          <Box>
            <Text fontSize="sm" color="gray.400">
              Spread: {odds.details ?? "N/A"}
            </Text>
            <Text fontSize="sm" color="gray.400">
              Over/Under: {odds.overUnder ?? "N/A"}
            </Text>
          </Box>
        ) : (
          <Text fontSize="md" color="gray.400">
            Odds Unavailable
          </Text>
        )}

        <Divider borderColor="gray.600" />

        {/* Tickets Details */}
        {tickets ? (
          <Box>
            <Text fontSize="md">{tickets.summary}</Text>

            {tickets.links.length > 0 ? (
              <Link
                href={tickets.links[0]} // Only the first link is used
                color="blue.300"
                fontSize="sm"
                isExternal
              >
                Buy Tickets
              </Link>
            ) : (
              <Text fontSize="md" color="gray.400">
                No Ticket Links Available
              </Text>
            )}
          </Box>
        ) : (
          <Text fontSize="md" color="gray.400">
            Tickets Unavailable
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default ScheduledGameDetails;
