import { Badge } from "@chakra-ui/react";

interface Props {
  playerRating: number;
}

const RatingTeamScore = ({ playerRating }: Props) => {
  let color = "";
  let displayText = `2K Rating: ${playerRating}`;

  if (playerRating === 0) {
    color = "gray";
    displayText = "No Rating";
  } else if (playerRating >= 90) {
    color = "green";
  } else if (playerRating >= 80) {
    color = "teal";
  } else if (playerRating >= 70) {
    color = "yellow";
  } else if (playerRating >= 60) {
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

export default RatingTeamScore;
