import { Box, Image, Text } from "@chakra-ui/react"; // Import Chakra UI components
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin
import { rgba } from "polished"; // Import rgba from polished
import { Radar } from "react-chartjs-2";
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
    playerRating.agility,
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
        pointBackgroundColor: firstColor,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 0,
        pointRadius: window.innerWidth <= 768 ? 8 : 16,
        pointHoverBorderColor: firstColor,
        pointHoverRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow dynamic adjustment based on container
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
            size: window.innerWidth <= 768 ? 8 : 18, // Adjust label font size for mobile
          },
          padding: window.innerWidth <= 768 ? 16 : 10, // Adds space around the point labels
        },
        ticks: {
          display: false,
          backdropColor: "transparent",
          stepSize: 20,
        },
        suggestedMin: 0,
        suggestedMax: 100, // Limit the max value to 100
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.r}`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 14,
        },
      },
      datalabels: {
        color: "#ffffff",
        backgroundColor: "#26262640",
        borderRadius: 50,
        padding: window.innerWidth <= 768 ? 2 : 5,
        borderColor: firstColor,
        borderWidth: 3,
        align: "center" as const,
        anchor: "center" as const,
        font: {
          size: window.innerWidth <= 768 ? 8 : 11,
          weight: "bold" as const,
        },
        formatter: (value: number) => {
          return value.toFixed(0);
        },
      },
    },
  };

  return (
    <Box
      as="section"
      padding={{ base: "0px", lg: "25px" }}
      borderRadius="md"
      w={"full"}
      rounded={"md"}
      overflow={"hidden"}
      mt={0}
      h={["75vh", "700px"]} // Full viewport height on mobile for better scaling
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* Heading above the Radar Chart */}
      <Box
        className="sidebar-link pb-0"
        display="flex"
        alignItems="center"
        textDecoration="none"
        mb={4}
      >
        <Image
          className="ml-0"
          src={twoKlogo}
          height="auto"
          width={{ base: "100px", md: "130px" }}
          alt="NBA 2K25 Missing Players"
          title="NBA 2K25 Missing Players"
        />
        <Text
          className="align-middle"
          ml={2}
          fontSize={{ base: "xl", md: "3xl" }}
          color="white"
          fontWeight="bold"
        >
          ATTRIBUTES
        </Text>
      </Box>

      {/* Radar Chart */}
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <Radar data={data} options={options} />
      </div>
    </Box>
  );
};

export default PlayerRadarChart;
