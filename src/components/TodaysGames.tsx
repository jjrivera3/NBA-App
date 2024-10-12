import { Box, Text } from "@chakra-ui/react";
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

  const slidesToShow = 6;
  const totalSlides = games.length;

  const settings = {
    dots: false,
    infinite: true, // Enable looping
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index: number) => {
      if (index === totalSlides - 1) {
        setTimeout(() => sliderRef.current?.slickGoTo(0), 300);
      }
    },
    responsive: [
      { breakpoint: 1500, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    const currentIndex = sliderRef.current.innerSlider.state.currentSlide;
    if (currentIndex >= totalSlides - slidesToShow) {
      sliderRef.current?.slickGoTo(0);
    } else {
      sliderRef.current?.slickNext();
    }
  };

  if (isLoading) {
    return (
      <Box
        background="linear-gradient(180deg, #1a1a1d 0%, #2e2e2e 90%, #353535 100%);"
        p={5}
        borderRadius="md"
        overflow="hidden"
        border="1px solid #282828"
      >
        <SliderControls
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
        <Slider {...settings}>
          {Array(6)
            .fill("")
            .map((_, index) => (
              <GameSkeleton key={index} />
            ))}
        </Slider>
      </Box>
    );
  }

  if (error) {
    return (
      <Text color="red.500">Error loading games. Please try again later.</Text>
    );
  }

  return (
    <Box
      background="linear-gradient(180deg, #1a1a1d 0%, #2e2e2e 90%, #353535 100%);"
      p={5}
      borderRadius="md"
      overflow="hidden"
      border="1px solid #282828"
    >
      <SliderControls handlePrevious={handlePrevious} handleNext={handleNext} />
      <Slider ref={sliderRef} {...settings}>
        {games
          .filter((game) => game.statusType !== "STATUS_CANCELED")
          .map((game, index) => (
            <GameCard key={index} game={game} />
          ))}
      </Slider>
    </Box>
  );
};

export default TodaysGames;
