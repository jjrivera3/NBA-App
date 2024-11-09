import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import { addDays, format, subDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateNavigationProps {
  selectedDate: Date;
  handleDateChange: (date: Date) => void;
}

const DateNavigation: React.FC<DateNavigationProps> = ({
  selectedDate,
  handleDateChange,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const datesToShow = useBreakpointValue({ base: 3, md: 7 }) ?? 3;

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const onDateChange = (date: Date | null) => {
    if (date) {
      handleDateChange(date);
      toggleCalendar();
    }
  };

  return (
    <>
      {isCalendarOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.5)"
          zIndex={999}
          onClick={toggleCalendar}
        />
      )}

      <Box
        width="100%"
        bg="#333"
        p={{ base: 0, md: 4 }}
        borderRadius="md"
        mb={4}
        position="relative"
        zIndex={1000}
      >
        <Flex alignItems="center" justifyContent="center" width="100%">
          <Button
            onClick={() => handleDateChange(subDays(selectedDate, 1))}
            variant="ghost"
            color="gray.300"
            p={1}
            mx={1} // Minimized padding for the arrow buttons
            minWidth={{ base: 5, md: 10 }}
          >
            <FaChevronLeft size={18} />
          </Button>

          <Flex
            justifyContent="space-around"
            alignItems="center"
            width="100%"
            px={{ base: 1, md: 4 }}
          >
            {Array.from({ length: datesToShow }, (_, index) => (
              <Box
                key={index}
                textAlign="center"
                flex="1"
                py={2}
                cursor="pointer"
                borderRadius="md"
                mx={1} // Reduced margin for each date box
                bg={
                  selectedDate.toDateString() ===
                  addDays(
                    selectedDate,
                    index - Math.floor(datesToShow / 2)
                  ).toDateString()
                    ? "#f8991d"
                    : "transparent"
                }
                color={
                  selectedDate.toDateString() ===
                  addDays(
                    selectedDate,
                    index - Math.floor(datesToShow / 2)
                  ).toDateString()
                    ? "black"
                    : "gray.300"
                }
                onClick={() =>
                  handleDateChange(
                    addDays(selectedDate, index - Math.floor(datesToShow / 2))
                  )
                }
              >
                <Text fontSize="xs" mb={1}>
                  {format(
                    addDays(selectedDate, index - Math.floor(datesToShow / 2)),
                    "EEE"
                  )}
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                  {format(
                    addDays(selectedDate, index - Math.floor(datesToShow / 2)),
                    "MMM d"
                  )}
                </Text>
              </Box>
            ))}
          </Flex>

          <Button
            onClick={() => handleDateChange(addDays(selectedDate, 1))}
            variant="ghost"
            color="gray.300"
            p={1}
            mx={1} // Minimized padding for the arrow buttons
            minWidth={{ base: 5, md: 10 }}
          >
            <FaChevronRight size={18} />
          </Button>

          <Divider orientation="vertical" mx={2} height="24px" />
          <IconButton
            aria-label="Calendar"
            icon={<FaCalendarAlt />}
            variant="ghost"
            color="white"
            p={1}
            mx={1} // Minimized padding for the calendar icon button
            onClick={toggleCalendar}
          />
        </Flex>

        {isCalendarOpen && (
          <Box
            position="absolute"
            top="100%"
            left="50%"
            transform="translateX(-50%)"
            zIndex={2001}
          >
            <DatePicker
              selected={selectedDate}
              onChange={onDateChange}
              inline
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default DateNavigation;
