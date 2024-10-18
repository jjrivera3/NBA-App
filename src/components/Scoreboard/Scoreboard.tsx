import { VStack, Box, Heading } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { format } from "date-fns"; // Add this import
import useTodaysGame from "../../hooks/useTodaysGame";
import DateNavigation from "./DateNavigation";
import GameEvents from "./GameEvents";

// Define the interface for GameData
interface GameData {
  events: GameEvent[];
}

interface GameEvent {
  id: string;
  date: string;
  competitions: any[]; // Add details to your GameEvent structure here
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

  console.log(data);

  // Explicitly cast `data` to GameData
  const todayData = data as GameData | undefined;

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
      <DateNavigation
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        toggleCalendar={() => setShowCalendar(!showCalendar)}
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
        >
          {/* Date Picker Component Logic */}
        </Box>
      )}

      <Heading as="h2" size="md" mb={4} color="white">
        {format(selectedDate, "MMMM d, yyyy")}
      </Heading>

      <GameEvents
        events={todayData?.events || []}
        isLoading={isLoading}
        error={error}
        getTopPerformerDisplayValue={getTopPerformerDisplayValue}
      />
    </VStack>
  );
};

export default Scoreboard;
