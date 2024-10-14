import { Badge } from "@chakra-ui/react";

interface Props {
  rating: number;
}

const RatingScore = ({ rating }: Props) => {
  let color = "";
  let displayText = `2K Rating: ${rating}`;

  if (rating === 0) {
    color = "gray";
    displayText = "No Rating";
  } else if (rating >= 90) {
    color = "green";
  } else if (rating >= 80) {
    color = "teal";
  } else if (rating >= 70) {
    color = "yellow";
  } else if (rating >= 60) {
    color = "orange";
  } else {
    color = "red";
  }

  return (
    <Badge
      mt={{ base: 5, md: 0 }}
      colorScheme={color}
      fontSize="14px"
      paddingX={2}
      borderRadius="4px"
    >
      {displayText}
    </Badge>
  );
};

export default RatingScore;
