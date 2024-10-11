import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import Slider from "react-slick";

// Sample game data for 10 games
const games = [
  {
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    time: "7:00 PM",
    homeLogo: "https://via.placeholder.com/50",
    awayLogo: "https://via.placeholder.com/50",
  },
  {
    homeTeam: "Heat",
    awayTeam: "Celtics",
    time: "7:30 PM",
    homeLogo: "https://via.placeholder.com/50",
    awayLogo: "https://via.placeholder.com/50",
  },
  {
    homeTeam: "Nets",
    awayTeam: "76ers",
    time: "8:00 PM",
    homeLogo: "https://via.placeholder.com/50",
    awayLogo: "https://via.placeholder.com/50",
  },
  {
    homeTeam: "Knicks",
    awayTeam: "Bulls",
    time: "8:30 PM",
    homeLogo: "https://via.placeholder.com/50",
    awayLogo: "https://via.placeholder.com/50",
  },
  {
    homeTeam: "Spurs",
    awayTeam: "Mavericks",
    time: "9:00 PM",
    homeLogo: "https://via.placeholder.com/50",
    awayLogo: "https://via.placeholder.com/50",
  },
  {
    homeTeam: "Suns",
    awayTeam: "Nuggets",
    time: "9:30 PM",
    homeLogo: "https://via.placeholder.com/50",
    awayLogo: "https://via.placeholder.com/50",
  },
  {
    homeTeam: "Clippers",
    awayTeam: "Kings",
    time: "10:00 PM",
    homeLogo: "https://via.placeholder.com/50",
    awayLogo: "https://via.placeholder.com/50",
  },
  {
    homeTeam: "Raptors",
    awayTeam: "Wizards",
    time: "7:00 PM",
    homeLogo: "https://via.placeholder.com/50",
    awayLogo: "https://via.placeholder.com/50",
  },
  {
    homeTeam: "Pacers",
    awayTeam: "Magic",
    time: "7:30 PM",
    homeLogo: "https://via.placeholder.com/50",
    awayLogo: "https://via.placeholder.com/50",
  },
  {
    homeTeam: "Pistons",
    awayTeam: "Cavaliers",
    time: "8:00 PM",
    homeLogo: "https://via.placeholder.com/50",
    awayLogo: "https://via.placeholder.com/50",
  },
];

const TodaysGames = () => {
  const settings = {
    dots: true,
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

  return (
    <Box bg="#292a2d" p={5} borderRadius="md" overflow="hidden">
      <Text fontSize="2xl" fontWeight="bold" color="white" mb={5}>
        Today’s Games
      </Text>
      <Slider {...settings}>
        {games.map((game, index) => (
          <Box key={index} p={3} bg="gray.700" borderRadius="md" color="white">
            <VStack spacing={2}>
              <Flex justifyContent="center" alignItems="center" gap={2}>
                <Image
                  src={game.awayLogo}
                  alt={`${game.awayTeam} logo`}
                  boxSize="50px"
                />
                <Text fontSize="lg" fontWeight="bold">
                  {game.awayTeam}
                </Text>
              </Flex>
              <Text fontSize="sm" color="gray.300">
                {game.time}
              </Text>
              <Flex justifyContent="center" alignItems="center" gap={2}>
                <Text fontSize="lg" fontWeight="bold">
                  {game.homeTeam}
                </Text>
                <Image
                  src={game.homeLogo}
                  alt={`${game.homeTeam} logo`}
                  boxSize="50px"
                />
              </Flex>
            </VStack>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TodaysGames;
