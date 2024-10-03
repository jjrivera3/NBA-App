import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";

interface Props {
  teamCity: string;
  teamName: string;
  conference: string;
  espnLogo1: string;
  wins: number;
  loss: string;
  firstColor: string;
}

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
      // Use linear-gradient with firstColor
      background={`linear-gradient(295deg, ${firstColor} 0%, rgba(0, 0, 0, 0.3) 60%, rgb(12 12 12 / 80%) 100%)`}
    >
      <Flex align="center" justify="space-between">
        {/* Left Side: Team Logo and Name */}
        <Flex align="center">
          <Image boxSize="40px" src={espnLogo1} />
          <Heading paddingLeft="10px">
            <Text as="span" fontWeight={200}>
              {teamCity}
            </Text>{" "}
            <Text as="span" fontWeight={600}>
              {teamName}
            </Text>
          </Heading>
        </Flex>

        {/* Right Side: Conference and Record */}
        <VStack align="flex-end">
          <Text fontWeight={600}>{conference}</Text>
          <Text>
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
