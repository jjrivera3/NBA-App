import React from "react";
import { Box, Text, Link, VStack, Divider } from "@chakra-ui/react";

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
    <Box p={4} borderRadius="md" color="white" width="250px">
      <VStack spacing={3} align="left">
        {/* Venue Details */}
        <Box>
          <Text fontSize="md">{venue.fullName}</Text>
          <Text fontSize="sm" color="gray.400">
            {venue.address.city}, {venue.address.state}
          </Text>
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
            <Text fontSize="sm" color="gray.400">
              Tickets Available: {tickets.numberAvailable}
            </Text>
            {tickets.links.length > 0 ? (
              tickets.links.map((link, index) => (
                <Link
                  key={index}
                  href={link}
                  color="blue.300"
                  fontSize="sm"
                  isExternal
                >
                  Buy Tickets
                </Link>
              ))
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
