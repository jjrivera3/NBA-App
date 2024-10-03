import { Flex, Heading, Image, Text } from "@chakra-ui/react";

interface Props {
  teamCity: string;
  teamName: string;
  conference: string;
  espnLogo1: string;
  wins: number;
  loss: string;
}

const TeamHeading = ({
  teamCity,
  teamName,
  conference,
  espnLogo1,
  wins,
  loss,
}: Props) => {
  return (
    <>
      <Flex align="center">
        <Image boxSize="50px" src={espnLogo1} />
        <Heading paddingLeft="10px">
          <Text as="span" fontWeight={400}>
            {teamCity}
          </Text>{" "}
          <Text as="span" fontWeight={400}>
            {teamName}
          </Text>
        </Heading>
      </Flex>
      <Text paddingLeft="65px">{conference}</Text>
      <Text paddingLeft="65px">
        Record: {wins}-{loss}
      </Text>
    </>
  );
};

export default TeamHeading;
