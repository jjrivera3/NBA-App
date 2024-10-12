import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface SliderControlsProps {
  handlePrevious: () => void;
  handleNext: () => void;
}

const SliderControls: React.FC<SliderControlsProps> = ({
  handlePrevious,
  handleNext,
}) => {
  return (
    <Flex alignItems="center" mb={5}>
      <IconButton
        aria-label="Previous"
        icon={<ChevronLeftIcon boxSize={{ base: 7, md: 7 }} />} // Icon size adjusted for mobile
        onClick={handlePrevious}
        color="#f8991d"
        variant="ghost"
        size={{ base: "lg", md: "sm" }} // Button size adjusted for mobile
        mr={2}
        borderRadius="10px"
        background="linear-gradient(135deg, #44464b, #6b6b6b)"
        _hover={{ backgroundColor: "rgba(80, 80, 80, 0.7)" }}
      />
      <IconButton
        aria-label="Next"
        icon={<ChevronRightIcon boxSize={{ base: 7, md: 7 }} />} // Icon size adjusted for mobile
        onClick={handleNext}
        color="#f8991d"
        variant="ghost"
        size={{ base: "lg", md: "sm" }} // Button size adjusted for mobile
        borderRadius="10px"
        background="linear-gradient(135deg, #44464b, #6b6b6b)"
        _hover={{ backgroundColor: "rgba(80, 80, 80, 0.7)" }}
      />
    </Flex>
  );
};

export default SliderControls;
