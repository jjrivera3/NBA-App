import { Flex, HStack, Text } from "@chakra-ui/react";

interface AttributeComparisonProps {
  label: string;
  player1Value: number;
  player2Value: number;
}

const ComparePlayerStats: React.FC<AttributeComparisonProps> = ({
  label,
  player1Value,
  player2Value,
}) => {
  const difference = player1Value - player2Value;
  const roundedDifference = difference.toFixed(1); // Round to 1 decimal place

  // Check if the label corresponds to percentages (FG%, 3PT%, FTP%)
  const isPercentage = ["FG%", "3PT%", "FTP%"].includes(label);

  // Conditionally add a "%" to the values if the label is percentage-based
  const formattedPlayer1Value = isPercentage
    ? `${player1Value}%`
    : player1Value;
  const formattedPlayer2Value = isPercentage
    ? `${player2Value}%`
    : player2Value;

  // Check if the values are the same for both players
  const isEqual = player1Value === player2Value;

  // Text color logic for the difference
  const differenceTextColor = isEqual
    ? "gray.500"
    : difference > 0
    ? "green.500"
    : "red.500";
  const oppositeDifferenceTextColor = isEqual
    ? "gray.500"
    : -difference > 0
    ? "green.500"
    : "red.500";

  return (
    <Flex
      justify="space-evenly"
      p={2}
      borderBottom="1px solid #636363"
      alignItems="center"
    >
      <HStack>
        <Text
          color={differenceTextColor} // Use the same color for the difference text
          textAlign="center"
          fontSize="13px"
          fontWeight="500"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="45px"
          minWidth="45px"
        >
          {/* Only show the + or - if difference is not zero */}
          {isEqual
            ? roundedDifference
            : difference > 0
            ? `+${roundedDifference}`
            : roundedDifference}
        </Text>
        <Text
          textAlign="right"
          p={2}
          background="#0000002b"
          borderRadius="md"
          border="2px solid"
          borderColor={differenceTextColor} // Border color same as text color
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="45px"
          minWidth="70px"
          fontWeight="600"
        >
          {formattedPlayer1Value}
        </Text>
      </HStack>
      <Text
        color="white"
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="45px"
        minWidth="170px"
        fontWeight="600"
        fontSize="15px"
      >
        {label}
      </Text>
      <HStack>
        <Text
          textAlign="left"
          p={2}
          background="#0000002b"
          borderRadius="md"
          border="2px solid"
          borderColor={oppositeDifferenceTextColor} // Border color same as the opposite text color
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50px"
          minWidth="70px"
          fontWeight="600"
        >
          {formattedPlayer2Value}
        </Text>
        <Text
          color={oppositeDifferenceTextColor} // Use the same color for the difference text
          fontSize="13px"
          fontWeight="500"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="45px"
          minWidth="45px"
        >
          {/* Only show the + or - if difference is not zero */}
          {isEqual
            ? Math.abs(difference).toFixed(1)
            : -difference > 0
            ? `+${Math.abs(difference).toFixed(1)}`
            : `-${Math.abs(difference).toFixed(1)}`}
        </Text>
      </HStack>
    </Flex>
  );
};

export default ComparePlayerStats;
