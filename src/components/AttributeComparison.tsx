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

  const getDifferenceColor = (diff: number) => {
    if (diff === 0) return "gray.500";
    return diff > 0 ? "green.500" : "red.500";
  };

  return (
    <Flex
      justify="space-evenly"
      p={2}
      borderBottom="1px solid #636363"
      alignItems="center"
    >
      <HStack>
        <Text
          color={getDifferenceColor(difference)}
          textAlign="center"
          fontSize="13px"
          fontWeight="500"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={{ base: "35px", md: "45px" }}
          minWidth={{ base: "30px", md: "45px" }}
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
          height={{ base: "35px", md: "45px" }}
          minWidth={{ base: "30px", md: "45px" }}
          fontWeight="600"
          fontSize={{ base: "14px", md: "16px" }}
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
        minWidth={{ base: "100px", md: "160px" }}
        fontSize={{ base: "13px", md: "15px" }}
        fontWeight={{ base: "500", md: "600" }}
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
          height={{ base: "35px", md: "45px" }}
          minWidth={{ base: "30px", md: "45px" }}
          fontWeight="600"
          fontSize={{ base: "14px", md: "16px" }}
        >
          {player2Value}
        </Text>
        <Text
          color={getDifferenceColor(-difference)}
          fontSize="13px"
          fontWeight="500"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={{ base: "35px", md: "45px" }}
          minWidth={{ base: "30px", md: "45px" }}
        >
          {-difference > 0 ? `+${-difference}` : -difference}
        </Text>
      </HStack>
    </Flex>
  );
};

export default AttributeComparison;
