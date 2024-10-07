import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  Link,
  Divider,
} from "@chakra-ui/react";

interface Props {
  teamCity: string;
  teamName: string;
  conference: string;
  espnLogo1: string;
  wins: number;
  loss: string;
  firstColor: string;
}

const NAV_ITEMS = [
  {
    label: "Roster",
    href: "/roster",
  },
  {
    label: "Schedule",
    href: "/schedule",
  },
  {
    label: "Team Stats",
    href: "/team-stats",
  },
  {
    label: "Depth Chart",
    href: "/depth-chart",
  },
  {
    label: "Injuries",
    href: "/injuries",
  },
];

const TeamHeading = ({
  teamCity,
  teamName,
  conference,
  espnLogo1,
  wins,
  loss,
  firstColor,
}: Props) => {
  return (
    <Box
      borderRadius={5}
      padding={5}
      paddingY="20px"
      paddingX="20px"
      background={`linear-gradient(295deg, ${firstColor} 0%, rgba(0, 0, 0, 0.3) 60%, rgb(12 12 12 / 80%) 100%)`}
    >
      <Flex align="center" justify="space-between" mb={0}>
        {/* Left Side: Team Logo and Name */}
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
          {/* Navigation Menu */}
          <Flex mt={4} align="center">
            {NAV_ITEMS.map((item, index) => (
              <Flex key={item.label} align="center" mr={2}>
                <Link
                  href={item.href}
                  mx={2}
                  fontSize={item.label === "Roster" ? "15px" : "14px"}
                  color={item.label === "Roster" ? "white" : "gray.300"}
                  fontWeight={item.label === "Roster" ? "bold" : "400"}
                  _hover={{ color: "white", textDecoration: "underline" }}
                  p={2}
                  borderRadius="md"
                  textDecoration={
                    item.label === "Roster" ? "underline" : "none"
                  }
                >
                  {item.label}
                </Link>
                {/* Add a divider between items, except after the last item */}
                {index < NAV_ITEMS.length - 1 && (
                  <Divider
                    orientation="vertical"
                    height="20px"
                    borderColor="whiteAlpha.600"
                  />
                )}
              </Flex>
            ))}
          </Flex>
        </Flex>

        {/* Right Side: Conference and Record */}
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
