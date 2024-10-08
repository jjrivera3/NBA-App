import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface Props {
  teamCity: string;
  teamName: string;
  conference: string;
  espnLogo1: string;
  wins: number;
  loss: string;
  firstColor: string;
  teamAbv: string;
}

const TeamHeading = ({
  teamCity,
  teamName,
  conference,
  espnLogo1,
  wins,
  loss,
  firstColor,
  teamAbv,
}: Props) => {
  const location = useLocation();

  const NAV_ITEMS = [
    { label: "Roster", to: `/${teamAbv}` },
    { label: "Schedule", to: `/${teamAbv}/schedule` },
    { label: "Team Stats", to: "/team-stats" },
    { label: "Depth Chart", to: "/depth-chart" },
    { label: "Injuries", to: "/injuries" },
  ];

  return (
    <Box
      borderRadius={5}
      padding={5}
      paddingY="20px"
      paddingX="20px"
      background={`linear-gradient(295deg, ${firstColor} 0%, rgba(0, 0, 0, 0.3) 60%, rgb(12 12 12 / 80%) 100%)`}
    >
      <Flex align="center" justify="space-between" mb={0}>
        <Flex direction="column">
          <Flex align="center" mb={2}>
            <Image boxSize="40px" src={espnLogo1} />
            <Heading paddingLeft="12px">
              <Text as="span" fontWeight={200} color="rgba(255, 255, 255, 0.9)">
                {teamCity}
              </Text>{" "}
              <Text as="span" fontWeight={600} color="rgba(255, 255, 255, 0.9)">
                {teamName}
              </Text>
            </Heading>
          </Flex>
          <Flex mt={2} align="center">
            {NAV_ITEMS.map((item, index) => {
              const isActive = location.pathname === item.to; // Check if current route matches the item's route
              return (
                <Flex key={item.label} align="center" mr={2}>
                  <RouterLink to={item.to}>
                    <Text
                      mx={2}
                      fontSize="14px"
                      color={isActive ? "white" : "gray.300"}
                      fontWeight={isActive ? "600" : "400"}
                      _hover={{ color: "white", textDecoration: "underline" }}
                      p={2}
                      borderRadius="md"
                      textDecoration={isActive ? "underline" : "none"}
                    >
                      {item.label}
                    </Text>
                  </RouterLink>
                  {index < NAV_ITEMS.length - 1 && (
                    <Divider
                      orientation="vertical"
                      height="20px"
                      borderColor="whiteAlpha.600"
                    />
                  )}
                </Flex>
              );
            })}
          </Flex>
        </Flex>
        <VStack align="flex-end">
          <Text fontWeight={600} color="rgba(255, 255, 255, 0.9)">
            {conference}
          </Text>
          <Text color="rgba(255, 255, 255, 0.9)">
            <Text as="span" fontWeight={600}>
              Record:
            </Text>
            <Text as="span" fontWeight={400}>
              {""} {wins}-{loss}
            </Text>
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default TeamHeading;
