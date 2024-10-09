import { Box, Flex, Progress, Text, Grid, Heading } from "@chakra-ui/react";

interface AttributeBarProps {
  label: string;
  value: number;
  max: number;
}

const AttributeBar: React.FC<AttributeBarProps> = ({ label, value, max }) => {
  const getColor = (value: number) => {
    if (value >= 90) return "#0a0"; // Highest: 90-100
    if (value >= 80) return "#070"; // High: 80-89
    if (value >= 70) return "#c90"; // Medium: 70-79
    if (value >= 60) return "#d40"; // Low: 60-69
    return "#900"; // Lowest: < 60
  };

  return (
    <Box p={2} borderRadius="md" mb={3} boxShadow="sm">
      <Flex justify="space-between" align="center" mb={1}>
        <Text fontWeight={500} fontSize="14px" color="gray.300">
          {label}
        </Text>
        <Text fontWeight="bold" fontSize="sm" color="gray.500">
          {value}
        </Text>
      </Flex>
      <Progress
        value={value}
        max={max}
        height="3px"
        borderRadius="md"
        bg="rgba(255, 255, 255, 0.05)"
        sx={{
          "& > div": {
            backgroundColor: getColor(value),
          },
        }}
      />
    </Box>
  );
};

interface CategoryBoxProps {
  title: string;
  attributes: { label: string; value: number }[];
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ title, attributes }) => (
  <Box p={4} borderRadius="md" mb={4} background="#1b1b1b">
    <Heading size="sm" color="gray.100" mb={3}>
      {title}
    </Heading>
    {attributes.map((attr, idx) => (
      <AttributeBar key={idx} label={attr.label} value={attr.value} max={100} />
    ))}
  </Box>
);

interface PlayerAttributesProps {
  playerRating: any; // Modify to be more specific if you have a type for playerRating
}

const PlayerAttributes: React.FC<PlayerAttributesProps> = ({
  playerRating,
}) => {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={4}
      w="full"
    >
      <CategoryBox
        title="Outside Scoring"
        attributes={[
          { label: "Close Shot", value: playerRating.closeShot },
          { label: "Mid-Range Shot", value: playerRating.midRangeShot },
          { label: "Three-Point Shot", value: playerRating.threePointShot },
          { label: "Free Throw", value: playerRating.freeThrow },
          { label: "Shot IQ", value: playerRating.shotIQ },
          {
            label: "Offensive Consistency",
            value: playerRating.offensiveConsistency,
          },
        ]}
      />
      <CategoryBox
        title="Athleticism"
        attributes={[
          { label: "Speed", value: playerRating.speed },
          { label: "Agility", value: playerRating.agility },
          { label: "Strength", value: playerRating.strength },
          { label: "Vertical", value: playerRating.vertical },
          { label: "Stamina", value: playerRating.stamina },
          { label: "Hustle", value: playerRating.hustle },
          {
            label: "Overall Durability",
            value: playerRating.overallDurability,
          },
        ]}
      />
      <CategoryBox
        title="Inside Scoring"
        attributes={[
          { label: "Layup", value: playerRating.layup },
          { label: "Standing Dunk", value: playerRating.standingDunk },
          { label: "Driving Dunk", value: playerRating.drivingDunk },
          { label: "Post Hook", value: playerRating.postHook },
          { label: "Post Fade", value: playerRating.postFade },
          { label: "Post Control", value: playerRating.postControl },
          { label: "Draw Foul", value: playerRating.drawFoul },
          { label: "Hands", value: playerRating.hands },
        ]}
      />
      <CategoryBox
        title="Playmaking"
        attributes={[
          { label: "Pass Accuracy", value: playerRating.passAccuracy },
          { label: "Ball Handle", value: playerRating.ballHandle },
          { label: "Speed with Ball", value: playerRating.speedWithBall },
          { label: "Pass IQ", value: playerRating.passIQ },
          { label: "Pass Vision", value: playerRating.passVision },
        ]}
      />
      <CategoryBox
        title="Defense"
        attributes={[
          { label: "Interior Defense", value: playerRating.interiorDefense },
          { label: "Perimeter Defense", value: playerRating.perimeterDefense },
          { label: "Steal", value: playerRating.steal },
          { label: "Block", value: playerRating.block },
          { label: "Help Defense IQ", value: playerRating.helpDefenseIQ },
          { label: "Pass Perception", value: playerRating.passPerception },
          {
            label: "Defensive Consistency",
            value: playerRating.defensiveConsistency,
          },
        ]}
      />
      <CategoryBox
        title="Rebounding"
        attributes={[
          { label: "Offensive Rebound", value: playerRating.offensiveRebound },
          { label: "Defensive Rebound", value: playerRating.defensiveRebound },
        ]}
      />
    </Grid>
  );
};

export default PlayerAttributes;
