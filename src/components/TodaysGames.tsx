import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useGameData from "../hooks/useGameData";
import { useEffect, useRef } from "react";
import GameSkeleton from "./skeletons/GameSkeleton";
import SliderControls from "./SliderControls";
import GameCard from "./GameCard";
import "/src/TodaysGame.css";
import { Link } from "react-router-dom";

const TodaysGames = () => {
  const { games, isLoading, error, refetch } = useGameData();
  const sliderRef = useRef<any>(null);

  const slidesToShow = 5;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1500, settings: { slidesToShow: 4 } },
      { breakpoint: 1100, settings: { slidesToShow: 3 } },
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

  // Refetch data on component mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Box
      background="#2a2a2a"
      p={4}
      borderRadius="md"
      overflow="hidden"
      border="1px solid #282828"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        direction={{ base: "column", md: "row" }}
      >
        <Flex alignItems="center" mb={{ base: 0, md: 0 }}>
          <Text
            fontSize={{ base: "18px", md: "2xl" }}
            fontWeight={500}
            color="#f8991d"
            mr={{ base: 0, md: 4 }}
          >
            Scoreboard
          </Text>
          {/* Only display SliderControls on md and larger screens */}
          <Flex display={{ base: "none", md: "flex" }}>
            <SliderControls
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
          </Flex>
        </Flex>
        <Button
          as={Link} // Add the Link component
          to="/scoreboard" // Link to scoreboard route
          rightIcon={<CalendarIcon />}
          variant="ghost"
          color="#f8991d"
          _hover={{ background: "transparent", color: "#f8991d" }}
          fontWeight={500}
          fontSize={14}
          mt={{ base: 0, md: 0 }}
        >
          View All Games
        </Button>
      </Flex>

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

      {/* Mobile controls below the slider */}
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
