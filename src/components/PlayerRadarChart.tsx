import { Box, Link, Image, Text } from "@chakra-ui/react"; // Import Chakra UI components
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
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin
import { rgba } from "polished"; // Import rgba from polished
import twoKlogo from "../assets/NBA-2K25-dark.svg";

// Register necessary chart components and the plugin
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartDataLabels // Register ChartDataLabels plugin
);

// Utility function to calculate the average of an array of numbers
const calculateAverage = (attributes: number[]) => {
  return Math.round(
    attributes.reduce((acc, curr) => acc + curr, 0) / attributes.length
  );
};

// Define the props interface
interface PlayerRadarChartProps {
  firstColor: string;
  playerRating: any; // Change type to any to access object fields dynamically
}

const PlayerRadarChart: React.FC<PlayerRadarChartProps> = ({
  firstColor,
  playerRating,
}) => {
  // Group the attributes into arrays
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
    playerRating.defensiveRebound,
  ];

  const athleticismAttributes = [
    playerRating.speed,
    playerRating.acceleration,
    playerRating.strength,
    playerRating.vertical,
    playerRating.stamina,
    playerRating.hustle,
    playerRating.overallDurability,
  ];

  const playmakingAttributes = [
    playerRating.passAccuracy,
    playerRating.ballHandle,
    playerRating.speedWithBall,
    playerRating.passIQ,
    playerRating.passVision,
  ];

  const defenseAttributes = [
    playerRating.interiorDefense,
    playerRating.perimeterDefense,
    playerRating.steal,
    playerRating.block,
    playerRating.helpDefenseIQ,
    playerRating.passPerception,
    playerRating.defensiveConsistency,
  ];

  // Use the utility function to calculate averages
  const insideScoringAverage = calculateAverage(insideScoringAttributes);
  const outsideScoringAverage = calculateAverage(outsideScoringAttributes);
  const reboundingAverage = calculateAverage(reboundingAttributes);
  const athleticismAverage = calculateAverage(athleticismAttributes);
  const playmakingAverage = calculateAverage(playmakingAttributes);
  const defenseAverage = calculateAverage(defenseAttributes);

  console.log(athleticismAttributes);

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
        label: playerRating.name,
        data: [
          playerRating.overallAttribute,
          insideScoringAverage,
          outsideScoringAverage,
          athleticismAverage,
          playmakingAverage,
          reboundingAverage,
          defenseAverage,
        ],
        backgroundColor: rgba(firstColor, 0.3),
        borderColor: firstColor,
        pointBackgroundColor: firstColor, // Background color for the points (dots)
        pointBorderColor: "#ffffff", // Border color for the points
        pointBorderWidth: 0, // Width of the border
        pointRadius: 16, // Increase size of points to make space for numbers
        pointHoverBorderColor: firstColor,
        pointHoverRadius: 10, // Size of the points on hover
        size: 24, // Optional: Adjust tick font size
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: "rgba(211, 211, 211, 0.5)", // Light gray for angle lines
        },
        grid: {
          color: "rgba(211, 211, 211, 0.5)", // Light gray for grid lines
        },
        pointLabels: {
          color: "#ffffff", // White labels for better visibility
          font: {
            size: 18, // Adjust label font size
          },
        },
        ticks: {
          display: false, // Hide the tick numbers
          backdropColor: "transparent", // Removes the tick label background
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
        enabled: true,
        displayColors: false, // Disable the color box in the tooltip
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.r}`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Customize tooltip background
        titleColor: "#ffffff", // Customize tooltip title color
        bodyColor: "#ffffff", // Customize tooltip body color
        titleFont: {
          size: 14, // Increase the title font size
        },
        bodyFont: {
          size: 14, // Increase the body text font size
        },
      },
      datalabels: {
        color: "#ffffff", // Color of the label text (numbers inside circles)
        backgroundColor: "#26262640", // Background color behind the number
        borderRadius: 50, // Circular background for the numbers
        padding: 5, // Space between the number and the circle
        borderColor: firstColor, // firstColor border around the circle
        borderWidth: 3, // Border width
        align: "center" as const, // Align the label to the center of the point
        anchor: "center" as const, // Position label inside the point
        font: {
          size: 11,
          weight: "bold" as const, // Ensure weight is properly typed
        },
        formatter: (value: number) => {
          return value.toFixed(0); // Formats value as an integer
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box
      as="section"
      padding="25px"
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
      {/* Heading above the Radar Chart */}
      <Box
        className="sidebar-link pb-0"
        display="flex"
        alignItems="center"
        textDecoration="none"
        mb={4} // Margin bottom for spacing between heading and chart
      >
        <Image
          className="ml-0"
          src={twoKlogo}
          height="auto"
          width="130px"
          alt="NBA 2K25 Missing Players"
          title="NBA 2K25 Missing Players"
        />
        <Text
          className="align-middle"
          ml={2}
          fontSize="3xl"
          color="white"
          fontWeight="bold"
        >
          ATTRIBUTES
        </Text>
      </Box>

      {/* Radar Chart */}
      <div style={{ width: "90%", height: "90%" }}>
        <Radar data={data} options={options} />
      </div>
    </Box>
  );
};

export default PlayerRadarChart;
