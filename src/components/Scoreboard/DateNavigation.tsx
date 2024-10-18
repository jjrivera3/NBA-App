import { Box, Button, Flex, IconButton, Text, Divider } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import { addDays, format, subDays } from "date-fns";

interface DateNavigationProps {
  selectedDate: Date;
  handleDateChange: (date: Date) => void;
  toggleCalendar: () => void;
}

const DateNavigation: React.FC<DateNavigationProps> = ({
  selectedDate,
  handleDateChange,
  toggleCalendar,
}) => (
  <Box width="100%" bg="#333" p={4} borderRadius="md" mb={4}>
    <Flex alignItems="center" justifyContent="center" width="100%">
      <Button
        onClick={() => handleDateChange(subDays(selectedDate, 1))}
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
        onClick={() => handleDateChange(addDays(selectedDate, 1))}
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
        onClick={toggleCalendar}
      />
    </Flex>
  </Box>
);

export default DateNavigation;
