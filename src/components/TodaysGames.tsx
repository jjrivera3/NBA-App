import { Box, Text, Flex } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useGameData from "../hooks/useGameData";
import "/src/TodaysGame.css";
import { useRef } from "react";
import GameSkeleton from "./skeletons/GameSkeleton";
import SliderControls from "./SliderControls";
import GameCard from "./GameCard";

const TodaysGames = () => {
  const { games, isLoading, error } = useGameData();
  const sliderRef = useRef<any>(null);

  const slidesToShow = 5;

  const settings = {
    dots: false,
    infinite: true, // Enable looping
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1500, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <Box
      background="linear-gradient(180deg, #1a1a1d 0%, #2e2e2e 90%, #353535 100%);"
      p={4}
      borderRadius="md"
      overflow="hidden"
      border="1px solid #282828"
    >
      {/* Display the heading and controls */}
      <Flex
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems="center"
        mb={4}
      >
        <Text fontSize="2xl" fontWeight={500} color="white">
          Scoreboard
        </Text>
        {/* Slider Controls for Desktop */}
        <Flex display={{ base: "none", md: "flex" }}>
          <SliderControls
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        </Flex>
      </Flex>

      {/* Conditional Rendering for Game Content */}
      {isLoading ? (
        <Slider {...settings}>
          {Array(6)
            .fill("")
            .map((_, index) => (
              <GameSkeleton key={index} />
            ))}
        </Slider>
      ) : error ? (
        <Text color="red.500">
          Error loading games. Please try again later.
        </Text>
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {games
            .filter((game) => game.statusType !== "STATUS_CANCELED")
            .map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
        </Slider>
      )}

      {/* Slider Controls for Mobile */}
      <Flex
        justifyContent="center"
        mt={4}
        display={{ base: "flex", md: "none" }}
      >
        <SliderControls
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </Flex>
    </Box>
  );
};

export default TodaysGames;
