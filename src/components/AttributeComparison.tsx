import { Flex, HStack, Text } from "@chakra-ui/react";

interface AttributeComparisonProps {
  label: string;
  player1Value: number;
  player2Value: number;
  getColor: (value: number) => string;
}

const AttributeComparison: React.FC<AttributeComparisonProps> = ({
  label,
  player1Value,
  player2Value,
  getColor,
}) => {
  const difference = player1Value - player2Value;

  return (
    <Flex
      justify="space-evenly"
      p={2}
      borderBottom="1px solid #636363"
      alignItems="center"
    >
      <HStack>
        <Text
          color={difference > 0 ? "green.500" : "red.500"}
          textAlign="center"
          fontSize="13px"
          fontWeight="500"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="45px"
          minWidth="45px"
        >
          {difference > 0 ? `+${difference}` : difference}
        </Text>
        <Text
          color="white"
          textAlign="right"
          bg={getColor(player1Value)}
          p={2}
          borderRadius="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="45px"
          minWidth="45px"
          fontWeight="600"
        >
          {player1Value}
        </Text>
      </HStack>
      <Text
        color="white"
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="45px"
        minWidth="160px"
        fontWeight="600"
        fontSize="15px"
      >
        {label}
      </Text>
      <HStack>
        <Text
          color="white"
          textAlign="left"
          bg={getColor(player2Value)}
          p={2}
          borderRadius="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="45px"
          minWidth="45px"
          fontWeight="600"
        >
          {player2Value}
        </Text>
        <Text
          color={-difference > 0 ? "green.500" : "red.500"}
          fontSize="13px"
          fontWeight="500"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="45px"
          minWidth="45px"
        >
          {-difference > 0 ? `+${-difference}` : -difference}
        </Text>
      </HStack>
    </Flex>
  );
};

export default AttributeComparison;
