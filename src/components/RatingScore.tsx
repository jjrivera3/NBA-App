import { Badge } from "@chakra-ui/react";

interface Props {
  rating: number;
}

const RatingScore = ({ rating }: Props) => {
  let color = "";

  if (rating >= 90) {
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
    <Badge colorScheme={color} fontSize="14px" paddingX={2} borderRadius="4px">
      {rating} Rating
    </Badge>
  );
};

export default RatingScore;
