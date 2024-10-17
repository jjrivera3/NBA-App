import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { addDays, format, subDays } from "date-fns";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useTodaysGame from "../hooks/useTodaysGame";
import ScoreboardScoreCard from "./ScoreboardScoreCard";
import TopPerformers from "./TopPerformers";

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
        records:
          | {
              name: string;
              abbreviation: string;
              type: string;
              summary: string;
            }[]
          | undefined;
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

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setShowCalendar(false);
      refetch();
    }
  };

  const getTopPerformerDisplayValue = (team: any) => {
    const ratingLeader = team?.leaders?.find(
      (leader: { name: string }) => leader.name === "rating"
    );
    return ratingLeader?.leaders?.[0]?.displayValue || "No stats available";
  };

  return (
    <VStack spacing={6} p={4} align="left" width="100%">
      {/* Date Navigation with Full-Width Background and Header */}
      <Box width="100%" bg="#333" p={4} borderRadius="md" mb={4}>
        <Heading as="h1" size="lg" color="white" mb={3} textAlign="left">
          NBA Scoreboard
        </Heading>
        <Flex alignItems="center" justifyContent="center" width="100%">
          <Button
            onClick={() => setSelectedDate(subDays(selectedDate, 1))}
            variant="ghost"
            color="gray.300"
          >
            <FaChevronLeft size={20} />
          </Button>
          <Flex justifyContent="space-around" alignItems="center" width="100%">
            {Array.from({ length: 7 }, (_, index) => (
              <Box
                key={index}
                textAlign="center"
                flex="1"
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
                onClick={() =>
                  handleDateChange(addDays(selectedDate, index - 3))
                }
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
          <Divider orientation="vertical" mx={2} height="24px" />
          <IconButton
            aria-label="Calendar"
            icon={<FaCalendarAlt />}
            variant="ghost"
            color="white"
            onClick={() => setShowCalendar(!showCalendar)}
          />
        </Flex>
      </Box>

      {/* Calendar */}
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

      {/* Game Events */}
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
                  <Box flex="2">
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
                        //@ts-ignore
                        awayRecord: awayTeam?.records?.find(
                          (record: { type: string }) => record.type === "total"
                        )?.summary,
                        //@ts-ignore
                        homeRecord: homeTeam?.records?.find(
                          (record: { type: string }) => record.type === "total"
                        )?.summary,
                      }}
                    />
                  </Box>

                  <TopPerformers
                    awayTeam={{
                      ...awayTeam?.team,
                      leaders: awayTeam?.leaders,
                    }}
                    homeTeam={{
                      ...homeTeam?.team,
                      leaders: homeTeam?.leaders,
                    }}
                    getTopPerformerDisplayValue={getTopPerformerDisplayValue}
                  />
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
