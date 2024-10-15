import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  VStack,
  Text,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, subDays } from "date-fns";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import useTodaysGame from "../hooks/useTodaysGame";
import "/src/CustomDatePicker.css";
import ScoreboardScoreCard from "./ScoreboardScoreCard";

interface GameEvent {
  id: string;
  date: string;
  competitions: {
    id: string;
    competitors: {
      homeAway: string;
      team: {
        displayName: string;
        color: string;
        logo: string;
      };
      score: string;
      linescores?: { value: number }[];
    }[];
    status: {
      type: {
        name: string;
        shortDetail: string;
      };
    };
    odds?: {
      details: string;
      overUnder: string;
    } | null;
  }[];
}

interface GameData {
  events: GameEvent[];
}

const Scoreboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const year = selectedDate.getFullYear().toString();
  const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = selectedDate.getDate().toString().padStart(2, "0");

  const todayDate = { year, month, day, limit: "0" };

  const {
    data,
    isLoading: todayLoading,
    error: todayError,
    refetch,
  } = useTodaysGame(todayDate, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    staleTime: 10 * 60 * 1000,
  });

  const todayData = data as GameData;

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setShowCalendar(false);
      refetch();
    }
  };

  return (
    <VStack spacing={5} p={5} align="center" width="100%">
      <Heading as="h1" size="lg" color="white">
        NBA Scoreboard
      </Heading>

      <Flex alignItems="center" justifyContent="center" width="100%">
        <Button
          onClick={() => setSelectedDate(subDays(selectedDate, 1))}
          variant="ghost"
          size="lg"
        >
          <FaChevronLeft size={20} />
        </Button>

        <Flex
          justifyContent="space-around"
          alignItems="center"
          width="100%"
          maxW="746px"
          overflow="hidden"
        >
          {Array.from({ length: 7 }, (_, index) => (
            <Box
              key={index}
              textAlign="center"
              px={2}
              py={1}
              cursor="pointer"
              onClick={() => handleDateChange(addDays(selectedDate, index - 3))}
              borderRadius="md"
              bg={
                selectedDate.toDateString() ===
                addDays(selectedDate, index - 3).toDateString()
                  ? "#f8991d"
                  : "transparent"
              }
              color={
                selectedDate.toDateString() ===
                addDays(selectedDate, index - 3).toDateString()
                  ? "black"
                  : "gray.300"
              }
              _hover={{ bg: "#f8991d", color: "black" }}
            >
              <Text fontSize="sm">
                {format(addDays(selectedDate, index - 3), "EEE")}
              </Text>
              <Text fontSize="sm" fontWeight="bold">
                {format(addDays(selectedDate, index - 3), "MMM d")}
              </Text>
            </Box>
          ))}
        </Flex>

        <Button
          onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          variant="ghost"
          size="lg"
        >
          <FaChevronRight size={20} />
        </Button>

        <IconButton
          aria-label="Calendar"
          icon={<FaCalendarAlt />}
          variant="ghost"
          color="white"
          onClick={() => setShowCalendar(!showCalendar)}
          ml={4}
        />
      </Flex>

      {showCalendar && (
        <Box
          ref={calendarRef}
          position="absolute"
          zIndex={10}
          mt={2}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
        >
          <DatePicker
            selected={selectedDate}
            onChange={(date) => handleDateChange(date as Date | null)}
            inline
          />
        </Box>
      )}

      <Box width="100%" mt={4} p={4} bg="gray.800" borderRadius="md">
        <Heading as="h2" size="md" mb={4} color="white">
          Games on {format(selectedDate, "MMMM d, yyyy")}
        </Heading>
        {todayLoading && <Text color="white">Loading...</Text>}
        {todayError && <Text color="red.300">Error loading data</Text>}

        {todayData?.events && todayData.events.length > 0
          ? todayData.events.map((event) => {
              const competition = event.competitions[0];
              const homeTeam = competition.competitors.find(
                (team) => team.homeAway === "home"
              );
              const awayTeam = competition.competitors.find(
                (team) => team.homeAway === "away"
              );

              return (
                <Flex
                  key={competition.id}
                  mb={5}
                  width="100%"
                  mx="auto"
                  p={4}
                  bg="gray.700"
                  borderRadius="md"
                  boxShadow="md"
                >
                  <Box width="60%" pr={4}>
                    <ScoreboardScoreCard
                      game={{
                        gameID: competition.id,
                        awayTeamColor: awayTeam?.team.color ?? "#000000",
                        homeTeamColor: homeTeam?.team.color ?? "#000000",
                        awayLogo: awayTeam?.team.logo ?? "",
                        homeLogo: homeTeam?.team.logo ?? "",
                        awayTeam: awayTeam?.team.displayName ?? "Unknown Team",
                        homeTeam: homeTeam?.team.displayName ?? "Unknown Team",
                        awayScore: awayTeam?.score ?? "0",
                        homeScore: homeTeam?.score ?? "0",
                        statusType:
                          competition.status.type.name ?? "Unknown Status",
                        shortDetail: competition.status.type.shortDetail ?? "",
                        awayLinescores: awayTeam?.linescores?.map(
                          (score) => score.value
                        ) || [0, 0, 0, 0],
                        homeLinescores: homeTeam?.linescores?.map(
                          (score) => score.value
                        ) || [0, 0, 0, 0],
                      }}
                    />
                  </Box>

                  <Divider orientation="vertical" borderColor="gray.500" />

                  <Box width="40%" pl={4} color="white">
                    <Text fontWeight="bold" mb={1} textAlign="center">
                      Game Leaders
                    </Text>
                    <VStack spacing={3} align="center">
                      <Box>
                        <Text fontWeight="bold">Player 1</Text>
                        <Text>Points: 25</Text>
                        <Text>Rebounds: 10</Text>
                        <Text>Assists: 5</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Player 2</Text>
                        <Text>Points: 30</Text>
                        <Text>Rebounds: 8</Text>
                        <Text>Assists: 7</Text>
                      </Box>
                    </VStack>
                  </Box>
                </Flex>
              );
            })
          : !todayLoading &&
            !todayError && (
              <Text color="white" fontSize="lg" textAlign="center">
                No Games
              </Text>
            )}
      </Box>
    </VStack>
  );
};

export default Scoreboard;
