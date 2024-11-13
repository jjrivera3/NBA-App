import { Box, Heading, VStack } from "@chakra-ui/react";
import { format, parse } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useTodaysGame from "../../hooks/useTodaysGame";
import DateNavigation from "./DateNavigation";
import GameEvents from "./GameEvents";

interface GameData {
  events: GameEvent[];
}

interface GameEvent {
  id: string;
  date: string;
  competitions: any[];
  selectedDate: string;
}

const Scoreboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dateParam } = useParams(); // Get date from URL
  const [selectedDate, setSelectedDate] = useState<Date>(
    dateParam
      ? parse(dateParam, "MM-dd-yy", new Date())
      : location.state?.selectedDate
      ? new Date(location.state.selectedDate)
      : new Date()
  );
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

  // Cast `data` to GameData
  const todayData = data as GameData | undefined;

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setShowCalendar(false);
      refetch();

      // Update URL with selected date
      navigate(`/scoreboard/${format(date, "MM-dd-yy")}`);
    }
  };

  // Update `selectedDate` if navigating back with a specific date in `location.state`
  useEffect(() => {
    if (location.state?.selectedDate) {
      setSelectedDate(new Date(location.state.selectedDate));
    }
  }, [location.state?.selectedDate]);

  const getTopPerformerDisplayValue = (team: any) => {
    const ratingLeader = team?.leaders?.find(
      (leader: { name: string }) => leader.name === "rating"
    );
    return ratingLeader?.leaders?.[0]?.displayValue || "No stats available";
  };

  return (
    <VStack spacing={6} p={{ base: 0, md: 4 }} align="left" width="100%">
      <Heading
        fontSize={{ base: "18px", md: "3xl" }}
        fontWeight={500}
        color="#f8991d"
        mr={{ base: 0, md: 4 }}
      >
        Scoreboard
      </Heading>
      <DateNavigation
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />

      {showCalendar && (
        <Box
          ref={calendarRef}
          position="absolute"
          zIndex={10}
          mt={6}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
        ></Box>
      )}

      <Heading as="h2" fontSize="18px" color="#f8991d" fontWeight={600}>
        {format(selectedDate, "MMMM d, yyyy")}
      </Heading>

      <GameEvents
        events={todayData?.events || []}
        isLoading={isLoading}
        error={error}
        getTopPerformerDisplayValue={getTopPerformerDisplayValue}
        selectedDate={format(selectedDate, "yyyy-MM-dd")}
      />
    </VStack>
  );
};

export default Scoreboard;
