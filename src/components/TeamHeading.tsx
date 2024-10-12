import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
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
        direction={{ base: "column", md: "row" }}
        mt={{ base: 6, md: 0 }} // Added margin-top on mobile
      >
        <Flex
          direction="column"
          align={{ base: "center", md: "flex-start" }}
          mb={{ base: 4, md: 0 }}
        >
          <Flex
            direction={{ base: "row", md: "row" }}
            align="center"
            mb={{ base: 2, md: 0 }}
          >
            <Image
              boxSize={{ base: "30px", md: "40px" }}
              src={espnLogo1}
              mr={{ base: 2, md: 0 }}
            />
            <Heading
              paddingLeft={{ base: 0, md: "12px" }}
              textAlign={{ base: "center", md: "left" }}
              fontSize={{ base: "24px", md: "3xl" }}
            >
              <Text as="span" fontWeight={200} color="rgba(255, 255, 255, 0.9)">
                {teamCity}
              </Text>{" "}
              <Text as="span" fontWeight={600} color="rgba(255, 255, 255, 0.9)">
                {teamName}
              </Text>
            </Heading>
          </Flex>
          <VStack
            align="center"
            display={{ base: "flex", md: "none" }}
            spacing={0}
            mb={{ base: 2, md: 0 }}
            mt={{ base: 3, md: 0 }}
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
          <Flex
            mt={4}
            align="center"
            direction={{ base: "column", md: "row" }}
            wrap={{ base: "wrap", md: "nowrap" }}
            justify={{ base: "center", md: "flex-start" }}
            width={{ base: "100%", md: "auto" }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <RouterLink to={item.to} key={item.label}>
                  <Text
                    fontSize="14px"
                    color={isActive ? "white" : "gray.300"}
                    fontWeight={isActive ? "500" : "400"}
                    textAlign="center"
                    px={3}
                    py={1} // Reduced padding for a slimmer appearance
                    mb={{ base: 2, md: 0 }}
                    borderRadius="4px" // Slightly rounded corners for a slim look
                    bg={isActive ? `${firstColor}` : "transparent"}
                    _hover={{
                      textDecoration: "underline",
                      color: "white",
                    }}
                    width={{ base: "100%", md: "auto" }}
                  >
                    {item.label}
                  </Text>
                </RouterLink>
              );
            })}
          </Flex>
        </Flex>
        <VStack align="flex-end" display={{ base: "none", md: "flex" }}>
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
