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
  Image,
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
    <VStack spacing={6} p={6} align="center" width="100%" bg="#2a2a2a">
      <Heading as="h1" size="lg" color="white">
        NBA Scoreboard
      </Heading>

      <Flex alignItems="center" justifyContent="center" width="100%" mb={4}>
        <Button
          onClick={() => setSelectedDate(subDays(selectedDate, 1))}
          variant="ghost"
          color="gray.300"
        >
          <FaChevronLeft size={20} />
        </Button>

        <Flex
          justifyContent="space-around"
          alignItems="center"
          width="100%"
          maxW="746px"
        >
          {Array.from({ length: 7 }, (_, index) => (
            <Box
              key={index}
              textAlign="center"
              px={3}
              py={2}
              cursor="pointer"
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
              onClick={() => handleDateChange(addDays(selectedDate, index - 3))}
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
          color="gray.300"
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

      <Box width="100%" mt={4} borderRadius="md">
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
                  p={5}
                  borderRadius="md"
                  boxShadow="md"
                  alignItems="center"
                  background="linear-gradient(145deg, #464646, #3a3a3a, #333333)"
                >
                  <Box width="70%" pr={4}>
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

                  {/* Top Performers Section */}
                  <Box width="40%" pl={4} color="white">
                    <Text fontWeight="bold" mb={1} textAlign="center">
                      Top Performers
                    </Text>
                    <VStack spacing={4} align="center">
                      <Flex align="center">
                        <Image
                          src="https://a.espncdn.com/i/headshots/nba/players/full/4065648.png"
                          alt="J. Tatum"
                          boxSize="40px"
                          borderRadius="full"
                          mr={3}
                        />
                        <Box textAlign="left">
                          <Text fontSize="md" fontWeight="600">
                            J. Tatum
                            <Text
                              as="span"
                              fontSize="sm"
                              color="gray.400"
                              ml={2}
                            >
                              SF - BOS
                            </Text>
                          </Text>
                          <Text fontSize="sm" color="gray.400">
                            10 PTS
                          </Text>
                        </Box>
                      </Flex>
                      <Flex align="center">
                        <Image
                          src="https://a.espncdn.com/i/headshots/nba/players/full/4433134.png"
                          alt="S. Barnes"
                          boxSize="40px"
                          borderRadius="full"
                          mr={3}
                        />
                        <Box textAlign="left">
                          <Text fontSize="md" fontWeight="600">
                            S. Barnes
                            <Text
                              as="span"
                              fontSize="sm"
                              color="gray.400"
                              ml={2}
                            >
                              SF - TOR
                            </Text>
                          </Text>
                          <Text fontSize="sm" color="gray.400">
                            17 PTS, 6 REB
                          </Text>
                        </Box>
                      </Flex>
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
