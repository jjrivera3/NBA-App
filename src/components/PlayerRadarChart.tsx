import { Box } from "@chakra-ui/react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { rgba } from "polished"; // Import rgba from polished

// Register necessary chart components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Define the props interface
interface PlayerRadarChartProps {
  firstColor: string;
  playerRating: any; // Change type to any to access object fields dynamically
}

const PlayerRadarChart: React.FC<PlayerRadarChartProps> = ({
  firstColor,
  playerRating,
}) => {
  // Calculate the average of inside scoring attributes
  const insideScoringAttributes = [
    playerRating.layup,
    playerRating.standingDunk,
    playerRating.drivingDunk,
    playerRating.postHook,
    playerRating.postFade,
    playerRating.postControl,
    playerRating.drawFoul,
    playerRating.hands,
  ];

  const outsideScoringAttributes = [
    playerRating.closeShot,
    playerRating.midRangeShot,
    playerRating.threePointShot,
    playerRating.freeThrow,
    playerRating.shotIQ,
    playerRating.offensiveConsistency,
  ];

  const reboundingAttributes = [
    playerRating.offensiveRebound,
    playerRating.defensiveRebound, // Fixed typo here
  ];

  const athleticismAttributes = [
    playerRating.speed, // Speed
    playerRating.acceleration, // Acceleration (part of agility)
    playerRating.strength, // Strength
    playerRating.vertical, // Vertical
    playerRating.stamina, // Stamina
    playerRating.hustle, // Hustle
    playerRating.overallDurability, // Overall Durability
  ];

  const playmakingAttributes = [
    playerRating.passAccuracy, // Pass Accuracy
    playerRating.ballHandle, // Ball Handle
    playerRating.speedWithBall, // Speed with Ball
    playerRating.passIQ, // Pass IQ
    playerRating.passVision, // Pass Vision
  ];

  const defenseAttributes = [
    playerRating.interiorDefense, // Interior Defense
    playerRating.perimeterDefense, // Perimeter Defense
    playerRating.steal, // Steal
    playerRating.block, // Block
    playerRating.helpDefenseIQ, // Help Defense IQ
    playerRating.passPerception, // Pass Perception
    playerRating.defensiveConsistency, // Defensive Consistency
  ];

  // Calculate the rounded average for defense
  const defenseAverage = Math.round(
    defenseAttributes.reduce((acc, curr) => acc + curr, 0) /
      defenseAttributes.length
  );

  // Calculate the rounded average for playmaking
  const playmakingAverage = Math.round(
    playmakingAttributes.reduce((acc, curr) => acc + curr, 0) /
      playmakingAttributes.length
  );

  // Calculate the rounded average for athleticism
  const athleticismAverage = Math.round(
    athleticismAttributes.reduce((acc, curr) => acc + curr, 0) /
      athleticismAttributes.length
  );

  // Calculate the rounded average for inside scoring
  const insideScoringAverage = Math.round(
    insideScoringAttributes.reduce((acc, curr) => acc + curr, 0) /
      insideScoringAttributes.length
  );

  // Calculate the rounded average for inside scoring
  const oustideScoringAverage = Math.round(
    outsideScoringAttributes.reduce((acc, curr) => acc + curr, 0) /
      outsideScoringAttributes.length
  );

  // Calculate the rounded average for rebounding
  const reboundingAverage = Math.round(
    reboundingAttributes.reduce((acc, curr) => acc + curr, 0) /
      reboundingAttributes.length
  );

  console.log("Outside Scoring Average: ", oustideScoringAverage);
  console.log("Athleticism Average: ", athleticismAverage);
  console.log("Playmaking Average: ", playmakingAverage);
  console.log("Rebounding Average: ", reboundingAverage);
  console.log("Defense Average: ", defenseAverage);

  const data = {
    labels: [
      "Overall",
      "Inside Scoring",
      "Outside Scoring",
      "Athleticism",
      "Playmaking",
      "Rebounding",
      "Defending",
    ],
    datasets: [
      {
        label: "Player A",
        data: [
          playerRating.overallAttribute,
          insideScoringAverage,
          oustideScoringAverage,
          athleticismAverage,
          playmakingAverage,
          reboundingAverage,
          defenseAverage,
        ],
        backgroundColor: rgba(firstColor, 0.3),
        borderColor: firstColor,
        pointBackgroundColor: rgba(firstColor, 0.5), // Set opacity to 50%
        pointBorderColor: firstColor, // Optional: Set border color for better visibility
        pointHoverBackgroundColor: rgba(firstColor, 0.7), // Optional: Slightly higher opacity on hover
        pointHoverBorderColor: "#ffffff", // Optional: Border color on hover
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: "rgba(211, 211, 211, 0.8)", // Light gray for angle lines
        },
        grid: {
          color: "rgba(211, 211, 211, 0.8)", // Light gray for grid lines
        },
        pointLabels: {
          color: "#ffffff", // White labels for better visibility
          font: {
            size: 18, // Optional: Adjust label font size
          },
        },
        ticks: {
          backdropColor: "transparent", // Removes the tick label background
          color: "#ffffff", // White ticks for better visibility
          font: {
            size: 12, // Optional: Adjust tick font size
          },
          stepSize: 20, // Optional: Define step size if needed
        },
        suggestedMin: 0,
        suggestedMax: 100, // Limit the max value to 100
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Optional: Enable tooltips
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.r}`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Optional: Customize tooltip background
        titleColor: "#ffffff", // Optional: Customize tooltip title color
        bodyColor: "#ffffff", // Optional: Customize tooltip body color
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Allow chart to resize based on container
  };

  return (
    <Box
      as="section"
      padding="10px"
      borderRadius="md"
      w={"full"}
      bg="#26262640"
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
      border="1px solid #000"
      mt={5}
      h={["600px", "700px"]} // Increased height for the chart container
      display="flex"
      flexDirection="column" // To stack the chart and the average value vertically
      justifyContent="center"
      alignItems="center"
    >
      <div style={{ width: "90%", height: "90%" }}>
        {/* Radar Chart */}
        <Radar data={data} options={options} />
      </div>
    </Box>
  );
};

export default PlayerRadarChart;
