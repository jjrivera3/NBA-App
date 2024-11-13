import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { addDays, format } from "date-fns";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  // Use the date from location state if available
  useEffect(() => {
    if (location.state?.selectedDate) {
      handleDateChange(location.state.selectedDate);
    }
  }, [location.state?.selectedDate, handleDateChange]);

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const onDateChange = (date: Date | null) => {
    if (date) {
      handleDateChange(date);
      toggleCalendar();
    }
  };

  const getDateForIndex = (index: number) => {
    return addDays(selectedDate, index - Math.floor(datesToShow / 2));
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
        p={{ base: 2, md: 4 }}
        borderRadius="md"
        mb={4}
        position="relative"
        zIndex={1000}
      >
        <Flex alignItems="center" justifyContent="center" width="100%">
          <Button
            onClick={() => handleDateChange(addDays(selectedDate, -1))}
            variant="ghost"
            color="gray.300"
            p={1}
            mx={1}
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
            {Array.from({ length: datesToShow }, (_, index) => {
              const date = getDateForIndex(index);
              const isSelected =
                selectedDate.toDateString() === date.toDateString();

              return (
                <Box
                  key={index}
                  textAlign="center"
                  flex="1"
                  py={2}
                  cursor="pointer"
                  borderRadius="md"
                  mx={1}
                  bg={isSelected ? "#f8991d" : "transparent"}
                  color={isSelected ? "black" : "gray.300"}
                  onClick={() => handleDateChange(date)}
                >
                  <Text fontSize="xs" mb={1}>
                    {format(date, "EEE")}
                  </Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {format(date, "MMM d")}
                  </Text>
                </Box>
              );
            })}
          </Flex>

          <Button
            onClick={() => handleDateChange(addDays(selectedDate, 1))}
            variant="ghost"
            color="gray.300"
            p={1}
            mx={1}
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
            mx={1}
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
