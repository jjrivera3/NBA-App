import { Box } from "@chakra-ui/react";
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
          player1.overallAttribute, // You might want to get overall attribute from a rating or modify accordingly
          player1InsideScoring ?? 0, // Use 0 if no value is available
          player1OutsideScoring ?? 0,
          player1Athleticism ?? 0,
          player1Rebounding ?? 0,
          player1Defense ?? 0,
        ],
        backgroundColor: rgba("#f8991d", 0.3),
        borderColor: "#f8991d",
        pointBackgroundColor: "#f8991d",
      },
      {
        label: player2.name,
        data: [
          player2.overallAttribute, // Similarly, modify this according to player2's overall rating
          player2InsideScoring ?? 0,
          player2OutsideScoring ?? 0,
          player2Athleticism ?? 0,
          player2Rebounding ?? 0,
          player2Defense ?? 0,
        ],
        backgroundColor: rgba("#1d90f8", 0.3),
        borderColor: "#1d90f8",
        pointBackgroundColor: "#1d90f8",
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
        ticks: { display: false, backdropColor: "transparent" },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  return (
    <Box width="100%" height="400px">
      <Radar data={data} options={options} />
    </Box>
  );
};

export default CompareRadarChart;
