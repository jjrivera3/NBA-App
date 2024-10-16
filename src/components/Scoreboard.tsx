import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { addDays, format, subDays } from "date-fns";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useTodaysGame from "../hooks/useTodaysGame";
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
        abbreviation: string;
        // Adding records to team
        records?: {
          name: string;
          abbreviation: string;
          type: string;
          summary: string;
        }[];
      };
      score: string;
      linescores?: { value: number }[];
      leaders?: {
        name: string;
        displayName: string;
        shortDisplayName: string;
        abbreviation: string;
        leaders: {
          displayValue: string;
          value: number;
          athlete: {
            headshot: string;
            shortName: string;
            position: {
              abbreviation: string;
            };
          };
        }[];
      }[];
    }[];
    status: {
      type: {
        name: string;
        shortDetail: string;
      };
    };
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
  const { data, isLoading, error, refetch } = useTodaysGame(todayDate, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    staleTime: 10 * 60 * 1000,
  });

  const todayData = data as GameData;

  console.log(todayData);

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
          {format(selectedDate, "MMMM d, yyyy")}
        </Heading>
        {isLoading && <Text color="white">Loading...</Text>}
        {error && <Text color="red.300">Error loading data</Text>}

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
                  borderRadius="md"
                  boxShadow="md"
                  alignItems="center"
                  background="linear-gradient(145deg, #464646, #3a3a3a, #333333)"
                >
                  {/* ScoreboardScoreCard on the left */}
                  <Box flex="1">
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
                        awayRecord: awayTeam?.records?.find(
                          (record) => record.type === "total"
                        )?.summary,
                        homeRecord: homeTeam?.records?.find(
                          (record) => record.type === "total"
                        )?.summary,
                      }}
                    />
                  </Box>

                  {/* Top Performers Section on the right */}
                  <Box flex="1" textAlign="left" ml={8} color="white">
                    <Text fontWeight="bold" mb={2}>
                      Top Performers
                    </Text>
                    <VStack align="flex-start" spacing={4}>
                      {/* Away Team Top Performer */}
                      {awayTeam?.leaders && awayTeam.leaders[0] && (
                        <Flex alignItems="center">
                          <Image
                            src={
                              awayTeam.leaders[0].leaders[0].athlete.headshot
                            }
                            alt={
                              awayTeam.leaders[0].leaders[0].athlete.shortName
                            }
                            boxSize="40px"
                            borderRadius="full"
                            objectFit="cover"
                            mr={3}
                          />
                          <Box>
                            <Text fontSize="md" fontWeight="600">
                              {awayTeam.leaders[0].leaders[0].athlete.shortName}
                              <Text
                                as="span"
                                fontSize="sm"
                                color="gray.400"
                                ml={2}
                              >
                                {
                                  awayTeam.leaders[0].leaders[0].athlete
                                    .position.abbreviation
                                }{" "}
                                - {awayTeam.team.abbreviation}
                              </Text>
                            </Text>
                            <Text fontSize="sm" color="gray.400">
                              {awayTeam.leaders[0].leaders[0].displayValue} PTS
                            </Text>
                          </Box>
                        </Flex>
                      )}

                      {/* Home Team Top Performer */}
                      {homeTeam?.leaders && homeTeam.leaders[0] && (
                        <Flex alignItems="center">
                          <Image
                            src={
                              homeTeam.leaders[0].leaders[0].athlete.headshot
                            }
                            alt={
                              homeTeam.leaders[0].leaders[0].athlete.shortName
                            }
                            boxSize="40px"
                            borderRadius="full"
                            objectFit="cover"
                            mr={3}
                          />
                          <Box>
                            <Text fontSize="md" fontWeight="600">
                              {homeTeam.leaders[0].leaders[0].athlete.shortName}
                              <Text
                                as="span"
                                fontSize="sm"
                                color="gray.400"
                                ml={2}
                              >
                                {
                                  homeTeam.leaders[0].leaders[0].athlete
                                    .position.abbreviation
                                }{" "}
                                - {homeTeam.team.abbreviation}
                              </Text>
                            </Text>
                            <Text fontSize="sm" color="gray.400">
                              {homeTeam.leaders[0].leaders[0].displayValue} PTS
                            </Text>
                          </Box>
                        </Flex>
                      )}
                    </VStack>
                  </Box>
                </Flex>
              );
            })
          : !isLoading &&
            !error && (
              <Text color="white" fontSize="lg" textAlign="center">
                No Games
              </Text>
            )}
      </Box>
    </VStack>
  );
};

export default Scoreboard;
