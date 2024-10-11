import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useTodaysGame from "../hooks/useTodaysGame";
import { useEffect } from "react";

// Define the structure of the expected data type
interface GameData {
  events: {
    competitions?: {
      date: string;
      competitors: {
        homeAway: string;
        team: {
          abbreviation: string;
          logo: string;
        };
        score?: string;
      }[];
    }[];
    status: {
      type: {
        name: string;
      };
    };
  }[];
}

const TodaysGames = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Get today's date
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  // Get yesterday's date
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const yestYear = yesterday.getFullYear().toString();
  const yestMonth = (yesterday.getMonth() + 1).toString().padStart(2, "0");
  const yestDay = yesterday.getDate().toString().padStart(2, "0");

  // Fetch today's games
  const {
    data: todayData,
    isLoading: todayLoading,
    error: todayError,
  } = useTodaysGame({
    year,
    month,
    day,
    limit: "0",
  });

  // Fetch yesterday's games
  const {
    data: yestData,
    isLoading: yestLoading,
    error: yestError,
  } = useTodaysGame({
    year: yestYear,
    month: yestMonth,
    day: yestDay,
    limit: "0",
  });

  useEffect(() => {
    console.log("Today's Games Data:", todayData);
    console.log("Yesterday's Games Data:", yestData);
    if (todayError) {
      console.error("Error fetching today's games:", todayError);
    }
    if (yestError) {
      console.error("Error fetching yesterday's games:", yestError);
    }
  }, [todayData, yestData, todayError, yestError]);

  if (todayLoading || yestLoading) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (todayError || yestError) {
    return (
      <Box>
        <Text color="red.500">
          Error loading games. Please try again later.
        </Text>
      </Box>
    );
  }

  // Combine today’s and yesterday’s games
  const games = [
    ...((todayData as GameData)?.events || []),
    ...((yestData as GameData)?.events || []),
  ].map((game) => {
    const competition = game.competitions?.[0];
    const homeTeam = competition?.competitors.find(
      (comp) => comp.homeAway === "home"
    )?.team;
    const awayTeam = competition?.competitors.find(
      (comp) => comp.homeAway === "away"
    )?.team;

    const homeScore = competition?.competitors.find(
      (comp) => comp.homeAway === "home"
    )?.score;
    const awayScore = competition?.competitors.find(
      (comp) => comp.homeAway === "away"
    )?.score;

    const statusType = game.status.type.name;
    const gameDate = competition ? new Date(competition.date) : new Date();
    const gameDateFormatted = `${
      gameDate.getMonth() + 1
    }/${gameDate.getDate()}`;

    return {
      homeTeam: homeTeam?.abbreviation || "",
      awayTeam: awayTeam?.abbreviation || "",
      time: gameDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      homeLogo: homeTeam?.logo || "",
      awayLogo: awayTeam?.logo || "",
      statusType,
      homeScore: statusType === "STATUS_FINAL" ? homeScore : null,
      awayScore: statusType === "STATUS_FINAL" ? awayScore : null,
      gameDateFormatted,
    };
  });

  return (
    <Box
      background="linear-gradient(180deg, #1a1a1d 0%, #2e2e2e 90%, #353535 100%);"
      p={5}
      borderRadius="md"
      overflow="hidden"
    >
      <style>
        {`
          .slick-slide.slick-active {
            padding-left: 15px;
            padding-right: 10px;
          }
        `}
      </style>
      <Text fontSize="2xl" fontWeight="bold" color="white" mb={5}>
        Todays Games
      </Text>
      <Slider {...settings}>
        {games.map((game, index) => (
          <Box
            key={index}
            p={3}
            borderRadius="md"
            color="white"
            border="1px solid #444444"
            position="relative"
          >
            <Flex alignItems="center" justifyContent="space-between" mt={2}>
              {/* Away Team */}
              <VStack spacing={1} align="center" mt="4px">
                <Image
                  src={game.awayLogo}
                  alt={`${game.awayTeam} logo`}
                  boxSize="25px"
                  mt="10px"
                />
                <Text fontSize="13px" fontWeight={600} mt={1}>
                  {game.awayTeam}
                </Text>
              </VStack>

              {/* Game Time or Final Score */}
              {game.statusType === "STATUS_FINAL" ? (
                <Text fontSize="md" fontWeight={500} color="gray.300">
                  {game.awayScore} - {game.homeScore}
                </Text>
              ) : (
                <Text fontSize="md" fontWeight={500} color="gray.300">
                  vs
                </Text>
              )}

              {/* Home Team */}
              <VStack spacing={1} align="center" mt="4px">
                <Image
                  src={game.homeLogo}
                  alt={`${game.homeTeam} logo`}
                  boxSize="25px"
                  mt="10px"
                />
                <Text fontSize="13px" fontWeight={600} mt={1}>
                  {game.homeTeam}
                </Text>
              </VStack>
            </Flex>

            {/* Time Display or "Final" with Date Label for Completed Games */}
            <Box position="absolute" top="5px" left="5px">
              <Text fontSize="11px" color="gray.400" fontWeight={500}>
                {game.statusType === "STATUS_FINAL"
                  ? `Final ${game.gameDateFormatted}`
                  : game.time}
              </Text>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TodaysGames;
