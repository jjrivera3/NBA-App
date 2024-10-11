import { Box, Flex, IconButton, Text, VStack, Image } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useGameData from "../hooks/useGameData";
import "/src/TodaysGame.css";
import { useRef } from "react";
import GameSkeleton from "./skeletons/GameSkeleton";

const TodaysGames = () => {
  const { games, isLoading, error } = useGameData();
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
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

  if (isLoading) {
    return (
      <Box
        background="linear-gradient(180deg, #1a1a1d 0%, #2e2e2e 90%, #353535 100%);"
        p={5}
        borderRadius="md"
        overflow="hidden"
        border="1px solid #282828"
      >
        <Flex alignItems="center" mb={5}>
          <Text fontSize="2xl" fontWeight="bold" color="white" mr={4}>
            Todays Games
          </Text>
          <IconButton
            aria-label="Previous"
            icon={<ChevronLeftIcon boxSize={5} />}
            onClick={handlePrevious}
            color="#f8991d"
            variant="ghost"
            size="sm"
            mr={2}
            borderRadius="10px"
            background="linear-gradient(135deg, #44464b, #6b6b6b)"
            _hover={{ backgroundColor: "rgba(80, 80, 80, 0.7)" }}
          />
          <IconButton
            aria-label="Next"
            icon={<ChevronRightIcon boxSize={5} />}
            onClick={handleNext}
            color="#f8991d"
            variant="ghost"
            size="sm"
            borderRadius="10px"
            background="linear-gradient(135deg, #44464b, #6b6b6b)"
            _hover={{ backgroundColor: "rgba(80, 80, 80, 0.7)" }}
          />
        </Flex>

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
      <Flex alignItems="center" mb={5}>
        <Text fontSize="2xl" fontWeight="bold" color="white" mr={4}>
          Todays Games
        </Text>
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon boxSize={5} />}
          onClick={handlePrevious}
          color="#f8991d"
          variant="ghost"
          size="sm"
          mr={2}
          borderRadius="10px"
          background="linear-gradient(135deg, #44464b, #6b6b6b)"
          _hover={{ backgroundColor: "rgba(80, 80, 80, 0.7)" }}
        />
        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon boxSize={5} />}
          onClick={handleNext}
          color="#f8991d"
          variant="ghost"
          size="sm"
          borderRadius="10px"
          background="linear-gradient(135deg, #44464b, #6b6b6b)"
          _hover={{ backgroundColor: "rgba(80, 80, 80, 0.7)" }}
        />
      </Flex>

      <Slider ref={sliderRef} {...settings}>
        {games.map((game, index) => (
          <Box
            key={index}
            borderRadius="md"
            color="white"
            border="1px solid #444444"
            position="relative"
            background="#292929"
          >
            <Flex
              height="6px"
              borderTopRadius="md"
              overflow="hidden"
              position="relative"
            >
              <Box
                flex="1"
                backgroundColor={game.awayTeamColor}
                position="relative"
                _after={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: "-8px",
                  width: "16px",
                  height: "100%",
                  background: `linear-gradient(135deg, ${game.awayTeamColor} 50%, ${game.homeTeamColor} 50%)`,
                }}
              />
              <Box flex="1" backgroundColor={game.homeTeamColor}></Box>
            </Flex>

            <Box p={3} mt={3} background="#292929">
              <Flex alignItems="center" justifyContent="space-between">
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
                {game.statusType === "STATUS_FINAL" ? (
                  <Text fontSize="md" fontWeight={500} color="gray.300">
                    {game.awayScore} - {game.homeScore}
                  </Text>
                ) : (
                  <Text fontSize="md" fontWeight={500} color="gray.300">
                    vs
                  </Text>
                )}
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
              <Box position="absolute" top="15px" left="5px">
                <Text fontSize="11px" color="gray.400" fontWeight={500}>
                  {game.statusType === "STATUS_FINAL"
                    ? `Final ${game.gameDateFormatted}`
                    : game.time}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TodaysGames;
