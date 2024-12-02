import { Box, Text } from "@chakra-ui/react";
import { Radar } from "react-chartjs-2";
import { rgba } from "polished";
import {
  calculateAthleticismAverage,
  calculateDefenseAverage,
  calculateInsideScoringAverage,
  calculateOutsideScoringAverage,
  calculateReboundingAverage,
} from "../utils/playerRatingUtils";

interface PlayerRadarChartProps {
  player1: any;
  player2: any;
}

const CompareRadarChart: React.FC<PlayerRadarChartProps> = ({
  player1,
  player2,
}) => {
  // Calculate averages for player 1
  const player1InsideScoring = calculateInsideScoringAverage(player1);
  const player1OutsideScoring = calculateOutsideScoringAverage(player1);
  const player1Rebounding = calculateReboundingAverage(player1);
  const player1Athleticism = calculateAthleticismAverage(player1);
  const player1Defense = calculateDefenseAverage(player1);

  // Calculate averages for player 2
  const player2InsideScoring = calculateInsideScoringAverage(player2);
  const player2OutsideScoring = calculateOutsideScoringAverage(player2);
  const player2Rebounding = calculateReboundingAverage(player2);
  const player2Athleticism = calculateAthleticismAverage(player2);
  const player2Defense = calculateDefenseAverage(player2);

  const data = {
    labels: [
      "Overall",
      "Inside Scoring",
      "Outside Scoring",
      "Athleticism",
      "Rebounding",
      "Defending",
    ],
    datasets: [
      {
        label: player1.name,
        data: [
          player1.overallAttribute,
          player1InsideScoring ?? 0,
          player1OutsideScoring ?? 0,
          player1Athleticism ?? 0,
          player1Rebounding ?? 0,
          player1Defense ?? 0,
        ],
        backgroundColor: rgba("#f8991d", 0.3),
        borderColor: "#f8991d", // Player 1 color
        pointBackgroundColor: "#f8991d", // Set point color
        pointBorderColor: "#f8991d", // Set border color for the points
        pointRadius: 6, // Adjust the point size (smaller than before to avoid overlap)
        pointHoverRadius: 8, // Adjust the hover size
      },
      {
        label: player2.name,
        data: [
          player2.overallAttribute,
          player2InsideScoring ?? 0,
          player2OutsideScoring ?? 0,
          player2Athleticism ?? 0,
          player2Rebounding ?? 0,
          player2Defense ?? 0,
        ],
        backgroundColor: rgba("#1d90f8", 0.3),
        borderColor: "#1d90f8", // Player 2 color
        pointBackgroundColor: "#1d90f8", // Set point color
        pointBorderColor: "#1d90f8", // Set border color for the points
        pointRadius: 6, // Adjust the point size (smaller than before to avoid overlap)
        pointHoverRadius: 8, // Adjust the hover size
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: "rgba(211, 211, 211, 0.5)" },
        grid: { color: "rgba(211, 211, 211, 0.5)" },
        pointLabels: {
          color: "#ffffff",
          font: { size: window.innerWidth <= 768 ? 8 : 18 },
          padding: window.innerWidth <= 768 ? 10 : 10,
        },
        ticks: { display: false, backdropColor: "transparent", stepSize: 20 },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: {
        enabled: true,
        displayColors: false,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
        callbacks: {
          label: (context: any) =>
            `${context.dataset.label}: ${context.parsed.r}`,
        },
      },
      // Remove datalabels to avoid numbers inside the points
      datalabels: {
        display: false, // Disable the datalabels to prevent overlapping numbers
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
      h={["50vh", "900px"]}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      background="#2a2a2a"
    >
      <Text
        fontSize={{ base: "xl", md: "3xl" }}
        color="white"
        fontWeight="bold"
        mb={4}
      >
        COMPARE PLAYER ATTRIBUTES
      </Text>

      {/* Radar Chart */}
      <Box width="100%" height="100%" minHeight="300px" position="relative">
        <Radar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default CompareRadarChart;
