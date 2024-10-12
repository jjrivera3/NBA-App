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
      <Flex
        align={{ base: "center", md: "center" }}
        justify="space-between"
        mb={0}
        direction={{ base: "column", md: "row" }} // Stack vertically on mobile, horizontally on desktop
      >
        <Flex
          direction="column"
          align={{ base: "center", md: "flex-start" }}
          mb={{ base: 4, md: 0 }}
        >
          <Flex
            direction={{ base: "row", md: "row" }} // Stack logo next to team name on mobile
            align="center"
            mb={{ base: 2, md: 0 }}
          >
            <Image
              boxSize={{ base: "30px", md: "40px" }} // Adjust size on mobile
              src={espnLogo1}
              mr={{ base: 2, md: 0 }}
            />
            <Heading
              paddingLeft={{ base: 0, md: "12px" }}
              textAlign={{ base: "center", md: "left" }}
              fontSize={{ base: "18px", md: "3xl" }}
            >
              <Text as="span" fontWeight={200} color="rgba(255, 255, 255, 0.9)">
                {teamCity}
              </Text>{" "}
              <Text as="span" fontWeight={600} color="rgba(255, 255, 255, 0.9)">
                {teamName}
              </Text>
            </Heading>
          </Flex>
          {/* Conference and Record below with added top margin on mobile */}
          <VStack
            align="center"
            display={{ base: "flex", md: "none" }} // Show only on mobile
            spacing={0}
            mb={{ base: 2, md: 0 }}
            mt={{ base: 3, md: 0 }} // Add margin on top for mobile
          >
            <Text fontWeight={600} color="rgba(255, 255, 255, 0.9)">
              {conference}
            </Text>
            <Text color="rgba(255, 255, 255, 0.9)">
              <Text as="span" fontWeight={600}>
                Record:
              </Text>
              <Text as="span" fontWeight={400}>
                {" "}
                {wins}-{loss}
              </Text>
            </Text>
          </VStack>
          {/* Navigation items in a horizontal scrollable row for mobile */}
          <Flex
            mt={2}
            align="center"
            direction="row"
            wrap={{ base: "nowrap", md: "nowrap" }}
            justify="flex-start"
            overflowX={{ base: "auto", md: "visible" }}
            maxWidth="100%"
            px={2} // Padding on both sides to keep items fully visible
            css={{
              "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar on mobile
              scrollSnapType: "x mandatory",
              "-webkit-overflow-scrolling": "touch",
            }}
          >
            {NAV_ITEMS.map((item, index) => {
              const isActive = location.pathname === item.to;
              return (
                <RouterLink
                  to={item.to}
                  key={item.label}
                  style={{ flexShrink: 0 }}
                >
                  <Text
                    fontSize="14px"
                    color={isActive ? "white" : "gray.300"}
                    fontWeight={isActive ? "600" : "400"}
                    textAlign="center"
                    p={3}
                    mb={{ base: 2, md: 0 }}
                    borderRadius="md"
                    bg={isActive ? "gray.700" : "transparent"}
                    _hover={{ backgroundColor: "gray.600", color: "white" }}
                  >
                    {item.label}
                  </Text>
                </RouterLink>
              );
            })}
          </Flex>
        </Flex>
        {/* Conference and Record on the right side for Desktop */}
        <VStack
          align="flex-end"
          display={{ base: "none", md: "flex" }} // Show only on desktop
        >
          <Text fontWeight={600} color="rgba(255, 255, 255, 0.9)">
            {conference}
          </Text>
          <Text color="rgba(255, 255, 255, 0.9)">
            <Text as="span" fontWeight={600}>
              Record:
            </Text>
            <Text as="span" fontWeight={400}>
              {" "}
              {wins}-{loss}
            </Text>
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default TeamHeading;
